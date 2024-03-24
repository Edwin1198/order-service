import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { HoraryEntity, PayEntity, TicketEntity, UserEntity, VehicleEntity } from 'src/entity';
import { EntityManager, QueryRunner } from 'typeorm';
import * as moment from 'moment-timezone';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { PurchasingProcessDto, ticketDayPriceDto } from './resource/process.dto';

@Injectable()
export class ProcessService {

    constructor(
        @InjectEntityManager() private readonly entityManager: EntityManager,
        @Inject('ms-0001-catalogo') private readonly catalogoProxy: ClientProxy,
    ) { }

    async purchasingProcess(data: PurchasingProcessDto) {

        const { dateOfPurchase, departureTime, numberOfSeats, user, horaryId, payId, userId } = data
        let queryRunner: QueryRunner;
        let message: string = null

        try {
            queryRunner = this.entityManager.connection.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();

            const seatingCapacity = await this.entityManager.createQueryBuilder(TicketEntity, 'ticket')
                .leftJoinAndSelect(HoraryEntity, 'horary', 'ticket.horaryId = horary.id')
                .leftJoinAndSelect(VehicleEntity, 'vehicle', 'horary.vehicle = vehicle.id')
                .andWhere('vehicle.seatsAvailable >= :numberOfSeats', { numberOfSeats })
                .getMany();
            if (seatingCapacity.length === 0) {
                message = 'El asiento no eexiste'
                throw new HttpException(
                    {
                        status: HttpStatus.BAD_REQUEST,
                        error: message,
                    },
                    HttpStatus.BAD_REQUEST,
                );
            }

            const dataSeats = await this.entityManager.createQueryBuilder(TicketEntity, 'ticket')
                .leftJoinAndSelect(HoraryEntity, 'horary', 'ticket.horaryId = horary.id')
                .leftJoinAndSelect(VehicleEntity, 'vehicle', 'horary.vehicle = vehicle.id')
                .where('ticket.numberOfSeats = :numberOfSeats', { numberOfSeats })
                .andWhere('ticket.dateOfPurchase = :dateOfPurchase', { dateOfPurchase })
                .andWhere('horary.departureTime = :departureTime', { departureTime })
                .andWhere('horary.day = :day', { day: moment(dateOfPurchase, 'YYYY-MM-DD').format('dddd') })
                .andWhere('vehicle.seatsAvailable >= :numberOfSeats', { numberOfSeats })
                .getMany();

            if (dataSeats.length > 0) {
                message = 'El asiento no esta disponible para la compra'
                throw new HttpException(
                    {
                        status: HttpStatus.BAD_REQUEST,
                        error: message,
                    },
                    HttpStatus.BAD_REQUEST,
                );
            }
            let result = null
            if (user) {
                const userExistence = await this.entityManager.createQueryBuilder(TicketEntity, 'ticket')
                    .leftJoinAndSelect(UserEntity, 'usert', 'ticket.userId = usert.id')
                    .where('usert.name = :name', { name: user.name })
                    .getMany();
                if (userExistence.length === 0) {
                    let newUsert = null
                    try {
                        newUsert = await lastValueFrom(
                            this.catalogoProxy.send(
                                { cmd: 'usercreation' },
                                user
                            ),
                        );
                    } catch (error) {
                        message = 'Microservico en mantenimiento'
                        throw new HttpException(
                            {
                                status: HttpStatus.BAD_REQUEST,
                                error: message,
                            },
                            HttpStatus.BAD_REQUEST,
                        );
                    }
                    result = await queryRunner.manager.save(TicketEntity, {
                        userId: newUsert.id, payId, horaryId, numberOfSeats, dateOfPurchase
                    })
                } else {
                    result = await queryRunner.manager.save(TicketEntity, {
                        userId, payId, horaryId, numberOfSeats, dateOfPurchase
                    })
                }
            }


            await queryRunner.commitTransaction();

            return result;
        } catch (error) {
            Logger.error(error.message, 'purchasingProcess');

            if (queryRunner?.isTransactionActive) {
                await queryRunner.rollbackTransaction();
            }

            throw new HttpException(
                {
                    message: message ? message : error.message,
                },
                HttpStatus.BAD_REQUEST,
            );
        } finally {
            if (queryRunner?.isTransactionActive) {
                await queryRunner.rollbackTransaction();
            }
            await queryRunner.release();
        }
    }

    async ticketDayPrice(data: ticketDayPriceDto) {

        const { dateOfPurchase, busNumber } = data
        let message: string = null

        try {
            const data = await this.entityManager.createQueryBuilder(TicketEntity, 'ticket')
                .leftJoinAndSelect(HoraryEntity, 'horary', 'ticket.horaryId = horary.id')
                .leftJoinAndSelect(UserEntity, 'usert', 'ticket.userId = usert.id')
                .leftJoinAndSelect(VehicleEntity, 'vehicle', 'horary.vehicle = vehicle.id')
                .select('ticket')
                .where('ticket.dateOfPurchase = :dateOfPurchase', { dateOfPurchase })
                .andWhere('horary.day = :day', { day: moment(dateOfPurchase, 'YYYY-MM-DD').format('dddd') })
                .andWhere('vehicle.busNumber = :busNumber', { busNumber })
                .getMany();

            return data
        } catch (error) {
            throw new HttpException(
                {
                    message: message ? message : error.message,
                },
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}

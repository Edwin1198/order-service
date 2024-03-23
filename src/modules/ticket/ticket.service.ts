import { Logger, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { Repository } from 'typeorm'
import { TicketConfig, TicketDto } from './resource';
import { TicketEntity } from 'src/entity';
import { CRUDOLogger } from 'src/config/helper/message-res.helper';

@Injectable()
export class TicketService {
    constructor(
        @InjectRepository(TicketEntity)
        private readonly repository: Repository<TicketEntity>
    ) { }
    async findAll(query: PaginateQuery): Promise<Paginated<TicketEntity>> {
        const queryBuilder = this.repository.createQueryBuilder('table');
        return paginate(query, queryBuilder, TicketConfig)
    }
    async post(data: TicketDto): Promise<TicketDto | {}> {
        try {
            await this.repository
                .createQueryBuilder()
                .insert()
                .into(TicketEntity)
                .values({ ...data })
                .execute()
            return data;
        } catch (error) {
            Logger.error(error.message, CRUDOLogger.titlePost)
            return {}
        }
    }
    async put({ id, data }: { id: number, data: TicketDto }): Promise<TicketDto | {}> {
        try {
            const { affected } = await this.repository
                .createQueryBuilder()
                .update(TicketEntity)
                .set({ ...data })
                .where("id = :id", { id })
                .execute();
            if (affected === 0) {
                Logger.warn(CRUDOLogger.descripcionId, CRUDOLogger.titlePut)
            }
            return { ...data }
        } catch (error) {
            Logger.error(error.message, CRUDOLogger.titlePut)
            return {}
        }
    }

    async delete(id: number): Promise<{}> {
        try {
            const { affected } = await this.repository
                .createQueryBuilder()
                .delete()
                .from(TicketEntity)
                .where("id = :id", { id })
                .execute();
            if (affected === 0) {
                Logger.warn(CRUDOLogger.descripcionId, CRUDOLogger.titleDelete)
            }
            return {}
        } catch (error) {
            Logger.error(error.message, CRUDOLogger.titleDelete)
            return {}
        }
    }
}

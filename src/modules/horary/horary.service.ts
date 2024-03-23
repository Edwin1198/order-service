import { Logger, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { Repository } from 'typeorm'
import { HoraryConfig, HoraryDto } from './resource';
import { HoraryEntity } from 'src/entity';
import { CRUDOLogger } from 'src/config/helper/message-res.helper';

@Injectable()
export class HoraryService {
    constructor(
        @InjectRepository(HoraryEntity)
        private readonly repository: Repository<HoraryEntity>
    ) { }
    async findAll(query: PaginateQuery): Promise<Paginated<HoraryEntity>> {
        const queryBuilder = this.repository.createQueryBuilder('table');
        return paginate(query, queryBuilder, HoraryConfig)
    }
    async post(data: HoraryDto): Promise<HoraryDto | {}> {
        try {
            await this.repository
                .createQueryBuilder()
                .insert()
                .into(HoraryEntity)
                .values({ ...data })
                .execute()
            return data;
        } catch (error) {
            Logger.error(error.message, CRUDOLogger.titlePost)
            return {}
        }
    }
    async put({ id, data }: { id: number, data: HoraryDto }): Promise<HoraryDto | {}> {
        try {
            const { affected } = await this.repository
                .createQueryBuilder()
                .update(HoraryEntity)
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
                .from(HoraryEntity)
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

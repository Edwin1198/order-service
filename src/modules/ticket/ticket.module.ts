import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CityEntity,
  HoraryEntity,
  PayEntity,
  TicketEntity,
  UserEntity,
} from 'src/entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      CityEntity,
      PayEntity,
      HoraryEntity,
      TicketEntity,
    ]),
  ],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}

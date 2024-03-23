import { Module } from '@nestjs/common';
import { HoraryController } from './horary.controller';
import { HoraryService } from './horary.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HoraryEntity, VehicleEntity } from 'src/entity';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleEntity, HoraryEntity])],
  controllers: [HoraryController],
  providers: [HoraryService]
})
export class HoraryModule { }

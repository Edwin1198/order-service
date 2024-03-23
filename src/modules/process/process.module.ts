import { Module } from '@nestjs/common';
import { ProcessController } from './process.controller';
import { ProcessService } from './process.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity, HoraryEntity, PayEntity, TicketEntity, UserEntity } from 'src/entity';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, CityEntity, PayEntity, HoraryEntity, TicketEntity])],
  controllers: [ProcessController],
  providers: [ProcessService,
    {
      provide: 'ms-0001-catalogo',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('CATALOGOS_HOST_NAME'),
            port: configService.get('CATALOGOS_HOST_PORT'),
          },
        }),
    }
  ]
})
export class ProcessModule { }

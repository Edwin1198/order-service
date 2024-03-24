import { Body, Controller, Patch } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProcessService } from './process.service';
import {
  PurchasingProcessDto,
  ticketDayPriceDto,
} from './resource/process.dto';
import { TicketDto } from '../ticket/resource';
import { MessagePattern } from '@nestjs/microservices';

@ApiCreatedResponse()
@ApiTags('PROCESO')
@Controller('process')
export class ProcessController {
  constructor(private readonly service: ProcessService) {}
  @ApiOperation({ summary: 'Proceso de compra' })
  @ApiBody({
    type: PurchasingProcessDto,
    description: 'Boleto',
  })
  @ApiResponse({
    status: 200,
    description: 'Boleto creado',
    type: TicketDto,
  })
  @Patch('purchasing-process')
  async purchasingProcess(@Body() data: PurchasingProcessDto) {
    return this.service.purchasingProcess(data);
  }

  @MessagePattern({ cmd: 'ticketDayPrice' })
  async ticketDayPrice(data: ticketDayPriceDto): Promise<any | any> {
    return this.service.ticketDayPrice(data);
  }
}

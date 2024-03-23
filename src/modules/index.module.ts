import { Module } from '@nestjs/common';
import { HoraryModule } from './horary/horary.module';
import { TicketModule } from './ticket/ticket.module';

@Module({
    imports: [HoraryModule, TicketModule]
})
export class IndexModule { }

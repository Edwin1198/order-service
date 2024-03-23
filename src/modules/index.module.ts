import { Module } from '@nestjs/common';
import { HoraryModule } from './horary/horary.module';
import { TicketModule } from './ticket/ticket.module';
import { ProcessModule } from './process/process.module';

@Module({
    imports: [HoraryModule, TicketModule, ProcessModule]
})
export class IndexModule { }

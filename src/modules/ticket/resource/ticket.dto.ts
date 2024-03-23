import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Message } from 'src/config/helper/message-validator.helper';

export class TicketDto {

    @Type(() => Number)
    @IsOptional()
    @IsNumber({}, { message: Message.NUMBER('$property') })
    @ApiProperty({
        title: 'user_id',
        example: '2',
        required: false,
    })
    userId: number;

    @Type(() => Number)
    @IsOptional()
    @IsNumber({}, { message: Message.NUMBER('$property') })
    @ApiProperty({
        title: 'pay',
        example: '2',
        required: false,
    })
    payId: number;

    @Type(() => Number)
    @IsOptional()
    @IsNumber({}, { message: Message.NUMBER('$property') })
    @ApiProperty({
        title: 'horary',
        example: '2',
        required: false,
    })
    horaryId: number;

    @Type(() => Number)
    @IsOptional()
    @IsNumber({}, { message: Message.NUMBER('$property') })
    @ApiProperty({
        title: 'number_of_seats',
        example: '2',
        required: false,
    })
    numberOfSeats: number;

}

export class TicketDtoId extends TicketDto {

    @Type(() => Number)
    @IsNumber({}, { message: Message.NUMBER('$property') })
    @ApiProperty({
        title: 'id_ticket',
        example: '1',
        required: true,
    })
    id: number;

}
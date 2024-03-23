import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Message } from 'src/config/helper/message-validator.helper';

export class HoraryDto {

    @Type(() => String)
    @IsOptional()
    @IsString({ message: Message.STRING('$property') })
    @ApiProperty({
        title: 'day',
        example: 'Lunes',
        required: false,
    })
    day: string;

    @Type(() => String)
    @IsOptional()
    @IsString({ message: Message.STRING('$property') })
    @ApiProperty({
        title: 'departure_time',
        example: '04:00:00',
        required: false,
    })
    departureTime: string;

    @Type(() => Number)
    @IsOptional()
    @IsNumber({}, { message: Message.NUMBER('$property') })
    @ApiProperty({
        title: 'vehicle',
        example: '2',
        required: false,
    })
    vehicle: number;

}

export class HoraryDtoId extends HoraryDto {

    @Type(() => Number)
    @IsNumber({}, { message: Message.NUMBER('$property') })
    @ApiProperty({
        title: 'id_horary',
        example: '1',
        required: true,
    })
    id: number;

}
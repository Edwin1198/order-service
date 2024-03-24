import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Message } from 'src/config/helper/message-validator.helper';


export class UserDto {

    @Type(() => String)
    @IsOptional()
    @IsString({ message: Message.STRING('$property') })
    @ApiProperty({
        title: 'name',
        example: 'edwin',
        required: false,
    })
    name: string;

    @Type(() => Number)
    @IsOptional()
    @IsNumber({}, { message: Message.NUMBER('$property') })
    @ApiProperty({
        title: 'phone',
        example: '934876433',
        required: false,
    })
    phone: number;

    @Type(() => String)
    @IsOptional()
    @IsString({ message: Message.STRING('$property') })
    @ApiProperty({
        title: 'email',
        example: 'edwin.apd.1198@gmail.com',
        required: false,
    })
    email: string;

    @Type(() => String)
    @IsOptional()
    @IsString({ message: Message.STRING('$property') })
    @ApiProperty({
        title: 'n_document',
        example: '71120253',
        required: false,
    })
    documentNumber: string;

    @Type(() => String)
    @IsOptional()
    @IsString({ message: Message.STRING('$property') })
    @ApiProperty({
        title: 'gender',
        example: 'M',
        required: false,
    })
    gender: string;

    @Type(() => Date)
    @IsOptional()
    @IsDate({ message: Message.IsDate('$property') })
    @ApiProperty({
        title: 'birthdate',
        example: '1998-10-11',
        required: false,
    })
    birthdate: Date | null;

}

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

    @Type(() => Date)
    @IsOptional()
    @IsDate({ message: Message.IsDate('$property') })
    @ApiProperty({
      title: 'date_of_purchase',
      example: '2024-03-18',
      required: false,
    })
    dateOfPurchase: Date | null;

}

export class PurchasingProcessDto extends TicketDto {

    @ValidateNested()
    @IsOptional()
    @Type(() => UserDto)
    @ApiProperty({
        type: UserDto,
        required: false,
    })
    user: UserDto

    

    @Type(() => String)
    @IsOptional()
    @IsString({ message: Message.STRING('$property') })
    @ApiProperty({
        title: 'departure_time',
        example: '04:00:00',
        required: false,
    })
    departureTime: string;

}
export class ticketDayPriceDto {

    @Type(() => Date)
    @IsOptional()
    @IsDate({ message: Message.IsDate('$property') })
    @ApiProperty({
      title: 'date_of_purchase',
      example: '2024-03-18',
      required: false,
    })
    dateOfPurchase: Date | null;

    @Type(() => String)
    @IsOptional()
    @IsString({ message: Message.STRING('$property') })
    @ApiProperty({
        title: 'n_bus',
        example: '12',
        required: false,
    })
    busNumber: string;

}
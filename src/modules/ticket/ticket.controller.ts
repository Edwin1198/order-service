import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  ApiOkPaginatedResponse,
  ApiPaginationQuery,
  Paginate,
  PaginateQuery,
  Paginated,
  PaginatedSwaggerDocs,
} from 'nestjs-paginate';
import { TicketDto, TicketDtoId, TicketConfig } from './resource';
import { TicketEntity } from 'src/entity';
import {
  CRUDOBody,
  CRUDOParam,
  CRUDOResponse,
  CRUDOperation,
} from 'src/config/helper/message-res.helper';

@ApiCreatedResponse()
@ApiTags('BOLETO')
@Controller('ticket')
export class TicketController {
  constructor(private readonly service: TicketService) {}
  @ApiOperation({ summary: 'Paginación de todos los registros' })
  @ApiOkPaginatedResponse(TicketDtoId, TicketConfig)
  @ApiPaginationQuery(TicketConfig)
  @PaginatedSwaggerDocs(TicketDtoId, TicketConfig)
  @Get()
  async finAll(
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<TicketEntity>> {
    return await this.service.findAll(query);
  }
  @ApiOperation({ summary: CRUDOperation.post })
  @ApiBody({
    type: TicketDto,
    description: CRUDOBody.postDescription,
  })
  @ApiResponse({
    status: CRUDOResponse.postStatus,
    description: CRUDOResponse.postDescription,
    type: TicketDto,
  })
  @Post()
  async post(@Body() data: TicketDto): Promise<TicketDto | any> {
    return this.service.post(data);
  }
  @ApiOperation({ summary: CRUDOperation.put })
  @ApiParam({
    name: CRUDOParam.putName,
    example: 1,
    type: Number,
  })
  @ApiBody({
    type: TicketDto,
    description: CRUDOBody.putDescription,
  })
  @ApiResponse({
    status: CRUDOResponse.putStatus,
    description: CRUDOResponse.putDescription,
    type: TicketDto,
  })
  @Put(':id')
  async put(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: TicketDto,
  ): Promise<TicketDto | any> {
    return this.service.put({ id, data });
  }
  @ApiOperation({ summary: CRUDOperation.delete })
  @ApiParam({
    name: CRUDOParam.deleteName,
    example: 1,
    type: Number,
  })
  @ApiResponse({
    status: CRUDOResponse.deleteStatus,
    description: CRUDOResponse.deleteDescription,
    type: Object,
  })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.service.delete(id);
  }
}

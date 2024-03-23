import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { HoraryService } from './horary.service';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiOkPaginatedResponse, ApiPaginationQuery, Paginate, PaginateQuery, Paginated, PaginatedSwaggerDocs } from 'nestjs-paginate';
import { HoraryDto, HoraryDtoId, HoraryConfig } from './resource';
import { HoraryEntity } from 'src/entity';
import { CRUDOBody, CRUDOParam, CRUDOResponse, CRUDOperation } from 'src/config/helper/message-res.helper';

@ApiCreatedResponse()
@ApiTags('HORARIO')
@Controller('horary')
export class HoraryController {
    constructor(private readonly service: HoraryService) { }
    @ApiOperation({ summary: 'Paginación de todos los registros' })
    @ApiOkPaginatedResponse(HoraryDtoId, HoraryConfig)
    @ApiPaginationQuery(HoraryConfig)
    @PaginatedSwaggerDocs(HoraryDtoId, HoraryConfig)
    @Get()
    async finAll(@Paginate() query: PaginateQuery): Promise<Paginated<HoraryEntity>> {
        return await this.service.findAll(query);
    }
    @ApiOperation({ summary: CRUDOperation.post })
    @ApiBody({
        type: HoraryDto,
        description: CRUDOBody.postDescription,
    })
    @ApiResponse({
        status: CRUDOResponse.postStatus,
        description: CRUDOResponse.postDescription,
        type: HoraryDto,
    })
    @Post()
    async post(@Body() data: HoraryDto): Promise<HoraryDto | {}> {
        return this.service.post(data);
    }
    @ApiOperation({ summary: CRUDOperation.put })
    @ApiParam({
        name: CRUDOParam.putName,
        example: 1,
        type: Number
    })
    @ApiBody({
        type: HoraryDto,
        description: CRUDOBody.putDescription,
    })
    @ApiResponse({
        status: CRUDOResponse.putStatus,
        description: CRUDOResponse.putDescription,
        type: HoraryDto,
    })
    @Put(':id')
    async put(@Param('id', ParseIntPipe) id: number, @Body() data: HoraryDto): Promise<HoraryDto | {}> {
        return this.service.put({ id, data });
    }
    @ApiOperation({ summary: CRUDOperation.delete })
    @ApiParam({
        name: CRUDOParam.deleteName,
        example: 1,
        type: Number
    })
    @ApiResponse({
        status: CRUDOResponse.deleteStatus,
        description: CRUDOResponse.deleteDescription,
        type: Object
    })
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<{}> {
        return this.service.delete(id);
    }
}

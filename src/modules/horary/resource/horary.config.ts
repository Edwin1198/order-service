import { FilterOperator, FilterSuffix, PaginateConfig } from "nestjs-paginate"
import { HoraryEntity } from 'src/entity';

const dataBd =
    ['id', 'day', 'departureTime', 'vehicleInfo.id', 'vehicleInfo.busNumber', 'vehicleInfo.licensePlate', 'vehicleInfo.state', 'vehicleInfo.seatsAvailable']

export const HoraryConfig: PaginateConfig<HoraryEntity> = {
    sortableColumns: ['id', 'day', 'departureTime', 'vehicle', 'vehicleInfo.id', 'vehicleInfo.busNumber', 'vehicleInfo.licensePlate', 'vehicleInfo.state', 'vehicleInfo.seatsAvailable'],
    nullSort: 'last',
    defaultSortBy: [['id', 'DESC']],
    searchableColumns: ['id', 'day', 'departureTime', 'vehicle', 'vehicleInfo.id', 'vehicleInfo.busNumber', 'vehicleInfo.licensePlate', 'vehicleInfo.state', 'vehicleInfo.seatsAvailable'],
    select: dataBd,
    relations: ['vehicleInfo'],
    filterableColumns: {
        id: [FilterOperator.EQ, FilterSuffix.NOT],
        day: [FilterOperator.EQ, FilterSuffix.NOT],
        departureTime: [FilterOperator.EQ, FilterSuffix.NOT],
        vehicle: [FilterOperator.EQ, FilterSuffix.NOT],
        'vehicleInfo.id': [FilterOperator.EQ, FilterSuffix.NOT],
        'vehicleInfo.busNumber': [FilterOperator.EQ, FilterSuffix.NOT],
        'vehicleInfo.licensePlate': [FilterOperator.EQ, FilterSuffix.NOT],
        'vehicleInfo.state': [FilterOperator.EQ, FilterSuffix.NOT],
        'vehicleInfo.seatsAvailable': [FilterOperator.EQ, FilterSuffix.NOT]
    },
}

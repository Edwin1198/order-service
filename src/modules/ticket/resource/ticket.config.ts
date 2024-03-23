import { FilterOperator, FilterSuffix, PaginateConfig } from "nestjs-paginate"
import { TicketEntity } from 'src/entity';

const dataBd =
    ['id', 'numberOfSeats',
        'user.id', 'user.name', 'user.phone', 'user.email', 'user.documentNumber', 'user.gender', 'user.birthdate',
        'payment.id', 'payment.price', 'payment.travelTime', 'payment.originDestination', 'payment.finalDestination',
        'horary.id', 'horary.day', 'horary.departureTime', 'horary.vehicle']

export const TicketConfig: PaginateConfig<TicketEntity> = {
    sortableColumns: ['id', 'userId', 'payId', 'horaryId', 'numberOfSeats',
        'user.id', 'user.name', 'user.phone', 'user.email', 'user.documentNumber', 'user.gender', 'user.birthdate',
        'payment.id', 'payment.price', 'payment.travelTime', 'payment.originDestination', 'payment.finalDestination',
        'horary.id', 'horary.day', 'horary.departureTime', 'horary.vehicle'],
    nullSort: 'last',
    defaultSortBy: [['id', 'DESC']],
    searchableColumns: ['id', 'userId', 'payId', 'horaryId', 'numberOfSeats',
        'user.id', 'user.name', 'user.phone', 'user.email', 'user.documentNumber', 'user.gender', 'user.birthdate',
        'payment.id', 'payment.price', 'payment.travelTime', 'payment.originDestination', 'payment.finalDestination',
        'horary.id', 'horary.day', 'horary.departureTime', 'horary.vehicle'],
    select: dataBd,
    relations: ['user'],
    filterableColumns: {
        id: [FilterOperator.EQ, FilterSuffix.NOT],
        userId: [FilterOperator.EQ, FilterSuffix.NOT],
        payId: [FilterOperator.EQ, FilterSuffix.NOT],
        horaryId: [FilterOperator.EQ, FilterSuffix.NOT],
        numberOfSeats: [FilterOperator.EQ, FilterSuffix.NOT],
        'user.id': [FilterOperator.EQ, FilterSuffix.NOT],
        'user.name': [FilterOperator.EQ, FilterSuffix.NOT],
        'user.phone': [FilterOperator.EQ, FilterSuffix.NOT],
        'user.email': [FilterOperator.EQ, FilterSuffix.NOT],
        'user.documentNumber': [FilterOperator.EQ, FilterSuffix.NOT],
        'user.gender': [FilterOperator.EQ, FilterSuffix.NOT],
        'user.birthdate': [FilterOperator.EQ, FilterSuffix.NOT],
        'payment.id': [FilterOperator.EQ, FilterSuffix.NOT],
        'payment.price': [FilterOperator.EQ, FilterSuffix.NOT],
        'payment.travelTime': [FilterOperator.EQ, FilterSuffix.NOT],
        'payment.originDestination': [FilterOperator.EQ, FilterSuffix.NOT],
        'payment.finalDestination': [FilterOperator.EQ, FilterSuffix.NOT],
        'horary.id': [FilterOperator.EQ, FilterSuffix.NOT],
        'horary.day': [FilterOperator.EQ, FilterSuffix.NOT],
        'horary.departureTime': [FilterOperator.EQ, FilterSuffix.NOT],
        'horary.vehicle': [FilterOperator.EQ, FilterSuffix.NOT]
    },
}

import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { VehicleEntity } from '../vehicle/vehicle.entity';

@Entity('horary', { database: 'travel_db', schema: 'public' })
export class HoraryEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'numeric', name: 'id_horary' })
  id: number | null;

  @Column({ type: 'character varying', name: 'day', length: 20 })
  day: string | null;

  @Column({ type: 'time', name: 'departure_time' })
  departureTime: string;

  @Column({ type: 'numeric', name: 'vehicle' })
  vehicle: number;

  @ManyToOne(() => VehicleEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'vehicle', referencedColumnName: 'id' })
  vehicleInfo: VehicleEntity;
}

import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
import { UserEntity } from "../user/user.entity";
import { PayEntity } from "../pay/pay.entity";
import { HoraryEntity } from "../horary/horary.entity";

@Entity("ticket", { database: 'travel_db', schema: "public" })
export class TicketEntity extends BaseEntity {

    @PrimaryGeneratedColumn({ type: 'numeric', name: 'id_ticket' })
    id: number | null;

    @Column({ type: 'numeric', name: 'user_id' })
    userId: number;

    @Column({ type: 'numeric', name: 'pay' })
    payId: number;

    @Column({ type: 'numeric', name: 'horary' })
    horaryId: number;

    @Column({ type: 'numeric', name: 'number_of_seats' })
    numberOfSeats: number;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'date_of_purchase' })
    dateOfPurchase: Date | null;

    @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: UserEntity;

    @ManyToOne(() => PayEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'pay', referencedColumnName: 'id' })
    payment: PayEntity;

    @ManyToOne(() => HoraryEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'horary', referencedColumnName: 'id' })
    horary: HoraryEntity;

}
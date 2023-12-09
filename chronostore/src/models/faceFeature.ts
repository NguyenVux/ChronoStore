import { Customer, generateEntityId } from "@medusajs/medusa"
import { string } from "@tensorflow/tfjs-node";
import { Entity, BaseEntity, Column, BeforeInsert, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from "typeorm"

@Entity({name:'face_feature'})
export class FaceFeature extends BaseEntity {

    @OneToOne(()=> Customer,c => c.id)
    @JoinColumn({name:'c_id'})
    customer: Customer;

    @PrimaryColumn({name:'c_id',type: 'varchar',unique: true})
    customerId: string;
  
    @CreateDateColumn({ type: "timestamp"})
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp"})
    updated_at: Date;

    @Column({name:'features',type:'float',array:true})
    features: number[];
  
}
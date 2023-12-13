import { Customer as MedusaCustomer, generateEntityId } from "@medusajs/medusa"
import { Entity, BaseEntity, Column, BeforeInsert, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from "typeorm"

@Entity()
export class Customer extends MedusaCustomer {

    @Column({name:'skybio_uid',type:'varchar',nullable:true,unique:true})
    skybioUid: string;
  
}
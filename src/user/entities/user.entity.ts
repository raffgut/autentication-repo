import { Category } from 'src/categories/entities/category.entity';
import { Product } from 'src/products/entities/product.entity';
import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from 'typeorm'

@Entity('users')
export class User extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({type:'varchar', unique: true, length: 30, nullable: false})
    email: string;
    
    @Column({type:'bigint', unique: true, nullable: false})
    identification: number;
    
    @Column({type:'bigint', unique: true, nullable: false})
    celphone: number;
    
    @Column({type:'varchar', length: 25, nullable: false})
    name: string;

    @Column({type:'varchar', length: 25, nullable: false})
    lastname: string;

    @Column({type:'varchar', length: 100, nullable: false})
    password: string;
    
    @Column({type:'varchar', default: 'user', length: 5, nullable: false})
    role: string;
    
    @CreateDateColumn({type: 'timestamp', name: 'create_at'})
    createdAt: Date;
    
    @UpdateDateColumn({type: 'timestamp', name: 'update_at'})
    updatedAt: Date;

}
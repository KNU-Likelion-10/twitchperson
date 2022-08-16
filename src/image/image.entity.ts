import {
  PrimaryGeneratedColumn, Column, Entity,
} from 'typeorm';
import { BaseEntity } from '@src/baseEntity';

@Entity()
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    name: string;

  @Column()
    uuid: string;

  @Column()
    url: string;

  @Column()
    mimetype: string;
    
}

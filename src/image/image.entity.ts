import { BaseEntity } from '@src/baseEntity';
import {
  PrimaryGeneratedColumn, Column, Entity,
} from 'typeorm';

@Entity()
export class Image extends BaseEntity{
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    name: string;

  @Column()
    uuid: string;

  @Column()
    url: string;
  
  @Column()
    mimetype: string
}

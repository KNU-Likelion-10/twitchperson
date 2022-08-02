import {
  PrimaryGeneratedColumn, Column, Entity,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    lv: number;

  @Column()
    exp: number;
}

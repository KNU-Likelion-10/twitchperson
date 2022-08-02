import {
  PrimaryGeneratedColumn, Column, Entity, ManyToOne,
} from 'typeorm';
import { BaseEntity } from '@src/baseEntity';
import { User } from '@src/auth/user.entity';

@Entity()
export class Badge extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ nullable: false })
    name: string;

  @Column({ nullable: false })
    desc: string;

  @Column({ nullable: false })
    codition: string;

  @Column({ default: 0, nullable: false })
    exp: number;

  @Column({ default: 0 })
    like: number;

  @Column({ default: 0, nullable: false })
    unlike: number;

  @ManyToOne((type) => User)
    user: User;
}

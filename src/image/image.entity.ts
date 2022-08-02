import {
  PrimaryGeneratedColumn, Column, Entity,
} from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    name: string;

  @Column()
    uuid: string;

  @Column()
    url: string;

  @Column({ type: Date })
    createdAt: Date;

  @Column({ type: Date })
    updatedAt: Date;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Role } from '../roles/enum/role.enum';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id!: number;

  @Column({ nullable: false, default: 'dlsxjspt' })
  @Field()
  password: string;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column({ default: true })
  @Field()
  isActive: boolean;

  @Column()
  @Field()
  email: string;

  @Column({ default: Role.User })
  @Field()
  role: Role;

  roles: Role[];
}

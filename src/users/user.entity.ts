import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Role } from '../roles/enum/role.enum';
import { IsEmail } from 'class-validator';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const SALT_OR_ROUNDS = 10;

@Entity()
@ObjectType()
export class User {
  private readonly logger = new Logger(User.name);

  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id!: number;

  @Column({ unique: true })
  @IsEmail()
  @Field()
  email!: string;

  @Column({ nullable: false })
  @Field()
  encrypted!: string;

  @Column({ default: Role.User })
  @Field()
  role!: Role;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.logger.debug(`hashPassword()`);
    try {
      this.encrypted = await bcrypt.hash(this.encrypted, SALT_OR_ROUNDS);
    } catch (error) {
      this.logger.error(`hashPassword() : ${error}`);
      throw new InternalServerErrorException();
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    this.logger.debug(`validatePassword(${password})`);
    try {
      const isValidated = await bcrypt.compare(password, this.encrypted);
      this.logger.debug(`validatePassword(${password}) : ${isValidated}`);
      return isValidated;
    } catch (error) {
      this.logger.error(`validatePassword() : ${error}`);
      throw new InternalServerErrorException();
    }
  }
}

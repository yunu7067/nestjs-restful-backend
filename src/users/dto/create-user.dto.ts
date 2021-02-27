import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field()
  @IsEmail()
  readonly email!: string;

  @Field()
  @IsString()
  readonly password!: string;
}

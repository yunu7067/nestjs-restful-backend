import { Query, Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  async getUsers() {
    return await this.usersService.findAll();
  }

  @Query(() => User)
  async getUserById(@Args('id') id: number) {
    return await this.usersService.findOne(String(id));
  }

  @Mutation(() => User)
  async createUser(@Args('data') user: CreateUserDto) {
    return await this.usersService.create(user);
  }
}

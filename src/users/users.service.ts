import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  create({ email, password }: CreateUserDto): Promise<User> {
    this.logger.debug('create()');
    const user = new User();
    user.email = email;
    user.encrypted = password;

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    this.logger.debug('findAll()');

    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<User | undefined> {
    this.logger.debug(`findOne(${id})`);

    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    this.logger.debug(`findOneByEmail(${email})`);

    const user = await this.usersRepository.findOne({ email });
    if (!user) {
      throw new NotFoundException(`User with Email ${email} not found.`);
    }

    return user;
  }

  async remove(id: string): Promise<void> {
    this.logger.debug(`remove(${id})`);

    await this.usersRepository.delete(id);
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { userInfo } from 'os';
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
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User | undefined> {
    this.logger.debug(`findOne(${id})`);
    return this.usersRepository.findOne(id);
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    this.logger.debug(`findOneByEmail(${email})`);
    return this.usersRepository.findOne({ email });
  }

  async remove(id: string): Promise<void> {
    this.logger.debug(`remove(${id})`);
    await this.usersRepository.delete(id);
  }
}

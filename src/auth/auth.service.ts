import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(id: string, pass: string): Promise<any> {
    this.logger.debug('validateUser(id, pass)');

    const user = await this.usersService.findOneByEmail(id);
    this.logger.debug(`validateUser(id, pass) : ${user?.encrypted}`);
    if (user && (await user.validatePassword(pass))) {
      this.logger.debug(
        `validateUser(id, pass) : ${await user.validatePassword(pass)}`,
      );
      this.logger.debug('validateUser(id, pass) : success');
      const { encrypted, ...result } = user;
      return result;
    }
    this.logger.error('validateUser(id, pass) : fail');
    return null;
  }

  async login(user: any) {
    this.logger.debug('login()');

    const payload = { email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

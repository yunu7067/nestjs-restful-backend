import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);

  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });

    this.logger.debug('constructor');
  }

  async validate(id: string, password: string): Promise<any> {
    this.logger.debug(`validate(${id}, ${password})`);

    const user = await this.authService.validateUser(id, password);
    if (!user) {
      this.logger.debug(`validate() : validate fail`);
      throw new UnauthorizedException();
    }
    return user;
  }
}

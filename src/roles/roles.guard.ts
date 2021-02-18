import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './enum/role.enum';
import { ROLES_KEY } from './decorator/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(private reflector: Reflector) {
    this.logger.debug('constructor');
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    this.logger.debug('canActivate()');
    const requireRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass,
    ]);
    console.log(requireRoles);
    if (!requireRoles) {
      this.logger.debug('canActivate() : fail, require Roles');
      return true;
    }

    console.log(context.switchToHttp().getRequest());

    const { user } = context.switchToHttp().getRequest();

    this.logger.debug(`canActivate() : fail, ${user}`);

    return requireRoles.some((role) => user.role === role);
  }
}

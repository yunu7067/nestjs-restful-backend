import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { Roles } from './roles/decorator/roles.decorator';
import { Role } from './roles/enum/role.enum';
import { RolesGuard } from './roles/roles.guard';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    this.logger.debug('login()');

    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('profile')
  @Roles(Role.Admin)
  getProfile(@Request() req) {
    this.logger.debug('getProfile()');

    return req.user;
  }
}

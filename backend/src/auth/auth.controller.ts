import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { AuthService } from './auth.service';
import { SessionGuard } from './session.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() body: { email: string; password: string },
    @Req() req: Request,
  ) {
    const user = await this.authService.register(body.email, body.password);
    await regenerateSession(req);
    req.session.userId = user.id;
    return user;
  }

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() body: { email: string; password: string },
    @Req() req: Request,
  ) {
    const user = await this.authService.login(body.email, body.password);
    await regenerateSession(req);
    req.session.userId = user.id;
    return user;
  }

  @Post('logout')
  @HttpCode(200)
  @UseGuards(SessionGuard)
  logout(@Req() req: Request): Promise<{ ok: boolean }> {
    return new Promise((resolve, reject) =>
      req.session.destroy((err) => (err ? reject(err) : resolve({ ok: true }))),
    );
  }

  @Get('me')
  @UseGuards(SessionGuard)
  async me(@Req() req: Request) {
    const user = await this.authService.getUser(req.session.userId!);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}

function regenerateSession(req: Request): Promise<void> {
  return new Promise((resolve, reject) =>
    req.session.regenerate((err) => (err ? reject(err) : resolve())),
  );
}

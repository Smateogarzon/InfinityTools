import { Controller, Get, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './guards/google.guard';

@Controller('auth')
export class AppController {
  constructor() {}

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return { google: 'login' };
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  handleCallback() {
    return { google: 'callback' };
  }
}

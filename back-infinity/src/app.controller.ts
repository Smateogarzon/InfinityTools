import { Controller, Get, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './guards/google.guard';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AppController {
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return { google: 'login' };
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  handleCallback(@Req() req: Request, @Res() res: Response) {
    const user = req.user;
    res.cookie('session', user, {
      httpOnly: true,
      maxAge: 3600000,
      sameSite: 'none',
      secure: true,
    });
    res.sendStatus(200);
  }

  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req: Request, @Res() res: Response): Promise<any> {
    const user = req.user;
    res.cookie('session', user, {
      httpOnly: true,
      maxAge: 3600000,
      sameSite: 'none',
      secure: true,
    });
    res.sendStatus(200);
  }

  @Get('/logout')
  async logOut(@Res() res: Response) {
    res.clearCookie('session');
    res.status(200).json({ access: false });
  }
}

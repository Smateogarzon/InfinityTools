import { Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './guards/google.guard';
import { Request, Response } from 'express';
import { FacebookAuthGuard } from './guards/facebook.guard';

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
    try {
      const user = req.user;
      const jwt = user['jwt'];
      const userExist = user['userExist'];
      const name = user['name'];
      if (userExist) {
        res.cookie('session', jwt, {
          httpOnly: true,
          maxAge: 3600000,
          sameSite: 'none',
          secure: true,
        });
        res.redirect(`${process.env.FRONTEND_URL}/?auth=google`);
      } else {
        res.cookie('session', jwt, {
          httpOnly: true,
          maxAge: 3600000,
          sameSite: 'none',
          secure: true,
        });
        res.redirect(`${process.env.FRONTEND_URL}/register/${name}`);
      }
    } catch (error) {
      res.status(404).send('Not Found');
    }
  }

  @Get('/facebook')
  @UseGuards(FacebookAuthGuard)
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/facebook/redirect')
  @UseGuards(FacebookAuthGuard)
  async facebookLoginRedirect(@Req() req: Request, @Res() res: Response): Promise<any> {
    try {
      const user = req.user;
      res.cookie('session', user, {
        httpOnly: true,
        maxAge: 3600000,
        sameSite: 'none',
        secure: true,
      });
      res.redirect(`${process.env.FRONTEND_URL}/?auth=facebook`);
    } catch (error) {
      if (req.query.error === 'access_denied') {
        return res.status(200).send('You denied Facebook access.');
      }
    }
  }

  @Post('/logout')
  async logOut(@Req() req: Request, @Res() res: Response) {
    try {
      res.clearCookie('session', { httpOnly: true, maxAge: -1 });
      res.status(200).json({ message: 'Successfully logged out' });
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  }
}

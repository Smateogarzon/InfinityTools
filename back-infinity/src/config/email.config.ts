// nodemailer.config.ts

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
// import { google } from 'googleapis';

// const OAuth2 = google.auth.OAuth2;

@Injectable()
export class NodemailerConfigService {
  public readonly email: string;
  private readonly password: string;
  private readonly googleToken: string;
  private readonly googleId: string;

  constructor(private readonly configService: ConfigService) {
    this.email = this.configService.get<string>('GOOGLE_EMAIL');
    this.password = this.configService.get<string>('GOOGLE_PASS');
    this.googleToken = this.configService.get<string>('GOOGLE_TOKEN');
    this.googleId = this.configService.get<string>('GOOGLE_ID');
  }

  createTransporter(): nodemailer.Transporter {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: this.email,
        clientId: this.googleId,
        clientSecret: this.password,
        refreshToken: this.googleToken,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }
}

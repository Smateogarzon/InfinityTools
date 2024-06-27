// nodemailer.config.ts

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';

const OAuth2 = google.auth.OAuth2;

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

  public async createTransporter() {
    const oauth2Client = new OAuth2(
      this.googleId,
      this.password,
      'https://developers.google.com/oauthplayground'
    );

    oauth2Client.setCredentials({
      refresh_token: this.googleToken,
    });

    try {
      const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
          if (err) {
            reject('Error retrieving access token: ' + err);
          }
          resolve(token);
        });
      });

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: this.email,
          clientId: this.googleId,
          clientSecret: this.password,
          refreshToken: this.googleToken,
          accessToken: accessToken as string,
        },
      });

      return transporter;
    } catch (error) {
      console.error('Error creating transporter:', error);
      throw error;
    }
  }
}

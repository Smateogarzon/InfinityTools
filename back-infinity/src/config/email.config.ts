// nodemailer.config.ts

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NodemailerConfigService {
  public readonly email: string;
  private readonly password: string;

  constructor(private readonly configService: ConfigService) {
    this.email = this.configService.get<string>('GOOGLE_EMAIL');
    this.password = this.configService.get<string>('GOOGLE_PASS');
  }

  createTransporter(): nodemailer.Transporter {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.email,
        pass: this.password,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }
}

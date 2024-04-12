import { Injectable } from '@nestjs/common';
import { NodemailerConfigService } from '@/config/email.config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly nodemailerConfigService: NodemailerConfigService) {
    this.transporter = this.nodemailerConfigService.createTransporter();
  }

  recoveringPassword(email: string, token: string) {
    const mailOptions = {
      from: this.nodemailerConfigService.email,
      to: email,
      subject: 'Recuperar contraseña',
      html: `
      <h1>Recuperar contraseña</h1>
      <p>Para recuperar tu contraseña haz click en el siguiente enlace</p>`,
      attachments: [],
    };
    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
}

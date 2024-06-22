import { Injectable } from '@nestjs/common';
import { NodemailerConfigService } from '@/config/email.config';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Emailservice {
  private transporter: nodemailer.Transporter;
  private readonly API_URL: string;
  private readonly GOOGLE_EMAIL: string;

  constructor(
    private readonly nodemailerConfigService: NodemailerConfigService,
    private readonly configService: ConfigService
  ) {
    this.transporter = this.nodemailerConfigService.createTransporter();
    this.GOOGLE_EMAIL = this.configService.get<string>('GOOGLE_EMAIL');
  }
  async sendEmail(email: string, name: string) {
    const image = 'https://storage.googleapis.com/pictures_infinity/logo.png';
    const mailOptions = {
      from: this.GOOGLE_EMAIL,
      to: email,
      subject: 'Bienvenido a Infinity Tools',
      html: `
      <!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        padding: 20px;
        color: #fff;
      }

      table {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        background-color: #242222;
        border-radius: 5px;
      }

      td {
        text-align: center;
        padding: 20px;
        padding-inline: 30px;
        color: #fff;
      }

      .contenido {
        text-align: justify;
        text-wrap: balance;
      }
      #title {
        text-align: center;
      }
      li {
        padding-block: 10px;
        text-align: start;
        color: #fff;
      }
      h3 {
        text-align: center;
        color: #fff;
      }
      p {
        line-height: 22px;
        color: #fff;
      }
      img {
        display: block;
        margin: 0 auto;
      }
      
    </style>
  </head>
  <body style="font-family: 'Arial', sans-serif; justify-content: center; display: flex">
    <table>
      <tr>
        <td>
          <img
            src="${image}"
            alt="logo"
            width="210"
            height="100" />
        </td>
      </tr>
      <tr class="contenidoPrincipal">
        <td class="contenido">
          <h2 id="title"> ¡Bienvenido a InfinityTools, ${name}! </h2>
          <!-- Contenido de tu correo -->
          <p>
            Estamos emocionados de tenerte con nosotros y queremos agradecerte por unirte a nuestra
            comunidad. En InfinityTools, te ofrecemos una experiencia de compra excepcional y la
            oportunidad de equiparte con las mejores herramientas eléctricas del mercado.
          </p>
          <ul>
            <li>
               <strong>Herramientas de Calidad:</strong> Descubre una amplia variedad de
              herramientas eléctricas de alta calidad y de las mejores marcas.
            </li>
            <li>
               <strong>Realiza Compras Seguras:</strong> Disfruta de compras seguras con nuestro
              sistema de pago protegido.
            </li>
            <li>
               <strong>Envíos a Todo el País:</strong> Recibe tus herramientas en cualquier parte
              del país con nuestro servicio de envíos rápidos y fiables.
            </li>
          </ul>
          <p>
            Como agradecimiento por unirte a nosotros, aquí tienes un código de descuento del 10%
            para tu primera compra:
          </p>
          <h3> INFINITYTOOLS10 </h3>
          <p>¡Aprovecha esta oportunidad y equipa tu taller con las mejores herramientas!</p>
          <p>
             Saludos,<br />
            <u> Equipo de InfinityTools.</u>
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>

      `,
      attachments: [
        {
          filename: 'logo.png',
          path: image,
          cid: 'imagenCid',
        },
      ],
    };
    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Correo enviado correctamente');
    } catch (error) {
      console.error(`Error al enviar email: ${error.message}`);
    }
  }
}

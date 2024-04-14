import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import type { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });

  app.use(morgan('dev'));
  // app.enableCors();
  app.enableCors({
    origin: '*',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: [
      'Content-Type-application/json',
      'Authorization',
      'Origin',
      'X-Requested-With',
      'Accept',
    ],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  // app.use(cookieParser());
  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          imgSrc: [
            "'self'",
            'data:',
            'apollo-server-landing-page.cdn.apollographql.com',
            'res.cloudinary.com',
            '*.googleusercontent.com',
          ],
          scriptSrc: [
            "'self'",
            "https: 'unsafe-inline'",
            'https://cdn.jsdelivr.net/npm/@apollographql/client@3.6.6/dist/bundle.js',
          ],
          manifestSrc: [
            "'self'",
            'apollo-server-landing-page.cdn.apollographql.com',
            'res.cloudinary.com',
          ],
          frameSrc: ["'self'", 'sandbox.embed.apollographql.com'],
        },
      },
    })
  );

  app.use(cookieParser());
  await app.listen(3000);

  console.log('http://localhost:3000');
}
bootstrap();

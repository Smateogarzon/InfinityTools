import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import type { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';
import helmet from 'helmet';
import * as session from 'express-session';
import * as passport from 'passport';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });

  app.use(morgan('dev'));
  // app.enableCors();
  app.enableCors({
    origin: ['http://localhost:5173', 'https://infinity-tools.vercel.app'],
    credentials: true,
    methods: 'GET,PUT,PATCH,POST,DELETE',
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
      'apollo-require-preflight',
    ],
  });

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
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 5 }));
  await app.listen(3000);

  console.log(`${process.env.HOST}`);
}
bootstrap();

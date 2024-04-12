import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterMiddleware } from './middleware/multer';
import { EmailService } from './services/emailSend.service';
import { NodemailerConfigService } from './config/email.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, EmailService, NodemailerConfigService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MulterMiddleware).forRoutes('*');
  }
}

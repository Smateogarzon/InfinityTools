import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailService } from './services/emailSend.service';
import { NodemailerConfigService } from './config/email.config';
import { JwtModule } from '@nestjs/jwt';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './graphql/users/users.module';
import { LocationModule } from './graphql/location/location.module';
import { GoogleStrategyConfig } from './config/googleStrategi';
import { Auth } from './auth.service';
import { UserSchema } from './graphql/users/entities/user.entity';
import { SerealizerG } from './config/SerealizerG';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
      global: true,
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      path: 'api/graphql',
      // buildSchemaOptions: {
      //   fieldMiddleware: [loggerMiddleware],
      // },
      subscriptions: {
        'graphql-ws': true,
      },
    }),
    UsersModule,
    LocationModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    PassportModule.register({ session: true }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    EmailService,
    NodemailerConfigService,
    GoogleStrategyConfig,
    SerealizerG,
    {
      provide: 'AUTH_SERVICE',
      useClass: Auth,
    },
  ],
})
export class AppModule {}

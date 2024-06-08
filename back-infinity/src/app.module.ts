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
import { JwtServices } from './services/jwt.service';
import { FacebookStrategy } from './config/facebookStrategi';
import { ProductsModule } from './graphql/products/products.module';
import { BrandsModule } from './graphql/brands/brands.module';
import { CategoryModule } from './graphql/category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '10h' },
      global: true,
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      path: 'api/graphql',
      subscriptions: {
        'graphql-ws': true,
      },
      context: ({ req, res }) => ({ req, res }),
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
      csrfPrevention: true,
    }),
    UsersModule,
    LocationModule,
    ProductsModule,
    BrandsModule,
    CategoryModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    PassportModule.register({ session: true }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    EmailService,
    NodemailerConfigService,
    JwtServices,
    GoogleStrategyConfig,
    SerealizerG,
    {
      provide: 'AUTH_SERVICE',
      useClass: Auth,
    },
    FacebookStrategy,
  ],
})
export class AppModule {}

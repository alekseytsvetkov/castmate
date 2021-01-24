import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule, AuthService } from '@castmate/auth';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './config/db.config';
import baseConfig from './config/base.config';
import authConfig from './config/auth.config';
import authGoogleConfig from './config/authGoogle.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig, baseConfig, authConfig, authGoogleConfig],
    }),
    GraphQLModule.forRootAsync({
      imports: [AuthModule],
      inject: [AuthService],
      useFactory: async (
        authService: AuthService,
      ) => ({
        installSubscriptionHandlers: true,
        autoSchemaFile: 'schema.gql',
      })
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

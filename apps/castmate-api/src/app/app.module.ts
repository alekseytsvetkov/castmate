import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule, AuthService } from '@castmate/auth';
import { UserModule } from '@castmate/user';
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
        context: async ({ req }) => {
          const accessToken = authService.accessTokenFromHeader(
            req?.headers?.authorization
          );

          let userId;
          let tokenIsInvalid = false;

          if (accessToken) {
            const payload: any = authService.jwtValidation(accessToken);

            if (payload) {
              userId = payload.userId;
            } else {
              tokenIsInvalid = true;
            }
          }

          return { userId, tokenIsInvalid };
        },
        subscriptions: {
          keepAlive: 3000,
          onConnect: async (
            connectionParams: { accessToken?: string },
            _webSocket,
            context
          ) => {
            const accessToken = connectionParams?.accessToken;

            let ipHash;

            const xForwardedFor =
              context.request.headers['x-original-forwarded-for'];

            if (xForwardedFor && typeof xForwardedFor === 'string') {
              const ip = xForwardedFor.split(/\s*,\s*/)[0];
              ipHash = Buffer.from(ip).toString('base64');
            }

            let userId;
            let tokenIsInvalid = false;

            if (accessToken) {
              const payload: any = authService.jwtValidation(accessToken);

              if (payload) {
                userId = payload.userId;
              } else {
                tokenIsInvalid = true;
              }
            }

            if (!tokenIsInvalid) {
              return {
                userId,
                ipHash,
                tokenIsInvalid,
              };
            }

            return false;
          },
          onDisconnect: async (_webSocket, context) => {
            const data = await context.initPromise;
          },
        },
      }),
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

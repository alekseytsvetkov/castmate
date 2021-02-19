import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import * as connectRedis from 'connect-redis';
import * as Redis from 'ioredis';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
    },
  });

  const config = app.get('ConfigService');

  const RedisStore = connectRedis(session);

  app.use(
    session({
      store: new RedisStore({
        client: new Redis(config.get('db.redisUrl')),
      }),
      secret: config.get('auth.sessionSecret'),
      name: 'appsessions',
      resave: false,
      saveUninitialized: false,
    })
  );

  await app.startAllMicroservicesAsync();
  await app.listen(3333);
}

bootstrap();
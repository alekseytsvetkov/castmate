import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { SocketIoAdapter } from './app/adapters/socket-io.adapter';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
      credentials: true
    },
  });

  app.use(
    session({
      secret: 'my-castmate-secret',
      resave: false,
      saveUninitialized: false,
    })
  );

  app.useWebSocketAdapter(new SocketIoAdapter(app));

  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port);
  });
}

bootstrap();

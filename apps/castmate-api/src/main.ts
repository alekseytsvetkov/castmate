import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { AppModule } from './app/app.module';

declare const module: any;

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

  const port = process.env.PORT || 3333;
  await app.startAllMicroservicesAsync();
  await app.listen(port, () => {
    Logger.log('Listening at https://castmate-api.kive.dev');
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();

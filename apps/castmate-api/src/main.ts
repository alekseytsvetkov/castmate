import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { AppModule } from './app/app.module';
import * as Sentry from "@sentry/node";

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
      credentials: true
    },
  });

  Sentry.init({
    dsn: "https://01c6d7a9b96541f4bf06299265be3b2f@o486817.ingest.sentry.io/5626220",
    environment: process.env.ENVIRONMENT,
    release: process.env.RELEASE,
    enabled: process.env.ENVIRONMENT === 'production',

    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
    ],
    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
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
    Logger.log('Listening at http://localhost:' + port);
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();

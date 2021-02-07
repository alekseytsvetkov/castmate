import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@castmate/utils/apollo';
import NProgress from 'nprogress';
import { version } from '../../../package.json';
import { GlobalStyle } from '@castmate/utils/global';
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';
import * as Sentry from '@sentry/node';
import { Integrations } from "@sentry/tracing";

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    // enabled: process.env.ENVIRONMENT === 'production',
    enabled: process.env.ENVIRONMENT === 'dev',
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

    integrations: [new Integrations.BrowserTracing()],
    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });
}

function CustomApp({ Component, pageProps, err }) {
  console.log(`Version: ${version}`);

  if (typeof window !== 'undefined') {
    LogRocket.init('jf3c52/castmate');
    // plugins should also only be initialized when in the browser
    setupLogRocketReact(LogRocket);
  }


  const apolloClient = useApollo({
    uri: 'http://localhost:3333/graphql',
    pageProps,
  });

  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <title>Castmate</title>
      </Head>
      <Component {...pageProps} err={err} />
      <GlobalStyle />
    </ApolloProvider>
  );
}

export default CustomApp;

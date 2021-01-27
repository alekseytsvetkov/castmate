import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@castmate/utils/apollo';
import NProgress from 'nprogress';
import { version } from '../../../package.json';
import { GlobalStyle } from '@castmate/utils/global';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function CustomApp({ Component, pageProps }: AppProps) {
  console.log(`Version: ${version}`);
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
        <title>Castmate - Early Access Alpha</title>
      </Head>
      <Component {...pageProps} />
      <GlobalStyle />
    </ApolloProvider>
  );
}

export default CustomApp;

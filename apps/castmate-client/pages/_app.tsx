import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@castmate/utils/apollo';
import NProgress from 'nprogress';
import '../styles/globals.css'

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function CustomApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo({
    uri: 'https://castmate-api.kive.dev/graphql',
    pageProps,
  });

  return (
    <ApolloProvider client={apolloClient}>
      <>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
          <title>Castmate</title>
        </Head>
        <Component {...pageProps} />
      </>
    </ApolloProvider>
  );
}

export default CustomApp;

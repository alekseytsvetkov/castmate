import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@castmate/utils/apollo';

function CustomApp({ Component, pageProps }: AppProps) {
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
    </ApolloProvider>
  );
}

export default CustomApp;

import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@castmate/utils/apollo';

export const WithApollo: React.FC = ({ children }) => {
  const apolloClient = useApollo({
    uri: 'https://localhost:3333/graphql',
  });

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
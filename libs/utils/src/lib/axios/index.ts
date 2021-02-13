import { gql } from '@apollo/client';
import axios from 'axios';
import { initializeApollo } from '../apollo';

const apolloClient = initializeApollo(
  null,
  'https://castmate-api.kive.dev/graphql'
);

const getAccessToken = async () => {
  const d = await apolloClient.query({
    query: gql`
      query googleToken {
        googleToken
      }
    `,
  });

  return d?.data?.googleToken || '';
};

const refreshAccessToken = async () => {
  const d = await apolloClient.mutate({
    mutation: gql`
      mutation refreshGoogleToken {
        refreshGoogleToken
      }
    `,
  });

  return d?.data?.refreshGoogleToken || '';
};

// request interceptor to add token to request headers
axios.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('googleAccessToken');

    if (token) {
      config.headers = {
        authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// response interceptor intercepting 401 responses, refreshing token and retrying the request
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error);
    const config = error.config;

    if (error.response.status === 401 && !config._retry) {
      config._retry = true;

      if (error.response?.data?.error?.message === 'No token provided') {
        localStorage.setItem('googleAccessToken', await getAccessToken());
      } else {
        localStorage.setItem('googleAccessToken', await refreshAccessToken());
      }

      return axios(config);
    }

    return Promise.reject(error);
  }
);

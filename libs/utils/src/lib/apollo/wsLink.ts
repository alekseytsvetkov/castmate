import { WebSocketLink } from '@apollo/client/link/ws';
import { getAccessToken } from '../token';
import { refreshTokens } from './refreshTokens';

export const getWsLink = () =>
  new WebSocketLink({
    uri: `ws://castmate-api.kive.dev/graphql`,
    options: {
      reconnect: true,
      connectionParams: async () => {
        const accessToken = getAccessToken();
        return { accessToken };
      },
      connectionCallback: (error) => {
        if (error) {
          refreshTokens();
        }
      },
    },
  });

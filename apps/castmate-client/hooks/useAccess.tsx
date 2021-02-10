import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const GET_ME = gql`
  query me {
    me {
      id
    }
  }
`;

interface IUser {
  id: string;
}

export function useAccess(allow?: (currentUser: IUser) => boolean) {
  const { loading, error, data } = useQuery(GET_ME, { ssr: false });

  if (loading || error || !data.me) {
    return [{ loading, allow: false }];
  }

  if (typeof allow === 'function' && allow(data.me)) {
    return [{ loading, allow: true }];
  }

  if (typeof allow !== 'function' && !!data.me) {
    return [{ loading, allow: true }];
  }

  return [{ loading, allow: false }];
}

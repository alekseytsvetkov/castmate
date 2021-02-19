import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { removeToken } from '@castmate/auth';
import { UserCircleIcon } from '@castmate/icons/user-circle';
import {
  useMeQuery,
  useLogoutMutation,
  useUpdateConnectionStatusMutation,
} from './api';

const UserPanelForGuest = () => {
  const router = useRouter();

  return (
    <Link
      as={`/auth?continue=${router.asPath}`}
      href={{
        pathname: router.route,
        query: {
          ...router.query,
          authModal: 1,
          continue: router.asPath,
        },
      }}
      passHref
    >
      <div className="flex items-center justify-center w-48px h-48px bg-surface border-t border-background cursor-pointer">
        <UserCircleIcon />
      </div>
    </Link>
  );
};

export const UserPanel = () => {
  const { query } = useRouter();
  const room =
    typeof query?.room === 'string' ? query?.room : undefined;

  const userQuery = useMeQuery();
  const [updateStatus] = useUpdateConnectionStatusMutation();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const interval = setInterval(() => {
        updateStatus({ variables: { room } });
      }, 4000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [updateStatus, room]);

  const [logout] = useLogoutMutation({
    onCompleted: () => {
      removeToken();
      window.location.reload();
    },
  });

  const user = userQuery.data?.me;
  const name = user?.name;
  const avatar = user?.avatar;

  if (!user) {
    return <UserPanelForGuest />;
  }

  return (
    <div
      className="flex items-center justify-center w-48px h-48px bg-surface border-t border-background cursor-pointer"
      onClick={() => logout()}
    >
      <div className="rounded-full bg-background h-32px w-32px flex items-center justify-center">
        <img src={avatar} alt={name} className="h-full w-full rounded-full" />
      </div>
    </div>
  );
};

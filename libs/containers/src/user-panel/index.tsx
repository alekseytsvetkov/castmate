import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SimpleBar from 'simplebar-react';
import { UserGroupIcon } from '@castmate/icons/user-group';
import { HeartIcon } from '@castmate/icons/heart';
import { AppPanelFriends } from '@castmate/community';
import { UserPanel } from '@castmate/user';

const Me = () => {
  return (
    // <Link href="/">
    //   <div className="flex items-center justify-center w-48px h-48px rounded-lg bg-primary cursor-pointer mb-3 hover:opacity-90"></div>
    // </Link>
    <UserPanel />
  );
};

export const AppUserPanel = () => {
  return (
    <div className="h-screen flex flex-col flex-shrink-0 min-w-70px p-2 bg-surface overflow-hidden">
      <Me />
      <AppPanelFriends />
    </div>
  );
};

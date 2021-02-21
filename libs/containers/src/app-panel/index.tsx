import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SimpleBar from 'simplebar-react';
import { UserGroupIcon } from '@castmate/icons/user-group';
import { HeartIcon } from '@castmate/icons/heart';
import { AppPanelCommunities } from '@castmate/community';

const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center justify-center w-50px h-50px rounded-lg mb-3 bg-primary cursor-pointer hover:opacity-90"></div>
    </Link>
  );
};

export const AppPanel = () => {
  return (
    <div className="h-screen flex flex-col flex-shrink-0 min-w-70px p-3 bg-surface overflow-hidden">
      <Logo />
      <AppPanelCommunities />
    </div>
  );
};

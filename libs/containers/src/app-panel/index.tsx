import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SimpleBar from 'simplebar-react';
import { UserGroupIcon } from '@castmate/icons/user-group';
import { HeartIcon } from '@castmate/icons/heart';
import { UserPanel } from '@castmate/user';
import { AppPanelRooms } from '@castmate/room';

const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center justify-center w-48px h-48px cursor-pointer hover:opacity-90">
        <div className="flex justify-center items-center h-32px w-32px">
          <span className="text-text">D</span>
        </div>
      </div>
    </Link>
  );
};

export const AppPanel = () => {
  return (
    <div className="h-screen flex flex-col flex-shrink-0 min-w-48px bg-surface border-r border-background overflow-hidden">
      <Logo />
      <AppPanelRooms />
      {/* <Friends /> */}
      <UserPanel />
    </div>
  );
};
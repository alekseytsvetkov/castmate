import React from 'react';
import { AppPanel } from '@castmate/containers/app-panel';
import { AppUserPanel } from '@castmate/containers/user-panel';
import { Modals } from '@castmate/containers/modals';

export const MainLayout: React.FC = ({ children }) => {
  return (
    <>
      <div className="h-screen bg-background flex">
        <AppPanel />
        {children}
        <AppUserPanel />
      </div>
      <Modals />
    </>
  );
};

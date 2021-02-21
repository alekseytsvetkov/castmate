import React from 'react';
import { AppPanel } from '@castmate/containers/app-panel';
import { Modals } from '@castmate/containers/modals';
import { UserPanel } from '@castmate/user';
import { useUniqCountQuery } from '@castmate/community';

export const MainLayout: React.FC = ({ children }) => {

  const uniqCountQuery = useUniqCountQuery({ pollInterval: 3000 });
  const uniqCount = uniqCountQuery?.data?.uniqCount || 0;

  return (
    <>
      <div className="h-screen bg-background flex">
        <AppPanel />
        {children}
      </div>
      <Modals />
    </>
  );
};

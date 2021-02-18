import React from 'react';
import { Modals } from '@castmate/containers/modals';

export const MainLayout: React.FC = ({ children }) => {
  return (
    <>
      <div className="h-screen bg-background flex">
        {children}
      </div>
      <Modals />
    </>
  );
};
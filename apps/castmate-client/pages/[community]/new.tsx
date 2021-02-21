import React from 'react';
import { MainLayout } from '@castmate/layouts/main';
import { CommunityLeftPanel, NewChannel } from '@castmate/community';

export function CommunityChannelPage() {
  return (
    <MainLayout>
      <CommunityLeftPanel />
      <div className="h-screen w-full flex flex-1 items-center justify-center">
        <div className="bg-surface w-full border-l-2 border-background p-2 max-w-xl rounded overflow-hidden">
          <NewChannel />
        </div>
      </div>
    </MainLayout>
  );
}

export default CommunityChannelPage;
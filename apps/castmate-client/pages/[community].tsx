import React from 'react';
import { MainLayout } from '@castmate/layouts/main';
import { CommunityLeftPanel, CommunityWelcome } from '@castmate/community';

export function CommunityPage() {
  return (
    <MainLayout>
      <CommunityLeftPanel />
      <CommunityWelcome />
    </MainLayout>
  );
}

export default CommunityPage;
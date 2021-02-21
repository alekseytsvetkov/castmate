import React from 'react';
import { MainLayout } from '@castmate/layouts/main';
import {
  CommunityLeftPanel,
  CommunityContent,
  CommunityRightPanel,
} from '@castmate/community';

export function CommunityChannelPage() {
  return (
    <MainLayout>
      <CommunityLeftPanel />
      <CommunityContent />
      <CommunityRightPanel />
    </MainLayout>
  );
}

export default CommunityChannelPage;
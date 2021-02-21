import React from 'react';
import { MainLayout } from '@castmate/layouts/main';
import { MainCommunities } from '@castmate/community';

export function IndexPage() {
  return (
    <MainLayout>
      <MainCommunities />
    </MainLayout>
  );
}

export default IndexPage;

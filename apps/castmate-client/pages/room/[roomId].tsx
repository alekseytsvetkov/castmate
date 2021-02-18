import React from 'react';
import { MainLayout } from '@castmate/layouts/main';
import {
  RoomContent,
  RoomRightPanel,
} from '@castmate/room';

export function RoomPage() {
  return (
    <MainLayout>
      <RoomContent />
      <RoomRightPanel />
    </MainLayout>
  );
}

export default RoomPage;
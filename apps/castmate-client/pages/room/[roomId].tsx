import React from 'react';
import { CurrentRoom } from '@castmate/room';
import { CastmateLayout } from '@castmate/ui';
import { Community } from '@castmate/community';
import { useRouter } from 'next/router';
import {
  useRoomQuery
} from '@castmate/room';

export function RoomPage() {
  const router = useRouter();

  const roomId = router.query.id;

  if (typeof roomId !== 'string') {
    return null;
  }

  const { data, loading } = useRoomQuery({
    variables: { roomId },
  });

  // const loading = true;

  return (
    <CastmateLayout>
      <Community title={`Room`}>
        <CurrentRoom data={data} loading={loading} roomId={roomId} />
      </Community>
    </CastmateLayout>
  )
}

export default RoomPage;

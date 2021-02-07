import React from 'react';
import { CurrentRoom, useJoinRoomMutation } from '@castmate/room';
import { CastmateLayout } from '@castmate/ui';
import { Community } from '@castmate/community';
import { useRouter } from 'next/router';
import {
  useRoomQuery
} from '@castmate/room';

export function RoomPage() {
  const router = useRouter();

  const roomId = router.query.roomId;

  if (typeof roomId !== 'string') {
    return null;
  }

  const { data, loading } = useRoomQuery({
    variables: { roomId },
  });

  const [joinRoomMutation, { data: dataJoinRoom, loading: loadingJoinRoom, error: errorJoinRoom }] = useJoinRoomMutation();

  const joinRoom = async (roomId: string) => {
    const response = await joinRoomMutation({
      variables: {
        input: {
          roomId
        }
      },
    })

    console.log('response', response);
  }

  joinRoom(roomId);

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

import React from 'react';
import { AnnotationIcon } from '@castmate/icons/annotation';
import { UsersIcon } from '@castmate/icons/users';
import { Chat } from '@castmate/chat';
import { useRouter } from 'next/router';
import { useRoomQuery } from '../api';

export const RoomRightPanel = () => {
  const { query } = useRouter();
  const name = typeof query?.room === 'string' && query?.room;

  const roomsQuery = useRoomQuery({
    variables: { name },
    skip: !name,
  });

  const room = roomsQuery?.data?.room;

  return (
    <div className="h-screen flex flex-col w-320px bg-surface">
      <div className="flex border-b border-background">
        <div className="flex flex-1 justify-center px-4 py-2 bg-surface">
          <span className="text-text text-sm">
            <AnnotationIcon />
          </span>
        </div>
        <div className="flex flex-1 justify-center px-4 py-2 bg-surface">
          <span className="text-text text-sm">
            <UsersIcon />
          </span>
        </div>
      </div>
      <Chat roomId={room?.id} />
    </div>
  );
};
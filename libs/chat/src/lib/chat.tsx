import React from 'react';
import {
  useRoomMessagesQuery,
  useRoomMessageCreatedSubscription,
} from './api';
import { ChatMessages } from './messages';
import { ChatBottom } from './bottom';

export const Chat: React.FC<{ roomId: string }> = ({ roomId }) => {
  const messagesQuery = useRoomMessagesQuery({
    variables: { roomId },
    skip: !roomId,
  });

  useRoomMessageCreatedSubscription({
    variables: { roomId },
    skip: !roomId,
    onSubscriptionData: ({ subscriptionData }) => {
      if (!subscriptionData.data) return;

      const chatMessage = subscriptionData.data.roomMessageCreated;

      messagesQuery.updateQuery((prev) => {
        if (
          prev.roomMessages.findIndex((c) => c.id === chatMessage.id) < 0
        ) {
          return {
            ...prev,
            roomMessages: [...prev.roomMessages.slice(-50), chatMessage],
          };
        }
      });
    },
  });

  const messages = messagesQuery.data?.roomMessages || [];

  return (
    <>
      <div className="flex flex-1 w-full overflow-hidden">
        <div className="flex flex-col w-full max-h-max overflow-y-auto py-4">
          <ChatMessages messages={messages} />
        </div>
      </div>

      <ChatBottom roomId={roomId} />
    </>
  );
};
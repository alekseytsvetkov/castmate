import React, {useRef} from 'react'
import styled from 'styled-components';
import { lighten } from 'polished';
import { useCreateRoomMessageMutation, useRoomMessageCreatedSubscription, useRoomMessagesQuery } from '../types';

const Chat = styled.div``;

const SidebarTitle = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.accent1};
  padding-bottom: 20px;
  margin: 20px 0;
`;

const ChatForm = styled.div`
  padding-top: 10px;
  border-top: 1px solid ${({ theme }) => theme.colors.accent1};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChatInput = styled.input`
  border: none;
  background: ${({ theme }) => theme.colors.dark1};
  color: ${({ theme }) => theme.colors.accent2};
  font-size: 14px;
  margin-right: 20px;
  padding: 20px;
  padding-left: 0;
  padding-right: 0;
  outline: none;
  min-width: 276px;
`;

const ChatButton = styled.button`
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.castmate};
  color: ${({ theme }) => theme.colors.text1};
  outline: none;
  cursor: pointer;
  padding: 12px 16px;
  height: 100%;
  :focus {
    background: ${({ theme }) =>
      lighten(0.1, theme.colors['castmate'])};
  }
  :hover {
    background: ${({ theme }) =>
      lighten(0.05, theme.colors['castmate'])};
  }
`;

const ChatMessages = styled.div`
  min-height: 250px;
  max-height: 250px;
  overflow-x: scroll;
  margin-bottom: 20px;
`;

const ChatMessage = styled.div`
  display: flex;
  font-size: 14px;
  color: rgba(255,255,255,0.6);
  margin-bottom: 5px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const MessageAuthor = styled.div`
  color: rgba(255,255,255,0.8);
  margin-right: 5px;
`;

const MessageText = styled.div``;

const ChatBox = ({ roomId }) => {
  const messagesQuery = useRoomMessagesQuery({
    variables: { roomId },
  });

  useRoomMessageCreatedSubscription({
    variables: { roomId },
    onSubscriptionData: ({ subscriptionData }) => {
      if (!subscriptionData.data) return;

      const chatMessage = subscriptionData.data.roomMessageCreated;

      messagesQuery.updateQuery((prev) => {
        if (prev.roomMessages.findIndex((c) => c.id === chatMessage.id) < 0) {
          return {
            ...prev,
            chatMessages: [...prev.roomMessages.slice(-50), chatMessage],
          };
        }
      });
    },
  });

  const messages = messagesQuery.data?.roomMessages || [];

  const textInput = useRef<HTMLInputElement>(null);
  //   const [{ allow: isAllow }] = useAccess();
  const isAllow = true;
  let lock = false;

  const [createRoomMessage] = useCreateRoomMessageMutation({
    onCompleted: (data) => {
      if (data.createRoomMessage && textInput.current) {
        textInput.current.value = '';
        lock = false;
      }
    },
  });

  return (
    <Chat>
      <SidebarTitle>Chat</SidebarTitle>
      <ChatMessages>
        {/* @ts-ignore */}
        {messages.map(message => {
          return <ChatMessage key={message.id}>
          <MessageAuthor>{message.author.profile.name}:</MessageAuthor>
          <MessageText>{message.content}</MessageText>
        </ChatMessage>
        })}
      </ChatMessages>
      <ChatForm>
        <ChatInput
          autoFocus
          disabled={!isAllow}
          type="text"
          ref={textInput}
          placeholder="Type to write a message"
          maxLength={500}
          onKeyPress={(e) => {
            if (!textInput.current) {
              return null;
            }
            //   const text = convertTextToEmojiCode(textInput.current.value.trim());
            const text = textInput.current.value.trim();

            if (e.key === 'Enter' && !lock && text.length > 0) {
              lock = true;
              createRoomMessage({
                variables: { input: { roomId, text } },
              });
            }
          }}
        />
        <ChatButton
          onClick={(e) => {
            if (!textInput.current) {
              return null;
            }
            const text = textInput.current.value.trim();

            if (!lock && text.length > 0) {
              lock = true;
              createRoomMessage({
                variables: { input: { roomId, text } },
              });
            }
          }}>Send</ChatButton>
      </ChatForm>
    </Chat>
  )
}

export default ChatBox

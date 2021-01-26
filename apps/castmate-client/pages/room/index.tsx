import React from 'react';
import { CastmateLayout, Player } from '@castmate/ui';
import { Community } from '@castmate/containers/Castmate/Community';
import styled from 'styled-components';
import { lighten } from 'polished';

const RoomBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const RoomActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
`;

const LeaveRoom = styled.div`
  padding: 16px 20px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.red};
  max-width: 200px;
  :focus {
    background: ${({ theme }) =>
      lighten(0.1, theme.colors['red'])};
  }
  :hover {
    background: ${({ theme }) =>
      lighten(0.05, theme.colors['red'])};
    cursor: pointer;
  }
`;

const RoomContent = styled.div`
  min-width: 70%;
  padding: 20px;
`;

const RightSidebar = styled.div`
  width: 30%;
  padding-left: 20px;
  padding-right: 20px;
  border-left: 1px solid ${({ theme }) => theme.colors.accent1};
  padding: 20px;
  height: 100%;
`;

const Members = styled.div``;

const Chat = styled.div``;

const SidebarTitle = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.accent1};
  padding-bottom: 20px;
  margin-bottom: 20px;
`;

const MembersList = styled.ul`
  padding: 0;
  list-style: none;
  max-height: 125px;
  overflow-x: scroll;
`;

const MemberItem = styled.li`
  display: flex;
  align-items: center;
  padding: 6px;
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
  color: rgba(255,255,255,0.6);
  font-weight: 400;
  font-size: 14px;
  border-radius: 12px;
  border: 1px solid transparent;
  img {
    border-radius: 8px;
    height: 40px;
    width: 40px;
    margin-right: 10px;
  }
  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.accent1};
    background: ${({ theme }) => theme.colors.dark2};
    cursor: pointer;
  }
`;

const ChatMessages = styled.div`
  max-height: 290px;
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
  width: 100%;
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

export function Room() {
  return (
    <CastmateLayout>
      <Community title="Room">
        <RoomBox>
          <RoomContent>
            <Player height="500px" />
            <RoomActions>
              <LeaveRoom>Leave Room</LeaveRoom>
            </RoomActions>
          </RoomContent>
          <RightSidebar>
            <Members>
              <SidebarTitle>Members</SidebarTitle>
              <MembersList>
                <MemberItem>
                  <img src="https://randomuser.me/api/portraits/women/44.jpg" />
                  <div>Kelly Turner</div>
                </MemberItem>
                <MemberItem>
                  <img src="https://randomuser.me/api/portraits/women/11.jpg" />
                  <div>Sharlene Hale</div>
                </MemberItem>
                <MemberItem>
                  <img src="https://randomuser.me/api/portraits/men/11.jpg" />
                  <div>Lee Montgomery</div>
                </MemberItem>
                <MemberItem>
                  <img src="https://randomuser.me/api/portraits/men/42.jpg" />
                  <div>Juan Barrett</div>
                </MemberItem>
                <MemberItem>
                  <img src="https://randomuser.me/api/portraits/women/44.jpg" />
                  <div>Kelly Turner</div>
                </MemberItem>
                <MemberItem>
                  <img src="https://randomuser.me/api/portraits/women/11.jpg" />
                  <div>Sharlene Hale</div>
                </MemberItem>
                <MemberItem>
                  <img src="https://randomuser.me/api/portraits/men/11.jpg" />
                  <div>Lee Montgomery</div>
                </MemberItem>
                <MemberItem>
                  <img src="https://randomuser.me/api/portraits/men/42.jpg" />
                  <div>Juan Barrett</div>
                </MemberItem>
              </MembersList>
            </Members>
            <Chat>
              <SidebarTitle>Chat</SidebarTitle>
              <ChatMessages>
                <ChatMessage>
                  <MessageAuthor>Kelly Turner:</MessageAuthor>
                  <MessageText>Hello</MessageText>
                </ChatMessage>
                <ChatMessage>
                  <MessageAuthor>Sharlene Hale:</MessageAuthor>
                  <MessageText>Something medium size message</MessageText>
                </ChatMessage>
                <ChatMessage>
                  <MessageAuthor>Kelly Turner:</MessageAuthor>
                  <MessageText>Hello</MessageText>
                </ChatMessage>
                <ChatMessage>
                  <MessageAuthor>Sharlene Hale:</MessageAuthor>
                  <MessageText>Small size message</MessageText>
                </ChatMessage>
                <ChatMessage>
                  <MessageAuthor>Kelly Turner:</MessageAuthor>
                  <MessageText>Hello</MessageText>
                </ChatMessage>
                <ChatMessage>
                  <MessageAuthor>Sharlene Hale:</MessageAuthor>
                  <MessageText>Something medium size message</MessageText>
                </ChatMessage>
                <ChatMessage>
                  <MessageAuthor>Kelly Turner:</MessageAuthor>
                  <MessageText>Hello</MessageText>
                </ChatMessage>
                <ChatMessage>
                  <MessageAuthor>Sharlene Hale:</MessageAuthor>
                  <MessageText>Small size message</MessageText>
                </ChatMessage>
                <ChatMessage>
                  <MessageAuthor>Kelly Turner:</MessageAuthor>
                  <MessageText>Hello</MessageText>
                </ChatMessage>
                <ChatMessage>
                  <MessageAuthor>Sharlene Hale:</MessageAuthor>
                  <MessageText>Something medium size message</MessageText>
                </ChatMessage>
                <ChatMessage>
                  <MessageAuthor>Kelly Turner:</MessageAuthor>
                  <MessageText>Hello</MessageText>
                </ChatMessage>
                <ChatMessage>
                  <MessageAuthor>Sharlene Hale:</MessageAuthor>
                  <MessageText>Small size message</MessageText>
                </ChatMessage>
                <ChatMessage>
                  <MessageAuthor>Kelly Turner:</MessageAuthor>
                  <MessageText>Hello</MessageText>
                </ChatMessage>
                <ChatMessage>
                  <MessageAuthor>Sharlene Hale:</MessageAuthor>
                  <MessageText>Something medium size message</MessageText>
                </ChatMessage>
                <ChatMessage>
                  <MessageAuthor>Kelly Turner:</MessageAuthor>
                  <MessageText>Hello</MessageText>
                </ChatMessage>
                <ChatMessage>
                  <MessageAuthor>Sharlene Hale:</MessageAuthor>
                  <MessageText>Small size message</MessageText>
                </ChatMessage>
                <ChatMessage>
                  <MessageAuthor>Sharlene Hale:</MessageAuthor>
                  <MessageText>Small size message</MessageText>
                </ChatMessage>
                <ChatMessage>
                  <MessageAuthor>Kelly Turner:</MessageAuthor>
                  <MessageText>Hello</MessageText>
                </ChatMessage>
                <ChatMessage>
                  <MessageAuthor>Sharlene Hale:</MessageAuthor>
                  <MessageText>Something medium size message</MessageText>
                </ChatMessage>
                <ChatMessage>
                  <MessageAuthor>Kelly Turner:</MessageAuthor>
                  <MessageText>Hello</MessageText>
                </ChatMessage>
              </ChatMessages>
              <ChatForm>
                <ChatInput type="text" placeholder="Type to write a message" />
                <ChatButton>Send</ChatButton>
              </ChatForm>
            </Chat>
          </RightSidebar>
        </RoomBox>
      </Community>
    </CastmateLayout>
  );
}

export default Room;

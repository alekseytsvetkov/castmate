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
  max-height: 185px;
  overflow-x: scroll;
`;

const MemberItem = styled.li`
  display: flex;
  align-items: center;
  padding: 6px;
  margin-bottom: 10px;
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
            </Chat>
          </RightSidebar>
        </RoomBox>
      </Community>
    </CastmateLayout>
  );
}

export default Room;

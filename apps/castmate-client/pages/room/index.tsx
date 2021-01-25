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

const Chat = styled.div``;

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
            <Chat />
            <div>Members</div>
            <div>Chat</div>
          </RightSidebar>
        </RoomBox>
      </Community>
    </CastmateLayout>
  );
}

export default Room;

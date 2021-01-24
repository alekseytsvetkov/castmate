import React from 'react';
import { CastmateLayout, Player } from '@castmate/ui';
import { Community } from '@castmate/containers/Castmate/Community';
import styled from 'styled-components';
import { lighten } from 'polished';

const RoomBox = styled.div`
  display: flex;
  flex-direction: column;
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

export function Room() {
  return (
    <CastmateLayout>
      <Community title="Room">
        <RoomBox>
          <Player />
          <RoomActions>
            <LeaveRoom>Leave Room</LeaveRoom>
          </RoomActions>
        </RoomBox>
      </Community>
    </CastmateLayout>
  );
}

export default Room;

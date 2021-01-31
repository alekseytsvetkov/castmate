import React from 'react';
import { CastmateLayout } from '@castmate/ui';
import { Community } from '@castmate/community';
import styled from 'styled-components';
import { lighten } from 'polished';

const RoomsList = styled.div`
  display: flex;
  max-width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Room = styled.div`
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.dark2};
  padding: 20px;
  min-width: 430px;
  border: 1px solid rgba(255,255,255,.1);
  margin-bottom: 20px;
  max-height: 100%;
`;

const RoomContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RoomName = styled.div`
`;

const RoomDescription = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 14px;
`;

const RoomMembersList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
`;

const RoomMember = styled.li`
  margin-right: 10px;
  cursor: pointer;
`;

const RoomButton = styled.button`
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.castmate};
  color: ${({ theme }) => theme.colors.text1};
  outline: none;
  cursor: pointer;
  padding: 16px;
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

const RoomMemberAvatar = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 8px;
  overflow: hidden;
`;

const RoomMemberMore = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.dark2};
  border: 1px solid rgba(255,255,255,.1);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export function Rooms() {
  return (
    <CastmateLayout>
      <Community title="Rooms">
        <RoomsList>
          <Room>
            <RoomName>Room name</RoomName>
            <RoomDescription>Room description</RoomDescription>
            <RoomContent>
              <RoomMembersList>
                <RoomMember>
                  <RoomMemberAvatar
                    src={"https://randomuser.me/api/portraits/men/79.jpg"}
                    alt={"user"}
                    onClick={() => console.log('user click')}
                  />
                </RoomMember>
                <RoomMember>
                  <RoomMemberAvatar
                    src={"https://randomuser.me/api/portraits/women/65.jpg"}
                    alt={"user"}
                    onClick={() => console.log('user click')}
                  />
                </RoomMember>
                <RoomMember>
                  <RoomMemberAvatar
                    src={"https://randomuser.me/api/portraits/men/47.jpg"}
                    alt={"user"}
                    onClick={() => console.log('user click')}
                  />
                </RoomMember>
                <RoomMember>
                  <RoomMemberMore><span>+3</span></RoomMemberMore>
                </RoomMember>
              </RoomMembersList>
              <RoomButton>Join</RoomButton>
            </RoomContent>
          </Room>
          <Room>
            <RoomName>Room name</RoomName>
            <RoomDescription>Room description</RoomDescription>
            <RoomContent>
              <RoomMembersList>
                <RoomMember>
                  <RoomMemberAvatar
                    src={"https://randomuser.me/api/portraits/men/79.jpg"}
                    alt={"user"}
                    onClick={() => console.log('user click')}
                  />
                </RoomMember>
                <RoomMember>
                  <RoomMemberAvatar
                    src={"https://randomuser.me/api/portraits/women/65.jpg"}
                    alt={"user"}
                    onClick={() => console.log('user click')}
                  />
                </RoomMember>
              </RoomMembersList>
              <RoomButton>Join</RoomButton>
            </RoomContent>
          </Room>
          <Room>
            <RoomName>Room name</RoomName>
            <RoomDescription>Room description</RoomDescription>
            <RoomContent>
              <RoomMembersList>
                <RoomMember>
                  <RoomMemberAvatar
                    src={"https://randomuser.me/api/portraits/men/79.jpg"}
                    alt={"user"}
                    onClick={() => console.log('user click')}
                  />
                </RoomMember>
              </RoomMembersList>
              <RoomButton>Join</RoomButton>
            </RoomContent>
          </Room>
          <Room>
            <RoomName>Room name</RoomName>
            <RoomDescription>Room description</RoomDescription>
            <RoomContent>
              <RoomMembersList>
                <RoomMember>
                  <RoomMemberAvatar
                    src={"https://randomuser.me/api/portraits/men/79.jpg"}
                    alt={"user"}
                    onClick={() => console.log('user click')}
                  />
                </RoomMember>
                <RoomMember>
                  <RoomMemberAvatar
                    src={"https://randomuser.me/api/portraits/women/65.jpg"}
                    alt={"user"}
                    onClick={() => console.log('user click')}
                  />
                </RoomMember>
              </RoomMembersList>
              <RoomButton>Join</RoomButton>
            </RoomContent>
          </Room>
        </RoomsList>
      </Community>
    </CastmateLayout>
  );
}

export default Rooms;

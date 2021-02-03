import React from 'react';
import { CastmateLayout } from '@castmate/ui';
import { Community } from '@castmate/community';
import styled from 'styled-components';
import { lighten } from 'polished';
import {
  useRoomsQuery
} from '@castmate/room';
import { useRouter } from 'next/router';

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
  min-width: 426px;
  border: 1px solid rgba(255,255,255,.1);
  margin-bottom: 20px;
  max-height: 100%;
  margin-right: 20px;
  :nth-child(3) {
    margin-right: 0;
  }
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
  color: ${({theme}) => theme.colors.accent2};
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

// const RoomMemberMore = styled.div`
//   height: 50px;
//   width: 50px;
//   border-radius: 8px;
//   background: ${({ theme }) => theme.colors.dark2};
//   border: 1px solid rgba(255,255,255,.1);
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

export function Rooms() {
  const router = useRouter();
  const { data, loading, error } = useRoomsQuery({
    variables: {
    },
  });

  console.log('loading', loading)
  console.log('error', error)
  console.log('data', data)

  if (loading) {
    return <div>Loading...</div>
  }

  const rooms = data?.rooms;

  const joinRoom = (e: string) => {
    router.push(`room/${e}`);
  }

  return (
    <CastmateLayout>
      <Community title="Rooms">
        <RoomsList>
          {rooms.map(room => {
            return <Room key={room.id}>
            <RoomName>{room.name}</RoomName>
            <RoomDescription>Current playing: media title</RoomDescription>
            <RoomContent>
              <RoomMembersList>
                {room.members.map(member => {
                  return <RoomMember key={member.id}>
                  <RoomMemberAvatar
                    src={member.profile.avatar}
                    alt={member.profile.name}
                    onClick={() => console.log('user', member.profile.name)}
                  />
                </RoomMember>
                })}
                {/* <RoomMember>
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
                </RoomMember> */}
              </RoomMembersList>
              <RoomButton onClick={() => joinRoom(room.id)}>Join</RoomButton>
            </RoomContent>
          </Room>
          })}
        </RoomsList>
      </Community>
    </CastmateLayout>
  );
}

export default Rooms;

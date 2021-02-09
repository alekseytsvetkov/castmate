import React, { useEffect } from 'react';
import { Button, Input, Player } from '@castmate/ui';
import styled from 'styled-components';
import { Plus, Youtube } from 'react-feather';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import ChatBox from './ChatBox';
import toast, { Toaster } from 'react-hot-toast';

const RoomBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

// const RoomActions = styled.div`
//   display: flex;
//   justify-content: center;
//   margin-top: 20px;
//   margin-bottom: 20px;
//   width: 100%;
// `;

// const LeaveRoom = styled.div`
//   padding: 16px 20px;
//   border-radius: 12px;
//   background: ${({ theme }) => theme.colors.red};
//   max-width: 200px;
//   :focus {
//     background: ${({ theme }) =>
//       lighten(0.1, theme.colors['red'])};
//   }
//   :hover {
//     background: ${({ theme }) =>
//       lighten(0.05, theme.colors['red'])};
//     cursor: pointer;
//   }
// `;

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

const SidebarTitle = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.accent1};
  padding-bottom: 20px;
  margin: 20px 0;
`;

const MembersList = styled.ul`
  padding: 0;
  list-style: none;
  min-height: 125px;
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

const RoomPlaylist = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

type IRoomProps = {
  data: any;
  playlist: any;
  playlistLoading: any;
  loading: boolean;
  roomId: string;
};

const notify = () => toast.success((t) => (
  <span>
    You entered the room
    {/* <button onClick={() => toast.dismiss(t.id)}>
      Dismiss
    </button> */}
  </span>
), {
  style: {
    background: '#394158',
    color: '#fff',
    fontSize: '14px'
  },
  iconTheme: {
    primary: '#0E78F9',
    secondary: '#fff',
  },
});

export const CurrentRoom: React.FC<IRoomProps> = ({ data, loading, roomId, playlist, playlistLoading }) => {
  if (loading || playlistLoading) {
    return (
      <RoomBox>
        <RoomContent>
          <SkeletonTheme color="#293042" highlightColor="#0E78F9"><Skeleton height="500px" />
          </SkeletonTheme>
          <RoomPlaylist>
            <Input isFirst isFull placeholder="Paste YouTube link here" icon={<Youtube size={20} color="#8a919d" />} />
            <Button mainColor="accent1">
              <Plus size={22} />
            </Button>
          </RoomPlaylist>
        </RoomContent>
        <RightSidebar>
          <Members>
            <MembersList>
              <SidebarTitle>Members</SidebarTitle>
              <SkeletonTheme color="#293042" highlightColor="#0E78F9">
                <Skeleton height="125px" />
              </SkeletonTheme>
            </MembersList>
          </Members>
          <ChatBox roomId={roomId} />
        </RightSidebar>
      </RoomBox>)
  }

  if (!data) {
    return (
      <RoomBox>
        <RoomContent>
          <div>Room Not Found</div>
        </RoomContent>
      </RoomBox>
    )
  }

  useEffect(() => {
    notify();
  }, [])

  return (
    <RoomBox>
      <RoomContent>
        <Player height="500px" roomId={data.room.id} url={playlist.roomPlaylist[0].link} playing={data.room.mediaStatus}/>
        <RoomPlaylist>
          <Input isFirst isFull placeholder="Paste YouTube link here" icon={<Youtube size={20} color="#8a919d" />} />
          <Button mainColor="accent1">
            <Plus size={22} />
          </Button>
        </RoomPlaylist>
        {/* {playlist.roomPlaylist.map(media => {
          return <div key={media.id}>{media.link}</div>
        })} */}
        {/* <RoomActions>
          <LeaveRoom>Leave Room</LeaveRoom>
        </RoomActions> */}
      </RoomContent>
      <RightSidebar>
        <Members>
          <SidebarTitle>Members</SidebarTitle>
          <MembersList>
            {/* @ts-ignore */}
            {data.room.members.map(member => {
              return <MemberItem key={member.id}>
              <img src={member.profile.avatar} />
              <div>{member.profile.name}</div>
            </MemberItem>
            })}
          </MembersList>
        </Members>
        <ChatBox roomId={roomId} />
      </RightSidebar>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
    </RoomBox>
  );
}

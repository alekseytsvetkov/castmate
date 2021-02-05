import React from 'react';
import { CastmateLayout, MainItem } from '@castmate/ui';
import { Community } from '@castmate/community';
import styled from 'styled-components';
import {
  Tv,
  // PlusSquare
} from 'react-feather';

import { io } from "socket.io-client";
const socket = io("http://localhost:4001");

const ControlList = styled.div`
  display: flex;
`;

export function Index() {
  socket.on('connect', function() {
    console.log('Connected');
  });

  socket.on('connection', (data) => console.log(data));

  socket.on('disconnect', function() {
    console.log('Disconnected');
  });

  socket.emit('castmate', 'castmate');

  socket.on('castmate', (data) => console.log(data));

  console.log('Socket!')

  return (
    <>
      <CastmateLayout>
        <Community title="Home">
          <ControlList>
            <MainItem href="/create-room" icon={<Tv size={22} />} title="New room" description="set up new room" />
            {/* <MainItem href="/join-room" icon={<PlusSquare size={22} />} title="Join room" description="via invitation link" /> */}
          </ControlList>
        </Community>
      </CastmateLayout>
    </>
  );
}

export default Index;

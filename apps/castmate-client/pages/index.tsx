import React from 'react';
import { CastmateLayout, MainItem } from '@castmate/ui';
import { Community } from '@castmate/community';
import styled from 'styled-components';
import { Box, PlusSquare } from 'react-feather';

const ControlList = styled.div`
  display: flex;
`;

export function Index() {

  return (
    <CastmateLayout>
      <Community title="Home">
        <ControlList>
          <MainItem href="/room/ckkjt4wb30085exq540ll4yzf" icon={<Box size={22} />} title="New room" description="set up new room" />
          <MainItem  href="/room/ckkjt3fre0039exq5mc6hhorr" icon={<PlusSquare size={22} />} title="Join room" description="via invitation link" />
        </ControlList>
      </Community>
    </CastmateLayout>
  );
}

export default Index;

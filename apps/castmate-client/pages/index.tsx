import React from 'react';
import { CastmateLayout, MainItem } from '@castmate/ui';
import { Community } from '@castmate/containers/Castmate/Community';
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
          <MainItem icon={<Box size={22} />} title="New room" description="set up new room" />
          <MainItem icon={<PlusSquare size={22} />} title="Join room" description="via invitation link" />
        </ControlList>
      </Community>
    </CastmateLayout>
  );
}

export default Index;

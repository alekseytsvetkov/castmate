import React from 'react';
import { Button, CastmateLayout, MainItem } from '@castmate/ui';
import { Community } from '@castmate/community';
import styled from 'styled-components';
import {
  Tv,
  // PlusSquare
} from 'react-feather';
import toast, { Toaster } from 'react-hot-toast';

const ControlList = styled.div`
  display: flex;
`;

const notify = () => toast.success((t) => (
  <span>
    Here is your toast.
    {/* <button onClick={() => toast.dismiss(t.id)}>
      Dismiss
    </button> */}
  </span>
), {
  style: {
    background: '#394158',
    color: '#fff',
  },
});

export function Index() {
  return (
    <>
      <CastmateLayout>
        <Community title="Home">
          <ControlList>
            <MainItem href="/create-room" icon={<Tv size={22} />} title="New room" description="set up new room" />
            <Button onClick={notify}>Make me a toast</Button>
            {/* <MainItem href="/join-room" icon={<PlusSquare size={22} />} title="Join room" description="via invitation link" /> */}
          </ControlList>
        </Community>
      </CastmateLayout>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
    </>
  );
}

export default Index;

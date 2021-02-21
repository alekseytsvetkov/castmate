import React from 'react';
import { Modal } from './modal';
import { Auth } from '@castmate/auth';
import { NewCommunity, NewChannel } from '@castmate/community';

export const Modals = () => {
  return (
    <>
      <Modal routerKey="authModal" minimal>
        <Auth />
      </Modal>
      <Modal routerKey="newCommunity" title="New Community">
        <NewCommunity />
      </Modal>
      <Modal routerKey="newChannel" title="New Channel">
        <NewChannel />
      </Modal>
    </>
  );
};
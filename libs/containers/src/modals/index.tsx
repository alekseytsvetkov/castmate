
import React from 'react';
import { Modal } from './modal';
import { Auth } from '@castmate/auth';
import { NewRoom } from '@castmate/room';

export const Modals = () => {
  return (
    <>
      <Modal routerKey="authModal" minimal>
        <Auth />
      </Modal>
      {/* <Modal routerKey="newRoom" title="New Room">
        <div className="text-white">New Room</div>
      </Modal> */}
      <Modal routerKey="newRoom" title="New Room">
        <NewRoom />
      </Modal>
    </>
  );
};
import React from 'react';
import { FC } from 'react';
import styled from 'styled-components';
import { Button, Input } from '@castmate/ui';
import { Logo } from '../Logo';
import Tabs, { TabPane } from 'rc-tabs';
import { Youtube } from 'react-feather';

const NewRoomBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px;
  max-width: 500px;
  width: 500px;
`;

const NewRoomTitle = styled.div`
  display: flex;
  font-size: 15px;
  padding: 20px 0;
  color: ${({ theme }) => theme.colors.text1};
`;

const NewRoomDescription = styled.div`
  display: flex;
  font-size: 15px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.accent2};
`;

const LogoBox = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export type IVersionProps = {
  onClose: () => void;
};

const callback = function(key) {};

export const NewRoom: FC<IVersionProps> = ({ onClose }) => (
  <NewRoomBox>
    <LogoBox>
      <Logo />
    </LogoBox>
    <NewRoomTitle>Create room</NewRoomTitle>
    <NewRoomDescription>This is an early version of the Castmate site which is available for demonstration purposes.</NewRoomDescription>
    <Tabs
      defaultActiveKey="1"
      onChange={callback}
      animated={
        {inkBar: false}
      }
    >
      <TabPane tab="Youtube" key="1">
        <Input
          isFirst={false}
          isFull
          placeholder="Paste YouTube link here"
          mainColor="accent1"
          icon={<Youtube size={20} color="#8a919d" />}
          required
        />
      </TabPane>
      <TabPane tab="TikTok (soon)" key="2" disabled>
        TikTok (soon)
      </TabPane>
      <TabPane tab="Movie (soon)" key="3" disabled>
        Movie (soon)
      </TabPane>
    </Tabs>
  </NewRoomBox>
);

export default NewRoom;
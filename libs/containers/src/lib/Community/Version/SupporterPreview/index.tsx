import React from 'react';
import { FC } from 'react';
import styled from 'styled-components';
import { Logo } from '../../Logo';
import { Button } from '@castmate/ui';

const SupporterPreviewBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px;
  max-width: 360px;
  width: 360px;
`;

const SupporterPreviewTitle = styled.div`
  display: flex;
  font-size: 15px;
  padding: 20px 0;
  color: ${({ theme }) => theme.colors.text1};
`;

const SupporterPreviewDescription = styled.div`
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

export const SupporterPreview: FC<IVersionProps> = ({ onClose }) => (
  <SupporterPreviewBox>
    <LogoBox>
      <Logo />
    </LogoBox>
    <SupporterPreviewTitle>Welcome to Castmate Supporter Preview</SupporterPreviewTitle>
    <SupporterPreviewDescription>This is an early version of the Castmate site which is available for demonstration purposes.</SupporterPreviewDescription>
    <SupporterPreviewDescription>Please feel free to use the site and provide feedback.</SupporterPreviewDescription>
    <Button mainColor="accent1" onClick={onClose}>Okay</Button>
  </SupporterPreviewBox>
);

export default SupporterPreview;

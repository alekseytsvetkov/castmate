import * as React from 'react';
import styled from 'styled-components';
import Link from 'next/link'
import { Flex } from '../base';

const LinkItem = styled(Link)`
`;

const Item = styled(Flex)`
  display: flex;
  background: rgba(255,255,255,.1);
  border: 1px solid ${({ theme }) => theme.colors.accent1};
  height: 50px;
  width: 50px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  transition: 0.3s;
  &:hover {
    cursor: pointer;
    background: rgba(255,255,255,.2);
  }
`;

export const MenuItem = ({ icon, href }) => (
  <LinkItem href={href}>
    <Item>
      {icon}
    </Item>
  </LinkItem>
);

import * as React from 'react';
import styled from 'styled-components';
import { Flex } from '../base';
import { lighten } from 'polished';

const Item = styled(Flex)`
  display: flex;
  background: ${({ theme }) => theme.colors.castmate};
  height: 200px;
  width: 200px;
  border-radius: 12px;
  transition: 0.3s;
  padding: 15px;
  margin-bottom: 20px;
  margin-right: 20px;
  flex-direction: column;
  justify-content: space-between;
  :focus {
    background: ${({ theme }) =>
      lighten(0.1, theme.colors['castmate'])};
  }
  :hover {
    background: ${({ theme }) =>
      lighten(0.05, theme.colors['castmate'])};
    cursor: pointer;
  }
`;

const ItemIcon = styled(Flex)`
  display: flex;
  background: rgba(255,255,255,.1);
  border: 1px solid rgba(255,255,255,0.25);
  height: 50px;
  width: 50px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
`;

const ItemText = styled.div``;

const ItemTitle = styled.div`
  font-weight: bold;
`;

const ItemDescription = styled.div`
  color: rgba(255,255,255,0.5);
  font-size: 14px;
`;

export const MainItem = ({ icon, title, description }) => (
  <Item>
    <ItemIcon>
      {icon}
    </ItemIcon>
    <ItemText>
      <ItemTitle>{title}</ItemTitle>
      <ItemDescription>{description}</ItemDescription>
    </ItemText>
  </Item>
);

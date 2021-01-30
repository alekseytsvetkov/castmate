import React from 'react';
import { Flex } from '@castmate/ui/base/Flex';
import styled from 'styled-components';

const IconBox = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.castmate};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 6px;
  background-color: #fff;

`;

export const Logo: React.FC = React.memo(() => (
  <Flex>
    <IconBox>
      <Icon />
    </IconBox>
  </Flex>
));

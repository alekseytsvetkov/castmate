import { Flex } from '../base/Flex';
import styled from 'styled-components';

export const Menu = styled(Flex)`
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.dark2};
  border-radius: 4px;
`;

export const MenuItem = styled(Flex)`
  align-items: center;
  padding: 0 20px;
  height: 32px;
  cursor: pointer;
  z-index: 1000;
`;

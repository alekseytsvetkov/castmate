import React from 'react';
import styled from 'styled-components';
import { Flex, CastmateLayout } from '@castmate/ui';
import { Logo } from './Logo';

const Box = styled.div`
  height: 100%;
  overflow: hidden;
  background: ${({ theme }) => theme.dark2};
`;

const Content = styled.div`
  height: 100%;
  display: flex;
`;

const Middle = styled(Flex)`
  height: 100%;
  flex: 1;
  overflow: hidden;
  position: relative;
`;

const Header = styled(Flex)`
  align-items: center;
  height: 40px;
`;

const Board = styled.div`
  height: calc(100% - 32px - 50px);
  padding: 0 20px;
`;

const Right = styled.div`
  height: 100%;
  width: 340px;
  background: ${({ theme }) => theme.dark1};
`;

export const Community = () => {
  return (
    <CastmateLayout>
      <Box>
        <Header px="12px" bg="dark2">
          <Logo />
          <Flex flex="1"></Flex>
        </Header>
        <Content>
          <Middle p="12px">
            <div>Test</div>
          </Middle>
          <Right>
            <Flex height="100%">
              <div>Section</div>
            </Flex>
          </Right>
        </Content>
      </Box>
    </CastmateLayout>
  );
};

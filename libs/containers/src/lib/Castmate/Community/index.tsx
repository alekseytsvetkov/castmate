import React from 'react';
import styled from 'styled-components';
import { Flex, CastmateLayout } from '@castmate/ui';
import { Logo } from './Logo';

const Box = styled.div`
  height: 100%;
  overflow: hidden;
  background: ${({ theme }) => theme.dark2};
  display: flex;
`;

const Sidebar = styled(Flex)`
  max-width: 80px;
  width: 100%;
  height: 100%;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  border-right: 1px solid ${({ theme }) => theme.colors.accent1};
`;

const Main = styled.div`
  flex: 1;
`;

const Header = styled(Flex)`
  align-items: center;
  height: 70px;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.accent1};
`;

const Content = styled.div`
  height: 100%;
  display: flex;
  margin: 30px;
`;

const Middle = styled(Flex)`
  height: 100%;
  flex: 1;
  overflow: hidden;
  position: relative;
`;

const LogoBox = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

export const Community = () => {
  return (
    <CastmateLayout>
      <Box>
        <Sidebar>
          <LogoBox>
            <Logo />
          </LogoBox>
          <Menu><div>Home</div></Menu>
        </Sidebar>
        <Main>
          <Header px="12px" bg="dark2">
            <Flex flex="1"></Flex>
          </Header>
          <Content>
            <Middle>
              <div>Content</div>
            </Middle>
          </Content>
        </Main>
      </Box>
    </CastmateLayout>
  );
};

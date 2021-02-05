import React from 'react';
import styled from 'styled-components';
import { Flex, CastmateLayout, MenuItem } from '@castmate/ui';
import { Logo } from './Logo';
import { UserMenu } from '@castmate/containers/Community/UserMenu';
import { Home, Grid, Compass, Users, Settings } from 'react-feather';
// import { SearchBox } from '@castmate/containers/Community/Search';
import { VersionBox } from '@castmate/containers/Community/Version';
import { useRouter } from 'next/router'
// import { FeedbackBox } from '@castmate/containers/Community/Feedback';

const Box = styled.div`
  height: 100%;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.dark1};
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
  justify-content: space-between;
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

const Content = styled(Flex)`
  /* height: 100%; */
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
  flex-direction: column;
  margin-top: 20px;
`;

const Title = styled.div`
`;

export const Community = ({title, children}) => {
  const router = useRouter();

  return (
    <CastmateLayout>
      <Box>
        <Sidebar>
          <LogoBox>
            <Logo />
          </LogoBox>
          <Menu>
            <MenuItem href="/" icon={<Home size={22} />} />
            <MenuItem href="/rooms" icon={<Grid size={22} />} />
            {/* <MenuItem href="/feed" icon={<Compass size={22} />} />
            <MenuItem href="/users" icon={<Users size={22} />} /> */}
          </Menu>
          <Menu>
            {/* <MenuItem href="/settings" icon={<Settings size={22} />} /> */}
          </Menu>
        </Sidebar>
        <Main>
          <Header px="20px" bg="dark1">
            <Title>{title}</Title>
            <Flex flex="1"></Flex>
            <div></div>
            {/* <FeedbackBox /> */}
            <VersionBox />
            {/* <SearchBox /> */}
            <UserMenu />
          </Header>
          <Content p={router.pathname !== "/room/[roomId]" ? "20px" : "0px"}>
            <Middle>
              {children}
            </Middle>
          </Content>
        </Main>
      </Box>
    </CastmateLayout>
  );
};

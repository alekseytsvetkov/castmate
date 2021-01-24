import { gql, useMutation, useQuery } from '@apollo/client';
import { Flex, Button, Typography } from '@castmate/ui';
import { Menu, MenuItem } from '@castmate/ui/Menu';
import { getRefreshToken } from '@castmate/utils/token';
import React, { useState } from 'react';
import styled from 'styled-components';
import { LogIn } from 'react-feather';

const Box = styled.div`
  background: ${({ theme }) => theme.dark2};
`;

const Avatar = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 12px;
  overflow: hidden;
`;

const Skeleton = styled(Flex)`
  height: 30px;
  width: 30px;
  border-radius: 100%;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.dark2};
`;

export const UserMenu = ({
  codeHandler = 'http://localhost:3333/auth/success?',
  redirectUri = 'http://localhost:4200/',
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const toggleMenuIsOpen = () => setMenuIsOpen(!menuIsOpen);

  const login = () => {
    const params = new URLSearchParams();
    params.set('code_handler', codeHandler);
    params.set('redirect_uri', redirectUri);
    const url =
      'http://localhost:3333/auth/google?' + params.toString();

    console.log(url);

    window.location.href = url;
  };

  const [logout] = useMutation(
    gql`
      mutation logout($refreshToken: String!) {
        logout(refreshToken: $refreshToken)
      }
    `,
    {
      onCompleted: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.reload();
      },
    }
  );

  const GuestMenu = () => {
    return (
      <Button onClick={login}>
        <LogIn size={22} />
      </Button>
    );
  };

  const meQuery = useQuery(gql`
    query me {
      me {
        id
        profile {
          id
          name
          avatar
        }
      }
    }
  `);

  const profile = meQuery?.data?.me?.profile;

  if (meQuery.loading) {
    return (
      <Box>
        <Skeleton />
      </Box>
    );
  }

  if (!profile) {
    return (
      <Box>
        <GuestMenu />
      </Box>
    );
  }

  return (
    <Box>
      <Flex position="relative">
        <Avatar
          src={profile?.avatar}
          alt={profile?.name}
          onClick={toggleMenuIsOpen}
        />
        {menuIsOpen && (
          <Flex position="absolute" right="0px" top="100%">
            <Menu mt="10px">
              <MenuItem
                onClick={() => {
                  logout({
                    variables: {
                      refreshToken: getRefreshToken(),
                    },
                  });
                  setMenuIsOpen(false);
                }}
              >
                <Typography>Logout</Typography>
              </MenuItem>
            </Menu>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

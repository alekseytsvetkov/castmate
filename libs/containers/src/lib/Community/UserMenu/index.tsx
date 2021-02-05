import { gql, useMutation, useQuery } from '@apollo/client';
import { Flex, Button, Typography } from '@castmate/ui';
import { Menu, MenuItem } from '@castmate/ui/Menu';
import { getRefreshToken } from '@castmate/utils/token';
// import { Modal } from '@castmate/ui';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
// import Auth from '../../Auth';
// import Link from 'next/link';
// import { LogIn } from 'react-feather';

const Box = styled.div`
  background: ${({ theme }) => theme.colors.dark1};
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
  codeHandler = 'http://localhost:4200/auth/success?',
  redirectUri = 'http://localhost:4200/',
}) => {
  const router = useRouter();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const toggleMenuIsOpen = () => setMenuIsOpen(!menuIsOpen);

  const login = () => {
    const params = new URLSearchParams();
    params.set('code_handler', codeHandler);
    params.set('redirect_uri', redirectUri);
    const url =
      'http://localhost:3333/auth/google?' + params.toString();

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
      // <>
      // <Link
      //     as={`/auth?continue=${router.asPath}`}
      //     href={{
      //       pathname: router.route,
      //       query: {
      //         ...router.query,
      //         authModal: 1
      //       }
      //     }}
      //     passHref
      //   >
      //   <Button>
      //     {/* <LogIn size={22} /> */}
      //     Sign In
      //   </Button>
      //   </Link>
      //   <Modal
      //     minimal
      //     visible={router.query.authModal === '1'}
      //     onClose={() => router.back()}
      //   >
      //     <Auth />
      //   </Modal>
      // </>
      <Button onClick={login}>
        Sign In
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

  const userId = meQuery?.data?.me?.id;
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
                onClick={(e) => {
                  e.preventDefault()
                  router.push(`/profile/${userId}`)
                }}
              >
                <Typography>Profile</Typography>
              </MenuItem>
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

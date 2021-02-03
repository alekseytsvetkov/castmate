import { Community } from '@castmate/community';
import { CastmateLayout, VerifiedIcon, Avatar } from '@castmate/ui';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ru';
dayjs.locale('ru');

dayjs.extend(relativeTime);

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileNameBox = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileName = styled.div`
  margin: 20px 0;
`;

const ProfileDescriptionBox = styled.div`
  display: flex;
`;

const Profile = () => {
  const router = useRouter();

  let userId;

  if (typeof router.query.profileId === 'string') {
    userId = router.query.profileId;
  }

  const userQuery = gql`
    query user($userId: ID!) {
      user(userId: $userId) {
        id
        createdAt
        verified
        profile {
          id
          name
          avatar
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(userQuery, {
    variables: { userId },
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const user = data?.user;
  const profile = user?.profile;

  console.log('user', user)

  return (
    <CastmateLayout>
      <Community title="Home">
        <ProfileBox>
          <Avatar src={profile.avatar} alt={profile.name} height={100} width={100} />
          <ProfileNameBox>
            <ProfileName>{profile.name}</ProfileName>
            {user.verified && <VerifiedIcon />}
          </ProfileNameBox>
          <ProfileDescriptionBox>
            <div>Зарегистрирован {dayjs(user.createdAt).toNow(true)} назад</div>
          </ProfileDescriptionBox>
        </ProfileBox>
      </Community>
    </CastmateLayout>
  )
}

export default Profile

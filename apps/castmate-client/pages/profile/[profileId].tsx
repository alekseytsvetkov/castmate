import { Community } from '@castmate/community';
import { CastmateLayout } from '@castmate/ui';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import React from 'react';

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

  const profile = data?.user?.profile;

  return (
    <CastmateLayout>
      <Community title="Home">
        <img src={profile.avatar} alt={profile.name} />
        <div>{profile.name}</div>
      </Community>
    </CastmateLayout>
  )
}

export default Profile

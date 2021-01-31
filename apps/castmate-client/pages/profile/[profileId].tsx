import { Community } from '@castmate/community';
import { CastmateLayout } from '@castmate/ui';
import React from 'react';
// import { useRouter } from 'next/router';

const Profile = () => {
  // const router = useRouter();

  // let userId;

  // if (typeof router.query.id === 'string') {
  //   userId = router.query.id;
  // }

  return (
    <CastmateLayout>
      <Community title="Home">
        <div>Avatar</div>
        <div>Name</div>
      </Community>
    </CastmateLayout>
  )
}

export default Profile

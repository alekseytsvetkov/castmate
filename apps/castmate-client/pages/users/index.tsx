import React from 'react';
import { CastmateLayout } from '@castmate/ui';
import { Community } from '@castmate/community';

export function Users() {
  return (
    <CastmateLayout>
      <Community title="Users">
        <div>
          <div>user avatar</div>
          <div>user name</div>
        </div>
      </Community>
    </CastmateLayout>
  );
}

export default Users;

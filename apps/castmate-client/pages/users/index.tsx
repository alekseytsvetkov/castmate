import React from 'react';
import { CastmateLayout } from '@castmate/ui';
import { Community } from '@castmate/containers/Castmate/Community';

export function Users() {
  return (
    <CastmateLayout>
      <Community title="Users">
        <div>Users</div>
      </Community>
    </CastmateLayout>
  );
}

export default Users;

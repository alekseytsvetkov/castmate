import React from 'react';
import { CastmateLayout } from '@castmate/ui';
import { Community } from '@castmate/containers/Castmate/Community';

export function Settings() {
  return (
    <CastmateLayout>
      <Community title="Settings">
        <div>Settings</div>
      </Community>
    </CastmateLayout>
  );
}

export default Settings;

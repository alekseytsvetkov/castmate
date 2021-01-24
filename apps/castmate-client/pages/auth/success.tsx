import React from 'react';
import { useRouter } from 'next/router';
import { Auth } from '@castmate/containers/Castmate/Auth';
import { CastmateLayout } from '@castmate/ui';

export function AuthSuccess() {
  const rotuer = useRouter();
  const code = rotuer.query?.code;
  const redirect = rotuer.query?.redirect;

  return (
    <CastmateLayout>
      <Auth
        code={typeof code === 'string' && code}
        onSuccess={({ accessToken, refreshToken }) => {
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);

          if (typeof redirect === 'string') {
            rotuer.push(redirect);
          }
        }}
      />
    </CastmateLayout>
  );
}

export default AuthSuccess;

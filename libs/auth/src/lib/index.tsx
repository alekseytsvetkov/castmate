import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitch, faGoogle } from '@fortawesome/free-brands-svg-icons';

const SocialButton = ({ provider, icon }) => {
  const router = useRouter();
  const origin = window?.location?.origin || '';
  const continuePath = router.query.continue || '/';

  const params = new URLSearchParams();
  params.set('code_handler', `${origin}/auth/success?`);
  params.set('redirect_uri', `${origin}${continuePath}`);
  const authUrl = `https://castmate-api.kive.dev/auth/${provider}?${params.toString()}`;

  return (
    <Link href={authUrl}>
      <button
        className={clsx(
          'font-medium',
          'px-4 py-3 my-1',
          `bg-${provider}`,
          `inline-flex items-center w-full relative`,
          'rounded',
          `hover:bg-${provider}-light`,
          'transition-all duration-150 ease'
        )}
      >
        <div className="absolute">
          <FontAwesomeIcon icon={icon} className="text-white mr-2 h-4" />
        </div>

        <span className="text-white opacity-80 text-sm uppercase tracking-widest mx-5 text-center w-full">
          {provider}
        </span>
      </button>
    </Link>
  );
};

export const Auth = () => {
  return (
    <div className="flex flex-col px-4 py-2 w-320px">
      <div className="text-white text-lg w-full flex justify-center py-2">
        Welcome to Castmate
      </div>
      <div className="text-white text-xs w-full flex justify-center py-2">
        Social network for synchronous media viewing
      </div>

      <SocialButton provider="google" icon={faGoogle} />
      <SocialButton provider="twitch" icon={faTwitch} />
    </div>
  );
};

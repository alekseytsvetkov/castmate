import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SimpleBar from 'simplebar-react';
import { HeartIcon } from '@castmate/icons/heart';
import { useCommunitiesQuery } from '../api';

const FriendsInAppPanel: React.FC<{
  title: string;
  name: string;
  avatar: string;
}> = ({ title, name, avatar }) => {
  const router = useRouter();
  const community = router.query?.community;

  return (
    <Link href={`/${name}`}>
      <div
        className={`flex flex-shrink-0 items-center justify-center w-50px h-50px cursor-pointer hover:opacity-90 mt-3 ${
          name === community && 'bg-surface-light'
        }`}
      >
        <div className="rounded-full bg-background hover:bg-surface-light h-50px w-50px flex items-center justify-center">
          {avatar ? (
            <img src={avatar} className="h-full rounded-full" alt={title} />
          ) : (
            <span className="text-gray-400 text-sm">{title[0]}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export const AppPanelFriends = () => {
  const communitiesQuery = useCommunitiesQuery();
  const communities = communitiesQuery?.data?.communities || [];

  return (
    <>
      <div className="flex flex-1 w-full overflow-hidden">
        <SimpleBar className="w-full">
          {communities.map((community) => (
            <FriendsInAppPanel
              key={community.id}
              name={community.name}
              title={community.title}
              avatar={community.avatar}
            />
          ))}
        </SimpleBar>
      </div>
    </>
  );
};

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SimpleBar from 'simplebar-react';
import { UserIcon } from '@castmate/icons/user';
import { UserAddIcon } from '@castmate/icons/user-add';
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
        // className={`flex flex-shrink-0 items-center justify-center w-48px h-48px cursor-pointer hover:opacity-90 mt-3 ${
        //   name === community && 'bg-surface-light'
        // }`}
        className={`flex flex-shrink-0 items-center justify-center w-48px h-48px cursor-pointer hover:opacity-90 mt-3`}
      >
        <div className="relative rounded-md h-48px w-48px flex items-center justify-center">
          {avatar ? (
            <img src={avatar} className="h-full rounded-md" alt={title} />
          ) : (
            <span className="text-gray-400 text-sm">{title[0]}</span>
          )}
          <div className="absolute h-4 w-4 border-4 -bottom-0.5 -right-0.5 border-surface rounded-full bg-gradient-to-r from-primary to-primary-light"></div>
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
          <div className="flex justify-center mt-3 p-4 bg-accent-dark rounded-md cursor-pointer">
            <UserIcon />
          </div>
          {communities.map((community) => (
            <FriendsInAppPanel
              key={community.id}
              name={community.name}
              title={community.title}
              avatar={community.avatar}
            />
          ))}
          <div className="flex justify-center mt-3 p-4 bg-accent-dark rounded-md cursor-pointer">
            <UserAddIcon />
          </div>
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

import React from 'react';
import ReactPlayer from 'react-player';
import {ChannelPlaylist} from './channel-playlist'

export const CommunityContent = () => {
  return (
    <div className="h-screen w-full flex flex-1 flex-col">
      <ReactPlayer
        url="https://youtu.be/ubfQLNALIic"
        height="100%"
        width="100%"
        playing
        loop
        muted
        controls
        config={{
          youtube: {
            playerVars: {
              rel: 0,
            },
          },
        }}
      />
      <ChannelPlaylist />
    </div>
  );
};

import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import {
  useToggleMediaStatusMutation
} from '@castmate/room';

export const Player = ({ height, url, roomId, playing }) => {
  const playingBool = playing === "PAUSE" ? false : true;

  const [playingStatus, setPlayingStatus] = useState(playingBool);

  const status = playingStatus === false ? "PAUSE" : "PLAY";

  const [toggleMediaStatusMutation, { data, loading, error }] = useToggleMediaStatusMutation({
    variables: {
      input: {
        roomId: roomId,
        mediaStatus: status
      }
    },
  });

  const handlePlayPause = () => {
    toggleMediaStatusMutation()
    if (!loading && !error && data) {
      setPlayingStatus(prev => !prev);
    }
  }

  return <>
    <ReactPlayer width="100%"  height={height} url={url} playing={playingStatus} />
      <button onClick={handlePlayPause}>{loading ? 'Loading...' : playingStatus ? 'Pause' : 'Play'}</button>
    </>
};

import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import {
  useRoomMediaStatusChangedSubscription,
  useToggleMediaStatusMutation
} from '@castmate/room';

export const Player = ({ height, url, roomId, playing }) => {
  const [playingStatus, setPlayingStatus] = useState(playing !== "PLAYING" ? false : true);

  const { data: dataRoomMediaStatus, loading: loadingRoomMediaStatus, error: errorRoomMediaStatus } = useRoomMediaStatusChangedSubscription({
    variables: {
        roomId: roomId
      },
  });

  if(dataRoomMediaStatus) {
    console.log('dataRoomMediaStatus', dataRoomMediaStatus);
  }

  useEffect(() => {
    if(dataRoomMediaStatus) {
      setPlayingStatus(dataRoomMediaStatus.roomMediaStatusChanged.mediaStatus !== "PLAYING" ? false : true)
    }
  }, [dataRoomMediaStatus])

  console.log('playingStatus', playingStatus)


  // const playingBool = playing === "PAUSE" ? false : true;

  // const [playingStatus, setPlayingStatus] = useState(playingBool);

  // const status = playingStatus === false ? "PAUSE" : "PLAY";

  const [toggleMediaStatusMutation, { data, loading, error }] = useToggleMediaStatusMutation({
    variables: {
      input: {
        roomId: roomId,
        mediaStatus: playingStatus === true ? "PAUSED" : "PLAYING"
      }
    },
  });

  const handlePlayPause = () => {
    toggleMediaStatusMutation()
    if (!loading && !error && data) {
      setPlayingStatus(prev => !prev);
    }
  }

  console.log('playingStatus CHECK', playingStatus)

  return <>
    <ReactPlayer width="100%" height={height} url={url} playing={playingStatus} />
      <button onClick={handlePlayPause}>{loading ? 'Loading...' : playingStatus ? 'Pause' : 'Play'}</button>
    </>
};

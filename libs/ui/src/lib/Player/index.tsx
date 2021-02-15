import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import {
  useRoomMediaStatusChangedSubscription,
  useToggleMediaStatusMutation
} from '@castmate/room';

export const Player = ({ height, url, roomId, playing }) => {
  const playerRef = useRef()
  const [playingStatus, setPlayingStatus] = useState(playing !== "PLAYING" ? false : true);
  const [duration, setDuration] = useState(0);

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

  const handleReady = () => {
    console.log('ready!')
  }

  const handleStart = () => {
    toggleMediaStatusMutation({
      variables: {
        input: {
          roomId: roomId,
          mediaStatus: "PLAYING"
       }
      }
    })
  }

  const handlePlay = () => {
    console.log('onPlay')
  }

  const handlePause = () => {
    toggleMediaStatusMutation({
      variables: {
        input: {
          roomId: roomId,
          mediaStatus: "PAUSED"
       }
      }
    })
  }

  const handleDuration = duration => {
    console.log('onDuration', duration)
    setDuration(duration)
  }

  const handleProgress = state => {
    console.log('onProgress', state)
  }

  const handleEnded = () => {
    console.log('onEnded!')
  }

  const handleError = (e) => {
    console.log('onError', e)
  }

  console.log('duration', duration)

  console.log('playerRef', playerRef)

  if(playerRef && playerRef.current) {
    // @ts-ignore
    console.log('currentTime', playerRef?.current?.getCurrentTime())

    // @ts-ignore
    console.log('currentTime', playerRef?.current?.getDuration())
  }

  // const setTime = () => {
  //   console.log('set time')
  // }

  return <>
    <ReactPlayer
      ref={playerRef}
      width="100%"
      height={height}
      url={url}
      playing={playingStatus}
      pip={true}
      controls={true}
      onReady={handleReady}
      onStart={handleStart}
      onPlay={handlePlay}
      onPause={handlePause}
      onBuffer={handlePause}
      onBufferEnd={handleStart}
      onEnded={handleEnded}
      onError={handleError}
      onDuration={handleDuration}
      onProgress={handleProgress}
      onSeek={e => console.log('onSeek', e)}
    />
      {/* <button onClick={setTime}>Set time</button> */}
      {/* <button onClick={handlePlayPause}>{loading ? 'Loading...' : playingStatus ? 'Pause' : 'Play'}</button> */}
    </>
};

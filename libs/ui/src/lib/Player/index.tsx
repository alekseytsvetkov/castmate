import * as React from 'react';
import ReactPlayer from 'react-player';

export const Player = ({ height }) => (
  <ReactPlayer width="100%"  height={height} url='https://youtu.be/cIwRQwAS_YY' />
);

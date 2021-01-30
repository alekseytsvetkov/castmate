import * as React from 'react';
import ReactPlayer from 'react-player';

export const Player = ({ height, url }) => (
  <ReactPlayer width="100%"  height={height} url={url} />
);

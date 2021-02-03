import React from 'react'
import styled from 'styled-components';

type AvatarProps = {
  src: string;
  alt: string;
  height?: string;
  width?: string;
};

const AvatarBox = styled.img<AvatarProps>`
  border-radius: 12px;
  overflow: hidden;
`;

export const Avatar = ({src, alt, height, width}) => {
  return (
    <AvatarBox src={src} alt={alt} height={height} width={width}/>
  )
}

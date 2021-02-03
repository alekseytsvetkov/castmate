import React from 'react';
import styled from 'styled-components';

const FlowerStar = styled.span`
`;

const FlowerStarContainer = styled.span`
  width: 16px;
  height: 16px;
  margin: 0 5px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  position: relative;
`;

const FlowerStarSvg = styled.svg`
  width: 100%;
  height: 100%;
`;


const FlowerStarChildContainer = styled.div`
  position: absolute;
    top: -.05px;
    left: .05px;
    right: 0;
    bottom: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    pointer-events: none;
`;

export const VerifiedIcon = () => {
  return (
    <FlowerStar aria-label="Verified">
      <FlowerStarContainer>
        <FlowerStarSvg aria-hidden="false" width="16" height="16" viewBox="0 0 16 15.2">
          <path fill="#0E78F9" fill-rule="evenodd" d="m16 7.6c0 .79-1.28 1.38-1.52 2.09s.44 2 0 2.59-1.84.35-2.46.8-.79 1.84-1.54 2.09-1.67-.8-2.47-.8-1.75 1-2.47.8-.92-1.64-1.54-2.09-2-.18-2.46-.8.23-1.84 0-2.59-1.54-1.3-1.54-2.09 1.28-1.38 1.52-2.09-.44-2 0-2.59 1.85-.35 2.48-.8.78-1.84 1.53-2.12 1.67.83 2.47.83 1.75-1 2.47-.8.91 1.64 1.53 2.09 2 .18 2.46.8-.23 1.84 0 2.59 1.54 1.3 1.54 2.09z"></path>
        </FlowerStarSvg>
        <FlowerStarChildContainer>
          <svg aria-hidden="false" width="16" height="16" viewBox="0 0 16 15.2">
            <path d="M7.4,11.17,4,8.62,5,7.26l2,1.53L10.64,4l1.36,1Z" fill="#ffffff"></path>
          </svg>
        </FlowerStarChildContainer>
      </FlowerStarContainer>
    </FlowerStar>
  )
}

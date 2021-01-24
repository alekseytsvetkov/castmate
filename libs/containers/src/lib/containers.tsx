import React from 'react';

import styled from 'styled-components';

/* eslint-disable-next-line */
export interface ContainersProps {}

const StyledContainers = styled.div`
  color: pink;
`;

export function Containers(props: ContainersProps) {
  return (
    <StyledContainers>
      <h1>Welcome to containers!</h1>
    </StyledContainers>
  );
}

export default Containers;

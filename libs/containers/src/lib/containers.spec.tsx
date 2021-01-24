import React from 'react';
import { render } from '@testing-library/react';

import Containers from './containers';

describe('Containers', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Containers />);
    expect(baseElement).toBeTruthy();
  });
});

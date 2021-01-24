import React from 'react';
import { Flex } from '@castmate/ui/base/Flex';
import { Typography } from '@castmate/ui';

export const Logo: React.FC = React.memo(() => (
  <Flex>
    <Typography fontSize="14px" fontFamily="logo">
      Castmate
    </Typography>
  </Flex>
));

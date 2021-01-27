import { Button } from '@castmate/ui';
import React from 'react';
import { FeedbackFish } from '@feedback-fish/react';

export const FeedbackBox = () => {
  return (
    <FeedbackFish projectId="80fd23be42e4e6">
      <Button mainColor="accent1" isLast>Feedback</Button>
    </FeedbackFish>
  );
};

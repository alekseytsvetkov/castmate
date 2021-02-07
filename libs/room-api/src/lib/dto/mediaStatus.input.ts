import { Field, InputType, registerEnumType } from '@nestjs/graphql';

enum MediaStatus {
  ENDED = 'ENDED',
  PLAYING = 'PLAYING',
  PAUSED = 'PAUSED',
  BUFFERING = 'BUFFERING',
  CUED = 'CUED',
}

registerEnumType(MediaStatus, {
  name: 'MediaStatus',
  description: 'Media status',
});

@InputType()
export class mediaStatusChangeInput {
  @Field()
  roomId: string;

  @Field()
  mediaStatus: MediaStatus;
}

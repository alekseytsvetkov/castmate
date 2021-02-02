import { Field, InputType, registerEnumType } from '@nestjs/graphql';

enum MediaStatus {
  PAUSED = 'PAUSED',
  PLAYING = 'PLAYING',
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

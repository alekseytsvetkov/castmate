import { Field, InputType, registerEnumType } from '@nestjs/graphql';

enum MediaStatus {
  PAUSE = 'PAUSE',
  PLAY = 'PLAY',
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

import { RoomMessage } from './roomMessage';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User } from '@castmate/user-api';

enum MediaStatus {
  PAUSED = 'PAUSED',
  PLAYING = 'PLAYING',
}

registerEnumType(MediaStatus, {
  name: 'MediaStatus',
  description: 'Media status',
});

@ObjectType()
export class Room {
  @Field() id: string;

  @Field() userId: string;

  @Field((type) => User) author: User;

  @Field() currentMedia: string;

  @Field() mediaStatus: MediaStatus;

  @Field((type) => [User]) members: User[];

  @Field((type) => [RoomMessage]) messages: RoomMessage[];

  @Field() createdAt: string;
}

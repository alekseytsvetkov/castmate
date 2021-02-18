// import { RoomMessage } from './roomMessage';
// import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Field, ObjectType } from '@nestjs/graphql';
// import { User } from '@castmate/user-api';

// enum MediaStatus {
//   PAUSED = 'PAUSED',
//   PLAYING = 'PLAYING',
// }

// registerEnumType(MediaStatus, {
//   name: 'MediaStatus',
//   description: 'Media status',
// });

@ObjectType()
export class Room {
  @Field() id: string;

  // @Field({defaultValue: "Room"}) name: string;

  @Field() name: string;

  @Field() title: string;

  @Field({ nullable: true }) avatar?: string;
  

  // @Field() userId: string;

  // @Field((type) => User) author: User;

  @Field({ nullable: true }) state?: string;

  @Field() chatId: string;

  // @Field() currentMediaId: string;

  // @Field() currentMediaTitle: string;

  // @Field() mediaStatus: MediaStatus;

  // @Field((type) => [User]) members: User[];

  @Field() createdAt: string;

  @Field() updatedAt: Date;
}

import { RoomMessage } from './roomMessage';
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '@castmate/user';

@ObjectType()
export class Room {
  @Field() id: string;

  @Field() userId: string;

  @Field((type) => User) author: User;

  @Field() currentMedia: string;

  @Field((type) => [User]) members: User[];

  @Field((type) => [RoomMessage]) roomMessages: RoomMessage[];

  @Field() createdAt: string;
}

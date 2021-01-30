import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '@castmate/user-api';

@ObjectType()
export class RoomMessage {
  @Field() id: string;

  @Field() content: string;

  @Field() roomId: string;

  @Field() authorId: string;

  @Field((type) => User) author: User;

  @Field() createdAt: string;
}

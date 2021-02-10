import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RoomAddMediaInput {
  @Field()
  roomId: string;
  @Field()
  mediaId: string;
}

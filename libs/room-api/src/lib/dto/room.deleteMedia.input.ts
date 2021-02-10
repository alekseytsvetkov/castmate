import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RoomDeleteMediaInput {
  @Field()
  roomId: string;
  @Field()
  mediaId: string;
}

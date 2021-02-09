import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RoomDeleteInput {
  @Field()
  roomId: string;
}

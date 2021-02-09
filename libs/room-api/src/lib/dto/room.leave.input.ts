import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RoomLeaveInput {
  @Field()
  roomId: string;
}

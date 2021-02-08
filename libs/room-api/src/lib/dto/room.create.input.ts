import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RoomCreateInput {
  @Field()
  roomMediaId: string;
}

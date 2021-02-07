import { Field, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class RoomJoinInput {
  @Field()
  roomId: string;
}

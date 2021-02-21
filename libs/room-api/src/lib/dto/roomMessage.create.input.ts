import { Field, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class RoomMessageCreateInput {
  @Field()
  @Length(1, 500)
  content: string;

  @Field()
  roomId: string;
}
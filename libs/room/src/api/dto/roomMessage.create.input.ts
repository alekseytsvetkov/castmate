import { Field, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class RoomMessageCreateInput {
  @Field()
  @Length(1, 500)
  text: string;

  @Field()
  roomId: string;
}

import { Field, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class RoomCreateInput {
  @Field()
  @Length(1, 500)
  currentMedia: string;
}

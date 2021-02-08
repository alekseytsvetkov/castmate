import { Field, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class RoomMediaCreateInput {
  @Field()
  @Length(1, 500)
  link: string;
}

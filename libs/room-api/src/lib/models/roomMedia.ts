import { Room } from './room';
import { User } from '@castmate/user-api';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RoomMedia {
  @Field() id: string;

  @Field() roomId?: string;

  @Field() room?: Room;

  @Field({defaultValue: 0}) secondsElapsed?: string;

  @Field() link: string;
}

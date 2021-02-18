import {
  Args,
  ID,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PrismaService } from '@castmate/prisma';
import { Room } from './models/room.model';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Inject } from '@nestjs/common';

@Resolver(() => Room)
export class RoomResolver {
  constructor(
    private readonly prisma: PrismaService, // private readonly userService: UsersService,
    @Inject('PUB_SUB') private readonly pubsub: RedisPubSub
  ) {}

  @Query(() => Room)
  room(@Args({ name: 'name', type: () => String }) name: string) {
    return this.prisma.room.findFirst({
      where: { name },
    });
  }

  @Query(() => [Room])
  rooms(@Args({ name: 'name', type: () => String }) name: string) {
    return this.prisma.room.findMany({
      where: {
        Room: {
          name,
        },
      },
    });
  }

  // @Mutation()
  // joinRoom() {

  // }

  @Subscription(() => Room, {
    filter: ({ roomUpdated }, { roomId }) =>
      roomUpdated.roomId === roomId,
  })
  roomUpdated(@Args({ name: 'id', type: () => ID }) roomId: string) {
    return this.pubsub.asyncIterator('roomUpdated');
  }
}
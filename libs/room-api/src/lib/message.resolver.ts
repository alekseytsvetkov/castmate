import {
  Args,
  Context,
  ID,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { RoomMessageCreateInput } from './dto/roomMessage.create.input';
import { PrismaService } from '@castmate/prisma';
import { RoomMessage } from './models/message.model';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Inject, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@castmate/auth-api';

@Resolver(() => RoomMessage)
export class RoomMessageResolver {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('PUB_SUB') private readonly pubsub: RedisPubSub
  ) {}

  @Query(() => [RoomMessage])
  async roomMessages(
    @Args({ name: 'roomId', type: () => ID }) roomId: string
  ) {
    const messages = await this.prisma.roomMessage.findMany({
      where: {
        roomId,
        deleted: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 50,
      include: {
        user: true,
      },
    });

    return messages.reverse();
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async createRoomMessage(
    @Args('input') input: RoomMessageCreateInput,
    @Context('userId') userId: string
  ) {
    const { content, roomId } = input;

    const message = await this.prisma.roomMessage.create({
      data: {
        content,
        room: {
          connect: {
            id: roomId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        user: true,
      },
    });

    this.pubsub.publish('roomMessageCreated', {
      roomMessageCreated: message,
    });
    return true;
  }

  @Subscription(() => RoomMessage, {
    filter: ({ roomMessageCreated }, { roomId }) =>
      roomMessageCreated.roomId === roomId,
  })
  roomMessageCreated(
    @Args({ name: 'roomId', type: () => ID }) roomId: string
  ) {
    return this.pubsub.asyncIterator('roomMessageCreated');
  }

  @Subscription(() => RoomMessage, {
    filter: ({ roomMessageDeleted, roomId }) =>
      roomMessageDeleted.roomId === roomId,
  })
  roomMessageDeleted(
    @Args({ name: 'roomId', type: () => ID }) roomId: string
  ) {
    return this.pubsub.asyncIterator('roomMessageDeleted');
  }
}

import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PrismaService } from '@castmate/prisma';
import { Room } from './models/room.model';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Inject, UseGuards } from '@nestjs/common';
import { CreateRoomInput } from './dto/createRoom.input';
import { AuthGuard } from '@castmate/auth-api';

@Resolver(() => Room)
export class RoomResolver {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('PUB_SUB') private readonly pubsub: RedisPubSub
  ) {}

  @ResolveField()
  async onlineCount(@Parent() room: Room) {
    const { id } = room;
    const connections = await this.prisma.connection.findMany({
      where: {
        room: {
          id,
        },
      },
      select: { ipHash: true },
      distinct: ['ipHash'],
    });

    return connections.length;
  }

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
        name,
      },

      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  @Mutation(() => Room)
  @UseGuards(AuthGuard)
  async createRoom(
    @Args({ name: 'input', type: () => CreateRoomInput })
    input: CreateRoomInput,
    @Context('userId') userId: string
  ) {
    return this.prisma.room.create({
      data: {
        ...input,
      },
    });
  }
}
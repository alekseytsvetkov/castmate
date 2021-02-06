import {
  ID,
  Query,
  Resolver,
  Mutation,
  Subscription,
  Args,
  Context,
} from '@nestjs/graphql';
import { UseGuards, Inject } from '@nestjs/common';
import { RoomMessageCreateInput } from './dto/roomMessage.create.input';
import { RoomMessage } from './models/roomMessage';
import { PrismaService } from '@castmate/prisma';
import { AuthGuard } from '@castmate/auth-api';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Room } from './models/room';
import { RoomCreateInput } from './dto/room.create.input';
import { mediaStatusChangeInput } from './dto/mediaStatus.input';

@Resolver((of) => RoomMessage)
export class RoomResolver {
  constructor(
    private readonly prisma: PrismaService,
    // private readonly userService: UsersService,
    @Inject('PUB_SUB') private readonly pubsub: RedisPubSub
  ) {}

  @Query(() => [Room])
  async rooms() {
    const rooms = await this.prisma.room.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: {
          include: {
            profile: true
          }
        },
        members: {
          include: {
            profile: true
          }
        },
        messages: {
          include: {
            author: {
              include: {
                profile: true
              }
            },
          }
        }
      }
    });

    return rooms;
  }

  @Query(() => Room)
  async room(@Args({ name: 'roomId', type: () => ID }) roomId: string) {
    const room = await this.prisma.room.findFirst({
      where: {
        id: roomId,
      },
      include: {
        author: {
          include: {
            profile: true
          }
        },
        members: {
          include: {
            profile: true
          }
        },
        messages: {
          include: {
            author: {
              include: {
                profile: true
              }
            },
          }
        }
      }
    });

    return room;
  }

  @Mutation((returns) => Room)
  @UseGuards(AuthGuard)
  async createRoom(
    @Args('input') input: RoomCreateInput,
    @Context('userId') userId: string
  ) {
    let { currentMedia } = input;
    currentMedia = currentMedia.trim();
    if (currentMedia.length === 0) {
      throw new Error('Empty media link');
    }
    if (currentMedia.length > 500) {
      throw new Error('Too long media link');
    }

    const room = await this.prisma.room.create({
      data: {
        currentMedia,
        author: {
          connect: {
            id: userId,
          },
        },
        members: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        author: {
          include: {
            profile: true
          }
        },
        members: {
          include: {
            profile: true
          }
        },
        messages: {
          include: {
            author: {
              include: {
                profile: true
              }
            },
          }
        }
      }
    });

    this.pubsub.publish('roomCreated', { roomCreated: room });

    return room;
  }

  @Mutation((returns) => Boolean)
  @UseGuards(AuthGuard)
  async toggleMediaStatus(
    @Args('input') input: mediaStatusChangeInput,
  ) {
    let { roomId, mediaStatus } = input;

    const status = mediaStatus === "PAUSED" ? "PLAYING" : "PAUSED";

    const room = await this.prisma.room.update({
      where: { id: roomId },
      data: {
        mediaStatus: status
      },
    });

    this.pubsub.publish('roomMediaStatusChanged', {
      roomMediaStatusChanged: room,
    });

    return true;
  }


  @Query(() => [RoomMessage])
  async roomMessages(@Args({ name: 'roomId', type: () => ID }) roomId: string) {
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
        author: {
          include: {
            profile: true
          }
        }
      },
    });

    return messages.reverse();
  }

  @Mutation((returns) => Boolean)
  @UseGuards(AuthGuard)
  async createRoomMessage(
    @Args('input') input: RoomMessageCreateInput,
    @Context('userId') userId: string
  ) {
    let { text, roomId } = input;
    text = text.trim();
    if (text.length === 0) {
      throw new Error('Empty message');
    }
    if (text.length > 500) {
      throw new Error('Too long message');
    }

    const roomMessage = await this.prisma.roomMessage.create({
      data: {
        content: text,
        room: {
          connect: {
            id: roomId,
          },
        },
        author: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        author: true,
      },
    });

    this.pubsub.publish('roomMessageCreated', {
      roomMessageCreated: roomMessage,
    });
    return true;
  }

  @Subscription((returns) => RoomMessage, {
    filter: ({ roomMessageCreated }, { roomId }) =>
      roomMessageCreated.roomId === roomId,
  })
  roomMessageCreated(@Args({ name: 'roomId', type: () => ID }) roomId: string) {
    return this.pubsub.asyncIterator('roomMessageCreated');
  }

  @Subscription((returns) => Room, {
    filter: ({ roomMediaStatusChanged }, { id }) =>
    roomMediaStatusChanged.roomId === id,
  })
  roomMediaStatusChanged(@Args({ name: 'roomId', type: () => ID }) roomId: string) {
    return this.pubsub.asyncIterator('roomMediaStatusChanged');
  }

  @Subscription((returns) => Room)
  roomCreated() {
    return this.pubsub.asyncIterator('roomCreated');
  }

  @Subscription((returns) => RoomMessage, {
    filter: ({ roomMessageDeleted, roomId }) =>
      roomMessageDeleted.roomId === roomId,
  })
  roomMessageDeleted(@Args({ name: 'roomId', type: () => ID }) roomId: string) {
    return this.pubsub.asyncIterator('roomMessageDeleted');
  }
}

import {
  ID,
  Query,
  Resolver,
  Mutation,
  Subscription,
  Args,
  Context,
} from '@nestjs/graphql';
import { UseGuards, Inject, UseInterceptors } from '@nestjs/common';
import { RoomMessageCreateInput } from './dto/roomMessage.create.input';
import { RoomMessage } from './models/roomMessage';
import { PrismaService } from '@castmate/prisma';
import { AuthGuard } from '@castmate/auth-api';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Room } from './models/room';
import { RoomCreateInput } from './dto/room.create.input';
import { mediaStatusChangeInput } from './dto/mediaStatus.input';
import { RavenInterceptor } from 'nest-raven';
import { RoomJoinInput } from './dto/room.join.input';
import { RoomMedia } from './models/roomMedia';
import { RoomMediaCreateInput } from './dto/roomMedia.create.input';
import { RoomDeleteInput } from './dto/room.delete.input';

@Resolver((of) => RoomMessage)
export class RoomResolver {
  constructor(
    private readonly prisma: PrismaService,
    // private readonly userService: UsersService,
    @Inject('PUB_SUB') private readonly pubsub: RedisPubSub
  ) {}

  @Query(() => [Room])
  @UseInterceptors(new RavenInterceptor())
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
  @UseInterceptors(new RavenInterceptor())
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
  @UseInterceptors(new RavenInterceptor())
  @UseGuards(AuthGuard)
  async createRoom(
    @Args('input') input: RoomCreateInput,
    @Context('userId') userId: string
  ) {
    let { roomMediaId } = input;
    // currentMedia = currentMedia.trim();
    // if (currentMedia.length === 0) {
    //   throw new Error('Empty media link');
    // }
    // if (currentMedia.length > 500) {
    //   throw new Error('Too long media link');
    // }

    const room = await this.prisma.room.create({
      data: {
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
        playlist: {
          connect: {
            id: roomMediaId
          }
        }
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
  @UseInterceptors(new RavenInterceptor())
  @UseGuards(AuthGuard)
  async deleteRoom(
    @Args('input') input: RoomDeleteInput,
    @Context('userId') userId: string
  ) {
    const { roomId } = input;

    const room = await this.prisma.room.findFirst({
      where: {
        AND: [
          {
            id: roomId
          },
          {
            author: {
              id: userId
            }
          }
        ]
      },
      include: {
        author: true
      }
    })

    if (room) {
      const deleteMessages = await this.prisma.roomMessage.deleteMany({
        where: {
          roomId: roomId,
        },
      })

      if (room.author.id === userId) {
        await this.prisma.room.delete({
          where: {
            id: roomId
          }
        })

        this.pubsub.publish('roomDeleted', { roomDeleted: room });

        return true;
      }
    } else {
      throw new Error(`This room doesn't exist`);
    }
  }

  // @Mutation((returns) => Boolean)
  // @UseInterceptors(new RavenInterceptor())
  // @UseGuards(AuthGuard)
  // async leaveRoom() {

  // }

  @Mutation((returns) => RoomMedia)
  @UseInterceptors(new RavenInterceptor())
  @UseGuards(AuthGuard)
  async createRoomMedia(
    @Args('input') input: RoomMediaCreateInput,
    @Context('userId') userId: string
  ) {
    let { link } = input;
    link = link.trim();
    if (link.length === 0) {
      throw new Error('Empty media link');
    }
    if (link.length > 500) {
      throw new Error('Too long media link');
    }

    const roomMedia = await this.prisma.roomMedia.create({
      data: {
        link: link,
      },
    });

    this.pubsub.publish('roomMediaCreated', { roomMediaCreated: roomMedia });

    return roomMedia;
  }


  @Mutation((returns) => Room)
  @UseInterceptors(new RavenInterceptor())
  @UseGuards(AuthGuard)
  async joinRoom(
    @Args('input') input: RoomJoinInput,
    @Context('userId') userId: string
  ) {
    let { roomId } = input;

    const room = await this.prisma.room.findFirst({
      where: {
        id: roomId
      }
    })

    if (!room) {
      throw new Error(`This room doesn't exist`);
    }

    const userAlreadyInRoom = await this.prisma.room.findMany({
      where: {
        id: roomId,
        members: {
          none: {
            id: userId
          }
        }
      },
    })

    if (userAlreadyInRoom.length === 0) {
      const room = await this.prisma.room.findFirst({
        where: {
          id: roomId
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
      })
      return room;
      // throw new Error('User has already joined the room');
    } else {
      const room = await this.prisma.room.update({
        where: {
          id: roomId
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
        },
        data: {
          members: {
            connect: {
              id: userId
            }
          }
        }
      })

      this.pubsub.publish('userJoined', { userJoined: room });

      return room;
    }
  }

  @Mutation((returns) => Boolean)
  @UseInterceptors(new RavenInterceptor())
  @UseGuards(AuthGuard)
  async toggleMediaStatus(
    @Args('input') input: mediaStatusChangeInput,
  ) {
    let { roomId, mediaStatus } = input;

    const room = await this.prisma.room.update({
      where: { id: roomId },
      data: {
        mediaStatus: mediaStatus
      },
    });

    this.pubsub.publish('roomMediaStatusChanged', {
      roomMediaStatusChanged: room,
    });

    return true;
  }

  @Query(() => [RoomMessage])
  @UseInterceptors(new RavenInterceptor())
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
  @UseInterceptors(new RavenInterceptor())
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

  @Query(() => [RoomMedia])
  @UseInterceptors(new RavenInterceptor())
  async roomPlaylist(@Args({ name: 'roomId', type: () => ID }) roomId: string) {
    const playlist = await this.prisma.roomMedia.findMany({
      where: {
        roomId: roomId
      },
      include: {
       room: true
      }
    });

    return playlist;
  }

  @UseInterceptors(new RavenInterceptor())
  @Subscription((returns) => RoomMessage, {
    filter: ({ roomMessageCreated }, { roomId }) =>
      roomMessageCreated.roomId === roomId,
  })
  roomMessageCreated(@Args({ name: 'roomId', type: () => ID }) roomId: string) {
    return this.pubsub.asyncIterator('roomMessageCreated');
  }

  @UseInterceptors(new RavenInterceptor())
  @Subscription((returns) => Room, {
    filter: ({ roomMediaStatusChanged }, { id }) =>
    roomMediaStatusChanged.roomId === id,
  })
  roomMediaStatusChanged(@Args({ name: 'roomId', type: () => ID }) roomId: string) {
    return this.pubsub.asyncIterator('roomMediaStatusChanged');
  }

  @UseInterceptors(new RavenInterceptor())
  @Subscription((returns) => Room)
  roomCreated() {
    return this.pubsub.asyncIterator('roomCreated');
  }

  @UseInterceptors(new RavenInterceptor())
  @Subscription((returns) => Room)
  userJoined() {
    return this.pubsub.asyncIterator('userJoined');
  }

  @UseInterceptors(new RavenInterceptor())
  @Subscription((returns) => Room, {
    filter: ({ roomDeleted, roomId }) =>
      roomDeleted.roomId === roomId,
  })
  roomDeleted(@Args({ name: 'roomId', type: () => ID }) roomId: string) {
    return this.pubsub.asyncIterator('roomDeleted');
  }

  @UseInterceptors(new RavenInterceptor())
  @Subscription((returns) => RoomMessage, {
    filter: ({ roomMessageDeleted, roomId }) =>
      roomMessageDeleted.roomId === roomId,
  })
  roomMessageDeleted(@Args({ name: 'roomId', type: () => ID }) roomId: string) {
    return this.pubsub.asyncIterator('roomMessageDeleted');
  }
}

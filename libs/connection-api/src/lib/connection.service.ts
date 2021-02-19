import { PrismaService } from '@castmate/prisma';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as ms from 'ms';

@Injectable()
export class ConnectionService {
  constructor(
    private readonly config: ConfigService,
    private prisma: PrismaService
  ) {}

  async cleanup() {
    return await this.prisma.connection.deleteMany({
      where: {
        updatedAt: {
          lt: new Date(new Date().getTime() - ms('7s')),
        },
      },
    });
  }

  async updateConnectionStatus({
    connectionId,
    ipHash,
    userId,
    room,
  }) {
    const instanceId = this.config.get('base.instanceId');

    let roomId = null;

    if (room) {
      const roomData = await this.prisma.room.findFirst({
        where: { name: room },
      });

      if (roomData) {
        roomId = roomData.id;
      }
    }

    try {
      await this.prisma.connection.upsert({
        where: {
          id: connectionId,
        },
        create: {
          id: connectionId,
          ipHash,
          instanceId,
          userId,
          roomId,
        },
        update: {
          roomId,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      Logger.error(error);
    }
  }

  async remove(id: string) {
    return this.prisma.connection.deleteMany({ where: { id } });
  }

  async uniqCount() {
    const connections = await this.prisma.connection.findMany({
      select: { ipHash: true },
      distinct: ['ipHash'],
    });

    return connections.length;
  }
}
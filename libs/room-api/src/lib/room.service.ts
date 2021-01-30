import { PrismaService } from '@castmate/prisma';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RoomService {
  constructor(
    private readonly config: ConfigService,
    private prisma: PrismaService
  ) {}
}

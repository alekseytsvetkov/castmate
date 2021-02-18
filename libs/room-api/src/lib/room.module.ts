import { Module } from '@nestjs/common';
import { PrismaModule } from '@castmate/prisma';
import { RoomResolver } from './room.resolver';

@Module({
  imports: [PrismaModule],
  providers: [RoomResolver],
  exports: [],
})
export class RoomModule {}
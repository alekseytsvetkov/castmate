import { Module } from '@nestjs/common';
import { PrismaModule } from '@castmate/prisma';
import { RoomResolver } from './room.resolver';
import { RoomMessageResolver } from './message.resolver'

@Module({
  imports: [PrismaModule],
  providers: [RoomResolver, RoomMessageResolver],
  exports: [],
})
export class RoomModule {}
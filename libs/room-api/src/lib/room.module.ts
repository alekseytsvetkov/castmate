import { Module } from '@nestjs/common';
import { PrismaModule } from '@castmate/prisma';
import { RoomService } from './room.service';
import { RoomResolver } from './room.resolver';

@Module({
  imports: [PrismaModule],
  providers: [RoomService, RoomResolver],
  exports: [RoomService],
})
export class RoomModule {}

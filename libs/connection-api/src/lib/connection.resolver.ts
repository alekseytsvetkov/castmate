import { Resolver, Query, Mutation, Context, Args, Int } from '@nestjs/graphql';
import { ConnectionService } from './connection.service';

@Resolver()
export class ConnectionResolver {
  constructor(private readonly connectionService: ConnectionService) {}

  @Query(() => Int)
  uniqCount() {
    return this.connectionService.uniqCount();
  }

  @Mutation(() => Boolean)
  async updateConnectionStatus(
    @Args({ name: 'room', type: () => String, nullable: true })
    room: string,
    @Context() { userId, connectionId, ipHash }
  ) {
    this.connectionService.updateConnectionStatus({
      userId,
      connectionId,
      ipHash: `${ipHash}-${userId || 'anon'}`,
      room,
    });

    return true;
  }
}

import { Resolver, Mutation, Context, Args } from '@nestjs/graphql';
import { ConnectionService } from './connection.service';

@Resolver()
export class ConnectionResolver {
  constructor(private readonly connectionService: ConnectionService) {}

  @Mutation(() => Boolean)
  async updateConnectionStatus(
    @Args({ name: 'room', type: () => String, nullable: true })
    room: string,
    @Context() { userId, connectionId, ipHash }
  ) {
    this.connectionService.updateConnectionStatus({
      userId,
      connectionId,
      ipHash,
      room,
    });

    return true;
  }
}
import { IoAdapter } from '@nestjs/platform-socket.io';
import { createAdapter } from 'socket.io-redis';
import { RedisClient } from 'redis';

export class RedisIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, options);
    const pubClient = new RedisClient({ host: 'redis', port: 6379 });
    const subClient = pubClient.duplicate();
    server.adapter(createAdapter({ pubClient, subClient }));
    return server;
  }
}

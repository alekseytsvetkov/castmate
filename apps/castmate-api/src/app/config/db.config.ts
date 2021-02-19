import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
  redisUrl: process.env.REDIS_URL,
  redisHost: process.env.REDIS_HOST,
  redisPort: parseInt(process.env.REDIS_PORT, 10),
  pgUrl: process.env.PG_URL,
  pgSsl: !!process.env.PG_SSL || false,
}));

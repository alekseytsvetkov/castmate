import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  secretKey: 'dfsfsadggert-castmate',
  expiresIn: '7d',
}));

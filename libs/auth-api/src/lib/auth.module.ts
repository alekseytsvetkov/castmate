import { Global, Module } from '@nestjs/common';
import { PrismaModule } from '@castmate/prisma';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { TwitchStrategy } from './strategies/twitch.strategy';
import { AuthGuard } from './guards/auth.guard';

@Global()
@Module({
  imports: [PassportModule, PrismaModule],
  controllers: [AuthController],
  providers: [AuthResolver, AuthService, GoogleStrategy, TwitchStrategy, AuthGuard],
  exports: [AuthService],
})
export class AuthModule {}

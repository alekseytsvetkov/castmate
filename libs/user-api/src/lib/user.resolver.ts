import { Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '@castmate/prisma';
import { User } from './models/user.model';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@castmate/auth-api';

@Resolver((of) => User)
export class UserResolver {
  constructor(
    private prisma: PrismaService,
  ) {}

  @UseGuards(AuthGuard)
  @Query((returns) => User)
  me(@Context('userId') userId): Promise<User> {
    return this.prisma.user.findFirst({
      where: { id: userId },
      include: {
        profile: true,
      },
    });
  }
}

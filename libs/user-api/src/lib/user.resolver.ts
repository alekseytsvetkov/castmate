import { Args, Context, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
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

  @Query((returns) => User)
  async user(@Args({ name: 'userId', type: () => ID }) userId: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        profile: true,
      },
    });

    if (!user) {
      throw new Error('This user does not exist');
    }

    return user;
  }
}

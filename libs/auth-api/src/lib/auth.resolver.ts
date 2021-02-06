import { UseGuards, UseInterceptors } from '@nestjs/common';
import { Query, Resolver, Args, Mutation, Context } from '@nestjs/graphql';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthTokens } from './models/AuthTokens';
import { RavenInterceptor } from 'nest-raven';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => AuthTokens)
  @UseInterceptors(new RavenInterceptor())
  async tokens(@Args('authCode') authCode: string) {
    return this.authService.getTokens(authCode);
  }

  @Query(() => String)
  @UseInterceptors(new RavenInterceptor())
  async refresh(@Args('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  @UseInterceptors(new RavenInterceptor())
  async logout(
    @Args('refreshToken') refreshToken: string,
    @Context('userId') userId
  ) {
    return this.authService.logout(refreshToken, userId);
  }
}

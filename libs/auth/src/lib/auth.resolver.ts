import { Query, Resolver, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthTokens } from './models/AuthTokens';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => AuthTokens)
  async tokens(@Args('authCode') authCode: string) {
    return this.authService.getTokens(authCode);
  }

  @Query(() => AuthTokens)
  async refresh(@Args('refreshToken') refreshToken: string) {
    return this.authService.refreshTokens(refreshToken);
  }
}

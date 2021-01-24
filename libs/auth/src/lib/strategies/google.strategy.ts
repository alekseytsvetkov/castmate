import { Strategy } from 'passport-google-oauth2';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly config: ConfigService) {
    super(config.get('authGoogle'));
  }

  async validate(accessToken, refreshToken, profile) {
    return {
      accessToken,
      refreshToken,
      provider: 'google',
      serviceId: profile?.id,
      name: profile?.displayName,
      email: profile?.email,
      avatar: profile?.picture,
    };
  }
}

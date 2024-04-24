import { Auth } from '@/auth.service';
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategyConfig extends PassportStrategy(Strategy, 'google') {
  constructor(@Inject('AUTH_SERVICE') private readonly authService: Auth) {
    super({
      clientID: process.env.AUTHO_CLIENT_ID,
      clientSecret: process.env.AUTHO_SECRET,
      callbackURL: `http://${process.env.HOST}/auth/google/callback`,
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const user = await this.authService.ValidateUser({
      email: profile.emails[0].value,
      familyName: profile.name.givenName,
      photo: profile.photos[0].value,
    });
    console.log('🚀 ~ GoogleStrategyConfig ~ validate ~ user:', user);
    return user || null;
  }
}

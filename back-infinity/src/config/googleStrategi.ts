import { Auth } from '@/auth.service';
import { JwtServices } from '@/services/jwt.service';
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategyConfig extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: Auth,
    private readonly jwtService: JwtServices
  ) {
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

    if (user) {
      const jwt = await this.jwtService.generateToken(user.id);
      return { jwt };
    }

    return null;
  }
}

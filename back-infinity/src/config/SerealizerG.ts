import { Auth } from '@/auth.service';
import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

interface SerializeCallback {
  (err: Error | null, user: any): void;
}

interface DeserializeCallback {
  (err: Error | null, user: any): void;
}

@Injectable()
export class SerealizerG extends PassportSerializer {
  constructor(@Inject('AUTH_SERVICE') private readonly authService: Auth) {
    super();
  }

  serializeUser(user: any, done: SerializeCallback) {
    done(null, user);
  }

  async deserializeUser(payload: any, done: DeserializeCallback) {
    const user = await this.authService.findOne(payload.id);
    return user ? done(null, user) : done(null, null);
  }
}

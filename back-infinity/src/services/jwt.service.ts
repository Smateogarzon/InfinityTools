import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtServices {
  constructor(private jwtService: JwtService) {}

  async generateToken(userId: string): Promise<string> {
    const payload = { userId };
    const token = await this.jwtService.signAsync(payload);
    return token;
  }

  async validateToken(token: string): Promise<any> {
    const secret = process.env.JWT_SECRET;
    return await this.jwtService.verifyAsync(token, { secret });
  }
}

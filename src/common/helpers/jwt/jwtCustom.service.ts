import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtServiceCustom {
  private readonly accessSecret: string;
  private readonly refreshSecret: string;
  private readonly accessExpiresIn: number;
  private readonly refreshExpiresIn: number;
  private readonly issuer: string;
  private readonly audience: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {
    // ✅ Grab all values first
    const accessSecret = this.config.get<string>('jwt.accessSecret');
    const refreshSecret = this.config.get<string>('jwt.refreshSecret');
    const accessExpiresIn = this.config.get<number>('jwt.accessTokenExpiresIn');
    const refreshExpiresIn = this.config.get<number>(
      'jwt.refreshTokenExpiresIn',
    );
    const issuer = this.config.get<string>('jwt.issuer');
    const audience = this.config.get<string>('jwt.audience');

    // ✅ Check all at once with || operator and throw
    if (
      !accessSecret ||
      !refreshSecret ||
      !accessExpiresIn ||
      !refreshExpiresIn ||
      !issuer ||
      !audience
    ) {
      throw new Error(
        'JWT configuration missing: ' +
          [
            !accessSecret && 'accessSecret',
            !refreshSecret && 'refreshSecret',
            !accessExpiresIn && 'accessExpiresIn',
            !refreshExpiresIn && 'refreshExpiresIn',
            !issuer && 'issuer',
            !audience && 'audience',
          ]
            .filter(Boolean)
            .join(', '),
      );
    }

    // ✅ Assign to class properties
    this.accessSecret = accessSecret;
    this.refreshSecret = refreshSecret;
    this.accessExpiresIn = accessExpiresIn;
    this.refreshExpiresIn = refreshExpiresIn;
    this.issuer = issuer;
    this.audience = audience;
  }

  generateAccessToken(payload: Record<string, any>): string {
    return this.jwtService.sign(payload, {
      secret: this.accessSecret,
      expiresIn: this.accessExpiresIn,
      issuer: this.issuer,
      audience: this.audience,
    });
  }

  generateRefreshToken(payload: Record<string, any>): string {
    return this.jwtService.sign(payload, {
      secret: this.refreshSecret,
      expiresIn: this.refreshExpiresIn,
      issuer: this.issuer,
      audience: this.audience,
    });
  }

  verifyAccessToken<T = any>(token: string): T {
    return this.jwtService.verify(token, {
      secret: this.accessSecret,
    }) as T;
  }

  verifyRefreshToken<T = any>(token: string): T {
    return this.jwtService.verify(token, {
      secret: this.refreshSecret,
    }) as T;
  }
}

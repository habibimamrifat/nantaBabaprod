import { registerAs } from '@nestjs/config';

export const jwtEnvConfig = registerAs('jwt', () => {
  return {
    accessSecret: process.env.JWT_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,

    accessTokenExpiresIn: process.env.JWT_TOKEN_TTL
      ? parseInt(process.env.JWT_TOKEN_TTL, 10)
      : 900, // 15 min

    refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_TTL
      ? parseInt(process.env.JWT_REFRESH_TOKEN_TTL, 10)
      : 604800, // 7 days

    issuer: process.env.JWT_ISSUER || 'my-app',
    audience: process.env.JWT_AUDIENCE || 'my-app-users',
  };
});

export {}; // 🔥 makes this file a module

declare global {
  namespace Express {
    interface Request {
      user?: {
        email?: string;
        sub?: string;
      };
    }
  }
}

import { HashingAbstract } from './hasingAbstract';
import * as bcrypt from 'bcrypt';

export class BcryptFunctions extends HashingAbstract {
  async createhash(data: string): Promise<string> {
    // Implementation for creating bcrypt hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data, salt);
    return hashedPassword;
  }

  async compareHash(data: string, hashedPassword: string): Promise<boolean> {
    // Implementation for comparing bcrypt hash
    return await bcrypt.compare(data, hashedPassword);
  }
}

export abstract class HashingAbstract {
  abstract createhash(data: string): Promise<string>;
  abstract compareHash(data: string, hashedPassword: string): Promise<boolean>;
}

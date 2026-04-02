import {
  Injectable,
  NotFoundException,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
// import * as dotenv from 'dotenv';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    //this env variable is not loaded automatically we need to use dotenv or config module to load it .. use config module to set it globally so that the variable can be accessed from anywhere in the project

    // dotenv.config();
    //this part loads the veriables in the doot env but we want to set config in the route so that it can be accessed globally in the project

    const connectionUrl = process.env['DATABASE_URL'] as string;
    console.log('here is the incoming url===>>', connectionUrl);
    if (!connectionUrl) {
      throw new NotFoundException('database url is not found');
    }

    const adaptor = new PrismaPg(connectionUrl);
    super({ adapter: adaptor });
  }

  onModuleInit() {
    return this.$connect();
  }
  onModuleDestroy() {
    return this.$disconnect();
  }
}

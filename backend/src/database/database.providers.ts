import * as mongoose from 'mongoose';
import { Logger } from '@nestjs/common';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> => {
      try {
        return await mongoose.connect(process.env.DB_ACCESS);
      } catch (error) {
        Logger.error('Failed to connect to the database', error.stack);
        throw new Error('Failed to connect to the database');
      }
    },
  },
];
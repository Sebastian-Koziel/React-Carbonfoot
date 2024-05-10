import { Connection } from 'mongoose';
import { FactorSchema } from './schemas/factor.schema';

export const factorsProviders = [
  {
    provide: 'FACTOR_MODEL',
    useFactory: (connection: Connection) => connection.model('Factor', FactorSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
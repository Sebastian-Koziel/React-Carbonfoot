import { Connection } from 'mongoose';
import { RaportSchema } from './schemas/raport.schema';


export const raportsProviders = [
  {
    provide: 'RAPORT_MODEL',
    useFactory: (connection: Connection) => connection.model('Raport', RaportSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];

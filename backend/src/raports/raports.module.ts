import { Module } from '@nestjs/common';
import { RaportsController } from './raports.controller';
import { RaportsService } from './raports.service';
import { raportsProviders } from './raports.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [RaportsController ],
  providers: [RaportsService, ...raportsProviders]
})
export class RaportsModule {}

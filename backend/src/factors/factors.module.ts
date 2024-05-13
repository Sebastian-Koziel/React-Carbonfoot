import { Module } from '@nestjs/common';
import { FactorsController } from './factors.controller';
import { FactorsService } from './factors.service';
import { factorsProviders } from './factors.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [FactorsController],
  providers: [FactorsService, ...factorsProviders]
})
export class FactorsModule {}

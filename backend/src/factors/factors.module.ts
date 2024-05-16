import { Module } from '@nestjs/common';
import { FactorsController } from './factors.controller';
import { FactorsService } from './factors.service';
import { factorsProviders } from './factors.providers';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [FactorsController],
  providers: [FactorsService, ...factorsProviders]
})
export class FactorsModule {}

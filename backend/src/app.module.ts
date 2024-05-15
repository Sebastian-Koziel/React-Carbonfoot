import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

import { MailerAppModule } from './mailer/mailer.module';
import { FactorsModule } from './factors/factors.module';
import { RaportsModule } from './raports/raports.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [UsersModule, MailerAppModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    FactorsModule,
    RaportsModule,
    UtilsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

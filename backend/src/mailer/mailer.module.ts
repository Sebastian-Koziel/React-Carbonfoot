import { Module } from '@nestjs/common';

import { MailerModule} from '@nestjs-modules/mailer';
import { MailerService } from './mailer.service';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [],
  controllers: [],
  providers: [MailerService],
  
})
export class MailerAppModule {}

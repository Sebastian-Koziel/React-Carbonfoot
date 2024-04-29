import { Controller } from "@nestjs/common";
import { MailerService } from "./mailer.service";
import { SendEmailDto } from "./interface/email.interface";

@Controller(`mailer`)
export class MailerController {
    constructor(private readonly mailerService: MailerService) {
    
    }

    async sendEmail(){
        const dto: SendEmailDto = {
            from: {name: `lucy`, address: `lycy@dasdfsd.com`},
            recipients: [{name: `john doe`, address: `gdsfsd@asasd.pl`}],
            subject: `luck charms`,
            html: `<p>Hi john</p>`
        }
        return await this.mailerService.sendEmail(dto);
    }
}
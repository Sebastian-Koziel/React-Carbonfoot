import { Controller, Post } from "@nestjs/common";
import { MailerService } from "./mailer.service";
import { SendEmailDto } from "./interface/email.interface";

@Controller(`mailer`)
export class MailerController {
    constructor(private readonly mailerService: MailerService) {
    
    }
@Post(`/sendEmail`)
    async sendEmail(){
        
    }
}
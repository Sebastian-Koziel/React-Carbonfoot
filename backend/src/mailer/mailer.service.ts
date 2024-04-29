import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as nodemailer from "nodemailer"
import { SendEmailDto } from "./interface/email.interface";
import Mail from "nodemailer/lib/mailer";

@Injectable()
export class MailerService {
    constructor(private readonly configService: ConfigService){}
  mailTransport() {
    const transporter = nodemailer.createTransport({
        host: this.configService.get<string>(`MAIL_HOST`),
        port: this.configService.get<number>(`MAIL_PORT`),
        secure: false,
        auth: {
            user: this.configService.get<string>(`MAIL_USER`),
            pass:this.configService.get<string>(`MAIL_PASSWORD`)
        },
    });
     return transporter
  }  
  async sendEmail(dto: SendEmailDto){
    const {from, recipients, subject, html, placeholderReplacement} = dto;
    const transport = this.mailTransport();

    const options: Mail.Options = {
        from: from ?? {
            name: 'carbonfoot',
            address: `carbonfoot@gmail.com`
        },
        to: recipients,
        subject,
        html
    };

    try {
        const result = await transport.sendMail(options);
        return result;
    }catch(error) {
        console.log(error);
    }
  }
}
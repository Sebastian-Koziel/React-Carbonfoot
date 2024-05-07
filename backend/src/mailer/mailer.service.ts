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
            pass: this.configService.get<string>(`MAIL_PASSWORD`)
        },
    });
     return transporter
  }  
  async sendConfirmationEmail(email:string, token:string){

    const emailBody:SendEmailDto = {
        from: '"Carbonfoot" <noreply@gmail.com>',
        recipient: email,
        subject: 'Please Verify Your Email Address',
        html: `<!DOCTYPE html>
        <html>
        <head>
            <!-- Styles and everything as above -->
        </head>
        <body>
            <div class="container">
                <h1>Welcome to Carbonfoot!</h1>
                <p>Thank you for registering with us. Please confirm your email address by clicking on the link below:</p>
                <a href="http://localhost:5173/validation/${token}" target="_blank">Verify Email Address</a>
                <p>If you did not create an account, no further action is required.</p>
                <p>Regards,<br/>Carbonfoot Team</p>
            </div>
        </body>
        </html>`
    }
    return await this.sendEmail(emailBody);
  }

  async sendEmail(dto: SendEmailDto){
    const {from, recipient, subject, html, placeholderReplacement} = dto;
    const transport = this.mailTransport();

    const options: Mail.Options = {
        from: from ?? {
            name: 'carbonfoot',
            address: `carbonfoot@gmail.com`
        },
        to: recipient,
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
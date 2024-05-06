import { BadRequestException, NotFoundException, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { RegisterUserDto } from "src/users/interfaces/registerUser.dto";
import { ConfigService } from "@nestjs/config";
import { MailerService } from "src/mailer/mailer.service";



@Injectable()
export class AuthService{

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private readonly configService: ConfigService,
        private mailerService: MailerService
        ) {}

    async register(data:RegisterUserDto){
        const {password, email } = data;
        // see if email is in use
        const users = await this.usersService.find(email);
        if(users.length){
            throw new BadRequestException('email in use');
        }
        //hash the users password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        data.password = hashedPassword;
        data.isEmailVerified = false;

        // Generate a verification token
        data.emailVerificationToken = this.jwtService.sign({ email },
            { secret: this.configService.get<string>(`JWT_SECRET`) });

        const newUser = await this.usersService.create(data);

        // Send verification email
        await this.mailerService.sendConfirmationEmail(email, data.emailVerificationToken);

        //return the user
        return newUser;
    }

    async verify(token: string) {
        const user = await this.usersService.findByVerificationToken(token);

        if (!user) {
        throw new NotFoundException('Invalid token or account already activated.');
        }

        user.isEmailVerified = true;
        user.emailVerificationToken = null; // Clear the token after verification
        await this.usersService.update(user._id, user);

        return 'Email successfully verified.';
    }
    
    async logIn(login: string, password: string){
        const [user] = await this.usersService.find(login);
        if(!user){
            throw new NotFoundException('Wrong user or password');
        }

        const match = await bcrypt.compare(password, user.password);
        if(!match){
            throw new BadRequestException('Wrong user or password');
        }

        const payload = {username: user.email, sub: user._id};
        

        const userWithNoPassword = await this.usersService.findOneNoPass(user._id);
        
        return {
            access_token: await this.jwtService.signAsync(payload),
            user: userWithNoPassword
        };
    }
}
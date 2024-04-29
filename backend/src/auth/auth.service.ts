import { BadRequestException, NotFoundException, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";



@Injectable()
export class AuthService{

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
        ) {}

    async register(login: string, password: string){
        // see if email is in use
        const users = await this.usersService.find(login);
        if(users.length){
            throw new BadRequestException('email in use');
        }
        //hash the users password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create a new user and save it  TODO - change for proper create user
        const data:any= {
            login:login, 
            password: hashedPassword,
            
        }
        const newUser = await this.usersService.create(data)
        //return the user
        return newUser;
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

        const payload = {username: user.login, sub: user._id};
        

        const userWithNoPassword = await this.usersService.findOneNoPass(user._id);
        
        return {
            access_token: await this.jwtService.signAsync(payload),
            user: userWithNoPassword
        };
    }
}
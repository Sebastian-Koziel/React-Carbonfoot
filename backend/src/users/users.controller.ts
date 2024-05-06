import { Body, Controller, Post, Get, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { RegisterUserDto } from './interfaces/registerUser.dto';
import { User } from './interfaces/user.interface';


@Controller('auth')
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService
        ) {}
    
    @Post('/register')
    async registerUser(@Body() body: RegisterUserDto) {
        console.log(`in user constroller ${body.name}`);
        return await this.authService.register(body);
    }
    @Get('/verify')
    async verifyEmail(@Query('token') token: string): Promise<string> {
        console.log(`verify`)
     return await this.authService.verify(token);
    }

    @Get()
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get('/:id')
    async findOne(@Param('id') id:string): Promise<User>{
        return this.usersService.findOne(id);
    }

    
}

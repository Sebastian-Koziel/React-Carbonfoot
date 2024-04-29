 import { Body, Controller, Post, Get, Param, UseGuards, Delete } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateUser } from './interfaces/updateUser.interface';

@Controller('auth')
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService
        ) {}
    
    @Post('create')
    createUser(@Body() body: CreateUserDto) {
        console.log(`in user constroller ${body.name}`);
        return
    }

    @Post('update')
    updateUser(@Body() body: UpdateUser) {
        return this.usersService.update(body.id, body.attr);
    }

    //special end point for changing access set for user - so only admin can do that
    
    @UseGuards(AuthGuard)
    @Post('updateAccess')
    updateUserAccess(@Body() body: UpdateUser) {
        return this.usersService.update(body.id, body.attr);
    }

    @Post('login')
    logIn(@Body() body: CreateUserDto) {
        return this.authService.logIn(body.login, body.password)
    }

    //@Access_decorator(Access.usersTab_access)
    //@UseGuards(AuthGuard, AccessGuard)
    @Get()
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    //@Access_decorator(Access.usersTab_access)
    //@UseGuards(AuthGuard, AccessGuard)
    @Get('/:id')
    async findOne(@Param('id') id:string): Promise<User>{
        return this.usersService.findOne(id);
    }

    //@Access_decorator(Access.usersTab_access)
    //@UseGuards(AuthGuard, AccessGuard)
    @Delete('/:id')
    async remove(@Param('id') id:string){
        this.usersService.remove(id);
    }

    
}

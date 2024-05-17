import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RaportsService } from './raports.service';
import { User } from 'src/auth/userDecorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateRaportDto } from './interfaces/createRaport.dto';
import { Raport } from './interfaces/raport.interface';

@Controller('raports')
export class RaportsController {
    constructor(
        private raportsService: RaportsService,
        
        ) {}
    
    //add
    @Post('/register')
    async addRaport(@Body() body: CreateRaportDto) {
        return await this.raportsService.create(body);
    }
    //get all from user
    @UseGuards(AuthGuard)
    @Get()
    async findAll(@User() user_id: string): Promise<Raport[]> {
        
        return this.raportsService.findAllByUser(user_id);
    }

    //find one
    @Get('/:id')
    async findOne(@Param('id') id:string): Promise<Raport>{
        return this.raportsService.findOne(id);
    }

}

import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
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
    @UseGuards(AuthGuard)
    @Post('/create')
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
    @UseGuards(AuthGuard)
    @Get('/:id')
    async findOne(@Param('id') id:string): Promise<Raport>{
        return await this.raportsService.findOne(id);
    }

    //remove
    
    @UseGuards(AuthGuard)
    @Delete('/:id')
    async remove(@Param('id') id:string){
        this.raportsService.remove(id);
    }
}

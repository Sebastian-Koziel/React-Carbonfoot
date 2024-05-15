import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateFactorDto } from './interfaces/createFactor.dto';
import { FactorsService } from './factors.service';
import { Factor } from './interfaces/factor.interface';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/auth/userDecorator';


@Controller('factors')
export class FactorsController {
    constructor(
        private factorsService: FactorsService,
    ){}
    
    //add
    @UseGuards(AuthGuard)
    @Post('/create')
    async addNewFactor(@Body() body: CreateFactorDto) {
        return await this.factorsService.create(body);
    }
    //get all public ones and users
    @UseGuards(AuthGuard)
    @Get()
    async findAll(@User() user_id: string): Promise<Factor[]> {
        
        return this.factorsService.findAllPublicOrMine(user_id);
    }



}

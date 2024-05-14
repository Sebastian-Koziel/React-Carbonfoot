import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateFactorDto } from './interfaces/createFactor.dto';
import { FactorsService } from './factors.service';
import { Factor } from './interfaces/factor.interface';

@Controller('factors')
export class FactorsController {
    constructor(
        private factorsService: FactorsService,
    ){}
    
    //add
    @Post('/create')
    async addNewFactor(@Body() body: CreateFactorDto) {
        return await this.factorsService.create(body);
    }
    //get all public ones and mine
    @Get()
    async findAll(): Promise<Factor[]> {
        return this.factorsService.findAllPublicOrMine();
    }



}

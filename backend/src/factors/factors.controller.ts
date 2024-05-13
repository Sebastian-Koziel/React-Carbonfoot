import { Body, Controller, Post } from '@nestjs/common';
import { CreateFactorDto } from './interfaces/createFactor.dto';
import { FactorsService } from './factors.service';

@Controller('factors')
export class FactorsController {
    constructor(
        private factorsService: FactorsService,
    ){}
    
    //add
    @Post('/create')
    async registerUser(@Body() body: CreateFactorDto) {
        return await this.factorsService.create(body);
    }



}

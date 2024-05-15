
import { Controller, Get, Query } from '@nestjs/common';
import { UtilsService } from './utils.service';


@Controller('utils')
export class UtilsController {
    constructor(private readonly utilsService: UtilsService) {}

    @Get('regions')
    findRegions(@Query('lang') lang: string): any {
        return this.utilsService.findRegions(lang);
    }
    @Get('units')
    findUnits(@Query('lang') lang: string): any {
        return this.utilsService.findUnits(lang);
    }
}
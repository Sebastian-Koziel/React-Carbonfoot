import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Raport } from './interfaces/raport.interface';
import { CreateRaportDto } from './interfaces/createRaport.dto';

@Injectable()
export class RaportsService {
    constructor(@Inject('RAPORT_MODEL') private raportsModel: Model<Raport>) {}
    
    async findAllByUser(userId: string): Promise<Raport[]> {
        return await this.raportsModel.find({ addedBy: userId }).exec();
    }

    async create(createUserDto: CreateRaportDto): Promise<any>{
        const createdRaport = await this.raportsModel.create(createUserDto)
        return createdRaport;
    }

    async findOne(id: string): Promise<Raport> {
        return this.raportsModel.findById(id);
    }
}

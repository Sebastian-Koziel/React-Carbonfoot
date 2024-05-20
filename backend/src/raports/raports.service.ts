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

    async create(createRaportDto: CreateRaportDto): Promise<Raport>{
        const createdRaport = await this.raportsModel.create(createRaportDto)
        return createdRaport;
    }

    async findOne(id: string): Promise<Raport> {
        return await this.raportsModel.findById(id);
    }

    async remove(id:string){
        const filter = {_id : id}
        return await this.raportsModel.deleteOne(filter);
    }
}

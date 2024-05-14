import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Factor } from './interfaces/factor.interface';
import { Model } from 'mongoose';
import { CreateFactorDto } from './interfaces/createFactor.dto';

@Injectable()
export class FactorsService {
    constructor(@Inject('FACTOR_MODEL') private factorModel: Model<Factor>) {}
    
    async findAllPublicOrMine(): Promise<Factor[]> {
        return this.factorModel.find({ isPublic: true });
    }

    async create(createUserDto: CreateFactorDto): Promise<any>{
        const createdUser = await this.factorModel.create(createUserDto)
        return createdUser._id;
    }

    async findOne(id: string): Promise<Factor> {
        return this.factorModel.findById(id);
    }

    async update(id: string, attrs: Partial<Factor>): Promise<Factor>{
        let factor = await this.findOne(id);
        if(!factor){
            throw new NotFoundException(`No user found with ID ${id}`);
        }
        Object.assign(factor, attrs);
        await factor.save();

        return factor;
    }
}

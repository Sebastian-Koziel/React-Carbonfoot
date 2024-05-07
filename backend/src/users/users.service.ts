import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { Model } from 'mongoose';


import { RegisterUserDto } from "./interfaces/registerUser.dto";
import { User } from "./interfaces/user.interface";

@Injectable()
export class UsersService {
    constructor(@Inject('USER_MODEL') private userModel: Model<User>) {}
    
    async findAll(): Promise<User[]> {
        return this.userModel.find().select('-password').exec();
    }

    async create(createUserDto: RegisterUserDto): Promise<any>{
        const createdUser = await this.userModel.create(createUserDto)
        return createdUser._id;
    }

    async findOne(id: string): Promise<User> {
        return this.userModel.findById(id);
    }
    //finding with no password
    async findOneNoPass(id: string): Promise<User> {
        return this.userModel.findById(id, '-password');
    }

    async find(email: string): Promise<User[]> {
        return this.userModel.find({ email });
    }

    async findByVerificationToken(token: string): Promise<User> {
        return this.userModel.findOne({ emailVerificationToken: token });
    }

    async update(id: string, attrs: Partial<User>): Promise<User>{
        let user = await this.findOne(id);
        if(!user){
            throw new NotFoundException(`No user found with ID ${id}`);
        }
        Object.assign(user, attrs);
        await user.save();

        return user;
    }
}

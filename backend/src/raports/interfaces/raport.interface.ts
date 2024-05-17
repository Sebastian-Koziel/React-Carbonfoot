import { Document } from "mongoose";

export interface Raport extends Document {
    _id: string
   
    name : string
    addedBy: string
};


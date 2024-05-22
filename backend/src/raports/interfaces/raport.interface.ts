import { Document } from "mongoose";

export interface Raport extends Document {
    _id: string
    name : string
    addedBy: string
    addedAt: string
    emisions: {
        scope1:{
            stationaryCombustion: [],
            mobileCombustion: []
        },
        scope2: {
            
        }
    }
};


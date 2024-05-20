import * as mongoose from 'mongoose';

export const RaportSchema = new mongoose.Schema({
    name : {
        type : String,
    },
    addedBy : {
        type: String
    },
    addedAt : {
        type: Date,
        default: Date.now
    }
});



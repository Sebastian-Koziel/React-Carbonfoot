import * as mongoose from 'mongoose';

export const RaportSchema = new mongoose.Schema({
    name : {
        type : String,
    },
    addedBy : {
        type: String
    }
});



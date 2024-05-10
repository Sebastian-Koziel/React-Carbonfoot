import * as mongoose from 'mongoose';

export const FactorSchema = new mongoose.Schema({
    name : {
        type : String,
        require: [true, "Pleae provide a name"],
        unique: true,
    },
    region: {
        type: String,
    },
    year: {
        type: String,
        require: [true, "Pleae provide a year"],
    },
    value: {
        type: Number,
        require: [true, "Pleae provide a value"],
    },
    units: {
        type: String,
        require: [true, "Pleae provide a units"]
    },
    comment: {
        type: String
    },


    usedTimes: {
        type: Number
    },
    isPublic: {
        type: Boolean
    },
    isUsed: {
        type: Boolean
    },
    whereUsed: [{
        type: String
    }],
    isActive: {
        type: Boolean
    },
    addedBy: {
        type: String
    }
    
});



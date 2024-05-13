import { timeStamp } from 'console';
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

    ranks: {
        1: { type: Number, dafault:0 },
        2: { type: Number, dafault:0 },
        3: { type: Number, dafault:0 },
        4: { type: Number, dafault:0 },
        5: { type: Number, dafault:0 },
        sum: { type: Number, dafault:0 },
        average: { type: Number, dafault:0 }
      },

    usedTimes: {
        type: Number,
        dafault:0
    },
    isPublic: {
        type: Boolean
    },
    isUsed: {
        type: Boolean,
        dafault:false
    },
    whereUsed: [{
        type: String,
        default: []
    }],
    isActive: {
        type: Boolean,
        dafault:true
    },
    addedBy: {
        type: String
    },
    addedTime: {
        type: timeStamp
    }
    
});



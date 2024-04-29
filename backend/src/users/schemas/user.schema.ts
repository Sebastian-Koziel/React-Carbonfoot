import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    email : {
        type : String,
        require: [true, "Pleae provide a mail"],
        unique: true,
    },
    password: {
        type: String,
        require: [true, "Pleae provide a password"],
    },
    name: {
        type: String,
        require: [true, "Pleae provide a name"],
    },
    surname: {
        type: String,
        require: [true, "Pleae provide a surname"],
    },
    company: {
        type: String,
        require: [true, "Pleae provide a company name"]
    },
    isEmailVerified: {
        type: Boolean
    },
    emailVerificationToken: {
        type: String
    }
    
   
});



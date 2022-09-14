import mongoose from 'mongoose';
var Schema = mongoose.Schema
let UserModelSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
})

let UserDetailsModelSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: Number
    },
    address: {
        type: String
    },
    github: {
        type: String
    }
})

export const UserModel = mongoose.model('Users', UserModelSchema)
export const UserDetailsModel = mongoose.model('UsersDetails', UserDetailsModelSchema)

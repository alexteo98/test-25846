import mongoose from 'mongoose';
var Schema = mongoose.Schema
let MockModelSchema = new Schema({
    postId: {
        type: String,
    },
    id: {
        type: String,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    body: {
        type: String,
    },
})

export const MockModel = mongoose.model('mockdata', MockModelSchema)

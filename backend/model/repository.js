import { UserDetailsModel, UserModel } from './user-model.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

let mongoDB = process.env.ENV == "PROD" ? process.env.DB_CLOUD_URI_PROD : process.env.ENV == "TEST" ? process.env.DB_CLOUD_URI_TEST : process.env.DB_LOCAL_URI;
//let mongoDB = process.env.DB_CLOUD_URI_TEST
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export async function createUser(params) {
    //console.log(params)
    return UserModel(params)
}

export async function deleteUser(params) {
    try{
        //console.log(params)
        var res = await UserModel.deleteOne(params)
        return res
    } catch (err){
        //console.log('error occured on delete')
        return { err }
    }
}

export async function getUserDetails(_email){
    try{
        var res = {}
        const query = UserDetailsModel.find({email: _email}).exec();
        await query.then(function (userDetails) {
            if (userDetails && userDetails.length > 0){
                res = userDetails[0]
            }
        })

        return res
    } catch(err){
        return { err }
    }
}

export async function setUserDetails(params) {
    try{
        return UserDetailsModel(params)
    } catch(err){
        return {err}
    }
}

export async function getUserSet() {
    try{
        const userSet = UserDetailsModel.distinct("email")
        return userSet
    } catch (err) {
        return { err }
    }
}

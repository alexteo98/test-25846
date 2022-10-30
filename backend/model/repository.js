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

export async function authUser(params) {
    try{
        var res = await UserModel.findOne(params)
        if (res != null) {
            return res.role
        }
        return { err }
    } catch (err) {
        return { err }
    }
}

export async function deleteUser(params) {
    try{
        //console.log(params)
        var detailsExist = await UserDetailsModel.findOne({email: params.email}) || null
        if (detailsExist){
            var detailsDeleted = await UserDetailsModel.deleteOne({email: params.email})
            var res = await UserModel.deleteOne(params)
            return (res.deletedCount + detailsDeleted.deletedCount == 2)
        } else {
            var res = await UserModel.deleteOne(params)
            return res.deletedCount == 1;
        }
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
        const query = UserDetailsModel.findOneAndDelete({email: params.email}).exec();
        await query.then(() => {})
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

export async function getUsers() {
    try{
        const users = await UserModel.find({})
        //console.log('repo ok')
        const converted = users.map(x => {
            return {email: x.email, role: x.role}
        })
        const collection = {}
        converted.forEach((x,i) => collection[i] = x);
        return collection
    } catch (err) {
        console.log(err)
        return { err }
    }
}

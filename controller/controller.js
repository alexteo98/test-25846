import { ormCreateUser as _createUser,
    ormDeleteUser as _deleteUser,
    ormGetUserDetails as _getUserDetails, 
    ormSetUserDetails as _setUserDetails 
} from "../model/user-orm.js"

import {
    MISSING_CREDENTIALS_CODE,
    MISSING_CREDENTIALS_MESSAGE,
    WRONG_CREDENTIALS_CODE,
    WRONG_CREDENTIALS_MESSAGE,
    NO_RIGHTS_CODE,
    NO_RIGHTS_MESSAGE,
    CREATED_CODE,
    CREATED_MESSAGE,
    OK_CODE,
    OK_MESSAGE,
    GENERAL_SERVER_CODE,
    GENERAL_SERVER_MESSAGE,
    CONFLICTING_USER_CODE,
    CONFLICTING_USER_MESSAGE
} from '../constants.js'

export async function createUser(req,res) {
    try{
        const { email, password, phone } = req.body
        if (email && password){
            const resp = await _createUser(req.body)
            if (resp.err){
                return res.status(CONFLICTING_USER_CODE).json({status: CONFLICTING_USER_CODE, message: CONFLICTING_USER_MESSAGE});
            }else {
                return res.status(CREATED_CODE).json({message: `${CREATED_MESSAGE} ${email} successfully!`});
            }

        } else {
            return res.status(MISSING_CREDENTIALS_CODE).json({ status:MISSING_CREDENTIALS_CODE, message: MISSING_CREDENTIALS_MESSAGE })
        }
    } catch(err){
        return res.status(GENERAL_SERVER_CODE).json({ status:GENERAL_SERVER_CODE, message: GENERAL_SERVER_MESSAGE, error: err })
    }
}

export async function deleteUser(req,res) {
    try{
        const { email, password } = req.body
        if (email && password){
            const resp = await _deleteUser(req.body)
            if (resp.err){
                return res.status(WRONG_CREDENTIALS_CODE).json({ status:WRONG_CREDENTIALS_CODE, message: WRONG_CREDENTIALS_MESSAGE })
            }else {
                if (resp.deletedCount > 0)
                    return res.status(OK_CODE).json({ status:OK_CODE, message: `Deleted user ${email}`});
                else
                    return res.status(WRONG_CREDENTIALS_CODE).json({ status:WRONG_CREDENTIALS_CODE, message: WRONG_CREDENTIALS_MESSAGE })
            }
        } else {
            return res.status(MISSING_CREDENTIALS_CODE).json({ status:MISSING_CREDENTIALS_CODE, message: MISSING_CREDENTIALS_MESSAGE })
        }
    } catch(err){
        return res.status(GENERAL_SERVER_CODE).json({ status:GENERAL_SERVER_CODE, message: GENERAL_SERVER_MESSAGE, error: err })
    }
}

export async function getUserDetails(req, res) {
    try{
        const { email } = req.body;
        if (email){
            var resp = await _getUserDetails(email)
            console.log(Object.keys(resp).length)
            if (Object.keys(resp).length == 0)
                return res.status(WRONG_CREDENTIALS_CODE).json({status:WRONG_CREDENTIALS_CODE, message: WRONG_CREDENTIALS_MESSAGE })
            else
                return res.status(200).json(resp)
        } else {
            return res.status(MISSING_CREDENTIALS_CODE).json({ status:MISSING_CREDENTIALS_CODE, message: MISSING_CREDENTIALS_MESSAGE })
        }
    } catch(err){
        return res.status(GENERAL_SERVER_CODE).json({ status:GENERAL_SERVER_CODE, message: GENERAL_SERVER_MESSAGE, error: err })
    }
}

export async function setUserDetails(req,res) {
    try{
        const { email, phone, address} = req.body
        if (email){
            var resp = await _setUserDetails({email,phone,address})
            if (resp.err){
                return res.status(WRONG_CREDENTIALS_CODE).json({status:WRONG_CREDENTIALS_CODE, message: WRONG_CREDENTIALS_MESSAGE })
            }else {
                return res.status(CREATED_CODE).json({status: CREATED_CODE, message: CREATED_MESSAGE, details: resp})
            }
        } else{
            return res.status(MISSING_CREDENTIALS_CODE).json({ status:MISSING_CREDENTIALS_CODE, message: MISSING_CREDENTIALS_MESSAGE })
        }
    } catch(err){
        return res.status(GENERAL_SERVER_CODE).json({ status:GENERAL_SERVER_CODE, message: GENERAL_SERVER_MESSAGE, error: err })
    }
    
}



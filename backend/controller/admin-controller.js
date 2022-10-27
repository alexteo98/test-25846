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
    CONFLICTING_USER_MESSAGE,
    NO_DATA_FOUND_CODE,
    NO_DATA_FOUND_MESSAGE
} from '../constants.js'
import { ormGetUsers } from '../model/user-orm.js'

export async function getUsers(req, res){
    try{
        const resp = await ormGetUsers()
        return res.status(OK_CODE).json(resp)
    } catch(err) {
        return res.status(GENERAL_SERVER_CODE).json({message: GENERAL_SERVER_MESSAGE, error: err})
    }
}
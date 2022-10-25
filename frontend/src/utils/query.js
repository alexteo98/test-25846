import axios from "axios";
import { BACKEND_DEPLOYMENT_URL } from "./constants";

const URI_HOSTNAME = BACKEND_DEPLOYMENT_URL
const URI_USER_DETAILS_SUFFIX = '/details'
const URI = URI_HOSTNAME+URI_USER_DETAILS_SUFFIX


export const queryEmail = async _email => {
    try{
        const res = await axios.post(URI,{ email: _email })
        return res.status==200?res:null;
    } catch(err){
        return null;
    }
}

export const getUserSet = async () => {
    try{
        const res = await axios.get(URI)
        return res.data.users
    } catch (err) {
        return []
    }
}
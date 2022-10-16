import axios from "axios";

const URI_HOSTNAME = process.env.URI_USER_SVC || 'http://localhost:8080'
const URI_USER_DETAILS_SUFFIX = '/details'
const URI = URI_HOSTNAME+URI_USER_DETAILS_SUFFIX


export const queryEmail = async _email => {
    try{
        const res = await axios.post(URI,{ email: _email })
        console.log(res)
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
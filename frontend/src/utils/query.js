import axios from "axios";

const URI_HOSTNAME = process.env.URI_USER_SVC || 'http://localhost:3000'
const URI_USER_DETAILS_SUFFIX = '/details'
const URI = URI_HOSTNAME+URI_USER_DETAILS_SUFFIX


export default async function queryEmail(_email) {
    try{
        const res = await axios.post(URI,{ email: _email })
        return res.status==200?res:null;
    } catch(err){
        return null;
    }
}
//import mock_data from "../model/mock-data.js";
import axios from "axios"
import { createClient } from "redis"
const url = 'http://jsonplaceholder.typicode.com/comments'
const cache = createClient()
cache.connect()

export async function getMockData(req,res) {
    try{
        var data = await fetch_cache()
        if(!data){
            data = await fetch_url()
            await cache.set('store', JSON.stringify(data))
        }
        return res.status(200).json(data)
    } catch(err) {
        console.log(err)
        return res.status(500).json({})
    }
    
}

async function fetch_url(){
    try{
        const resp=await axios.get(url)
        return resp.data
    } catch(err){
        console.log(err)
        return null
    }
}

async function fetch_cache() {
    return await cache.get('store', (err, store) => {
        if (err){
            console.log(err)
            return null
        }
        else if (store != null){
            return JSON.parse(store)
        } else {
            return null
        }
    })
}
//import mock_data from "../model/mock-data.js";
import axios from "axios"
import { createClient } from "redis"
import { getMockData as _getFromDb } from "../model/repository.js"

const url = 'http://jsonplaceholder.typicode.com/comments'
const cache = createClient()
cache.connect()

export async function getMockData(req,res) {
    try{
        var data = await fetch_cache()
        if (data){
            return res.status(200).json(JSON.parse(data))
        } else {
            data = await fetch_data()
            await cache.set('store', JSON.stringify(data))
            return res.status(200).json(data)
        }
    } catch(err) {
        console.log(err)
        return res.status(500).json({})
    }
    
}

async function fetch_data(){
    try{
        const resp = await _getFromDb()
        console.log('fetching ' + resp)
        return resp
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
import { createUser, deleteUser } from "./repository.js";

// export async function ormGetSeatStatus(_seatId) {
//     try{
//         const resp = await getSeatStatus(_seatId)
//         return resp
//     } catch (err){
//         return { err }
//     }
// }

export async function ormCreateUser(params){
    try{
        //console.log("trying to create user")
        const newSeat = await createUser(params)
        await newSeat.save()
        return true;
    } catch (err){
        //console.log("error occured")
        //console.log(err)
        return { err }
    }
}

export async function ormDeleteUser(params){
    try{
        //console.log('trying to delete user')
        var res = await deleteUser(params)
        return res
    } catch(err) {
        return { err }
    }
}
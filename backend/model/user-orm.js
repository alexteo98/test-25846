import { createUser, deleteUser, getUserDetails, getUserSet, setUserDetails, authUser } from "./repository.js";

// export async function ormGetSeatStatus(_seatId) {
//     try{
//         const resp = await getSeatStatus(_seatId)
//         return resp
//     } catch (err){
//         return { err }
//     }
// }

export async function ormCreateUser(_email, _password){
    try{
        //console.log("trying to create user")
        const newSeat = await createUser({email: _email, password: _password, role: "user"})
        await newSeat.save()
        return true;
    } catch (err){
        //console.log("error occured")
        console.log(err)
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

export async function ormGetUserDetails(_email){
    try{
        var res = await getUserDetails(_email)
        return res
    } catch(err){
        return { err }
    }
}

export async function ormSetUserDetails(params) {
    try{
        var res = await setUserDetails(params)
        res.save()
        return res
    } catch (err) {
        return { err }
    }
}

export async function ormGetUserSet() {
    try{
        var res = await getUserSet()
        return res
    } catch (err){
        return { err }
    }
}

export async function ormAuthUser(params) {
    // wrong credentials return error
    try{
        var res = await authUser(params)
        //console.log(res)
        if (res.err) {
            return { err }
        }

        return res
    } catch(err) {
        return { err }
    }
}

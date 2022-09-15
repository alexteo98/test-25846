import { ormCreateUser as _createUser, ormDeleteUser as _deleteUser } from "../model/user-orm.js"

// export async function getSeatStatus(req,res) {
//     try{
//         const { seat } = req.body
//         if (seat){
//             const status = await getSeatStatus(seat)
//             return res.status(200).json({ status:200, status: status})
//         } else{
//             return res.status(400).json({ status:400, message: 'No seat information provided!' })
//         }
//     } catch (err){
//         return res.status(500).json({ status:500, message: 'error occured during request', error: err })
//     }
// }

export async function createUser(req,res) {
    try{
        const { email, password, phone } = req.body
        if (email && password){
            const resp = await _createUser(req.body)
            if (resp.err){
                return res.status(400).json({message: 'Could not create a new user!'});
            }else {
                return res.status(201).json({message: `Created new user ${email} successfully!`});
            }

        } else {
            return res.status(400).json({ status:400, message: 'No email and password provided!' })
        }
    } catch(err){
        return res.status(500).json({ status:500, message: 'error occured during request', error: err })
    }
}

export async function deleteUser(req,res) {
    try{
        const { email, password } = req.body
        if (email && password){
            const resp = await _deleteUser(req.body)
            if (resp.err){
                return res.status(403).json({ status:403, message: 'Please check your email and password!' })
            }else {
                if (resp.deletedCount > 0)
                    return res.status(200).json({ status:200, message: `Deleted user ${email}`});
                else
                    return res.status(403).json({ status:403, message: 'Please check your email and password!' })
            }
        } else {
            return res.status(400).json({ status:400, message: 'Please check your email and password!' })
        }
    } catch(err){
        return res.status(500).json({ status:500, message: 'error occured during request', error: err })
    }
}

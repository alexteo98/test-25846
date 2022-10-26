import { verifyAccess, verifyToken } from "../utils/auth.js"

export const auth = async (req,res,next) => {
    try{
        const token = (req.headers['authorization'])
        console.log(`Checking token`);
        
        if (await verifyToken(token)){
            next()
        } else {
            return res.status(403).send()
        }
    } catch (err) {
        res.status(401).send('Forbidden')
    }
}

export const authAdmin = async (req,res,next) => {
    try{
        const token = (req.headers['authorization'])

        if (!(await verifyToken(token))){
            //console.log('authentication failed')
            return res.status(401).send()
        } 

        if (!(await verifyAccess(token))){
            //console.log('authorization failed')
            return res.status(403).send()
        }

        next()
    } catch (err) {
        res.status(403).send('Forbidden')
    }
    
}

export const block = (req,res,next) => {
    res.status(403).send('Forbidden')
}

export const allow = (req,res,next) => {
    next()
}

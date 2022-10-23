import { verifyAccess, verifyToken } from "../utils/auth"

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
        console.log(`Checking access rights`);
        
        if (await verifyAccess(token)){
            next()
        } else {
            return res.status(403).send()
        }
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

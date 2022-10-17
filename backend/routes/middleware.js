
export const auth = async (req,res,next) => {
    try{
        next()
    } catch (err) {
        res.status(401).send('Forbidden')
    }
}

export const authz = async (req,res,next) => {
    try{
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

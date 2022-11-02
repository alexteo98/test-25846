import jwt from 'jsonwebtoken'
const SECRET_KEY = "TEST_KEY"

const allowedRoles = [ "admin" ]

export const verifyAccess = async (acl,_token) => {
    try{
        console.log(SECRET_KEY)
        const valid = await verifyToken(_token)
        if (!valid) return false
        
        const res = jwt.decode(_token)
        const tokenRoles = res.role.split(',')
        
        const matchingRoles = tokenRoles.filter(i => acl.includes(i))

        return matchingRoles.length > 0;

    } catch (err){
        console.log(err)
        return false
    }
}

export const verifyToken = async _token => {
    //console.log("checkiong signature of " + _token)
    if (!_token || _token == ''){
        console.log('no token')
        return false
    }

    try{
        jwt.verify(_token,SECRET_KEY)
        return true

    } catch (err) {
        console.log(err)
        console.log('tampered token');
        return false
    }
}

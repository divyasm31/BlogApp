require('dotenv').config()
const jwt=require('jsonwebtoken')
function verifyToken(req,res,next){
    const bearerToken=req.headers.authorization
    // console.log(bearerToken)
    if(!bearerToken){
        return res.send({message:"Unauthorized access. Please login to continue"})
    }else{
        try{
            const token = bearerToken.split(' ')[1];
            // console.log(token)
             jwt.verify(token,process.env.SECRET_KEY)
             next()
        }catch(err){
            next(err)
        }
    }
}
module.exports=verifyToken
const jwt=require('jsonwebtoken')
require('dotenv').config()
const verifyToken=((req,res,next)=>{
    const bearerToken=req.headers.authorization
    if(!bearerToken){
        return res.send({message:"Unauthorized access. Please login to continue"})
    }else{
        const token=bearerToken.split(' ')[1];
        try{
            jwt.verify(token,process.env.SECRET_KEY)
            next()
        }catch(err){
            next(err)
        }
    }
})
module.exports=verifyToken
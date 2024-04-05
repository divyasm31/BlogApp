//create admin api app (mini express application)
const exp=require('express');
const adminApp=exp.Router();
const expressAsyncHandler = require('express-async-handler');
const jsonwebtoken=require('jsonwebtoken')
require('dotenv').config()
const bcryptjs=require('bcryptjs')
let adminCollection;
adminApp.use((req,res,next)=>{
    adminCollection=req.app.get('adminscollection')
    next();
})

adminApp.post('/login',expressAsyncHandler(async(req,res)=>{
    const admin=req.body
    // console.log(admin)
    const result=await adminCollection.findOne({username:admin.username})
    console.log(result)
    if(result===null){
        res.send({message:"admin not found"})
    }else{
        if(result.password!=admin.password){
            res.send({message:"invalid password"})
        }else{
            const hashedPassoword=await bcryptjs.hash(result.password,6)
            result.password=hashedPassoword
            const signedToken=jsonwebtoken.sign({username:result.username},process.env.SECRET_KEY,{expiresIn:45})
            res.send({message:"admin found",payload:result,token:signedToken})
        }
    }

}))

module.exports=adminApp;
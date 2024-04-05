//create user api app (mini express application)
const exp=require('express')
const userApp=exp.Router();
const bcryptjs=require('bcryptjs');
const expressAsyncHandler=require('express-async-handler')
require('dotenv').config();
 const jsonwebtoken=require('jsonwebtoken');
 const verifyToken=require('../Middlewares/verifyToken')
//get userscollectionapp
let userCollection;
//user registration route
userApp.use((req,res,next)=>{
    userCollection=req.app.get('userscollection')
    
    next();
})

userApp.post('/user',expressAsyncHandler(async(req,res)=>{
    //get user resource from client
    const user=req.body;
    const result=await userCollection.findOne({username:user.username});
    if(result===null){
        const hashedPassword=await bcryptjs.hash(user.password,6)
        user.password=hashedPassword;
        await userCollection.insertOne(user);
        res.send({message:"new user created",payload:user})
    }else{
        res.send({message:"user with this username already exists"})
    }
}))

userApp.post('/login',expressAsyncHandler(async(req,res)=>{
    //get user resource from client
    const user=req.body;
    const result=await userCollection.findOne({username:user.username});
    if(result===null){
        res.send({message:"username doesn't exist"})
    }else{
        const status=await bcryptjs.compare(user.password,result.password)
        if(status===true){
             const signedToken=jsonwebtoken.sign({username:user.username},process.env.SECRET_KEY,{expiresIn:30})
            res.send({message:"Login Successful",token:signedToken,user:result})
        }else{
            res.send({message:"Incorrect Password"})
        }
    }
}))

userApp.get('/articles',verifyToken,expressAsyncHandler(async(req,res)=>{
    const articleCollection=req.app.get('articlescollection')
    let articles = await articleCollection.find({ status: true }).toArray();
    if(articles==[]){
    // console.log(articles)
    res.send({message:"no articles found"})
    }else{
        res.send({message:"articles",payload:articles})
    }
}))

userApp.post('/comment/:artid',verifyToken,expressAsyncHandler(async(req,res)=>{
    const artid=req.params.artid
    const dataFromUser=req.body
    const articleCollection=req.app.get('articlescollection')
    let result=await articleCollection.findOne({articleId:artid})
    if(result===null){
        res.send({message:"article not found"})
    }else{
        await articleCollection.updateOne({articleId:artid},{$addToSet:{comments:dataFromUser}})
        res.send({message:"Comment Posted"})
    }
}))

module.exports=userApp;
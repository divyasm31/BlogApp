//create user author app (mini express application)
const exp=require('express')
const authorApp=exp.Router();
const bcryptjs=require('bcryptjs')
const expressAsyncHandler=require('express-async-handler')
const jsonwebtoken=require('jsonwebtoken')
const verifyToken=require('../Middlewares/verifyToken')
require('dotenv').config()
let articlesCollection;
let authorCollection;
authorApp.use((req,res,next)=>{
    articlesCollection=req.app.get('articlescollection')
    authorCollection=req.app.get('authorscollection')
    next()
})


authorApp.post('/author',expressAsyncHandler(async(req,res)=>{
    const user=req.body;
    const result=await authorCollection.findOne({username:user.username});
    if(result===null){
        const hashedPassword=await bcryptjs.hash(user.password,6)
        user.password=hashedPassword;
        await authorCollection.insertOne(user);
        res.send({message:"new author created",payload:user})
    }else{
        res.send({message:"Author with the above username already exists"})
    }
}))

authorApp.post('/login',expressAsyncHandler(async(req,res)=>{
    const user=req.body
    const result=await authorCollection.findOne({username:user.username})
    if(result===null){
        res.send({message:"username doesn't exist"})
    }else{
        const status=await bcryptjs.compare(user.password,result.password);
        if(status===false){
            res.send({message:"incorrect password"})
        }else{
            const signedToken=jsonwebtoken.sign({username:user.username},process.env.SECRET_KEY,{expiresIn:"1d"})
            // console.log(signedToken)
            res.send({message:"Login successful",token:signedToken,user:result})
        }
    }
}))

authorApp.post('/article',verifyToken,expressAsyncHandler(async(req,res)=>{
    const newArticle=req.body
    await articlesCollection.insertOne(newArticle);
    res.send({message:"new article created",payload:newArticle})
}))

authorApp.put('/article',verifyToken,expressAsyncHandler(async(req,res)=>{
    const newArticle=req.body
    let articles=await articlesCollection.findOne({articleId:newArticle.articleId})
     if(articles===null){
         res.send({message:"article not found"})
     }else{
        await articlesCollection.updateOne({articleId:newArticle.articleId},{$set:newArticle})
        let modifiedArticle = await articlesCollection.findOne({articleId:newArticle.articleId})
        res.send({message:"article updated successfully",payload:modifiedArticle})
     }
}))

//delete article
authorApp.put('/delete-article/:articleid',verifyToken,expressAsyncHandler(async(req,res)=>{
    // console.log('delete')
    const articleid=Number(req.params.articleid);
    const newArticle=req.body
    // console.log(newArticle)
    const result=await articlesCollection.findOne({articleId:articleid})
    // console.log(result)
    if(result===null){
        res.send({message:"article not found"})
    }else{
        // console.log(result)
        await articlesCollection.updateOne({articleId:articleid},{$set:{status:false}})
        // let modifiedArticle = await articlesCollection.findOne({articleId:newArticle.articleId})
        res.send({message:"article deleted"})
    }
}))

//restore article
authorApp.put('/restore-article/:articleid',verifyToken,expressAsyncHandler(async(req,res)=>{
    // console.log('restore')
    const articleid=Number(req.params.articleid);
    const newArticle=req.body
    // console.log(newArticle)
    const result=await articlesCollection.findOne({articleId:articleid})
    // console.log(result)
    if(result===null){
        res.send({message:"article not found"})
    }else{
        // console.log(result)
        await articlesCollection.updateOne({articleId:articleid},{$set:{status:true}})
        // let modifiedArticle = await articlesCollection.findOne({articleId:newArticle.articleId})
        res.send({message:"article restored"})
    }
}))

authorApp.get('/articles/:author',verifyToken,expressAsyncHandler(async(req,res)=>{
    // console.log("hi")
    const authorName=req.params.author
    const articles=await articlesCollection.find({username:authorName}).toArray()
    if(articles===null){
        res.send({message:"no articles written"})
    }else{
        res.send({message:"all articles",payload:articles})
        // console.log(payload)
    }
}))


module.exports=authorApp;
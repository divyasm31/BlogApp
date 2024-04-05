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
    const author=req.body;
    const result=await authorCollection.findOne({username:author.username});
    if(result===null){
        const hashedPassword=await bcryptjs.hash(author.password,6)
        author.password=hashedPassword;
        await authorCollection.insertOne(author);
        res.send({message:"new author created",payload:author})
    }else{
        res.send({message:"Author with the above username already exists"})
    }
}))

authorApp.post('/login',expressAsyncHandler(async(req,res)=>{
    const author=req.body
    const result=await authorCollection.findOne({username:author.username})
    if(result===null){
        res.send({message:"username doesn't exist"})
    }else{
        const status=await bcryptjs.compare(author.password,result.password);
        if(status===false){
            res.send({message:"incorrect password"})
        }else{
            const signedToken=jsonwebtoken.sign({username:author.username},process.env.SECRET_KEY,{expiresIn:45})
            res.send({message:"Login successful",token:signedToken,author:result})
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
        res.send({message:"article updated successfully"})
     }
}))

authorApp.put('/article/:articleid',verifyToken,expressAsyncHandler(async(req,res)=>{
    const articleid=req.params.articleid;
    const newArticle=req.body
    const result=await articlesCollection.findOne({articleId:articleid})
    if(result===null){
        res.send({message:"article not found"})
    }else{
        await articlesCollection.updateOne({articleId:articleid},{$set:{...newArticle,status:false}})
        res.send({message:"article deleted"})
    }
}))

authorApp.get('/articles/:author',verifyToken,expressAsyncHandler(async(req,res)=>{
    const authorName=req.params.author
    const articles=await articlesCollection.find({$and:[{username:authorName},{status:true}]}).toArray()
    if(articles===null){
        res.send({message:"no articles written"})
    }else{
        res.send({message:"all aricles",payload:articles})
    }
}))


module.exports=authorApp;
//import express module
const exp=require('express');
const app=exp();
// to hold the sensitive data and env variables
// install dotenv and import, config has process prop
require('dotenv').config();
//import path module
const path=require('path')
//deploy the react build in this server
app.use(exp.static(path.join(__dirname,'../client/frontend/build')))
//parse the body of request obj
app.use(exp.json());



//connect to database
const mongoClient=require('mongodb').MongoClient
mongoClient.connect(process.env.DB_URL)
.then(client=>{
    //get db obj
    const blogdb=client.db('blogdb')
    //get collection obj
    const userscollection=blogdb.collection('userscollection')   
    const articlescollection=blogdb.collection('articlescollection')
    const authorscollection=blogdb.collection('authorscollection')
    const adminscollection=blogdb.collection('adminscollection')
    //share collection obj with express app
    app.set('userscollection',userscollection)
    app.set('articlescollection',articlescollection)    
    app.set('authorscollection',authorscollection)
    app.set('adminscollection',adminscollection)
    //confirm the db connection
    console.log("DB connected successfully")

})
.catch(err=>console.log("error in db connection"))

const userApp=require('./APIs/user-api');
const adminApp=require('./APIs/admin-api');
const authorApp=require('./APIs/author-api');




//if path starts with user-api, send req to userApp
//similarly for other APIs 
app.use('/user-api',userApp);
app.use('/author-api',authorApp);
app.use('/admin-api',adminApp);

//refreshing of page
app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'../client/frontend/build/index.html'))
    //  next()
})
//express error handler
app.use((err,req,res,next)=>{
    res.send({message:"error",payload:err.message});
})

//assign port no.
const port=process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Web server running on port ${port}`);
});
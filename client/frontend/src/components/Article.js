import './art.css'
import React from 'react'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { TbEdit } from "react-icons/tb";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdDateRange } from "react-icons/md";
import { AiOutlineFieldTime } from "react-icons/ai";
import { TfiComments } from "react-icons/tfi";
import { FaTrashRestoreAlt } from "react-icons/fa";
import { TbEditOff } from "react-icons/tb";
import axios from 'axios';

function Article() {

  let { state } = useLocation();
  let navigate=useNavigate();
  let token=localStorage.getItem('token')
  let axiosWithToken = axios.create({
    headers:{Authorization:`Bearer ${token}`}
  })
  let [comment,setComment] = useState('')
  let [articleEditStatus,setArticleEditStatus] = useState(false)
  let { currentUser } = useSelector(state=>state.userAuthorLoginReducer)
  let {register,handleSubmit,formState:{errors}}=useForm();

  //convert ISO date to UTC date
  function toUTC(iso){
    let date = new Date(iso).getUTCDate();
    let day = new Date(iso).getUTCDay();
    let year = new Date(iso).getFullYear();
    return `${date}/${day}/${year}`;
  }

  //add comments
   let commentStatus;
  async function handleFormSubmit(commentObj){ 
      //  console.log(commentObj)
      commentObj.username = currentUser.username;
      let response = await axiosWithToken.post(`http://localhost:4000/user-api/comment/${state.articleId}`,commentObj);
       console.log(response)
      if(response.data.message==='Comment Posted'){
        setComment(response.data.message)
        // console.log(comment)
      }
       else if(response.data.message==='Empty comment cannot be posted'){
          commentStatus = response.data.message;
       }
      
  }
  //enable edit status
  function enableEditStatus(){
    setArticleEditStatus(true)
  }


  //disable edit status
  async function saveModifiedArticle(editedArticle){
    let modifiedArticle = {...state,...editedArticle}
    //change date of modification
    modifiedArticle.dateOfModification = new Date();
    //remove _id since it is created by mongodb
    delete modifiedArticle._id;
    // console.log(modifiedArticle)
    //make http put req to save modified article in db
    let response = await axiosWithToken.put(`http://localhost:4000/author-api/article`,modifiedArticle);
    if(response.data.message==='article updated successfully'){
      setArticleEditStatus(false)
      navigate(`/authorprofile/${modifiedArticle.username}/articles-by-author/article/${modifiedArticle.articleId}`,{state:response.data.payload})
    }
  }

  
  //delete the article
  async function deleteArticle(){
    // let deleteStatusChangedArticle = {...state};
    // deleteStatusChangedArticle.status = true;
    let article = {...state}
    let response = await axiosWithToken.put(`http://localhost:4000/author-api/delete-article/${state.articleId}`,article);
    // console.log(response.data)
    if(response.data.message==='article deleted'){
      // setArticleDeletedStatus(true)
      navigate(`/authorprofile/${currentUser.username}/articles-by-author`)
    }
    
  }
  let [blockEdit,setBlockEdit] = useState(false)
  function blockEditing(){
    setBlockEdit(true)
  }

  async function restoreArticle(){
    let article = {...state}
    let response = await axiosWithToken.put(`http://localhost:4000/author-api/restore-article/${state.articleId}`,article);
    if(response.data.message==='article restored'){
      // setArticleDeletedStatus(false)
      navigate(`/authorprofile/${currentUser.username}/articles-by-author`)
    }
  }

  return (
    <div className='parent'>
    <div className='container mx-auto m-4'>
      {
        (articleEditStatus===false)?<>
        <div className='artbox p-2'>
        {
          currentUser.userType==='author' && (
            <>
            {" "}
            <ul className='list-unstyled list-inline d-flex justify-content-end bg-transparent'>
              {
                (state.status===true)?<>
                {" "}
                <li className='list-inline-item bg-transparent'><button className='btn btn-transparent' onClick={enableEditStatus}><TbEdit className='bg-transparent' style={{fontSize:"4vh",color:"#78184a"}} /></button></li>
                  <li className='list-inline-item bg-transparent'><button className='btn btn-transparent' onClick={deleteArticle}><AiTwotoneDelete className='bg-transparent' style={{fontSize:"4vh",color:"#8c1c1c"}}/></button></li>
                </>:
                <>
                {" "}
                <li className='list-inline-item bg-transparent'><button className='btn btn-transparent' onClick={blockEditing}><TbEditOff style={{fontSize:"4vh",color:"#78184a"}} /></button></li>
                  <li className='list-inline-item bg-transparent'><button className='btn btn-transparent' onClick={restoreArticle}><FaTrashRestoreAlt style={{fontSize:"4vh",color:"#78184a"}} /></button></li>
                  { (blockEdit===true)&&<p className='text-danger pt-1 lead pr'>Article need to be restored to edit.</p>}
                </>
              }
            </ul>
            </>
          )
        }
      <div className='display-5 tit text-center mt-0 bg-transparent'>{state.title}<aside className='h6 mt-2 bg-transparent' style={{color:" #b7410e"}}>{state.category}  -by {state.username}</aside></div>
      <ul className='list-unstyled list-inline d-flex justify-content-between bg-transparent'>
            <li className='list-inline-item bg-transparent'><h6 className='bg-transparent ps-1'><span className='fw-bolder bg-transparent' style={{color:"#7a4112"}}><MdDateRange style={{fontSize:"4vh",color:"#7a4112",backgroundColor:"transparent"}} />Published on: </span>{toUTC(state.dateOfCreation)}</h6></li>
            <li className='list-inline-item bg-transparent'><h6 className='bg-transparent pe-1'><span className='fw-bolder bg-transparent' style={{color:"#7a4112"}}><AiOutlineFieldTime style={{fontSize:"4vh",color:"#7a4112",backgroundColor:"transparent"}} />Last Modified: </span>{toUTC(state.dateOfModification)}</h6></li>
      </ul>
      <p className='content bg-transparent ps-1 pe-1' style={{textAlign:"justify",whiteSpace:"pre-line"}}>{state.content}</p>
      <div className='card-body w-50'style={{backgroundColor:"#8b4513"}}>
        <h5 className='bg-transparent ms-2 text-center' style={{color:"#fffff0"}}>Comments</h5>
        {(state.comments.length===0)?(<p className='lead ps-4 pe-4 pt-1 pb-1 fs-2vh' style={{color:"#f4f0fb",backgroundColor:"#8b4513"}}>No Comments yet</p>):
          (state.comments.map((cmt,idx) =>{
            return(
              <p key={idx} className='lead ps-4 pe-4 pt-1 pb-1 fs-2vh' style={{color:"#f4f0fb",backgroundColor:"#8b4513",alignContent:"start"}}><TfiComments className='pt-0 bg-transparent' style={{color:"#f4f0fb",fontSize:"2vh"}} /> {cmt.comments}  - {cmt.username}</p>
            )
        }))
        }
      </div>
      {
        currentUser.userType==='user' &&(
          <>
          {" "}
          <form className='bg-transparent'  onSubmit={handleSubmit(handleFormSubmit)}>
          <input type='text mt-2' className='border-dark bg-transparent form-control w-100' id='comment' placeholder='Write comment...' {...register('comments')}/>
          <button className='btn p-2 m-2 border-light shadow-light d-block mx-auto' style={{backgroundColor:"#b33d3f",color:"ivory"}}>Add Comment</button>
          {
            (commentStatus==='Empty comment cannot be posted') && <p className='text-danger text-center fw-bolder'>{commentStatus}</p>
          }
          </form>
          </>
        )
      }
        </div>
        </> : 
        <div className='card mt-4 mb-5 mx-auto'style={{maxWidth:"600px"}}>
        <div className='card-header ch'>
            <input type='text' className='form-control mb-2 mt-2' placeholder='Title of article' {...register('title',{required:true})} defaultValue={state.title} />
        </div>
        <div className='card-body'>
            <input type='text' className='form-control mb-2 mt-2' placeholder='Category' {...register('category',{required:true})} defaultValue={state.category} />
            <div className=' mb-2 w-100'>
            <textarea type='text' className='form-control' style={{height:"50vh"}} placeholder='Content' {...register('content',{required:true})} defaultValue={state.content} />
            </div>
        </div>
        <div className='card-footer'>
            <button className='btn btn-success mx-auto d-flex' type='submit' onClick={handleSubmit(saveModifiedArticle)} >Save</button>
        </div>
      </div>
      }
      
    </div>
    </div>
  )
}

export default Article

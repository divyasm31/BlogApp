import './art.css'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
function AddArticle() {

  let navigate = useNavigate();
    let {register,handleSubmit,formState:{errors}}=useForm();
    let { currentUser } =  useSelector(state=>state.userAuthorLoginReducer)
    let [err,setErr] = useState('');
    async function handleOnPublish(article){
      article.dateOfCreation = new Date();
      article.dateOfModification = new Date();
      article.articleId = Date.now();
      article.username = currentUser.username;
      article.comments = [];
      article.status = true;
      const tokn = localStorage.getItem('token');
      const axiosWithToken = axios.create({
        headers:{Authorization:`Bearer ${tokn}`}
      })
      //http post article
      let response = await axiosWithToken.post('http://localhost:4000/author-api/article',article)
      // console.log(response)
      if(response.data.message==='new article created'){
        navigate(`/authorprofile/${currentUser.username}/articles-by-author`)
      }else{
        setErr(response.data.message);
      }
      // console.log(article)
    };

  return (
    <div className='parent'>
      <div className='card mt-4 mb-5 mx-auto'style={{maxWidth:"600px"}}>
        <div className='card-header ch'>
            <input type='text' className='form-control mb-2 mt-2' placeholder='Title of article' {...register('title',{required:true})} />
            {
                  
                  errors.title?.type==='required'&& <p className='mt-1 bg-transparent text-lead text-danger text-center'>This field is required</p>
              }
        </div>
        <div className='card-body'>
            <input type='text' className='form-control mb-2 mt-2' placeholder='Category' {...register('category',{required:true})}  />
            {
                  
                  errors.category?.type==='required'&& <p className='mt-1 bg-transparent text-lead text-danger text-center'>This field is required</p>
              }
            <div className=' mb-2 w-100'>
            <textarea type='text' className='form-control' style={{height:"50vh"}} placeholder='Content' {...register('content',{required:true})}  />
            </div>
            {
                  
                  errors.content?.type==='required'&& <p className='mt-1 bg-transparent text-lead text-danger text-center'>This field is required</p>
              }
        </div>
        <div className='card-footer'>
            <button className='btn btn-success mx-auto d-flex' type='submit'onClick={handleSubmit(handleOnPublish)}>Publish</button>
        </div>
      </div>
    </div>
  )
}

export default AddArticle

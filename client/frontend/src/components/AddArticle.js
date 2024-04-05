import React from 'react'
import {useForm} from 'react-hook-form'
function AddArticle() {

    let {register,handleSubmit,formState:{errors}}=useForm();

    function handleOnPublish(authorObj){
        console.log(authorObj)
    }

  return (
    <div>
      <div className='card mt-5 mx-auto'style={{maxWidth:"600px"}}>
        <div className='card-header'>
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
            <input type='text' className='form-control mb-2' placeholder='Content' {...register('content',{required:true})}  />
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

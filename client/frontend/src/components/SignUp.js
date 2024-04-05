import './signin.css'
import React from 'react'
// import Header from './Header'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useState} from 'react'
import {useForm} from 'react-hook-form'

function SignUp() {

    let navigate=useNavigate();

    let[error,setError]=useState('')
  let {register,handleSubmit,formState:{errors}}=useForm();
  async function handleFormSubmit(userObj){
    // console.log(userObj)

    if(userObj.userType==='user'){
      let resUser=await axios.post('http://localhost:4000/user-api/user',userObj)
      if(resUser.data.message==='new user created'){
        //navigate to login component
        navigate('/signin')
        
      }
      else{
        setError(resUser.data.message)
      }
    }else{
         let resAuthor=await axios.post('http://localhost:4000/author-api/author',userObj)
      if(resAuthor.data.message==='new author created'){
        navigate('/signin')
      }else{
        setError(resAuthor.data.message)
      }
    }
  }

return (
  <div>
    {/* <Header /> */}
      <h1 className='display-5 text-center mt-4 p-2'>Sign Up</h1>
      {error.length!=0 && <p className='text-danger text-center fs-2'>{error}</p>}
      <form className='form form-group mx-auto w-50 mt-4 p-5'onSubmit={handleSubmit(handleFormSubmit)}>
          <div className='box d-flex justify-content-center'>
          <div className='box form-check form-check-inline'>
              <input type='radio' className='form-check-input' id='author' value='author'{...register('userType')} />
              <label htmlFor='author' className='box form-control-label'>Author</label>
          </div>
          <div className='box form-check form-check-inline'>
              <input type='radio' className='form-check-input' id='user'  value='user'{...register('userType')}/>
              
              <label htmlFor='user' className='box form-control-label' >User</label>
          </div>
          </div>
          <div className='box mt-4'>
              <input type='text' id='username' className='brole form-control w-50' placeholder='Username' {...register('username',{required:true})}/>
              {
                  
                  errors.username?.type==='required'&& <p className='mt-1 bg-transparent text-lead text-muted text-center'>This field is required</p>
              }
              {/* {
                errors.username?.type==='minLength'&&<p className='mt-1 bg-transparent text-lead text-muted text-center'>Min length is required</p>
              } */}
          </div>
          <div className='box mt-4'>
              <input type='password' id='password' className='brole form-control w-50' placeholder='Password' {...register('password',{required:true})}/>
              {
                 
                  errors.password?.type==='required'&& <p className='mt-1 bg-transparent text-lead text-muted text-center'>This field is required</p>
              }
              {/* {
                errors.password?.type==='minLength'&&<p className='mt-1 bg-transparent text-lead text-muted text-center'>Min length is required</p>
              } */}
          </div>
          <div className='box mt-4'>
              <input type='email' id='email' className='brole form-control w-50' placeholder='Email' {...register('email',{required:true})}/>
              {
                  
                  errors.email?.type==='required'&& <p className='mt-1 text-lead text-muted text-center bg-transparent '>This field is required</p>
              }
          </div>
          <button type='submit' className='btns text-center p-2 mt-5 mx-auto d-block border border-none'>Register</button>
      </form>
  </div>
)
}

export default SignUp

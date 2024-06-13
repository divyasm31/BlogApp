import './signin.css'
import { useEffect,useState } from 'react'
 import Header from './Header';
import {useForm} from 'react-hook-form'
import { userAuthorLoginThunk } from '../redux/slices/userAuthorSlice';
import { useDispatch,useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import Footer from './Footer';
function SignInForm() {
    let navigate=useNavigate();

    let {register,handleSubmit,formState:{errors}}=useForm();
    let {loginUserStatus,errorOccurred,errMessage,currentUser}=useSelector(state=>state.userAuthorLoginReducer)
    let dispatch=useDispatch()
    function handleFormSubmit(userObj){
        // console.log(userObj);
        dispatch(userAuthorLoginThunk(userObj))
    }
    useEffect(()=>{
        if(loginUserStatus===true){
            if(currentUser.userType==='author'){
                navigate(`/authorprofile/${currentUser.username}`)
            }
            else if(currentUser.userType==='user'){
                navigate(`/userprofile/${currentUser.username}`)
            }
            else if(currentUser.userType==='admin'){
                navigate(`/adminprofile/${currentUser.username}`)
            } 
        
        }
    },[loginUserStatus])
    
    


  return (
    
    <div className='main'>
        <Header />     
      <h1 className='display-5 text-center mt-5 p-2'>Sign In</h1>
        <form className='form rounded form-group mx-auto w-50 m-5 p-5' style={{marginBottom:"30px"}} onSubmit={handleSubmit(handleFormSubmit)}>
            {
                    (errorOccurred===true) && <p className='lead fw-bolder text-light text-center bg-transparent'>{errMessage}</p>
            }
            <div className='box d-flex justify-content-center'>
            <div className='box form-check form-check-inline'>
                <input type='radio' className='form-check-input'  value='author'{...register('userType')}/>
                
                <label htmlFor='author' className='box form-control-label'>Author</label>
            </div>
            <div className='box form-check form-check-inline'>
                <input type='radio' className='form-check-input'   value='user' {...register('userType')}/>
               
                <label htmlFor='user' className='box form-control-label' >User</label>
            </div>
            <div className='box form-check form-check-inline'>
                <input type='radio' className='form-check-input' value='admin' {...register('userType')} />
                
                <label htmlFor='admin' className='box form-control-label'>Admin</label>
            </div>
            </div>
            <div className='box mt-4'>
                <input type='text' id='username' className='brole form-control w-50' placeholder='Username' name='username'{...register('username',{required:true})}/>
                {
                    
                    errors.username?.type==='required'&& <p className=' bg-transparent mt-1 text-lead text-muted text-center'>This field is required</p>
                }
            </div>
            <div className='box mt-4'>
                <input type='password' id='password' className='brole form-control w-50' placeholder='Password'name='password' {...register('password',{required:true})}/>
                {
                    
                    errors.password?.type==='required'&& <p className=' bg-transparent mt-1 text-lead text-muted text-center'>This field is required</p>
                }
            </div>
            <button type='submit' className='btns text-center p-2 mt-5 mx-auto d-block border border-none'>Login</button>
            
        </form>
        <Footer />
    </div>
  )
}

export default SignInForm

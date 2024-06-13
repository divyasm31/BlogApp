import './art.css'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { MdDateRange } from "react-icons/md";
import { AiOutlineFieldTime } from "react-icons/ai";
import { TfiComments } from "react-icons/tfi";


function AdminArticles() {

    let { state } = useLocation();
    function toUTC(iso){
      let date = new Date(iso).getUTCDate();
      let day = new Date(iso).getUTCDay()+1;
      let year = new Date(iso).getUTCFullYear();
      return `${date}/${day}/${year}`
    }

  return (
    <div className='parent'>
    <div className='container mx-auto m-4'>
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
     </div>
     </div>
  )
}

export default AdminArticles

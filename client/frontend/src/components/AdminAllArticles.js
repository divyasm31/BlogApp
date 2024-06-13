import React from 'react'
import './artcards.css'
import { useState,useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
function AdminAllArticles() {


  let [articlesList,setArticlesList] = useState([]);
  let navigate = useNavigate();

  let {currentUser} = useSelector(state=>state.userAuthorLoginReducer)

  function toUTC(iso){
    let date = new Date(iso).getUTCDate();
    let day = new Date(iso).getUTCDay()+1;
    let year = new Date(iso).getUTCFullYear();
    return `${date}/${day}/${year}`
  }

    let token=localStorage.getItem('token');
    let axiosWithToken = axios.create({
    headers:{Authorization:`Bearer ${token}`}
  })
  async function displayArticles(){
    // console.log("display")
    let response = await axiosWithToken.get('http://localhost:4000/admin-api/articles');
    // console.log(response)
    if(response.data.message==='all articles'){
      setArticlesList(response.data.payload)
    }
  }
  useEffect(()=>{
    displayArticles();
  },[])
  function readArticle(articleObj){
    // console.log(articleObj)
    navigate(`/adminprofile/${currentUser.username}/article/:articleid`,{state:articleObj});
  }


  return (
    <div>
      <div className='parent'>
      <div className='ct container mx-auto mb-4 mt-1 pt-1'>
      <div className='rw row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 mt-2 d-flex justify-content-evenly'>
        {
          articlesList.map((article) =>  
          <div key={article.articleId} className='col'>
              <div className=' card movingcard h-100'>
                <div className='card-body'>
                  <h2 className='card-title'>{article.title}</h2>
                  <p className='lead author text-center'>-by {article.username}</p>
                  <p className='card-text'>{(article.content.substring(0,80))+'......'}</p>
                  <button className='btn read m-1' onClick={()=>readArticle(article)}>Read More</button>
                </div>
                <div className='card-footer'>Last modified: {toUTC(article.dateOfModification)}</div>
              </div>
            </div>
            
          )
        }
      </div>
      </div>
    </div>
    </div>
  )
}

export default AdminAllArticles;

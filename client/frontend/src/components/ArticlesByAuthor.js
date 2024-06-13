import './artcards.css'
import React from 'react'
// import axios from 'axios'
import { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { axiosWithToken } from '../axiosWithServer'
import axios from "axios";

function ArticlesByAuthor() {

  const [ articlesList, setArticlesList ] = useState([])
   let navigate = useNavigate()
  let { currentUser } = useSelector(state=>state.userAuthorLoginReducer);

    function toUTC(iso){
      let date = new Date(iso).getUTCDate();
      let day = new Date(iso).getUTCDay();
      let year = new Date(iso).getUTCFullYear();
      return `${date}/${day}/${year}`
    }
    const token=localStorage.getItem('token')
    // console.log(token)
    let axiosWithToken = axios.create({
    headers:{Authorization:`Bearer ${token}`}
})

  const getArticlesOfAuthor= async()=>{
    let response = await axiosWithToken.get(`http://localhost:4000/author-api/articles/${currentUser.username}`)
    // console.log(response)
    if(response.data.message==='all articles'){
      setArticlesList(response.data.payload)
      //  console.log(articlesList)
    }
  };
  useEffect(()=>{
    getArticlesOfAuthor();
  },[])


  function readArticle(articleObj){
    navigate(`/authorprofile/${currentUser.username}/articles-by-author/article/${articleObj.articleId}`,{state:articleObj});
  }


  return (
    <div className='parent'>
      {/* <div className='text-center mt-2'>
        <h1 className='display-6 text-warning'>articles</h1>
      </div> */}
      <div className='ct container mx-auto mb-4'>
      <div className='rw row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 mt-2 d-flex justify-content-evenly'>
        {
          articlesList.map((article) => (
            <div key={article.articleId} className='col'>
              <div className='card movingcard h-100'>
                <div className='card-body'>
                  <h2 className='card-title'>{article.title}</h2>
                  <p className='card-text'>{(article.content.substring(0,80))+'......'}</p>
                  <button className='btn read m-1' onClick={()=>readArticle(article)}>Read More</button>
                </div>
                <div className='card-footer'>Last modified: {toUTC(article.dateOfModification)}</div>
              </div>
            </div>
          ))
        }
      </div>
      </div>
    </div>
  )
}

export default ArticlesByAuthor

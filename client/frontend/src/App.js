import { createBrowserRouter,Navigate,RouterProvider } from 'react-router-dom';
import './App.css';
import { AiOutlineLoading } from "react-icons/ai";
import Home from './components/Home';
import SignUp from './components/SignUp';
import AuthorProfile from './components/AuthorProfile';
// import AddArticle from './components/AddArticle';
import ArticlesByAuthor from './components/ArticlesByAuthor';
import SignInForm from './components/SignInForm';
import UserProfile from './components/UserProfile';
import AdminProfile from './components/AdminProfile';
import ErrorElement from './components/ErrorElement';
import Article from './components/Article';
import Articles from './components/Articles';
import RootLayout from './components/RootLayout';
import AdminArticles from './components/AdminArticles';
import AdminAllArticles from './components/AdminAllArticles';
import { Suspense } from 'react';
import { lazy } from 'react';
import { useSelector } from 'react-redux';

const AddArticle = lazy(()=>import('./components/AddArticle'))


function App() {


  let {currentUser} = useSelector(state=>state.userAuthorLoginReducer)

  let router=createBrowserRouter([
    {
      path:'',
      element:<RootLayout />,
      errorElement:<ErrorElement />,
      children:[

        {
          path:'',
          element: <Home />,
        },
        {
           path:'/signin',
           element:<SignInForm />,
        },
        {
              path:'/signup',
              element:<SignUp />
        }, 
        {
          path:`/authorprofile/${currentUser.username}`,
          element:<AuthorProfile />,
          children:[
                {
                  path:'',
                  element:<Navigate to={`/authorprofile/${currentUser.username}/articles-by-author`}/>
                },
                {
                  path:`/authorprofile/${currentUser.username}/addarticle`,
                  element:<Suspense fallback={<AiOutlineLoading className='loading' />}><AddArticle /></Suspense>
                },
                {
                  path:`/authorprofile/${currentUser.username}/articles-by-author`,
                  element:<ArticlesByAuthor />
                },
                {
                  path:`/authorprofile/${currentUser.username}/articles-by-author/article/:articleid`,
                  element:<Article />
                }
                
              ]
         },
         {
          path:`/userprofile/${currentUser.username}`,
          element:<UserProfile />,
          children:[
            {
              path:'',
              element:<Navigate to={`/userprofile/${currentUser.username}/articles`}/>
            },
            {
              path:`/userprofile/${currentUser.username}articles`,
              element:<Articles />
            },
            {
              path:`/userprofile/${currentUser.username}/article/:articleid`,
              element:<Article />
            },
          ]
         },
         {
          path:`/adminprofile/${currentUser.username}`,
          element:<AdminProfile />,
          children:[
            {
              path:'',
              element: <Navigate to={`/adminprofile/${currentUser.username}/articles`}/>
            },
            {
              path:`/adminprofile/${currentUser.username}/articles`,
              element:<AdminAllArticles />
            },
            {
              path:`/adminprofile/${currentUser.username}/article/:articleid`,
              element:<AdminArticles />
            }
          ]
         },

      ]
    }
  ])





  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import './App.css';
import RootLayout from './components/RootLayout';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import AuthorProfile from './components/AuthorProfile';
import AddArticle from './components/AddArticle';
import Articles from './components/Articles';
import APBody from './components/APBody';
import SignInForm from './components/SignInForm';

function App() {

  let router=createBrowserRouter([
    {
      path:'',
      element: <RootLayout />,
      children:[
        {
          path:'',
          element: <Home />
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
          path:'/authorprofile',
          element:<AuthorProfile />,
          children:[
                {
                  path:'authorprofile/addarticle',
                  element:<AddArticle />
                },
                {
                  path:'authorprofile/articles',
                  element:<Articles />
                }
                
              ]
        }  
      ]
    },
    
    
  ])





  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

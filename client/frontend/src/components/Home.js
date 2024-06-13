import './home.css'
import React from 'react'
import hlogo from '../assets/blog.png'
import Header from './Header'
import Footer from './Footer'

function Home() {
  return (
    <div className='main '>
      <Header />
      {/* <div className='display-1 bg-dark text-info text-center'>Home</div> */}
        <img src={hlogo} className='img-fluid img-thumbnail i rounded mx-auto d-block' />
        <div className='container mx-auto text-center w-75' style={{marginBottom:"15px"}}>
          <p className='lead mt-0 para'>
           This blog application is designed to help you create, manage, and share your content with the world. Whether you're a seasoned blogger, a business owner, or just starting out, we provide all the tools you need to build a stunning and engaging blog.
           Add comments to your favourite blogs &#9829;<br />
           Our platform is designed for both beginners and advanced users. With our simple setup process and intuitive interface, you can start blogging in minutes.
           Discover the joy of blogging. Whether you want to share your personal stories, showcase your expertise, or grow your business, our platform has everything you need to succeed. Sign up now and take the first step towards creating a blog that stands out!
          </p>
        </div>
      <Footer />
    </div>
  )
}

export default Home

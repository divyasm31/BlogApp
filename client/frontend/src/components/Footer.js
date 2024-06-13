import React from 'react'
import './footer.css'

function Footer() {
  return (
    <footer className="section bg-footer">
      <div className="container c">
        <div className="row c">
          <div className="col-lg-3 c">
            <div className="d">
              <h6 className="footer-heading text-uppercase text-white">
                Information
              </h6>
              <ul className="list-unstyled footer-link mt-4 c">
                <li className='l'>
                  <a href="#">Pages</a>
                </li>
                <li className='l'>
                  <a href="#">Our Team</a>
                </li>
                <li className='l'>
                  <a href="#">Feuchers</a>
                </li>
                <li className='l'>
                  <a href="#">Pricing</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-3 c ">
            <div className="d">
              <h6 className="footer-heading text-uppercase text-white">
                Resources
              </h6>
              <ul className="list-unstyled footer-link mt-4 c">
                <li className='l'>
                  <a href="#">Wikipedia </a>
                </li>
                <li className='l'>
                  <a href="#">React blog</a>
                </li>
                <li className='l'>
                  <a href="#">Term &amp; Service</a>
                </li>
                <li className='l'>
                  <a href="#">Angular dev</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-2 c">
            <div className="d">
              <h6 className="footer-heading text-uppercase">Help</h6>
              <ul className="list-unstyled footer-link mt-4 c">
                <li className='l'>
                  <a href="#">Sign Up </a>
                </li>
                <li className='l'>
                  <a href="#">Login</a>
                </li>
                <li className='l'>
                  <a href="#">Terms of Services</a>
                </li>
                <li className='l'>
                  <a href="#">Privacy Policy</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-4 c ">
            <div className="d">
              <h6 className="footer-heading text-uppercase">
                Contact Us
              </h6>
              <p className="pfoot contact-info mt-4">
                Contact us if need help with anything - <span className='l fst-italic' style={{color:"midnightblue",
                fontSize:" 14px"}}>+91 9999999999</span>
              </p>
              <p className='pfoot footer ft-2 text-lead'>Happy Blogging &#9829;</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-5">
        <p className="pfoot footer-alt mb-0 f-14">2024 © VNR, All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
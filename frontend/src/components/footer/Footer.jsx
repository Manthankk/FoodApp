import React from 'react'
import { assets } from '../../assets/assets'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="fotter-content-left">
              <img src={assets.logo} alt="" />
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, quia!</p>
              <div className="fotter-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
              </div>
            </div>
            <div className="fotter-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
                

          </div>
            <div className="fotter-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91 9607835610</li>
                    <li>contac@manthan.com</li>
                </ul>

            </div>

        </div>
        <hr />
        <div className="footer-copyright">
            <p>�� 2023 OrderFavourite. All rights reserved.</p>
            </div>
    
        
    </div>
  )
}

export default Footer
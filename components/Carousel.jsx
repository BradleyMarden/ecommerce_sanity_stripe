
import Link from 'next/link';
import { urlFor } from '../lib/client';
import logo from '../public/assets/logo.png'
import Image from "next/image";
import {Product} from "./index";
import React, { Component } from 'react'; 
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel'; 
const ImageCarousel = ({ heroBanner }) => {
  return (
      <div className="image-carousel-container">
        <div className="image-carousel"> 
            <Carousel infiniteLoop={true} emulateTouch={true}stopOnHover={false} autoFocus={true}autoPlay={true} transitionTime={1000} showStatus={false} showArrows={true} showThumbs={false} dynamicHeight={true}className="carousel-style"> 
                <div>
                    <img src="/assets/edit.png" alt="image1" className='carousel-item'/> 
                </div> 
                <div> 
                    <img src="/assets/edit2.png" alt="image2" className='carousel-item'/> 
                </div> 
            </Carousel> 
        </div>
      </div>
          
      
  )
}

export default ImageCarousel

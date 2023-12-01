import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';
import logo from '../public/assets/logo.png'
import Image from "next/image";
import {Product} from "./index";
const HeroBanner = ({ heroBanner }) => {
  return (
      <div className="hero-banner-container">
          <div className="hero-banner-image">
            <Image src={logo} alt="logo"  />
          </div>
          <div className="banner-container">
              <div className="marquee">
                  <div className="banner-container-scroll- banner-scroll">
                    <h2> CHIRSTMAS SALE! Use code CHR10 for 10% all purchases</h2>
                  </div>
                  <div className="banner-container-scroll- banner-scroll1">
                      <h2> CHIRSTMAS SALE! Use code CHR10 for 10% all purchases</h2>
                  </div>
                  {/*<div className="banner-container-scroll- banner-scroll2">*/}
                  {/*    <h2> CHIRSTMAS SALE! Use code CHR10 for 10% all purchases</h2>*/}
                  {/*</div>*/}
              </div>
          </div>
      </div>
      
    // <div className="hero-banner-container">
    //   <div>
    //     <p className="beats-solo">{heroBanner.smallText}</p>
    //     <h3>{heroBanner.midText}</h3>
    //     <h1>{heroBanner.largeText1}</h1>
    //     <img src={urlFor(heroBanner.image)} alt="headphones" className="hero-banner-image" />
    //
    //     <div>
    //       <Link href={`/product/${heroBanner.product}`}>
    //         <button type="button">{heroBanner.buttonText}</button>
    //       </Link>
    //       <div className="desc">
    //         <h5>Description</h5>
    //         <p>{heroBanner.desc}</p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}

export default HeroBanner
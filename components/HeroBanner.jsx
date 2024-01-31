import React, {useState,useEffect, useRef} from 'react';
import logo from '../public/assets/logo.png'
import Image from "next/image";
import {Cart, Product, NavbarOffScreen} from "./index";
import {useStateContext} from "../context/StateContext";
import {
    AiOutlineAlignCenter,
    AiOutlineDoubleRight, AiOutlineMenu,
    AiOutlineOrderedList,
    AiOutlineShopping,
    AiOutlineUnorderedList
} from "react-icons/ai";
import { useRouter } from "next/router";
import {client} from "../lib/client";
import cook from "js-cookie";
const HeroBanner = ({ heroBanner, products, cart }) => {

    const { setCart,showCart,showMenu, setShowMenu, setShowCart, totalQuantities, cartItemsload,setPurchaseComplete} = useStateContext();
    let isMobile = undefined;
    let router = undefined
    console.log(cart)
    let it = cook.get('cartItems')
    let itemsss
    if (it)
        itemsss= JSON.parse(it)
        
    if(!cartItemsload) {
        console.log("itemsss")
        console.log(itemsss)
        if(itemsss && itemsss.length >=1) {
            setCart(itemsss)
        }
        setPurchaseComplete(false)
    }
    
    if (typeof window !== "undefined") {
        isMobile = window.matchMedia("(max-width: 600px)").matches;
        console.log("isMobile: " + isMobile)
        router = useRouter();
    }
    const myRef = useRef();
    
    useEffect(() =>{

        const observer = new IntersectionObserver(([e]) => 
            {
                e.target.classList.toggle('isSticky', e.intersectionRatio < 1)
            },
            {threshold: [1]} );

        observer.observe(myRef.current)
    },[])
   

    const onClick = async (url) => {
        if(router)
            await router.push(`/${url}`);
    }
    var nav;
    if(isMobile){
        nav = <div className="buttonContainer">
            <button type="button" className="closeButton" onClick={() => setShowMenu(true)}>
                <AiOutlineMenu className="headerButtonText"/>
            </button>
        </div>;
    }
    else{
        nav = <div className="buttonContainer">
            <button type="button" className="headerButton" onClick={() => onClick("")}>
                <p className="headerButtonText" style={{fontWeight:"bold"}}>Home</p>
            </button>
            <button type="button" className="headerButton" onClick={() => onClick("filters/men")}>
                <p className="headerButtonText">Men</p>
            </button>
            <button type="button" className="headerButton" onClick={() => onClick("filters/women")}>
                <p className="headerButtonText">Women</p>
            </button>
            <button type="button" className="headerButton" onClick={() => onClick("filters/kids")}>
                <p className="headerButtonText">Kids</p>
            </button>
            <button type="button" className="headerButton" onClick={() => onClick("filters/merch")}>
                <p className="headerButtonText">Merch</p>
            </button>
            <button type="button" className="headerButton" onClick={() => onClick("filters/sale")}>
                <p className="headerButtonTextSale">Sale</p>
            </button>
        </div>;
    }
  return (
      <div ref={myRef} className="hero-banner-container">
          <div className="hero-banner-container-fore">
              <div  className="hero-banner-image">
                <Image src={logo} alt="logo"  />
              </div>
              
              <div className="cartCont">
                  <div className="cont-r">
                      <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
                          <AiOutlineShopping />
                          <span className="cart-item-qty">{totalQuantities}</span>
                      </button>
                  </div>
                  {showCart && <Cart />}
                  {showMenu && <NavbarOffScreen />}
              </div>
              {nav}
          </div>
          
          {/*<div className="banner-container">*/}
          {/*    <div className="marquee">*/}
          {/*        <div className="banner-container-scroll- banner-scroll">*/}
          {/*          <h2> CHIRSTMAS SALE! Use code CHR10 for 10% off all purchases</h2>*/}
          {/*        </div>*/}
          {/*        <div className="banner-container-scroll- banner-scroll1">*/}
          {/*            <h2> CHIRSTMAS SALE! Use code CHR10 for 10% off all purchases</h2>*/}
          {/*        </div>*/}
          {/*        <div className="banner-container-scroll- banner-scroll2">*/}
          {/*            <h2> CHIRSTMAS SALE! Use code CHR10 for 10% off all purchases</h2>*/}
          {/*        </div>*/}
          {/*    </div>*/}
          {/*</div>*/}
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
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {BsBagCheckFill, BsBagXFill} from 'react-icons/bs';

import { useStateContext } from '../context/StateContext';
import { runFireworks } from '../lib/utils';
import { client, urlFor } from '../lib/client';

const Cancel = () => {
  const {setCartItems, setTotalPrice, setTotalQuantities,setCartItemsLoad,setPurchaseComplete} = useStateContext();
  console.log("HERE")
  setCartItemsLoad(false)
  setPurchaseComplete(false)
  
  // useEffect(() => {
  //   )
  //  
  // }, []);
  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon" style={{color: "red"}}>
          <BsBagXFill/>
        </p>
        <h2>Failed to process order.</h2>
        <p className="email-msg">$h17, somthing went wrong... Please try again. if further issues persis please contact us</p>
        <p className="description">
          If further issues persis please email us at
          <a className="email" href="mailto:order@example.com">
            order@example.com
          </a>
        </p>
        <Link href="/">
          <button type="button" width="300px" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Cancel
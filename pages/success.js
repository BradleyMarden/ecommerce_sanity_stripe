import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';

import { useStateContext } from '../context/StateContext';
import { runFireworks } from '../lib/utils';
import cook from "js-cookie";
import {client} from "../lib/client";
import {Product} from "../components";

const Success = ({products}) => {
  const {setCartItems, setTotalPrice, setTotalQuantities, setPurchaseComplete, cartItems} = useStateContext();
  useEffect(() => {
    let items = []
    let cartJson = cook.get('cartItems')
    if (cartJson)
      items= JSON.parse(cartJson)
    let ids =[]
    let quantity =[]
    items?.map((product) => {
      console.log("Id " + product._id + "Quan: " + product.quantity)
      
      ids.push(product._id)
      quantity.push(product.quantity)
    })
    
    let ind = 0;
    
    ids.forEach((id) =>{
      console.log("Pushing" + id)
      client.patch(id).dec({quantity: quantity[ind]}).commit()
      ind++
    })
    
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    setPurchaseComplete(false)
    runFireworks();
    cook.remove('cartItems')
  }, []);

  
  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for the receipt.</p>
        <p className="description">
          If you have any questions, please email
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

export const getServerSideProps = async ({req, res}) => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  return {
    props: { products}
  }
}

export default Success
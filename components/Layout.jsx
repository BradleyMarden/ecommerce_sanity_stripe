import React,{ useState } from 'react';
import Head from 'next/head';

import Navbar from './Navbar';
import Footer from './Footer';
import {getCookie, hasCookie} from "cookies-next";
import {useStateContext} from "../context/StateContext";

const Layout = ({ children}) => {
    const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();
    // if(hasCookie('cartItems')) {
    //     let cache = getCookie('cartItems')
    //     console.log( JSON.parse(cache))
    //     let a = JSON.parse(cache)
    //     console.log(a.length)
    //     if (a) {
    //         for (let i = 0; i<= a.length; i++)
    //             onAdd(a[i],1)
    //     }
    // }
  return (
    <div className="layout">
      <Head>
        <title>Slo Rides</title>
      </Head>
      <main className="main-container">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}
export default Layout
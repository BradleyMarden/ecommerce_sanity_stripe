import React, {useEffect, useRef} from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai'
import logo from './../public/assets/logo.webp'
import { Cart } from './';
import { useStateContext} from '../context/StateContext';
import a from '../lib/script';

const Navbar = () => {
    const { showCart, setShowCart, totalQuantities } = useStateContext();

    const myRef = useRef();
    useEffect(() =>{

        const observer = new IntersectionObserver(([e]) => e.target.classList.toggle('isSticky', e.intersectionRatio < 1),
            {threshold: [1]} );

        observer.observe(myRef.current)
    },[])
    return (

        <div  ref={myRef} className="navbar-container-bg">
            <div  className="navbar-container">
                <div className="cont">
                </div>
                <div className="cont-r">
                    <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
                        <AiOutlineShopping />
                        <span className="cart-item-qty">{totalQuantities}</span>
                    </button>
                </div>
                {showCart && <Cart />}
            </div>
        </div>
    )
}

export default Navbar
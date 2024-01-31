import React, { useRef } from 'react';
import Link from 'next/link';
import {
    AiOutlineMinus,
    AiOutlinePlus,
    AiOutlineLeft,
    AiOutlineShopping,
    AiOutlineMenu,
    AiOutlineCloseCircle
} from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';

import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import getStripe from '../lib/getStripe';

const NavbarOffScreen = () => {
    const cartRef = useRef();
    const { showMenu, setShowMenu,totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuanitity, onRemove } = useStateContext();
    var cc = "tops"
    return (
        <div className="menu-wrapper" ref={cartRef}>
            <div className="menu-container">
                <button type="button" className="closeButton" onClick={() =>
                    setShowMenu(false)
                }>
                    <AiOutlineCloseCircle className="headerButtonText"/>
                </button>
                <div className="buttonContainerMenu">
                    <Link href="/">
                        <p className="headerButtonText" style={{fontWeight:"bold"}} onClick={(e) =>setShowMenu(false) }>Home</p>
                    </Link>
                    <Link href="/filters/men">
                        <p className="headerButtonText" onClick={(e) =>setShowMenu(false) }>Men</p>
                    </Link>
                    <Link href="/filters/women">
                        <p className="headerButtonText" onClick={(e) =>setShowMenu(false) }>Women</p>
                    </Link>
                    <Link href="/filters/kids">
                        <p className="headerButtonText" onClick={(e) =>setShowMenu(false) }>Kids</p>
                    </Link>
                    <Link href="/filters/merch">
                        <p className="headerButtonText" onClick={(e) =>setShowMenu(false) }>Merch</p>
                    </Link>
                    <Link href="/filters/sale">
                        <p className="headerButtonText" onClick={(e) =>setShowMenu(false) }>Sale</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NavbarOffScreen
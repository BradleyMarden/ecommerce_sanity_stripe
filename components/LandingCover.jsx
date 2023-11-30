import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';
import logo from '../public/assets/logo_black.png'
import Image from "next/image";
import {Product} from "./index";
const LandingCover = ({ landingCover }) => {
    return (
        <div
            className="flex flex-col flex-grow"
            style={{
                position: "relative",
            }}
        >
            <Image src={logo} alt="Cover Image" className="bg-img" />
            {/* Other main content divs children here */}
        </div>
    )
}

export default LandingCover
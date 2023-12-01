
import Link from 'next/link';
import { urlFor } from '../lib/client';
import logo from '../public/assets/logo.png'
import Image from "next/image";
import {Product} from "./index";
import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
const AboutUs = ({ heroBanner }) => {
    return (
        <div className="about-us-container">
            <div className="about-us-para">
            <h2 >About Us</h2>
            <p className="about-us-text">Recently me and a friend have been thinking about turning our hobby and passion into a small business along side our existing jobs.<br/> We would mostly be concentrating on Vw Vans but are more than happy to take enquiries on other Vans that you may want modified!
                <br/><br/>We will be offering the following & Everything in-between.

                <br/><br/>● Camper Van & Crew Cab glass installation
                <br/><br/>● Leisure battery / Split charge system / Diesel Heaters
                <br/><br/>● Sound systems / Entertainment / Reverse Cameras / Dash cams
                <br/><br/>● Ply lining / Carpeting / Sound deadning & Insulateing /Halo Roof head linings
                <br/><br/>● Suspension Upgrades / Lowering springs / Coilovers / Air Suspension / Engine servicing / Brakes
                <br/><br/>● Interior ambient lighting / Under glows / Foot-well lights
                <br/><br/>● Window tinting / Chameleon Tint / Sun strips
                <br/> <br/> ● Front seats / Rear seating / RnR beds
                <br/><br/>Please get in touch with the page with any questions or enquiries you may have.
               <br/> Website & Phone number will be updated very soon! We have a small premises based in Stevenage - Hertfordshire
                <br/><br/>We will be attending alot of Big events next year so keep an eye out!
                Thanks, Sloride Customs
                <br/><b>Lee & Lewis</b></p>
            </div>
        </div>


    )
}

export default AboutUs

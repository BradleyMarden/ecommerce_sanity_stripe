import React from 'react';
import { AiFillInstagram, AiOutlineTwitter} from 'react-icons/ai';
import Image from 'next/image'
const Footer = () => {
  return (
    <div className="footer-container">
      <p>2023 Slo Rides All rights reserverd - Created by Cyrex Studios.
          <Image
          className="image"
          src = '/../public/assets/CS_logo.png'
          width={25}
          height={25}
          alt="Picture of the author"/>
      </p>
      <p className="icons">
        <AiFillInstagram />
        <AiOutlineTwitter />
      </p>
    </div>
  )
}

export default Footer
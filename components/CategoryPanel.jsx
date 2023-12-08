import React from 'react';
import Link from 'next/link';
import {client, urlFor} from '../lib/client';
import logo from '../public/assets/logo_black.png'
import Image from "next/image";
import {Product} from "./index";
const CategoryPanel = ({ category }) => {
    console.log(category)
    const { image, title, description, slug } = category;
    return (
        <div>
            <Link href={`/categories/${slug.current}`}>
                <div className="product-card-large">
                    <h2 className= "product-card-title">{title}</h2>
                    <h3 className= "product-card-desc">{description}</h3>
                    <img src={urlFor(image)} className="product-image-cat"/>
                </div>
            </Link>
        </div>
    )
}

export default CategoryPanel
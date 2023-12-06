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
                <div className="product-card">
                    <img
                        src={urlFor(image)}
                        width={250}
                        height={250}
                        className="product-image"
                    />
                </div>
            </Link>
        </div>
    )
}

export default CategoryPanel
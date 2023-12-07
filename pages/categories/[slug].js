import React, { useState } from 'react';
import {AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar, AiOutlineLeft} from 'react-icons/ai';

import { client, urlFor } from '../../lib/client';
import {HeroBanner, Product} from '../../components';
import { useStateContext } from '../../context/StateContext';
import CategoryPanel from "../../components/CategoryPanel";
import Link from "next/link";
import { useRouter } from 'next/router'
const CategoryDetails = ({ product, category }) => {
    console.log(category)
    const router = useRouter()
    return (
        <div>
            <HeroBanner/>
            <div>
                <button type="button" className="back-button" onClick={() =>{
                    if (window.history.state && window.history.state.idx > 0) {
                    router.back();
                } else {
                    console.log("in")
                    router.back();
                }
                }
                } >
                    <AiOutlineLeft />
                    <span>Back</span>
                    
                </button>
                <h1 className="category-items-container-header-text">
                    {category.title}
                </h1>
            </div>
            <div className="category-items-container">
                {product.map(item => (
                    <Product key={item._id} product={item} />
                ))}
            </div>
        </div>
    )
    
}

export const getStaticPaths = async () => {
    const query = `*[_type == "category"] {
    slug {
      current
    }
  }
  `;

    const products = await client.fetch(query);

    const paths = products.map((product) => ({
        params: {
            slug: product.slug.current
        }
    }));

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({ params: { slug }}) => {
    
    const queryFoId = `*[_type == "category" && slug.current == '${slug}']
  `;
    const cats = await client.fetch(queryFoId);
    const ID = cats[0]._id
    const CATEGORY = cats[0]
    console.log("cats[0]cats[0]")
    console.log(CATEGORY)
    const query = `*[_type == "product" && references('${ID}')]`;
    const product = await client.fetch(query);

    return {
        props: { product, category: CATEGORY}
    }
}

export default CategoryDetails
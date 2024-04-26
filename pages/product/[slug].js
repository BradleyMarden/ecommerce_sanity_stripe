import React, { useState } from 'react';
import {AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar, AiOutlineLeft} from 'react-icons/ai';

import { client, urlFor } from '../../lib/client';
import {HeroBanner, Product} from '../../components';
import { useStateContext } from '../../context/StateContext';
import {useRouter} from "next/router";

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price, isOnSale,onSalePercent} = product;
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();
  const router = useRouter()

  const handleBuyNow = () => {
    onAdd(product, qty);

    setShowCart(true);
  }

  let buttons = <>
    <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>Add to Cart</button>
    <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
  </>
  if (product.quantity <= 0){
    buttons = <>
      <p className="price" style={{color: "red"}}>Out of stock :(</p>
    </>
  }
  let _price

  if (isOnSale) {
    let discountPrice = (price - (price / 100 * onSalePercent)).toFixed(2)
    let percentSaved = (price / 100 * onSalePercent).toFixed(2)
    let percent = onSalePercent
     _price = <>
       <p className="price" style={{color: "red"}}>%{onSalePercent} off. Save £ {percentSaved}</p>
       <p className="price" style={{color: "red"}}>£{discountPrice}</p>
      </>
  }
  else{
    _price = <>
        <p className="price">£{price}</p>
        </>
  }
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
        }} >
          <AiOutlineLeft/>
          <span>Back</span>
        </button>
      </div>
      <div className="product-detail-container">
        
        <div>
          <div className="image-container">
            <img src={urlFor(image && image[index])} className="product-detail-image" />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img 
                key={i}
                src={urlFor(item)}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>
              (20)
            </p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          {_price}
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
            </p>
          </div>
          <div className="buttons">
            {buttons}
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
          <h2>You may also like</h2>
          <div className="marquee11">
            <div className="maylike-products-container track">
              {products.map((item) => (
                <Product key={item._id} product={item} />
              ))}
            </div>
          </div>
      </div>
    </div>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
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
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]'
  
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  console.log(product);

  return {
    props: { products, product }
  }
}

export default ProductDetails
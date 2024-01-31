import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

const Product = ({ product: { image, name, slug, price, isOnSale, onSalePercent  } }) => {
  
  let nav;
  if(isOnSale){
    let discountPrice = ( price - (price/100*onSalePercent)).toFixed(2)
    let percentSaved = (price/100*onSalePercent).toFixed(2)
    let percent = onSalePercent
    nav =  <>
      <p className="product-price">£{discountPrice}</p>
      <p className="product-price" style={{color: "red"}}>{onSalePercent}% off! Save £{percentSaved}</p>
    </>
  }
  else
    <>
      <p className="product-price">£{price}</p>
    </>
    
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img 
            src={urlFor(image && image[0])}
            className="product-image"
          />
          <p className="product-name">{name}</p>
          {nav}
        </div>
      </Link>
    </div>
  )
}

export default Product
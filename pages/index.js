import React from 'react';

import { client } from '../lib/client';
import {
    Product,
    FooterBanner,
    HeroBanner,
    LandingCover,
    ImageCarousel,
    AboutUs,
    CategoryPanelContainer,
    HeaderNavbar
} from '../components';
import Navbar from "../components/Navbar";

const Home = ({ products, bannerData,categoryData, filtersData, cook}) => (
    
  <div>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Permanent+Marker"/>
      {/*<HeaderNavbar/>*/}
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} producst={products}cart={cook}  />
      <ImageCarousel heroBanner={bannerData.length && bannerData[0]}  />
      {/*<AboutUs heroBanner={bannerData.length && bannerData[0]}  />*/}
      <CategoryPanelContainer categories={categoryData} filters={filtersData}></CategoryPanelContainer>

    <div className="products-container">
        <div className="products-heading">
            <h2>Best Seller Products</h2>
            <p>Checkout some of our best selling merch</p>
        </div>
        <div className="products-container">
        
      {products?.map((product) => {
          if(product.isBestSeller)
            return <Product key={product._id} product={product} />
      })}
        </div>
    </div>

  </div>
);

export const getServerSideProps = async ({req, res}) => {
    const query = '*[_type == "product"]';
    const products = await client.fetch(query);
    
    const bannerQuery = '*[_type == "banner"]';
    const bannerData = await client.fetch(bannerQuery);
      
    const categoryQuery = '*[_type == "category"]';
    const categoryData = await client.fetch(categoryQuery);
    
    const filtersQuery = '*[_type == "filters"]';
    const filtersData = await client.fetch(filtersQuery);
    console.log("filters: " + filtersData)
    
    let cook = req.cookies.cartItems || ""
    
  return {
    props: { products, bannerData, categoryData, filtersData, cook }
  }
}

export default Home;

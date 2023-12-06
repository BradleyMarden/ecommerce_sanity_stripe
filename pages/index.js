import React from 'react';

import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner, LandingCover,ImageCarousel, AboutUs, CategoryPanelContainer} from '../components';

const Home = ({ products, bannerData,categoryData }) => (
  <div>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Permanent+Marker"/>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]}  />
      <ImageCarousel heroBanner={bannerData.length && bannerData[0]}  />
      <AboutUs heroBanner={bannerData.length && bannerData[0]}  />
      <CategoryPanelContainer categories={categoryData}></CategoryPanelContainer>
      <div className="products-heading">
      <h2>Best Seller Products</h2>
      <p>Checkout some of our best selling merch</p>
    </div>

    {/*<div className="products-container">*/}
    {/*  {products?.map((product) => {*/}
    {/*      if(product.isBestSeller)*/}
    {/*        return <Product key={product._id} product={product} />*/}
    {/*  })}*/}
    {/*</div>*/}

  </div>
);

export const getServerSideProps = async () => {
    const query = '*[_type == "product"]';
    const products = await client.fetch(query);
    
    const bannerQuery = '*[_type == "banner"]';
    const bannerData = await client.fetch(bannerQuery);
      
    const categoryQuery = '*[_type == "category"]';
    const categoryData = await client.fetch(categoryQuery);
    console.log(categoryData)
    
  return {
    props: { products, bannerData, categoryData }
  }
}

export default Home;

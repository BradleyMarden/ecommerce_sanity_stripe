import React from 'react';

import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner, LandingCover} from '../components';

const Home = ({ products, bannerData }) => (
  <div>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]}  />
      <LandingCover landingCover={bannerData.length && bannerData[0]}  />
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
);

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  }
}

export default Home;

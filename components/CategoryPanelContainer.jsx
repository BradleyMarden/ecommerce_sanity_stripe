import React from 'react';
import Link from 'next/link';
import {client, urlFor} from '../lib/client';
import logo from '../public/assets/logo_black.png'
import Image from "next/image";
import {HeroBanner, Product} from "./index";
import CategoryPanel from "./CategoryPanel";
const CategoryPanelContainer = ({ categories, filters }) => {
    let cate = categories[0]
    return (
      <div>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Permanent+Marker"/>
          <div className= "category-s">
              <div className= "category-s-internal">
                  <h3 className= "category-panel-header">Product Categories</h3>
              <div className="category-panel-container">
                  {categories?.map(cat => (
                      <CategoryPanel key = {cat} category={cat}/>
                  ))}
              </div>
              </div>
          </div>
          
        
      </div>
     
        
    )
}


export default CategoryPanelContainer
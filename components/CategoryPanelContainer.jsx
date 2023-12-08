import React from 'react';
import Link from 'next/link';
import {client, urlFor} from '../lib/client';
import logo from '../public/assets/logo_black.png'
import Image from "next/image";
import {HeroBanner, Product} from "./index";
import CategoryPanel from "./CategoryPanel";
const CategoryPanelContainer = ({ categories }) => {
    let cate = categories[0]
    return (
      <div>
          <div className= "category-s">
              <h3 className= "category-panel-header">Categories</h3>
              <div className="category-panel-container">
                  {categories?.map(cat => (
                      <CategoryPanel key = {cat} category={cat}/>
                  ))}
                  {/*{categories.map(cat => (*/}
                  {/*    <CategoryPanel category={cat}/>*/}
                  {/*))}*/}
              </div>
          </div>
          
        
      </div>
     
        
    )
}


export default CategoryPanelContainer
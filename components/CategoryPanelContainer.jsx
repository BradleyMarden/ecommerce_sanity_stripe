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
          <div>
              <div className="category-panel-container">
                  {categories?.map(cat => (
                      <CategoryPanel key = {cat} category={cat}/>
                  ))}
              </div>
          </div>
          
          {/*{categories.map(cat => (*/}
          {/*    <CategoryPanel category={cat}/>*/}
          {/*))}*/}
      </div>
     
        
    )
}


export default CategoryPanelContainer
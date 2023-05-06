import React from 'react'
import { client } from "../../lib/client";

import { Product, FooterBanner, HeroBanner} from '../components'

const Home = async () => {
  const query = '*[_type == "product"]';
    const products = await client.fetch(query, {cache: 'no-store'});
    const bannerQuery = '*[_type == "banner"]';
    const bannerData = await client.fetch(bannerQuery);
    
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
    
      <div className='products-heading'>
        <h2>Beset Selling products</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className='products-container'>
        {console.log(products)} {products?.map((product)=>{
          return <Product key={product._id} product={product}></Product>
          console.log(product._id);
        })}
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]}></FooterBanner>
    </>
  )};




  export default Home;
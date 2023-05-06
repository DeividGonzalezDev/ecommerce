import React from "react";
import {  AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar  } from 'react-icons/ai';

import { Product } from "@/components";

import { client } from "../../../../lib/client";
import Quantity from "./client/Quantity";
import Smallimages from "./client/Smallimages";
import AddToCartButtons from "./client/AddToCartButtons";


const ProductDetails = async ({params: {slug}}) => {
  
  const {product, products} = await productsData(slug);
  const { image, name, details, price} = product;

  return (
    <div>
      <div className="product-detail-container">
        <Smallimages image={image}/>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar/>
              <AiFillStar/>
              <AiFillStar/>
              <AiFillStar/>
              <AiOutlineStar/>
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <Quantity />
          </div>
          <AddToCartButtons product={product}/>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>You may Also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item)=>(
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const productsData = async (slug) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);
  return {
    product,
    products,
  };
};

export default ProductDetails;

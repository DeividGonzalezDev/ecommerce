"use client";
import React, { useState } from "react";
import Image from "next/image";
import { client, urlFor } from "../../../../../lib/client";

const Smallimages = ({ image }) => {
  const [index, setIndex] = useState(0);
  return (
    <div>
      <div className="image-container">
        <img
          src={urlFor(image && image[index])}
          alt=""
          className="product-detail-image"
        />
      </div>
      <div className="small-images-container">
        {image?.map((item, i) => (
          <img
            key={i}
            src={urlFor(item)}
            className={
              i === index ? "small-image selected-image" : "small-image"
            }
            alt="product-images"
            onMouseEnter={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default Smallimages;

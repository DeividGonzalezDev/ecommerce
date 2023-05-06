'use client'
import React from "react";
import { useStateContext } from "../../../../../contexts/StateContext";

const AddToCartButtons = ({product}) => {
  const {onAdd, qty, onBuy} = useStateContext();

  return (
    <div className="buttons">
      <button
        type="button"
        className="add-to-cart"
        onClick={()=> onAdd(product, qty)}
      >
        Add to Cart
      </button>
      <button
        type="button"
        className="buy-now"
        onClick={async () => await onBuy(product, qty)}
      >
        Buy Now
      </button>
    </div>
  );
};

export default AddToCartButtons;

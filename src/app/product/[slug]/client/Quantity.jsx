'use client'
import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useStateContext } from "../../../../../contexts/StateContext";

const Quantity = () => {
  const {decQty, incQty, qty} = useStateContext();
  return (
    <p className="quantity-desc">
      <span className="minus" onClick={()=> decQty()}>
        <AiOutlineMinus />
      </span>
      <span className="num">
        {qty}
      </span>
      <span className="plus" onClick={()=>incQty()}>
        <AiOutlinePlus />
      </span>
    </p>
  );
};

export default Quantity;

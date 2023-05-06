"use client";
import React, { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { toast } from "react-hot-toast";

import { useStateContext } from "../../contexts/StateContext";
import { urlFor } from "../../lib/client";
import { headers } from "../../next.config";

const Cart = () => {
  initMercadoPago(process.env.PUBLIC_MERCADOPAGO_KEY);
  const cartRef = useRef();

  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuantity,
    onDeleteCartItem,
    setPreferenceId,
    preferenceId
  } = useStateContext();

  useEffect(() => {
    async function fetchData() {
      let jsonCartItems = JSON.stringify(cartItems);
      let res = await fetch("http://localhost:3000/api/createpreference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonCartItems,
        cache: 'no-store'
      }).then((res) => res.json());
      console.log({ jsonCartItems: jsonCartItems });
      console.log(res);
      res.id !== undefined ? setPreferenceId(res.id) : setPreferenceId("");
    }
    fetchData();
  }, [cartItems, setPreferenceId]);
  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>
        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div key={item._id} className="product">
                <img
                  src={urlFor(item?.image[0])}
                  alt=""
                  className="cart-product-image"
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>{item.totalPrice}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "dec")
                          }
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num">{item.quantity}</span>
                        <span
                          className="plus"
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "inc")
                          }
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => onDeleteCartItem(item._id)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              {preferenceId !== '' &&(
                <Wallet initialization={{ preferenceId: preferenceId}} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

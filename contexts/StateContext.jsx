"use client";
import { createContext, useContext, useState, useEffect, use } from "react";
import { Toaster, toast } from "react-hot-toast";

const Context = createContext();

import { client } from "../lib/client";

export function StateContext({ children }) {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  const [preferenceId, setPreferenceId] = useState('');
  const [linkOfProductCheckout, setLinkOfProductCheckout]= useState('');

  let foundProduct;
  let index;

  const onAdd = (product, quantity) =>{
    const checkProductInCart = cartItems.find((item) => item._id === product._id);
    
    setTotalPrice(prevTotalPrice => prevTotalPrice + product.price * quantity);
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities + quantity);
   


    if(checkProductInCart){
      
      const updatedCartItem = cartItems.map(cartProduct =>{
        if(cartProduct._id === product._id) return{
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
      })

      setCartItems(updatedCartItem);
      toast.success(`${qty} ${product.name} added to the cart`);
    }else{
      product.quantity  = quantity;
      product.totalPrice = product.price * product.quantity;

      setCartItems([...cartItems, {...product}]);

      toast.success(`${qty} ${product.name} added to the cart`);
      
    }
  }

  const onBuy = async (product, quantity)=>{
    const dominio = window.location.host;
    console.log(dominio);
    const item = JSON.stringify({
      name: product.name,
      price: product.price,
      quantity: quantity
    })

    let link = await fetch(`http://${dominio}/api/buynow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: item,
      cache: 'no-store'
    }).then(res=> res.json())
    console.log(link);
    window.location.href = link.url;
  }

  const onDeleteCartItem = (id)=>{
    foundProduct = cartItems.find((item)=>{
      return item._id === id
    });
    const newCartItems = cartItems.filter(item => item._id !== id);
    setCartItems(newCartItems);
    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.totalPrice);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);

  }

  const toggleCartItemQuantity = (id, value)=>{
    foundProduct = cartItems.find((item)=>{
      return item._id === id
    });
    console.log(foundProduct);
    //index = cartItems.findIndex(product => product._id === id);
    const newCartItems = cartItems.filter(item => item._id !== id);

    if(value === 'inc'){
      setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity + 1, totalPrice: foundProduct.price * (foundProduct.quantity + 1)}])
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if(value === 'dec'){
      if(foundProduct.quantity > 1){
        setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity - 1, totalPrice: foundProduct.price * (foundProduct.quantity - 1)}])
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  }

  const incQty = ()=>{
    setQty(prevQty => prevQty + 1);
  }
  const decQty = ()=>{
    setQty(prevQty => {
      if(prevQty - 1 < 1) return 1
      return prevQty - 1
    });
  }

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        preferenceId,
        setPreferenceId,
        setShowCart,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onDeleteCartItem,
        onBuy
      }}
    >
      <Toaster />
      {children}
    </Context.Provider>
  );
}

export const useStateContext = ()=> useContext(Context);
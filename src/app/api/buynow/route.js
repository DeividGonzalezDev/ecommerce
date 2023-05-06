import mercadopago from "mercadopago";
import { NextResponse } from "next/server";

export async function POST(req) {
  const product = await req.json();
  console.log(product);
  mercadopago.configure({
    access_token: process.env.SECRET_MERCADOPAGO_KEY,
  });
  
  let preference = {
    items: [{
      title: product.name,
      unit_price: product.price,
      quantity: product.quantity
    }]
    ,
    back_urls: {
      success: "http://localhost:3000/success",
      failure: "http://localhost:3000/feedback",
      pending: "http://localhost:3000/feedback",
    },
    auto_return: "approved",
  };

  let res = await mercadopago.preferences.create(preference).then(response =>{
    console.log(response.body.init_point);
    return {url: response.body.init_point}
  }).catch(error =>{
    console.log(error);
    return error
  });


  return NextResponse.json(res);
}
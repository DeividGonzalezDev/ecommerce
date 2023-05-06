import mercadopago from "mercadopago";
import { NextResponse } from "next/server";

export async function POST(req) {
  const jsonCartItems = await req.json();
  mercadopago.configure({
    access_token: process.env.SECRET_MERCADOPAGO_KEY,
  });
  console.log(jsonCartItems);
  
  // Crea un objeto de preferencia
  let preference = {
    items: [],
    back_urls: {
      success: "http://localhost:3000/success",
      failure: "http://localhost:3000/feedback",
      pending: "http://localhost:3000/feedback",
    },
    auto_return: "approved",
  };
  if(jsonCartItems.length < 1) return NextResponse.json({msg: 'No hay productos en el carrito'});
  jsonCartItems.map((product) => {
    let item = {
      title: product.name,
      unit_price: product.price,
      quantity: product.quantity,
    };
    preference.items.push(item);
    });
    console.log(preference);
    let res = await mercadopago.preferences.create(preference).then(response =>{
      console.log(response.body.id);
      return {id: response.body.id}
    }).catch(error =>{
      console.log(error);
      return error
    });


  return NextResponse.json(res)
  //return NextResponse.json({msg: 'hola World'})
}

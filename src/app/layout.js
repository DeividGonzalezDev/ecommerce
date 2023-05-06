import React from "react";
import "./globals.css";
import { StateContext } from "../../contexts/StateContext";
//import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Estufas y Cocinas Store",
  description:
    "¡Gracias por visitar nuestra tienda en línea y esperamos poder ayudarte a encontrar la estufa o cocina a leña perfecta para tu hogar!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <StateContext>
          {/* <Toaster /> */}
          <div className="layout">
            <header>
              <Navbar></Navbar>
            </header>
            <main className="main-container">{children}</main>
            <footer>
              <Footer></Footer>
            </footer>
          </div>
        </StateContext>
      </body>
    </html>
  );
}

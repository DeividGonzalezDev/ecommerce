import React from 'react';
import Head from 'next/head';

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = ({children}) => {
  return (
    <div className='layout'>
      <Head>
        <title>Estufas Store</title>
      </Head>
      <header>
        <Navbar></Navbar>
      </header>
      <main className='main-container'>
        {children} 
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  )
}

export default Layout
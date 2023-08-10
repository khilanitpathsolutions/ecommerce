import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../container/home';
import CartItems from '../container/cart';
import Wishlist from '../container/wishList';
import ErrorPage from '../error';
import Product from '../container/product';

const Routing = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartItems />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/product/:product_id" element={<Product />} />

          
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Routing;

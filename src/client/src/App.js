import React from 'react';
import Header from './components/header/Header';
import Cloth from './components/clothes/Clothes'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Carousel from './components/header/Carousel';
import Cart from './components/cart/Cart';
import Orders from './components/cart/Orders';

function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Header/>}>
        <Route
              index
              element={<Carousel/>}
            />
        <Route path="cart" element={<Cart/>}/>
        <Route path="women" element={<Cloth brand={"WOMEN"}/>}>    
        </Route>
        <Route path="men" element={<Cloth brand={"MEN"}/>}>       
        </Route>
        <Route path="plus" element={<Cloth brand={"PLUS"}/>}>       
        </Route>
        <Route path="kids" element={<Cloth brand={"KIDS"}/>}>       
        </Route>
        <Route path="orders" element={<Orders />}>       
        </Route>
      </Route>
  </Routes>
</BrowserRouter>
  )
}

export default App;

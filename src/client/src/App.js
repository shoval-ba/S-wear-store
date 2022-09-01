import React from 'react';
import Header from './components/Header';
import Cloth from './components/Cloth'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Carousel from './components/Carousel';
import Cart from './components/Cart';

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
      </Route>
  </Routes>
</BrowserRouter>
  )
}

export default App;

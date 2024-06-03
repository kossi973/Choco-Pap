import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Boutique from "./pages/Boutique"
import ProductDetails from "./pages/ProductDetails"
import { PanierContext } from './config/PanierContext';
import { useState, useEffect } from 'react';

function App() {
  const [panier, setPanier] = useState([]);

  useEffect(() => {  
      setPanier(JSON.parse(localStorage.getItem("panier")));
  },[]);

  return (
    <>
      <PanierContext.Provider value={{ panier, setPanier }}>      
          <Header />
          <Routes >
              <Route path="/" element={<Home />} />
              <Route path="/boutique" element={<Boutique />}/>
              <Route path="/pages/productdetails" element={<ProductDetails />}/>
          </Routes>
          <Footer />
      </PanierContext.Provider>
    </>
  )
}

export default App
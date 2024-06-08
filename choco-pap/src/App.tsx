import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Boutique from "./pages/Boutique"
import ProductDetails from "./pages/ProductDetails"
import { PanierContext } from './config/PanierContext';
import { useState, useEffect } from 'react';
import { TypePanier } from "./components/AjouterAuPanier"

// Au démarrage, récupérer le panier du stockage local ou réinitialiser le panier.
function App() {
  const [panier, setPanier] = useState<TypePanier[]>([]);

  useEffect(() => {  
      let panierStocke = localStorage.getItem("panier");
      if (panierStocke) {
          setPanier(JSON.parse(panierStocke));
      } else {
          setPanier([]);
      }
  },[]);

  // Globaliser le panier à toute l'application
  //Structurer les pages de l'application
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
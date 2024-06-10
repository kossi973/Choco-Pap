import { useContext } from "react";
import { PanierContext } from '../config/PanierContext';

//fonction vider le panier
export function ViderLePanier() {     
    const panierContext = useContext(PanierContext);
    // Vérifier la définition du panier global 
    if (!panierContext) { 
        return null;
    }
       
    const { setPanier } = panierContext; 

    // Vider le panier et le stockage local
    const ReinitDuPanier = () => {
      setPanier([]);
      localStorage.setItem("panier", JSON.stringify({}));      
    }

  return (
    <button onClick={ReinitDuPanier}>
        Vider le panier
    </button>
  );
}
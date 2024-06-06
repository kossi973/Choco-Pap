import { useContext } from "react";
import { PanierContext } from '../config/PanierContext';

export function ViderLePanier() {     
    const panierContext = useContext(PanierContext);
    if (!panierContext) {
        return null;
    }    
    const { panier, setPanier } = panierContext;

    const ReinitDuPanier = () => {
      setPanier([]);
      localStorage.setItem("panier", JSON.stringify({}));      
    }

  return (
    <button onClick={ReinitDuPanier}>
        Réinitialiser le panier
    </button>
  );
}
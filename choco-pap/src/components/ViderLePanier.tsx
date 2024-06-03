import { useContext } from "react";
import { PanierContext } from '../config/PanierContext';


export function ViderLePanier() {        
    const { panier, setPanier } = useContext(PanierContext);

    const ReinitDuPanier = () => {
      setPanier([]);
      localStorage.setItem("panier", JSON.stringify([]));      
    }

  return (
    <button onClick={ReinitDuPanier}>
        Réinitialiser le panier
    </button>
  );
}
import { useContext } from "react";
import { PanierContext } from '../config/PanierContext';

//fonction valider le panier
export function ValiderLePanier() {     
    const panierContext = useContext(PanierContext);
    // Vérifier la définition du panier global 
    if (!panierContext) { 
        return null;
    }
    const { panier } = panierContext;

    let isActive;
    let styleButton = 'grid justify-center w-1/2 mx-auto py-2 px-4 text-md md:text-xl border rounded-lg mt-12 ';

    // Si le panier contient des produits
    if (panier.length != 0) {
        isActive = true;
        styleButton += 'shadow-lg shadow-orange-300 hover:ring hover:ring-violet-300 active:shadow-xl active:bg-sky-800'     
    } else {
        isActive = false;
    }

    // Activer le bouton si le panier contient des produits
    return (
      <button disabled={!isActive ? true : false} style={{ backgroundColor: isActive ? 'green' : 'gray' }} className = {styleButton} onClick={() => {alert("Le panier a été validé")}}>        
          Valider le panier        
      </button>
    );
}
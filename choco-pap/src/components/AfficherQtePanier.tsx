import { useContext } from "react";
import { PanierContext } from '../config/PanierContext';
import { TypePanier } from "./AjouterAuPanier";

export function AfficherQtePanier() {        
    const panierContext = useContext(PanierContext);
    if (!panierContext) {
        return null;
    }    
        
    const { panier, setPanier } = panierContext;
    
    let quantitePanier;

console.log( panier.length);

    if (panier.length > 0) {
        const quantitesProduit = panier.map((item: TypePanier) => item.quantity);
        
        quantitePanier = quantitesProduit.reduce((accumulateur: number, item: number) => accumulateur + item, 0);
     } else {quantitePanier = 0}

    return quantitePanier;

}
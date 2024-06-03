import { useContext } from "react";
import { PanierContext } from '../config/PanierContext';

export function AfficherQtePanier() {        
    const { panier, setPanier } = useContext(PanierContext);
    let quantitePanier;

    if (panier) {
        const quantitesProduit = panier.map((item) => item.quantity);
        
        quantitePanier = quantitesProduit.reduce((accumulateur, item) => accumulateur + item, 0);
     } else {quantitePanier = 0}

    return quantitePanier;

}
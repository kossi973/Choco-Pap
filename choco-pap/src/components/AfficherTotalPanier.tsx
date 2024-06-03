import { useContext } from "react";
import { PanierContext } from '../config/PanierContext';

export function AfficherTotalPanier() {        
    const { panier, setPanier } = useContext(PanierContext);

        const prixProduit = panier.map((item) => Number(item.product.price * item.quantity));      

        const totalPanier = (prixProduit.reduce((accumulateur, item) => accumulateur + item, 0)).toFixed(2);

    return totalPanier;

}
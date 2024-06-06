import { useContext } from "react";
import { PanierContext } from '../config/PanierContext';
import { TypePanier } from "./AjouterAuPanier";

export function AfficherTotalPanier() {        
    const panierContext = useContext(PanierContext);
    if (!panierContext) {
        return null;
    }    
    const { panier, setPanier } = panierContext;

        const prixProduit = panier.map((item: TypePanier) => Number(item.product.price * item.quantity));      

        const totalPanier = (prixProduit.reduce((accumulateur: number, item: number) => accumulateur + item, 0)).toFixed(2);

    return totalPanier;

}
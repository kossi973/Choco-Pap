import { useContext } from "react";
import { PanierContext } from '../config/PanierContext';
import { TypePanier } from "./AjouterAuPanier";

export function AfficherTotalPanier() {
    // Vérifier la définition du panier global        
    const panierContext = useContext(PanierContext);
    if (!panierContext) {
        return null;
    }    
    const { panier } = panierContext;
        // Calculer le coût total par produit
        const prixProduit = panier.map((item: TypePanier) => Number(item.product.price * item.quantity));      
        // Calculer le coût total en effectuant la somme du coût par produit
        const totalPanier = (prixProduit.reduce((accumulateur: number, item: number) => accumulateur + item, 0)).toFixed(2);

    return totalPanier;

}
import { useContext } from "react";
import { PanierContext } from '../config/PanierContext';
import { TypePanier } from "./AjouterAuPanier";

export function AfficherQtePanier() {
    // Vérifier la définition du panier global         
    const panierContext = useContext(PanierContext);
    if (!panierContext) {
        return null;
    }    
        
    const { panier, setPanier } = panierContext;
    
    let quantitePanier;
    // Si le panier contient des produits
    if (panier) {
        // Calculer le quantité par produit
        const quantitesProduit = panier.map((item: TypePanier) => item.quantity);
        // Calculer le quantité total des produits
        quantitePanier = quantitesProduit.reduce((accumulateur: number, item: number) => accumulateur + item, 0);
     } else {quantitePanier = 0} // Sinon afficher zéro

    return quantitePanier;

}
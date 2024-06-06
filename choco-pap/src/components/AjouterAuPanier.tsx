import { useContext, useEffect } from "react";
import { PanierContext } from '../config/PanierContext';
import { CardProps } from "../components/ProductCard";

export type TypePanier = {
    product: CardProps;
    quantity: number;
  };

export function AjouterAuPanier(product:CardProps) {        
    const panierContext = useContext(PanierContext);
    if (!panierContext) {
        return null;
    }    
    const { panier, setPanier } = panierContext;
    
    const AjouterProduitAuPanier = () => {
        const productInCart = panier.find((item: TypePanier) => item.product.id === product.id);


        if (productInCart) {
            // Si le produit est déjà présent dans le panier, augmentez la quantité de 1
            setPanier(panier.map((item: TypePanier) => item.product.id === product.id ? {...item, quantity: item.quantity + 1} : item));  
        } else { // Sinon ajouter le produit au panier avec la quantité 1 
            setPanier([...panier, {product, quantity: 1}]);  
        }
    }
 
           
    useEffect(() => {
        localStorage.setItem("panier", JSON.stringify(panier));
    },[panier])
    
  return (
    <button onClick={AjouterProduitAuPanier}>
        Ajouter au panier
    </button>
  );
}
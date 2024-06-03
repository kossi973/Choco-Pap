import { useContext, useEffect } from "react";
import { PanierContext } from '../config/PanierContext';

export function AjouterAuPanier({product}) {        
    const { panier, setPanier } = useContext(PanierContext);

    const AjouterProduitAuPanier = () => {
        const productInCart = panier.find(item => item.product.id === product.id);

        if (productInCart) {
            // Si le produit est déjà présent dans le panier, augmentez la quantité de 1
            setPanier(panier.map(item => item.product.id === product.id ? {...item, quantity: item.quantity + 1} : item));                
        } else {
            // Si le produit n'est pas dans le panier, ajoutez-le avec la quantité 1
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
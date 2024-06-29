import { useContext } from "react";
import { PanierContext } from '../config/PanierContext';
import { TypePanier } from "./AjouterAuPanier";

// Afficher et gérer les produits du panier
export function AfficherGererProduitsPanier() {
    // Vérifier la définition du panier global   
    const panierContext = useContext(PanierContext);
    if (!panierContext) {
        return null;
    }    
    const { panier, setPanier } = panierContext;
    //Augmenter ou diminuer la quantité d'un produit dans le panier pour des valeurs >= 1
    const handleQtyChange = (id: string, count: number) => {
        setPanier(panier.map((item: TypePanier) => item.product.id === id ? (count == -1 && item.quantity > 1 || count == 1 ) ? {...item, quantity: item.quantity + count } : item : item));  
    };
    
    const SupprimerProduitDuPanier = (id: string) => {
        // Supprimer le produit du panier
        setPanier(panier.filter((item: TypePanier) => item.product.id !== id));
    }    
    // Afficher un produit dans le panier
    function AfficherProduit(item: TypePanier){
        const {id, image, title, price} = item.product;
        const quantity = item.quantity;

        return(
            <div key={id} className="grid grid-cols-2 my-10">
                <div className="flex gap-6 mx-6 pt-2" >
                    <div>
                        {/* Afficher le bouton de suppression du panier */}
                        <button className="border-2 border-red-600 rounded-full my-14 px-2 text-red-600 font-bold" onClick={() => SupprimerProduitDuPanier(id)}>
                            X
                        </button>
                    </div>
                    {/* Afficher l'image du produit - le point ./xxxxxx dans le chemin doit être supprimé */}
                    <img className="border-2 border-orange-400 h-4/6 md:h-full" src={(image).substring(1)} alt={title} />
                </div>
                <div className="ml-16">
                    {/* Afficher le nom du produit */}
                    <p className='font-bold text-xl text-yellow-100 '>
                        {title}
                    </p>
                    {/* Afficher le coût total du produit */}
                    <p className='text-lg mb-2'>
                        {(price * quantity).toFixed(2)} €
                    </p>
                    <div className="flex gap-10">
                        <div className="flex text-xl gap-2">
                            {/* Afficher la quantité du produit */}
                            <div className="px-4 py-2 border-2 font-bold">
                                {quantity}
                            </div>
                            {/* Gérer les commandes ajouter/retirer */}
                            <div className="grid">
                                <button onClick={() => handleQtyChange(id, 1)}>▲</button>
                                <button onClick={() => handleQtyChange(id, -1)}>▼</button>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        )
    }

    return (       
        <div>
            {/* Afficher les produits du panier */}
            {panier.map((item: TypePanier) => AfficherProduit(item))}
        </div>
    );
}
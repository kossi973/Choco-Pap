import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PanierContext } from '../config/PanierContext';
import { Link } from "react-router-dom";
import { TypePanier } from "../components/AjouterAuPanier";

// Afficher les détails d'un produit
function ProductDetails() {
    // Vérifier la définition du panier global 
    const panierContext = useContext(PanierContext);
    if (!panierContext) {
        return null;
    }    
    const { panier, setPanier } = panierContext;
    const location = useLocation();
    const { product } = location.state;
    const [counter, setCounter] = useState(0);
    const {id, image, title, price, description, ingredients} = product;


    // Synchoniser counter avec la quantité du produit dans le panier
    useEffect(() => {
        const productInCart = panier.find((item: TypePanier) => item.product.id === id);
        if (productInCart) {
          setCounter(productInCart.quantity);
        } else {setCounter(0)}

      }, [panier]);

    // Augmenter ou diminuer la quantité du produit à mettre dans le panier pour des valeurs >= 0
    const handleCounterChange = (inc: number) => {
        if (inc == -1 && counter > 0 || inc == 1 ){
            setCounter(counter + inc);
        }            
    };

    // Ajouter la quantité sélectionnée du produit au panier - remplace la quantité en cours
    function AjoutSelectionAuPanier(count: number) {
            if (count > 0) {
                const productInCart = panier.find((item: TypePanier) => item.product.id === id);
    
                if (productInCart) {
                    // Si le produit est déjà présent dans le panier, maj de la quantité avec count
                    setPanier(panier.map((item: TypePanier) => item.product.id === product.id ? {...item, quantity: count} : item));                
                } else {
                    // Si le produit n'est pas dans le panier, ajoutez-le avec la quantité count
                    setPanier([...panier, {product, quantity: count}]);
                }
            }            
        }

    return (
        <div className='min-h-screen bg-hero'>
            <div className="min-h-screen bg-amber-950/85 text-white overflow-hidden">                
                <div className="container grid mx-auto px-12 md:w-1/2 md:mt-24" >
                    <div className="flex flex-col-reverse md:flex-row my-14 gap-20">
                        <div className="grid mx-auto" >
                            {/* Afficher l'image du produit - le point ./xxxxxx dans le chemin doit être supprimé */}
                            <img className="border-2 border-orange-400" src={(image).substring(1)} alt={title} />
                        </div>
                        <div className="grid mx-auto md:w-96" >
                            {/* Afficher le nom du produit */}
                            <p className='font-bold text-xl md:w-96 mb-2'>
                                {title}
                            </p>
                            {/* Afficher le prix unitaires du produit */}
                            <p className='text-lg font-bold mb-2'>
                                {price} €
                            </p>
                            {/* Afficher la description du produit */}
                            <p className='text-lg mb-4'>
                                {description}
                            </p>
                            <div className="md:flex gap-10">
                                <div className="flex text-xl gap-2">
                                    {/* Afficher la quantité de produit sélectionnée */}
                                    <div className="px-4 py-2 border-2 font-bold">
                                        {counter}
                                    </div>
                                    {/* Gérer les commandes ajouter/retirer */}
                                    <div className="grid">
                                        <button onClick={() => handleCounterChange(1)}>▲</button>
                                        <button onClick={() => handleCounterChange(-1)}>▼</button>
                                    </div>
                                </div>
                                <div className='text-lg border border-white bg-amber-600 grid justify-center shadow-md shadow-amber-100 rounded-lg md:w-60 mt-10 md:my-0 py-2 hover:ring hover:ring-violet-300 active:shadow-xl active:bg-sky-800'>
                                    {/* Gérer l'ajout du produit au panier */}
                                    <button onClick={() => AjoutSelectionAuPanier(counter)}>
                                        Ajouter au panier
                                    </button>
                                </div>   
                            </div>            
                        </div>
                    </div>
                    <div>
                        {/* Afficher les ingrédients du produit */}
                        <p className="font-bold text-lg border-b-2 pb-1">Ingrédients</p>
                        <div className="my-2 py-2">
                            {ingredients}
                        </div>
                        {/* Lien de retour à la boutique */}
                        <div className="mt-8 mb-10 font-bold text-lg text-amber-500">                            
                            <Link to={"/boutique"}>Retour boutique →</Link>
                        </div>
                    </div>
                </div>

            </div>            
        </div>
    );
}
export default ProductDetails;
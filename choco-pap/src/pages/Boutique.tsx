import Card, { CardProps } from "../components/ProductCard";
import { useState, useEffect, ChangeEvent } from 'react';

type ToggleFiltersDisplayProps = {
    filtre: string;
    filtreNumber: number;
};

type SelectCategoriesProps = {
    id: string;
    category: string;
    label: string;
    check: boolean;
    onCheck: (id: string, event: React.ChangeEvent<HTMLInputElement>) => void;
};

type SelectFiltersProps = {
    defaultValue: number;
    borne: string;
    onSelect: (borne: string, event: React.ChangeEvent<HTMLSelectElement>) => void;
};

// Définir les catégories du filtre des produits
const categoriesFiltre = [
    {id:"1", category:"tous", label:" Tous", check: true},
    {id:"2", category:"blanc", label:" Chocolat blanc", check: false},
    {id:"3", category:"lait", label:" Chocolat au lait", check: false},
    {id:"4", category:"noir", label:" Chocolat noir", check: false},
    {id:"5", category:"noix", label:" Noix/Noisette", check: false},
    {id:"6", category:"fruit", label:" Fruit", check: false},
    {id:"7", category:"caramel", label:" Caramel", check: false},
    {id:"8", category:"liqueur", label:" Liqueur", check: false},
];

function SelectPrice({defaultValue, borne, onSelect}: SelectFiltersProps) {  // Afficher la liste des prix des bornes min et max du filtre des prix
    return (
        <div>
            <span className="ml-2">Prix {borne}</span>
            <select value={defaultValue} className="my-1 ml-3 text-black rounded-lg border-2 border-amber-700" onChange={(e) => onSelect(borne, e)}>
                <option value={1}>1</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
            </select>
        </div>
    );
}

function SelectNote({defaultValue, borne, onSelect}: SelectFiltersProps) {  // Afficher la liste des notes des bornes min et max du filtre des notes 
    return (
        <div>
            <span className="ml-2">Note {borne}</span>
            <select value={defaultValue} className="my-1 ml-3 text-black rounded-lg border-2 border-amber-700" onChange={(e) => onSelect(borne, e)}>
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
            </select>
        </div>
    );
}

function SelectCategories({id, category, label, check, onCheck}: SelectCategoriesProps) { // Afficher les catégories de produits
    return (
        <li className="ml-3 text-sm md:text-md">
            <label>
                <input
                    type="checkbox"
                    name={label}
                    value={category}
                    checked={check}
                    onChange={(e) => onCheck(id, e)}
                />
                {label}
            </label>
        </li>
    )
}

//************************************************************************************* */
function Boutique() { // afficher les produits de la boutique
    const [productsList, setProductsList] = useState<CardProps[]>([]);
    const [filteredProducts, setfilteredProducts] = useState<CardProps[]>([]);
    const [selectedCategories, setSelectedCategories ] = useState<Array<string>>([]);
    const [optionsFiltre, setOptionsFiltre] = useState(categoriesFiltre);
    const [prixMin, setPrixMin] = useState(1);
    const [prixMax, setPrixMax] = useState(20);    
    const [noteMin, setNoteMin] = useState(0);
    const [noteMax, setNoteMax] = useState(5);
    const [isOpen, setIsOpen] = useState([true,true,true]);

    
    function InitFiltersDisplay() { // par défaut, fermer le filtre pour les smartphones et le déployer pour les écrans plus grands
        const screenSize = window.innerWidth;        
        if (screenSize > 768) {
            setIsOpen(isOpen.map(() => true));
        } else {            
            setIsOpen(isOpen.map(() => false));
        }
    }

    useEffect(() => {
        // Récupérer l'event de resize de l'écran
        window.addEventListener("resize", InitFiltersDisplay);
        return () => {
            // Clean up the event listener when the component unmounts
            window.removeEventListener("resize", InitFiltersDisplay);
        };
    },[])
    // Gérer la commande d'ouverture/fermeture des sections du filtre
    function ToggleFiltersDisplay({filtre, filtreNumber}: ToggleFiltersDisplayProps) {
        const toggleItem = () => {
            setIsOpen(prevState => {
                const newState = [...prevState]; // Create a copy of the array
                newState[filtreNumber] = !newState[filtreNumber]; // Toggle the element
                return newState;
            });
        };

        return (
            <p className="text-white text-md font-semibold underline underline-offset-4 ml-2 mt-2 mb-4">{filtre}&ensp;  
                <button className='md:hidden' onClick={toggleItem}>                    
                    {isOpen[filtreNumber] ? <span>▲</span> : <span>▼</span>}                    
                </button>
            </p>
        )
    }

    useEffect(() => { //importer les données des produits
        fetch('products.json')
            .then((response) => response.json())
            .then((json) => {
                setProductsList(json);
                setfilteredProducts(json);                
            })
            .catch((error) => {alert(error)});
    },[]);
    
    // Gérer les coches et les catégories associées
    const handleOnCheck = (id: string, event: ChangeEvent<HTMLInputElement>) => { // gérer la sélection des catégories
        const isChecked = event.target.checked;
        const categoryChecked = event.target.value;
        
        if (categoryChecked === "tous" && isChecked) {  // Quand la coche "Tous" est sélectionnée, les autres sont désactivées           
            setOptionsFiltre(categoriesFiltre);   // reset des filtres        
        } else {
            // gérer les coches - coche "Tous" désactivée quand au moins une autre est sélectionnée
            setOptionsFiltre(optionsFiltre.map(item => item.label === " Tous" ? {...item, check: false} : (item.id === id ? {...item, check: isChecked} : item )));
        }              
        
        if (isChecked){  // maj de la liste des catégories sélectionnées
            // Ajouter à la liste, la catégorie sélectionnée - Reset de la liste si la catégorie sélectionnée est "Tous"
            setSelectedCategories( categoryChecked != "tous" ? [...selectedCategories, categoryChecked] : [])                        
        } else { // Retirer de la liste , la catégorie déslectionnée            
            setSelectedCategories(selectedCategories.filter(item => item !== categoryChecked))
        }
    }
    
    const handleOnSelectPrice = (borne: string, event: ChangeEvent<HTMLSelectElement>) => { // gérer la sélection des prix
        const price = Number(event.target.value);
        
        switch(borne) {
            case "min" :
                setPrixMin(price);
                break;

            case "max" :                
                setPrixMax(price);
                break;
        }         
    };
    
    const handleOnSelectNote = (borne: string, event: ChangeEvent<HTMLSelectElement>) => { // gérer la sélection des notes
        const note = Number(event.target.value);
        
        switch(borne) {
            case "min" :
                setNoteMin(note);
                break;

            case "max" :
                setNoteMax(note);
                break;
        }         
    };

    useEffect(() => {
        // Afficher les produits dont au moins une catégorie est sélectionnée dans le filtre catégories, filtrés en plus par le prix et la note
            // On recherche dans le tableau des catégories de "productsList" au moins un élément du tableau "selectedCategories"
            // Si le tableau "selectedCategories" est vide alors tous les éléments sont renvoyés et filtrés par le prix et la note.
        setfilteredProducts(productsList.filter((product) => (selectedCategories.length > 0 ? selectedCategories.some((option) => (Object.entries(product.category).map(([ingredient,inclus]) => inclus ? ingredient : null)).includes(option)) : true )
        && (product.price >= prixMin && product.price <= prixMax)
        && (product.note >= noteMin && product.note <= noteMax)))
 
    }, [productsList, selectedCategories, prixMin, prixMax, noteMin, noteMax]);


    return (
        <div className='min-h-screen bg-hero -mb-5'>
            <div className="min-h-screen bg-amber-950/85">            
                <h1 className='pt-10 text-yellow-500 text-5xl font-bold flex justify-center mb-32'>BOUTIQUE</h1>
                <div className="sm:flex md:flex-row">                
                    <div className="ml-4 mb-20 text-white"> {/* Afficher le filtre */}
                        <p className="text-sm mb-1">FILTRE</p>
                        <div className="border h-fit border-amber-700 border-2 pb-4 w-36">
                            {/* Afficcher les filtres des catégories */}
                            {<ToggleFiltersDisplay filtre={"Catégories"} filtreNumber={0} />}
                            <ul>  
                                Gérer la sélection des catégories des produits                          
                                {isOpen[0] && optionsFiltre.map(({id, category, label, check}) => ( 
                                    <SelectCategories key={id} id={id} category={category} label={label} check={check} onCheck={handleOnCheck} />
                                ))}
                            </ul>
                            {/* Afficher les filtres des prix des produits */}
                            {<ToggleFiltersDisplay filtre={"Prix"} filtreNumber={1} />}                                                     
                            <div> 
                                {/* Gérer la sélection des bornes min et max  */}
                                { isOpen[1] && <SelectPrice defaultValue={prixMin} borne={"min"} onSelect={handleOnSelectPrice} />}
                                { isOpen[1] && <SelectPrice defaultValue={prixMax} borne={"max"} onSelect={handleOnSelectPrice} />}
                            </div>
                            {/* Afficher les filtres des notes des produits */}
                            {<ToggleFiltersDisplay filtre={"Notes"} filtreNumber={2} />}
                            <div>     
                                {/* Gérer la sélection des bornes min et max  */}
                                { isOpen[2] && <SelectNote defaultValue={noteMin} borne={"min"} onSelect={handleOnSelectNote} />}
                                { isOpen[2] && <SelectNote defaultValue={noteMax} borne={"max"} onSelect={handleOnSelectNote} />}
                            </div>
                        </div>
                    </div>                
                    <div>  {/* Afficher les cartes produits */}
                        <div className='mx-auto md:mx-36 lg:mx-48 xl:mx-52 mb-5 px-10 flex flex-wrap justify-center'>
                            {filteredProducts.map((product: CardProps) => (
                                <Card key={product.id} {...product}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Boutique;
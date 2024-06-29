import { useRef } from 'react';
import { AfficherGererProduitsPanier } from './AfficherGererProduitsPanier';
import { AfficherTotalPanier } from './AfficherTotalPanier';
import { ViderLePanier } from './ViderLePanier';
import { ValiderLePanier } from './ValiderLePanier';

const panierUrl = '/images/panier.png'

// Gérer le panier
const Panier = () => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  // Ouvrir la fenetre modale
  const OuvrirPanier = () => {
    if (dialogRef && dialogRef.current){      
      dialogRef.current.showModal();
    }
  };
  // Fermer la fenetre modale
  const FermerPanier = () => {    
      dialogRef?.current?.close();
  };
  
  return (
    <>
      <button onClick={OuvrirPanier}><img className="h-10" src={panierUrl} alt="logo-Panier"/></button>
      <dialog className="overscroll-none bg-hero rounded-md text-white absolute mt-32 md:right-0 md:mr-4 h-5/6 w-full md:w-1/3" ref={dialogRef}>
        <div className='bg-yellow-900/90' >
            <button className='text-md mt-4 ml-4 border-2 rounded-full px-2' onClick={FermerPanier}>X</button>
            <h1 className='grid justify-center text-3xl mb-8 border-b border-b-yellow-600 pb-4 text-yellow-500 font-bold'>PANIER</h1>
            <div className='h-full'>
                {<AfficherGererProduitsPanier/>}
            </div>
            <div>
                <div className='grid justify-center text-2xl my-10 border-t border-t-yellow-600 pt-4 pb-4'>
                    <span className='font-bold text-yellow-100 '>TOTAL : {<AfficherTotalPanier/>} €</span>
                </div>
                <div className='grid justify-center w-1/2 mx-auto py-2 px-4 text-md md:text-xl border rounded-lg bg-red-800/75 shadow-lg shadow-orange-300 hover:ring hover:ring-violet-300 active:shadow-xl active:bg-sky-800'>                            
                    {<ViderLePanier/>}
                </div>
                {<ValiderLePanier/>}
                <div className='py-10'>
                </div>
            </div>
        </div>
      </dialog>
    </>
  );
};

export default Panier;

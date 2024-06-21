import React from 'react';
import { TypePanier } from '../components/AjouterAuPanier';

// Définir le type du panier globalisé
type PanierContextType = {
  panier: TypePanier[];
  setPanier: React.Dispatch<React.SetStateAction<TypePanier[]>>;
};

export const PanierContext = React.createContext<PanierContextType | undefined>(undefined);

// Définir la structure du produit
export interface CardProps {
  id : string,
  title : string,
  price : number,
  note : number,
  image: string,
  category: {
      blanc: boolean,
      lait: boolean,
      noir: boolean,
      caramel: boolean,
      noix: boolean,
      fruit: boolean,
      liqueur: boolean
    },
    description: string,
    ingredients: string,
}
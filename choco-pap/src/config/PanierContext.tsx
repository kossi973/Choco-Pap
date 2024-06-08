import React from 'react';
import { TypePanier } from '../components/AjouterAuPanier';

// Définir le type du panier globalisé
type PanierContextType = {
  panier: TypePanier[];
  setPanier: React.Dispatch<React.SetStateAction<TypePanier[]>>;
};

export const PanierContext = React.createContext<PanierContextType | undefined>(undefined);
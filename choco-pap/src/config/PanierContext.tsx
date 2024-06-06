import React from 'react';
import { ItemType } from '../components/AjouterAuPanier';

type PanierContextType = {
  panier: ItemType[];
  setPanier: React.Dispatch<React.SetStateAction<ItemType[]>>;
};

export const PanierContext = React.createContext<PanierContextType | undefined>(undefined);
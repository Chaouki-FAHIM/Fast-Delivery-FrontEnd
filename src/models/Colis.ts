// src/models/Colis.ts
export interface ColisRes {
    id: number;
    dateCreation: Date;
    nom: string;
    prenom: string;
    ville: string;
    adresseLocale: string;
    numeroTelephone: string;
    reference: string;
    montant: number;
    villeRamassage: string;
    description: string;
    note: string;
    statutColis: string;
    echange: boolean;
    ouverture: boolean;
    essayage: boolean;
    fraisLivraison: number;
}
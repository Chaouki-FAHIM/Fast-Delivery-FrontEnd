// src/services/ColisService.ts
import APIClient from './APIClient';
import { ColisRes } from '../models/Colis';

class ColisService {

    getAllColis(): Promise<ColisRes[]> {
        return APIClient.get('/api/colis')
            .then(response => {
                // Extraire les données de la réponse
                const data = response.data.data;

                // Mapper les données à la structure de ColisRes
                const colisList: ColisRes[] = data.map((colisObj: any) => ({
                    id: colisObj.id,
                    dateCreation: new Date(colisObj.date_creation),
                    nom: colisObj.nom,
                    prenom: colisObj.prenom,
                    ville: colisObj.ville,
                    adresseLocale: colisObj.adresseLocale,
                    numeroTelephone: colisObj.numeroTelephone,
                    reference: colisObj.reference,
                    montant: colisObj.montant,
                    villeRamassage: colisObj.villeRamassage,
                    description: colisObj.description,
                    note: colisObj.note,
                    statutColis: colisObj.statutColis,
                    echange: colisObj.echange,
                    ouverture: colisObj.ouverture,
                    essayage: colisObj.essayage,
                    fraisLivraison: colisObj.fraisLivraison,
                }));

                return colisList;
            })
            .catch(error => {
                console.error('Failed to fetch colis:', error);
                throw error;
            });
    }

    getColisByName(): Promise<string[]> {
        return APIClient.get('/api/data/villes')
            .then(response => {
                return response.data.map((colisObj: { city: string }) => colisObj.city);
            })
            .catch(error => {
                console.error('Failed to fetch villes:', error);
                throw error;
            });
    }

    DeleteColisById(id: number): Promise<void> {
        return APIClient.delete(`/api/colis/${id}`)
            .then(() => {
                console.log('Colis deleted successfully');
            })
            .catch(error => {
                console.error('Failed to delete colis:', error);
                throw error;
            });
    }

    DeleteAll(): Promise<void> {
        return APIClient.delete('/api/colis')
            .then(() => {
                console.log('All colis deleted successfully');
            })
            .catch(error => {
                console.error('Failed to delete all colis:', error);
                throw error;
            });
    }
}

export default new ColisService();


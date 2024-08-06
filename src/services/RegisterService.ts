import { User } from '../models/User';

class RegisterService {
    register(user: User): Promise<void> {
        // Remplacez cette partie par votre logique de traitement d'inscription
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
}

export default new RegisterService();

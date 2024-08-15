import { User } from '../models/User';
import APIClient from "./APIClient";

class RegisterService {
    register(client: any): Promise<void> {
        return new Promise((resolve, reject) => {
            APIClient.post('/api/auth/register', client)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    if (error.response) {
                        reject(error.response.data);
                    } else {
                        console.log(error.message);
                        reject('Problem in server');
                    }
                });
        });
    }

    verifyEmail(email: string): Promise<void> {
        return new Promise((resolve, reject) => {
            APIClient.post('/api/auth/verifyEmail', null, {
                params: { email }
            })
                .then(response => {
                    if (response.data === true) {
                        resolve();
                    } else {
                        reject('Email is already used');
                    }
                })
                .catch(error => {
                    if (error.response && error.response.status === 400) {
                        reject(error.response.data);
                    } else {
                        console.log(error.message);
                        reject('Problem in server');
                    }
                });
        });
    }
}

export default new RegisterService();

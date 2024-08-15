import { Login } from '../models/Login';
import APIClient from './APIClient';

class LoginService {
    login(login: Login): Promise<void> {
        return new Promise((resolve, reject) => {
            APIClient.get('/api/auth/login', {
                params: login
            })
                .then(response => {
                    resolve();
                })
                .catch(error => {
                    if (error.response && error.response.status === 401) {
                        reject(error.response.data);
                    } else {
                        console.log(error.message);
                        reject('Problem in server');
                    }
                });
        });
    }
}

export default new LoginService();

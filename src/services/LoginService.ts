import { Login } from '../models/Login';

class LoginService {
    login(login: Login): Promise<void> {
        return new Promise((resolve, reject) => {
            if (login.email === 'test@example.com' && login.password === 'password123') {
                resolve();
            } else {
                reject('Invalid email or password');
            }
        });
    }
}

export default new LoginService();

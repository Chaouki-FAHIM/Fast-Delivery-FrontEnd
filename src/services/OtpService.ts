import APIClient from './APIClient';

class OtpService {
    async sendOtp(email: string): Promise<void> {
        return new Promise((resolve, reject) => {
            APIClient.post('/api/auth/sendOtp', null, {
                params: { email }
            })
                .then(response => {
                    resolve();
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

    async verifyOtp(email: string, otp: string): Promise<void> {
        return new Promise((resolve, reject) => {
            APIClient.post('/api/auth/verifyOtp', null, {
                params: { email, otp },
            })
                .then(response => {
                        resolve();
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

export default new OtpService();

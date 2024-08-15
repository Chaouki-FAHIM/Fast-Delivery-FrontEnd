// BankService.ts
import APIClient from './APIClient';

class BankService {
    getBanks(): Promise<string[]> {
        return APIClient.get('/api/data/banques')
            .then(response => {
                return response.data.map((bankObj: { bank: string }) => bankObj.bank);
            })
            .catch(error => {
                console.error('Failed to fetch banks:', error);
                throw error;
            });
    }
}

export default new BankService();

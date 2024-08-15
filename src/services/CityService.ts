import APIClient from './APIClient';

class CityService {
    getCities(): Promise<string[]> {
        return APIClient.get('/api/data/villes')
            .then(response => {
                return response.data.map((cityObj: { city: string }) => cityObj.city);
            })
            .catch(error => {
                console.error('Failed to fetch cities:', error);
                throw error;
            });
    }
}

export default new CityService();

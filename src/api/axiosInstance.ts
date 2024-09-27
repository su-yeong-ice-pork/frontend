import axios from 'axios';

const apiClient = axios.create({
  baseURL:
    'https://grass-server-fua8cyfhabacbgbn.koreasouth-01.azurewebsites.net/api/v1',
});

export default apiClient;

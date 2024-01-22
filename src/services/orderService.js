import http from './httpService';

const apiEndpoint = '/orders';

export const createOrder = (data) => http.post(apiEndpoint, data);

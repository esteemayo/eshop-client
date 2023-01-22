import http from './httpService';

const apiEndpoint = '/checkout/payment';

export const stripePayment = (data) => http.post(apiEndpoint, data);

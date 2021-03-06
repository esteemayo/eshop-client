import http from './httpService';

const apiEndpoint = '/auth';
const tokenKey = 'accessToken';

export function login(credentials) {
  return http.post(`${apiEndpoint}/login`, credentials);
}

export function register(credentials) {
  return http.post(`${apiEndpoint}/register`, credentials);
}

export function getJWT() {
  return localStorage.getItem(tokenKey);
}

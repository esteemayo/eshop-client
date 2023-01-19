import http from './httpService';
import { tokenKey } from 'utils';

const apiEndpoint = '/auth';

export function login(credentials) {
  return http.post(`${apiEndpoint}/login`, credentials);
}

export function register(credentials) {
  return http.post(`${apiEndpoint}/register`, credentials);
}

export function getJWT() {
  return localStorage.getItem(tokenKey)?.accessToken;
}

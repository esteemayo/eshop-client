import http from './httpService';

const apiEndpoint = '/products';

const productUrl = (productId) => `${apiEndpoint}/${productId}`;

export const getProducts = (category, token) =>
  http.get(category ? `${apiEndpoint}?category=${category}` : apiEndpoint, { cancelToken: token });

export const getProductById = (productId) => http.get(productUrl(productId));

export const getProductBySlug = (slug, token) =>
  http.get(`${apiEndpoint}/details/${slug}`, { cancelToken: token });

export const createProduct = (data) => http.post(apiEndpoint, data);

export const updateProduct = (productId, data) =>
  http.patch(productUrl(productId), data);

export const deleteProduct = (productId) => http.delete(productUrl(productId));

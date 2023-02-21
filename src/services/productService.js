import http from './httpService';

const apiEndpoint = '/products';

const productUrl = (productId) => `${apiEndpoint}/${productId}`;

export const getProducts = (category) =>
  http.get(category ? `${apiEndpoint}?category=${category}` : apiEndpoint);

export const getProductById = (id) => http.get(productUrl(id));

export const getProductBySlug = (slug) =>
  http.get(`${apiEndpoint}/details/${slug}`);

export const createProduct = (data) => http.post(apiEndpoint, data);

export const updateProduct = (id, data) =>
  http.patch(productUrl(id), data);

export const deleteProduct = (id) => http.delete(productUrl(id));

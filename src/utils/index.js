export const tokenKey = 'accessToken';

export const getFromStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
}

export const setToStorage = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
}

export const removeFromStorage = (key) => {
  return localStorage.removeItem(key);
}

export const getUnique = (items, value) => {
  const newItems = items.map((item) => item[value]).flat();
  return [...new Set(newItems)];
}

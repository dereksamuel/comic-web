export const getStorage = (key) => {
  const result = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
  return result;
};

export const setStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

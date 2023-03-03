export const setLocalStorage = (key, item) => {
  localStorage.setItem(key, JSON.stringify(item));
};

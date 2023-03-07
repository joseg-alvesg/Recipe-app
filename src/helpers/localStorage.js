export const setLocalStorage = (key, item) => {
  try {
    localStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.error(`Error setting localStorage key "${key}"`, error);
  }
};

export const getLocalStorage = (key) => {
  if (typeof localStorage !== 'undefined') {
    const value = localStorage.getItem(key);
    if (value !== null) {
      try {
        return JSON.parse(value);
      } catch (error) {
        console.error(`Error parsing localStorage key "${key}"`, error);
      }
    }
  }
  return null;
};

export const fetchApi = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const fetchMeals = async (url, options) => {
  const data = await fetchApi(`${url}${options || ''}`);
  return data;
};

export const fetchDrinks = async (url, options) => {
  const data = await fetchApi(`${url}${options || ''}`);
  return data;
};

export const fetchMealCategories = async (url) => {
  const data = await fetchMeals(url);
  return data;
};

export const fetchDrinkCategories = async (url) => {
  const data = await fetchDrinks(url);
  return data;
};

export const fetchMealByCategory = async (url, category) => {
  const data = await fetchMeals(url, category);
  return data;
};

export const fetchDrinkByCategory = async (url, category) => {
  const data = await fetchDrinks(url, category);
  return data;
};

const URL = (type, radio, search) => {
  if (type === 'meals') {
    return `https://www.themealdb.com/api/json/v1/1/search.php?${radio}=${search}`;
  }
  if (type === 'drinks') {
    return `https://www.thecocktaildb.com/api/json/v1/1/search.php?${radio}=${search}`;
  }
};

const ingredientURL = (type, radio, search) => {
  if (type === 'meals') {
    return `https://www.themealdb.com/api/json/v1/1/filter.php?${radio}=${search}`;
  }
  if (type === 'drinks') {
    return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?${radio}=${search}`;
  }
};

const detailsURL = (id, type) => {
  if (type.includes('meals')) {
    return `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  }
  if (type.includes('drinks')) {
    return `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  }
};

export const recipeApi = async (radio, search, type) => {
  if (radio === 'i') {
    const response = await fetch(ingredientURL(type, radio, search));
    const json = await response.json();
    console.log(json);
    return response.ok ? Promise.resolve(json) : Promise.reject(json);
  }
  const response = await fetch(URL(type, radio, search));
  const json = await response.json();
  console.log(json);
  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export const detailsApi = async (id, type) => {
  const response = await fetch(detailsURL(id, type));
  const json = await response.json();
  console.log(json);
  if (type.includes('meals')) {
    return response.ok ? Promise.resolve(json.meals) : Promise.reject(json);
  }
  return response.ok ? Promise.resolve(json.drinks) : Promise.reject(json);
};

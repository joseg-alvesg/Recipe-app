export const mealsApi = async (radio, search) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/search.php?${radio}=${search}`;
  const ingredientsURL = `https://www.themealdb.com/api/json/v1/1/filter.php?${radio}=${search}`;
  if (radio === 'i') {
    const response = await fetch(ingredientsURL);
    const json = await response.json();
    console.log(json);
    return response.ok ? Promise.resolve(json) : Promise.reject(json);
  }
  const response = await fetch(URL);
  const json = await response.json();
  console.log(json);
  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export const drinksApi = async (radio, search) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?${radio}=${search}`;
  const ingredientsURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?${radio}=${search}`;

  if (radio === 'i') {
    const response = await fetch(ingredientsURL);
    const json = await response.json();
    console.log(json);
    return response.ok ? Promise.resolve(json) : Promise.reject(json);
  }
  const response = await fetch(URL);
  const json = await response.json();
  console.log(json);
  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

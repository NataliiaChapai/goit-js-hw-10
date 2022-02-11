const BASE_URL = 'https://restcountries.com/v2';
const FILTER_PATH = 'fields=name,capital,population,flags,languages'

export function fetchCountries(name) {
  return fetch(`${BASE_URL}/name/${name}?${FILTER_PATH}`)
    .then(response => {
    if (!response.ok) {
      return response.json().then(error => Promise.reject(error));
    }
    return response.json();
  });
}




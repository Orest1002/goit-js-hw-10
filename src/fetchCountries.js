const BASE_URL= ' https://restcountries.com/v3.1/name';

export function fetchCountries (name) {
    
      return fetch(`${BASE_URL}/${name}?fields=name,capital,population,languages,flags,`)
     .then(resp => {
        if(!resp.ok){
            throw new Error(resp.status)
        }
        return resp.json()
     }) ;
}

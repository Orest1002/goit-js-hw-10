// const BASE_URL= ' https://restcountries.com/v3.1/name';

// export function fetchCountries (name) {
    
//       return fetch(`${BASE_URL}/${name}?fields=name,capital,population,flags,languages`)
//      .then(resp => {
//         if(!resp.ok){
//             throw new Error(resp.status)
//         }
//         return resp.json()
//      })
// };
// function fetchCountries(name) {
//     const URL = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
//     return fetch(URL).then(resp => {
//       if (!resp.ok) {
//         throw new Error(Notiflix.Notify.failure(`Oops, there is no country with that name.`));
//       }
//       return resp.json();
//     });
//   }
//   export { fetchCountries };

  function fetchCountries(name) {
    const URL = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
    return fetch(URL)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Oops, there is no country with that name.');
      })
      .catch(error => {
        Notiflix.Notify.failure(error.message);
        return Promise.reject(error);
      });
  }
  export { fetchCountries };

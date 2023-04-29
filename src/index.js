import './css/styles.css';
import {fetchCountries} from './fetchCountries'
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';



const DEBOUNCE_DELAY = 300;



const search = document.querySelector('#search-box')
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info')

search.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(evt){
    evt.preventDefault()
    
   
      
    const inputValue = evt.target.value.trim();
    if (!inputValue) {
        resetMarkup(countryList);
        resetMarkup(countryInfo);
        return
    }




    fetchCountries(inputValue)
    .then(dataCountry => {
      if (dataCountry.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (dataCountry.length >= 2 || dataCountry.length <= 10) {
        resetMarkup(countryList);
        createMarkupList(dataCountry);
        resetMarkup(countryInfo);
      } else {
        resetMarkup(countryInfo);
        createMarkupInfo(dataCountry);
        resetMarkup(countryList);
      }
    })
    .catch(() => {
        resetMarkup(countryList);
        resetMarkup(countryInfo);
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });



}
function createMarkupList(dataCountry) {
    const markup = dataCountry
      .map(({ name, capital, population, flags, languages }) => { 
        return `<li><img src="${flags.svg}" alt="${name}" >
        <h2>${name.official}</h2>
        <h3>${capital}</h3>
        <p>${population}</p>
        <p>${Object.values(languages).join(',')}</p>
     </li>`;
      })
      .join('');
    return countryList.insertAdjacentHTML('beforeend', markup);
  }

  function resetMarkup(el) {
    el.innerHTML = '';
 }
function createMarkupInfo(dataCountry){
    return dataCountry.map(({ name, flags, })=> `
    <li><img src="${flags}" alt="${name}">
    <h2>${name}</h2>
 </li>`).join('');
 return countryList.insertAdjacentHTML('beforeend',markup);
}


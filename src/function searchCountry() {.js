import './css/styles.css';
import fetchCountries from './fetchCountries';
import Notiflix from 'notiflix';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
const qs = query => document.querySelector(query);
const serchBox = qs('#search-box');
const countryList = qs('.country-list');
const countryInfo = qs('.country-info');
const log = str => console.log(str);
const clear = elems => [...elems.children].forEach(li => li.remove());
let countriesSize;
serchBox.addEventListener('keydown', debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry() {
  let name = serchBox.value.trim();

  if (name.length > 0) {
    clear(countryList); // clear elements
    clear(countryInfo); // clear elements

    fetchCountries(name)
      .then(countrysPack => {
        return countrysPack.map(ele => {
          const { name, capital, population, flag, languages } = ele;
          return { name, capital, population, flag, languages }; //unpack needed variable
        });
      })
      .then(countries => {
        countriesSize = countries.length;

        if (countriesSize > 10) {
          Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        } else if (countriesSize > 1 && countriesSize < 11) {
          countries.forEach(ele => {
            const { name, flag } = ele;
            countryList.style = 'list-style-type: none; padding: 0'; // no dot, padding

            // countryList
            let listItem = document.createElement('li');
            countryList.append(listItem);

            let imgFlag = document.createElement('img');
            imgFlag.src = `${flag}`;
            imgFlag.alt = `flag-${name}`;
            imgFlag.width = `50`;
            listItem.append(imgFlag);

            let bName = document.createElement('b');
            bName.innerText = `${name}`;
            listItem.append(bName);
          });
        }
      })
      .then(countries => {
        countriesSize = countries.length;
        if (countriesSize === 1) {
          const { name, capital, population, flag, languages } = countries[0];

          let languagesStr =
            languages.length > 1 ? languages.map(elem => `${elem.name}`) : languages[0].name;

          // countryInfo
          let imgFlag = document.createElement('img');
          imgFlag.src = `${flag}`;
          imgFlag.alt = `flag-${name}`;
          imgFlag.width = `50`;
          countryInfo.append(imgFlag);

          let bName = document.createElement('b');
          bName.innerText = `${name}`;
          countryInfo.append(bName);

          let pCapital = document.createElement('p');
          pCapital.innerHTML = `<b>Capital:</b> ${capital}`;
          countryInfo.append(pCapital);

          let pPopulation = document.createElement('p');
          pPopulation.innerHTML = `<b>Population:</b> ${population}`;
          countryInfo.append(pPopulation);

          let pLang = document.createElement('p');
          pLang.innerHTML = `<b>Languages:</b> ${languagesStr}`;
          countryInfo.append(pLang);
        }
      })
      .catch(er => {
        log(er);
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
  }
}

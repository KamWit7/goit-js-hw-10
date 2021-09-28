import './css/styles.css';
import fetchCountries from './fetchCountries';
import Notiflix from 'notiflix';

const qs = query => document.querySelector(query);
const log = str => console.log(str);
const clear = elems => [...elems.children].forEach(li => li.remove());
const DEBOUNCE_DELAY = 300;
const serchBox = qs('#search-box');
const countryList = qs('.country-list');
const countryInfo = qs('.country-info');
const debounce = require('lodash.debounce');
let countriesSize;

serchBox.addEventListener('keydown', debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry() {
  let name = serchBox.value.trim();

  if (name.length > 0) {
    clear(countryList); // clear elements
    clear(countryInfo); // clear elements

    fetchCountries(name)
      .then(countrysPack => {
        return countrysPack.map(country => {
          let { name, capital, population, flag, languages } = country;
          return { name, capital, population, flag, languages }; //unpack needed variable
        });
      })
      .then(countries => {
        countriesSize = countries.length;

        if (countriesSize > 10) {
          Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        } else if (countriesSize > 1 && countriesSize < 11) {
          countries.forEach(ele => {
            let { name, flag } = ele;

            countryList.style.listStyleType = 'none'; // no dot
            countryList.style.padding = '0'; // no padding

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
        return countries;
      })
      .then(country => {
        countriesSize = country.length; // can be biger then 1

        if (countriesSize === 1) {
          let { name, capital, population, flag, languages } = country[0];

          let languageStr =
            languages.length > 1 ? languages.map(elem => `${elem.name}`) : languages[0].name; // create one string from langs

          // countryInfo
          let imgFlag = document.createElement('img');
          imgFlag.src = `${flag}`;
          imgFlag.alt = name == !'💩' ? `flag-${name}` : 'Server Error 💩'; // 💩 when server problem
          imgFlag.width = `50`;
          countryInfo.append(imgFlag);

          let bName = document.createElement('b');
          bName.innerHTML = `${name}`;
          countryInfo.append(bName);

          let pCapital = document.createElement('p');
          pCapital.innerHTML = `<b>Capital:</b> ${capital}`;
          countryInfo.append(pCapital);

          let pPopulation = document.createElement('p');
          pPopulation.innerHTML = `<b>Population:</b> ${population}`;
          countryInfo.append(pPopulation);

          let pLang = document.createElement('p');
          pLang.innerHTML = `<b>Languages:</b> ${languageStr}`;
          countryInfo.append(pLang);
        }
      })
      .catch(er => {
        log(er);
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
  }
}

import './css/styles.css';
import fetchCountries from './fetchCountries';
import Notiflix from 'notiflix';
/*
Notiflix.Notify.success('Success message text');
Notiflix.Notify.failure('Failure message text');
Notiflix.Notify.warning('Warning message text');
Notiflix.Notify.info('Info message text');

if country > 10 "Too many matches found. Please enter a more specific name."
2-10 country = good
not found 404 "Oops, there is no country with that name"
 */
var debounce = require('lodash.debounce');
const qs = query => document.querySelector(query);

const DEBOUNCE_DELAY = 300;
let countries = [];
const serchBox = qs('#search-box');
const countryList = qs('country-list');
const countryInfo = qs('country-info');
let name;
serchBox.addEventListener('keydown', () => {
  name = serchBox.value.trim();
  if (name.length > 0) {
    fetchCountries(name).then(res =>
      res.forEach(ele => {
        const { name, capital, population, flag, languages } = ele;
        // countries.push({
        //   name: ele.name,
        //   capital: ele.capital,
        //   population: ele.population,
        //   flag: ele.flag,
        //   languages: ele.languages,
        // });
        console.log(name);
        console.log(capital);
        console.log(population);
        console.log(flag);
        console.log(languages);
      }),
    );
  }
});



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

const serchBox = qs('#search-box');
const countryList = qs('country-list');
const countryInfo = qs('country-info');
let name;

serchBox.addEventListener('keydown', () => {
  name = serchBox.value.trim();
  if (name.length > 0) {
    fetchCountries(name)
      .then(res => {
        let countries = [];
        res.forEach(ele => {
          const { name, capital, population, flag, languages } = ele;
          countries.push({ name, capital, population, flag, languages });
        });
        return countries;
      })
      .then(coun => {
        let countriesSize = coun.length;
        if (countriesSize > 10) {
        } else if (countriesSize < 11 && countriesSize > 1) {
        } else if (countriesSize === 1) {
        }
      });
  }
});

export default function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flag,languages`,
  ).then(res => {
    if (!res.ok) {
      // throw new Error(`resonse error: ${res.status}`);
      return placecholderUX;
    } else {
      return res.json();
    }
  });
}
// const serchParams = new URLSearchParams({+
//   fields: `name;capital;population;flag;languages`,
// });

const placecholderUX = [
  {
    name: '<br>name: 💩',
    capital: '💩',
    population: '💩',
    flag: '',
    languages: [{ name: '💩' }],
  },
];

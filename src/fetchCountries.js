export default function fetchCountries(name) {
  return fetch(`https://restcountries.eu/rest/v2/name/${name}?${serchParams}`).then(res => {
    if (!res.ok) {
      throw new Error(`resonse error: ${res.status}`);
    }
    return res.json();
  });
}
const serchParams = new URLSearchParams({
  fields: `name;capital;population;flag;languages`,
});

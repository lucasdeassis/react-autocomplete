/* eslint-disable no-undef */

import Autocomplete from './Autocomplete.js';

const rootNode = document.getElementById('autocomplete');
const root = ReactDOM.createRoot(rootNode);
root.render(
  React.createElement(Autocomplete, {
    id: 'country-search',
    name: 'country',
    label: 'Country:',
    placeholder: 'search country...',
    autocomplete: 'country-name',
    getOptions: () =>
      fetch('https://restcountries.com/v2/all?fields=name,alpha2Code')
        .then((response) => response.json())
        .then((data) =>
          data.map((country) => ({
            value: country.alpha2Code,
            name: country.name,
          }))
        ),
    focusMe: true,
  })
);

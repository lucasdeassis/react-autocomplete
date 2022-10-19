/* eslint-disable no-undef */

import Autocomplete from './Autocomplete.js';

const rootNode = document.getElementById('autocomplete');
const root = ReactDOM.createRoot(rootNode);
root.render(
  React.createElement(Autocomplete, { id: 'country-search', name: 'country' })
);

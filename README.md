# react-autocomplete

auto-complete component in React TypeScript

## Install

In a terminal, run `npm install` in project root. You'll need at least Node 16

## Build

2. Now run `npm run serve` to compile and watch `tsx` to `dist` folder. Check `tsconfig.json` setup. Now every change to `Autocomplete.tsx` should be recompiled to `dist`.
3. The `dist` folder has a sample `app.js` file with React `DOM` setup, a CSS File and an HTML File with React scripts. You can start a server on `dist` and open a browser locally. In a new terminal session, try:

```
npx http-server dist/
```

## TODO:

For this component, please consider the following functionality edge-cases:

- Support React 18 Server Components
- Add testing for component logic with Node 19 (Experimental) Test Runner
- Use overflow scroll and more detailed style for auto complete options, keyboard navigation and select
- Use `swc` for compilation
- Allow custom CSS Classnames
- Use API for "search by" query and typeahead. API Controls more robust searches and optimize the data fetching
- Throttle API Requests
- Style `<datalist>`

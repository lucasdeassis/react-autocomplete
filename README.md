# react-autocomplete

auto-complete component in React TypeScript

## Edge Cases

For this component, please consider the following functionality edge-cases:

- Support React 18 Server Components
- Support Node LTS 16
- Flexible `Options` or `Promise<Options>` support
- Isolate logic to filter from component rendering
- Add testing for component logic with Node 19 (Experimental) Test Runner
- Handle empty/spaces input, non-ASC chars
- Take a max length, flexible as a prop change
- Use overflow scroll for auto complete options, keyboard navigation and select
- Auto-complete sequential letters, anywhere within the option: word start, word end, middle
- Autofill the input field (autocomplete) as a prop. `true` by default
- Highlight part of the text should be accessible through `<mark>` HTML Element and `::before` Element hints
- Use list of countries as a dataset
- Use `Fetch` API and handle API errors, maintaining previous component state. Catch all approach and log to console
- Define package as a module and add source compilation with `tsc`. Allow js-only import and usage
- Use `swc` for compilation
- Allow custom css classname

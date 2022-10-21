# Questions

1. From React standpoint, components are like functions and a pure component is a component that doesn't bring side effects on its inner computations, i.e., doen't alter data outside of its scope and brings deterministic outputs on render. An example of side effect that could break an App that's not using Pure Components is if a parent component passes props to its children and one children alters the props received

2. It's usually good to refer to a single source of truth for components data source and rendering. If Context + ShouldComponentUpdate are both used along, it's gonna be hard to determine what piece of code caused a specific rerender or brought the component to a specific snapshot

3. We can use Context API, with or without a Reducer combined, to trigger state changes that affect a sub tree of an App; We can use Render Props / Callbacks, so that the children components can call predefined functions passing params up the App tree;

4. First way is make sure your component receives normalized, single-level props and not object-combined ones since react diff computation on nested objects is more expensive and cannot be deterministic on multiple sub levels; second is to make sure to declare correct dependencies on your hooks to avoid in critical cases infinite rerendering and unnecessary rerendering if dependency is not affecting the hook

5. We use Fragment to return multiple children from a single React component. We need Fragments because a Component is a function and can only have a single return value. Using Fragment might break your app if you return dynamic children and one child component returns multiple values

6. HOC are used for generic error catching and handling (e.g., bugsnag setup, sentry, logging); Component decoration for static/determined data injection (e.g., mapStateToProps)

7. Handling exceptions in promises are nested according to the subsequent `then`, `catch`, and according to `onSuccess` and `onFailure` callbacks. If you define an `onFailure` block on a deep nested promise chain and there's an error up in the chain, it won't get caught unless you have an upper `catch` block. `Async/Await` have single-level error handling and `finally` block which is easier to deal with error chaining and value fallback. One can define an `Async/Await` block in a level and treat errors in a more clear way

8. `setState` takes one argument which can be the new value of the state you want to set or a state computation function that provides the previous value of the state to tell what's the new one. It's async because React can perform state updates in batch or in a more optimistic way

9. Steps are: move Class static definitions to constants; Convert lifecycle methods to matching hooks when applicable; extract Class data/state definition to a `Context` or to a `useReducer` when applicable;

10. Styles can be used with components unscoped `className` (global css classes); with the `style` property on React HTML Elements (inline); CSS along with JS with precompiled tools (e.g., `styled-components`, `styled-jsx`), `CSS Modules` (hashed classes), SASS/SCSS (Requires post-css setup)

11. React offers a `dangerouslySetInnerHTML` which you can just render an HTML String, but that's an unsafe method and whatever source the HTML comes from should be trusted. Other way can be accessing the React `createElement` API and parse through the HTML String to create each individual HTML Element. That's usually more easily done by going over a structured map with `key` HTML Elements and `string` values. One good example of the latter is on parsing `Markdown` text that contains mixed HTML.

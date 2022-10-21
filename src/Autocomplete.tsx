const AUTOCOMPLETE_MIN_LENGTH = 3;
const SEARCH_TEXT_REGEX = /[^a-zA-Z ]/g;

export type AutocompleteRef = HTMLInputElement;
export type AutocompleteOption = { name: string; value: string };

export interface AutocompleteProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  label: string;
  getOptions: () => Promise<AutocompleteOption[]>;
  autoCompleteMinLength?: number;
  focusMe?: boolean;
}

const Autocomplete = (
  {
    id,
    name,
    label,
    placeholder,
    getOptions,
    autoCompleteMinLength = AUTOCOMPLETE_MIN_LENGTH,
    focusMe,
    ...props
  }: AutocompleteProps,
  ref: React.RefObject<HTMLInputElement>
) => {
  /* @ts-ignore 'React' import: using react 18 min umd */
  const fallbackRef = React.useRef<HTMLInputElement>(null);
  /* @ts-ignore 'React' import: using react 18 min umd */
  const [value, setValue] = React.useState<string>('');
  /* @ts-ignore 'React' import: using react 18 min umd */
  const [suggestions, setSuggestions] = React.useState<AutocompleteOption[]>();
  /* @ts-ignore 'React' import: using react 18 min umd */
  const inputRef = ref || fallbackRef;

  /* @ts-ignore 'React' import: using react 18 min umd */
  React.useLayoutEffect(() => {
    focusMe && inputRef.current?.focus();
  }, [focusMe, inputRef]);

  /* @ts-ignore 'React' import: using react 18 min umd */
  React.useEffect(() => {
    async function loadSuggestions() {
      try {
        const search = value.trim().replace(SEARCH_TEXT_REGEX, '');

        if (search.length < autoCompleteMinLength) {
          setSuggestions(undefined);
          return;
        }

        const options = await getOptions();

        setSuggestions(
          options.filter(({ name }) =>
            name.toLowerCase().includes(search.toLowerCase())
          )
        );
      } catch (error) {
        console.error(error);
        setSuggestions(undefined);
      }
    }

    loadSuggestions();
  }, [value, autoCompleteMinLength, getOptions]);

  return (
    /* @ts-ignore 'React' import: using react 18 min umd */
    <div className='react-autocomplete'>
      {/* @ts-ignore 'React' import: using react 18 min umd */}
      <label htmlFor={id}>{label}</label>
      {/* @ts-ignore 'React' import: using react 18 min umd */}
      <input
        id={id}
        name={name}
        placeholder={placeholder}
        type='search'
        className='react-autocomplete'
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        {...props}
      />

      {suggestions && (
        /* @ts-ignore 'React' import: using react 18 min umd */
        <output htmlFor={id}>
          {suggestions.map(({ name }) => name).toString()}
        </output>
      )}
    </div>
  );
};

/* @ts-ignore 'React' import: using react 18 min umd */
export default React.forwardRef(Autocomplete);

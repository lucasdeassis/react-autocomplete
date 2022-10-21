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

export interface SuggestionsProps
  extends React.InputHTMLAttributes<HTMLDataListElement> {
  id: string;
  search: string;
  options?: AutocompleteOption[];
  loading?: boolean;
}

function Loading() {
  return (
    /* @ts-ignore 'React' import: using react 18 min umd */
    <svg
      width='1em'
      height='1em'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 512 512'
      aria-labelledby='loading'
      className='react-autocomplete-loading'
    >
      {/* @ts-ignore 'React' import: using react 18 min umd */}
      <title id='loading'>Loading...</title>
      {/* @ts-ignore 'React' import: using react 18 min umd */}
      <path
        fill='currentColor'
        d='M288 39.056v16.659c0 10.804 7.281 20.159 17.686 23.066C383.204 100.434 440 171.518 440 256c0 101.689-82.295 184-184 184-101.689 0-184-82.295-184-184 0-84.47 56.786-155.564 134.312-177.219C216.719 75.874 224 66.517 224 55.712V39.064c0-15.709-14.834-27.153-30.046-23.234C86.603 43.482 7.394 141.206 8.003 257.332c.72 137.052 111.477 246.956 248.531 246.667C393.255 503.711 504 392.788 504 256c0-115.633-79.14-212.779-186.211-240.236C302.678 11.889 288 23.456 288 39.056z'
      />
    </svg>
  );
}

function Suggestions({
  id,
  search,
  options,
  loading,
  ...props
}: SuggestionsProps) {
  /* @ts-ignore 'React' import: using react 18 min umd */
  const selectRef = React.useRef<HTMLSelectElement>(null);

  function highlightMatch(optionName: AutocompleteOption['name']): string {
    const regex = new RegExp(search, 'gi');

    return optionName.replace(
      regex,
      '<mark class="react-autocomplete-output-select-option-mark">$&</mark>'
    );
  }

  /* @ts-ignore 'React' import: using react 18 min umd */
  React.useLayoutEffect(() => {
    if (options?.length) {
      selectRef.current?.focus();
      selectRef.current?.click();
    }
  }, [options, selectRef]);

  return (
    /* @ts-ignore 'React' import: using react 18 min umd */
    <output htmlFor={id} className='react-autocomplete-output'>
      {/* @ts-ignore 'React' import: using react 18 min umd  */}
      {loading && <Loading />}

      {options && (
        /* @ts-ignore 'React' import: using react 18 min umd */
        <datalist
          id={id}
          ref={selectRef}
          className='react-autocomplete-output-datalist'
          {...props}
        >
          {options.map(({ name, value }) => (
            /* @ts-ignore 'React' import: using react 18 min umd */
            <option
              key={value}
              value={name}
              className='react-autocomplete-output-datalist-option'
              dangerouslySetInnerHTML={{ __html: highlightMatch(name) }}
            />
          ))}
        </datalist>
      )}
    </output>
  );
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
  const [loading, setLoading] = React.useState<boolean>(false);
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

        setLoading(true);

        const options = await getOptions();
        const suggestionsOptions = options.filter(({ name }) =>
          name.toLowerCase().includes(search.toLowerCase())
        );

        if (
          // avoid suggestions on exact match
          suggestionsOptions.length === 1 &&
          suggestionsOptions[0].name === search
        ) {
          setSuggestions(undefined);
          return;
        }

        setSuggestions(suggestionsOptions);
      } catch (error) {
        console.error(error);
        setSuggestions(undefined);
      } finally {
        setLoading(false);
      }
    }

    loadSuggestions();
  }, [value, autoCompleteMinLength, getOptions]);

  return (
    /* @ts-ignore 'React' import: using react 18 min umd */
    <div className='react-autocomplete'>
      {/* @ts-ignore 'React' import: using react 18 min umd */}
      <label className='react-autocomplete-label' htmlFor={id}>
        {label}
      </label>
      {/* @ts-ignore 'React' import: using react 18 min umd */}
      <input
        id={id}
        name={name}
        placeholder={placeholder}
        list={`${id}-suggestions`}
        type='search'
        ref={inputRef}
        className='react-autocomplete-input'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        {...props}
      />

      {/* @ts-ignore 'React' import: using react 18 min umd */}
      <Suggestions
        id={`${id}-suggestions`}
        search={value}
        options={suggestions}
        loading={loading}
      />
    </div>
  );
};

/* @ts-ignore 'React' import: using react 18 min umd */
export default React.forwardRef(Autocomplete);

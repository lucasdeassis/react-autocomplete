export interface AutocompleteProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
}

const Autocomplete = ({
  id,
  name,
  placeholder,
  ...props
}: AutocompleteProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  if (inputRef.current) {
    console.log('input value', inputRef.current.value);
  }

  return (
    <input
      id={id}
      name={name}
      placeholder={placeholder}
      type='search'
      className='react-autocomplete'
      ref={inputRef}
      {...props}
    />
  );
};

export default Autocomplete;

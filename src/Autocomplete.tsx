export interface AutocompleteProps {
  id: string;
  name: string;
  fill?: boolean;
}

const Autocomplete = ({
  id,
  name,
  fill = true,
  ...props
}: AutocompleteProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  console.log('fill', fill);

  if (inputRef.current) {
    console.log('input value', inputRef.current.value);
  }

  return (
    <input
      id={id}
      name={name}
      type='search'
      className='react-autocomplete'
      ref={inputRef}
      {...props}
    />
  );
};

export default Autocomplete;

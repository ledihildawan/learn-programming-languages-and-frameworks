import { ChangeEvent, useEffect, useState } from 'react';

type Props = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export default function TwoWayDataBinding({
  id,
  label,
  value,
  onChange,
}: Props) {
  const [inputValue, setInputValue] = useState(value);

  function handleInput(event: ChangeEvent<HTMLInputElement>): void {
    setInputValue(event.target.value);
  }

  useEffect(() => {
    onChange(inputValue);
  }, [inputValue, onChange]);

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} defaultValue={value} type="text" onChange={handleInput} />
    </>
  );
}

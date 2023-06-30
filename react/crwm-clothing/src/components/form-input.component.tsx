import { FormInputLabel, Input, Group } from './form-input.styles';

export default function FormInput({ label, ...otherProps }) {
  return (
    <Group>
      {label && (
        <FormInputLabel
          htmlFor={otherProps.id}
          shrink={otherProps.value.length}
        >
          {label}
        </FormInputLabel>
      )}
      <Input {...otherProps} />
    </Group>
  );
}

import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import * as Label from '@radix-ui/react-label';
import { ErrorMessage } from '@hookform/error-message';
import cn from '@/utilities/cn';

type FormFieldProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string;
  errors: FieldErrors;
};

const FormField = forwardRef<
  HTMLInputElement,
  FormFieldProps & ReturnType<UseFormRegister<FieldValues>>
>(
  (
    {
      onChange,
      onBlur,
      name,
      label,
      placeholder,
      type = 'text',
      errors,
      className,
      ...rest
    },
    ref,
  ) => (
    <div className="grid gap-2">
      <Label.Root className="text-md font-bold" htmlFor={name}>
        {label}
      </Label.Root>
      <input
        className={
          'dark:text-dark-typography-primary text-light-typography-primary dark:placeholder-dark-typography-contrast placeholder-light-typography-contrast  p-2 py-3 bg-transparent font-bold placeholder:font-bold'
        }
        name={name}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        id={name}
        ref={ref}
        aria-invalid={errors[name] ? 'true' : 'false'}
        aria-errormessage={`validation-error-${name}`}
      />

      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <p id={`validation-error-${name}`} className="text-utility-error">
            {message}
          </p>
        )}
      />
    </div>
  ),
);

FormField.displayName = 'FormField';

export default FormField;

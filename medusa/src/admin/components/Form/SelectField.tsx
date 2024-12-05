import { Label, clx, Select } from '@medusajs/ui';
import { useController, ControllerRenderProps } from 'react-hook-form';

export interface SelectFieldProps {
  className?: string;
  name: string;
  label?: string;
  labelProps?: React.ComponentProps<typeof Label>;
  selectProps?: Omit<
    React.ComponentProps<typeof Select>,
    'name' | 'id' | keyof ControllerRenderProps
  >;
  isRequired?: boolean;
  children?: React.ReactNode;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  className,
  name,
  label,
  labelProps,
  selectProps,
  isRequired,
  children,
}) => {
  const { field, fieldState } = useController<{ __name__: string }, '__name__'>(
    { name: name as '__name__' },
  );

  return (
    <div className={className}>
      {typeof label !== 'undefined' && (
        <Label
          {...labelProps}
          htmlFor={name}
          className={clx('block mb-1', labelProps?.className)}
        >
          {label}
          {isRequired ? <span className="text-red-500">*</span> : ''}
        </Label>
      )}
      <Select
        {...selectProps}
        onValueChange={field.onChange}
        onOpenChange={(open) => {
          if (!open) {
            field.onBlur();
          }
        }}
        value={field.value || ''}
        name={field.name}
        required={isRequired}
      >
        {children}
      </Select>
      {fieldState.error && (
        <div className="text-red-500 text-sm mt-1">
          {fieldState.error.message}
        </div>
      )}
    </div>
  );
};

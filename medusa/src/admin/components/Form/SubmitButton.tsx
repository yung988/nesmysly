import { Button } from '@medusajs/ui';
import { useFormState } from 'react-hook-form';

export const SubmitButton: React.FC<React.ComponentProps<typeof Button>> = (
  props
) => {
  const { isSubmitting } = useFormState();
  return (
    <Button
      {...props}
      type="submit"
      isLoading={isSubmitting || props.isLoading}
      disabled={isSubmitting || props.disabled}
    />
  );
};

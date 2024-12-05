import * as React from 'react';
import { z } from 'zod';
import { Button, Drawer } from '@medusajs/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Form } from './Form/Form';
import { InputField } from './Form/InputField';

export const materialFormSchema = z.object({
  name: z.string(),
});

export const EditMaterialDrawer: React.FC<{
  id: string;
  initialValues: z.infer<typeof materialFormSchema>;
  children: React.ReactNode;
}> = ({ id, initialValues, children }) => {
  const queryClient = useQueryClient();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const updateMaterialMutation = useMutation({
    mutationKey: ['fashion', 'update'],
    mutationFn: async (values: z.infer<typeof materialFormSchema>) => {
      return fetch(`/admin/fashion/${id}`, {
        method: 'POST',
        body: JSON.stringify(values),
        credentials: 'include',
      }).then((res) => res.json());
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'fashion',
      });
    },
  });

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <Drawer.Trigger asChild>{children}</Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Edit Material</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <Form
            schema={materialFormSchema}
            onSubmit={async (values) => {
              await updateMaterialMutation.mutateAsync(values);
              setIsDrawerOpen(false);
            }}
            formProps={{
              id: `edit-material-${id}-form`,
            }}
            defaultValues={initialValues}
          >
            <InputField name="name" label="Name" />
          </Form>
        </Drawer.Body>
        <Drawer.Footer>
          <Drawer.Close asChild>
            <Button variant="secondary">Cancel</Button>
          </Drawer.Close>
          <Button
            type="submit"
            form={`edit-material-${id}-form`}
            isLoading={updateMaterialMutation.isPending}
          >
            Update
          </Button>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  );
};

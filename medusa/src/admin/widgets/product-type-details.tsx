import * as React from 'react';
import { defineWidgetConfig } from '@medusajs/admin-sdk';
import { DetailWidgetProps, AdminCollection } from '@medusajs/framework/types';
import { Container, Heading, Button, Drawer, Text } from '@medusajs/ui';
import { PencilSquare } from '@medusajs/icons';
import { z } from 'zod';
import { ImageField, imageFieldSchema } from '../components/Form/ImageField';
import { Form } from '../components/Form/Form';

const detailsFormSchema = z.object({
  image: imageFieldSchema().optional(),
});

const UpdateDetailsDrawer: React.FC<{
  children: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
  title: React.ReactNode;
  initialValue: z.infer<typeof detailsFormSchema>;
  onSave: (values: z.infer<typeof detailsFormSchema>) => void;
}> = ({ children, isOpen, onOpenChange, id, title, initialValue, onSave }) => {
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <Drawer.Trigger asChild>{children}</Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>{title}</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body className="p-4">
          <Form
            schema={detailsFormSchema}
            onSubmit={async (values) => {
              await fetch(`/admin/custom/product-types/${id}/details`, {
                method: 'POST',
                body: JSON.stringify(values),
                credentials: 'include',
              });

              onSave(values);
            }}
            defaultValues={initialValue}
            formProps={{
              id: `edit-product-type-${id}-fields`,
            }}
          >
            <div className="flex flex-col gap-4">
              <ImageField
                name="image"
                label="Image"
                dropzoneRootClassName="h-60"
              />
            </div>
          </Form>
        </Drawer.Body>
        <Drawer.Footer>
          <Drawer.Close asChild>
            <Button variant="secondary">Cancel</Button>
          </Drawer.Close>
          <Button type="submit" form={`edit-product-type-${id}-fields`}>
            Save
          </Button>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  );
};

const ProductTypeDetailsWidget = ({
  data,
}: DetailWidgetProps<AdminCollection>) => {
  const [isEditModalOpen, setIsModalOpen] = React.useState(false);
  const [details, setDetails] = React.useState<z.infer<
    typeof detailsFormSchema
  > | null>(null);

  React.useEffect(() => {
    fetch(`/admin/custom/product-types/${data.id}/details`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((json) => {
        setDetails(json);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [data.id]);

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading>Details</Heading>
        {details !== null && (
          <UpdateDetailsDrawer
            isOpen={isEditModalOpen}
            onOpenChange={setIsModalOpen}
            title="Update description"
            id={data.id}
            initialValue={details}
            onSave={(value) => {
              setDetails(value);
              setIsModalOpen(false);
            }}
          >
            <Button
              variant="transparent"
              size="small"
              className="text-ui-fg-muted hover:text-ui-fg-subtle"
              onClick={(event) => {
                event.preventDefault();
                setIsModalOpen(true);
              }}
            >
              <PencilSquare /> Edit
            </Button>
          </UpdateDetailsDrawer>
        )}
      </div>
      <div className="text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4">
        {details === null ? (
          <Text>Loading...</Text>
        ) : (
          <div className="flex flex-col gap-2">
            {typeof details.image?.url === 'string' ? (
              <div>
                <img
                  src={details.image.url}
                  className="max-h-60 max-w-none w-auto"
                />
              </div>
            ) : (
              <Text>No image</Text>
            )}
          </div>
        )}
      </div>
    </Container>
  );
};

export const config = defineWidgetConfig({
  zone: 'product_type.details.after',
});

export default ProductTypeDetailsWidget;

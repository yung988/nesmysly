import * as React from 'react';
import { defineWidgetConfig } from '@medusajs/admin-sdk';
import { DetailWidgetProps, AdminCollection } from '@medusajs/framework/types';
import { Container, Heading, Button, Drawer, Text } from '@medusajs/ui';
import { PencilSquare } from '@medusajs/icons';
import { z } from 'zod';
import { ImageField, imageFieldSchema } from '../components/Form/ImageField';
import { Form } from '../components/Form/Form';
import { TextareaField } from '../components/Form/TextareaField';
import { InputField } from '../components/Form/InputField';

const detailsFormSchema = z.object({
  image: imageFieldSchema().optional(),
  description: z.string().optional(),
  collection_page_image: imageFieldSchema().optional(),
  collection_page_heading: z.string().optional(),
  collection_page_content: z.string().optional(),
  product_page_heading: z.string().optional(),
  product_page_image: imageFieldSchema().optional(),
  product_page_wide_image: imageFieldSchema().optional(),
  product_page_cta_image: imageFieldSchema().optional(),
  product_page_cta_heading: z.string().optional(),
  product_page_cta_link: z.string().optional(),
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
      <Drawer.Content className="max-h-full">
        <Drawer.Header>
          <Drawer.Title>{title}</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body className="p-4 overflow-auto">
          <Form
            schema={detailsFormSchema}
            onSubmit={async (values) => {
              await fetch(`/admin/custom/collections/${id}/details`, {
                method: 'POST',
                body: JSON.stringify(values),
                credentials: 'include',
              });

              onSave(values);
            }}
            defaultValues={initialValue}
            formProps={{
              id: `edit-collection-${id}-fields`,
            }}
          >
            <div className="flex flex-col gap-4">
              <ImageField
                name="image"
                label="Image"
                dropzoneRootClassName="h-60"
              />
              <TextareaField name="description" label="Description" />
              <ImageField
                name="collection_page_image"
                label="Collection page image"
                dropzoneRootClassName="h-60"
              />
              <InputField
                name="collection_page_heading"
                label="Collection page heading"
              />
              <TextareaField
                name="collection_page_content"
                label="Collection page content"
              />
              <InputField
                name="product_page_heading"
                label="Product page heading"
              />
              <ImageField
                name="product_page_image"
                label="Product page image"
                dropzoneRootClassName="h-60"
              />
              <ImageField
                name="product_page_wide_image"
                label="Product page wide image"
                dropzoneRootClassName="h-60"
              />
              <ImageField
                name="product_page_cta_image"
                label="Product page CTA image"
                dropzoneRootClassName="h-60"
              />
              <InputField
                name="product_page_cta_heading"
                label="Product page CTA heading"
              />
              <InputField
                name="product_page_cta_link"
                label="Product page CTA link label"
              />
            </div>
          </Form>
        </Drawer.Body>
        <Drawer.Footer>
          <Drawer.Close asChild>
            <Button variant="secondary">Cancel</Button>
          </Drawer.Close>
          <Button type="submit" form={`edit-collection-${id}-fields`}>
            Save
          </Button>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  );
};

const CollectionDetailsWidget = ({
  data,
}: DetailWidgetProps<AdminCollection>) => {
  const [isEditModalOpen, setIsModalOpen] = React.useState(false);
  const [details, setDetails] = React.useState<z.infer<
    typeof detailsFormSchema
  > | null>(null);

  React.useEffect(() => {
    fetch(`/admin/custom/collections/${data.id}/details`, {
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
            title="Update collection details"
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
            {typeof details.image?.url === 'string' && (
              <div>
                <img
                  src={details.image.url}
                  className="max-h-60 max-w-none w-auto"
                />
              </div>
            )}
            {(details.description?.length ?? 0) > 0 && (
              <Text>{details.description}</Text>
            )}

            {typeof details.image?.url !== 'string' && !details.description && (
              <Text>No details available</Text>
            )}

            <Heading>Collection Page</Heading>

            {typeof details.collection_page_image?.url === 'string' && (
              <div>
                <img
                  src={details.collection_page_image.url}
                  className="max-h-60 max-w-none w-auto"
                />
              </div>
            )}
            {(details.collection_page_heading?.length ?? 0) > 0 && (
              <Text>{details.collection_page_heading}</Text>
            )}
            {(details.collection_page_content?.length ?? 0) > 0 && (
              <Text>{details.collection_page_content}</Text>
            )}

            {typeof details.collection_page_image?.url !== 'string' &&
              !details.collection_page_heading &&
              !details.collection_page_content && (
                <Text>Collection page details not entered</Text>
              )}

            <Heading>Product Page</Heading>

            {typeof details.product_page_heading?.length === 'string' && (
              <Text>{details.product_page_heading}</Text>
            )}

            {typeof details.product_page_image?.url === 'string' && (
              <div>
                <img
                  src={details.product_page_image.url}
                  className="max-h-60 max-w-none w-auto"
                />
              </div>
            )}

            {typeof details.product_page_wide_image?.url === 'string' && (
              <div>
                <img
                  src={details.product_page_wide_image.url}
                  className="max-h-60 max-w-none w-auto"
                />
              </div>
            )}

            {typeof details.product_page_cta_image?.url === 'string' && (
              <div>
                <img
                  src={details.product_page_cta_image.url}
                  className="max-h-60 max-w-none w-auto"
                />
              </div>
            )}

            {(details.product_page_cta_heading?.length ?? 0) > 0 && (
              <Text>{details.product_page_cta_heading}</Text>
            )}

            {(details.product_page_cta_link?.length ?? 0) > 0 && (
              <Text>{details.product_page_cta_link}</Text>
            )}

            {typeof details.product_page_heading?.length !== 'string' &&
              typeof details.product_page_image?.url !== 'string' &&
              typeof details.product_page_wide_image?.url !== 'string' &&
              typeof details.product_page_cta_image?.url !== 'string' &&
              !details.product_page_cta_heading &&
              !details.product_page_cta_link && (
                <Text>Product page details not entered</Text>
              )}
          </div>
        )}
      </div>
    </Container>
  );
};

export const config = defineWidgetConfig({
  zone: 'product_collection.details.after',
});

export default CollectionDetailsWidget;

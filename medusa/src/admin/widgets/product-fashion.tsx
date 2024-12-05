import * as React from 'react';
import { defineWidgetConfig } from '@medusajs/admin-sdk';
import { DetailWidgetProps, AdminProduct } from '@medusajs/framework/types';
import {
  Container,
  Heading,
  Text,
  Button,
  Drawer,
  IconButton,
} from '@medusajs/ui';
import { ArrowPath, PlusMini } from '@medusajs/icons';
import { z } from 'zod';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { MaterialModelType } from '../../modules/fashion/models/material';

import { Form } from '../components/Form/Form';
import { withQueryClient } from '../components/QueryClientProvider';
import {
  useCreateColorMutation,
  useCreateMaterialMutation,
} from '../hooks/fashion';
import { InputField } from '../components/Form/InputField';

// const SelectColorField: React.FC<{
//   name: string;
// }> = ({ name }) => {
//   const materialsQuery = useInfiniteQuery({
//     queryKey: ['fashion'],
//     queryFn: async ({ pageParam = 1, signal }) => {
//       const res = await fetch(`/admin/fashion?page=${pageParam}`, {
//         credentials: 'include',
//         signal,
//       });

//       return res.json() as Promise<{
//         materials: MaterialModelType[];
//         count: number;
//         page: number;
//         last_page: number;
//       }>;
//     },
//     initialPageParam: 1,
//     getNextPageParam: (lastPage) => {
//       return lastPage.page < lastPage.last_page ? lastPage.page + 1 : undefined;
//     },
//     getPreviousPageParam: (firstPage) => {
//       return firstPage.page > 1 ? firstPage.page - 1 : undefined;
//     },
//   });

//   return (
//     <SelectField name={name}>
//       <Select.Trigger>
//         <Select.Value placeholder="Select color" />
//       </Select.Trigger>
//       <Select.Content>
//         {materialsQuery.isSuccess &&
//           materialsQuery.data.pages.map((materialsPageData) =>
//             materialsPageData.materials.map((material) => (
//               <Select.Group key={material.id}>
//                 <Select.Label>{material.name}</Select.Label>
//                 {material.colors.map((color) => (
//                   <Select.Item key={color.id} value={color.id}>
//                     {color.name}
//                   </Select.Item>
//                 ))}
//               </Select.Group>
//             )),
//           )}
//         {materialsQuery.isSuccess && materialsQuery.hasNextPage && (
//           <Select.Item
//             key={'load-more'}
//             value="load-more"
//             onClick={(event) => {
//               event.preventDefault();

//               if (materialsQuery.isFetchingNextPage) {
//                 return;
//               }

//               materialsQuery.fetchNextPage();
//             }}
//           >
//             {materialsQuery.isFetchingNextPage ? 'Loading...' : 'Load more'}
//           </Select.Item>
//         )}
//       </Select.Content>
//     </SelectField>
//   );
// };

const addColorFormSchema = z.object({
  name: z.string().min(1),
  hex_code: z.string().min(7).max(7),
});

const AddColorDrawer: React.FC<{
  materialId: string;
  name: string;
  children: React.ReactNode;
}> = ({ materialId, name, children }) => {
  const queryClient = useQueryClient();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const createColorMutation = useCreateColorMutation(materialId, {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey.length >= 3 &&
          query.queryKey[0] === 'product' &&
          query.queryKey[2] === 'fashion',
      });
      setIsDrawerOpen(false);
    },
  });

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <Drawer.Trigger asChild>{children}</Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Add new color</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body className="p-4">
          <Form
            schema={addColorFormSchema}
            onSubmit={async (values) => {
              createColorMutation.mutate(values);
            }}
            defaultValues={{
              name,
            }}
            formProps={{
              id: `material-${materialId}-add-color-${name
                .toLowerCase()
                .replace(/[^\w]/g, '-')}`,
            }}
          >
            <div className="flex flex-col gap-4">
              <fieldset disabled>
                <InputField name="name" label="Name" />
              </fieldset>
              <InputField
                name="hex_code"
                label="Hex code"
                type="color"
                inputProps={{
                  className: 'max-w-8',
                }}
              />
            </div>
          </Form>
        </Drawer.Body>
        <Drawer.Footer>
          <Drawer.Close asChild>
            <Button variant="secondary">Cancel</Button>
          </Drawer.Close>
          <Button
            type="submit"
            form={`material-${materialId}-add-color-${name
              .toLowerCase()
              .replace(/[^\w]/g, '-')}`}
            isLoading={createColorMutation.isPending}
            disabled={createColorMutation.isPending}
          >
            Save
          </Button>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  );
};

const ProductFashionWidget = withQueryClient(
  ({ data }: DetailWidgetProps<AdminProduct>) => {
    const productFashion = useQuery({
      queryKey: ['product', data.id, 'fashion'],
      queryFn: async ({ signal }) => {
        const res = await fetch(`/admin/products/${data.id}/fashion`, {
          credentials: 'include',
          signal,
        });
        return res.json() as Promise<{
          missing_materials: string[];
          materials: (MaterialModelType & { missing_colors: string[] })[];
        }>;
      },
    });
    const createMaterialMutation = useCreateMaterialMutation({
      onSuccess: () => {
        productFashion.refetch();
      },
    });

    const materialsData = [
      ...(productFashion.data?.missing_materials ?? []),
      ...(productFashion.data?.materials ?? []),
    ].sort((a, b) => {
      const aName = typeof a === 'string' ? a : a.name;
      const bName = typeof b === 'string' ? b : b.name;

      return aName.localeCompare(bName);
    });

    return (
      <Container className="divide-y p-0">
        <div className="flex flex-row items-center justify-between px-6 py-4 gap-6">
          <Heading>Materials &amp; Colors</Heading>
          <IconButton
            variant="transparent"
            className="text-ui-fg-muted hover:text-ui-fg-subtle"
            onClick={(event) => {
              event.preventDefault();
              productFashion.refetch();
            }}
            disabled={productFashion.isFetching}
            isLoading={productFashion.isFetching}
          >
            <ArrowPath />
          </IconButton>
        </div>
        <div className="text-ui-fg-subtle px-6 py-4">
          {productFashion.isLoading ? (
            <Text>Loading...</Text>
          ) : productFashion.isError ? (
            <Text>Error loading product materials</Text>
          ) : productFashion.isSuccess &&
            productFashion.data &&
            !materialsData.length ? (
            <Text>No product variants with Material option</Text>
          ) : productFashion.isSuccess && productFashion.data ? (
            <div className="flex flex-col gap-8">
              {materialsData.map((material) => (
                <div
                  key={typeof material === 'string' ? material : material.id}
                  className="flex flex-col gap-1"
                >
                  <Text>
                    <strong
                      className={
                        typeof material === 'string'
                          ? 'border-b border-dashed border-ui-button-danger'
                          : undefined
                      }
                    >
                      {typeof material === 'string' ? material : material.name}
                    </strong>
                  </Text>
                  {typeof material === 'string' ? (
                    <Button
                      variant="secondary"
                      onClick={(event) => {
                        event.preventDefault();
                        createMaterialMutation.mutate({
                          name: material,
                        });
                      }}
                    >
                      Create material
                    </Button>
                  ) : (
                    <div className="flex flex-row gap-4">
                      {material.colors.map((color) => (
                        <div
                          key={color.id}
                          className="flex flex-col items-center gap-1"
                        >
                          <div
                            style={{ backgroundColor: color.hex_code }}
                            className="w-10 h-10 border-2 border-grayscale-40 rounded-full"
                          />
                          <Text>{color.name}</Text>
                        </div>
                      ))}
                      {material.missing_colors.map((color) => (
                        <div
                          key={color}
                          className="flex flex-col items-center gap-1"
                        >
                          <AddColorDrawer materialId={material.id} name={color}>
                            <IconButton
                              variant="transparent"
                              className="w-10 h-10 bg-grayscale-20 border-2 border-dashed border-ui-button-danger rounded-full"
                            >
                              <PlusMini />
                            </IconButton>
                          </AddColorDrawer>
                          {/* <div className="w-10 h-10 bg-grayscale-20 border-2 border-dashed border-ui-button-danger rounded-full" /> */}
                          <Text>{color}</Text>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <Text>No fashion details set</Text>
          )}
        </div>
      </Container>
    );
  },
);

export const config = defineWidgetConfig({
  zone: 'product.details.side.before',
});

export default ProductFashionWidget;

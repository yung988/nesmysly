import * as React from 'react';
import { z } from 'zod';
import { useParams } from 'react-router-dom';
import {
  Container,
  Heading,
  Text,
  IconButton,
  Table,
  Button,
  Drawer,
  DropdownMenu,
  Prompt,
  Switch,
  Label,
  Kbd,
} from '@medusajs/ui';
import {
  PencilSquare,
  EllipsisHorizontal,
  Trash,
  ArrowPath,
} from '@medusajs/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import type { MaterialModelType } from '../../../../modules/fashion/models/material';
import { Form } from '../../../components/Form/Form';
import { InputField } from '../../../components/Form/InputField';
import { EditMaterialDrawer } from '../../../components/EditMaterialDrawer';
import { ColorModelType } from '../../../../modules/fashion/models/color';
import { useCreateColorMutation } from '../../../hooks/fashion';

const colorFormSchema = z.object({
  name: z.string().min(1),
  hex_code: z.string().min(7).max(7),
});

const EditColorDrawer: React.FC<{
  materialId: string;
  id: string;
  initialValues: z.infer<typeof colorFormSchema>;
  children: React.ReactNode;
}> = ({ materialId, id, initialValues, children }) => {
  const queryClient = useQueryClient();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const updateColorMutation = useMutation({
    mutationKey: ['fashion', materialId, 'colors', id, 'update'],
    mutationFn: async (values: z.infer<typeof colorFormSchema>) => {
      return fetch(`/admin/fashion/${materialId}/colors/${id}`, {
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
          <Drawer.Title>Edit Color</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <Form
            schema={colorFormSchema}
            onSubmit={async (values) => {
              await updateColorMutation.mutateAsync(values);
              setIsDrawerOpen(false);
            }}
            formProps={{
              id: `edit-color-${id}-form`,
            }}
            defaultValues={initialValues}
          >
            <div className="flex flex-col gap-4">
              <InputField name="name" label="Name" />
              <InputField
                name="hex_code"
                label="Hex Code"
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
            form={`edit-color-${id}-form`}
            isLoading={updateColorMutation.isPending}
          >
            Update
          </Button>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  );
};

const DeleteColorPrompt: React.FC<{
  materialId: string;
  id: string;
  name: string;
  children: React.ReactNode;
}> = ({ materialId, name, id, children }) => {
  const queryClient = useQueryClient();
  const [isPromptOpen, setIsPromptOpen] = React.useState(false);
  const deleteColorMutation = useMutation({
    mutationKey: ['fashion', materialId, 'colors', id, 'delete'],
    mutationFn: async () => {
      return fetch(`/admin/fashion/${materialId}/colors/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      }).then((res) => res.json());
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'fashion',
      });

      setIsPromptOpen(false);
    },
  });

  return (
    <Prompt open={isPromptOpen} onOpenChange={setIsPromptOpen}>
      <Prompt.Trigger asChild>{children}</Prompt.Trigger>
      <Prompt.Content>
        <Prompt.Header>
          <Prompt.Title>Delete {name} color?</Prompt.Title>
          <Prompt.Description>
            Are you sure you want to delete the color {name}?
          </Prompt.Description>
        </Prompt.Header>
        <Prompt.Footer>
          <Prompt.Cancel>Cancel</Prompt.Cancel>
          <Prompt.Action
            onClick={() => {
              deleteColorMutation.mutate();
            }}
          >
            Delete
          </Prompt.Action>
        </Prompt.Footer>
      </Prompt.Content>
    </Prompt>
  );
};

const RestoreColorPrompt: React.FC<{
  materialId: string;
  id: string;
  name: string;
  children: React.ReactNode;
}> = ({ materialId, name, id, children }) => {
  const queryClient = useQueryClient();
  const [isPromptOpen, setIsPromptOpen] = React.useState(false);
  const restoreColorMutation = useMutation({
    mutationKey: ['fashion', materialId, 'colors', id, 'restore'],
    mutationFn: async () => {
      return fetch(`/admin/fashion/${materialId}/colors/${id}/restore`, {
        method: 'POST',
        credentials: 'include',
      }).then((res) => res.json());
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'fashion',
      });

      setIsPromptOpen(false);
    },
  });

  return (
    <Prompt
      open={isPromptOpen}
      onOpenChange={setIsPromptOpen}
      variant="confirmation"
    >
      <Prompt.Trigger asChild>{children}</Prompt.Trigger>
      <Prompt.Content>
        <Prompt.Header>
          <Prompt.Title>Restore {name} color?</Prompt.Title>
          <Prompt.Description>
            Are you sure you want to restore the color {name}?
          </Prompt.Description>
        </Prompt.Header>
        <Prompt.Footer>
          <Prompt.Cancel>Cancel</Prompt.Cancel>
          <Prompt.Action
            onClick={() => {
              restoreColorMutation.mutate();
            }}
          >
            Restore
          </Prompt.Action>
        </Prompt.Footer>
      </Prompt.Content>
    </Prompt>
  );
};

const MaterialColors: React.FC<{ materialId: string }> = ({ materialId }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const setPage = React.useCallback(
    (page: number) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set('page', page.toString());
        return next;
      });
    },
    [setSearchParams],
  );
  const deleted = searchParams.has('deleted');
  const toggleDeleted = React.useCallback(() => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      if (prev.has('page')) {
        next.delete('page');
      }

      if (!prev.has('deleted')) {
        next.set('deleted', '');
      } else {
        next.delete('deleted');
      }

      return next;
    });
  }, [setSearchParams]);

  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['fashion', materialId, 'colors', deleted, page],
    queryFn: async () => {
      return fetch(
        `/admin/fashion/${materialId}/colors?page=${page}${
          deleted ? '&deleted=true' : ''
        }`,
        {
          credentials: 'include',
        },
      ).then(
        (res) =>
          res.json() as Promise<{
            colors: ColorModelType[];
            count: number;
            page: number;
            last_page: number;
          }>,
      );
    },
  });

  const createColorMutation = useCreateColorMutation(materialId);

  return (
    <div className="-px-6">
      <div className="px-6 flex flex-row gap-6 justify-between items-center mb-4">
        <Heading level="h2">Colors</Heading>
        <div className="flex flex-row gap-4">
          <div className="flex items-center gap-x-2">
            <Switch
              id="deleted-flag"
              checked={deleted}
              onClick={() => {
                toggleDeleted();
              }}
            />
            <Label htmlFor="deleted-flag">Show Deleted</Label>
          </div>
          <Drawer open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <Drawer.Trigger asChild>
              <Button variant="secondary" size="small">
                Create
              </Button>
            </Drawer.Trigger>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>Create Color</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <Form
                  schema={colorFormSchema}
                  onSubmit={async (values) => {
                    await createColorMutation.mutateAsync(values);
                    setIsCreateModalOpen(false);
                  }}
                  formProps={{
                    id: 'create-color-form',
                  }}
                >
                  <div className="flex flex-col gap-4">
                    <InputField name="name" label="Name" />
                    <InputField
                      name="hex_code"
                      label="Hex Code"
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
                  form="create-color-form"
                  isLoading={createColorMutation.isPending}
                >
                  Create
                </Button>
              </Drawer.Footer>
            </Drawer.Content>
          </Drawer>
        </div>
      </div>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Hex Code</Table.HeaderCell>
            <Table.HeaderCell>&nbsp;</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {isLoading && (
            <Table.Row>
              {/* @ts-ignore */}
              <Table.Cell colSpan={3}>
                <Text>Loading...</Text>
              </Table.Cell>
            </Table.Row>
          )}
          {isError && (
            <Table.Row>
              {/* @ts-ignore */}
              <Table.Cell colSpan={3}>
                <Text>Error loading colors</Text>
              </Table.Cell>
            </Table.Row>
          )}
          {isSuccess && data.colors.length === 0 && (
            <Table.Row>
              {/* @ts-ignore */}
              <Table.Cell colSpan={3}>
                <Text>No colors found</Text>
              </Table.Cell>
            </Table.Row>
          )}
          {isSuccess &&
            data.colors.length > 0 &&
            data.colors.map((color) => (
              <Table.Row key={color.id}>
                <Table.Cell>{color.name}</Table.Cell>
                <Table.Cell>
                  <Kbd className="flex flex-row gap-1 items-center font-mono">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: `${color.hex_code}` }}
                    />
                    {color.hex_code}
                  </Kbd>
                </Table.Cell>
                <Table.Cell className="text-right">
                  <DropdownMenu>
                    <DropdownMenu.Trigger asChild>
                      <IconButton>
                        <EllipsisHorizontal />
                      </IconButton>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                      <DropdownMenu.Item asChild>
                        <EditColorDrawer
                          materialId={materialId}
                          id={color.id}
                          initialValues={color}
                        >
                          <Button
                            variant="transparent"
                            className="flex flex-row gap-2 items-center w-full justify-start"
                          >
                            <PencilSquare className="text-ui-fg-subtle" />
                            Edit
                          </Button>
                        </EditColorDrawer>
                      </DropdownMenu.Item>
                      <DropdownMenu.Separator />
                      {color.deleted_at ? (
                        <DropdownMenu.Item asChild>
                          <RestoreColorPrompt
                            materialId={materialId}
                            id={color.id}
                            name={color.name}
                          >
                            <Button
                              variant="transparent"
                              className="flex flex-row gap-2 items-center w-full justify-start"
                            >
                              <ArrowPath className="text-ui-fg-subtle" />
                              Restore
                            </Button>
                          </RestoreColorPrompt>
                        </DropdownMenu.Item>
                      ) : (
                        <DropdownMenu.Item asChild>
                          <DeleteColorPrompt
                            materialId={materialId}
                            id={color.id}
                            name={color.name}
                          >
                            <Button
                              variant="transparent"
                              className="flex flex-row gap-2 items-center w-full justify-start"
                            >
                              <Trash className="text-ui-fg-subtle" />
                              Delete
                            </Button>
                          </DeleteColorPrompt>
                        </DropdownMenu.Item>
                      )}
                    </DropdownMenu.Content>
                  </DropdownMenu>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
      <Table.Pagination
        className="pb-0"
        count={data?.count || 0}
        pageSize={20}
        pageIndex={page - 1}
        pageCount={data?.last_page ?? 1}
        canPreviousPage={page > 1}
        canNextPage={page < (data?.last_page ?? 1)}
        previousPage={() => setPage(Math.max(1, page - 1))}
        nextPage={() => setPage(Math.min(page + 1, data?.last_page ?? 1))}
      />
    </div>
  );
};

const MaterialPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['fashion', id],
    queryFn: async () => {
      const res = await fetch(`/admin/fashion/${id}`, {
        credentials: 'include',
      });
      return res.json() as Promise<MaterialModelType>;
    },
  });

  if (!id) {
    return null;
  }

  return (
    <Container className="px-0">
      {isLoading && <Text>Loading...</Text>}
      {isError && <Text>Error loading material</Text>}
      {isSuccess && (
        <>
          <div className="px-6 flex flex-row gap-6 justify-between items-center mb-4">
            <div className="flex flex-row gap-3">
              <Heading level="h2">{data?.name}</Heading>
              <EditMaterialDrawer id={id} initialValues={data}>
                <IconButton size="xsmall" variant="transparent">
                  <PencilSquare />
                </IconButton>
              </EditMaterialDrawer>
            </div>
          </div>
        </>
      )}
      <hr className="mb-6" />
      <MaterialColors materialId={id} />
    </Container>
  );
};

export default MaterialPage;

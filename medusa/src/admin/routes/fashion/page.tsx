import * as React from 'react';
import { z } from 'zod';
import { defineRouteConfig } from '@medusajs/admin-sdk';
import {
  Swatch,
  PencilSquare,
  EllipsisHorizontal,
  Trash,
  ArrowPath,
} from '@medusajs/icons';
import {
  Container,
  Heading,
  Table,
  Button,
  IconButton,
  Text,
  Drawer,
  DropdownMenu,
  Prompt,
  Switch,
  Label,
} from '@medusajs/ui';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams, Link } from 'react-router-dom';
import { MaterialModelType } from '../../../modules/fashion/models/material';
import { Form } from '../../components/Form/Form';
import { InputField } from '../../components/Form/InputField';
import {
  EditMaterialDrawer,
  materialFormSchema,
} from '../../components/EditMaterialDrawer';
import { useCreateMaterialMutation } from '../../hooks/fashion';

const DeleteMaterialPrompt: React.FC<{
  id: string;
  name: string;
  children: React.ReactNode;
}> = ({ id, name, children }) => {
  const queryClient = useQueryClient();
  const [isPromptOpen, setIsPromptOpen] = React.useState(false);
  const deleteMaterialMutation = useMutation({
    mutationKey: ['fashion', id, 'delete'],
    mutationFn: async () => {
      return fetch(`/admin/fashion/${id}`, {
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
          <Prompt.Title>Delete {name} material?</Prompt.Title>
          <Prompt.Description>
            Are you sure you want to delete the material {name}?
          </Prompt.Description>
        </Prompt.Header>
        <Prompt.Footer>
          <Prompt.Cancel>Cancel</Prompt.Cancel>
          <Prompt.Action
            onClick={() => {
              deleteMaterialMutation.mutate();
            }}
          >
            Delete
          </Prompt.Action>
        </Prompt.Footer>
      </Prompt.Content>
    </Prompt>
  );
};

const RestoreMaterialPrompt: React.FC<{
  id: string;
  name: string;
  children: React.ReactNode;
}> = ({ id, name, children }) => {
  const queryClient = useQueryClient();
  const [isPromptOpen, setIsPromptOpen] = React.useState(false);
  const restoreMaterialMutation = useMutation({
    mutationKey: ['fashion', id, 'restore'],
    mutationFn: async () => {
      return fetch(`/admin/fashion/${id}/restore`, {
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
    <Prompt open={isPromptOpen} onOpenChange={setIsPromptOpen}>
      <Prompt.Trigger asChild>{children}</Prompt.Trigger>
      <Prompt.Content>
        <Prompt.Header>
          <Prompt.Title>Restore {name} material?</Prompt.Title>
          <Prompt.Description>
            Are you sure you want to restore the material {name}?
          </Prompt.Description>
        </Prompt.Header>
        <Prompt.Footer>
          <Prompt.Cancel>Cancel</Prompt.Cancel>
          <Prompt.Action
            onClick={() => {
              restoreMaterialMutation.mutate();
            }}
          >
            Restore
          </Prompt.Action>
        </Prompt.Footer>
      </Prompt.Content>
    </Prompt>
  );
};

const FashionPage = () => {
  const queryClient = useQueryClient();
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
    queryKey: ['fashion', deleted, page],
    queryFn: async () => {
      return fetch(
        `/admin/fashion?page=${page}${deleted ? '&deleted=true' : ''}`,
        {
          credentials: 'include',
        },
      ).then(
        (res) =>
          res.json() as Promise<{
            materials: MaterialModelType[];
            count: number;
            page: number;
            last_page: number;
          }>,
      );
    },
  });

  const createMaterialMutation = useCreateMaterialMutation();

  return (
    <Container className="px-0">
      <div className="px-6 flex flex-row gap-6 justify-between items-center mb-4">
        <Heading level="h2">Materials</Heading>
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
                <Drawer.Title>Create Material</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <Form
                  schema={materialFormSchema}
                  onSubmit={async (values) => {
                    await createMaterialMutation.mutateAsync(values);
                    setIsCreateModalOpen(false);
                  }}
                  formProps={{
                    id: 'create-material-form',
                  }}
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
                  form="create-material-form"
                  isLoading={createMaterialMutation.isPending}
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
            <Table.HeaderCell>&nbsp;</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {isLoading && (
            <Table.Row>
              {/* @ts-ignore */}
              <Table.Cell colSpan={2}>
                <Text>Loading...</Text>
              </Table.Cell>
            </Table.Row>
          )}
          {isError && (
            <Table.Row>
              {/* @ts-ignore */}
              <Table.Cell colSpan={2}>
                <Text>Error loading materials</Text>
              </Table.Cell>
            </Table.Row>
          )}
          {isSuccess && data.materials.length === 0 && (
            <Table.Row>
              {/* @ts-ignore */}
              <Table.Cell colSpan={2}>
                <Text>No materials found</Text>
              </Table.Cell>
            </Table.Row>
          )}
          {isSuccess &&
            data.materials.length > 0 &&
            data.materials.map((material) => (
              <Table.Row key={material.id}>
                <Table.Cell>
                  <Link to={`/fashion/${material.id}`}>{material.name}</Link>
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
                        <EditMaterialDrawer
                          id={material.id}
                          initialValues={material}
                        >
                          <Button
                            variant="transparent"
                            className="flex flex-row gap-2 items-center w-full justify-start"
                          >
                            <PencilSquare className="text-ui-fg-subtle" />
                            Edit
                          </Button>
                        </EditMaterialDrawer>
                      </DropdownMenu.Item>
                      <DropdownMenu.Separator />
                      {material.deleted_at ? (
                        <DropdownMenu.Item asChild>
                          <RestoreMaterialPrompt
                            id={material.id}
                            name={material.name}
                          >
                            <Button
                              variant="transparent"
                              className="flex flex-row gap-2 items-center w-full justify-start"
                            >
                              <ArrowPath className="text-ui-fg-subtle" />
                              Restore
                            </Button>
                          </RestoreMaterialPrompt>
                        </DropdownMenu.Item>
                      ) : (
                        <DropdownMenu.Item asChild>
                          <DeleteMaterialPrompt
                            id={material.id}
                            name={material.name}
                          >
                            <Button
                              variant="transparent"
                              className="flex flex-row gap-2 items-center w-full justify-start"
                            >
                              <Trash className="text-ui-fg-subtle" />
                              Delete
                            </Button>
                          </DeleteMaterialPrompt>
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
    </Container>
  );
};

export default FashionPage;

export const config = defineRouteConfig({
  label: 'Materials & Colors',
  icon: Swatch,
});

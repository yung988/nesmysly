import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';

export const useCreateMaterialMutation = (
  options:
    | Omit<
        UseMutationOptions<
          any,
          Error,
          {
            name: string;
          },
          unknown
        >,
        'mutationKey' | 'mutationFn'
      >
    | undefined = undefined,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['fashion', 'create'],
    mutationFn: async (values: { name: string }) => {
      return fetch('/admin/fashion', {
        method: 'POST',
        body: JSON.stringify(values),
        credentials: 'include',
      }).then((res) => res.json());
    },
    ...options,
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'fashion',
      });

      if (options?.onSuccess) {
        return options.onSuccess(...args);
      }
    },
  });
};

export const useCreateColorMutation = (
  material_id: string,
  options:
    | Omit<
        UseMutationOptions<
          any,
          Error,
          { name: string; hex_code: string },
          unknown
        >,
        'mutationKey' | 'mutationFn'
      >
    | undefined = undefined,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['fashion', material_id, 'colors', 'create'],
    mutationFn: async (values: { name: string; hex_code: string }) => {
      return fetch(`/admin/fashion/${material_id}/colors`, {
        method: 'POST',
        body: JSON.stringify(values),
        credentials: 'include',
      }).then((res) => res.json());
    },
    ...options,
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'fashion',
      });

      if (options?.onSuccess) {
        return options.onSuccess(...args);
      }
    },
  });
};

export const userQueryKeys = {
  all: ['users'] as const,
  paginated: (filters: any[]) =>
    [...userQueryKeys.all, 'paginated', ...filters] as const
}

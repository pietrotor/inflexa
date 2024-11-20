import {
  TDataTablePagination,
  TDataTableSearch,
  ToolBarPositionEnum
} from 'design-system-eduno'

export type SortOrder = 'asc' | 'desc'

export type ColumnId = string | number
export type ColumnValueType = string | number | boolean | Date | null
export interface TableSortBy {
  id: ColumnId | null
  order: SortOrder | null
}

export interface PaginationResponse<T> {
  data: T[]
  total: number
  currentPage: number
}

export interface TDataTablePaginatedProps<T> {
  data: T[]
  isLoading: boolean
  isFetching: boolean
  pagination: TDataTablePagination
  search: TDataTableSearch
  toolbar?: React.ReactNode
  toolbarPosition?: ToolBarPositionEnum
}

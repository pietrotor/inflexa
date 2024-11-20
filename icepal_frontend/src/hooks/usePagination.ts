import { SortOrder, TableSortBy } from '@/types'
import { debounce } from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export interface PaginationFilters {
  onChangePage: (page: number) => void
  onChangeRows: (rows: number) => void
  onChangeQuery: (query: string) => void
  onSortBy: (sort: TableSortBy) => void
}

export interface PaginationValues {
  query: string
  querySearch: string
  offset: number
  rowsPerPage: number
  currentPage: number
  sortBy: TableSortBy | undefined
}

export interface PaginationOptions {
  values: PaginationValues
  filters: PaginationFilters
}

interface UsePaginationProps {
  defaultSortBy?: TableSortBy
}

const usePagination = ({
  defaultSortBy = { id: null, order: null }
}: UsePaginationProps = {}): PaginationOptions => {
  const [searchParams, setSearchParams] = useSearchParams()

  const queryFromUrl = searchParams.get('query') || ''
  const pageFromUrl = Number(searchParams.get('page')) || 1
  const rowsFromUrl = Number(searchParams.get('rows')) || 10
  const sortByIdFromUrl = searchParams.get('sortId') || null
  const sortByOrderFromUrl: SortOrder | null =
    (searchParams.get('sortOrder') as SortOrder) || null

  const [query, setQuery] = useState(queryFromUrl)
  const [querySearch, setQuerySearch] = useState(queryFromUrl)
  const [currentPage, setCurrentPage] = useState(pageFromUrl)
  const [rowsPerPage, setRowsPerPage] = useState(rowsFromUrl)
  const [sortBy, setSortBy] = useState<TableSortBy>({
    id: sortByIdFromUrl ?? defaultSortBy.id,
    order: sortByOrderFromUrl ?? defaultSortBy.order
  })

  const onChangePage = (page: number) => setCurrentPage(page)
  const onChangeRows = (rows: number) => setRowsPerPage(rows)
  const onChangeQuerySearch = useMemo(
    () =>
      debounce((query: string) => {
        setQuerySearch(query)
        setCurrentPage(1)
      }, 500),
    []
  )

  const onChangeQuery = (query: string) => {
    setQuery(query)
    onChangeQuerySearch(query)
  }
  const onSortBy = (sort: TableSortBy) => setSortBy(sort)

  const offset = useMemo(
    () => (currentPage - 1) * rowsPerPage,
    [currentPage, rowsPerPage]
  )

  const updateUrlParams = useCallback(() => {
    setSearchParams({
      ...(query && { query }),
      page: String(currentPage),
      rows: String(rowsPerPage),
      ...(sortBy.id && { sortId: String(sortBy.id) }),
      ...(sortBy.order && { sortOrder: String(sortBy.order) })
    })
  }, [
    currentPage,
    query,
    rowsPerPage,
    setSearchParams,
    sortBy?.id,
    sortBy?.order
  ])

  useEffect(() => {
    updateUrlParams()
  }, [query, currentPage, rowsPerPage, sortBy, updateUrlParams])

  return {
    values: {
      query,
      offset,
      currentPage,
      rowsPerPage,
      querySearch,
      sortBy
    },
    filters: {
      onChangePage,
      onChangeRows,
      onChangeQuery,
      onSortBy
    }
  }
}

export { usePagination }

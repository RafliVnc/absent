import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ColumnDef, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { useToast } from '@/components/ui/use-toast'

type UseTableProps<TData extends object, TValue> = {
  columns: ColumnDef<TData, TValue>[]
  key: string
}

export const useTable = <TData extends object, TValue>(
  route: string,
  { key, columns }: UseTableProps<TData, TValue>
) => {
  const { toast } = useToast()
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  })

  const get = async (page: number, pageSize: number) => {
    try {
      const { data } = await fetch(`${route}?page=${page}&perPage=${pageSize}`).then(res => res.json())
      return data
    } catch (e) {
      toast({
        title: `${e}`,
        variant: 'destructive',
        duration: 2000
      })
    }
  }

  const {
    isFetching: isLoading,
    data,
    refetch
  } = useQuery({
    queryKey: [key, pagination],
    queryFn: () => get(pagination.pageIndex + 1, pagination.pageSize),
    placeholderData: { keepPreviousData: true }
  })

  const defaultData = useMemo(() => [], [])

  const table = useReactTable({
    columns,
    data: data.rows ?? defaultData,
    manualPagination: true,
    rowCount: data.count,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination
    }
  })

  return {
    isLoading,
    table,
    reload: () => refetch()
  }
}

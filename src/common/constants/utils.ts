import { format } from 'date-fns'

export const getParams = (searchParams: URLSearchParams): Record<string, string> => {
  return Object.fromEntries(Array.from(searchParams.entries()).map(([key, value]) => [key, value]))
}

export function formatToIDR(amount: number): string {
  return (
    'IDR ' +
    amount.toLocaleString('id-ID', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
  )
}

export const formatDateTime = (text: string, withTime?: boolean): string => {
  return format(new Date(text), withTime ? 'dd MMM, yyyy hh:mm a' : 'dd MMM, yyyy')
}

export const formatTime = (text: string): string => {
  const date = new Date().toDateString()
  return format(new Date(`${date} ${text}`), 'hh:mm')
}

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

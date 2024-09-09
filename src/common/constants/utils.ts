export const getParams = (searchParams: URLSearchParams): Record<string, string> => {
  return Object.fromEntries(Array.from(searchParams.entries()).map(([key, value]) => [key, value]))
}

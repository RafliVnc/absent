import { DataTable } from '@/components/ui/DataTable'
import { Todos, columns } from './columns'

async function getData(): Promise<Todos[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json())
  // Fetch data from your API here.
  return res
}

export default async function TableAdmin() {
  const data = await getData()

  return (
    <div className="mx-8 py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}

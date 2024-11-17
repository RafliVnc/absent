import { EventDummy } from '@/common/constants/dummy'
import CardEvent from './CardEvent'

export default function CompetitionPage() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <CardEvent {...EventDummy} />
      <CardEvent {...EventDummy} />
      <CardEvent {...EventDummy} />
      <CardEvent {...EventDummy} />
      <CardEvent {...EventDummy} />
    </div>
  )
}

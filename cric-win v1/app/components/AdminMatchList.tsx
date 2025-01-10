import { getMatches } from '../lib/matches'
import AdminMatchCard from './AdminMatchCard'

export default async function AdminMatchList() {
  const matches = await getMatches()

  return (
    <div className="space-y-4">
      {matches.map((match) => (
        <AdminMatchCard key={match.id} match={match} />
      ))}
    </div>
  )
}


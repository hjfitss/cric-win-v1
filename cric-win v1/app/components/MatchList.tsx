import { Match } from '../lib/types'
import MatchCard from './MatchCard'

export default function MatchList({ matches }: { matches: Match[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {matches.map((match) => (
        <MatchCard key={match.id} match={match} />
      ))}
    </div>
  )
}


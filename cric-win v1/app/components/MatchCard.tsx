'use client'

import Link from 'next/link'
import { Match } from '../lib/types'

interface MatchCardProps {
  match: Match;
}

export default function MatchCard({ match }: MatchCardProps) {
  return (
    <div className="border border-gray-700 rounded-lg p-4 bg-gray-800 text-white">
      <Link href={`/match/${match.id}`} className="text-xl font-semibold mb-2 hover:text-green-500 block">
        {match.team1} vs {match.team2}
      </Link>
      <p className="text-sm text-gray-400 mb-2">{match.status}</p>
      {match.status === 'live' && (
        <div className="mb-2">
          <p>{match.team1}: {match.team1Score}/{match.team1Wickets}</p>
          <p>{match.team2}: {match.team2Score}/{match.team2Wickets}</p>
          <p>Overs: {match.overs}</p>
        </div>
      )}
      <div className="flex flex-col sm:flex-row justify-between mt-4">
        <Link href={`/place-bet/${match.id}/${match.team1}`} className="bg-green-500 text-white px-4 py-2 rounded text-center w-full sm:w-[48%] mb-2 sm:mb-0">
          {match.team1} <br /> {typeof match.team1Odds === 'number' ? match.team1Odds.toFixed(2) : 'N/A'}
        </Link>
        <Link href={`/place-bet/${match.id}/${match.team2}`} className="bg-blue-500 text-white px-4 py-2 rounded text-center w-full sm:w-[48%]">
          {match.team2} <br /> {typeof match.team2Odds === 'number' ? match.team2Odds.toFixed(2) : 'N/A'}
        </Link>
      </div>
    </div>
  )
}


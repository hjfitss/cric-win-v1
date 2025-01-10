'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Match } from '../../lib/types'
import { getMatches } from '../../lib/matches'
import Link from 'next/link'

export default function MatchDetails({ params }: { params: { id: string } }) {
  const [match, setMatch] = useState<Match | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchMatch = async () => {
      const matches = await getMatches()
      const foundMatch = matches.find(m => m.id === params.id)
      setMatch(foundMatch || null)
    }

    fetchMatch()
  }, [params.id])

  if (!match) {
    return <div className="text-center mt-8">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">{match.team1} vs {match.team2}</h1>
      <div className="bg-gray-800 rounded-lg p-4 mb-4">
        <p className="mb-2">Status: {match.status}</p>
        {match.tossWinner && (
          <p className="mb-2">Toss: {match.tossWinner} won and chose to {match.tossDecision}</p>
        )}
        {match.status === 'live' && (
          <>
            <p className="mb-2">Current Innings: {match.currentInnings}</p>
            <p className="mb-2">Batting Team: {match.battingTeam}</p>
            <p className="mb-2">{match.team1}: {match.team1Score}/{match.team1Wickets}</p>
            <p className="mb-2">{match.team2}: {match.team2Score}/{match.team2Wickets}</p>
            <p className="mb-2">Overs: {match.overs}</p>
            <p className="mb-2">Run Rate: {match.runRate?.toFixed(2)}</p>
            {match.batsmen && (
              <div className="mb-2">
                <h3 className="font-semibold">Batsmen</h3>
                {match.batsmen.map((batsman, index) => (
                  <p key={index}>{batsman.name}: {batsman.runs} ({batsman.ballsFaced} balls)</p>
                ))}
              </div>
            )}
            {match.bowler && (
              <div className="mb-2">
                <h3 className="font-semibold">Bowler</h3>
                <p>{match.bowler.name}: {match.bowler.overs} overs, {match.bowler.runsConceded} runs</p>
              </div>
            )}
          </>
        )}
        {match.status === 'completed' && (
          <p className="mb-2">Result: {match.result}</p>
        )}
        <div className="mt-4">
          <p className="font-semibold">Odds:</p>
          <p>{match.team1}: {match.team1Odds?.toFixed(2)}</p>
          <p>{match.team2}: {match.team2Odds?.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <Link href={`/place-bet/${match.id}/${match.team1}`} className="bg-green-500 text-white px-4 py-2 rounded text-center w-[48%]">
          Bet on {match.team1}
        </Link>
        <Link href={`/place-bet/${match.id}/${match.team2}`} className="bg-blue-500 text-white px-4 py-2 rounded text-center w-[48%]">
          Bet on {match.team2}
        </Link>
      </div>
      <button onClick={() => router.push('/')} className="w-full bg-gray-700 text-white px-4 py-2 rounded mt-4">
        Back to Matches
      </button>
    </div>
  )
}


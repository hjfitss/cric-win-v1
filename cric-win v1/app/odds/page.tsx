'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getMatches } from '../lib/matches'
import { Match } from '../lib/types'

export default function OddsPage() {
  const [matches, setMatches] = useState<Match[]>([])

  useEffect(() => {
    const fetchMatches = async () => {
      const fetchedMatches = await getMatches()
      setMatches(fetchedMatches)
    }

    fetchMatches()
    const interval = setInterval(fetchMatches, 15000) // Update every 15 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-green-500">CricWin Odds</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {matches.map((match) => (
            <div key={match.id} className="border border-gray-700 rounded-lg p-4 bg-gray-800">
              <h2 className="text-xl font-semibold mb-2">{match.team1} vs {match.team2}</h2>
              <p className="text-lg font-bold text-green-500">
                Odds: {match.odds ? match.odds.toFixed(2) : 'N/A'}
              </p>
              <p>Status: {match.status}</p>
              {match.tossWinner && (
                <p>Toss: {match.tossWinner} won and chose to {match.tossDecision}</p>
              )}
            </div>
          ))}
        </div>
        <Link href="/" className="mt-8 inline-block bg-green-500 text-white px-4 py-2 rounded">
          Back to Main Page
        </Link>
      </main>
    </div>
  )
}


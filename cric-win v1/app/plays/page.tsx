'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getPlaysByUserId } from '../lib/plays'
import { Play } from '../lib/types'

export default function PlaysPage() {
  const [plays, setPlays] = useState<Play[]>([])
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId')
    if (storedUserId) {
      setUserId(storedUserId)
      fetchPlays(storedUserId)
    }
  }, [])

  const fetchPlays = async (id: string) => {
    const fetchedPlays = await getPlaysByUserId(id)
    setPlays(fetchedPlays)
  }

  if (!userId) {
    return <div>Please log in to view your plays.</div>
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-green-500">Your Plays</h1>
        <Link href="/" className="text-green-500 hover:underline mb-4 block">Back to Main Page</Link>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {plays.map((play) => (
            <div key={play.id} className="border border-gray-700 rounded-lg p-4 bg-gray-800">
              <h2 className="text-xl font-semibold mb-2">Match ID: {play.matchId}</h2>
              <p>Team: {play.team}</p>
              <p>Points: {play.points}</p>
              <p>Odds: {play.odds}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}


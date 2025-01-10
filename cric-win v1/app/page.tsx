'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import MatchList from './components/MatchList'
import { getMatches } from './lib/matches'
import { getUserById } from './lib/users'

export default function Home() {
  const [matches, setMatches] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchMatchesAndUser = async () => {
      const fetchedMatches = await getMatches()
      setMatches(fetchedMatches)

      const userId = localStorage.getItem('userId')
      if (userId) {
        const fetchedUser = await getUserById(userId)
        setUser(fetchedUser)
      }
    }

    fetchMatchesAndUser()
    const interval = setInterval(fetchMatchesAndUser, 15000) // Update every 15 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 py-4">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold text-green-500 mb-4 sm:mb-0">CricWin</h1>
          {user ? (
            <div className="flex items-center flex-col sm:flex-row">
              <span className="mr-0 sm:mr-4 text-xl font-semibold mb-2 sm:mb-0">{user.points} points</span>
              <button onClick={() => {
                localStorage.removeItem('userId')
                setUser(null)
              }} className="text-sm bg-red-500 px-2 py-1 rounded">Logout</button>
            </div>
          ) : (
            <div>
              <Link href="/login" className="text-green-500 hover:underline mr-4">Login</Link>
              <Link href="/register" className="text-green-500 hover:underline">Register</Link>
            </div>
          )}
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <MatchList matches={matches} />
      </main>
    </div>
  )
}


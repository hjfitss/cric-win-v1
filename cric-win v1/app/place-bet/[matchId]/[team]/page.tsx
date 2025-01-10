'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Match } from '../../../lib/types'
import { getMatches } from '../../../lib/matches'
import { addPlay } from '../../../lib/plays'
import { getUserById, updateUserPoints } from '../../../lib/users'

export default function PlaceBet({ params }: { params: { matchId: string; team: string } }) {
  const [match, setMatch] = useState<Match | null>(null)
  const [betAmount, setBetAmount] = useState<number>(0)
  const [userPoints, setUserPoints] = useState<number>(0)
  const router = useRouter()

  useEffect(() => {
    const fetchMatchAndUser = async () => {
      const matches = await getMatches()
      const foundMatch = matches.find(m => m.id === params.matchId)
      setMatch(foundMatch || null)

      const userId = localStorage.getItem('userId')
      if (userId) {
        const user = await getUserById(userId)
        if (user) {
          setUserPoints(user.points)
        }
      }
    }

    fetchMatchAndUser()
  }, [params.matchId])

  const handleBet = async () => {
    if (!match || betAmount <= 0 || betAmount > userPoints) {
      alert("Invalid bet amount")
      return
    }

    const userId = localStorage.getItem('userId')
    if (!userId) {
      alert("Please log in to place a bet")
      return
    }

    try {
      const teamOdds = params.team === match.team1 ? match.team1Odds : match.team2Odds
      await addPlay({
        userId,
        matchId: match.id,
        team: params.team,
        points: betAmount,
        odds: teamOdds || 1
      })
      await updateUserPoints(userId, userPoints - betAmount)
      alert("Bet placed successfully!")
      router.push('/')
    } catch (error) {
      console.error("Error placing bet:", error)
      alert("Failed to place bet. Please try again.")
    }
  }

  if (!match) {
    return <div className="text-center mt-8">Loading...</div>
  }

  const teamOdds = params.team === match.team1 ? match.team1Odds : match.team2Odds

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">Place Bet</h1>
      <div className="bg-gray-800 rounded-lg p-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">{match.team1} vs {match.team2}</h2>
        <p className="mb-2">You are betting on: {params.team}</p>
        <p className="mb-4 text-xl font-bold text-green-500">Odds: {typeof teamOdds === 'number' ? teamOdds.toFixed(2) : 'N/A'}</p>
        <input
          type="number"
          value={betAmount}
          onChange={(e) => setBetAmount(Number(e.target.value))}
          className="w-full bg-gray-700 text-white px-3 py-2 rounded mb-4"
          placeholder="Enter bet amount"
        />
        <p className="mb-4">Your points: {userPoints}</p>
        <button
          onClick={handleBet}
          className="w-full bg-green-500 text-white px-4 py-2 rounded"
          disabled={betAmount <= 0 || betAmount > userPoints}
        >
          Place Bet
        </button>
      </div>
      <button onClick={() => router.push('/')} className="w-full bg-gray-700 text-white px-4 py-2 rounded">
        Back to Matches
      </button>
    </div>
  )
}


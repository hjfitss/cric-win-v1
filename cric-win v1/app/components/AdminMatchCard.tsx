'use client'

import { useState } from 'react'
import { Match, Player } from '../lib/types'
import { updateMatch } from '../lib/matches'
import { updatePlayResults } from '../lib/plays'

export default function AdminMatchCard({ match: initialMatch }: { match: Match }) {
  const [match, setMatch] = useState(initialMatch)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setMatch((prev) => ({ ...prev, [name]: value }))
  }

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const numValue = value === '' ? undefined : Number(value)
    setMatch((prev) => ({ ...prev, [name]: numValue }))
  }

  const handlePlayerChange = (index: number, field: keyof Player, value: string) => {
    setMatch((prev) => {
      const newBatsmen = prev.batsmen ? [...prev.batsmen] : [{}, {}];
      newBatsmen[index] = { ...newBatsmen[index], [field]: value };
      return { ...prev, batsmen: newBatsmen };
    });
  }

  const handleBowlerChange = (field: keyof Player, value: string) => {
    setMatch((prev) => ({
      ...prev,
      bowler: { ...prev.bowler, [field]: value }
    }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const updatedMatch = await updateMatch(match.id, match)
      setMatch(updatedMatch)
      if (updatedMatch.status === 'completed' && updatedMatch.winner) {
        await updatePlayResults(updatedMatch.id, updatedMatch.winner)
      }
      alert('Match updated successfully!')
    } catch (error) {
      console.error('Error updating match:', error)
      alert('Failed to update match. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border rounded-lg p-4 shadow-md space-y-4">
      <h2 className="text-xl font-semibold mb-2">Edit Match</h2>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="team1"
          value={match.team1}
          onChange={handleInputChange}
          className="border rounded px-2 py-1"
          placeholder="Team 1"
        />
        <input
          type="text"
          name="team2"
          value={match.team2}
          onChange={handleInputChange}
          className="border rounded px-2 py-1"
          placeholder="Team 2"
        />
        <select
          name="status"
          value={match.status}
          onChange={handleInputChange}
          className="border rounded px-2 py-1"
        >
          <option value="upcoming">Upcoming</option>
          <option value="live">Live</option>
          <option value="completed">Completed</option>
        </select>
        <select
          name="tossWinner"
          value={match.tossWinner || ''}
          onChange={handleInputChange}
          className="border rounded px-2 py-1"
        >
          <option value="">Select Toss Winner</option>
          <option value={match.team1}>{match.team1}</option>
          <option value={match.team2}>{match.team2}</option>
        </select>
        <select
          name="tossDecision"
          value={match.tossDecision || ''}
          onChange={handleInputChange}
          className="border rounded px-2 py-1"
        >
          <option value="">Select Toss Decision</option>
          <option value="bat">Bat</option>
          <option value="bowl">Bowl</option>
        </select>
        <select
          name="currentInnings"
          value={match.currentInnings || ''}
          onChange={handleInputChange}
          className="border rounded px-2 py-1"
        >
          <option value="">Select Current Innings</option>
          <option value="1st">1st Innings</option>
          <option value="2nd">2nd Innings</option>
        </select>
        <select
          name="battingTeam"
          value={match.battingTeam || ''}
          onChange={handleInputChange}
          className="border rounded px-2 py-1"
        >
          <option value="">Select Batting Team</option>
          <option value={match.team1}>{match.team1}</option>
          <option value={match.team2}>{match.team2}</option>
        </select>
        <input
          type="number"
          name="team1Score"
          value={match.team1Score ?? ''}
          onChange={handleNumberInputChange}
          className="border rounded px-2 py-1"
          placeholder="Team 1 Score"
        />
        <input
          type="number"
          name="team1Wickets"
          value={match.team1Wickets ?? ''}
          onChange={handleNumberInputChange}
          className="border rounded px-2 py-1"
          placeholder="Team 1 Wickets"
        />
        <input
          type="number"
          name="team2Score"
          value={match.team2Score ?? ''}
          onChange={handleNumberInputChange}
          className="border rounded px-2 py-1"
          placeholder="Team 2 Score"
        />
        <input
          type="number"
          name="team2Wickets"
          value={match.team2Wickets ?? ''}
          onChange={handleNumberInputChange}
          className="border rounded px-2 py-1"
          placeholder="Team 2 Wickets"
        />
        <input
          type="number"
          name="overs"
          value={match.overs ?? ''}
          onChange={handleNumberInputChange}
          className="border rounded px-2 py-1"
          placeholder="Overs"
          step="0.1"
        />
        <input
          type="number"
          name="runRate"
          value={match.runRate ?? ''}
          onChange={handleNumberInputChange}
          className="border rounded px-2 py-1"
          placeholder="Run Rate"
          step="0.01"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="team1Odds"
            value={match.team1Odds ?? ''}
            onChange={handleNumberInputChange}
            className="border rounded px-2 py-1"
            placeholder={`${match.team1} Odds`}
            step="0.01"
            min="1"
          />
          <input
            type="number"
            name="team2Odds"
            value={match.team2Odds ?? ''}
            onChange={handleNumberInputChange}
            className="border rounded px-2 py-1"
            placeholder={`${match.team2} Odds`}
            step="0.01"
            min="1"
          />
        </div>
        {match.status === 'completed' && (
          <select
            name="winner"
            value={match.winner || ''}
            onChange={handleInputChange}
            className="border rounded px-2 py-1"
          >
            <option value="">Select Winner</option>
            <option value={match.team1}>{match.team1}</option>
            <option value={match.team2}>{match.team2}</option>
          </select>
        )}
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold">Batsmen</h3>
        {match.batsmen && match.batsmen.map((batsman, index) => (
          <div key={index} className="grid grid-cols-3 gap-2">
            <input
              type="text"
              value={batsman.name || ''}
              onChange={(e) => handlePlayerChange(index, 'name', e.target.value)}
              className="border rounded px-2 py-1"
              placeholder={`Batsman ${index + 1}`}
            />
            <input
              type="number"
              value={batsman.runs ?? ''}
              onChange={(e) => handlePlayerChange(index, 'runs', e.target.value)}
              className="border rounded px-2 py-1"
              placeholder="Runs"
            />
            <input
              type="number"
              value={batsman.ballsFaced ?? ''}
              onChange={(e) => handlePlayerChange(index, 'ballsFaced', e.target.value)}
              className="border rounded px-2 py-1"
              placeholder="Balls Faced"
            />
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold">Bowler</h3>
        <div className="grid grid-cols-3 gap-2">
          <input
            type="text"
            value={match.bowler?.name || ''}
            onChange={(e) => handleBowlerChange('name', e.target.value)}
            className="border rounded px-2 py-1"
            placeholder="Bowler Name"
          />
          <input
            type="number"
            value={match.bowler?.overs ?? ''}
            onChange={(e) => handleBowlerChange('overs', e.target.value)}
            className="border rounded px-2 py-1"
            placeholder="Overs Bowled"
            step="0.1"
          />
          <input
            type="number"
            value={match.bowler?.runsConceded ?? ''}
            onChange={(e) => handleBowlerChange('runsConceded', e.target.value)}
            className="border rounded px-2 py-1"
            placeholder="Runs Conceded"
          />
        </div>
      </div>
      <input
        type="text"
        name="result"
        value={match.result || ''}
        onChange={handleInputChange}
        className="w-full border rounded px-2 py-1"
        placeholder="Result"
      />
      <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded">
        Update Match
      </button>
    </form>
  )
}


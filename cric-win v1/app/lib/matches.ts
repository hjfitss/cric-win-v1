import { Match } from './types'

let matches: Match[] = [
  {
    id: '1',
    team1: 'India',
    team2: 'Australia',
    status: 'live',
    tossWinner: 'India',
    tossDecision: 'bat',
    currentInnings: '1st',
    battingTeam: 'India',
    team1Score: 120,
    team1Wickets: 3,
    team2Score: 0,
    team2Wickets: 0,
    overs: 15,
    runRate: 8,
    batsmen: [
      { name: 'Virat Kohli', runs: 60, ballsFaced: 45 },
      { name: 'Rohit Sharma', runs: 40, ballsFaced: 30 },
    ],
    bowler: { name: 'Pat Cummins', overs: 4, runsConceded: 32 },
  },
  {
    id: '2',
    team1: 'England',
    team2: 'New Zealand',
    status: 'upcoming',
  },
  {
    id: '3',
    team1: 'South Africa',
    team2: 'West Indies',
    status: 'upcoming',
  },
]

export async function getMatches(): Promise<Match[]> {
  return matches
}

export async function updateMatch(id: string, data: Partial<Match>): Promise<Match> {
  const index = matches.findIndex(match => match.id === id)
  if (index !== -1) {
    matches[index] = { ...matches[index], ...data }
    return matches[index]
  }
  throw new Error('Match not found')
}


import { Play } from './types'

let plays: Play[] = []

export async function addPlay(playData: Omit<Play, 'id'>): Promise<Play> {
  const newPlay: Play = {
    id: String(plays.length + 1),
    ...playData
  }
  plays.push(newPlay)
  return newPlay
}

export async function getPlaysByUserId(userId: string): Promise<Play[]> {
  return plays.filter(play => play.userId === userId)
}

export async function updatePlayResults(matchId: string, winningTeam: string): Promise<void> {
  plays = plays.map(play => {
    if (play.matchId === matchId) {
      if (play.team === winningTeam) {
        // User won the bet
        play.points *= play.odds
      } else {
        // User lost the bet
        play.points = 0
      }
    }
    return play
  })
}


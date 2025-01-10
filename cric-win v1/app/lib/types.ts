export interface Player {
  name: string;
  runs?: number;
  ballsFaced?: number;
  overs?: number;
  runsConceded?: number;
}

export interface Match {
  id: string;
  team1: string;
  team2: string;
  status: 'live' | 'upcoming' | 'completed';
  tossWinner?: string;
  tossDecision?: 'bat' | 'bowl';
  currentInnings?: '1st' | '2nd';
  battingTeam?: string;
  team1Score?: number;
  team1Wickets?: number;
  team2Score?: number;
  team2Wickets?: number;
  overs?: number;
  runRate?: number;
  batsmen?: [Player, Player];
  bowler?: Player;
  result?: string;
  team1Odds?: number;
  team2Odds?: number;
  winner?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  points: number;
}

export interface Play {
  id: string;
  userId: string;
  matchId: string;
  team: string;
  points: number;
  odds: number;
}


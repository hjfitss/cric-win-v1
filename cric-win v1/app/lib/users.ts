import { User } from './types'

let users: User[] = []

export async function registerUser(username: string, email: string, password: string): Promise<User> {
  if (users.some(user => user.username === username)) {
    throw new Error('Username already exists')
  }
  if (users.some(user => user.email === email)) {
    throw new Error('Email already exists')
  }
  const newUser: User = { id: String(users.length + 1), username, email, password, points: 0 }
  users.push(newUser)
  return newUser
}

export async function loginUser(username: string, password: string): Promise<User> {
  const user = users.find(user => user.username === username && user.password === password)
  if (!user) {
    throw new Error('Invalid username or password')
  }
  return user
}

export async function getUsers(): Promise<User[]> {
  return users
}

export async function updateUserPoints(userId: string, points: number): Promise<User> {
  const userIndex = users.findIndex(user => user.id === userId)
  if (userIndex === -1) {
    throw new Error('User not found')
  }
  users[userIndex].points = points
  return users[userIndex]
}

export async function getUserById(userId: string): Promise<User | null> {
  const user = users.find(user => user.id === userId)
  return user || null
}


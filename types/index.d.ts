export interface Character {
  id: string
  name: string
  image: string
  status: string
  species: string
}

export interface GameCard extends Character {
  uuid: string
  isFlipped: boolean
}

export type GamePhase = 'preview' | 'playing' | 'finished'

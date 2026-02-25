import { useQuery } from '@tanstack/react-query'
import { graphqlFetcher } from '@/lib/graphqlClient'
import { Character } from '@/types'

const GET_CHARACTERS = `
  query GetCharacters($page: Int!) {
    characters(page: $page) {
      info {
        count
        pages
      }
      results {
        id
        name
        image
        status
        species
      }
    }
  }
`

interface CharactersResponse {
  characters: {
    info: {
      count: number
      pages: number
    }
    results: Character[]
  }
}

export const useCharacters = (page = 1) => {
  return useQuery({
    queryKey: ['characters', page],
    queryFn: () => graphqlFetcher<CharactersResponse>(GET_CHARACTERS, { page }),
  })
}

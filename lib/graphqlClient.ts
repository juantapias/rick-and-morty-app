export const graphqlFetcher = async <T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> => {
  const response = await fetch('https://rickandmortyapi.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await response.json()

  if (json.errors) {
    throw new Error(
      json.errors.map((err: { message: string }) => err.message).join('\n')
    )
  }

  return json.data
}

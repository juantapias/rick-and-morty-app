const apiUrl = process.env.NEXT_PUBLIC_GRAPHQL_API_URL

export const graphqlFetcher = async <T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> => {
  if (!apiUrl) {
    throw new Error('NEXT_PUBLIC_GRAPHQL_API_URL is not defined')
  }

  const response = await fetch(apiUrl, {
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

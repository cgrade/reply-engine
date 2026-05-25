const API_URL = import.meta.env.VITE_API_URL || '/api/generate'
const FETCH_TIMEOUT_MS = 55_000

export async function generateReply(payload) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...payload,
        variants: true,
      }),
      signal: controller.signal,
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Failed to generate reply')
    }

    if (data.replies?.length) {
      return { replies: data.replies }
    }

    if (data.reply?.trim()) {
      return { replies: [data.reply] }
    }

    throw new Error('Model returned an empty reply')
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error(
        'Request timed out. Check that npm run server is running and your Groq key is valid.'
      )
    }
    throw err
  } finally {
    clearTimeout(timeoutId)
  }
}

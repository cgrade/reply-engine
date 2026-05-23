const API_URL = import.meta.env.VITE_API_URL || '/api/generate'

export async function generateReply(payload) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Failed to generate reply')
  }

  if (!data.reply?.trim()) {
    throw new Error('Model returned an empty reply')
  }

  return data
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
    })
  }

  try {
    const { system, platform, tone, post } = req.body

    const prompt = `
${system}

Platform: ${platform}
Tone: ${tone}

Post:
${post}

Write ONE emotionally intelligent reply.

Rules:
- Under 250 characters
- Sound deeply human
- Nigerian warmth is welcome
- No hashtags
- No promotion
- Output ONLY the reply
`

    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'qwen2.5:3b',
        prompt,
        stream: false,
        options: {
          temperature: 0.9,
          top_p: 0.95,
        },
      }),
    })

    if (!response.ok) {
      throw new Error('Could not connect to Ollama')
    }

    const data = await response.json()

    return res.status(200).json({
      reply: data.response?.trim(),
    })
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    })
  }
}
import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

app.post('/api/generate', async (req, res) => {
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
        model: 'llama3.1:8b',
        prompt,
        stream: false,
      }),
    })

    const data = await response.json()

    res.json({
      reply: data.response?.trim(),
    })
  } catch (err) {
    console.error(err)

    res.status(500).json({
      error: err.message,
    })
  }
})

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001')
})
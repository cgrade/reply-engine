import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

app.post('/api/generate', async (req, res) => {
  try {
    const { post } = req.body

    console.log('REQUEST RECEIVED')

    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'qwen2.5:3b',
        prompt: `Reply warmly to this post in under 150 characters:\n\n${post}`,
        stream: false,
        options: {
          temperature: 0.7,
          num_predict: 60,
        },
      }),
    })

    console.log('OLLAMA RESPONDED')

    const data = await response.json()

    console.log(data)

    return res.json({
      reply: data.response || 'No response generated.',
    })
  } catch (err) {
    console.error(err)

    return res.status(500).json({
      error: err.message,
    })
  }
})

app.listen(3001, () => {
  console.log('Server running on port 3001')
})
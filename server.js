import express, { json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { generateReplies } from './lib/groq.mjs'

dotenv.config()

const app = express()

app.use(cors())
app.use(json())

app.post('/api/generate', async (req, res) => {
  try {
    const {
      platform,
      tone,
      postText,
      post,
      extraContext,
      postType,
      variants,
    } = req.body ?? {}

    const text = postText ?? post

    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'postText is required' })
    }

    const result = await generateReplies({
      platform,
      tone,
      postText: text,
      extraContext,
      postType,
      variants: Boolean(variants),
    })

    return res.status(200).json(result)
  } catch (error) {
    console.error('Groq API error:', error.message)

    return res.status(500).json({
      error: error.message || 'Failed to generate reply',
    })
  }
})

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001')
})

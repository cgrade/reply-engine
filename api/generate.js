import { generateReplies } from '../lib/groq.mjs'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

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
}

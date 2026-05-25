import dotenv from 'dotenv'
import Groq from 'groq-sdk'

dotenv.config()

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

const NIGERIAN_CONVERSATION_VOICE = `HOW REAL NIGERIAN INTIMACY CONVERSATIONS SOUND (study this cadence):
- Educators like Elizabeth Adewale speak plain and direct: "Visiting someone's house is not consent" — no hedge words, no corporate warmth.
- Nairaland threads on libido: people blame exhaustion from home labour + jobs + childbirth, not "lack of love"; they say mood and emotional safety matter before sex; they warn against rushing to drugs/herbs without understanding root cause.
- Comments mix English and light Pidgin when casual; clinical when correcting myths; never preachy or American self-help tone.
- Relationship talk names real pressures: constant rejection in marriage, feeling unsexy postpartum, bride-price myths, "dinner equals access" thinking, menopause, stress cortisol — but in plain language, not textbook labels stacked together.

BANNED GENERIC PHRASES (never use — they scream AI):
"it's important to remember", "many women/many people", "self-care", "communication is key", "don't hesitate", "you're not alone", "valid feelings", "at the end of the day", "journey", "empower", "holistic approach", "intimate wellness journey", "hormonal fluctuations can impact" without naming ONE specific mechanism tied to THEIR post.

REQUIRED SPECIFICITY:
- Reference at least ONE concrete detail from their post (exhaustion, partner, kids, myth they stated, shame, pain, timeline).
- Name ONE specific mechanism (cortisol from chronic stress, responsive desire, postpartum recovery, nervous system safety, emotional disconnection after routine marriage).
- Insight must be screenshot-worthy — a fact they didn't already say, not a reword of their post.`

const TONE_GUIDANCE = {
  warm_educational: `Tone: Warm + Educational — like a knowledgeable older sister on Instagram comments. Teach without lecturing. Plain English, one science fact that lands.`,
  empathetic: `Tone: Empathetic — hold shame gently. Mirror exhaustion/rejection/fear first. No "fix your marriage" energy. Validate before explaining.`,
  witty_naija: `Tone: Witty + Naija — kind humour or light Pidgin (dey, no be, fit, waka) max one phrase; never clown the poster. Still clinically accurate underneath.`,
  myth_busting: `Tone: Myth-Busting — calm correction like Zikoko/Naija Feminists comments: consent is ongoing, bride price isn't body ownership, herbs aren't the first answer. Firm, not sarcastic.`,
}

const PLATFORM_GUIDANCE = {
  instagram: `Platform: Instagram comment. Warm, human, visually conversational. Short sentences. Feels like a real person in the comments.`,
  tiktok: `Platform: TikTok comment. Relatable, punchy, spoken-word rhythm. Slightly more casual than Instagram.`,
  x: `Platform: X reply. Sharp, concise, high signal per word. Cut filler — every phrase earns its place.`,
}

const POST_TYPE_GUIDANCE = {
  carousel: `Post type: Carousel. The user may describe one slide or the thread across slides. Mirror that specific slide's message; do not assume they saw other slides.`,
  video: `Post type: Video. Caption or spoken summary may be partial. Mirror the emotional hook of the video; insight can address what visuals imply.`,
  comment_thread: `Post type: Comment thread. You are replying to a comment, not the original post. Address the commenter's point directly.`,
  myth: `Post type: Myth / misinformation. Reframe must gently correct; insight is the fact-check line.`,
  personal_story: `Post type: Personal story. Mirror their vulnerability first; reframe normalises; insight validates without fixing.`,
  general: `Post type: General post. Treat all pasted context as ground truth.`,
}

const GOLD_EXAMPLES = {
  warm_educational: `Gold reply: "Home, kids and work on empty tank fit kill libido — no be say love don finish. Stress dey raise cortisol; body dey protect you. Desire often dey return when rest and emotional safety show face — no be laziness."`,
  empathetic: `Gold reply: "When body tire like this, closeness fit feel like another chore — that one dey make sense. E no be rejection; na depletion. You deserve gentleness while you recover, not pressure for performance."`,
  witty_naija: `Gold reply: "Libido no be switch wey dem dey turn on demand — NEPA sef get off days. Stress fit off desire sharp; when rest enter, e go waka back. No rush yourself, no be fault."`,
  myth_busting: `Gold reply: "Agreeing before no mean consent forever — body still get right to change mind. Dinner, gifts or bride price no buy access. Desire no be payment; e need safety and willing yes every time."`,
}

const BANNED_PATTERNS = [
  /intimova/i,
  /follow us/i,
  /check our page/i,
  /dm us/i,
  /book a session/i,
  /#\w+/,
]

const GENERIC_PATTERNS = [
  /it's important to remember/i,
  /many (women|people|couples)/i,
  /self[- ]?care/i,
  /communication is key/i,
  /don't hesitate/i,
  /you're not alone/i,
  /at the end of the day/i,
  /your feelings are valid/i,
  /holistic (approach|wellness)/i,
  /empower(yourself)?/i,
]

const BRAND_SYSTEM_PROMPT = `You are the voice behind Intimova — Nigeria's most trusted sexual wellness brand. You sound like a warm, knowledgeable Nigerian woman with clinical-level wellness knowledge. You write as a real person in the comments section, never a brand account.

${NIGERIAN_CONVERSATION_VOICE}

CORE IDENTITY:
- Warm, empathetic, non-judgmental, clinically informed
- Authentically Nigerian — Pidgin and cultural references only when they fit naturally
- Never promotional. Never mention Intimova, any handle, product, or page
- Never say "follow us", "check our page", "DM us", or any CTA
- Never explicit — say "intimate wellness", "body's signals", "hormonal response", "arousal", "libido"
- Never shame, blame, or diagnose the poster

THE 5-PART REPLY STRUCTURE (every public comment):
Weave Parts 1–3 into one flowing comment. Parts 4–5 only when they fit without exceeding 250 characters. Never label the parts. Never use "Part 1" or bullet points.

Part 1 — THE MIRROR (mandatory):
- Reflect their experience with empathy and zero judgment
- They must feel seen before they feel taught
- Do NOT quote or repeat their words verbatim — rephrase with warmth and clinical neutrality
- Name the feeling or situation, not just the topic

Part 2 — THE REFRAME (mandatory):
- Introduce biological, hormonal, or psychological context
- Shift "something is wrong with me" → "this has a documented cause"
- Sound like a knowledgeable friend, not a lecturer or textbook
- One clear mechanism (stress, hormones, sleep, nervous system, relationship dynamics, etc.)

Part 3 — THE INSIGHT (mandatory):
- One genuinely useful fact, clinical observation, or practical truth that extends the post
- This is the screenshot-worthy line — specific, not generic wellness platitudes
- Avoid clichés like "self-care is important" or "communication is key" unless made concrete

Part 4 — THE CULTURAL BRIDGE (optional):
- Nigerian angle, light Pidgin, or relatable local observation
- Only if it flows naturally and fits the platform
- Never stereotype or perform "Nigerian-ness" for its own sake

Part 5 — THE OPEN DOOR (optional):
- Gentle closing question or soft observation
- Never a CTA, never a brand mention, never "you should buy" or "book a session"

COMPRESSION RULES (250-character hard limit):
- Count every character including spaces and punctuation
- Prefer tight, flowing prose over listing all five parts explicitly
- If tight on space: keep Mirror + Reframe + Insight; drop Parts 4 and 5 first

QUALITY BAR (fail internally and rewrite if any is false):
- Mirror names THEIR situation (not generic "stress affects many")
- Reframe cites ONE named mechanism tied to their post
- Insight adds new information they did not already say
- Reads like a Nigerian commenter, not American wellness Instagram

ABSOLUTE OUTPUT RULES:
- Maximum 250 characters per reply
- No hashtags
- No emojis unless the original post uses them`

function resolveTone(toneId) {
  return TONE_GUIDANCE[toneId] ?? TONE_GUIDANCE.warm_educational
}

function resolvePlatform(platformId) {
  return PLATFORM_GUIDANCE[platformId] ?? PLATFORM_GUIDANCE.instagram
}

function resolvePostType(postTypeId) {
  return POST_TYPE_GUIDANCE[postTypeId] ?? POST_TYPE_GUIDANCE.general
}

function resolveGoldExample(toneId) {
  return GOLD_EXAMPLES[toneId] ?? GOLD_EXAMPLES.warm_educational
}

export function sanitizeReply(raw, { strictGeneric = true } = {}) {
  if (!raw) return ''

  let reply = String(raw)
    .replace(/^["']|["']$/g, '')
    .replace(/^here is the reply:?\s*/i, '')
    .trim()

  if (reply.length > 250) {
    reply = reply.slice(0, 250).replace(/\s+\S*$/, '').trim()
  }

  for (const pattern of BANNED_PATTERNS) {
    if (pattern.test(reply)) {
      throw new Error('Reply contained blocked brand or promotional content')
    }
  }

  if (
    strictGeneric &&
    GENERIC_PATTERNS.some((pattern) => pattern.test(reply))
  ) {
    throw new Error('Reply sounded too generic — regenerate')
  }

  return reply
}

function safeSanitize(raw) {
  try {
    return sanitizeReply(raw, { strictGeneric: false })
  } catch {
    return ''
  }
}

const GROQ_TIMEOUT_MS = 45_000

function withTimeout(promise, label = 'Groq request') {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(
        () => reject(new Error(`${label} timed out after ${GROQ_TIMEOUT_MS / 1000}s`)),
        GROQ_TIMEOUT_MS
      )
    }),
  ])
}

function buildUserPrompt({
  platform,
  tone,
  postText,
  extraContext,
  postType,
  variantMode,
}) {
  const variantInstructions = variantMode
    ? `
Return exactly 3 DISTINCT reply angles as valid JSON only — no markdown:
{"replies":["angle A text","angle B text","angle C text"]}

Angle A — Empathy-first: heavier Mirror, softer Reframe.
Angle B — Science-first: clearer Reframe + screenshot-worthy Insight.
Angle C — Cultural warmth: natural Nigerian/Pidgin bridge if it fits; gentle Open Door if space allows.

Each reply: own wording, same 5-part structure felt inside, under 250 characters each.`
    : `
Write ONE comment using the 5-part structure (Parts 1–3 required; 4–5 only if space allows).
Hard maximum: 250 characters. Output ONLY the reply text.`

  return `${resolvePlatform(platform)}
${resolveTone(tone)}
${resolvePostType(postType)}
${resolveGoldExample(tone)}
${extraContext ? `Additional context (weave in naturally if relevant): ${extraContext}` : ''}

Post / context to reply to:
"""
${postText}
"""

Step 1 — Extract from the post: their exact feeling/claim, the myth or fear, one Nigerian-life detail (work, kids, partner, church, shame).
Step 2 — Pick one mechanism and one insight that directly answers THAT post — not generic libido advice.
Step 3 — Write; every reply must mention something only this post implies.
${variantInstructions}`
}

function parseVariants(content) {
  const trimmed = content.trim()

  try {
    const jsonMatch = trimmed.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0])
      if (Array.isArray(parsed.replies) && parsed.replies.length > 0) {
        return parsed.replies.map(safeSanitize).filter(Boolean)
      }
    }
  } catch {
    // fall through
  }

  const lines = trimmed
    .split(/\n+/)
    .map((line) => line.replace(/^(angle [abc]:?|reply \d:?)\s*/i, '').trim())
    .filter((line) => line.length >= 25)

  if (lines.length >= 2) {
    return lines.slice(0, 3).map(safeSanitize).filter(Boolean)
  }

  return []
}

async function callGroq(userPrompt, { jsonMode = false } = {}) {
  const completion = await withTimeout(
    groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: jsonMode ? 400 : 150,
      temperature: jsonMode ? 0.72 : 0.58,
      messages: [
        { role: 'system', content: BRAND_SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      ...(jsonMode ? { response_format: { type: 'json_object' } } : {}),
    }),
    'Groq API call'
  )

  const content = completion.choices[0]?.message?.content?.trim()

  if (!content) {
    throw new Error('Empty response received from Groq')
  }

  return content
}

export async function generateReply(
  platform,
  tone,
  postText,
  extraContext,
  postType = 'general'
) {
  const userPrompt = buildUserPrompt({
    platform,
    tone,
    postText,
    extraContext,
    postType,
    variantMode: false,
  })

  const content = await callGroq(userPrompt)
  try {
    return sanitizeReply(content, { strictGeneric: true })
  } catch {
    return sanitizeReply(content, { strictGeneric: false })
  }
}

export async function generateReplyVariants(
  platform,
  tone,
  postText,
  extraContext,
  postType = 'general',
  count = 3
) {
  const userPrompt = buildUserPrompt({
    platform,
    tone,
    postText,
    extraContext,
    postType,
    variantMode: true,
  })

  const content = await callGroq(userPrompt, { jsonMode: true })
  const unique = []
  const seen = new Set()

  for (const reply of parseVariants(content)) {
    const key = reply.toLowerCase()
    if (!seen.has(key)) {
      seen.add(key)
      unique.push(reply)
    }
    if (unique.length >= count) break
  }

  if (unique.length === 0) {
    const fallback = await generateReply(
      platform,
      tone,
      postText,
      extraContext,
      postType
    )
    return [fallback]
  }

  return unique.slice(0, count)
}

export async function generateReplies(options) {
  const {
    platform,
    tone,
    postText,
    extraContext,
    postType = 'general',
    variants = false,
  } = options

  const text = postText?.trim()
  if (!text) {
    throw new Error('postText is required')
  }

  if (variants) {
    const replies = await generateReplyVariants(
      platform,
      tone,
      text,
      extraContext,
      postType
    )
    return { replies }
  }

  const reply = await generateReply(
    platform,
    tone,
    text,
    extraContext,
    postType
  )
  return { reply }
}

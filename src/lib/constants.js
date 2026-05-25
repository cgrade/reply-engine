export const POST_TYPES = [
  { id: 'general', label: 'General', emoji: '💬' },
  { id: 'carousel', label: 'Carousel', emoji: '📷' },
  { id: 'video', label: 'Video', emoji: '▶' },
  { id: 'comment_thread', label: 'Comment', emoji: '↩' },
  { id: 'myth', label: 'Myth / misinfo', emoji: '⚡' },
  { id: 'personal_story', label: 'Personal story', emoji: '🤍' },
]

export const EXAMPLE_POSTS = [
  {
    id: 'exhaustion',
    label: 'Exhaustion & libido',
    postType: 'personal_story',
    post: "Why am I never in the mood anymore? I'm always exhausted — kids, work, house — and my partner thinks I don't love them anymore.",
    extraContext: 'Instagram comment, she sounds ashamed',
  },
  {
    id: 'foreplay-myth',
    label: 'Foreplay myth',
    postType: 'myth',
    post: 'Real men dont need foreplay. If she wants you she should be wet already. Stop being lazy in bed.',
    extraContext: 'X thread, many men agreeing',
  },
  {
    id: 'consent-myth',
    label: 'Consent myth',
    postType: 'myth',
    post: 'If she came to your house she already agreed. Stop this Western consent talk.',
    extraContext: 'Comment on Zikoko-style post',
  },
]

export const VARIANT_LABELS = ['Empathy-first', 'Science-first', 'Cultural warmth']

export const PLATFORMS = [
    {
      id: 'instagram',
      label: 'Instagram',
      icon: '◎',
    },
    {
      id: 'tiktok',
      label: 'TikTok',
      icon: '♪',
    },
    {
      id: 'x',
      label: 'X',
      icon: '𝕏',
    },
  ]
  
  export const TONES = [
    {
      id: 'warm_educational',
      label: 'Warm + Educational',
      emoji: '📚',
    },
    {
      id: 'empathetic',
      label: 'Empathetic',
      emoji: '🤍',
    },
    {
      id: 'witty_naija',
      label: 'Witty + Naija',
      emoji: '😏',
    },
    {
      id: 'myth_busting',
      label: 'Myth-Busting',
      emoji: '💡',
    },
  ]
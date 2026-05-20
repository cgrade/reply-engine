const OPENERS = [
    'A lot of people quietly experience this.',
    'Your body is not failing you.',
    'Stress changes hormonal response more than people realise.',
    'Exhaustion can disconnect people from desire completely.',
  ]
  
  const INSIGHTS = [
    'Cortisol and chronic stress can suppress libido for months.',
    'Responsive desire is real, especially after emotional burnout.',
    'Many women need emotional safety before physical desire returns.',
    'The nervous system affects intimacy more than people think.',
  ]
  
  export function mockGenerate(post, tone) {
    const opener = OPENERS[Math.floor(Math.random() * OPENERS.length)]
    const insight = INSIGHTS[Math.floor(Math.random() * INSIGHTS.length)]
  
    const styles = {
      witty_naija: 'Na body dey talk sometimes, no be wickedness.',
      empathetic: 'You deserve softness while figuring this out.',
      myth_busting: 'People oversimplify intimacy far too much.',
      warm_educational: 'There is usually a biological layer beneath this.',
    }
  
    return `${opener} ${insight} ${styles[tone] || ''}`.slice(0, 250)
  }
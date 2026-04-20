export const QUESTS = [
  {
    id: 1, title: 'What is an ETF?', icon: '📊',
    desc: 'Learn what ETFs are and why they are the most powerful tool for everyday investors.',
    tags: ['Basics', '5 min'], xp: 50, gold: 10,
    lesson: {
      intro: 'Before you invest a single euro, you need to understand the tool that will build your wealth. ETFs are the single most important financial innovation for everyday investors.',
      blocks: [
        { label: 'The concept', heading: 'What exactly is an ETF?', body: 'ETF stands for Exchange Traded Fund. It\'s a basket of many stocks or bonds bundled into a single investment you can buy like a regular share. One purchase — instant diversification across hundreds or thousands of companies.', highlight: 'One MSCI World ETF gives you exposure to 1,600+ companies across 23 countries — for as little as €1/month.' },
        { label: 'Why it matters', heading: 'ETFs vs. picking single stocks', body: 'Most professional fund managers fail to beat the market long-term. ETFs don\'t try to beat the market — they simply track it. And historically, that beats 90% of active strategies.', highlight: 'Over 15 years, 88% of active fund managers underperformed a simple index ETF.' },
      ],
      quiz: {
        question: 'What is the main advantage of an ETF over picking individual stocks?',
        options: [
          { text: 'ETFs always guarantee higher returns', correct: false },
          { text: 'ETFs provide instant diversification at low cost', correct: true },
          { text: 'ETFs only invest in tech companies', correct: false },
          { text: 'ETFs are only for professional investors', correct: false },
        ],
        correctFeedback: 'Correct! Diversification is the superpower of ETFs.',
        wrongFeedback: 'The key benefit is diversification — instant exposure to many companies with a single purchase.',
      },
    },
  },
  {
    id: 2, title: 'Accumulating vs. Distributing', icon: '🔄',
    desc: 'Understand the difference between reinvesting dividends and taking them as cash.',
    tags: ['ETF Types', '5 min'], xp: 60, gold: 12,
    lesson: {
      intro: 'When a company in your ETF pays dividends, your ETF has to do something with that money. The answer shapes how your wealth grows.',
      blocks: [
        { label: 'Type 1', heading: 'Accumulating ETFs', body: 'Accumulating ETFs automatically reinvest dividends back into the fund. Your shares grow in value. This is compound interest working silently for you.', highlight: 'For long-term wealth building, accumulating ETFs are almost always the better choice.' },
        { label: 'Type 2', heading: 'Distributing ETFs', body: 'Distributing ETFs pay dividends directly into your account as cash. Great if you need regular income. But if you reinvest manually, you may owe tax on each payout.', highlight: 'In Germany and most EU countries, receiving dividends triggers immediate tax. Accumulating ETFs defer this.' },
      ],
      quiz: {
        question: 'For a 25-year-old building long-term wealth, which ETF type is generally better?',
        options: [
          { text: 'Distributing — to get regular cash payouts', correct: false },
          { text: 'Accumulating — to benefit from automatic compounding', correct: true },
          { text: 'Both are always identical in outcome', correct: false },
          { text: 'Neither — only buy individual stocks', correct: false },
        ],
        correctFeedback: 'Spot on! Accumulating ETFs let compound interest do its magic.',
        wrongFeedback: 'When dividends are reinvested automatically, your money grows exponentially without manual action.',
      },
    },
  },
  {
    id: 3, title: 'Open Your First Broker', icon: '🏦',
    desc: 'A step-by-step mission to get you set up with a real investing account.',
    tags: ['Action', '10 min'], xp: 100, gold: 25,
    lesson: {
      intro: 'This quest turns knowledge into action. Opening a broker account is the most important financial move most people never take.',
      blocks: [
        { label: 'Step 1', heading: 'Choose your broker', body: 'For European beginners, Trade Republic and Scalable Capital both let you start a savings plan from €1/month with no order fees.', highlight: 'Recommended: Trade Republic (mobile-first, ultra-simple) or Scalable Capital (more features).' },
        { label: 'Step 2', heading: 'Set up a savings plan', body: 'Choose your ETF (MSCI World), choose an amount (even €50 works), choose a date. The money moves automatically every month.', highlight: '€50/month at 7%/year for 35 years = €97,000 — from only €21,000 invested.' },
      ],
      quiz: {
        question: 'What is the key advantage of an automated monthly savings plan?',
        options: [
          { text: 'You can time the market perfectly every month', correct: false },
          { text: 'It removes emotion and ensures consistency', correct: true },
          { text: 'Brokers charge lower fees for automated plans', correct: false },
          { text: 'Automated plans always buy at the lowest price', correct: false },
        ],
        correctFeedback: 'Exactly! Automation removes emotion — the #1 enemy of investors.',
        wrongFeedback: 'The real power is psychological: automation removes the temptation to time the market.',
      },
    },
  },
  {
    id: 4, title: 'The 3-Fund Portfolio', icon: '⚖️',
    desc: 'The simplest, most diversified investment strategy used by millions of smart investors.',
    tags: ['Portfolio', '8 min'], xp: 80, gold: 20,
    lesson: {
      intro: 'Most investors overcomplicate things. The 3-fund portfolio is beautifully simple.',
      blocks: [
        { label: 'The strategy', heading: 'Three funds. Global coverage. Done.', body: 'The 3-fund portfolio uses just three ETFs: a developed markets fund (MSCI World), an emerging markets fund, and optionally a bond fund for stability.', highlight: 'Classic allocation: 80% MSCI World + 20% Emerging Markets. No stock picking needed.' },
        { label: 'Rebalancing', heading: 'Once a year: rebalance', body: 'Over time, one fund grows faster and your allocation drifts. Once a year, sell a little of the overperformer and buy the underperformer. This forces you to buy low and sell high automatically.', highlight: 'Rebalancing annually takes 15 minutes and is one of the most effective portfolio techniques.' },
      ],
      quiz: {
        question: 'What is the purpose of annual rebalancing?',
        options: [
          { text: 'To switch to better-performing funds every year', correct: false },
          { text: 'To restore your target allocation and buy low, sell high', correct: true },
          { text: 'To reduce your tax bill by selling everything', correct: false },
          { text: 'Rebalancing is only for professionals', correct: false },
        ],
        correctFeedback: 'Perfect! Rebalancing restores your target allocation and enforces buying cheap.',
        wrongFeedback: 'Rebalancing maintains your risk profile and systematically buys what\'s cheap.',
      },
    },
  },
  {
    id: 5, title: '5 Mistakes to Avoid', icon: '⚠️',
    desc: 'The most common beginner errors — and exactly how to sidestep each one.',
    tags: ['Wisdom', '6 min'], xp: 70, gold: 30,
    lesson: {
      intro: 'Knowing what NOT to do is worth even more than knowing what to do.',
      blocks: [
        { label: 'Mistakes 1–3', heading: 'The deadly trio', body: 'Mistake 1: Waiting for the right moment. Mistake 2: Panic-selling during a crash. Mistake 3: Paying high fees. A 1% annual fee can cost you 25% of your final portfolio over 30 years.', highlight: 'Always check the TER (Total Expense Ratio). Target: under 0.25%/year.' },
        { label: 'Mistakes 4–5', heading: 'The subtle killers', body: 'Mistake 4: Investing money you might need soon — always have 3-6 months emergency fund first. Mistake 5: Checking your portfolio every day leads to emotional decisions.', highlight: 'Set it up correctly once, automate it, and check it quarterly at most.' },
      ],
      quiz: {
        question: 'An investor sees their portfolio drop 30%. What should they do?',
        options: [
          { text: 'Sell everything to prevent further losses', correct: false },
          { text: 'Do nothing — or buy more if they can afford to', correct: true },
          { text: 'Switch all funds to cash immediately', correct: false },
          { text: 'Check the portfolio every hour and decide then', correct: false },
        ],
        correctFeedback: 'Exactly right! Every major market crash in history has recovered.',
        wrongFeedback: 'Selling during a crash turns a temporary paper loss into a permanent real loss.',
      },
    },
  },
]

export const LEVEL_NAMES = ['Novice', 'Apprentice', 'Investor', 'Strategist', 'Wealth Master']
export const XP_PER_LEVEL = 100

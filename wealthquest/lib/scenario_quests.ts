// Scenario Quest data — overlays on top of existing quest IDs 1-5

export type ScenarioChoice = {
  id: string
  label: string
  icon: string
  desc: string
  isOptimal: boolean
  consequence: string
  portfolioImpact: number
  timeframe: string
  aldricFeedback: string
  emotionalLabel: string
  biasLabel: string
}

export type ScenarioData = {
  questId: number
  situation: string
  portfolioValue: number
  portfolioSnapshot: { label: string; pct: number; color: string }[]
  question: string
  aldricOpening: string
  choices: ScenarioChoice[]
  reflection: string
  statFact: string
  skillUnlocked: string
}

export const SCENARIO_QUESTS: ScenarioData[] = [
  {
    questId: 1,
    situation: "It's Monday morning. The DAX drops 6% on surprise inflation data. Social media is full of \"SELL EVERYTHING\" posts. Your portfolio is down €1,840 today.",
    portfolioValue: 28160,
    portfolioSnapshot: [
      { label: 'MSCI World ETF', pct: 60, color: '#3A9E5C' },
      { label: 'Emerging Markets', pct: 20, color: '#3B7AD8' },
      { label: 'Cash', pct: 20, color: '#A89E90' },
    ],
    question: 'Markets are falling fast. What do you do?',
    aldricOpening: "The market is testing your discipline today — not your knowledge. Take a breath before you decide.",
    choices: [
      {
        id: 'sell_all', label: 'Sell Everything', icon: '🏃',
        desc: 'Convert to cash and stop the bleeding',
        isOptimal: false, biasLabel: 'Panic Selling',
        consequence: 'Markets recover +9% over the next 3 weeks. You are out. The €1,840 paper loss becomes a permanent real loss — and you miss the full recovery.',
        portfolioImpact: -6.5, timeframe: '3 weeks later',
        aldricFeedback: 'You did what 72% of beginners do — and it cost you. Selling converts a temporary paper loss into a permanent real one. Markets always recover from 6% drops. Always.',
        emotionalLabel: 'Panic Selling · Loss Aversion',
      },
      {
        id: 'hold', label: 'Hold My Plan', icon: '🧘',
        desc: 'Do nothing. Stay the course.',
        isOptimal: true, biasLabel: 'Disciplined',
        consequence: 'Markets recover in 3 weeks. Your portfolio is back above where it started — plus €420. You did nothing and won.',
        portfolioImpact: +1.5, timeframe: '6 weeks later',
        aldricFeedback: 'Excellent discipline. Doing nothing during a crash is one of the hardest and most rewarding decisions in investing. Only 28% of investors hold here. You are in rare company.',
        emotionalLabel: 'Disciplined Investor',
      },
      {
        id: 'buy_more', label: 'Buy More', icon: '💪',
        desc: 'Use cash to buy ETFs at a discount',
        isOptimal: true, biasLabel: 'Contrarian Thinking',
        consequence: 'You buy at the low. Markets recover +9%. Your additional shares amplify the gains. Portfolio is +€890 above your starting point.',
        portfolioImpact: +3.2, timeframe: '6 weeks later',
        aldricFeedback: 'Be greedy when others are fearful. You just did what Warren Buffett recommends — bought when everyone else was panicking. This is the mindset that builds generational wealth.',
        emotionalLabel: 'Contrarian Thinking',
      },
    ],
    reflection: 'A 6% single-day drop feels catastrophic. Statistically, it is completely normal. The MSCI World has experienced 200+ single-day drops of 5% or more since 1970 — and recovered from every single one.',
    statFact: '72% of retail investors sell during the first major crash they experience — and almost all of them regret it.',
    skillUnlocked: 'Loss Aversion Recognition',
  },
  {
    questId: 2,
    situation: "Nvidia is up +34% this week. Your friend invested €5,000 and made €1,700. Your MSCI World ETF is up just +1.2% this week. You have €3,000 in cash.",
    portfolioValue: 24120,
    portfolioSnapshot: [
      { label: 'MSCI World ETF', pct: 80, color: '#3A9E5C' },
      { label: 'Cash', pct: 20, color: '#A89E90' },
    ],
    question: 'Your friend is getting rich on Nvidia. What do you do?',
    aldricOpening: "Your friend's gains feel very real right now. But remember: your MSCI World already holds Nvidia. The question is how much concentration risk you want.",
    choices: [
      {
        id: 'buy_nvidia', label: 'Buy Nvidia Now', icon: '🎰',
        desc: 'Put €3,000 into Nvidia — I want in',
        isOptimal: false, biasLabel: 'FOMO',
        consequence: 'Nvidia corrects -28% over the next 4 weeks. You bought the top. Loss: €840. Your MSCI World keeps growing steadily.',
        portfolioImpact: -3.5, timeframe: '4 weeks later',
        aldricFeedback: 'You bought at the exact top — which is what FOMO investing almost always produces. Your friend got lucky on timing. You got the painful lesson. The good news: this was simulated money, not real euros.',
        emotionalLabel: 'FOMO · Recency Bias',
      },
      {
        id: 'stay_course', label: 'Stay With My ETF', icon: '🧭',
        desc: 'My MSCI World already holds Nvidia',
        isOptimal: true, biasLabel: 'Disciplined',
        consequence: 'Nvidia corrects -28%. Your friend loses €1,400 of his gains. Your MSCI World continues its steady climb. You are €840 ahead of where you would have been.',
        portfolioImpact: +0.8, timeframe: '4 weeks later',
        aldricFeedback: 'Perfect thinking. Your MSCI World holds Nvidia at approximately 3.5% weight — you captured the upside without the concentration risk. This is exactly how smart investors think.',
        emotionalLabel: 'Disciplined · Long-term Thinking',
      },
      {
        id: 'wait', label: 'Wait and Watch', icon: '👀',
        desc: 'Keep cash, see what happens first',
        isOptimal: false, biasLabel: 'Decision Paralysis',
        consequence: 'Nvidia corrects -28%. You avoided the trap — well done. But your cash earned nothing and lost real value to inflation. Inaction always has a cost too.',
        portfolioImpact: -0.5, timeframe: '4 weeks later',
        aldricFeedback: 'You avoided the FOMO trap — well done. But cash sitting idle is not a neutral decision. It loses real value to inflation every single day. Inaction is also a choice with consequences.',
        emotionalLabel: 'Decision Paralysis',
      },
    ],
    reflection: 'FOMO investing costs the average investor 3.2% in annual returns. Your MSCI World ETF already holds Nvidia, Apple, Microsoft and 1,597 other companies — you own all the winners without concentration risk.',
    statFact: 'Investors who chase last month\'s top performer underperform the index by an average of 3.8% annually.',
    skillUnlocked: 'FOMO Recognition',
  },
  {
    questId: 3,
    situation: "The ECB raises rates by 0.75% — a surprise. Bonds fall -4% instantly. Stocks fall -3%. Only your cash position is safe today. Everyone is talking about the rate hike.",
    portfolioValue: 31750,
    portfolioSnapshot: [
      { label: 'MSCI World ETF', pct: 70, color: '#3A9E5C' },
      { label: 'Global Bonds', pct: 15, color: '#9B59B6' },
      { label: 'Cash', pct: 15, color: '#A89E90' },
    ],
    question: 'Interest rates just surged. Your bonds are falling. What do you do?',
    aldricOpening: "Interest rates and bond prices always move in opposite directions — that is mathematics, not opinion. The question is: what do you do with that knowledge right now?",
    choices: [
      {
        id: 'sell_bonds', label: 'Sell Bonds Now', icon: '❌',
        desc: 'Cut losses — bonds will keep falling',
        isOptimal: false, biasLabel: 'Reactive Selling',
        consequence: 'Rates stabilise after 6 weeks. Bonds recover +3%. You sold at the bottom, realised the loss, and missed the full recovery. Net result: -7% on your bond position.',
        portfolioImpact: -1.1, timeframe: '6 weeks later',
        aldricFeedback: 'Selling bonds after the rate hike already happened means the market had already priced in the damage. By selling, you turned a temporary unrealised loss into a permanent real one.',
        emotionalLabel: 'Reactive Selling · Hindsight Bias',
      },
      {
        id: 'hold_all', label: 'Hold Everything', icon: '📊',
        desc: 'My diversified portfolio can absorb this',
        isOptimal: true, biasLabel: 'Disciplined',
        consequence: 'Rates stabilise. Bonds recover +3% over 3 months. Stocks rise +7%. Your diversified portfolio absorbed the shock exactly as designed.',
        portfolioImpact: +2.1, timeframe: '6 months later',
        aldricFeedback: 'Your portfolio was built for exactly this moment. Bonds fell — but they cushioned your equity exposure. Then both recovered. This is why diversification exists. You did not need to do anything.',
        emotionalLabel: 'Disciplined · Macro Aware',
      },
      {
        id: 'buy_stocks', label: 'Shift Cash to Stocks', icon: '📈',
        desc: 'Stocks are cheaper — buy more equities',
        isOptimal: true, biasLabel: 'Contrarian Thinking',
        consequence: 'Stocks fall another -5% before recovering. Your timing was early — but your long-term thinking was correct. Over 6 months: +9% on the additional equity position.',
        portfolioImpact: +1.8, timeframe: '6 months later',
        aldricFeedback: 'Good instinct — stocks often present opportunities during rate shock events. Your timing was slightly early, but the long-term thinking was correct. Tactical reallocation during macro events is an advanced skill.',
        emotionalLabel: 'Contrarian · Macro Understanding',
      },
    ],
    reflection: 'When interest rates rise, existing bond prices fall — because newer bonds pay higher rates, making old bonds less attractive. This is mechanics, not a crisis. Bonds still play their role: they recover and reduce overall portfolio volatility.',
    statFact: 'After ECB rate hike events, investors who sold bonds missed an average +4.2% recovery within 6 months.',
    skillUnlocked: 'Interest Rate Mechanics',
  },
  {
    questId: 4,
    situation: "You unexpectedly inherit €15,000. Everyone has advice: your father says gold, your friend says Bitcoin, your bank advisor is pushing an active fund with a 1.8% TER. You need to decide.",
    portfolioValue: 15000,
    portfolioSnapshot: [
      { label: 'Cash (inherited)', pct: 100, color: '#A89E90' },
    ],
    question: 'You have €15,000 to invest right now. What is your move?',
    aldricOpening: "Sudden money creates sudden pressure to act perfectly. There is no perfect. There is only evidence-based and disciplined.",
    choices: [
      {
        id: 'lump_sum', label: 'Invest All Now', icon: '🚀',
        desc: 'Put all €15,000 into MSCI World ETF immediately',
        isOptimal: true, biasLabel: 'Evidence-Based',
        consequence: 'Markets rise +11% over 12 months. Your full €15,000 compounds from day one. Final value: €16,650. Lump sum wins again — as it does in 68% of historical cases.',
        portfolioImpact: +11, timeframe: '12 months later',
        aldricFeedback: 'Statistically the right call. Vanguard research shows lump sum investing beats DCA in approximately 2 out of 3 cases — because markets trend upward over time. Every day you wait costs you expected return.',
        emotionalLabel: 'Evidence-Based · Time In Market',
      },
      {
        id: 'dca', label: 'Invest €1,250/Month', icon: '📅',
        desc: 'Spread over 12 months to reduce timing risk',
        isOptimal: true, biasLabel: 'Disciplined',
        consequence: 'Markets rise +11%. You catch most of the gain. Final value: €16,180 — slightly less than lump sum, but you slept better every night.',
        portfolioImpact: +7.9, timeframe: '12 months later',
        aldricFeedback: 'Psychologically sound and completely valid — especially for large windfalls that feel emotionally significant. The best strategy is the one you can emotionally sustain without abandoning during the first dip.',
        emotionalLabel: 'Disciplined · Risk Aware',
      },
      {
        id: 'wait', label: 'Wait for a Correction', icon: '⏳',
        desc: 'Hold cash until markets dip, then invest',
        isOptimal: false, biasLabel: 'Market Timing',
        consequence: 'Markets rise +11% without a significant correction. You wait 12 months. Your cash loses 3% to inflation. You invest at higher prices. Total cost of waiting: over €1,800.',
        portfolioImpact: -3, timeframe: '12 months later',
        aldricFeedback: 'Waiting for a correction that may never come is market timing. It almost never works. Markets are up approximately 75% of all calendar years. Every day in the market is better than every day waiting to enter.',
        emotionalLabel: 'Market Timing · Decision Paralysis',
      },
      {
        id: 'bank_fund', label: 'Take the Bank Fund', icon: '🏦',
        desc: 'The advisor seems professional and trustworthy',
        isOptimal: false, biasLabel: 'Authority Bias',
        consequence: 'The active fund underperforms the MSCI World by -2.3% annually after its 1.8% TER. Over 30 years, this costs you €54,000 in lost wealth. Silently. Invisibly. Every year.',
        portfolioImpact: -2.3, timeframe: '30 years later',
        aldricFeedback: 'The advisor is selling a product, not giving advice. A 1.8% TER on €15,000 over 30 years destroys €54,000 in wealth. Always check the TER before you sign anything.',
        emotionalLabel: 'Authority Bias · Fee Blindness',
      },
    ],
    reflection: 'Lump sum vs DCA is not a moral question — it is a mathematical one. Lump sum wins in 68% of cases. But the best choice is always the one you will not abandon during the first market dip.',
    statFact: 'Active funds with TERs above 1.5% underperform simple index ETFs in over 90% of 15-year periods.',
    skillUnlocked: 'Lump Sum vs DCA · Fee Impact',
  },
  {
    questId: 5,
    situation: "Month 14 of a bear market. Your portfolio is -31% from its peak. Every headline screams recession. You have been investing €300/month the entire time and are down €9,300 on paper.",
    portfolioValue: 20700,
    portfolioSnapshot: [
      { label: 'MSCI World ETF', pct: 85, color: '#3A9E5C' },
      { label: 'Cash', pct: 15, color: '#A89E90' },
    ],
    question: 'Month 14 of the bear market. Still no recovery. What do you do with your savings plan?',
    aldricOpening: "You have survived 14 months of pain. What you do right now — at the moment of maximum despair — will define your long-term results more than almost any other single decision.",
    choices: [
      {
        id: 'pause', label: 'Pause the Savings Plan', icon: '⏸️',
        desc: 'Stop investing until markets recover',
        isOptimal: false, biasLabel: 'Capitulation',
        consequence: 'You paused at the exact bottom. Markets recover +48% over 18 months. You missed buying the cheapest prices in years. Opportunity cost: €11,400 in foregone gains.',
        portfolioImpact: -15, timeframe: '18 months later',
        aldricFeedback: 'You paused at exactly the wrong moment. Your €300/month was buying more shares than ever — at 31% discount. By pausing, you stopped accumulating the cheap shares that would have driven enormous gains in the recovery.',
        emotionalLabel: 'Capitulation · Anchoring Bias',
      },
      {
        id: 'continue', label: 'Keep Investing €300/Month', icon: '💪',
        desc: 'Stay the course — this is exactly the plan',
        isOptimal: true, biasLabel: 'Disciplined',
        consequence: 'You kept buying through the bottom. Recovery: +48% over 18 months. Your consistent buying at -31% prices amplifies your gains dramatically. Portfolio far exceeds its previous peak.',
        portfolioImpact: +22, timeframe: '18 months later',
        aldricFeedback: 'This is what separates wealthy investors from average ones. Month 14 of a bear market is when most people quit — and when the most important buying happens. Every €300 you invested during this period generated outsized returns in the recovery.',
        emotionalLabel: 'Disciplined · DCA Power',
      },
      {
        id: 'double', label: 'Double to €600/Month', icon: '🔥',
        desc: 'Everything is on sale — buy as much as possible',
        isOptimal: true, biasLabel: 'Contrarian',
        consequence: 'You maximised buying at the bottom. Recovery: +48%. Your aggressive accumulation generates extraordinary gains. This becomes your best-performing investing period ever.',
        portfolioImpact: +38, timeframe: '18 months later',
        aldricFeedback: 'The rarest and most powerful investor behaviour: doubling down at maximum pain. Bear markets are the greatest transfer of wealth from the impatient to the patient. If your cash flow supported it — this was optimal.',
        emotionalLabel: 'Contrarian · Conviction Investing',
      },
    ],
    reflection: 'A bear market for a savings plan investor is not a threat — it is an opportunity. Every €300 buys 31% more shares than at the peak. The investors who kept buying through 2008 and 2020 achieved their best long-term returns.',
    statFact: 'Investors who paused savings plans during the 2020 COVID crash missed an average of 48% recovery gains in the following 12 months.',
    skillUnlocked: 'Bear Market Psychology · DCA Power',
  },
]

export function getScenarioQuest(questId: number): ScenarioData | null {
  return SCENARIO_QUESTS.find(s => s.questId === questId) || null
}

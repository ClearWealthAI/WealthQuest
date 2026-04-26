// ─── IDENTITY SYSTEM ──────────────────────────────────────────────────────────
// Tracks what kind of investor the user behaves like across all scenario quests

export type InvestorIdentity = {
  id: string
  label: string
  icon: string
  color: string
  description: string
  strengths: string[]
  watchOut: string
  famousExample: string
}

export const INVESTOR_IDENTITIES: Record<string, InvestorIdentity> = {
  'Disciplined Investor': {
    id: 'disciplined',
    label: 'Disciplined Investor',
    icon: '🧘',
    color: '#3A9E5C',
    description: 'You stay consistent under pressure. When markets fall, you hold. When others panic, you think. This is the rarest and most valuable investor trait.',
    strengths: ['Holds through crashes', 'Ignores short-term noise', 'Trusts the long-term process'],
    watchOut: 'Discipline without flexibility can sometimes miss genuine signals for change.',
    famousExample: 'Warren Buffett — held through every crash since 1965.',
  },
  'Loss Avoider': {
    id: 'loss_avoider',
    label: 'Loss Avoider',
    icon: '🛡️',
    color: '#E8453A',
    description: 'You feel losses more intensely than gains. This is normal human psychology — but costly for investors. The urge to stop the pain often causes the most permanent damage.',
    strengths: ['Protects capital in theory', 'Risk-aware mindset'],
    watchOut: 'Selling during crashes converts temporary paper losses into permanent real ones.',
    famousExample: 'The average retail investor who sold in March 2020 — and bought back at the highs.',
  },
  'FOMO Investor': {
    id: 'fomo',
    label: 'FOMO Investor',
    icon: '🎰',
    color: '#9B59B6',
    description: 'You are driven by what others are gaining. FOMO feels rational in the moment — but always buys too late, too concentrated, and at the worst prices.',
    strengths: ['High engagement with markets', 'Sees opportunities quickly'],
    watchOut: 'FOMO buys at tops. The bigger the headline, the more dangerous the entry.',
    famousExample: 'Retail investors who bought Bitcoin at $69,000 in November 2021.',
  },
  'Contrarian Investor': {
    id: 'contrarian',
    label: 'Contrarian Investor',
    icon: '🔄',
    color: '#3B7AD8',
    description: 'You buy when others are fearful and stay calm when others are greedy. This is one of the most powerful long-term investment strategies — but requires iron conviction.',
    strengths: ['Buys at discount prices', 'Unaffected by market sentiment', 'Exceptional long-term returns'],
    watchOut: 'Contrarians can be too early — or wrong if fundamentals have genuinely changed.',
    famousExample: 'Warren Buffett buying Goldman Sachs during the 2008 financial crisis.',
  },
  'High Conviction Investor': {
    id: 'high_conviction',
    label: 'High Conviction Investor',
    icon: '🔥',
    color: '#E8A820',
    description: 'You double down when you believe in your thesis — even under pressure. This produces the best outcomes when right, and the most painful when wrong.',
    strengths: ['Maximum upside capture', 'Acts decisively under pressure'],
    watchOut: 'High conviction without rigorous analysis is just overconfidence.',
    famousExample: 'Michael Burry betting against mortgage securities in 2007 — and being right.',
  },
  'Evidence-Based Investor': {
    id: 'evidence_based',
    label: 'Evidence-Based Investor',
    icon: '📊',
    color: '#3B7AD8',
    description: 'You follow data, not emotion. When research says lump sum beats DCA, you lump sum. When evidence says index beats active, you index. This is rational investing at its best.',
    strengths: ['Resists emotional bias', 'Makes optimal decisions statistically', 'Ignores noise effectively'],
    watchOut: 'Evidence-based investors can overthink and become paralysed by conflicting data.',
    famousExample: 'Jack Bogle — invented index investing based purely on the data.',
  },
  'Systematic Investor': {
    id: 'systematic',
    label: 'Systematic Investor',
    icon: '⚙️',
    color: '#3A9E5C',
    description: 'You trust your system over your instincts. Automation, rules and pre-commitment define your approach. The system runs even when you feel like overriding it.',
    strengths: ['Removes emotion from decisions', 'Consistent execution', 'Immune to short-term noise'],
    watchOut: 'Rigid systems can miss genuine signals that require human judgment.',
    famousExample: 'Renaissance Technologies — pure systematic investing with no discretion.',
  },
  'Reactive Seller': {
    id: 'reactive',
    label: 'Reactive Seller',
    icon: '⚡',
    color: '#E8453A',
    description: 'You respond to news faster than markets can price it in — which means you usually react after the damage is already done. Selling after the fall locks in losses.',
    strengths: ['Highly alert to market changes', 'Proactive mindset'],
    watchOut: 'Markets price in news within seconds. By the time you react, it is already too late.',
    famousExample: 'Investors who sold bonds after the 2022 rate hikes — then missed the recovery.',
  },
  'Market Timer': {
    id: 'market_timer',
    label: 'Market Timer',
    icon: '⏰',
    color: '#E8A820',
    description: 'You believe the right entry point matters more than time in the market. The data disagrees — but the instinct is understandable. Markets are up 75% of years.',
    strengths: ['Attentive to macro conditions', 'Avoids some painful entries'],
    watchOut: 'Missing the 10 best days in a decade cuts returns roughly in half. Those days are unpredictable.',
    famousExample: 'The investor who sold in January 2020 "before COVID" — but missed the 2019 rally too.',
  },
  'Cautious Investor': {
    id: 'cautious',
    label: 'Cautious Investor',
    icon: '🐢',
    color: '#A89E90',
    description: 'You move slowly, test before committing, and build confidence incrementally. Starting small and scaling up is a completely valid strategy — especially for your first investment.',
    strengths: ['Builds sustainable habits', 'Avoids overcommitting', 'Low anxiety approach'],
    watchOut: 'Excessive caution costs compound interest. The best time to invest was yesterday.',
    famousExample: 'Most successful long-term investors who started with small amounts and increased over time.',
  },
}

// ─── IDENTITY TRACKING ─────────────────────────────────────────────────────────

const STORAGE_KEY = 'investor_identity_history'

export type IdentityRecord = {
  questId: number
  investorType: string
  choiceId: string
  timestamp: number
}

export function recordIdentityChoice(questId: number, investorType: string, choiceId: string): void {
  try {
    const history: IdentityRecord[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    // Remove previous record for this quest
    const filtered = history.filter(r => r.questId !== questId)
    filtered.push({ questId, investorType, choiceId, timestamp: Date.now() })
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
  } catch (e) {}
}

export function getIdentityHistory(): IdentityRecord[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch { return [] }
}

export function getDominantIdentity(): { identity: InvestorIdentity; count: number; total: number } | null {
  const history = getIdentityHistory()
  if (history.length === 0) return null

  // Count investor types
  const counts: Record<string, number> = {}
  history.forEach(r => {
    counts[r.investorType] = (counts[r.investorType] || 0) + 1
  })

  // Find dominant
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1])
  const [topType, topCount] = sorted[0]

  const identity = INVESTOR_IDENTITIES[topType] || INVESTOR_IDENTITIES['Systematic Investor']
  return { identity, count: topCount, total: history.length }
}

export function getIdentityBreakdown(): { type: string; count: number; pct: number; identity: InvestorIdentity }[] {
  const history = getIdentityHistory()
  if (history.length === 0) return []

  const counts: Record<string, number> = {}
  history.forEach(r => {
    counts[r.investorType] = (counts[r.investorType] || 0) + 1
  })

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([type, count]) => ({
      type,
      count,
      pct: Math.round((count / history.length) * 100),
      identity: INVESTOR_IDENTITIES[type] || INVESTOR_IDENTITIES['Systematic Investor'],
    }))
}

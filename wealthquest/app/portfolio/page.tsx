'use client'
import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase, Profile } from '@/lib/supabase'

const ETFS = [
  { id: 'msci_world', name: 'MSCI World', ticker: 'IWDA', icon: '🌍', color: '#3A9E5C', basePrice: 85.40, desc: 'Global developed markets' },
  { id: 'sp500', name: 'S&P 500', ticker: 'CSPX', icon: '🇺🇸', color: '#3B7AD8', basePrice: 52.20, desc: 'Top 500 US companies' },
  { id: 'emerging', name: 'Emerging Markets', ticker: 'EMIM', icon: '🌏', color: '#E8A820', basePrice: 28.60, desc: 'High-growth developing economies' },
  { id: 'bonds', name: 'Global Bonds', ticker: 'IGLO', icon: '📜', color: '#9B59B6', basePrice: 44.10, desc: 'Stability — government bonds' },
  { id: 'gold', name: 'Gold ETF', ticker: 'IGLN', icon: '🥇', color: '#F39C12', basePrice: 38.90, desc: 'Inflation hedge' },
]

// ─── MARKET EVENTS ────────────────────────────────────────────────────────────

type EventChoice = {
  id: string
  label: string
  icon: string
  description: string
  isOptimal: boolean
  priceEffect: Record<string, number> // multiplier per ETF
  cashEffect?: number
  xpReward: number
  goldReward: number
  aldricFeedback: string
}

type MarketEvent = {
  id: string
  type: 'crash' | 'bull' | 'news' | 'rate' | 'inflation' | 'recovery'
  title: string
  headline: string
  context: string
  icon: string
  severity: 'low' | 'medium' | 'high'
  choices: EventChoice[]
  aldricHint: string
}

const MARKET_EVENTS: MarketEvent[] = [
  {
    id: 'covid_crash',
    type: 'crash',
    title: '📉 Market Crash!',
    headline: 'Global markets crash -18% in 3 days',
    context: 'A new virus variant has caused widespread panic. Your portfolio is down significantly. News headlines are screaming "worst crash since 2008". What do you do?',
    icon: '📉',
    severity: 'high',
    aldricHint: 'Remember, young investor — every crash in history has recovered. What matters is not the crash, but your reaction to it.',
    choices: [
      {
        id: 'sell_all',
        label: 'Sell Everything',
        icon: '🏃',
        description: 'Convert all holdings to cash to stop the bleeding',
        isOptimal: false,
        priceEffect: { msci_world: 0.88, sp500: 0.85, emerging: 0.82, bonds: 1.02, gold: 1.05 },
        cashEffect: 1,
        xpReward: 0,
        goldReward: 0,
        aldricFeedback: "You panic sold at the bottom — the most costly mistake in investing. Every market crash in history has recovered. By selling, you turned a temporary paper loss into a permanent real loss. In 6 months, you will watch those prices recover without you.",
      },
      {
        id: 'hold',
        label: 'Hold & Wait',
        icon: '🧘',
        description: 'Do nothing. Stay the course.',
        isOptimal: true,
        priceEffect: { msci_world: 0.88, sp500: 0.85, emerging: 0.82, bonds: 1.02, gold: 1.05 },
        xpReward: 50,
        goldReward: 15,
        aldricFeedback: "Excellent discipline! Holding through a crash is one of the hardest things in investing — and one of the most rewarding. The investors who held through 2008, 2020 and every crash before made fortunes. You just proved you have what it takes.",
      },
      {
        id: 'buy_more',
        label: 'Buy More',
        icon: '💪',
        description: 'Use cash to buy ETFs at discounted prices',
        isOptimal: true,
        priceEffect: { msci_world: 0.88, sp500: 0.85, emerging: 0.82, bonds: 1.02, gold: 1.05 },
        xpReward: 75,
        goldReward: 20,
        aldricFeedback: "Outstanding! Be greedy when others are fearful — Warren Buffett's most famous advice, and you just followed it. Buying during a crash means you acquire more shares at lower prices. When markets recover, your gains will be amplified.",
      },
    ],
  },
  {
    id: 'bull_run',
    type: 'bull',
    title: '📈 Bull Run!',
    headline: 'Tech stocks surge +25% — FOMO is everywhere',
    context: 'A single tech sector is skyrocketing. Social media is full of people bragging about gains. Your MSCI World is up, but not as much as individual tech stocks. What do you do?',
    icon: '📈',
    severity: 'medium',
    aldricHint: 'When everyone is talking about getting rich, it is often time for caution. Do not abandon a strategy that works.',
    choices: [
      {
        id: 'chase_rally',
        label: 'Sell ETFs, Buy Tech',
        icon: '🎰',
        description: 'Chase the rally — concentrate in tech stocks',
        isOptimal: false,
        priceEffect: { msci_world: 1.04, sp500: 1.06, emerging: 1.02, bonds: 0.98, gold: 0.99 },
        xpReward: 0,
        goldReward: 0,
        aldricFeedback: "Chasing rallies is one of the most common and costly mistakes. You concentrated into a single sector at peak prices. FOMO-driven decisions almost always end badly. The research is clear: investors who chase performance consistently underperform those who stay diversified.",
      },
      {
        id: 'stay_course',
        label: 'Stay the Course',
        icon: '🧭',
        description: 'Ignore the noise. Keep your diversified ETF strategy.',
        isOptimal: true,
        priceEffect: { msci_world: 1.04, sp500: 1.06, emerging: 1.02, bonds: 0.98, gold: 0.99 },
        xpReward: 50,
        goldReward: 15,
        aldricFeedback: "Wise choice! Your diversified MSCI World already contains the top tech companies — you benefit from their rise without concentrating risk. Staying disciplined when FOMO is highest is a rare and valuable skill.",
      },
      {
        id: 'rebalance',
        label: 'Rebalance Portfolio',
        icon: '⚖️',
        description: 'Take some profits and restore your target allocation',
        isOptimal: true,
        priceEffect: { msci_world: 1.04, sp500: 1.06, emerging: 1.02, bonds: 0.98, gold: 0.99 },
        xpReward: 65,
        goldReward: 18,
        aldricFeedback: "Brilliant! Rebalancing during a bull run is the disciplined approach — you lock in some gains and restore your risk level. This is buying low and selling high in a systematic, unemotional way. Advanced investing at its finest.",
      },
    ],
  },
  {
    id: 'rate_hike',
    type: 'rate',
    title: '🏦 Rate Hike!',
    headline: 'Central bank raises rates by 0.75% — bonds fall sharply',
    context: 'The European Central Bank just raised interest rates significantly to fight inflation. Bond prices drop immediately. Stocks wobble. Your portfolio shows red. What is your move?',
    icon: '🏦',
    severity: 'medium',
    aldricHint: 'Interest rate changes affect different assets differently. Understanding this is a superpower.',
    choices: [
      {
        id: 'sell_bonds',
        label: 'Sell All Bonds',
        icon: '❌',
        description: 'Dump bonds immediately — they are falling',
        isOptimal: false,
        priceEffect: { msci_world: 0.97, sp500: 0.96, emerging: 0.94, bonds: 0.88, gold: 1.01 },
        xpReward: 0,
        goldReward: 0,
        aldricFeedback: "Selling after bonds have already fallen locks in your loss. Interest rate cycles are temporary. Bonds will recover as rates stabilize — and their role as portfolio stabilizers remains valuable. Panic-selling any asset class after it has dropped is almost always the wrong move.",
      },
      {
        id: 'hold_rebalance',
        label: 'Hold & Review',
        icon: '📊',
        description: 'Keep your allocation — rates are temporary',
        isOptimal: true,
        priceEffect: { msci_world: 0.97, sp500: 0.96, emerging: 0.94, bonds: 0.88, gold: 1.01 },
        xpReward: 45,
        goldReward: 12,
        aldricFeedback: "Good thinking. Rate hikes are part of economic cycles. Bonds fell, but your gold and defensive allocations held up. Your diversified portfolio absorbed the shock — exactly as designed. Stay patient.",
      },
      {
        id: 'add_gold',
        label: 'Add Gold & Reduce Bonds',
        icon: '🥇',
        description: 'Rotate from bonds to gold as inflation hedge',
        isOptimal: true,
        priceEffect: { msci_world: 0.97, sp500: 0.96, emerging: 0.94, bonds: 0.88, gold: 1.01 },
        xpReward: 60,
        goldReward: 16,
        aldricFeedback: "Strategic thinking! During inflationary rate hike periods, gold historically outperforms bonds. You used your knowledge of asset correlations to make a smart tactical adjustment. This is exactly what advanced investors do.",
      },
    ],
  },
  {
    id: 'inflation_spike',
    type: 'inflation',
    title: '🔥 Inflation Spike!',
    headline: 'Inflation hits 8% — real returns evaporate',
    context: 'Inflation has surged to 8% annually. Your savings account pays 2% — you are losing 6% of purchasing power per year in cash. But your ETFs are up 5%. How do you respond?',
    icon: '🔥',
    severity: 'medium',
    aldricHint: 'Inflation is the silent wealth destroyer. The right response is more investing, not less.',
    choices: [
      {
        id: 'keep_cash',
        label: 'Stay in Cash',
        icon: '💸',
        description: 'Feels safer to keep cash during uncertainty',
        isOptimal: false,
        priceEffect: { msci_world: 1.02, sp500: 1.01, emerging: 0.99, bonds: 0.96, gold: 1.08 },
        xpReward: 0,
        goldReward: 0,
        aldricFeedback: "Keeping cash during 8% inflation means losing 6% of purchasing power every year. Your €10,000 in cash becomes worth €9,400 in real terms after just 12 months. Inflation is precisely why you must invest — cash is not safety, it is slow loss.",
      },
      {
        id: 'increase_investment',
        label: 'Invest More Aggressively',
        icon: '🚀',
        description: 'Increase monthly investments to beat inflation',
        isOptimal: true,
        priceEffect: { msci_world: 1.02, sp500: 1.01, emerging: 0.99, bonds: 0.96, gold: 1.08 },
        xpReward: 55,
        goldReward: 14,
        aldricFeedback: "Excellent! Your ETFs are already outpacing inflation. Increasing investment means more money working against inflation. Real assets — stocks and gold — historically provide the best inflation protection. This is textbook smart investing.",
      },
      {
        id: 'add_gold_inflation',
        label: 'Add Gold as Inflation Hedge',
        icon: '🥇',
        description: 'Increase gold allocation — classic inflation protection',
        isOptimal: true,
        priceEffect: { msci_world: 1.02, sp500: 1.01, emerging: 0.99, bonds: 0.96, gold: 1.08 },
        xpReward: 60,
        goldReward: 15,
        aldricFeedback: "Gold has protected wealth against inflation for thousands of years — and it is doing it again now. Adding gold during inflationary spikes is a time-tested strategy. You applied real investing knowledge to a real scenario. Impressive.",
      },
    ],
  },
  {
    id: 'geopolitical',
    type: 'news',
    title: '⚠️ Geopolitical Crisis!',
    headline: 'Major conflict erupts — markets drop 12%',
    context: 'A major geopolitical conflict has broken out. Energy prices spike. European stocks are hit hardest. Your diversified portfolio is down 12% in 2 weeks. Panic is everywhere. What is your decision?',
    icon: '⚠️',
    severity: 'high',
    aldricHint: 'Geopolitical events cause short-term volatility but rarely change long-term market trends. History proves this.',
    choices: [
      {
        id: 'panic_sell',
        label: 'Sell & Wait for Stability',
        icon: '😰',
        description: 'Get out now and re-enter when things calm down',
        isOptimal: false,
        priceEffect: { msci_world: 0.90, sp500: 0.93, emerging: 0.86, bonds: 1.03, gold: 1.12 },
        xpReward: 0,
        goldReward: 0,
        aldricFeedback: "Waiting for stability means buying back at higher prices. Markets typically recover from geopolitical shocks within weeks to months. By the time things feel calm, prices are already higher. You sold low and will be forced to buy high.",
      },
      {
        id: 'hold_geopolitical',
        label: 'Hold Everything',
        icon: '💪',
        description: 'This too shall pass. History proves markets recover.',
        isOptimal: true,
        priceEffect: { msci_world: 0.90, sp500: 0.93, emerging: 0.86, bonds: 1.03, gold: 1.12 },
        xpReward: 55,
        goldReward: 14,
        aldricFeedback: "Correct and courageous. Markets have survived two world wars, the Cold War, 9/11, COVID and countless conflicts. Long-term holders were always rewarded. Your gold allocation is providing stability right now — exactly what it was there for.",
      },
      {
        id: 'rotate_defensive',
        label: 'Rotate to Bonds & Gold',
        icon: '🛡️',
        description: 'Reduce stocks temporarily, increase defensive assets',
        isOptimal: true,
        priceEffect: { msci_world: 0.90, sp500: 0.93, emerging: 0.86, bonds: 1.03, gold: 1.12 },
        xpReward: 65,
        goldReward: 17,
        aldricFeedback: "Tactical brilliance! Rotating to defensive assets during geopolitical crises is a classic professional strategy. Your gold is up 12% and bonds are positive — you captured the defensive upside while reducing equity exposure. This is advanced portfolio management.",
      },
    ],
  },
  {
    id: 'recovery_rally',
    type: 'recovery',
    title: '🌅 Recovery Rally!',
    headline: 'Markets bounce back +15% — do you jump in?',
    context: 'After months of decline, markets are recovering fast. Up 15% in 6 weeks. You have been waiting on the sidelines with cash. Everyone says "the bottom is in." Do you invest now?',
    icon: '🌅',
    severity: 'low',
    aldricHint: 'Trying to time the bottom is nearly impossible. Time in the market beats timing the market.',
    choices: [
      {
        id: 'wait_more',
        label: 'Wait for Confirmation',
        icon: '⏳',
        description: 'Wait to be sure the recovery is real before investing',
        isOptimal: false,
        priceEffect: { msci_world: 1.08, sp500: 1.09, emerging: 1.06, bonds: 1.01, gold: 1.02 },
        xpReward: 0,
        goldReward: 0,
        aldricFeedback: "Waiting for confirmation means you already missed 15%. By the time it feels safe to invest, prices are much higher. This is how investors always end up buying near the top after missing the bottom. Time in the market beats timing the market — always.",
      },
      {
        id: 'dca_in',
        label: 'Invest Gradually (DCA)',
        icon: '📅',
        description: 'Split your cash and invest over the next 3 months',
        isOptimal: true,
        priceEffect: { msci_world: 1.08, sp500: 1.09, emerging: 1.06, bonds: 1.01, gold: 1.02 },
        xpReward: 55,
        goldReward: 14,
        aldricFeedback: "Smart and disciplined! Dollar-cost averaging back in reduces the risk of mistiming the entry. You participate in the recovery while managing the risk of buying all at the top. This is the textbook approach for investing from a cash position.",
      },
      {
        id: 'invest_all',
        label: 'Invest Everything Now',
        icon: '🚀',
        description: 'Go all-in — time in the market beats timing',
        isOptimal: true,
        priceEffect: { msci_world: 1.08, sp500: 1.09, emerging: 1.06, bonds: 1.01, gold: 1.02 },
        xpReward: 60,
        goldReward: 15,
        aldricFeedback: "Bold and historically well-supported! Research shows that lump-sum investing beats DCA about 65% of the time because markets trend upward. You correctly identified that time in the market matters more than timing. Excellent conviction.",
      },
    ],
  },
]

type Holding = { shares: number; avgPrice: number }
type ShortPosition = { shares: number; entryPrice: number; collateral: number }
type PortfolioData = {
  cash: number
  holdings: Record<string, Holding>
  shorts: Record<string, ShortPosition>
  history: { date: string; value: number }[]
  prices: Record<string, number>
  events: { date: string; title: string; impact: string; type: string }[]
  lastUpdate: string
  pendingEvent?: string | null
  eventHistory: { date: string; eventId: string; choiceId: string; pnl: number }[]
}

const defaultPortfolio = (): PortfolioData => ({
  cash: 10000,
  holdings: {},
  shorts: {},
  history: [{ date: new Date().toISOString().slice(0, 10), value: 10000 }],
  prices: Object.fromEntries(ETFS.map(e => [e.id, e.basePrice])),
  events: [],
  lastUpdate: new Date().toISOString().slice(0, 10),
  pendingEvent: null,
  eventHistory: [],
})

function simulatePrices(prices: Record<string, number>, eventType?: string): Record<string, number> {
  const newPrices: Record<string, number> = {}
  ETFS.forEach(etf => {
    let change = (Math.random() - 0.48) * 0.02
    if (eventType === 'crash') change = -(Math.random() * 0.06 + 0.02)
    if (eventType === 'bull') change = Math.random() * 0.04 + 0.01
    if (eventType === 'recovery') change = Math.random() * 0.03 + 0.01
    if (etf.id === 'bonds' && eventType === 'crash') change = Math.random() * 0.015
    if (etf.id === 'gold' && eventType === 'crash') change = Math.random() * 0.025
    newPrices[etf.id] = Math.max(prices[etf.id] * (1 + change), 1)
  })
  return newPrices
}

function applyChoicePrices(prices: Record<string, number>, priceEffect: Record<string, number>): Record<string, number> {
  const newPrices: Record<string, number> = {}
  ETFS.forEach(etf => {
    newPrices[etf.id] = prices[etf.id] * (priceEffect[etf.id] ?? 1)
  })
  return newPrices
}

function getPortfolioValue(portfolio: PortfolioData): number {
  let value = portfolio.cash
  ETFS.forEach(etf => {
    const holding = portfolio.holdings[etf.id]
    if (holding?.shares > 0) value += holding.shares * portfolio.prices[etf.id]
    const short = portfolio.shorts?.[etf.id]
    if (short?.shares > 0) {
      const pnl = (short.entryPrice - portfolio.prices[etf.id]) * short.shares
      value += short.collateral + pnl
    }
  })
  return value
}

// ─── EVENT MODAL ──────────────────────────────────────────────────────────────

function EventModal({ event, portfolio, onChoice }: {
  event: MarketEvent
  portfolio: PortfolioData
  onChoice: (choice: EventChoice) => void
}) {
  const [chosen, setChosen] = useState<EventChoice | null>(null)
  const [phase, setPhase] = useState<'question' | 'result'>('question')

  const totalValue = getPortfolioValue(portfolio)
  const hasHoldings = Object.values(portfolio.holdings).some(h => h.shares > 0)

  function handleChoice(choice: EventChoice) {
    setChosen(choice)
    setPhase('result')
  }

  const severityColor = event.severity === 'high' ? '#E8453A' : event.severity === 'medium' ? '#E8A820' : '#3A9E5C'

  if (phase === 'result' && chosen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(8px)' }}>
        <div className="w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl">
          {/* Result header */}
          <div className="p-5 text-center"
            style={{ background: chosen.isOptimal ? 'linear-gradient(135deg, #1a3a12, #2a5a22)' : 'linear-gradient(135deg, #3a0a0a, #5a1a1a)' }}>
            <div className="text-5xl mb-2">{chosen.isOptimal ? '🏆' : '📉'}</div>
            <div className="font-serif font-black text-xl text-white mb-1">
              {chosen.isOptimal ? 'Great Decision!' : 'Costly Mistake'}
            </div>
            <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
              You chose: {chosen.icon} {chosen.label}
            </div>

            {chosen.isOptimal && (
              <div className="flex gap-2 justify-center mt-3">
                {chosen.xpReward > 0 && (
                  <div className="px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background: 'rgba(58,158,92,0.3)', color: '#6FCF97', border: '1px solid rgba(58,158,92,0.4)' }}>
                    +{chosen.xpReward} XP
                  </div>
                )}
                {chosen.goldReward > 0 && (
                  <div className="px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background: 'rgba(232,168,32,0.3)', color: '#F5BC38', border: '1px solid rgba(232,168,32,0.4)' }}>
                    +{chosen.goldReward} 🪙
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Price effects */}
          <div className="bg-bg2 p-4">
            <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-2">Market Impact</div>
            <div className="flex gap-2 flex-wrap mb-3">
              {ETFS.map(etf => {
                const effect = chosen.priceEffect[etf.id] ?? 1
                const pct = ((effect - 1) * 100).toFixed(1)
                const isPos = effect >= 1
                return (
                  <div key={etf.id} className="flex items-center gap-1 text-xs px-2 py-1 rounded-full"
                    style={{ background: isPos ? '#EDFAF2' : '#FFF0F0', color: isPos ? '#2d7a45' : '#c0392b' }}>
                    {etf.icon} <span className="font-bold">{isPos ? '+' : ''}{pct}%</span>
                  </div>
                )
              })}
            </div>

            {/* Aldric feedback */}
            <div className="rounded-2xl p-3 mb-3"
              style={{ background: chosen.isOptimal ? '#EDFAF2' : '#FFF0F0', border: `1.5px solid ${chosen.isOptimal ? '#88D4A4' : '#F5A0A0'}` }}>
              <div className="flex items-start gap-2">
                <span className="text-xl flex-shrink-0">🧙</span>
                <div>
                  <div className="text-xs font-bold mb-1" style={{ color: chosen.isOptimal ? '#2d7a45' : '#c0392b' }}>
                    Aldric says:
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: chosen.isOptimal ? '#2d7a45' : '#c0392b' }}>
                    "{chosen.aldricFeedback}"
                  </p>
                </div>
              </div>
            </div>

            <button onClick={() => onChoice(chosen)}
              className="w-full py-3 rounded-2xl font-black text-sm text-white transition-all active:scale-95"
              style={{ background: chosen.isOptimal ? 'linear-gradient(135deg, #2d7a45, #3A9E5C)' : 'linear-gradient(135deg, #8B1A1A, #C0392B)' }}>
              {chosen.isOptimal ? '⚔️ Continue Your Journey' : '📚 Learn from This'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-5" style={{ background: `linear-gradient(135deg, ${severityColor}22, ${severityColor}44)`, borderBottom: `2px solid ${severityColor}66` }}>
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs font-black uppercase tracking-widest px-2 py-1 rounded-full"
              style={{ background: `${severityColor}33`, color: severityColor }}>
              {event.severity === 'high' ? '🚨 HIGH ALERT' : event.severity === 'medium' ? '⚠️ MARKET EVENT' : '📢 NEWS'}
            </div>
            <div className="text-xs text-text3">Portfolio: €{getPortfolioValue(portfolio).toLocaleString('de-DE', { maximumFractionDigits: 0 })}</div>
          </div>
          <h2 className="font-serif font-black text-xl text-text1 mb-1">{event.title}</h2>
          <div className="font-bold text-sm mb-2" style={{ color: severityColor }}>{event.headline}</div>
          <p className="text-sm text-text2 leading-relaxed">{event.context}</p>
        </div>

        {/* Aldric hint */}
        <div className="px-4 pt-3 pb-2 flex items-start gap-2" style={{ background: '#FFFEF8' }}>
          <span className="text-lg flex-shrink-0">🧙</span>
          <p className="text-xs italic text-text2 leading-relaxed">"{event.aldricHint}"</p>
        </div>

        {/* Choices */}
        <div className="bg-bg2 p-4">
          <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">What do you do?</div>
          <div className="flex flex-col gap-2">
            {event.choices.map(choice => (
              <button key={choice.id} onClick={() => handleChoice(choice)}
                className="w-full text-left p-3 rounded-2xl border-2 transition-all active:scale-95 hover:border-gold-bd hover:bg-gold-bg"
                style={{ borderColor: '#E4E0D8', background: '#fff' }}>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{choice.icon}</span>
                  <div className="flex-1">
                    <div className="font-bold text-sm text-text1">{choice.label}</div>
                    <div className="text-xs text-text2">{choice.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {!hasHoldings && (
            <p className="text-xs text-text3 text-center mt-2">💡 Tip: Buy some ETFs first to see bigger impact!</p>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────────

export default function PortfolioPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null)
  const [selectedETF, setSelectedETF] = useState(ETFS[0])
  const [buyAmount, setBuyAmount] = useState('')
  const [shortAmount, setShortAmount] = useState('')
  const [activeTab, setActiveTab] = useState<'portfolio' | 'long' | 'short' | 'events'>('portfolio')
  const [notification, setNotification] = useState<{ msg: string; type: 'success' | 'error' | 'event' } | null>(null)
  const [saving, setSaving] = useState(false)
  const [activeEvent, setActiveEvent] = useState<MarketEvent | null>(null)

  const showNotif = (msg: string, type: 'success' | 'error' | 'event') => {
    setNotification({ msg, type })
    setTimeout(() => setNotification(null), 3500)
  }

  const savePortfolio = useCallback(async (p: PortfolioData, profileId: string) => {
    setSaving(true)
    await supabase.from('profiles').update({ portfolio: p }).eq('id', profileId)
    setSaving(false)
  }, [])

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/login'); return }
      const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single()
      setProfile(data)

      let p: PortfolioData = data?.portfolio
        ? { shorts: {}, pendingEvent: null, eventHistory: [], ...data.portfolio }
        : defaultPortfolio()

      const today = new Date().toISOString().slice(0, 10)
      if (p.lastUpdate !== today) {
        // Pick a random market event (30% chance each day)
        const shouldHaveEvent = Math.random() < 0.30
        let chosenEventId: string | null = null

        if (shouldHaveEvent) {
          const recentEventIds = (p.eventHistory || []).slice(-3).map(e => e.eventId)
          const available = MARKET_EVENTS.filter(e => !recentEventIds.includes(e.id))
          if (available.length > 0) {
            chosenEventId = available[Math.floor(Math.random() * available.length)].id
          }
        }

        p.prices = simulatePrices(p.prices, chosenEventId ? MARKET_EVENTS.find(e => e.id === chosenEventId)?.type : undefined)
        const newValue = getPortfolioValue(p)
        p.history = [...p.history, { date: today, value: newValue }].slice(-90)
        p.lastUpdate = today
        p.pendingEvent = chosenEventId

        await supabase.from('profiles').update({ portfolio: p }).eq('id', session.user.id)
      }

      setPortfolio(p)

      // Show pending event after short delay
      if (p.pendingEvent) {
        const event = MARKET_EVENTS.find(e => e.id === p.pendingEvent)
        if (event) setTimeout(() => setActiveEvent(event), 800)
      }

      setLoading(false)
    }
    load()
  }, [router])

  async function handleEventChoice(choice: EventChoice) {
    if (!portfolio || !profile || !activeEvent) return

    // Apply price effects
    const newPrices = applyChoicePrices(portfolio.prices, choice.priceEffect)

    // Award XP and gold if optimal
    let newXp = profile.xp
    let newGold = profile.gold
    let newLevel = profile.level

    if (choice.isOptimal) {
      newXp += choice.xpReward
      newGold += choice.goldReward
      if (newXp >= profile.level * 100) { newLevel++; newXp -= profile.level * 100 }
      await supabase.from('profiles').update({ xp: newXp, gold: newGold, level: newLevel }).eq('id', profile.id)
      setProfile({ ...profile, xp: newXp, gold: newGold, level: newLevel })
    }

    // Update portfolio
    const newPortfolio: PortfolioData = {
      ...portfolio,
      prices: newPrices,
      pendingEvent: null,
      eventHistory: [...(portfolio.eventHistory || []), {
        date: new Date().toISOString().slice(0, 10),
        eventId: activeEvent.id,
        choiceId: choice.id,
        pnl: getPortfolioValue({ ...portfolio, prices: newPrices }) - getPortfolioValue(portfolio),
      }],
      events: [{
        date: new Date().toISOString().slice(0, 10),
        title: activeEvent.title,
        impact: `You chose: ${choice.label}. ${choice.isOptimal ? '✅ Optimal decision!' : '❌ Suboptimal choice.'}`,
        type: activeEvent.type,
      }, ...portfolio.events].slice(0, 20),
    }

    setPortfolio(newPortfolio)
    await savePortfolio(newPortfolio, profile.id)
    setActiveEvent(null)

    if (choice.isOptimal) {
      showNotif(`✅ Great decision! +${choice.xpReward} XP · +${choice.goldReward} 🪙`, 'success')
    } else {
      showNotif('📚 Tough lesson — but now you know!', 'event')
    }
  }

  async function handleBuy() {
    if (!portfolio || !profile) return
    const euros = parseFloat(buyAmount)
    if (isNaN(euros) || euros <= 0) { showNotif('Enter a valid amount', 'error'); return }
    if (euros > portfolio.cash) { showNotif('Not enough cash!', 'error'); return }
    const price = portfolio.prices[selectedETF.id]
    const shares = euros / price
    const existing = portfolio.holdings[selectedETF.id] || { shares: 0, avgPrice: 0 }
    const totalShares = existing.shares + shares
    const avgPrice = (existing.shares * existing.avgPrice + shares * price) / totalShares
    const newPortfolio: PortfolioData = {
      ...portfolio,
      cash: portfolio.cash - euros,
      holdings: { ...portfolio.holdings, [selectedETF.id]: { shares: totalShares, avgPrice } }
    }
    setPortfolio(newPortfolio)
    setBuyAmount('')
    showNotif(`✅ Bought ${shares.toFixed(4)} shares of ${selectedETF.ticker}`, 'success')
    await savePortfolio(newPortfolio, profile.id)
  }

  async function handleShort() {
    if (!portfolio || !profile) return
    const euros = parseFloat(shortAmount)
    if (isNaN(euros) || euros <= 0 || euros < 10) { showNotif('Minimum €10 for a short', 'error'); return }
    if (euros > portfolio.cash) { showNotif('Not enough cash!', 'error'); return }
    const price = portfolio.prices[selectedETF.id]
    const shares = euros / price
    const existing = portfolio.shorts?.[selectedETF.id]
    const totalShares = (existing?.shares || 0) + shares
    const totalCollateral = (existing?.collateral || 0) + euros
    const avgEntry = existing ? (existing.shares * existing.entryPrice + shares * price) / totalShares : price
    const newPortfolio: PortfolioData = {
      ...portfolio,
      cash: portfolio.cash - euros,
      shorts: { ...portfolio.shorts, [selectedETF.id]: { shares: totalShares, entryPrice: avgEntry, collateral: totalCollateral } }
    }
    setPortfolio(newPortfolio)
    setShortAmount('')
    showNotif(`📉 Opened short on ${selectedETF.ticker}`, 'success')
    await savePortfolio(newPortfolio, profile.id)
  }

  async function handleCloseShort(etfId: string) {
    if (!portfolio || !profile) return
    const short = portfolio.shorts[etfId]
    if (!short) return
    const etf = ETFS.find(e => e.id === etfId)!
    const pnl = (short.entryPrice - portfolio.prices[etfId]) * short.shares
    const returned = short.collateral + pnl
    const newShorts = { ...portfolio.shorts }
    delete newShorts[etfId]
    const newPortfolio: PortfolioData = { ...portfolio, cash: portfolio.cash + Math.max(returned, 0), shorts: newShorts }
    setPortfolio(newPortfolio)
    const gain = pnl >= 0
    showNotif(`${gain ? '✅' : '❌'} Closed short: ${gain ? '+' : ''}€${pnl.toFixed(2)}`, gain ? 'success' : 'error')
    await savePortfolio(newPortfolio, profile.id)
  }

  async function handleSell(etfId: string, shares: number) {
    if (!portfolio || !profile) return
    const holding = portfolio.holdings[etfId]
    if (!holding) return
    const etf = ETFS.find(e => e.id === etfId)!
    const proceeds = shares * portfolio.prices[etfId]
    const newShares = holding.shares - shares
    const newHoldings = { ...portfolio.holdings }
    if (newShares < 0.0001) delete newHoldings[etfId]
    else newHoldings[etfId] = { ...holding, shares: newShares }
    const newPortfolio: PortfolioData = { ...portfolio, cash: portfolio.cash + proceeds, holdings: newHoldings }
    setPortfolio(newPortfolio)
    showNotif(`✅ Sold ${etf.ticker} for €${proceeds.toFixed(2)}`, 'success')
    await savePortfolio(newPortfolio, profile.id)
  }

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading || !portfolio) return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="text-4xl animate-pulse">📊</div>
    </div>
  )

  const totalValue = getPortfolioValue(portfolio)
  const totalReturn = totalValue - 10000
  const totalReturnPct = (totalReturn / 10000) * 100
  const isPositive = totalReturn >= 0
  const hasShorts = Object.keys(portfolio.shorts || {}).some(k => portfolio.shorts[k]?.shares > 0)

  return (
    <div className="min-h-screen bg-bg">
      {/* Event Modal */}
      {activeEvent && portfolio && (
        <EventModal event={activeEvent} portfolio={portfolio} onChoice={handleEventChoice} />
      )}

      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl text-sm font-bold shadow-lg max-w-[90vw] text-center ${
          notification.type === 'success' ? 'bg-green-bg border border-green-bd text-green-700' :
          notification.type === 'error' ? 'bg-red-50 border border-red-200 text-red-700' :
          'bg-gold-bg border border-gold-bd text-gold-dk'
        }`}>{notification.msg}</div>
      )}

      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-border px-4 py-3 flex items-center gap-3">
        <Link href="/dashboard" className="flex items-center gap-2 flex-1">
          <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center text-base">⚔️</div>
          <span className="font-serif font-black text-base text-text1">Wealth Quest</span>
        </Link>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-yellow-600 font-bold">🪙 {profile?.gold}</span>
          <Link href="/dashboard" className="text-xs text-text3 hover:text-text2">Dashboard</Link>
          <button onClick={signOut} className="text-text3 text-xs hover:text-text2">Exit</button>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="mb-4">
          <div className="text-xs font-bold text-text3 uppercase tracking-widest mb-1">📊 Investment Simulator</div>
          <h1 className="font-serif font-black text-2xl text-text1">Virtual Portfolio</h1>
          <p className="text-sm text-text2 mt-0.5">React to real market events. Learn by doing — no risk.</p>
        </div>

        {/* Event History Badge */}
        {(portfolio.eventHistory?.length || 0) > 0 && (
          <div className="rounded-xl p-3 mb-4 flex items-center gap-3"
            style={{ background: 'rgba(59,122,216,0.08)', border: '1.5px solid rgba(59,122,216,0.2)' }}>
            <span className="text-2xl">📰</span>
            <div className="flex-1">
              <div className="text-xs font-bold text-text1">{portfolio.eventHistory.length} market event{portfolio.eventHistory.length > 1 ? 's' : ''} survived</div>
              <div className="text-xs text-text2">
                {portfolio.eventHistory.filter(e => {
                  const event = MARKET_EVENTS.find(me => me.id === e.eventId)
                  const choice = event?.choices.find(c => c.id === e.choiceId)
                  return choice?.isOptimal
                }).length} optimal decisions
              </div>
            </div>
            <button onClick={() => setActiveTab('events')}
              className="text-xs font-bold px-3 py-1 rounded-full"
              style={{ background: 'rgba(59,122,216,0.15)', color: '#3B7AD8' }}>
              View →
            </button>
          </div>
        )}

        {/* Portfolio Value */}
        <div className={`rounded-2xl p-5 mb-5 relative overflow-hidden ${isPositive ? 'bg-gradient-to-br from-green-900 to-green-700' : 'bg-gradient-to-br from-red-900 to-red-700'}`}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 1px, transparent 14px)' }} />
          <div className="relative">
            <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.6)' }}>Total Portfolio Value</div>
            <div className="font-serif font-black text-3xl text-white mb-1">€{totalValue.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            <div className={`text-sm font-bold ${isPositive ? 'text-green-300' : 'text-red-300'}`}>
              {isPositive ? '▲' : '▼'} €{Math.abs(totalReturn).toFixed(2)} ({isPositive ? '+' : ''}{totalReturnPct.toFixed(2)}%)
            </div>
            <div className="flex gap-4 mt-3 flex-wrap">
              <div><div className="text-xs text-white/50">Cash</div><div className="text-sm font-bold text-white">€{portfolio.cash.toFixed(0)}</div></div>
              <div><div className="text-xs text-white/50">Invested</div><div className="text-sm font-bold text-white">€{(totalValue - portfolio.cash).toFixed(0)}</div></div>
              <div><div className="text-xs text-white/50">Started</div><div className="text-sm font-bold text-white">€10,000</div></div>
            </div>
          </div>
        </div>

        {/* Chart */}
        {portfolio.history.length > 1 && (
          <div className="card mb-4 p-4">
            <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-2">Portfolio History</div>
            <svg width="100%" height="70" viewBox={`0 0 ${portfolio.history.length * 10} 70`} preserveAspectRatio="none">
              {(() => {
                const vals = portfolio.history.map(h => h.value)
                const min = Math.min(...vals); const max = Math.max(...vals)
                const range = max - min || 1
                const points = vals.map((v, i) => `${i * 10},${70 - ((v - min) / range) * 60}`).join(' ')
                const isUp = vals[vals.length - 1] >= vals[0]
                return (<>
                  <polyline points={points} fill="none" stroke={isUp ? '#3A9E5C' : '#E8453A'} strokeWidth="2" />
                  <polyline points={`0,70 ${points} ${(vals.length - 1) * 10},70`} fill={isUp ? 'rgba(58,158,92,0.1)' : 'rgba(232,69,58,0.1)'} stroke="none" />
                </>)
              })()}
            </svg>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          {(['portfolio', 'long', 'short', 'events'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-xl text-xs font-bold capitalize transition-all ${activeTab === tab ? 'bg-gold text-white' : 'bg-bg3 text-text3'}`}>
              {tab === 'portfolio' ? '💼' : tab === 'long' ? '📈 Long' : tab === 'short' ? '📉 Short' : '📰 Events'}
            </button>
          ))}
        </div>

        {/* HOLDINGS */}
        {activeTab === 'portfolio' && (
          <div className="flex flex-col gap-3">
            {Object.keys(portfolio.holdings).length === 0 && !hasShorts ? (
              <div className="card text-center py-8">
                <div className="text-3xl mb-2">📊</div>
                <div className="font-bold text-text1 mb-1">No positions yet</div>
                <div className="text-sm text-text2 mb-4">Buy ETFs to build your portfolio. Market events will test your decisions!</div>
                <div className="flex gap-2 justify-center">
                  <button onClick={() => setActiveTab('long')} className="px-4 py-2 rounded-xl bg-green-bg text-green-700 border border-green-bd text-sm font-bold">📈 Go Long</button>
                  <button onClick={() => setActiveTab('short')} className="px-4 py-2 rounded-xl bg-red-50 text-red-600 border border-red-200 text-sm font-bold">📉 Go Short</button>
                </div>
              </div>
            ) : (
              <>
                {ETFS.filter(e => (portfolio.holdings[e.id]?.shares || 0) > 0).map(etf => {
                  const holding = portfolio.holdings[etf.id]
                  const currentValue = holding.shares * portfolio.prices[etf.id]
                  const gainLoss = currentValue - (holding.shares * holding.avgPrice)
                  const gainLossPct = (gainLoss / (holding.shares * holding.avgPrice)) * 100
                  return (
                    <div key={etf.id} className="card">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-bg text-green-700 border border-green-bd">📈 LONG</span>
                        <span className="font-bold text-sm">{etf.name}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-xs text-text3">{holding.shares.toFixed(4)} shares · avg €{holding.avgPrice.toFixed(2)}</div>
                        <div className="text-right">
                          <div className="font-bold text-sm">€{currentValue.toFixed(2)}</div>
                          <div className={`text-xs font-bold ${gainLoss >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                            {gainLoss >= 0 ? '+' : ''}€{gainLoss.toFixed(2)} ({gainLoss >= 0 ? '+' : ''}{gainLossPct.toFixed(1)}%)
                          </div>
                        </div>
                      </div>
                      <button onClick={() => handleSell(etf.id, holding.shares)}
                        className="w-full py-1.5 rounded-lg text-xs font-bold bg-red-50 text-red-600 border border-red-200">
                        Close Long
                      </button>
                    </div>
                  )
                })}
                {ETFS.filter(e => (portfolio.shorts?.[e.id]?.shares || 0) > 0).map(etf => {
                  const short = portfolio.shorts[etf.id]
                  const pnl = (short.entryPrice - portfolio.prices[etf.id]) * short.shares
                  const pnlPct = (pnl / short.collateral) * 100
                  return (
                    <div key={etf.id} className="card">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200">📉 SHORT</span>
                        <span className="font-bold text-sm">{etf.name}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-xs text-text3">Entry €{short.entryPrice.toFixed(2)} · Now €{portfolio.prices[etf.id].toFixed(2)}</div>
                        <div className={`text-xs font-bold ${pnl >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                          P&L: {pnl >= 0 ? '+' : ''}€{pnl.toFixed(2)} ({pnl >= 0 ? '+' : ''}{pnlPct.toFixed(1)}%)
                        </div>
                      </div>
                      <button onClick={() => handleCloseShort(etf.id)}
                        className="w-full py-1.5 rounded-lg text-xs font-bold bg-gold-bg text-gold-dk border border-gold-bd">
                        Close Short
                      </button>
                    </div>
                  )
                })}
                <div className="card flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-bg3 flex items-center justify-center text-xl">💶</div>
                  <div className="flex-1"><div className="font-bold text-sm">Available Cash</div><div className="text-xs text-text3">Ready to invest</div></div>
                  <div className="font-bold text-sm">€{portfolio.cash.toFixed(2)}</div>
                </div>
              </>
            )}
          </div>
        )}

        {/* LONG */}
        {activeTab === 'long' && (
          <div className="flex flex-col gap-3">
            <div className="card bg-green-bg border-green-bd text-xs text-green-700 font-semibold">
              📈 Go Long — you profit when prices rise. Best for long-term wealth building.
            </div>
            {ETFS.map(etf => {
              const price = portfolio.prices[etf.id]
              const change = ((price - etf.basePrice) / etf.basePrice) * 100
              return (
                <div key={etf.id} onClick={() => setSelectedETF(etf)}
                  className={`card cursor-pointer transition-all ${selectedETF.id === etf.id ? 'border-green-bd bg-green-bg' : 'hover:border-gold-bd'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: etf.color + '20' }}>{etf.icon}</div>
                    <div className="flex-1">
                      <div className="font-bold text-sm">{etf.name} <span className="text-text3 font-normal">· {etf.ticker}</span></div>
                      <div className="text-xs text-text2">{etf.desc}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-sm">€{price.toFixed(2)}</div>
                      <div className={`text-xs font-bold ${change >= 0 ? 'text-green-600' : 'text-red-500'}`}>{change >= 0 ? '▲' : '▼'} {Math.abs(change).toFixed(2)}%</div>
                    </div>
                    {selectedETF.id === etf.id && <div className="text-green-600">✓</div>}
                  </div>
                </div>
              )
            })}
            <div className="card border-2 border-green-bd bg-green-bg">
              <div className="font-bold text-sm mb-2">Buy {selectedETF.name}</div>
              <div className="flex gap-2 mb-2">
                {[100, 500, 1000, 2500].map(amt => (
                  <button key={amt} onClick={() => setBuyAmount(String(amt))}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold border ${buyAmount === String(amt) ? 'bg-green-600 text-white border-green-600' : 'bg-white border-border text-text2'}`}>
                    €{amt}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <input type="number" value={buyAmount} onChange={e => setBuyAmount(e.target.value)}
                  placeholder="Amount €" className="flex-1 px-3 py-2 rounded-xl border text-sm outline-none focus:border-green-500" />
                <button onClick={handleBuy} disabled={saving}
                  className="px-5 py-2 rounded-xl bg-green-600 text-white font-bold text-sm">
                  {saving ? '...' : '📈 Buy'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SHORT */}
        {activeTab === 'short' && (
          <div className="flex flex-col gap-3">
            <div className="card bg-red-50 border-red-200 text-xs text-red-700 font-semibold">
              📉 Go Short — you profit when prices fall. You deposit collateral and borrow shares to sell.
            </div>
            {ETFS.map(etf => {
              const price = portfolio.prices[etf.id]
              const change = ((price - etf.basePrice) / etf.basePrice) * 100
              return (
                <div key={etf.id} onClick={() => setSelectedETF(etf)}
                  className={`card cursor-pointer transition-all ${selectedETF.id === etf.id ? 'border-red-300 bg-red-50' : 'hover:border-red-300'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: etf.color + '20' }}>{etf.icon}</div>
                    <div className="flex-1">
                      <div className="font-bold text-sm">{etf.name}</div>
                      <div className="text-xs text-text2">{etf.desc}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-sm">€{price.toFixed(2)}</div>
                      <div className={`text-xs font-bold ${change >= 0 ? 'text-green-600' : 'text-red-500'}`}>{change >= 0 ? '▲' : '▼'} {Math.abs(change).toFixed(2)}%</div>
                    </div>
                  </div>
                </div>
              )
            })}
            <div className="card border-2 border-red-300 bg-red-50">
              <div className="font-bold text-sm mb-2">Short {selectedETF.name}</div>
              <div className="flex gap-2 mb-2">
                {[100, 500, 1000, 2500].map(amt => (
                  <button key={amt} onClick={() => setShortAmount(String(amt))}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold border ${shortAmount === String(amt) ? 'bg-red-500 text-white border-red-500' : 'bg-white border-border text-text2'}`}>
                    €{amt}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <input type="number" value={shortAmount} onChange={e => setShortAmount(e.target.value)}
                  placeholder="Collateral €" className="flex-1 px-3 py-2 rounded-xl border text-sm outline-none focus:border-red-400" />
                <button onClick={handleShort} disabled={saving}
                  className="px-5 py-2 rounded-xl bg-red-500 text-white font-bold text-sm">
                  {saving ? '...' : '📉 Short'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* EVENTS */}
        {activeTab === 'events' && (
          <div className="flex flex-col gap-3">
            {/* Trigger manual event for testing */}
            <button onClick={() => {
              const event = MARKET_EVENTS[Math.floor(Math.random() * MARKET_EVENTS.length)]
              setActiveEvent(event)
            }} className="card text-center py-3 hover:border-gold-bd cursor-pointer transition-all">
              <div className="text-2xl mb-1">🎲</div>
              <div className="font-bold text-sm text-text1">Trigger Random Event</div>
              <div className="text-xs text-text2">Practice your decision making</div>
            </button>

            {portfolio.events.length === 0 ? (
              <div className="card text-center py-6">
                <div className="text-3xl mb-2">📰</div>
                <div className="font-bold text-text1 mb-1">No events yet</div>
                <div className="text-sm text-text2">Log in daily — events occur randomly. React to them to earn XP!</div>
              </div>
            ) : (
              portfolio.events.map((event, i) => (
                <div key={i} className={`card border-l-4 ${event.type === 'crash' ? 'border-red-400' : event.type === 'bull' ? 'border-green-500' : 'border-gold'}`}>
                  <div className="font-bold text-sm mb-1">{event.title}</div>
                  <div className="text-xs text-text2 mb-1">{event.impact}</div>
                  <div className="text-xs text-text3">{event.date}</div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

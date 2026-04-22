'use client'
import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase, Profile } from '@/lib/supabase'

const ETFS = [
  { id: 'msci_world', name: 'MSCI World', ticker: 'IWDA', icon: '🌍', color: '#3A9E5C', basePrice: 85.40, desc: 'Global developed markets, 1,600+ companies' },
  { id: 'sp500', name: 'S&P 500', ticker: 'CSPX', icon: '🇺🇸', color: '#3B7AD8', basePrice: 52.20, desc: 'Top 500 US companies' },
  { id: 'emerging', name: 'Emerging Markets', ticker: 'EMIM', icon: '🌏', color: '#E8A820', basePrice: 28.60, desc: 'High-growth developing economies' },
  { id: 'bonds', name: 'Global Bonds', ticker: 'IGLO', icon: '📜', color: '#9B59B6', basePrice: 44.10, desc: 'Stability — government bonds worldwide' },
  { id: 'gold', name: 'Gold ETF', ticker: 'IGLN', icon: '🥇', color: '#F39C12', basePrice: 38.90, desc: 'Inflation hedge — physical gold' },
]

type Holding = { shares: number; avgPrice: number }
type PortfolioData = {
  cash: number
  holdings: Record<string, Holding>
  history: { date: string; value: number }[]
  prices: Record<string, number>
  events: { date: string; title: string; impact: string; type: string }[]
  lastUpdate: string
}

const defaultPortfolio = (): PortfolioData => ({
  cash: 10000,
  holdings: {},
  history: [{ date: new Date().toISOString().slice(0, 10), value: 10000 }],
  prices: Object.fromEntries(ETFS.map(e => [e.id, e.basePrice])),
  events: [],
  lastUpdate: new Date().toISOString().slice(0, 10),
})

function simulatePrices(prices: Record<string, number>, eventType?: string): Record<string, number> {
  const newPrices: Record<string, number> = {}
  ETFS.forEach(etf => {
    let change = (Math.random() - 0.48) * 0.03 // slight upward bias
    if (eventType === 'crash') change = -(Math.random() * 0.08 + 0.04)
    if (eventType === 'bull') change = Math.random() * 0.06 + 0.02
    if (eventType === 'recovery') change = Math.random() * 0.04 + 0.01
    if (etf.id === 'bonds' && eventType === 'crash') change = Math.random() * 0.02 // bonds rise in crashes
    if (etf.id === 'gold' && eventType === 'crash') change = Math.random() * 0.03
    newPrices[etf.id] = Math.max(prices[etf.id] * (1 + change), 1)
  })
  return newPrices
}

function getPortfolioValue(portfolio: PortfolioData): number {
  let value = portfolio.cash
  ETFS.forEach(etf => {
    const holding = portfolio.holdings[etf.id]
    if (holding && holding.shares > 0) {
      value += holding.shares * portfolio.prices[etf.id]
    }
  })
  return value
}

export default function PortfolioPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null)
  const [selectedETF, setSelectedETF] = useState(ETFS[0])
  const [buyAmount, setBuyAmount] = useState('')
  const [activeTab, setActiveTab] = useState<'portfolio' | 'market' | 'events'>('portfolio')
  const [notification, setNotification] = useState<{ msg: string; type: 'success' | 'error' | 'event' } | null>(null)
  const [saving, setSaving] = useState(false)

  const showNotif = (msg: string, type: 'success' | 'error' | 'event') => {
    setNotification({ msg, type })
    setTimeout(() => setNotification(null), 3000)
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

      // Load or init portfolio
      let p: PortfolioData = data?.portfolio || defaultPortfolio()

      // Simulate daily price changes
      const today = new Date().toISOString().slice(0, 10)
      if (p.lastUpdate !== today) {
        // Random market event (10% chance)
        const rand = Math.random()
        let eventType: string | undefined
        let eventTitle = ''
        let eventImpact = ''
        if (rand < 0.04) { eventType = 'crash'; eventTitle = '📉 Market Crash!'; eventImpact = 'Markets fell sharply today. Bonds and gold held steady.' }
        else if (rand < 0.08) { eventType = 'bull'; eventTitle = '📈 Bull Run!'; eventImpact = 'Strong economic data boosted global markets.' }
        else if (rand < 0.12) { eventType = 'recovery'; eventTitle = '🔄 Recovery Day'; eventImpact = 'Markets rebounded after recent volatility.' }

        p.prices = simulatePrices(p.prices, eventType)
        const newValue = getPortfolioValue(p)
        p.history = [...p.history, { date: today, value: newValue }].slice(-90)
        p.lastUpdate = today

        if (eventTitle) {
          p.events = [{ date: today, title: eventTitle, impact: eventImpact, type: eventType || '' }, ...p.events].slice(0, 20)
        }
        await supabase.from('profiles').update({ portfolio: p }).eq('id', session.user.id)
      }

      setPortfolio(p)
      setLoading(false)
    }
    load()
  }, [router])

  async function handleBuy() {
    if (!portfolio || !profile) return
    const euros = parseFloat(buyAmount)
    if (isNaN(euros) || euros <= 0) { showNotif('Enter a valid amount', 'error'); return }
    if (euros > portfolio.cash) { showNotif('Not enough cash!', 'error'); return }
    if (euros < 1) { showNotif('Minimum €1', 'error'); return }

    const price = portfolio.prices[selectedETF.id]
    const shares = euros / price
    const existing = portfolio.holdings[selectedETF.id] || { shares: 0, avgPrice: 0 }
    const totalShares = existing.shares + shares
    const avgPrice = (existing.shares * existing.avgPrice + shares * price) / totalShares

    const newPortfolio: PortfolioData = {
      ...portfolio,
      cash: portfolio.cash - euros,
      holdings: {
        ...portfolio.holdings,
        [selectedETF.id]: { shares: totalShares, avgPrice }
      }
    }
    setPortfolio(newPortfolio)
    setBuyAmount('')
    showNotif(`✅ Bought ${shares.toFixed(4)} shares of ${selectedETF.ticker}`, 'success')
    await savePortfolio(newPortfolio, profile.id)
  }

  async function handleSell(etfId: string, sellShares: number) {
    if (!portfolio || !profile) return
    const holding = portfolio.holdings[etfId]
    if (!holding || holding.shares < sellShares) return
    const etf = ETFS.find(e => e.id === etfId)!
    const proceeds = sellShares * portfolio.prices[etfId]
    const newShares = holding.shares - sellShares
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

  return (
    <div className="min-h-screen bg-bg">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl text-sm font-bold shadow-lg transition-all ${
          notification.type === 'success' ? 'bg-green-bg border border-green-bd text-green-700' :
          notification.type === 'error' ? 'bg-red-50 border border-red-200 text-red-700' :
          'bg-gold-bg border border-gold-bd text-gold-dk'
        }`}>{notification.msg}</div>
      )}

      {/* NAV */}
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

        {/* Header */}
        <div className="mb-5">
          <div className="text-xs font-bold text-text3 uppercase tracking-widest mb-1">📊 Virtual Portfolio</div>
          <h1 className="font-serif font-black text-2xl text-text1">Your Investment Simulator</h1>
          <p className="text-sm text-text2 mt-1">Practice investing with €10,000 virtual money. No risk, real learning.</p>
        </div>

        {/* Portfolio Value Card */}
        <div className={`rounded-2xl p-5 mb-5 relative overflow-hidden ${isPositive ? 'bg-gradient-to-br from-green-900 to-green-700' : 'bg-gradient-to-br from-red-900 to-red-700'}`}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 1px, transparent 14px)' }} />
          <div className="relative">
            <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.6)' }}>Total Portfolio Value</div>
            <div className="font-serif font-black text-3xl text-white mb-1">€{totalValue.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            <div className={`text-sm font-bold ${isPositive ? 'text-green-300' : 'text-red-300'}`}>
              {isPositive ? '▲' : '▼'} €{Math.abs(totalReturn).toFixed(2)} ({isPositive ? '+' : ''}{totalReturnPct.toFixed(2)}%) from start
            </div>
            <div className="flex gap-4 mt-3">
              <div>
                <div className="text-xs text-white/50">Cash</div>
                <div className="text-sm font-bold text-white">€{portfolio.cash.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-xs text-white/50">Invested</div>
                <div className="text-sm font-bold text-white">€{(totalValue - portfolio.cash).toFixed(2)}</div>
              </div>
              <div>
                <div className="text-xs text-white/50">Started with</div>
                <div className="text-sm font-bold text-white">€10,000.00</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mini Chart */}
        {portfolio.history.length > 1 && (
          <div className="card mb-5 p-4">
            <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">Portfolio History (Last 90 days)</div>
            <svg width="100%" height="80" viewBox={`0 0 ${portfolio.history.length * 10} 80`} preserveAspectRatio="none">
              {(() => {
                const vals = portfolio.history.map(h => h.value)
                const min = Math.min(...vals)
                const max = Math.max(...vals)
                const range = max - min || 1
                const points = vals.map((v, i) => `${i * 10},${80 - ((v - min) / range) * 70}`).join(' ')
                const isUp = vals[vals.length - 1] >= vals[0]
                return (
                  <>
                    <polyline points={points} fill="none" stroke={isUp ? '#3A9E5C' : '#E8453A'} strokeWidth="2" />
                    <polyline points={`0,80 ${points} ${(vals.length - 1) * 10},80`} fill={isUp ? 'rgba(58,158,92,0.1)' : 'rgba(232,69,58,0.1)'} stroke="none" />
                  </>
                )
              })()}
            </svg>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-5">
          {(['portfolio', 'market', 'events'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-xl text-xs font-bold capitalize transition-all ${activeTab === tab ? 'bg-gold text-white shadow-sm' : 'bg-bg3 text-text3 hover:bg-gold-bg'}`}>
              {tab === 'portfolio' ? '💼 Holdings' : tab === 'market' ? '📈 Buy/Sell' : '📰 Events'}
            </button>
          ))}
        </div>

        {/* HOLDINGS TAB */}
        {activeTab === 'portfolio' && (
          <div className="flex flex-col gap-3">
            {Object.keys(portfolio.holdings).length === 0 ? (
              <div className="card text-center py-8">
                <div className="text-3xl mb-2">📊</div>
                <div className="font-bold text-text1 mb-1">No holdings yet</div>
                <div className="text-sm text-text2">Go to the Market tab to buy your first ETF!</div>
                <button onClick={() => setActiveTab('market')} className="mt-4 px-4 py-2 rounded-xl bg-gold text-white text-sm font-bold">Go to Market →</button>
              </div>
            ) : (
              ETFS.filter(e => portfolio.holdings[e.id]?.shares > 0).map(etf => {
                const holding = portfolio.holdings[etf.id]
                const currentValue = holding.shares * portfolio.prices[etf.id]
                const gainLoss = currentValue - (holding.shares * holding.avgPrice)
                const gainLossPct = (gainLoss / (holding.shares * holding.avgPrice)) * 100
                const isUp = gainLoss >= 0
                return (
                  <div key={etf.id} className="card">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: etf.color + '20', border: `1.5px solid ${etf.color}40` }}>{etf.icon}</div>
                      <div className="flex-1">
                        <div className="font-bold text-sm text-text1">{etf.name}</div>
                        <div className="text-xs text-text3">{holding.shares.toFixed(4)} shares · avg €{holding.avgPrice.toFixed(2)}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-sm text-text1">€{currentValue.toFixed(2)}</div>
                        <div className={`text-xs font-bold ${isUp ? 'text-green-600' : 'text-red-500'}`}>
                          {isUp ? '+' : ''}€{gainLoss.toFixed(2)} ({isUp ? '+' : ''}{gainLossPct.toFixed(2)}%)
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { setSelectedETF(etf); setActiveTab('market') }}
                        className="flex-1 py-1.5 rounded-lg text-xs font-bold bg-gold-bg text-gold-dk border border-gold-bd">
                        Buy More
                      </button>
                      <button onClick={() => handleSell(etf.id, holding.shares)}
                        className="flex-1 py-1.5 rounded-lg text-xs font-bold bg-red-50 text-red-600 border border-red-200">
                        Sell All
                      </button>
                    </div>
                  </div>
                )
              })
            )}

            {/* Cash card */}
            <div className="card flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-bg3 flex items-center justify-center text-xl">💶</div>
              <div className="flex-1">
                <div className="font-bold text-sm text-text1">Cash (uninvested)</div>
                <div className="text-xs text-text3">Available to invest</div>
              </div>
              <div className="font-bold text-sm text-text1">€{portfolio.cash.toFixed(2)}</div>
            </div>
          </div>
        )}

        {/* MARKET TAB */}
        {activeTab === 'market' && (
          <div className="flex flex-col gap-3">
            <div className="text-xs text-text3 mb-1">Cash available: <strong className="text-text1">€{portfolio.cash.toFixed(2)}</strong></div>
            {ETFS.map(etf => {
              const price = portfolio.prices[etf.id]
              const change = ((price - etf.basePrice) / etf.basePrice) * 100
              const isUp = change >= 0
              const isSelected = selectedETF.id === etf.id
              return (
                <div key={etf.id}
                  onClick={() => setSelectedETF(etf)}
                  className={`card cursor-pointer transition-all ${isSelected ? 'border-gold-bd bg-gold-bg' : 'hover:border-gold-bd'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                      style={{ background: etf.color + '20', border: `1.5px solid ${etf.color}40` }}>{etf.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm text-text1">{etf.name} <span className="text-text3 font-normal">· {etf.ticker}</span></div>
                      <div className="text-xs text-text2 truncate">{etf.desc}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-bold text-sm text-text1">€{price.toFixed(2)}</div>
                      <div className={`text-xs font-bold ${isUp ? 'text-green-600' : 'text-red-500'}`}>
                        {isUp ? '▲' : '▼'} {Math.abs(change).toFixed(2)}%
                      </div>
                    </div>
                    {isSelected && <div className="text-gold text-lg flex-shrink-0">✓</div>}
                  </div>
                </div>
              )
            })}

            {/* Buy Panel */}
            <div className="card border-2 border-gold-bd bg-gold-bg mt-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="text-xl">{selectedETF.icon}</div>
                <div>
                  <div className="font-bold text-sm text-text1">Buy {selectedETF.name}</div>
                  <div className="text-xs text-text3">€{portfolio.prices[selectedETF.id].toFixed(2)} per share</div>
                </div>
              </div>
              <div className="flex gap-2 mb-2">
                {[100, 500, 1000, 2500].map(amt => (
                  <button key={amt} onClick={() => setBuyAmount(String(amt))}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all ${buyAmount === String(amt) ? 'bg-gold text-white border-gold' : 'bg-white border-border text-text2'}`}>
                    €{amt}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={buyAmount}
                  onChange={e => setBuyAmount(e.target.value)}
                  placeholder="Enter amount in €"
                  className="flex-1 px-3 py-2 rounded-xl border border-border text-sm bg-white outline-none focus:border-gold"
                />
                <button onClick={handleBuy}
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-gold text-white font-bold text-sm disabled:opacity-50">
                  {saving ? '...' : 'Buy'}
                </button>
              </div>
              {buyAmount && !isNaN(parseFloat(buyAmount)) && parseFloat(buyAmount) > 0 && (
                <div className="mt-2 text-xs text-text3">
                  ≈ {(parseFloat(buyAmount) / portfolio.prices[selectedETF.id]).toFixed(4)} shares
                </div>
              )}
            </div>
          </div>
        )}

        {/* EVENTS TAB */}
        {activeTab === 'events' && (
          <div className="flex flex-col gap-3">
            {portfolio.events.length === 0 ? (
              <div className="card text-center py-8">
                <div className="text-3xl mb-2">📰</div>
                <div className="font-bold text-text1 mb-1">No events yet</div>
                <div className="text-sm text-text2">Market events like crashes and bull runs will appear here as they happen.</div>
              </div>
            ) : (
              portfolio.events.map((event, i) => (
                <div key={i} className={`card border-l-4 ${event.type === 'crash' ? 'border-red-400' : event.type === 'bull' ? 'border-green-500' : 'border-gold'}`}>
                  <div className="font-bold text-sm text-text1 mb-1">{event.title}</div>
                  <div className="text-xs text-text2 mb-1">{event.impact}</div>
                  <div className="text-xs text-text3">{event.date}</div>
                </div>
              ))
            )}
            <div className="card bg-bg3 text-center py-4">
              <div className="text-xs text-text3">Events occur randomly each day when you log in. Come back tomorrow to see what the market does! 📈</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

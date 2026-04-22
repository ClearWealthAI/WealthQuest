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
type ShortPosition = { shares: number; entryPrice: number; collateral: number }
type PortfolioData = {
  cash: number
  holdings: Record<string, Holding>
  shorts: Record<string, ShortPosition>
  history: { date: string; value: number }[]
  prices: Record<string, number>
  events: { date: string; title: string; impact: string; type: string }[]
  lastUpdate: string
}

const defaultPortfolio = (): PortfolioData => ({
  cash: 10000,
  holdings: {},
  shorts: {},
  history: [{ date: new Date().toISOString().slice(0, 10), value: 10000 }],
  prices: Object.fromEntries(ETFS.map(e => [e.id, e.basePrice])),
  events: [],
  lastUpdate: new Date().toISOString().slice(0, 10),
})

function simulatePrices(prices: Record<string, number>, eventType?: string): Record<string, number> {
  const newPrices: Record<string, number> = {}
  ETFS.forEach(etf => {
    let change = (Math.random() - 0.48) * 0.03
    if (eventType === 'crash') change = -(Math.random() * 0.08 + 0.04)
    if (eventType === 'bull') change = Math.random() * 0.06 + 0.02
    if (eventType === 'recovery') change = Math.random() * 0.04 + 0.01
    if (etf.id === 'bonds' && eventType === 'crash') change = Math.random() * 0.02
    if (etf.id === 'gold' && eventType === 'crash') change = Math.random() * 0.03
    newPrices[etf.id] = Math.max(prices[etf.id] * (1 + change), 1)
  })
  return newPrices
}

function getPortfolioValue(portfolio: PortfolioData): number {
  let value = portfolio.cash
  ETFS.forEach(etf => {
    const holding = portfolio.holdings[etf.id]
    if (holding?.shares > 0) value += holding.shares * portfolio.prices[etf.id]
    // Short P&L: profit when price falls below entry
    const short = portfolio.shorts?.[etf.id]
    if (short?.shares > 0) {
      const pnl = (short.entryPrice - portfolio.prices[etf.id]) * short.shares
      value += short.collateral + pnl
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
  const [shortAmount, setShortAmount] = useState('')
  const [activeTab, setActiveTab] = useState<'portfolio' | 'long' | 'short' | 'events'>('portfolio')
  const [notification, setNotification] = useState<{ msg: string; type: 'success' | 'error' | 'event' } | null>(null)
  const [saving, setSaving] = useState(false)
  const [showShortInfo, setShowShortInfo] = useState(false)

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

      let p: PortfolioData = data?.portfolio ? { shorts: {}, ...data.portfolio } : defaultPortfolio()

      const today = new Date().toISOString().slice(0, 10)
      if (p.lastUpdate !== today) {
        const rand = Math.random()
        let eventType: string | undefined
        let eventTitle = ''
        let eventImpact = ''
        if (rand < 0.04) { eventType = 'crash'; eventTitle = '📉 Market Crash!'; eventImpact = 'Markets fell sharply. Short sellers profited. Bonds and gold held steady.' }
        else if (rand < 0.08) { eventType = 'bull'; eventTitle = '📈 Bull Run!'; eventImpact = 'Strong economic data boosted global markets. Long positions gained.' }
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

  // BUY LONG
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
      holdings: { ...portfolio.holdings, [selectedETF.id]: { shares: totalShares, avgPrice } }
    }
    setPortfolio(newPortfolio)
    setBuyAmount('')
    showNotif(`✅ Bought ${shares.toFixed(4)} shares of ${selectedETF.ticker} (Long)`, 'success')
    await savePortfolio(newPortfolio, profile.id)
  }

  // OPEN SHORT
  async function handleShort() {
    if (!portfolio || !profile) return
    const euros = parseFloat(shortAmount)
    if (isNaN(euros) || euros <= 0) { showNotif('Enter a valid amount', 'error'); return }
    if (euros > portfolio.cash) { showNotif('Not enough cash for collateral!', 'error'); return }
    if (euros < 10) { showNotif('Minimum €10 for a short', 'error'); return }

    const price = portfolio.prices[selectedETF.id]
    const shares = euros / price
    const existing = portfolio.shorts?.[selectedETF.id]

    // Add to existing short or create new
    const totalShares = (existing?.shares || 0) + shares
    const totalCollateral = (existing?.collateral || 0) + euros
    const avgEntry = existing
      ? (existing.shares * existing.entryPrice + shares * price) / totalShares
      : price

    const newPortfolio: PortfolioData = {
      ...portfolio,
      cash: portfolio.cash - euros, // collateral locked
      shorts: {
        ...portfolio.shorts,
        [selectedETF.id]: { shares: totalShares, entryPrice: avgEntry, collateral: totalCollateral }
      }
    }
    setPortfolio(newPortfolio)
    setShortAmount('')
    showNotif(`📉 Opened short on ${selectedETF.ticker} — you profit if the price falls!`, 'success')
    await savePortfolio(newPortfolio, profile.id)
  }

  // CLOSE SHORT
  async function handleCloseShort(etfId: string) {
    if (!portfolio || !profile) return
    const short = portfolio.shorts[etfId]
    if (!short) return
    const etf = ETFS.find(e => e.id === etfId)!
    const currentPrice = portfolio.prices[etfId]
    const pnl = (short.entryPrice - currentPrice) * short.shares
    const returned = short.collateral + pnl

    const newShorts = { ...portfolio.shorts }
    delete newShorts[etfId]

    const newPortfolio: PortfolioData = {
      ...portfolio,
      cash: portfolio.cash + Math.max(returned, 0), // can't go below 0
      shorts: newShorts
    }
    setPortfolio(newPortfolio)
    const gain = pnl >= 0
    showNotif(`${gain ? '✅' : '❌'} Closed short on ${etf.ticker}: ${gain ? '+' : ''}€${pnl.toFixed(2)} P&L`, gain ? 'success' : 'error')
    await savePortfolio(newPortfolio, profile.id)
  }

  // SELL LONG
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
  const hasShorts = Object.keys(portfolio.shorts || {}).some(k => portfolio.shorts[k]?.shares > 0)

  return (
    <div className="min-h-screen bg-bg">
      {notification && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl text-sm font-bold shadow-lg transition-all max-w-[90vw] text-center ${
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
        <div className="mb-5">
          <div className="text-xs font-bold text-text3 uppercase tracking-widest mb-1">📊 Virtual Portfolio</div>
          <h1 className="font-serif font-black text-2xl text-text1">Investment Simulator</h1>
          <p className="text-sm text-text2 mt-1">Go long or short on ETFs with €10,000 virtual money.</p>
        </div>

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
              <div><div className="text-xs text-white/50">Cash</div><div className="text-sm font-bold text-white">€{portfolio.cash.toFixed(2)}</div></div>
              <div><div className="text-xs text-white/50">Long</div><div className="text-sm font-bold text-white">€{ETFS.reduce((a, e) => a + (portfolio.holdings[e.id]?.shares || 0) * portfolio.prices[e.id], 0).toFixed(2)}</div></div>
              <div><div className="text-xs text-white/50">Short P&L</div><div className="text-sm font-bold text-white">€{ETFS.reduce((a, e) => { const s = portfolio.shorts?.[e.id]; return a + (s ? (s.entryPrice - portfolio.prices[e.id]) * s.shares : 0) }, 0).toFixed(2)}</div></div>
            </div>
          </div>
        </div>

        {/* Chart */}
        {portfolio.history.length > 1 && (
          <div className="card mb-5 p-4">
            <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">Portfolio History</div>
            <svg width="100%" height="80" viewBox={`0 0 ${portfolio.history.length * 10} 80`} preserveAspectRatio="none">
              {(() => {
                const vals = portfolio.history.map(h => h.value)
                const min = Math.min(...vals); const max = Math.max(...vals)
                const range = max - min || 1
                const points = vals.map((v, i) => `${i * 10},${80 - ((v - min) / range) * 70}`).join(' ')
                const isUp = vals[vals.length - 1] >= vals[0]
                return (<>
                  <polyline points={points} fill="none" stroke={isUp ? '#3A9E5C' : '#E8453A'} strokeWidth="2" />
                  <polyline points={`0,80 ${points} ${(vals.length - 1) * 10},80`} fill={isUp ? 'rgba(58,158,92,0.1)' : 'rgba(232,69,58,0.1)'} stroke="none" />
                </>)
              })()}
            </svg>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-5">
          {(['portfolio', 'long', 'short', 'events'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-xl text-xs font-bold capitalize transition-all ${activeTab === tab ? 'bg-gold text-white shadow-sm' : 'bg-bg3 text-text3 hover:bg-gold-bg'}`}>
              {tab === 'portfolio' ? '💼' : tab === 'long' ? '📈 Long' : tab === 'short' ? '📉 Short' : '📰'}
            </button>
          ))}
        </div>

        {/* HOLDINGS TAB */}
        {activeTab === 'portfolio' && (
          <div className="flex flex-col gap-3">
            {Object.keys(portfolio.holdings).length === 0 && !hasShorts ? (
              <div className="card text-center py-8">
                <div className="text-3xl mb-2">📊</div>
                <div className="font-bold text-text1 mb-1">No positions yet</div>
                <div className="text-sm text-text2 mb-4">Go Long if you think prices rise. Go Short if you think prices fall.</div>
                <div className="flex gap-2 justify-center">
                  <button onClick={() => setActiveTab('long')} className="px-4 py-2 rounded-xl bg-green-bg text-green-700 border border-green-bd text-sm font-bold">📈 Go Long</button>
                  <button onClick={() => setActiveTab('short')} className="px-4 py-2 rounded-xl bg-red-50 text-red-600 border border-red-200 text-sm font-bold">📉 Go Short</button>
                </div>
              </div>
            ) : (
              <>
                {/* Long positions */}
                {ETFS.filter(e => (portfolio.holdings[e.id]?.shares || 0) > 0).map(etf => {
                  const holding = portfolio.holdings[etf.id]
                  const currentValue = holding.shares * portfolio.prices[etf.id]
                  const gainLoss = currentValue - (holding.shares * holding.avgPrice)
                  const gainLossPct = (gainLoss / (holding.shares * holding.avgPrice)) * 100
                  return (
                    <div key={etf.id} className="card">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-bg text-green-700 border border-green-bd">📈 LONG</span>
                        <span className="font-bold text-sm text-text1">{etf.name}</span>
                      </div>
                      <div className="flex justify-between items-center mb-3">
                        <div className="text-xs text-text3">{holding.shares.toFixed(4)} shares · avg €{holding.avgPrice.toFixed(2)}</div>
                        <div className="text-right">
                          <div className="font-bold text-sm text-text1">€{currentValue.toFixed(2)}</div>
                          <div className={`text-xs font-bold ${gainLoss >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                            {gainLoss >= 0 ? '+' : ''}€{gainLoss.toFixed(2)} ({gainLoss >= 0 ? '+' : ''}{gainLossPct.toFixed(2)}%)
                          </div>
                        </div>
                      </div>
                      <button onClick={() => handleSell(etf.id, holding.shares)}
                        className="w-full py-1.5 rounded-lg text-xs font-bold bg-red-50 text-red-600 border border-red-200">
                        Close Long (Sell All)
                      </button>
                    </div>
                  )
                })}

                {/* Short positions */}
                {ETFS.filter(e => (portfolio.shorts?.[e.id]?.shares || 0) > 0).map(etf => {
                  const short = portfolio.shorts[etf.id]
                  const pnl = (short.entryPrice - portfolio.prices[etf.id]) * short.shares
                  const pnlPct = (pnl / short.collateral) * 100
                  return (
                    <div key={etf.id} className="card border-red-200">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200">📉 SHORT</span>
                        <span className="font-bold text-sm text-text1">{etf.name}</span>
                      </div>
                      <div className="flex justify-between items-center mb-1">
                        <div className="text-xs text-text3">{short.shares.toFixed(4)} shares · entry €{short.entryPrice.toFixed(2)}</div>
                        <div className="text-right">
                          <div className="text-xs text-text3">Current: €{portfolio.prices[etf.id].toFixed(2)}</div>
                          <div className={`text-xs font-bold ${pnl >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                            P&L: {pnl >= 0 ? '+' : ''}€{pnl.toFixed(2)} ({pnl >= 0 ? '+' : ''}{pnlPct.toFixed(2)}%)
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-text3 mb-3">Collateral locked: €{short.collateral.toFixed(2)}</div>
                      <button onClick={() => handleCloseShort(etf.id)}
                        className="w-full py-1.5 rounded-lg text-xs font-bold bg-gold-bg text-gold-dk border border-gold-bd">
                        Close Short Position
                      </button>
                    </div>
                  )
                })}

                <div className="card flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-bg3 flex items-center justify-center text-xl">💶</div>
                  <div className="flex-1"><div className="font-bold text-sm text-text1">Available Cash</div><div className="text-xs text-text3">Ready to invest</div></div>
                  <div className="font-bold text-sm text-text1">€{portfolio.cash.toFixed(2)}</div>
                </div>
              </>
            )}
          </div>
        )}

        {/* LONG TAB */}
        {activeTab === 'long' && (
          <div className="flex flex-col gap-3">
            <div className="card bg-green-bg border-green-bd">
              <div className="text-sm font-bold text-green-700 mb-1">📈 Going Long</div>
              <div className="text-xs text-green-600">You profit when the ETF price goes UP. Best for long-term wealth building.</div>
            </div>
            <div className="text-xs text-text3 mb-1">Cash: <strong className="text-text1">€{portfolio.cash.toFixed(2)}</strong></div>
            {ETFS.map(etf => {
              const price = portfolio.prices[etf.id]
              const change = ((price - etf.basePrice) / etf.basePrice) * 100
              const isUp = change >= 0
              return (
                <div key={etf.id} onClick={() => setSelectedETF(etf)}
                  className={`card cursor-pointer transition-all ${selectedETF.id === etf.id ? 'border-green-bd bg-green-bg' : 'hover:border-gold-bd'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                      style={{ background: etf.color + '20', border: `1.5px solid ${etf.color}40` }}>{etf.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm text-text1">{etf.name} <span className="text-text3 font-normal">· {etf.ticker}</span></div>
                      <div className="text-xs text-text2 truncate">{etf.desc}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-bold text-sm text-text1">€{price.toFixed(2)}</div>
                      <div className={`text-xs font-bold ${isUp ? 'text-green-600' : 'text-red-500'}`}>{isUp ? '▲' : '▼'} {Math.abs(change).toFixed(2)}%</div>
                    </div>
                    {selectedETF.id === etf.id && <div className="text-green-600 text-lg">✓</div>}
                  </div>
                </div>
              )
            })}
            <div className="card border-2 border-green-bd bg-green-bg mt-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="text-xl">{selectedETF.icon}</div>
                <div>
                  <div className="font-bold text-sm text-text1">Buy {selectedETF.name} (Long)</div>
                  <div className="text-xs text-text3">€{portfolio.prices[selectedETF.id].toFixed(2)} per share</div>
                </div>
              </div>
              <div className="flex gap-2 mb-2 flex-wrap">
                {[100, 500, 1000, 2500].map(amt => (
                  <button key={amt} onClick={() => setBuyAmount(String(amt))}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all ${buyAmount === String(amt) ? 'bg-green-600 text-white border-green-600' : 'bg-white border-border text-text2'}`}>
                    €{amt}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <input type="number" value={buyAmount} onChange={e => setBuyAmount(e.target.value)}
                  placeholder="Enter amount €" className="flex-1 px-3 py-2 rounded-xl border border-border text-sm bg-white outline-none focus:border-green-500" />
                <button onClick={handleBuy} disabled={saving}
                  className="px-5 py-2 rounded-xl bg-green-600 text-white font-bold text-sm disabled:opacity-50">
                  {saving ? '...' : '📈 Buy'}
                </button>
              </div>
              {buyAmount && !isNaN(parseFloat(buyAmount)) && (
                <div className="mt-2 text-xs text-text3">≈ {(parseFloat(buyAmount) / portfolio.prices[selectedETF.id]).toFixed(4)} shares</div>
              )}
            </div>
          </div>
        )}

        {/* SHORT TAB */}
        {activeTab === 'short' && (
          <div className="flex flex-col gap-3">
            <div className="card bg-red-50 border-red-200">
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm font-bold text-red-700">📉 Going Short — How it works</div>
                <button onClick={() => setShowShortInfo(!showShortInfo)} className="text-xs text-red-400">{showShortInfo ? '▲ Less' : '▼ More'}</button>
              </div>
              <div className="text-xs text-red-600">You profit when the ETF price goes DOWN. You borrow shares and sell them, hoping to buy back cheaper.</div>
              {showShortInfo && (
                <div className="mt-2 text-xs text-red-500 space-y-1 pt-2 border-t border-red-200">
                  <div>1️⃣ You deposit collateral (locked cash)</div>
                  <div>2️⃣ We borrow and sell shares at current price</div>
                  <div>3️⃣ If price falls → you profit the difference</div>
                  <div>4️⃣ If price rises → you lose money</div>
                  <div>⚠️ Risk: losses can exceed your collateral if price rises sharply!</div>
                </div>
              )}
            </div>

            <div className="text-xs text-text3">Cash available: <strong className="text-text1">€{portfolio.cash.toFixed(2)}</strong></div>

            {ETFS.map(etf => {
              const price = portfolio.prices[etf.id]
              const change = ((price - etf.basePrice) / etf.basePrice) * 100
              const isUp = change >= 0
              const existingShort = portfolio.shorts?.[etf.id]
              return (
                <div key={etf.id} onClick={() => setSelectedETF(etf)}
                  className={`card cursor-pointer transition-all ${selectedETF.id === etf.id ? 'border-red-300 bg-red-50' : 'hover:border-red-300'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                      style={{ background: etf.color + '20', border: `1.5px solid ${etf.color}40` }}>{etf.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm text-text1">{etf.name}</div>
                      <div className="text-xs text-text2 truncate">{etf.desc}</div>
                      {existingShort && <div className="text-xs text-red-500 font-bold">📉 Short open · {existingShort.shares.toFixed(2)} shares</div>}
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-bold text-sm text-text1">€{price.toFixed(2)}</div>
                      <div className={`text-xs font-bold ${isUp ? 'text-green-600' : 'text-red-500'}`}>{isUp ? '▲' : '▼'} {Math.abs(change).toFixed(2)}%</div>
                    </div>
                    {selectedETF.id === etf.id && <div className="text-red-500 text-lg">✓</div>}
                  </div>
                </div>
              )
            })}

            <div className="card border-2 border-red-300 bg-red-50 mt-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="text-xl">{selectedETF.icon}</div>
                <div>
                  <div className="font-bold text-sm text-text1">Short {selectedETF.name}</div>
                  <div className="text-xs text-text3">Current price: €{portfolio.prices[selectedETF.id].toFixed(2)}</div>
                </div>
              </div>
              <div className="flex gap-2 mb-2 flex-wrap">
                {[100, 500, 1000, 2500].map(amt => (
                  <button key={amt} onClick={() => setShortAmount(String(amt))}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all ${shortAmount === String(amt) ? 'bg-red-500 text-white border-red-500' : 'bg-white border-border text-text2'}`}>
                    €{amt}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <input type="number" value={shortAmount} onChange={e => setShortAmount(e.target.value)}
                  placeholder="Collateral amount €" className="flex-1 px-3 py-2 rounded-xl border border-border text-sm bg-white outline-none focus:border-red-400" />
                <button onClick={handleShort} disabled={saving}
                  className="px-5 py-2 rounded-xl bg-red-500 text-white font-bold text-sm disabled:opacity-50">
                  {saving ? '...' : '📉 Short'}
                </button>
              </div>
              {shortAmount && !isNaN(parseFloat(shortAmount)) && (
                <div className="mt-2 text-xs text-text3">
                  ≈ {(parseFloat(shortAmount) / portfolio.prices[selectedETF.id]).toFixed(4)} shares · Profit if price falls below €{portfolio.prices[selectedETF.id].toFixed(2)}
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
                <div className="font-bold text-text1 mb-1">No market events yet</div>
                <div className="text-sm text-text2">Come back daily — crashes, bull runs and recoveries happen randomly!</div>
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
          </div>
        )}
      </div>
    </div>
  )
}

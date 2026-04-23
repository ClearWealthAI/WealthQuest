'use client'
import { useEffect, useState, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase, Profile } from '@/lib/supabase'
import { QUESTS, LEVEL_NAMES, XP_PER_LEVEL } from '@/lib/quests'

// ─── VISUAL COMPONENTS ────────────────────────────────────────────────────────

// Quest 5: Compound Interest — animated growth chart
function CompoundChart() {
  const [year, setYear] = useState(0)
  const maxYear = 30
  const simple = (y: number) => 1000 + y * 70
  const compound = (y: number) => 1000 * Math.pow(1.07, y)

  useEffect(() => {
    if (year < maxYear) {
      const t = setTimeout(() => setYear(y => y + 1), 80)
      return () => clearTimeout(t)
    }
  }, [year])

  const maxVal = compound(maxYear)
  const w = 280, h = 160
  const pts = (fn: (y: number) => number) =>
    Array.from({ length: year + 1 }, (_, i) => `${(i / maxYear) * w},${h - (fn(i) / maxVal) * h}`).join(' ')

  return (
    <div className="card mb-4 p-4">
      <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">📈 €1,000 at 7% over 30 years</div>
      <svg width="100%" viewBox={`0 0 ${w} ${h}`} className="overflow-visible mb-3">
        <defs>
          <linearGradient id="cg1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3A9E5C" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#3A9E5C" stopOpacity="0"/>
          </linearGradient>
        </defs>
        {year > 0 && <>
          <polyline points={pts(simple)} fill="none" stroke="#A89E90" strokeWidth="2" strokeDasharray="5 3"/>
          <polyline points={pts(compound)} fill="none" stroke="#3A9E5C" strokeWidth="2.5"/>
        </>}
      </svg>
      <div className="flex justify-between text-xs">
        <div className="flex items-center gap-1"><div className="w-4 h-0.5 bg-text3" style={{borderTop:'2px dashed #A89E90'}}/>Simple: <strong>€{Math.round(simple(year)).toLocaleString()}</strong></div>
        <div className="flex items-center gap-1"><div className="w-4 h-0.5 bg-green-500"/>Compound: <strong className="text-green-700">€{Math.round(compound(year)).toLocaleString()}</strong></div>
      </div>
      <div className="mt-2 text-center text-xs text-text3">Year {year} of {maxYear}</div>
    </div>
  )
}

// Quest 4: TER comparison bars
function TERChart() {
  const [show, setShow] = useState(false)
  useEffect(() => { setTimeout(() => setShow(true), 200) }, [])
  const funds = [
    { label: 'MSCI World ETF', ter: 0.20, final: 720, color: '#3A9E5C' },
    { label: 'Active Fund', ter: 1.50, final: 540, color: '#E8453A' },
  ]
  const max = 720
  return (
    <div className="card mb-4 p-4">
      <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">💸 €100,000 after 30 years at 7%</div>
      {funds.map(f => (
        <div key={f.label} className="mb-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="font-bold text-text1">{f.label}</span>
            <span className="font-bold" style={{ color: f.color }}>TER {f.ter}%</span>
          </div>
          <div className="h-8 bg-bg3 rounded-lg overflow-hidden border border-border">
            <div className="h-full rounded-lg flex items-center justify-end pr-3 text-white text-xs font-bold transition-all duration-1000"
              style={{ width: show ? `${(f.final / max) * 100}%` : '0%', background: f.color }}>
              €{f.final}k
            </div>
          </div>
        </div>
      ))}
      <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-semibold text-center">
        ⚠️ Difference: €180,000 — lost to fees alone
      </div>
    </div>
  )
}

// Quest 8: MSCI World composition
function MSCIChart() {
  const sectors = [
    { name: 'USA', pct: 70, color: '#3B7AD8' },
    { name: 'Japan', pct: 6, color: '#E8A820' },
    { name: 'UK', pct: 4, color: '#E8453A' },
    { name: 'France', pct: 3, color: '#3A9E5C' },
    { name: 'Canada', pct: 3, color: '#9B59B6' },
    { name: 'Other', pct: 14, color: '#A89E90' },
  ]
  let cumulative = 0
  const r = 60, cx = 80, cy = 80
  const slices = sectors.map(s => {
    const start = (cumulative / 100) * 2 * Math.PI - Math.PI / 2
    cumulative += s.pct
    const end = (cumulative / 100) * 2 * Math.PI - Math.PI / 2
    const x1 = cx + r * Math.cos(start), y1 = cy + r * Math.sin(start)
    const x2 = cx + r * Math.cos(end), y2 = cy + r * Math.sin(end)
    const large = s.pct > 50 ? 1 : 0
    return { ...s, d: `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large},1 ${x2},${y2} Z` }
  })
  return (
    <div className="card mb-4 p-4">
      <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">🌍 MSCI World — Country Breakdown</div>
      <div className="flex items-center gap-4">
        <svg width="160" height="160" viewBox="0 0 160 160">
          {slices.map(s => <path key={s.name} d={s.d} fill={s.color} stroke="white" strokeWidth="2"/>)}
          <circle cx={cx} cy={cy} r="30" fill="white"/>
          <text x={cx} y={cy-4} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1C1A16">1,600+</text>
          <text x={cx} y={cy+8} textAnchor="middle" fontSize="8" fill="#6B6355">companies</text>
        </svg>
        <div className="flex flex-col gap-1.5">
          {sectors.map(s => (
            <div key={s.name} className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: s.color }}/>
              <span className="text-text2">{s.name}</span>
              <span className="font-bold text-text1 ml-auto">{s.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Quest 12: Inflation — purchasing power
function InflationChart() {
  const [show, setShow] = useState(false)
  useEffect(() => { setTimeout(() => setShow(true), 300) }, [])
  const years = [0, 5, 10, 15, 20, 25, 30]
  const cash = (y: number) => Math.round(10000 * Math.pow(0.97, y))
  const invested = (y: number) => Math.round(10000 * Math.pow(1.08, y))
  return (
    <div className="card mb-4 p-4">
      <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">🔥 €10,000: Cash vs Invested</div>
      <div className="flex flex-col gap-2">
        {years.map(y => (
          <div key={y} className="flex items-center gap-2 text-xs">
            <span className="text-text3 w-10 flex-shrink-0">Year {y}</span>
            <div className="flex-1 flex gap-1">
              <div className="h-5 rounded flex items-center justify-end pr-1 text-white font-bold transition-all duration-700 text-[10px]"
                style={{ width: show ? `${(cash(y) / invested(30)) * 100}%` : '0%', background: '#E8453A', minWidth: 30 }}>
                €{(cash(y)/1000).toFixed(1)}k
              </div>
            </div>
            <div className="flex-1">
              <div className="h-5 rounded flex items-center justify-end pr-1 text-white font-bold transition-all duration-700 text-[10px]"
                style={{ width: show ? `${(invested(y) / invested(30)) * 100}%` : '5%', background: '#3A9E5C', transitionDelay: `${y * 50}ms` }}>
                €{(invested(y)/1000).toFixed(0)}k
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-3 text-xs justify-center">
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-red-500"/><span>Cash (3% inflation)</span></div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-green-600"/><span>Invested (8% return)</span></div>
      </div>
    </div>
  )
}

// Quest 16: Market crashes timeline
function CrashTimeline() {
  const crashes = [
    { year: '1929', name: 'Great Depression', drop: -89, recovery: 25 },
    { year: '1987', name: 'Black Monday', drop: -34, recovery: 2 },
    { year: '2000', name: 'Dot-com Bust', drop: -49, recovery: 7 },
    { year: '2008', name: 'Financial Crisis', drop: -57, recovery: 4 },
    { year: '2020', name: 'COVID Crash', drop: -34, recovery: 0.5 },
  ]
  return (
    <div className="card mb-4 p-4">
      <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">📉 Every crash recovered — every single one</div>
      <div className="flex flex-col gap-2">
        {crashes.map(c => (
          <div key={c.year} className="flex items-center gap-2">
            <span className="text-xs font-bold text-text3 w-8">{c.year}</span>
            <div className="flex-1">
              <div className="text-xs text-text1 font-semibold mb-0.5">{c.name}</div>
              <div className="flex items-center gap-1">
                <div className="h-4 rounded text-[10px] text-white font-bold flex items-center justify-center px-1"
                  style={{ width: `${Math.abs(c.drop)}%`, background: '#E8453A' }}>
                  {c.drop}%
                </div>
                <span className="text-[10px] text-green-600 font-bold">✓ Recovered in ~{c.recovery < 1 ? `${Math.round(c.recovery * 12)}mo` : `${c.recovery}yr`}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Quest 7: DCA — dollar cost averaging
function DCAChart() {
  const months = [
    { m: 'Jan', price: 10, shares: 20 },
    { m: 'Feb', price: 8, shares: 25 },
    { m: 'Mar', price: 6, shares: 33 },
    { m: 'Apr', price: 9, shares: 22 },
    { m: 'May', price: 12, shares: 16 },
    { m: 'Jun', price: 11, shares: 18 },
  ]
  const totalShares = months.reduce((a, m) => a + m.shares, 0)
  const avgCost = (months.length * 200) / totalShares
  return (
    <div className="card mb-4 p-4">
      <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">📅 €200/month — regardless of price</div>
      <div className="flex gap-1 items-end h-20 mb-2">
        {months.map(m => (
          <div key={m.m} className="flex-1 flex flex-col items-center gap-0.5">
            <div className="text-[9px] font-bold text-green-700">+{m.shares}</div>
            <div className="w-full rounded-t transition-all"
              style={{ height: `${(m.price / 12) * 60}px`, background: m.price <= 8 ? '#3A9E5C' : '#3B7AD8' }}/>
            <div className="text-[9px] text-text3">€{m.price}</div>
            <div className="text-[9px] text-text3">{m.m}</div>
          </div>
        ))}
      </div>
      <div className="flex gap-3 text-xs justify-center mt-2">
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-green-600"/><span>Buy more (price low)</span></div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-blue-500"/><span>Buy less (price high)</span></div>
      </div>
      <div className="mt-3 p-2 bg-gold-bg border border-gold-bd rounded-lg text-xs text-center text-gold-dk font-bold">
        Total: {totalShares} shares · Avg cost: €{avgCost.toFixed(2)} · Market avg: €{(months.reduce((a,m)=>a+m.price,0)/months.length).toFixed(2)}
      </div>
    </div>
  )
}

// Quest 17: Savings rate — time to FIRE
function SavingsRateChart() {
  const rates = [
    { rate: 10, years: 51 },
    { rate: 20, years: 37 },
    { rate: 30, years: 28 },
    { rate: 40, years: 22 },
    { rate: 50, years: 17 },
    { rate: 70, years: 9 },
  ]
  return (
    <div className="card mb-4 p-4">
      <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">💰 Savings Rate → Years to Financial Independence</div>
      {rates.map(r => (
        <div key={r.rate} className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold text-text1 w-8">{r.rate}%</span>
          <div className="flex-1 h-5 bg-bg3 rounded-lg overflow-hidden border border-border">
            <div className="h-full rounded-lg flex items-center justify-end pr-2 text-white text-[10px] font-bold"
              style={{ width: `${(r.years / 51) * 100}%`, background: r.rate >= 50 ? '#3A9E5C' : r.rate >= 30 ? '#E8A820' : '#E8453A' }}>
              {r.years}yr
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Quest 9: Diversification
function DiversificationChart() {
  return (
    <div className="card mb-4 p-4">
      <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">🥚 Single Stock vs ETF — Risk Comparison</div>
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-center">
          <div className="text-2xl mb-1">📉</div>
          <div className="text-xs font-bold text-red-700 mb-1">Single Stock</div>
          <div className="text-[10px] text-red-500">1 company fails → lose everything</div>
          <div className="mt-2 text-lg font-black text-red-600">−100%</div>
          <div className="text-[10px] text-red-400">possible loss</div>
        </div>
        <div className="p-3 bg-green-bg border border-green-bd rounded-xl text-center">
          <div className="text-2xl mb-1">📈</div>
          <div className="text-xs font-bold text-green-700 mb-1">MSCI World ETF</div>
          <div className="text-[10px] text-green-600">1,600 companies → 1 failure = tiny impact</div>
          <div className="mt-2 text-lg font-black text-green-700">~0.06%</div>
          <div className="text-[10px] text-green-500">impact per failure</div>
        </div>
      </div>
    </div>
  )
}

// Quest 14: ETF vs Active funds
function ActiveVsPassiveChart() {
  const [show, setShow] = useState(false)
  useEffect(() => { setTimeout(() => setShow(true), 300) }, [])
  return (
    <div className="card mb-4 p-4">
      <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">🏆 % of Active Funds Beaten by Index ETF (15yr)</div>
      <div className="flex flex-col gap-3">
        {[
          { cat: 'US Large Cap', pct: 92 },
          { cat: 'European Equity', pct: 88 },
          { cat: 'Emerging Markets', pct: 85 },
          { cat: 'Global Bonds', pct: 79 },
        ].map(c => (
          <div key={c.cat}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-text2">{c.cat}</span>
              <span className="font-bold text-red-600">{c.pct}% underperform</span>
            </div>
            <div className="h-4 bg-bg3 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-red-400 to-red-600 rounded-full transition-all duration-1000 flex items-center justify-end pr-2"
                style={{ width: show ? `${c.pct}%` : '0%' }}>
                <span className="text-white text-[9px] font-bold">{c.pct}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-text3 mt-2 text-center">Source: SPIVA S&P Reports 2023</p>
    </div>
  )
}

// Quest 10: Risk & Return spectrum
function RiskReturnChart() {
  const assets = [
    { name: 'Cash', risk: 1, ret: 1, color: '#A89E90' },
    { name: 'Gov Bonds', risk: 2, ret: 2.5, color: '#9B59B6' },
    { name: 'Corp Bonds', risk: 3, ret: 4, color: '#3B7AD8' },
    { name: 'MSCI World', risk: 6, ret: 8, color: '#3A9E5C' },
    { name: 'EM ETF', risk: 8, ret: 10, color: '#E8A820' },
    { name: 'Single Stock', risk: 10, ret: 12, color: '#E8453A' },
  ]
  return (
    <div className="card mb-4 p-4">
      <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">⚖️ Risk vs Expected Return</div>
      <svg width="100%" viewBox="0 0 280 160" className="overflow-visible">
        <line x1="20" y1="140" x2="270" y2="140" stroke="#E4E0D8" strokeWidth="1.5"/>
        <line x1="20" y1="140" x2="20" y2="10" stroke="#E4E0D8" strokeWidth="1.5"/>
        <text x="145" y="158" textAnchor="middle" fontSize="9" fill="#A89E90">Risk →</text>
        <text x="8" y="80" textAnchor="middle" fontSize="9" fill="#A89E90" transform="rotate(-90,8,80)">Return →</text>
        {assets.map(a => {
          const x = 20 + (a.risk / 10) * 240
          const y = 140 - (a.ret / 12) * 120
          return (
            <g key={a.name}>
              <circle cx={x} cy={y} r="10" fill={a.color} opacity="0.9"/>
              <text x={x} y={y + 20} textAnchor="middle" fontSize="8" fill="#6B6355" fontWeight="bold">{a.name}</text>
            </g>
          )
        })}
        <path d="M30,135 Q145,60 260,20" stroke="#E4E0D8" strokeWidth="1" strokeDasharray="4 3" fill="none"/>
      </svg>
    </div>
  )
}

// Quest 22: Bonds — stabilizer
function BondsChart() {
  const data = [
    { year: '2008', stocks: -57, bonds: 5 },
    { year: '2020', stocks: -34, bonds: 8 },
    { year: '2022', stocks: -18, bonds: -12 },
  ]
  return (
    <div className="card mb-4 p-4">
      <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">📜 Stocks vs Bonds during crises</div>
      {data.map(d => (
        <div key={d.year} className="mb-3">
          <div className="text-xs font-bold text-text1 mb-1">{d.year} Crisis</div>
          <div className="flex gap-2 items-center">
            <span className="text-[10px] w-12 text-text3">Stocks</span>
            <div className="flex-1 h-5 bg-bg3 rounded relative overflow-hidden">
              <div className="absolute right-0 top-0 h-full rounded flex items-center pl-1 text-white text-[9px] font-bold"
                style={{ width: `${Math.abs(d.stocks)}%`, background: '#E8453A', right: 0 }}>
                {d.stocks}%
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-center mt-1">
            <span className="text-[10px] w-12 text-text3">Bonds</span>
            <div className="flex-1 h-5 bg-bg3 rounded relative overflow-hidden">
              <div className="h-full rounded flex items-center justify-end pr-1 text-white text-[9px] font-bold"
                style={{ width: `${Math.abs(d.bonds)}%`, background: d.bonds >= 0 ? '#3A9E5C' : '#E8A820' }}>
                {d.bonds > 0 ? '+' : ''}{d.bonds}%
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Quest 3: Accumulating vs Distributing
function AccDistChart() {
  const [show, setShow] = useState(false)
  useEffect(() => { setTimeout(() => setShow(true), 300) }, [])
  const acc = (y: number) => Math.round(10000 * Math.pow(1.07, y))
  const dist = (y: number) => Math.round(10000 * Math.pow(1.05, y)) // lower due to tax drag
  return (
    <div className="card mb-4 p-4">
      <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">🔄 Accumulating vs Distributing — €10,000 over 30yr</div>
      <div className="flex flex-col gap-2">
        {[0, 10, 20, 30].map(y => (
          <div key={y} className="flex items-center gap-2">
            <span className="text-xs text-text3 w-10">Year {y}</span>
            <div className="flex-1">
              <div className="flex gap-1 mb-0.5">
                <div className="h-4 rounded text-[9px] text-white font-bold flex items-center justify-end pr-1 transition-all duration-700"
                  style={{ width: show ? `${(acc(y) / acc(30)) * 100}%` : '0%', background: '#3A9E5C', minWidth: 40 }}>
                  €{(acc(y)/1000).toFixed(0)}k
                </div>
              </div>
              <div className="flex gap-1">
                <div className="h-4 rounded text-[9px] text-white font-bold flex items-center justify-end pr-1 transition-all duration-700"
                  style={{ width: show ? `${(dist(y) / acc(30)) * 100}%` : '0%', background: '#A89E90', minWidth: 40 }}>
                  €{(dist(y)/1000).toFixed(0)}k
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-3 mt-2 text-xs justify-center">
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-green-600"/>Accumulating</div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-gray-400"/>Distributing</div>
      </div>
    </div>
  )
}

// ─── CHAPTER II VISUALS ───────────────────────────────────────────────────────

// Quest 101: Welcome to Compound Sea — Chapter overview
function ChapterTwoIntro() {
  const topics = [
    { icon: '💵', label: 'Dividends', color: '#3A9E5C' },
    { icon: '🔥', label: 'FIRE', color: '#E8453A' },
    { icon: '🔬', label: 'Factor Investing', color: '#3B7AD8' },
    { icon: '🏢', label: 'REITs', color: '#9B59B6' },
    { icon: '🧠', label: 'Behavioral Finance', color: '#E8A820' },
    { icon: '🌏', label: 'Emerging Markets', color: '#F39C12' },
    { icon: '🎨', label: 'Asset Allocation', color: '#E8453A' },
    { icon: '🌤️', label: 'All Weather', color: '#3B7AD8' },
  ]
  return (
    <div className="card mb-4 p-4">
      <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">🌊 Chapter II — What you will master</div>
      <div className="grid grid-cols-4 gap-2">
        {topics.map(t => (
          <div key={t.label} className="rounded-xl p-2 text-center" style={{ background: t.color + '15', border: `1.5px solid ${t.color}30` }}>
            <div className="text-xl mb-1">{t.icon}</div>
            <div className="text-[9px] font-bold" style={{ color: t.color }}>{t.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Quest 102: Dividend Investing
function DividendChart() {
  const [show, setShow] = useState(false)
  useEffect(() => { setTimeout(() => setShow(true), 300) }, [])
  const portfolios = [
    { size: 50000, yield: 3, income: 1500 },
    { size: 100000, yield: 3, income: 3000 },
    { size: 200000, yield: 3, income: 6000 },
    { size: 500000, yield: 3, income: 15000 },
  ]
  return (
    <div className="card mb-4 p-4">
      <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">💵 Annual Dividend Income at 3% Yield</div>
      {portfolios.map(p => (
        <div key={p.size} className="mb-2">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-text2">€{(p.size/1000)}k portfolio</span>
            <span className="font-bold text-green-700">€{p.income.toLocaleString()}/year passive</span>
          </div>
          <div className="h-5 bg-bg3 rounded-lg overflow-hidden">
            <div className="h-full rounded-lg flex items-center justify-end pr-2 text-white text-[10px] font-bold transition-all duration-700"
              style={{ width: show ? `${(p.income / 15000) * 100}%` : '0%', background: 'linear-gradient(90deg, #2d7a45, #3A9E5C)' }}>
              €{(p.income/12).toFixed(0)}/mo
            </div>
          </div>
        </div>
      ))}
      <div className="mt-2 p-2 bg-green-bg border border-green-bd rounded-lg text-xs text-center text-green-700 font-bold">
        Dividends = income without selling a single share 🎯
      </div>
    </div>
  )
}

// Quest 103: FIRE — 4% rule calculator
function FIREChart() {
  const [expenses, setExpenses] = useState(24000)
  const fireNumber = expenses * 25
  const monthly = expenses / 12
  return (
    <div className="card mb-4 p-4">
      <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">🔥 Your FIRE Number Calculator</div>
      <div className="mb-3">
        <div className="flex justify-between text-xs mb-2">
          <span className="text-text2">Annual expenses</span>
          <span className="font-bold text-text1">€{expenses.toLocaleString()}</span>
        </div>
        <input type="range" min="10000" max="100000" step="1000" value={expenses}
          onChange={e => setExpenses(parseInt(e.target.value))}
          className="w-full accent-gold" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="p-3 bg-gold-bg border border-gold-bd rounded-xl text-center">
          <div className="text-xs text-gold-dk mb-1">FIRE Number (×25)</div>
          <div className="font-serif font-black text-xl text-gold-dk">€{(fireNumber/1000).toFixed(0)}k</div>
        </div>
        <div className="p-3 bg-green-bg border border-green-bd rounded-xl text-center">
          <div className="text-xs text-green-700 mb-1">Monthly income needed</div>
          <div className="font-serif font-black text-xl text-green-700">€{monthly.toFixed(0)}</div>
        </div>
      </div>
      <div className="mt-2 text-xs text-text3 text-center">Based on the 4% rule — withdraw 4% annually, portfolio lasts 30+ years</div>
    </div>
  )
}

// Quest 104: Factor Investing
function FactorChart() {
  const [show, setShow] = useState(false)
  useEffect(() => { setTimeout(() => setShow(true), 300) }, [])
  const factors = [
    { name: 'Market (baseline)', premium: 0, color: '#A89E90' },
    { name: 'Value', premium: 3.5, color: '#E8A820' },
    { name: 'Size (Small Cap)', premium: 2.8, color: '#3B7AD8' },
    { name: 'Momentum', premium: 4.2, color: '#E8453A' },
    { name: 'Quality', premium: 3.1, color: '#3A9E5C' },
    { name: 'Low Volatility', premium: 2.1, color: '#9B59B6' },
  ]
  return (
    <div className="card mb-4 p-4">
      <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">🔬 Historical Factor Premiums (vs market, annualized)</div>
      {factors.map(f => (
        <div key={f.name} className="mb-2">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-text2">{f.name}</span>
            <span className="font-bold" style={{ color: f.color }}>{f.premium > 0 ? `+${f.premium}%` : 'Baseline'}</span>
          </div>
          <div className="h-4 bg-bg3 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-700"
              style={{ width: show ? `${20 + (f.premium / 4.5) * 80}%` : '20%', background: f.color }} />
          </div>
        </div>
      ))}
      <p className="text-[10px] text-text3 mt-2">Source: Fama-French research. Past premiums ≠ guaranteed future returns.</p>
    </div>
  )
}

// Quest 105: REITs
function REITChart() {
  const types = [
    { name: 'Residential', icon: '🏠', yield: 3.2, example: 'Apartments, student housing' },
    { name: 'Commercial', icon: '🏢', yield: 4.1, example: 'Offices, coworking' },
    { name: 'Industrial', icon: '🏭', yield: 3.8, example: 'Warehouses, logistics' },
    { name: 'Healthcare', icon: '🏥', yield: 4.5, example: 'Hospitals, clinics' },
    { name: 'Data Centers', icon: '💻', yield: 2.9, example: 'Cloud infrastructure' },
  ]
  return (
    <div className="card mb-4 p-4">
      <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">🏢 REIT Types & Typical Dividend Yields</div>
      <div className="flex flex-col gap-2">
        {types.map(t => (
          <div key={t.name} className="flex items-center gap-2 p-2 rounded-xl bg-bg3 border border-border">
            <span className="text-xl">{t.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-text1">{t.name}</div>
              <div className="text-[10px] text-text3 truncate">{t.example}</div>
            </div>
            <div className="text-sm font-black text-green-700">{t.yield}%</div>
          </div>
        ))}
      </div>
      <div className="mt-2 text-xs text-text3 text-center">REITs must pay 90%+ of taxable income as dividends by law</div>
    </div>
  )
}

// Quest 106: Behavioral Finance — biases
function BiasChart() {
  const biases = [
    { name: 'Loss Aversion', emoji: '😰', impact: 'Sell at lows, miss recovery', severity: 90 },
    { name: 'Recency Bias', emoji: '📰', impact: 'Chase recent winners', severity: 75 },
    { name: 'Overconfidence', emoji: '🦁', impact: 'Trade too much, pay fees', severity: 65 },
    { name: 'Confirmation Bias', emoji: '🔍', impact: 'Ignore warning signs', severity: 70 },
  ]
  return (
    <div className="card mb-4 p-4">
      <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">🧠 Cognitive Biases that cost investors money</div>
      {biases.map(b => (
        <div key={b.name} className="mb-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-base">{b.emoji}</span>
            <div>
              <div className="text-xs font-bold text-text1">{b.name}</div>
              <div className="text-[10px] text-text3">{b.impact}</div>
            </div>
            <span className="ml-auto text-xs font-bold text-red-600">{b.severity}% harmful</span>
          </div>
          <div className="h-2 bg-bg3 rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-red-300 to-red-600"
              style={{ width: `${b.severity}%` }} />
          </div>
        </div>
      ))}
      <div className="p-2 bg-gold-bg border border-gold-bd rounded-lg text-xs text-gold-dk font-bold text-center mt-2">
        💡 Solution: Automate everything. Write rules before the crash happens.
      </div>
    </div>
  )
}

// Quest 107: Emerging Markets
function EmergingMarketsChart() {
  const countries = [
    { name: 'China', pct: 30, color: '#E8453A' },
    { name: 'India', pct: 20, color: '#F39C12' },
    { name: 'Taiwan', pct: 17, color: '#3B7AD8' },
    { name: 'S. Korea', pct: 13, color: '#3A9E5C' },
    { name: 'Brazil', pct: 5, color: '#E8A820' },
    { name: 'Other', pct: 15, color: '#A89E90' },
  ]
  let cum = 0
  const r = 55, cx = 70, cy = 70
  const slices = countries.map(c => {
    const start = (cum / 100) * 2 * Math.PI - Math.PI / 2
    cum += c.pct
    const end = (cum / 100) * 2 * Math.PI - Math.PI / 2
    const x1 = cx + r * Math.cos(start), y1 = cy + r * Math.sin(start)
    const x2 = cx + r * Math.cos(end), y2 = cy + r * Math.sin(end)
    return { ...c, d: `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${c.pct > 50 ? 1 : 0},1 ${x2},${y2} Z` }
  })
  return (
    <div className="card mb-4 p-4">
      <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">🌏 MSCI Emerging Markets — Country Weights</div>
      <div className="flex items-center gap-3">
        <svg width="140" height="140" viewBox="0 0 140 140">
          {slices.map(s => <path key={s.name} d={s.d} fill={s.color} stroke="white" strokeWidth="2"/>)}
          <circle cx={cx} cy={cy} r="28" fill="white"/>
          <text x={cx} y={cy-4} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1C1A16">24</text>
          <text x={cx} y={cy+8} textAnchor="middle" fontSize="7" fill="#6B6355">countries</text>
        </svg>
        <div className="flex flex-col gap-1.5">
          {countries.map(c => (
            <div key={c.name} className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: c.color }}/>
              <span className="text-text2">{c.name}</span>
              <span className="font-bold text-text1 ml-auto">{c.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Quest 108: Asset Allocation
function AssetAllocationChart() {
  const [age, setAge] = useState(30)
  const stocks = Math.max(110 - age, 20)
  const bonds = 100 - stocks
  return (
    <div className="card mb-4 p-4">
      <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">🎨 Age-based Asset Allocation</div>
      <div className="mb-3">
        <div className="flex justify-between text-xs mb-2">
          <span className="text-text2">Your age</span>
          <span className="font-bold text-text1">{age} years old</span>
        </div>
        <input type="range" min="20" max="75" step="1" value={age}
          onChange={e => setAge(parseInt(e.target.value))}
          className="w-full accent-gold" />
      </div>
      <div className="h-10 rounded-xl overflow-hidden flex mb-2">
        <div className="h-full flex items-center justify-center text-white text-xs font-bold transition-all duration-500"
          style={{ width: `${stocks}%`, background: 'linear-gradient(90deg, #2d7a45, #3A9E5C)' }}>
          {stocks}% Stocks
        </div>
        <div className="h-full flex items-center justify-center text-white text-xs font-bold transition-all duration-500"
          style={{ width: `${bonds}%`, background: 'linear-gradient(90deg, #7B5DB8, #9B59B6)' }}>
          {bonds}% Bonds
        </div>
      </div>
      <div className="text-xs text-text3 text-center">Rule: 110 − age = % in stocks. Adjust for your risk tolerance.</div>
    </div>
  )
}

// Quest 109: All Weather Portfolio
function AllWeatherChart() {
  const allocs = [
    { name: 'Stocks', pct: 30, color: '#3A9E5C', season: 'Rising growth' },
    { name: 'Long Bonds', pct: 40, color: '#9B59B6', season: 'Falling growth' },
    { name: 'Mid Bonds', pct: 15, color: '#3B7AD8', season: 'Stability' },
    { name: 'Gold', pct: 7.5, color: '#E8A820', season: 'Inflation hedge' },
    { name: 'Commodities', pct: 7.5, color: '#F39C12', season: 'Inflation hedge' },
  ]
  let cum = 0
  const r = 55, cx = 70, cy = 70
  const slices = allocs.map(a => {
    const start = (cum / 100) * 2 * Math.PI - Math.PI / 2
    cum += a.pct
    const end = (cum / 100) * 2 * Math.PI - Math.PI / 2
    const x1 = cx + r * Math.cos(start), y1 = cy + r * Math.sin(start)
    const x2 = cx + r * Math.cos(end), y2 = cy + r * Math.sin(end)
    return { ...a, d: `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${a.pct > 50 ? 1 : 0},1 ${x2},${y2} Z` }
  })
  return (
    <div className="card mb-4 p-4">
      <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">🌤️ Ray Dalio's All Weather Portfolio</div>
      <div className="flex items-center gap-3">
        <svg width="140" height="140" viewBox="0 0 140 140">
          {slices.map(s => <path key={s.name} d={s.d} fill={s.color} stroke="white" strokeWidth="2"/>)}
          <circle cx={cx} cy={cy} r="28" fill="white"/>
          <text x={cx} y={cy-4} textAnchor="middle" fontSize="8" fontWeight="bold" fill="#1C1A16">All</text>
          <text x={cx} y={cy+8} textAnchor="middle" fontSize="8" fontWeight="bold" fill="#1C1A16">Weather</text>
        </svg>
        <div className="flex flex-col gap-1.5">
          {allocs.map(a => (
            <div key={a.name} className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: a.color }}/>
              <div>
                <div className="font-bold text-text1">{a.name} {a.pct}%</div>
                <div className="text-[9px] text-text3">{a.season}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-lg text-[10px] text-blue-700 font-semibold text-center">
        Historical return: ~7-8%/yr · Max drawdown: only −11% (vs −57% for pure stocks in 2008)
      </div>
    </div>
  )
}

// Quest 110: Psychology of Money
function PsychologyChart() {
  const principles = [
    { title: 'Reasonable > Rational', desc: 'A plan you follow beats a perfect plan you abandon', icon: '🎯' },
    { title: 'Define "Enough"', desc: 'Knowing when to stop prevents endless risk-taking', icon: '⚖️' },
    { title: 'Time is your edge', desc: 'Long horizon = your biggest competitive advantage', icon: '⏰' },
    { title: 'Behavior > Intelligence', desc: 'Staying invested beats picking the right stocks', icon: '🧠' },
  ]
  return (
    <div className="card mb-4 p-4">
      <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">💭 Morgan Housel's Key Principles</div>
      <div className="flex flex-col gap-2">
        {principles.map(p => (
          <div key={p.title} className="flex items-start gap-2 p-2 rounded-xl bg-bg3 border border-border">
            <span className="text-xl flex-shrink-0">{p.icon}</span>
            <div>
              <div className="text-xs font-bold text-text1">{p.title}</div>
              <div className="text-[10px] text-text3">{p.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Quest 112: Multiple Income Streams
function IncomeStreamsChart() {
  const streams = [
    { phase: 'Phase 1 (Age 20-30)', active: 3000, passive: 0, label: 'Salary only → invest aggressively' },
    { phase: 'Phase 2 (Age 30-40)', active: 4000, passive: 500, label: 'Growing dividend income' },
    { phase: 'Phase 3 (Age 40-50)', active: 4000, passive: 2000, label: 'Portfolio covers basics' },
    { phase: 'Phase 4 (Age 50+)', active: 2000, passive: 5000, label: 'Work optional' },
  ]
  return (
    <div className="card mb-4 p-4">
      <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">🌊 Building Multiple Income Streams Over Time</div>
      {streams.map(s => (
        <div key={s.phase} className="mb-3">
          <div className="text-[10px] font-bold text-text1 mb-0.5">{s.phase}</div>
          <div className="text-[9px] text-text3 mb-1">{s.label}</div>
          <div className="flex gap-1 h-5">
            <div className="rounded-l-lg flex items-center justify-end pr-1 text-white text-[9px] font-bold"
              style={{ width: `${(s.active / 7000) * 100}%`, background: '#3B7AD8', minWidth: s.active > 0 ? 30 : 0 }}>
              €{(s.active/1000).toFixed(0)}k
            </div>
            {s.passive > 0 && <div className="rounded-r-lg flex items-center justify-end pr-1 text-white text-[9px] font-bold"
              style={{ width: `${(s.passive / 7000) * 100}%`, background: '#3A9E5C' }}>
              €{(s.passive/1000).toFixed(0)}k
            </div>}
          </div>
        </div>
      ))}
      <div className="flex gap-3 mt-1 text-[10px] justify-center">
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-blue-500"/>Active (salary)</div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-green-600"/>Passive (investments)</div>
      </div>
    </div>
  )
}

// Quest 113: Rebalancing
function RebalancingChart() {
  const [show, setShow] = useState(false)
  useEffect(() => { setTimeout(() => setShow(true), 400) }, [])
  const states = [
    { label: 'Target', stocks: 80, bonds: 20 },
    { label: 'After Bull Run', stocks: 90, bonds: 10 },
    { label: 'After Rebalance', stocks: 80, bonds: 20 },
  ]
  return (
    <div className="card mb-4 p-4">
      <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">⚖️ Why Rebalancing Matters</div>
      {states.map((s, i) => (
        <div key={s.label} className="mb-3">
          <div className="text-xs font-bold text-text1 mb-1">{s.label}</div>
          <div className="h-8 rounded-xl overflow-hidden flex">
            <div className="h-full flex items-center justify-center text-white text-xs font-bold transition-all duration-700"
              style={{ width: show ? `${s.stocks}%` : '50%', background: '#3A9E5C', transitionDelay: `${i * 150}ms` }}>
              {s.stocks}% Stocks
            </div>
            <div className="h-full flex items-center justify-center text-white text-xs font-bold transition-all duration-700"
              style={{ width: show ? `${s.bonds}%` : '50%', background: '#9B59B6', transitionDelay: `${i * 150}ms` }}>
              {s.bonds}% Bonds
            </div>
          </div>
          {s.label === 'After Bull Run' && (
            <div className="text-[10px] text-red-500 mt-0.5 font-semibold">⚠️ Portfolio is now riskier than intended!</div>
          )}
          {s.label === 'After Rebalance' && (
            <div className="text-[10px] text-green-600 mt-0.5 font-semibold">✓ Risk level restored to target</div>
          )}
        </div>
      ))}
    </div>
  )
}

// Quest 115: Gold
function GoldChart() {
  const events = [
    { year: '2008', gold: +5, stocks: -57 },
    { year: '2011', gold: +10, stocks: -18 },
    { year: '2020', gold: +25, stocks: -34 },
    { year: '2022', gold: -1, stocks: -18 },
  ]
  return (
    <div className="card mb-4 p-4">
      <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">🥇 Gold vs Stocks during major crises</div>
      {events.map(e => (
        <div key={e.year} className="mb-3">
          <div className="text-xs font-bold text-text1 mb-1">{e.year}</div>
          <div className="flex gap-2 items-center mb-1">
            <span className="text-[10px] w-10 text-text3">Stocks</span>
            <div className="flex-1 h-4 bg-bg3 rounded overflow-hidden">
              <div className="h-full rounded flex items-center justify-end pr-1 text-white text-[9px] font-bold"
                style={{ width: `${Math.abs(e.stocks)}%`, background: '#E8453A' }}>
                {e.stocks}%
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-[10px] w-10 text-text3">Gold</span>
            <div className="flex-1 h-4 bg-bg3 rounded overflow-hidden">
              <div className="h-full rounded flex items-center justify-end pr-1 text-white text-[9px] font-bold"
                style={{ width: `${Math.abs(e.gold)}%`, background: e.gold >= 0 ? '#E8A820' : '#A89E90', minWidth: 20 }}>
                {e.gold > 0 ? '+' : ''}{e.gold}%
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="text-[10px] text-text3 text-center mt-1">Gold rises when stocks fall — portfolio insurance 🛡️</div>
    </div>
  )
}

// Quest 117: Sequence of Returns Risk
function SequenceRiskChart() {
  const goodSequence = [100000, 110000, 121000, 105000, 90000, 99000]
  const badSequence = [100000, 65000, 52000, 57200, 62920, 69212]
  const withdrawals = [4000, 4000, 4000, 4000, 4000]
  const maxVal = 130000
  return (
    <div className="card mb-4 p-4">
      <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">🎲 Same Returns, Different Order — Same €100k start, €4k/yr withdrawal</div>
      <div className="flex gap-4 mb-3">
        <div className="flex-1">
          <div className="text-xs font-bold text-green-700 mb-2">Good start (gains first)</div>
          {goodSequence.map((v, i) => (
            <div key={i} className="flex items-center gap-1 mb-1">
              <span className="text-[9px] text-text3 w-8">Yr {i}</span>
              <div className="flex-1 h-3 bg-bg3 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-green-500" style={{ width: `${(v / maxVal) * 100}%` }} />
              </div>
              <span className="text-[9px] font-bold text-green-700 w-12 text-right">€{(v/1000).toFixed(0)}k</span>
            </div>
          ))}
        </div>
        <div className="flex-1">
          <div className="text-xs font-bold text-red-600 mb-2">Bad start (losses first)</div>
          {badSequence.map((v, i) => (
            <div key={i} className="flex items-center gap-1 mb-1">
              <span className="text-[9px] text-text3 w-8">Yr {i}</span>
              <div className="flex-1 h-3 bg-bg3 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-red-400" style={{ width: `${(v / maxVal) * 100}%` }} />
              </div>
              <span className="text-[9px] font-bold text-red-600 w-12 text-right">€{(v/1000).toFixed(0)}k</span>
            </div>
          ))}
        </div>
      </div>
      <div className="p-2 bg-gold-bg border border-gold-bd rounded-lg text-[10px] text-gold-dk font-bold text-center">
        💡 Solution: Keep 1-2 years of expenses in cash to avoid selling during downturns
      </div>
    </div>
  )
}

// Quest 120: Building a Million Euro Portfolio
function MillionChart() {
  const [monthly, setMonthly] = useState(300)
  const years = 40
  const result = monthly * 12 * ((Math.pow(1.07, years) - 1) / 0.07)
  return (
    <div className="card mb-4 p-4">
      <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">💎 Your Path to €1,000,000</div>
      <div className="mb-3">
        <div className="flex justify-between text-xs mb-2">
          <span className="text-text2">Monthly investment</span>
          <span className="font-bold text-text1">€{monthly}/month</span>
        </div>
        <input type="range" min="50" max="1000" step="50" value={monthly}
          onChange={e => setMonthly(parseInt(e.target.value))}
          className="w-full accent-gold" />
      </div>
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="p-2 bg-bg3 border border-border rounded-xl text-center">
          <div className="text-[10px] text-text3">Invested</div>
          <div className="font-bold text-sm text-text1">€{(monthly * 12 * years / 1000).toFixed(0)}k</div>
        </div>
        <div className="p-2 bg-gold-bg border border-gold-bd rounded-xl text-center">
          <div className="text-[10px] text-gold-dk">Final Value</div>
          <div className="font-serif font-black text-sm text-gold-dk">€{(result/1000).toFixed(0)}k</div>
        </div>
        <div className="p-2 bg-green-bg border border-green-bd rounded-xl text-center">
          <div className="text-[10px] text-green-700">Gain</div>
          <div className="font-bold text-sm text-green-700">×{(result / (monthly * 12 * years)).toFixed(1)}</div>
        </div>
      </div>
      <div className="h-3 bg-bg3 rounded-full overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-gold to-yellow-300 transition-all duration-300"
          style={{ width: `${Math.min((result / 1500000) * 100, 100)}%` }} />
      </div>
      <div className="text-[10px] text-text3 text-center mt-1">At 7% average annual return over 40 years</div>
    </div>
  )
}

// Quest 106: Behavioral Finance — DALBAR gap
function BehavioralFinanceChart() {
  const [show, setShow] = useState(false)
  useEffect(() => { setTimeout(() => setShow(true), 300) }, [])
  return (
    <div className="card mb-4 p-4">
      <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">🧠 DALBAR Study — 30 Year Average Annual Returns</div>
      <div className="flex flex-col gap-3">
        {[
          { label: 'S&P 500 Index', ret: 10.6, color: '#3A9E5C' },
          { label: 'Average Fund', ret: 8.2, color: '#3B7AD8' },
          { label: 'Average Investor', ret: 3.9, color: '#E8453A' },
        ].map(r => (
          <div key={r.label}>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-bold text-text1">{r.label}</span>
              <span className="font-bold" style={{ color: r.color }}>{r.ret}% / year</span>
            </div>
            <div className="h-6 bg-bg3 rounded-lg overflow-hidden">
              <div className="h-full rounded-lg flex items-center justify-end pr-2 text-white text-xs font-bold transition-all duration-1000"
                style={{ width: show ? `${(r.ret / 10.6) * 100}%` : '0%', background: r.color }}>
                {r.ret}%
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-lg text-[10px] text-red-700 font-semibold text-center">
        ⚠️ Investors earn 6.7% LESS than the index — purely due to emotional decisions
      </div>
    </div>
  )
}

// Quest 116: Leverage — volatility decay
function LeverageDecayChart() {
  const days = [
    { day: 'Start', normal: 100, lev2x: 100 },
    { day: 'Day 1\n−10%', normal: 90, lev2x: 80 },
    { day: 'Day 2\n+10%', normal: 99, lev2x: 96 },
    { day: 'Day 3\n−10%', normal: 89.1, lev2x: 76.8 },
    { day: 'Day 4\n+10%', normal: 98, lev2x: 92.2 },
    { day: 'Day 5\n−10%', normal: 88.2, lev2x: 73.7 },
  ]
  return (
    <div className="card mb-4 p-4">
      <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">⚡ Volatility Decay — Why 2x ETFs lose value over time</div>
      <div className="flex items-end gap-1 h-24 mb-2">
        {days.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
            <div className="w-full flex gap-0.5 items-end" style={{ height: '80px' }}>
              <div className="flex-1 rounded-t" style={{ height: `${(d.normal / 100) * 80}px`, background: '#3A9E5C' }} />
              <div className="flex-1 rounded-t" style={{ height: `${(d.lev2x / 100) * 80}px`, background: '#E8453A' }} />
            </div>
            <div className="text-[8px] text-text3 text-center leading-tight whitespace-pre-line">{d.day}</div>
          </div>
        ))}
      </div>
      <div className="flex gap-3 text-xs justify-center mb-2">
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-green-600"/>Normal ETF</div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-red-500"/>2x Leveraged</div>
      </div>
      <div className="p-2 bg-red-50 border border-red-200 rounded-lg text-[10px] text-red-700 font-bold text-center">
        ⚠️ Normal ETF: €88.2 · 2x Leveraged: €73.7 — despite identical daily moves!
      </div>
    </div>
  )
}

// Quest 111: Home Bias (renamed from BiasChart)
function HomeBiasChart() {
  const [show, setShow] = useState(false)
  useEffect(() => { setTimeout(() => setShow(true), 300) }, [])
  const countries = [
    { name: 'Germany — actual global share', actual: 2.5, typical: 60, color: '#E8453A' },
    { name: 'USA — actual global share', actual: 63, typical: 65, color: '#3B7AD8' },
    { name: 'Japan — actual global share', actual: 6, typical: 40, color: '#E8A820' },
  ]
  return (
    <div className="card mb-4 p-4">
      <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">🗺️ Home Bias — What investors hold vs actual market size</div>
      {countries.map(c => (
        <div key={c.name} className="mb-3">
          <div className="text-xs font-bold text-text1 mb-1">{c.name}</div>
          <div className="flex gap-1 items-center mb-0.5">
            <span className="text-[9px] w-16 text-text3">Actual</span>
            <div className="flex-1 h-3 bg-bg3 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-green-500 transition-all duration-700"
                style={{ width: show ? `${c.actual}%` : '0%' }} />
            </div>
            <span className="text-[9px] font-bold text-green-700 w-8">{c.actual}%</span>
          </div>
          <div className="flex gap-1 items-center">
            <span className="text-[9px] w-16 text-text3">Avg held</span>
            <div className="flex-1 h-3 bg-bg3 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700"
                style={{ width: show ? `${c.typical}%` : '0%', background: c.color, transitionDelay: '200ms' }} />
            </div>
            <span className="text-[9px] font-bold w-8" style={{ color: c.color }}>{c.typical}%</span>
          </div>
        </div>
      ))}
      <div className="mt-2 p-2 bg-gold-bg border border-gold-bd rounded-lg text-[10px] text-gold-dk font-bold text-center">
        💡 Germany = only 2.5% of global markets. A German-only portfolio misses 97.5%!
      </div>
    </div>
  )
}

// Map quest ID to visual component
function QuestVisual({ questId }: { questId: number }) {
  switch (questId) {
    // Chapter I
    case 3: return <AccDistChart />
    case 4: return <TERChart />
    case 5: return <CompoundChart />
    case 7: return <DCAChart />
    case 8: return <MSCIChart />
    case 9: return <DiversificationChart />
    case 10: return <RiskReturnChart />
    case 12: return <InflationChart />
    case 14: return <ActiveVsPassiveChart />
    case 16: return <CrashTimeline />
    case 17: return <SavingsRateChart />
    case 22: return <BondsChart />
    // Chapter II
    case 101: return <ChapterTwoIntro />
    case 102: return <DividendChart />
    case 103: return <FIREChart />
    case 104: return <FactorChart />
    case 105: return <REITChart />
    case 106: return <BehavioralFinanceChart />
    case 107: return <EmergingMarketsChart />
    case 108: return <AssetAllocationChart />
    case 109: return <AllWeatherChart />
    case 110: return <PsychologyChart />
    case 111: return <HomeBiasChart />
    case 112: return <IncomeStreamsChart />
    case 116: return <LeverageDecayChart />
    case 117: return <SequenceRiskChart />
    case 120: return <MillionChart />
    default: return null
  }
}

// ─── MAIN QUEST PAGE ──────────────────────────────────────────────────────────

export default function QuestPage() {
  const router = useRouter()
  const params = useParams()
  const questId = parseInt(params.id as string)
  const quest = QUESTS.find(q => q.id === questId)

  const [profile, setProfile] = useState<Profile | null>(null)
  const [answered, setAnswered] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [feedback, setFeedback] = useState('')
  const [completing, setCompleting] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/login'); return }
      const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single()
      setProfile(data)
      if (data?.completed_quests?.includes(questId)) { setAnswered(true); setCorrect(true); setDone(true) }
    }
    load()
  }, [router, questId])

  if (!quest) return <div className="min-h-screen bg-bg flex items-center justify-center"><p>Quest not found.</p></div>
  if (!profile) return <div className="min-h-screen bg-bg flex items-center justify-center"><div className="text-4xl animate-pulse">⚔️</div></div>

  function handleAnswer(idx: number, isCorrect: boolean) {
    if (answered) return
    setAnswered(true)
    setCorrect(isCorrect)
    setSelectedOption(idx)
    setFeedback(isCorrect ? quest!.lesson.quiz.correctFeedback : quest!.lesson.quiz.wrongFeedback)
  }

  async function completeQuest() {
    if (completing || !profile || done) return
    setCompleting(true)
    const already = profile.completed_quests?.includes(questId)
    if (!already) {
      let newXp = profile.xp + quest!.xp
      let newLevel = profile.level
      let newGold = profile.gold + quest!.gold
      const xpNeeded = profile.level * XP_PER_LEVEL
      if (newXp >= xpNeeded) { newLevel++; newXp = newXp - xpNeeded }
      const newCompleted = [...(profile.completed_quests || []), questId]
      await supabase.from('profiles').update({
        xp: newXp, level: newLevel, gold: newGold, completed_quests: newCompleted
      }).eq('id', profile.id)
      setProfile({ ...profile, xp: newXp, level: newLevel, gold: newGold, completed_quests: newCompleted })
    }
    setDone(true)
    setCompleting(false)
  }

  const chapterTotal = quest.chapter === 1 ? 25 : 25

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border px-4 py-3 flex items-center gap-3">
        <button onClick={() => router.push('/dashboard')} className="text-text2 hover:text-text1 transition-colors flex items-center gap-1 text-sm font-semibold">
          ← Back
        </button>
        <div className="flex-1 text-center font-bold text-sm text-text1 truncate">{quest.title}</div>
        <div className="text-sm font-bold text-gold-dk">+{quest.xp} XP</div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Quest intro */}
        <div className="bg-gradient-to-br from-green-900 to-green-700 rounded-2xl p-5 mb-5 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 1px, transparent 14px)' }} />
          <div className="relative">
            <div className="text-xs font-bold text-green-300 uppercase tracking-widest mb-2">
              {quest.icon} Quest {quest.id} · Chapter {quest.chapter}
            </div>
            <h1 className="font-serif font-black text-2xl text-yellow-300 mb-2">{quest.title}</h1>
            <p className="text-green-200 text-sm leading-relaxed">{quest.lesson.intro}</p>
            <div className="flex gap-2 mt-3">
              {quest.tags.map(t => (
                <span key={t} className="text-[10px] font-bold px-2 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Visual graphic for this quest */}
        <QuestVisual questId={questId} />

        {/* Lesson blocks */}
        {quest.lesson.blocks.map((block, i) => (
          <div key={i} className="card mb-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-gold-bg border border-gold-bd flex items-center justify-center text-xs font-black text-gold-dk">{i + 1}</div>
              <div className="text-xs font-bold text-gold-dk uppercase tracking-widest">{block.label}</div>
            </div>
            <h2 className="font-serif font-black text-lg text-text1 mb-3">{block.heading}</h2>
            <p className="text-text2 text-sm leading-relaxed mb-4">{block.body}</p>

            {/* Highlight box */}
            <div className="bg-gold-bg border-l-4 border-gold rounded-r-xl px-4 py-3 mb-3">
              <p className="text-gold-dk text-sm font-semibold leading-relaxed">💡 {block.highlight}</p>
            </div>

            {/* Example box */}
            {block.example && (
              <div className="bg-bg3 border border-border rounded-xl px-4 py-3">
                <p className="text-text2 text-xs leading-relaxed">
                  <span className="font-bold text-text1">Example: </span>
                  {block.example.replace(/^Example:\s*/i, '')}
                </p>
              </div>
            )}
          </div>
        ))}

        {/* Quiz */}
        <div className="card mb-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-gold-bg border border-gold-bd flex items-center justify-center text-base">🧠</div>
            <div>
              <div className="text-xs font-bold text-text3 uppercase tracking-widest">Knowledge Check</div>
              <div className="text-xs text-text2">Answer to complete the quest</div>
            </div>
          </div>
          <h3 className="font-bold text-text1 mb-4 leading-snug">{quest.lesson.quiz.question}</h3>
          <div className="flex flex-col gap-2.5 mb-4">
            {quest.lesson.quiz.options.map((opt, i) => {
              let style = 'border-border bg-white hover:border-gold-bd hover:bg-gold-bg'
              if (answered) {
                if (opt.correct) style = 'border-green-bd bg-green-bg'
                else if (selectedOption === i && !opt.correct) style = 'border-red-300 bg-red-50'
                else style = 'border-border bg-bg3 opacity-60'
              }
              return (
                <div key={i} onClick={() => handleAnswer(i, opt.correct)}
                  className={`border-2 rounded-xl px-4 py-3 flex items-center gap-3 transition-all ${answered ? 'cursor-default' : 'cursor-pointer'} ${style}`}>
                  <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0 ${answered && opt.correct ? 'border-green bg-green text-white' : answered && selectedOption === i && !opt.correct ? 'border-red-400 bg-red-400 text-white' : 'border-border text-text3'}`}>
                    {answered && opt.correct ? '✓' : answered && selectedOption === i && !opt.correct ? '✗' : String.fromCharCode(65 + i)}
                  </div>
                  <span className="text-sm font-medium text-text1">{opt.text}</span>
                </div>
              )
            })}
          </div>
          {feedback && (
            <div className={`rounded-xl px-4 py-3 text-sm font-medium ${correct ? 'bg-green-bg border border-green-bd text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
              {correct ? '✓ ' : '✗ '}{feedback}
            </div>
          )}
        </div>

        {/* Complete / Result */}
        {done ? (() => {
          // Find next quest
          const currentIndex = QUESTS.findIndex(q => q.id === questId)
          const nextQuest = QUESTS[currentIndex + 1]
          const isLastQuest = !nextQuest

          return (
            <div className="card text-center mb-4">
              <div className="text-5xl mb-3">🎉</div>
              <div className="font-serif font-black text-xl text-text1 mb-1">Quest Complete!</div>
              <div className="text-text2 text-sm mb-1">+{quest.xp} XP · +{quest.gold} 🪙 earned</div>

              {/* Next quest preview */}
              {nextQuest && (
                <div className="mt-3 mb-1 p-3 bg-gold-bg border border-gold-bd rounded-xl text-left">
                  <div className="text-[10px] font-bold text-gold-dk uppercase tracking-widest mb-1">Up Next</div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{nextQuest.icon}</span>
                    <div>
                      <div className="font-bold text-sm text-text1">{nextQuest.title}</div>
                      <div className="text-xs text-text2">{nextQuest.desc}</div>
                    </div>
                    <div className="ml-auto text-xs font-bold text-gold-dk">+{nextQuest.xp} XP</div>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-2 mt-3">
                {/* Next quest — primary button */}
                {nextQuest && (
                  <button onClick={() => router.push(`/quest/${nextQuest.id}`)}
                    className="w-full py-3 rounded-xl font-black text-sm text-[#1A1200] transition-all active:scale-95"
                    style={{ background: 'linear-gradient(135deg, #c4870a, #E8A820)', boxShadow: '0 4px 16px rgba(232,168,32,0.4)' }}>
                    ⚔️ Next Quest →
                  </button>
                )}

                {/* Secondary buttons */}
                <div className="flex gap-2">
                  <button onClick={() => router.push('/map')}
                    className="flex-1 py-2.5 rounded-xl font-bold text-sm bg-bg3 text-text2 border border-border hover:border-gold-bd transition-all">
                    🗺️ Map
                  </button>
                  <button onClick={() => router.push('/dashboard')}
                    className="flex-1 py-2.5 rounded-xl font-bold text-sm bg-bg3 text-text2 border border-border hover:border-gold-bd transition-all">
                    🏠 Dashboard
                  </button>
                </div>

                {/* Chapter complete message */}
                {isLastQuest && (
                  <div className="p-3 bg-green-bg border border-green-bd rounded-xl text-center">
                    <div className="text-2xl mb-1">🏆</div>
                    <div className="font-bold text-sm text-green-700">Chapter Complete! You've mastered all quests.</div>
                  </div>
                )}
              </div>
            </div>
          )
        })() : (
          <button onClick={completeQuest}
            disabled={!answered || completing}
            className={`w-full py-4 rounded-2xl font-black text-base transition-all ${answered ? 'text-[#1A1200] shadow-lg active:scale-95' : 'bg-bg3 text-text3 cursor-not-allowed'}`}
            style={answered ? { background: 'linear-gradient(135deg, #c4870a, #E8A820)', boxShadow: '0 4px 20px rgba(232,168,32,0.4)' } : {}}>
            {completing ? 'Saving...' : answered ? `⚔️ Complete Quest → +${quest.xp} XP · +${quest.gold} 🪙` : '💬 Answer the question to continue'}
          </button>
        )}

        <p className="text-center text-xs text-text3 mt-4">Not financial advice. Educational purposes only.</p>
      </div>
    </div>
  )
}

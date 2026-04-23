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

// Map quest ID to visual component
function QuestVisual({ questId }: { questId: number }) {
  switch (questId) {
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
        {done ? (
          <div className="card text-center mb-4">
            <div className="text-5xl mb-3">🎉</div>
            <div className="font-serif font-black text-xl text-text1 mb-1">Quest Complete!</div>
            <div className="text-text2 text-sm mb-1">+{quest.xp} XP · +{quest.gold} 🪙 earned</div>
            <div className="flex gap-3 mt-4 justify-center">
              <button onClick={() => router.push('/map')}
                className="flex-1 py-3 rounded-xl font-bold text-sm bg-bg3 text-text2 border border-border hover:border-gold-bd transition-all">
                🗺️ World Map
              </button>
              <button onClick={() => router.push('/dashboard')}
                className="flex-1 py-3 rounded-xl font-bold text-sm text-white transition-all"
                style={{ background: 'linear-gradient(135deg, #c4870a, #E8A820)' }}>
                Dashboard →
              </button>
            </div>
          </div>
        ) : (
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

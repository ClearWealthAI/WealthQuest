'use client'
import { useEffect, useState, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase, Profile } from '@/lib/supabase'
import { QUESTS, LEVEL_NAMES, XP_PER_LEVEL } from '@/lib/quests'

// ─── MISSIONS DATA ────────────────────────────────────────────────────────────

export const MISSIONS = [
  {
    id: 1,
    title: 'The Foundation',
    subtitle: 'Master the basics of investing',
    icon: '🏛️',
    questIds: [1, 2, 3, 4, 5],
    xpBonus: 200,
    goldBonus: 40,
    badge: '🎖️',
    color: '#3A9E5C',
    description: 'Every great investor started here. Learn what ETFs are, how compound interest works, and why the right fund type matters.',
    aldricIntro: "Welcome, young investor! Before we venture into the ETF Highlands, you must master the fundamentals. These first 5 quests will give you the foundation everything else is built on.",
  },
  {
    id: 2,
    title: 'Your First Portfolio',
    subtitle: 'Build and understand your investments',
    icon: '💼',
    questIds: [6, 7, 8, 9, 10],
    xpBonus: 250,
    goldBonus: 50,
    badge: '⚜️',
    color: '#3B7AD8',
    description: 'Time to put knowledge into action. Open a broker, understand DCA, explore the MSCI World and learn about diversification and risk.',
    aldricIntro: "You've learned the theory — now it's time to act. These 5 quests will take you from knowing what ETFs are to actually building a real portfolio strategy.",
  },
  {
    id: 3,
    title: 'Survive the Market',
    subtitle: 'Learn to stay calm when markets crash',
    icon: '⚔️',
    questIds: [11, 12, 13, 14, 15],
    xpBonus: 300,
    goldBonus: 60,
    badge: '🛡️',
    color: '#E8A820',
    description: 'Markets crash. Inflation eats savings. Most investors panic. You won\'t. Learn the 3-fund portfolio, inflation protection and tax basics.',
    aldricIntro: "The market is a battlefield, young one. Most investors are defeated not by the market — but by their own fear. These quests will forge your discipline.",
  },
  {
    id: 4,
    title: 'Master the Details',
    subtitle: 'Refine your strategy like a pro',
    icon: '🔬',
    questIds: [16, 17, 18, 19, 20],
    xpBonus: 350,
    goldBonus: 70,
    badge: '💎',
    color: '#9B59B6',
    description: 'Go deeper. Understand market crashes, savings rates, ESG investing, goal setting and portfolio tracking.',
    aldricIntro: "You have survived the basics. Now we sharpen your edge. The difference between a good investor and a great one is in the details — these 5 quests reveal them.",
  },
  {
    id: 5,
    title: 'ETF Highlands Complete',
    subtitle: 'Become a true ETF Highland Champion',
    icon: '🏆',
    questIds: [21, 22, 23, 24, 25],
    xpBonus: 500,
    goldBonus: 100,
    badge: '👑',
    color: '#E8A820',
    description: 'The final challenge. Avoid the biggest mistakes, master bonds, read ETF factsheets and set up your perfect savings plan.',
    aldricIntro: "This is it, champion. The final 5 quests of the ETF Highlands. Complete these and you will know more about investing than 90% of the population. I am proud of how far you have come.",
  },
]

export function getMissionForQuest(questId: number) {
  return MISSIONS.find(m => m.questIds.includes(questId))
}

export function getMissionProgress(completedQuests: number[], mission: typeof MISSIONS[0]) {
  return mission.questIds.filter(id => completedQuests.includes(id)).length
}

export function isMissionComplete(completedQuests: number[], mission: typeof MISSIONS[0]) {
  return mission.questIds.every(id => completedQuests.includes(id))
}

export function wasMissionJustCompleted(completedQuests: number[], questId: number) {
  const mission = getMissionForQuest(questId)
  if (!mission) return false
  return isMissionComplete(completedQuests, mission)
}

// ─── CONFETTI ─────────────────────────────────────────────────────────────────

function Confetti({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>()
  const particles = useRef<any[]>([])

  useEffect(() => {
    if (!active || !canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')!
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const colors = ['#E8A820', '#3A9E5C', '#3B7AD8', '#E8453A', '#F5BC38', '#9B59B6']
    particles.current = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: -20,
      w: Math.random() * 12 + 4,
      h: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 8,
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 4 + 2,
      opacity: 1,
    }))

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let alive = false
      particles.current.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        p.rotation += p.rotSpeed
        if (p.y > canvas.height * 0.7) p.opacity -= 0.02
        if (p.opacity > 0) { alive = true }
        ctx.save()
        ctx.globalAlpha = Math.max(0, p.opacity)
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        ctx.restore()
      })
      if (alive) animRef.current = requestAnimationFrame(draw)
    }
    draw()
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current) }
  }, [active])

  if (!active) return null
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[90]" />
}

// ─── QUEST COMPLETE POPUP ─────────────────────────────────────────────────────

function QuestCompletePopup({ quest, onContinue, isMissionComplete, mission }: {
  quest: any
  onContinue: () => void
  isMissionComplete: boolean
  mission: typeof MISSIONS[0] | null
}) {
  const [phase, setPhase] = useState<'quest' | 'mission'>('quest')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 50)
  }, [])

  function handleContinue() {
    if (isMissionComplete && phase === 'quest') {
      setPhase('mission')
    } else {
      onContinue()
    }
  }

  if (phase === 'mission' && mission) {
    return (
      <>
        <Confetti active={true} />
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-6"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}>
          <div className={`w-full max-w-sm rounded-3xl p-8 text-center transition-all duration-500 ${visible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}
            style={{ background: `linear-gradient(135deg, ${mission.color}22, ${mission.color}44)`, border: `2px solid ${mission.color}88`, boxShadow: `0 0 60px ${mission.color}44` }}>

            {/* Badge animation */}
            <div className="text-7xl mb-4 animate-bounce">{mission.badge}</div>
            <div className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: mission.color }}>Mission Complete!</div>
            <h2 className="font-serif font-black text-2xl text-white mb-1">{mission.title}</h2>
            <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.6)' }}>{mission.subtitle}</p>

            {/* Rewards */}
            <div className="flex gap-3 justify-center mb-5">
              <div className="px-4 py-2 rounded-2xl text-center"
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
                <div className="font-black text-xl text-white">+{mission.xpBonus}</div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Bonus XP</div>
              </div>
              <div className="px-4 py-2 rounded-2xl text-center"
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
                <div className="font-black text-xl text-white">+{mission.goldBonus} 🪙</div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Bonus Gold</div>
              </div>
            </div>

            {/* Aldric quote */}
            <div className="rounded-2xl p-3 mb-5 text-left"
              style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="flex gap-2 items-start">
                <span className="text-2xl">🧙</span>
                <p className="text-xs italic" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  "{mission.aldricIntro}"
                </p>
              </div>
              <div className="text-[10px] text-right mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>— Aldric, your mentor</div>
            </div>

            <button onClick={handleContinue}
              className="w-full py-3 rounded-2xl font-black text-base transition-all active:scale-95"
              style={{ background: `linear-gradient(135deg, ${mission.color}cc, ${mission.color})`, color: '#fff', boxShadow: `0 4px 20px ${mission.color}66` }}>
              Continue the Journey →
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Confetti active={true} />
      <div className="fixed inset-0 z-[80] flex items-center justify-center p-6"
        style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}>
        <div className={`w-full max-w-sm rounded-3xl p-7 text-center transition-all duration-500 ${visible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}
          style={{ background: 'linear-gradient(135deg, #1a3a12, #2a5a22)', border: '2px solid rgba(58,158,92,0.6)', boxShadow: '0 0 40px rgba(58,158,92,0.3)' }}>

          <div className="text-6xl mb-3" style={{ animation: 'bounceIn 0.6s ease' }}>⚔️</div>
          <div className="text-xs font-black uppercase tracking-widest text-green-400 mb-2">Quest Complete!</div>
          <h2 className="font-serif font-black text-xl text-white mb-1">{quest.title}</h2>

          {/* XP + Gold */}
          <div className="flex gap-3 justify-center mt-3 mb-4">
            <div className="px-3 py-1.5 rounded-xl" style={{ background: 'rgba(58,158,92,0.2)', border: '1px solid rgba(58,158,92,0.4)' }}>
              <span className="font-black text-lg text-white">+{quest.xp}</span>
              <span className="text-xs text-green-300 ml-1">XP</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl" style={{ background: 'rgba(232,168,32,0.2)', border: '1px solid rgba(232,168,32,0.4)' }}>
              <span className="font-black text-lg text-white">+{quest.gold}</span>
              <span className="text-xs text-yellow-300 ml-1">🪙</span>
            </div>
          </div>

          {/* Mission progress */}
          {mission && (
            <div className="rounded-2xl p-3 mb-4" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="text-xs font-bold text-white mb-1">{mission.icon} {mission.title}</div>
              <div className="flex gap-1">
                {mission.questIds.map(id => (
                  <div key={id} className="flex-1 h-1.5 rounded-full"
                    style={{ background: id === quest.id || true ? (id <= quest.id ? '#3A9E5C' : 'rgba(255,255,255,0.15)') : 'rgba(255,255,255,0.15)' }} />
                ))}
              </div>
              {isMissionComplete
                ? <div className="text-xs text-yellow-300 font-bold mt-1.5">🎉 Mission complete! Big reward incoming...</div>
                : <div className="text-xs mt-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {mission.questIds.indexOf(quest.id) + 1} of {mission.questIds.length} quests done
                </div>
              }
            </div>
          )}

          <button onClick={handleContinue}
            className="w-full py-3 rounded-2xl font-black text-base active:scale-95 transition-all"
            style={{ background: 'linear-gradient(135deg, #2d7a45, #3A9E5C)', boxShadow: '0 4px 16px rgba(58,158,92,0.4)', color: 'white' }}>
            {isMissionComplete ? `🏆 Claim Mission Reward →` : `Continue →`}
          </button>
        </div>
      </div>
    </>
  )
}

// ─── ALDRIC COMPANION ─────────────────────────────────────────────────────────

function AldricBubble({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="fixed bottom-24 left-4 right-4 z-40 flex items-end gap-3 animate-in slide-in-from-bottom duration-300">
      <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0 border-2 border-gold-bd bg-gold-bg shadow-lg">
        🧙
      </div>
      <div className="flex-1 rounded-2xl rounded-bl-sm p-3 shadow-lg relative"
        style={{ background: 'rgba(15,31,15,0.97)', border: '1px solid rgba(58,158,92,0.3)' }}>
        <p className="text-xs text-white leading-relaxed">{message}</p>
        <div className="text-[10px] mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>— Aldric</div>
        <button onClick={onClose} className="absolute top-2 right-2 text-xs w-5 h-5 flex items-center justify-center rounded-full"
          style={{ color: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.05)' }}>✕</button>
      </div>
    </div>
  )
}

// ─── VISUAL COMPONENTS (same as before) ───────────────────────────────────────

function CompoundChart() {
  const [year, setYear] = useState(0)
  const maxYear = 30
  const simple = (y: number) => 1000 + y * 70
  const compound = (y: number) => 1000 * Math.pow(1.07, y)
  useEffect(() => {
    if (year < maxYear) { const t = setTimeout(() => setYear(y => y + 1), 80); return () => clearTimeout(t) }
  }, [year])
  const maxVal = compound(maxYear)
  const w = 280, h = 160
  const pts = (fn: (y: number) => number) =>
    Array.from({ length: year + 1 }, (_, i) => `${(i / maxYear) * w},${h - (fn(i) / maxVal) * h}`).join(' ')
  return (
    <div className="card mb-4 p-4">
      <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">📈 €1,000 at 7% over 30 years</div>
      <svg width="100%" viewBox={`0 0 ${w} ${h}`} className="overflow-visible mb-3">
        {year > 0 && <>
          <polyline points={pts(simple)} fill="none" stroke="#A89E90" strokeWidth="2" strokeDasharray="5 3" />
          <polyline points={pts(compound)} fill="none" stroke="#3A9E5C" strokeWidth="2.5" />
        </>}
      </svg>
      <div className="flex justify-between text-xs">
        <div>Simple: <strong>€{Math.round(simple(year)).toLocaleString()}</strong></div>
        <div className="text-green-700">Compound: <strong>€{Math.round(compound(year)).toLocaleString()}</strong></div>
      </div>
    </div>
  )
}

function TERChart() {
  const [show, setShow] = useState(false)
  useEffect(() => { setTimeout(() => setShow(true), 200) }, [])
  const funds = [
    { label: 'MSCI World ETF', ter: 0.20, final: 720, color: '#3A9E5C' },
    { label: 'Active Fund', ter: 1.50, final: 540, color: '#E8453A' },
  ]
  return (
    <div className="card mb-4 p-4">
      <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">💸 €100,000 after 30 years at 7%</div>
      {funds.map(f => (
        <div key={f.label} className="mb-3">
          <div className="flex justify-between text-xs mb-1"><span className="font-bold">{f.label}</span><span style={{ color: f.color }}>TER {f.ter}%</span></div>
          <div className="h-8 bg-bg3 rounded-lg overflow-hidden">
            <div className="h-full rounded-lg flex items-center justify-end pr-3 text-white text-xs font-bold transition-all duration-1000"
              style={{ width: show ? `${(f.final / 720) * 100}%` : '0%', background: f.color }}>€{f.final}k</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function MSCIChart() {
  const sectors = [
    { name: 'USA', pct: 70, color: '#3B7AD8' }, { name: 'Japan', pct: 6, color: '#E8A820' },
    { name: 'UK', pct: 4, color: '#E8453A' }, { name: 'France', pct: 3, color: '#3A9E5C' },
    { name: 'Canada', pct: 3, color: '#9B59B6' }, { name: 'Other', pct: 14, color: '#A89E90' },
  ]
  let cum = 0
  const r = 60, cx = 80, cy = 80
  const slices = sectors.map(s => {
    const start = (cum / 100) * 2 * Math.PI - Math.PI / 2
    cum += s.pct
    const end = (cum / 100) * 2 * Math.PI - Math.PI / 2
    const x1 = cx + r * Math.cos(start), y1 = cy + r * Math.sin(start)
    const x2 = cx + r * Math.cos(end), y2 = cy + r * Math.sin(end)
    return { ...s, d: `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${s.pct > 50 ? 1 : 0},1 ${x2},${y2} Z` }
  })
  return (
    <div className="card mb-4 p-4">
      <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">🌍 MSCI World — Country Breakdown</div>
      <div className="flex items-center gap-4">
        <svg width="160" height="160" viewBox="0 0 160 160">
          {slices.map(s => <path key={s.name} d={s.d} fill={s.color} stroke="white" strokeWidth="2" />)}
          <circle cx={cx} cy={cy} r="30" fill="white" />
          <text x={cx} y={cy - 4} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1C1A16">1,600+</text>
          <text x={cx} y={cy + 8} textAnchor="middle" fontSize="8" fill="#6B6355">companies</text>
        </svg>
        <div className="flex flex-col gap-1.5">
          {sectors.map(s => (
            <div key={s.name} className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-sm" style={{ background: s.color }} />
              <span className="text-text2">{s.name}</span>
              <span className="font-bold ml-auto">{s.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function InflationChart() {
  const [show, setShow] = useState(false)
  useEffect(() => { setTimeout(() => setShow(true), 300) }, [])
  const years = [0, 5, 10, 15, 20, 25, 30]
  return (
    <div className="card mb-4 p-4">
      <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">🔥 €10,000: Cash vs Invested</div>
      {years.map(y => (
        <div key={y} className="flex items-center gap-2 text-xs mb-1.5">
          <span className="text-text3 w-10">Yr {y}</span>
          <div className="flex-1 flex gap-1">
            <div className="h-5 rounded flex items-center justify-end pr-1 text-white font-bold transition-all duration-700 text-[10px]"
              style={{ width: show ? `${(Math.round(10000 * Math.pow(0.97, y)) / Math.round(10000 * Math.pow(1.08, 30))) * 100}%` : '0%', background: '#E8453A', minWidth: 30 }}>
              €{(Math.round(10000 * Math.pow(0.97, y)) / 1000).toFixed(1)}k
            </div>
            <div className="h-5 rounded flex items-center justify-end pr-1 text-white font-bold transition-all duration-700 text-[10px]"
              style={{ width: show ? `${(Math.round(10000 * Math.pow(1.08, y)) / Math.round(10000 * Math.pow(1.08, 30))) * 100}%` : '5%', background: '#3A9E5C', transitionDelay: `${y * 50}ms` }}>
              €{(Math.round(10000 * Math.pow(1.08, y)) / 1000).toFixed(0)}k
            </div>
          </div>
        </div>
      ))}
      <div className="flex gap-4 mt-2 text-xs justify-center">
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-red-500" />Cash</div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-green-600" />Invested</div>
      </div>
    </div>
  )
}

function CrashTimeline() {
  const crashes = [
    { year: '1929', name: 'Great Depression', drop: -89, recovery: 25 },
    { year: '1987', name: 'Black Monday', drop: -34, recovery: 2 },
    { year: '2008', name: 'Financial Crisis', drop: -57, recovery: 4 },
    { year: '2020', name: 'COVID Crash', drop: -34, recovery: 0.5 },
  ]
  return (
    <div className="card mb-4 p-4">
      <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">📉 Every crash recovered — every single one</div>
      {crashes.map(c => (
        <div key={c.year} className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold text-text3 w-8">{c.year}</span>
          <div className="flex-1">
            <div className="text-xs font-semibold mb-0.5">{c.name}</div>
            <div className="flex items-center gap-1">
              <div className="h-4 rounded text-[10px] text-white font-bold flex items-center justify-center px-1"
                style={{ width: `${Math.abs(c.drop)}%`, background: '#E8453A' }}>{c.drop}%</div>
              <span className="text-[10px] text-green-600 font-bold">✓ ~{c.recovery < 1 ? `${Math.round(c.recovery * 12)}mo` : `${c.recovery}yr`}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function DiversificationChart() {
  return (
    <div className="card mb-4 p-4">
      <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">🥚 Single Stock vs ETF</div>
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-center">
          <div className="text-2xl mb-1">📉</div>
          <div className="text-xs font-bold text-red-700 mb-1">Single Stock</div>
          <div className="text-lg font-black text-red-600">−100%</div>
          <div className="text-[10px] text-red-400">possible loss</div>
        </div>
        <div className="p-3 bg-green-bg border border-green-bd rounded-xl text-center">
          <div className="text-2xl mb-1">📈</div>
          <div className="text-xs font-bold text-green-700 mb-1">MSCI World</div>
          <div className="text-lg font-black text-green-700">~0.06%</div>
          <div className="text-[10px] text-green-500">impact per failure</div>
        </div>
      </div>
    </div>
  )
}

function DCAChart() {
  const months = [
    { m: 'Jan', price: 10 }, { m: 'Feb', price: 8 }, { m: 'Mar', price: 6 },
    { m: 'Apr', price: 9 }, { m: 'May', price: 12 }, { m: 'Jun', price: 11 },
  ]
  return (
    <div className="card mb-4 p-4">
      <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">📅 €200/month — regardless of price</div>
      <div className="flex gap-1 items-end h-20 mb-2">
        {months.map(m => (
          <div key={m.m} className="flex-1 flex flex-col items-center gap-0.5">
            <div className="text-[9px] font-bold text-green-700">+{Math.round(200 / m.price)}</div>
            <div className="w-full rounded-t" style={{ height: `${(m.price / 12) * 60}px`, background: m.price <= 8 ? '#3A9E5C' : '#3B7AD8' }} />
            <div className="text-[9px] text-text3">€{m.price}</div>
            <div className="text-[9px] text-text3">{m.m}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function RiskReturnChart() {
  const assets = [
    { name: 'Cash', risk: 1, ret: 1, color: '#A89E90' }, { name: 'Bonds', risk: 2, ret: 2.5, color: '#9B59B6' },
    { name: 'MSCI World', risk: 6, ret: 8, color: '#3A9E5C' }, { name: 'EM ETF', risk: 8, ret: 10, color: '#E8A820' },
    { name: 'Single Stock', risk: 10, ret: 12, color: '#E8453A' },
  ]
  return (
    <div className="card mb-4 p-4">
      <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">⚖️ Risk vs Expected Return</div>
      <svg width="100%" viewBox="0 0 280 160" className="overflow-visible">
        <line x1="20" y1="140" x2="270" y2="140" stroke="#E4E0D8" strokeWidth="1.5" />
        <line x1="20" y1="140" x2="20" y2="10" stroke="#E4E0D8" strokeWidth="1.5" />
        {assets.map(a => {
          const x = 20 + (a.risk / 10) * 240
          const y = 140 - (a.ret / 12) * 120
          return (
            <g key={a.name}>
              <circle cx={x} cy={y} r="10" fill={a.color} opacity="0.9" />
              <text x={x} y={y + 20} textAnchor="middle" fontSize="8" fill="#6B6355" fontWeight="bold">{a.name}</text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

function ActiveVsPassiveChart() {
  const [show, setShow] = useState(false)
  useEffect(() => { setTimeout(() => setShow(true), 300) }, [])
  return (
    <div className="card mb-4 p-4">
      <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">🏆 Active Funds Beaten by Index ETF (15yr)</div>
      {[{ cat: 'US Large Cap', pct: 92 }, { cat: 'European Equity', pct: 88 }, { cat: 'Emerging Markets', pct: 85 }].map(c => (
        <div key={c.cat} className="mb-2">
          <div className="flex justify-between text-xs mb-1"><span>{c.cat}</span><span className="font-bold text-red-600">{c.pct}%</span></div>
          <div className="h-4 bg-bg3 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-red-400 to-red-600 rounded-full transition-all duration-1000"
              style={{ width: show ? `${c.pct}%` : '0%' }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function AccDistChart() {
  const [show, setShow] = useState(false)
  useEffect(() => { setTimeout(() => setShow(true), 300) }, [])
  const acc = (y: number) => Math.round(10000 * Math.pow(1.07, y))
  const dist = (y: number) => Math.round(10000 * Math.pow(1.05, y))
  return (
    <div className="card mb-4 p-4">
      <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">🔄 Accumulating vs Distributing — €10,000 over 30yr</div>
      {[0, 10, 20, 30].map(y => (
        <div key={y} className="flex items-center gap-2 mb-2">
          <span className="text-xs text-text3 w-10">Yr {y}</span>
          <div className="flex-1">
            <div className="h-4 rounded mb-0.5 flex items-center justify-end pr-1 text-white text-[9px] font-bold transition-all duration-700"
              style={{ width: show ? `${(acc(y) / acc(30)) * 100}%` : '0%', background: '#3A9E5C', minWidth: 40 }}>
              €{(acc(y) / 1000).toFixed(0)}k
            </div>
            <div className="h-4 rounded flex items-center justify-end pr-1 text-white text-[9px] font-bold transition-all duration-700"
              style={{ width: show ? `${(dist(y) / acc(30)) * 100}%` : '0%', background: '#A89E90', minWidth: 40 }}>
              €{(dist(y) / 1000).toFixed(0)}k
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function SavingsRateChart() {
  const rates = [
    { rate: 10, years: 51 }, { rate: 20, years: 37 }, { rate: 30, years: 28 },
    { rate: 40, years: 22 }, { rate: 50, years: 17 }, { rate: 70, years: 9 },
  ]
  return (
    <div className="card mb-4 p-4">
      <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">💰 Savings Rate → Years to Financial Independence</div>
      {rates.map(r => (
        <div key={r.rate} className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold w-8">{r.rate}%</span>
          <div className="flex-1 h-5 bg-bg3 rounded-lg overflow-hidden">
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

function BondsChart() {
  const data = [{ year: '2008', stocks: -57, bonds: 5 }, { year: '2020', stocks: -34, bonds: 8 }, { year: '2022', stocks: -18, bonds: -12 }]
  return (
    <div className="card mb-4 p-4">
      <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">📜 Stocks vs Bonds during crises</div>
      {data.map(d => (
        <div key={d.year} className="mb-3">
          <div className="text-xs font-bold mb-1">{d.year}</div>
          <div className="flex gap-2 items-center mb-0.5">
            <span className="text-[10px] w-10">Stocks</span>
            <div className="flex-1 h-4 bg-bg3 rounded overflow-hidden">
              <div className="h-full rounded flex items-center justify-end pr-1 text-white text-[9px] font-bold"
                style={{ width: `${Math.abs(d.stocks)}%`, background: '#E8453A' }}>{d.stocks}%</div>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-[10px] w-10">Bonds</span>
            <div className="flex-1 h-4 bg-bg3 rounded overflow-hidden">
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

// Map quest ID to visual
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

// Aldric messages per quest
const ALDRIC_MESSAGES: Record<number, string> = {
  1: "Welcome, young investor! An ETF is your greatest weapon. One purchase, instant access to the world's best companies.",
  2: "When you buy stocks, you become an owner. The market rewards patient owners who hold through uncertainty.",
  3: "Accumulating ETFs are the silent wealth builders. Dividends reinvested automatically — compound interest never sleeps.",
  4: "Fees are the enemy of wealth. A 1% fee sounds tiny until you see how much it costs over 30 years.",
  5: "Time is your greatest advantage. Start today, not tomorrow. The difference is measured in hundreds of thousands.",
  6: "Opening your broker account is the single most important step. Knowledge without action is just entertainment.",
  7: "Dollar-cost averaging removes the burden of perfect timing. Invest regularly, let the market do the rest.",
  8: "The MSCI World — 1,600 companies, 23 countries, one purchase. The index that built millions of fortunes.",
  9: "A single stock can go to zero. An index of 1,600 companies cannot. Diversification is your shield.",
  10: "Risk is not your enemy — it is what you are paid for. Time in the market is how you collect that payment.",
  11: "Three funds. The entire world. One decision per year. Simple beats complex almost every time.",
  12: "Inflation is silent but relentless. Money in a savings account loses value every single day.",
  13: "Before investing, build your fortress. 3 to 6 months of expenses as cash. This protects everything else.",
  14: "90% of active fund managers fail to beat a simple index ETF. The data does not lie.",
  15: "The Sparerpauschbetrag is free money. Two minutes to set up your Freistellungsauftrag — do it now.",
  16: "Every crash has recovered. Every single one. Your only enemy is panic, not the market.",
  17: "The savings rate is a multiplier. Raise it by 5% and watch the difference compound over decades.",
  18: "ESG investing is not charity — it is choosing companies built for the long term.",
  19: "A goal without a date is just a wish. Write it down. Make it specific. Then automate it.",
  20: "Check quarterly. Adjust annually. Obsess never. Inactivity is a superpower for investors.",
  21: "Waiting for the perfect moment, panic selling in crashes, paying high fees — these three mistakes alone destroy most investors.",
  22: "Bonds move differently from stocks. In a crash, they often rise. This is the power of balance.",
  23: "Read the factsheet before you buy anything. TER, AUM, replication method — three numbers, three minutes.",
  24: "Set it up once. Automate it. Let it run for decades. The savings plan is the most powerful financial tool you will ever use.",
  25: "You have done it, champion. You now know more about investing than 90% of the population. The ETF Highlands are yours.",
}

// ─── MAIN QUEST PAGE ──────────────────────────────────────────────────────────

export default function QuestPage() {
  const router = useRouter()
  const params = useParams()
  const questId = parseInt(params.id as string)
  const quest = QUESTS.find(q => q.id === questId)
  const mission = getMissionForQuest(questId)

  const [profile, setProfile] = useState<Profile | null>(null)
  const [answered, setAnswered] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [feedback, setFeedback] = useState('')
  const [completing, setCompleting] = useState(false)
  const [done, setDone] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [missionJustCompleted, setMissionJustCompleted] = useState(false)
  const [showAldric, setShowAldric] = useState(false)

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/login'); return }
      const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single()
      setProfile(data)
      if (data?.completed_quests?.includes(questId)) { setAnswered(true); setCorrect(true); setDone(true) }

      // Show Aldric after 2 seconds
      setTimeout(() => setShowAldric(true), 2000)
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

      // Check if mission just completed
      const missionComplete = mission ? mission.questIds.every(id => newCompleted.includes(id)) : false
      setMissionJustCompleted(missionComplete)

      // Award mission bonus if completed
      if (missionComplete && mission) {
        newXp += mission.xpBonus
        newGold += mission.goldBonus
        if (newXp >= newLevel * XP_PER_LEVEL) { newLevel++; newXp = newXp - (newLevel - 1) * XP_PER_LEVEL }
      }

      await supabase.from('profiles').update({
        xp: newXp, level: newLevel, gold: newGold, completed_quests: newCompleted
      }).eq('id', profile.id)
      setProfile({ ...profile, xp: newXp, level: newLevel, gold: newGold, completed_quests: newCompleted })
    }
    setDone(true)
    setCompleting(false)
    setTimeout(() => setShowPopup(true), 300)
  }

  function handlePopupContinue() {
    setShowPopup(false)
    const currentIndex = QUESTS.findIndex(q => q.id === questId)
    const nextQuest = QUESTS[currentIndex + 1]
    if (nextQuest) router.push(`/quest/${nextQuest.id}`)
    else router.push('/dashboard')
  }

  const currentIndex = QUESTS.findIndex(q => q.id === questId)
  const nextQuest = QUESTS[currentIndex + 1]
  const aldricMessage = ALDRIC_MESSAGES[questId] || "Keep going, young investor. Every quest brings you closer to financial freedom."

  return (
    <div className="min-h-screen bg-bg">
      {/* Popup */}
      {showPopup && (
        <QuestCompletePopup
          quest={quest}
          onContinue={handlePopupContinue}
          isMissionComplete={missionJustCompleted}
          mission={mission || null}
        />
      )}

      {/* Aldric companion */}
      {showAldric && !done && (
        <AldricBubble
          message={aldricMessage}
          onClose={() => setShowAldric(false)}
        />
      )}

      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border px-4 py-3 flex items-center gap-3">
        <button onClick={() => router.push('/dashboard')} className="text-text2 hover:text-text1 text-sm font-semibold">← Back</button>
        <div className="flex-1 text-center font-bold text-sm text-text1 truncate">{quest.title}</div>
        <div className="text-sm font-bold text-gold-dk">+{quest.xp} XP</div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Mission indicator */}
        {mission && (
          <div className="rounded-xl p-3 mb-4 flex items-center gap-3"
            style={{ background: `${mission.color}15`, border: `1.5px solid ${mission.color}40` }}>
            <span className="text-xl">{mission.icon}</span>
            <div className="flex-1">
              <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: mission.color }}>
                Mission {mission.id} of {MISSIONS.length}
              </div>
              <div className="text-xs font-bold text-text1">{mission.title}</div>
            </div>
            <div className="flex gap-1">
              {mission.questIds.map(id => (
                <div key={id} className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold border"
                  style={{
                    background: profile.completed_quests?.includes(id) ? mission.color : id === questId ? `${mission.color}33` : 'rgba(0,0,0,0.05)',
                    borderColor: id === questId ? mission.color : 'transparent',
                    color: profile.completed_quests?.includes(id) ? 'white' : mission.color,
                  }}>
                  {profile.completed_quests?.includes(id) ? '✓' : mission.questIds.indexOf(id) + 1}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quest intro */}
        <div className="bg-gradient-to-br from-green-900 to-green-700 rounded-2xl p-5 mb-5 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 1px, transparent 14px)' }} />
          <div className="relative">
            <div className="text-xs font-bold text-green-300 uppercase tracking-widest mb-2">{quest.icon} Quest {quest.id}</div>
            <h1 className="font-serif font-black text-2xl text-yellow-300 mb-2">{quest.title}</h1>
            <p className="text-green-200 text-sm leading-relaxed">{quest.lesson.intro}</p>
          </div>
        </div>

        {/* Visual */}
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
            <div className="bg-gold-bg border-l-4 border-gold rounded-r-xl px-4 py-3 mb-3">
              <p className="text-gold-dk text-sm font-semibold leading-relaxed">💡 {block.highlight}</p>
            </div>
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
                else if (selectedOption === i) style = 'border-red-300 bg-red-50'
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

        {/* Complete */}
        {done && !showPopup ? (
          <div className="card text-center mb-4">
            <div className="text-5xl mb-3">🎉</div>
            <div className="font-serif font-black text-xl text-text1 mb-1">Quest Complete!</div>
            <div className="text-text2 text-sm mb-4">+{quest.xp} XP · +{quest.gold} 🪙</div>
            <div className="flex gap-2">
              {nextQuest && (
                <button onClick={() => router.push(`/quest/${nextQuest.id}`)}
                  className="flex-1 py-3 rounded-xl font-black text-sm text-[#1A1200] active:scale-95 transition-all"
                  style={{ background: 'linear-gradient(135deg, #c4870a, #E8A820)' }}>
                  ⚔️ Next Quest →
                </button>
              )}
              <button onClick={() => router.push('/dashboard')}
                className="flex-1 py-3 rounded-xl font-bold text-sm bg-bg3 text-text2 border border-border">
                🏠 Dashboard
              </button>
            </div>
          </div>
        ) : !done ? (
          <button onClick={completeQuest} disabled={!answered || completing}
            className={`w-full py-4 rounded-2xl font-black text-base transition-all ${answered ? 'text-[#1A1200] active:scale-95' : 'bg-bg3 text-text3 cursor-not-allowed'}`}
            style={answered ? { background: 'linear-gradient(135deg, #c4870a, #E8A820)', boxShadow: '0 4px 20px rgba(232,168,32,0.4)' } : {}}>
            {completing ? 'Saving...' : answered ? `⚔️ Complete Quest → +${quest.xp} XP` : '💬 Answer the question first'}
          </button>
        ) : null}

        <p className="text-center text-xs text-text3 mt-4 pb-20">Not financial advice. Educational purposes only.</p>
      </div>
    </div>
  )
}

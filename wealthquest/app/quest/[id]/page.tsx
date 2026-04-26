'use client'
import { useEffect, useState, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase, Profile } from '@/lib/supabase'
import { QUESTS, LEVEL_NAMES, XP_PER_LEVEL } from '@/lib/quests'
import { MISSIONS, Mission, getMissionForQuest, isMissionComplete } from '@/lib/missions'
import { getScenarioQuest, ScenarioData, ScenarioChoice } from '@/lib/scenario_quests'

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
  const [attempts, setAttempts] = useState(0)
  const [canRetry, setCanRetry] = useState(false)
  const [completing, setCompleting] = useState(false)
  const [done, setDone] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [missionJustCompleted, setMissionJustCompleted] = useState(false)
  const [showAldric, setShowAldric] = useState(false)

  // Shuffle options once per quest load so correct answer is not always B
  const [shuffledOptions, setShuffledOptions] = useState<{ text: string; correct: boolean; origIdx: number }[]>([])

  // Scenario quest state
  const scenarioData = getScenarioQuest(questId)
  const isScenarioQuest = !!scenarioData
  const [scenarioPhase, setScenarioPhase] = useState<'intro' | 'worry' | 'decision' | 'phase1' | 'consequence' | 'reflection' | 'rebuild'>('intro')
  const [selectedWorry, setSelectedWorry] = useState<string | null>(null)
  const [scenarioChoice, setScenarioChoice] = useState<ScenarioChoice | null>(null)
  const [showScenarioAldric, setShowScenarioAldric] = useState(true)
  const [expandedOutcome, setExpandedOutcome] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/login'); return }
      const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single()
      setProfile(data)
      if (data?.completed_quests?.includes(questId)) { setAnswered(true); setCorrect(true); setDone(true) }
      setTimeout(() => setShowAldric(true), 2000)
    }
    load()
  }, [router, questId])

  // Shuffle quiz options when quest loads
  useEffect(() => {
    if (!quest) return
    const opts = quest.lesson.quiz.options.map((o, i) => ({ ...o, origIdx: i }))
    // Fisher-Yates shuffle
    for (let i = opts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [opts[i], opts[j]] = [opts[j], opts[i]]
    }
    setShuffledOptions(opts)
  }, [questId])

  if (!quest) return <div className="min-h-screen bg-bg flex items-center justify-center"><p>Quest not found.</p></div>
  if (!profile) return <div className="min-h-screen bg-bg flex items-center justify-center"><div className="text-4xl animate-pulse">⚔️</div></div>

  function handleAnswer(idx: number, isCorrect: boolean) {
    if (answered && !canRetry) return
    setAnswered(true)
    setCorrect(isCorrect)
    setSelectedOption(idx)
    setAttempts(a => a + 1)
    setCanRetry(false)
    if (isCorrect) {
      setFeedback(quest!.lesson.quiz.correctFeedback)
      setShowAldric(false)
    } else {
      setFeedback(quest!.lesson.quiz.wrongFeedback)
      setCanRetry(true)
    }
  }

  function handleRetry() {
    setAnswered(false)
    setCorrect(false)
    setSelectedOption(null)
    setFeedback('')
    setCanRetry(false)
    // Re-shuffle on retry
    const opts = quest!.lesson.quiz.options.map((o, i) => ({ ...o, origIdx: i }))
    for (let i = opts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [opts[i], opts[j]] = [opts[j], opts[i]]
    }
    setShuffledOptions(opts)
  }

  // Update weekly challenge XP progress
  function updateWeeklyXP(earnedXp: number) {
    const monday = new Date()
    const day = monday.getDay()
    const diff = monday.getDate() - day + (day === 0 ? -6 : 1)
    monday.setDate(diff)
    const weekStart = monday.toISOString().slice(0, 10)
    const weekKey = `wc_${weekStart}`
    try {
      const saved = JSON.parse(localStorage.getItem(weekKey) || '{"progress":0,"claimed":false}')
      // Only update if current challenge is XP type
      const weekNumber = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000))
      const challenges = ['quests','logins','gold','daily','mission','xp','event']
      const currentType = challenges[weekNumber % challenges.length]
      if (currentType === 'xp') {
        const newProgress = (saved.progress || 0) + earnedXp
        localStorage.setItem(weekKey, JSON.stringify({ ...saved, progress: newProgress }))
      } else if (currentType === 'quests') {
        const newProgress = (saved.progress || 0) + 1
        localStorage.setItem(weekKey, JSON.stringify({ ...saved, progress: newProgress }))
      }
    } catch (e) {}
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
    updateWeeklyXP(quest!.xp)
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

  // ─── SCENARIO QUEST RENDER ─────────────────────────────────────────────────
  if (isScenarioQuest && scenarioData && !done) {
    const sd = scenarioData
    const phaseNum = ['intro','worry','decision','phase1','consequence','reflection','rebuild'].indexOf(scenarioPhase) + 1
    const totalPhases = 6

    return (
      <div className="min-h-screen bg-bg">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border px-4 py-3 flex items-center gap-3">
          <button onClick={() => router.push('/dashboard')} className="text-text2 text-sm font-semibold">← Back</button>
          <div className="flex-1 text-center">
            <div className="text-[10px] font-bold text-text3 uppercase tracking-widest">{sd.skill} · Scenario Quest</div>
            <div className="font-bold text-sm text-text1 truncate">{sd.title}</div>
          </div>
          <div className="text-xs font-bold text-gold-dk">+{quest.xp} XP</div>
        </div>

        {/* Progress bar */}
        {scenarioPhase !== 'intro' && (
          <div className="h-1 bg-bg3">
            <div className="h-full bg-gold transition-all duration-500"
              style={{ width: `${Math.min(((phaseNum - 1) / totalPhases) * 100, 100)}%` }} />
          </div>
        )}

        <div className="max-w-lg mx-auto px-4 py-6 pb-16">

          {/* ── INTRO ── */}
          {scenarioPhase === 'intro' && (
            <div className="flex flex-col gap-4">
              {/* Skill badge */}
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 rounded-full text-xs font-bold border" style={{ background: '#EEF4FF', borderColor: '#B8D0FF', color: '#3B7AD8' }}>
                  {sd.skill}
                </div>
                <div className="text-xs text-text3 italic">{sd.subtitle}</div>
              </div>

              {/* Situation card */}
              <div className="rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f1a2e, #1a2e4a)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="px-4 py-2 flex items-center gap-2" style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.5)' }}>The Situation</span>
                </div>
                <div className="p-5">
                  <p className="text-white/85 text-sm leading-relaxed mb-3">{sd.situation}</p>
                  {sd.threat && (
                    <div className="flex items-start gap-2 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                      <span className="text-yellow-400 text-sm flex-shrink-0">⚠</span>
                      <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,200,0,0.7)' }}>{sd.threat}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Portfolio snapshot */}
              <div className="card p-4">
                <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-2">Your Portfolio</div>
                <div className="text-2xl font-black text-text1 mb-3">€{sd.portfolioValue.toLocaleString('de-DE')}</div>
                <div className="flex h-3 rounded-full overflow-hidden mb-3">
                  {sd.portfolioSnapshot.map((s, i) => (<div key={i} style={{ width: `${s.pct}%`, background: s.color }} />))}
                </div>
                <div className="flex gap-3 flex-wrap">
                  {sd.portfolioSnapshot.map((s, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-text2">
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
                      {s.label} {s.pct}%
                    </div>
                  ))}
                </div>
              </div>

              {/* Aldric */}
              {showScenarioAldric && (
                <div className="flex items-start gap-3 p-4 rounded-2xl" style={{ background: '#FFFEF8', border: '1.5px solid #F5D478' }}>
                  <div className="w-10 h-10 rounded-full bg-gold-bg border-2 border-gold-bd flex items-center justify-center text-xl flex-shrink-0">🧙</div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-gold-dk mb-1">Aldric</div>
                    <p className="text-sm text-text2 italic leading-relaxed">"{sd.aldricOpening}"</p>
                  </div>
                  <button onClick={() => setShowScenarioAldric(false)} className="text-text3 text-xs hover:text-text1">✕</button>
                </div>
              )}

              <button onClick={() => setScenarioPhase('worry')}
                className="w-full py-4 rounded-2xl font-black text-base text-[#1A1200] transition-all active:scale-95"
                style={{ background: 'linear-gradient(135deg, #c4870a, #E8A820)', boxShadow: '0 4px 20px rgba(232,168,32,0.35)' }}>
                I Understand the Situation →
              </button>
            </div>
          )}

          {/* ── WORRY ── */}
          {scenarioPhase === 'worry' && (
            <div className="flex flex-col gap-5">
              <div className="text-center">
                <div className="text-3xl mb-3">🤔</div>
                <div className="font-bold text-lg text-text1 mb-1">Before you decide</div>
                <p className="text-sm text-text2">What concerns you most about this situation?</p>
              </div>

              <div className="flex flex-col gap-3">
                {(sd.worryOptions || ['losing more money', 'missing the recovery', 'making the wrong decision']).map((w, i) => (
                  <button key={i}
                    onClick={() => setSelectedWorry(w)}
                    className={`text-left px-5 py-4 rounded-2xl border-2 transition-all active:scale-[0.98] ${
                      selectedWorry === w ? 'border-gold-bd bg-gold-bg' : 'border-border bg-white hover:border-gold-bd'
                    }`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        selectedWorry === w ? 'border-gold bg-gold' : 'border-border'
                      }`}>
                        {selectedWorry === w && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <span className="text-sm font-medium text-text1 capitalize">{w}</span>
                    </div>
                  </button>
                ))}
              </div>

              <p className="text-xs text-center text-text3">Your answer personalises the feedback you receive after deciding.</p>

              <button onClick={() => setScenarioPhase('decision')} disabled={!selectedWorry}
                className="w-full py-3 rounded-2xl font-black text-sm text-[#1A1200] transition-all active:scale-95 disabled:opacity-40"
                style={{ background: 'linear-gradient(135deg, #c4870a, #E8A820)' }}>
                Now Make Your Decision →
              </button>
            </div>
          )}

          {/* ── DECISION ── */}
          {scenarioPhase === 'decision' && (
            <div className="flex flex-col gap-4">
              <div className="text-center">
                <div className="text-xs font-bold text-text3 uppercase tracking-widest mb-1">Your Decision</div>
                <h2 className="font-bold text-lg text-text1 leading-snug">{sd.question}</h2>
                {selectedWorry && (
                  <div className="mt-2 inline-block px-3 py-1 rounded-full text-xs"
                    style={{ background: 'rgba(232,168,32,0.1)', color: '#B8820A' }}>
                    Your concern: {selectedWorry}
                  </div>
                )}
              </div>

              {/* Portfolio reminder */}
              <div className="flex h-2 rounded-full overflow-hidden">
                {sd.portfolioSnapshot.map((s, i) => (<div key={i} style={{ width: `${s.pct}%`, background: s.color }} />))}
              </div>

              <div className="flex flex-col gap-3">
                {sd.choices.map((choice) => (
                  <button key={choice.id}
                    onClick={() => { setScenarioChoice(choice); setScenarioPhase('phase1') }}
                    className="text-left p-4 rounded-2xl border-2 transition-all active:scale-[0.98] hover:shadow-md"
                    style={{ borderColor: '#E4E0D8', background: '#fff' }}>
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-2xl flex-shrink-0">{choice.icon}</span>
                      <div className="flex-1">
                        <div className="font-bold text-text1 mb-0.5">{choice.label}</div>
                        <div className="text-sm text-text2">{choice.desc}</div>
                      </div>
                    </div>
                    {/* Trade-offs */}
                    {choice.tradeoff && (
                      <div className="mt-2 pt-2 border-t border-border flex flex-col gap-1">
                        <div className="flex items-start gap-2 text-xs">
                          <span className="text-green-600 flex-shrink-0 font-bold">✓</span>
                          <span className="text-text2">{choice.tradeoff.benefit}</span>
                        </div>
                        <div className="flex items-start gap-2 text-xs">
                          <span className="text-orange-500 flex-shrink-0 font-bold">↯</span>
                          <span className="text-text2">{choice.tradeoff.risk}</span>
                        </div>
                        <div className="flex items-start gap-2 text-xs">
                          <span className="text-red-400 flex-shrink-0 font-bold">✗</span>
                          <span className="text-text2">{choice.tradeoff.cost}</span>
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <p className="text-xs text-center text-text3">All strategies have merit. There is no single correct answer — only trade-offs.</p>
            </div>
          )}

          {/* ── PHASE 1: Immediate aftermath ── */}
          {scenarioPhase === 'phase1' && scenarioChoice && (
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl p-5" style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  📅 Days after your decision
                </div>
                <div className="text-lg font-bold text-white mb-3">You chose: {scenarioChoice.icon} {scenarioChoice.label}</div>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  {scenarioChoice.phase1 || "The market continues to evolve. Uncertainty remains."}
                </p>
              </div>

              <div className="card p-4 border-l-4" style={{ borderColor: '#E8A820' }}>
                <div className="text-xs font-bold text-gold-dk uppercase tracking-wider mb-2">What most investors feel now:</div>
                <p className="text-sm text-text2 italic">
                  {scenarioChoice.isOptimal
                    ? "Doubt. Was this actually right? The market is not making it easy."
                    : "Relief — or regret. The uncertainty hasn't gone away yet."}
                </p>
              </div>

              <p className="text-xs text-center text-text3">The short-term result is not the final result. What happens next?</p>

              <button onClick={() => setScenarioPhase('consequence')}
                className="w-full py-3 rounded-2xl font-black text-sm text-white transition-all active:scale-95"
                style={{ background: 'linear-gradient(135deg, #1a3a50, #2a5a78)' }}>
                Fast-forward → See the Outcome
              </button>
            </div>
          )}

          {/* ── CONSEQUENCE ── */}
          {scenarioPhase === 'consequence' && scenarioChoice && (
            <div className="flex flex-col gap-4">
              {/* Investor type label — no good/bad */}
              <div className="rounded-2xl p-5 text-center" style={{
                background: scenarioChoice.isOptimal
                  ? 'linear-gradient(135deg, #0f2d1a, #1a4a28)'
                  : 'linear-gradient(135deg, #1a0f0f, #2d1a1a)',
                border: `1px solid ${scenarioChoice.isOptimal ? 'rgba(58,158,92,0.3)' : 'rgba(232,69,58,0.3)'}`
              }}>
                <div className="text-4xl mb-2">{scenarioChoice.icon}</div>
                <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  Investor Profile
                </div>
                <div className="font-black text-xl text-white mb-2">
                  {scenarioChoice.investorType || scenarioChoice.emotionalLabel}
                </div>
                <div className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  {scenarioChoice.identityLabel || scenarioChoice.emotionalLabel}
                </div>
              </div>

              {/* Result */}
              <div className="card p-4">
                <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-2">⏱ {scenarioChoice.timeframe}</div>
                <p className="text-sm text-text2 leading-relaxed mb-3">{scenarioChoice.consequence}</p>
                <div className={`flex items-center gap-3 p-3 rounded-xl ${
                  scenarioChoice.portfolioImpact >= 0 ? 'bg-green-bg border border-green-bd' : 'bg-red-50 border border-red-200'
                }`}>
                  <div className="text-2xl">{scenarioChoice.portfolioImpact >= 0 ? '📈' : '📉'}</div>
                  <div>
                    <div className={`font-black text-xl ${scenarioChoice.portfolioImpact >= 0 ? 'text-green-700' : 'text-red-600'}`}>
                      {scenarioChoice.portfolioImpact >= 0 ? '+' : ''}{scenarioChoice.portfolioImpact}%
                    </div>
                    <div className="text-xs text-text3">Portfolio impact</div>
                  </div>
                  {selectedWorry && (
                    <div className="ml-auto text-xs text-text3 text-right max-w-[120px]">
                      You worried about "{selectedWorry}"
                    </div>
                  )}
                </div>
              </div>

              {/* Aldric — identity not judgment */}
              <div className="rounded-2xl p-4" style={{
                background: scenarioChoice.isOptimal ? '#EDFAF2' : '#FFF8F0',
                border: `1.5px solid ${scenarioChoice.isOptimal ? '#88D4A4' : '#F5C878'}`
              }}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-gold-bd flex items-center justify-center text-xl flex-shrink-0">🧙</div>
                  <div>
                    <div className="text-xs font-bold mb-1 text-gold-dk">Aldric</div>
                    <p className="text-sm leading-relaxed text-text2">"{scenarioChoice.aldricFeedback}"</p>
                  </div>
                </div>
              </div>

              <button onClick={() => setScenarioPhase('reflection')}
                className="w-full py-3 rounded-2xl font-black text-sm text-white transition-all active:scale-95"
                style={{ background: 'linear-gradient(135deg, #4a1a6a, #6a2a9a)' }}>
                🧠 Explore All Strategies →
              </button>
            </div>
          )}

          {/* ── REFLECTION ── */}
          {scenarioPhase === 'reflection' && scenarioChoice && (
            <div className="flex flex-col gap-4">
              <div className="text-center">
                <div className="text-3xl mb-2">🧠</div>
                <div className="font-bold text-lg text-text1">All Strategies Compared</div>
                <div className="text-sm text-text2">Tap any strategy to explore its reality</div>
              </div>

              {/* Interactive outcomes */}
              <div className="flex flex-col gap-2">
                {sd.choices.map(choice => {
                  const isYou = scenarioChoice.id === choice.id
                  const isExpanded = expandedOutcome === choice.id
                  return (
                    <div key={choice.id}>
                      <button
                        onClick={() => setExpandedOutcome(isExpanded ? null : choice.id)}
                        className="w-full text-left p-4 rounded-2xl border-2 transition-all"
                        style={{
                          borderColor: isYou ? '#E8A820' : isExpanded ? '#3B7AD8' : '#E4E0D8',
                          background: isYou ? '#FFFEF0' : isExpanded ? '#F0F6FF' : '#fff'
                        }}>
                        <div className="flex items-start gap-3">
                          <span className="text-2xl flex-shrink-0">{choice.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-0.5">
                              <div className="font-bold text-sm text-text1">{choice.label}</div>
                              {isYou && <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-gold text-white">YOUR CHOICE</span>}
                            </div>
                            <div className="text-xs font-bold" style={{ color: choice.isOptimal ? '#3A9E5C' : '#E8453A' }}>
                              {choice.investorType || choice.emotionalLabel}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <div className={`font-black text-base ${choice.portfolioImpact >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                              {choice.portfolioImpact >= 0 ? '+' : ''}{choice.portfolioImpact}%
                            </div>
                            <span className="text-text3 text-xs">{isExpanded ? '▲' : '▼'}</span>
                          </div>
                        </div>

                        {/* Trade-offs always visible */}
                        {choice.tradeoff && (
                          <div className="mt-3 pt-2 border-t border-border grid grid-cols-3 gap-2">
                            <div className="text-center">
                              <div className="text-[9px] font-bold text-green-600 uppercase mb-0.5">Benefit</div>
                              <div className="text-[10px] text-text2 leading-tight">{choice.tradeoff.benefit.split(' ').slice(0,5).join(' ')}…</div>
                            </div>
                            <div className="text-center">
                              <div className="text-[9px] font-bold text-orange-500 uppercase mb-0.5">Risk</div>
                              <div className="text-[10px] text-text2 leading-tight">{choice.tradeoff.risk.split(' ').slice(0,5).join(' ')}…</div>
                            </div>
                            <div className="text-center">
                              <div className="text-[9px] font-bold text-red-400 uppercase mb-0.5">Cost</div>
                              <div className="text-[10px] text-text2 leading-tight">{choice.tradeoff.cost.split(' ').slice(0,5).join(' ')}…</div>
                            </div>
                          </div>
                        )}
                      </button>

                      {/* Expanded detail */}
                      {isExpanded && (
                        <div className="mx-2 p-4 rounded-b-2xl border border-t-0 -mt-1"
                          style={{ background: '#F8FAFF', borderColor: '#B8D0FF' }}>
                          {/* Phase 1 */}
                          <div className="mb-3">
                            <div className="text-[10px] font-bold text-blue-700 uppercase tracking-wider mb-1">📅 Immediately after</div>
                            <p className="text-xs text-text2 leading-relaxed italic">
                              "{choice.phase1 || 'The next days bring uncertainty regardless of your choice.'}"
                            </p>
                          </div>
                          {/* Final consequence */}
                          <div className="mb-3">
                            <div className="text-[10px] font-bold text-text3 uppercase tracking-wider mb-1">⏱ {choice.timeframe}</div>
                            <p className="text-xs text-text2 leading-relaxed">{choice.consequence}</p>
                          </div>
                          {/* Identity */}
                          <div className="flex items-start gap-2 pt-2 border-t border-border">
                            <span className="text-sm flex-shrink-0">🧙</span>
                            <p className="text-xs text-text2 italic leading-relaxed">
                              "{choice.aldricFeedback}"
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Key insight */}
              <div className="card p-4 border-l-4 border-gold">
                <div className="text-xs font-bold text-gold-dk uppercase tracking-wider mb-2">💡 The Bigger Picture</div>
                <p className="text-sm text-text2 leading-relaxed">{sd.reflection}</p>
              </div>

              {/* Stat */}
              <div className="rounded-2xl p-4" style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: 'rgba(245,188,56,0.7)' }}>📊 Real World Data</div>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>{sd.statFact}</p>
              </div>

              {/* Skill */}
              <div className="rounded-xl p-3 flex items-center gap-3" style={{ background: '#EEF4FF', border: '1.5px solid #B8D0FF' }}>
                <div className="text-2xl">🔓</div>
                <div>
                  <div className="text-xs font-bold text-blue-700">Skill Developed</div>
                  <div className="text-sm font-bold text-text1">{sd.skillUnlocked}</div>
                </div>
              </div>

              <button onClick={() => completeQuest()}
                className="w-full py-3 rounded-2xl font-black text-sm text-white transition-all active:scale-95"
                style={{ background: 'linear-gradient(135deg, #2d7a45, #3A9E5C)' }}>
                {completing ? 'Saving...' : `✅ Complete → +${quest.xp} XP · +${quest.gold} 🪙`}
              </button>
            </div>
          )}

          {/* ── REBUILD ── */}
          {scenarioPhase === 'rebuild' && (
            <div className="flex flex-col gap-4">
              <div className="text-center">
                <div className="text-3xl mb-2">🔄</div>
                <div className="font-bold text-lg text-text1">Replay with New Knowledge</div>
                <div className="text-sm text-text2">Which strategy would you choose now?</div>
              </div>
              <div className="rounded-xl p-3 bg-bg3 border border-border text-sm text-text2 italic text-center">{sd.situation}</div>
              <div className="flex flex-col gap-3">
                {sd.choices.map((choice) => (
                  <button key={choice.id}
                    onClick={() => { setScenarioChoice(choice); completeQuest() }}
                    className="text-left p-4 rounded-2xl border-2 transition-all active:scale-[0.98]"
                    style={{
                      borderColor: choice.isOptimal ? '#88D4A4' : '#E4E0D8',
                      background: choice.isOptimal ? '#EDFAF2' : '#fff'
                    }}>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">{choice.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <div className="font-bold text-text1">{choice.label}</div>
                        </div>
                        <div className="text-xs font-bold" style={{ color: choice.isOptimal ? '#3A9E5C' : '#888' }}>
                          {choice.investorType || choice.emotionalLabel}
                        </div>
                        <div className="text-xs text-text3 mt-1">{choice.desc}</div>
                      </div>
                      <div className={`font-black text-sm flex-shrink-0 ${choice.portfolioImpact >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {choice.portfolioImpact >= 0 ? '+' : ''}{choice.portfolioImpact}%
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
        {showPopup && <QuestCompletePopup quest={quest} onContinue={handlePopupContinue} isMissionComplete={missionJustCompleted} mission={mission || null} />}
      </div>
    )
  }

  // ─── STANDARD QUEST RENDER ──────────────────────────────────────────────────
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
            {(shuffledOptions.length > 0 ? shuffledOptions : quest.lesson.quiz.options.map((o,i) => ({...o, origIdx: i}))).map((opt, i) => {
              let style = 'border-border bg-white hover:border-gold-bd hover:bg-gold-bg'
              if (answered) {
                if (opt.correct) style = 'border-green-bd bg-green-bg'
                else if (selectedOption === i) style = 'border-red-300 bg-red-50'
                else style = 'border-border bg-bg3 opacity-60'
              }
              const isClickable = !answered || canRetry
              return (
                <div key={opt.origIdx} onClick={() => isClickable && handleAnswer(i, opt.correct)}
                  className={`border-2 rounded-xl px-4 py-3 flex items-center gap-3 transition-all ${isClickable ? 'cursor-pointer' : 'cursor-default'} ${style}`}>
                  <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0 ${answered && opt.correct ? 'border-green bg-green text-white' : answered && selectedOption === i && !opt.correct ? 'border-red-400 bg-red-400 text-white' : 'border-border text-text3'}`}>
                    {answered && opt.correct ? '✓' : answered && selectedOption === i && !opt.correct ? '✗' : String.fromCharCode(65 + i)}
                  </div>
                  <span className="text-sm font-medium text-text1">{opt.text}</span>
                </div>
              )
            })}
          </div>

          {/* Feedback */}
          {feedback && (
            <div className={`rounded-2xl p-4 mb-3 ${correct ? 'bg-green-bg border-2 border-green-bd' : 'bg-red-50 border-2 border-red-200'}`}>
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{correct ? '✅' : '❌'}</span>
                <div className="flex-1">
                  <div className={`font-bold text-sm mb-1 ${correct ? 'text-green-700' : 'text-red-700'}`}>
                    {correct ? 'Correct!' : `Wrong answer${attempts > 1 ? ` (attempt ${attempts})` : ''}`}
                  </div>
                  <p className={`text-sm leading-relaxed ${correct ? 'text-green-700' : 'text-red-600'}`}>
                    {feedback}
                  </p>
                </div>
              </div>

              {/* Aldric explanation */}
              <div className="mt-3 pt-3 border-t flex items-start gap-2"
                style={{ borderColor: correct ? 'rgba(58,158,92,0.2)' : 'rgba(232,69,58,0.15)' }}>
                <span className="text-lg flex-shrink-0">🧙</span>
                <p className="text-xs italic leading-relaxed"
                  style={{ color: correct ? '#2d7a45' : '#c0392b' }}>
                  {correct
                    ? `"${aldricMessage}"`
                    : `"Not quite, young investor. Read the lesson blocks above again carefully — the answer is there. I believe in you."`
                  }
                </p>
              </div>

              {/* Try again button */}
              {!correct && (
                <button onClick={handleRetry}
                  className="mt-3 w-full py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95 text-white"
                  style={{ background: 'linear-gradient(135deg, #c0392b, #e74c3c)' }}>
                  🔄 Try Again
                </button>
              )}
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
        ) : !done && correct ? (
          <button onClick={completeQuest} disabled={completing}
            className="w-full py-4 rounded-2xl font-black text-base transition-all text-[#1A1200] active:scale-95"
            style={{ background: 'linear-gradient(135deg, #c4870a, #E8A820)', boxShadow: '0 4px 20px rgba(232,168,32,0.4)' }}>
            {completing ? 'Saving...' : `⚔️ Complete Quest → +${quest.xp} XP · +${quest.gold} 🪙`}
          </button>
        ) : !done && !answered ? (
          <div className="w-full py-4 rounded-2xl font-black text-base text-center bg-bg3 text-text3 cursor-not-allowed">
            💬 Answer the question to continue
          </div>
        ) : null}

        <p className="text-center text-xs text-text3 mt-4 pb-20">Not financial advice. Educational purposes only.</p>
      </div>
    </div>
  )
}

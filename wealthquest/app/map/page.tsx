'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase, Profile } from '@/lib/supabase'
import { CHAPTER_ONE, CHAPTER_TWO, Quest } from '@/lib/quests'
import { SCENARIO_QUESTS } from '@/lib/scenario_quests'
import { CHAPTER_2_QUESTS } from '@/lib/scenario_quests_ch2'

// ─── TITLE MAP from scenario quests ──────────────────────────────────────────
const SCENARIO_TITLES: Record<number, { title: string; subtitle: string; isBoss: boolean; skill: string; difficulty: string }> = {}
;[...SCENARIO_QUESTS, ...CHAPTER_2_QUESTS].forEach(q => {
  SCENARIO_TITLES[q.questId] = {
    title: q.title,
    subtitle: q.subtitle,
    isBoss: q.isBoss ?? false,
    skill: q.skill,
    difficulty: q.difficulty,
  }
})

// ─── NODE POSITIONS — Chapter 1 (snake path) ─────────────────────────────────
const CH1_POSITIONS = [
  { x: 12, y: 78 }, // Q1  The Money Trap
  { x: 22, y: 65 }, // Q2  Build Your Safety Net
  { x: 16, y: 52 }, // Q3  The Hidden Cost Trap
  { x: 28, y: 40 }, // Q4  Pick Your Broker
  { x: 42, y: 30 }, // Q5  BOSS: The First Real Test ⚔
  { x: 56, y: 22 }, // Q6  The FOMO Trap
  { x: 70, y: 18 }, // Q7  Your First Correction
  { x: 82, y: 26 }, // Q8  The Silent Thief
  { x: 88, y: 40 }, // Q9  The Star Fund
  { x: 84, y: 54 }, // Q10 The Employer Stock Trap
  { x: 72, y: 62 }, // Q11 One ETF or Five?
  { x: 58, y: 68 }, // Q12 BOSS: The Double Pressure ⚔
  { x: 44, y: 62 }, // Q13 The Inheritance Decision
  { x: 30, y: 70 }, // Q14 The Spending Review
  { x: 18, y: 78 }, // Q15 The Tax Efficiency Question
  { x: 24, y: 86 }, // Q16 Values vs Returns
  { x: 38, y: 82 }, // Q17 Your Financial Target
  { x: 52, y: 76 }, // Q18 The Monitoring Trap
  { x: 66, y: 72 }, // Q19 Partner Pressure
  { x: 80, y: 68 }, // Q20 BOSS: Crash Day ⚔
  { x: 88, y: 80 }, // Q21 The Costly Year
  { x: 76, y: 88 }, // Q22 The System Audit
  { x: 60, y: 90 }, // Q23 The 2020 Scenario
  { x: 44, y: 90 }, // Q24 The Perfect Storm
  { x: 28, y: 92 }, // Q25 BOSS: The Real Account 🏆
]

// ─── NODE POSITIONS — Chapter 2 (second area) ────────────────────────────────
const CH2_POSITIONS = [
  { x: 14, y: 75 }, // Q101 Crypto Mania
  { x: 24, y: 62 }, // Q102 Month Eight
  { x: 16, y: 48 }, // Q103 The Expert Says Sell
  { x: 28, y: 36 }, // Q104 Six Winning Months
  { x: 42, y: 24 }, // Q105 Five Friends, One Stock
  { x: 56, y: 18 }, // Q106 BOSS: Maximum Pressure ⚔
  { x: 70, y: 14 }, // Q107 Adding Bonds
  { x: 82, y: 24 }, // Q108 The Rate Shock
  { x: 88, y: 38 }, // Q109 The Home Bias
  { x: 84, y: 52 }, // Q110 Dividends or Growth?
  { x: 72, y: 60 }, // Q111 Portfolio Drift
  { x: 60, y: 66 }, // Q112 BOSS: Architecture Review ⚔
  { x: 48, y: 60 }, // Q113 Your FIRE Number
  { x: 36, y: 52 }, // Q114 The 4% Rule
  { x: 24, y: 60 }, // Q115 The Savings Rate Leap
  { x: 14, y: 70 }, // Q116 The Passive Income Question
  { x: 22, y: 82 }, // Q117 Sequence of Returns Risk
  { x: 36, y: 86 }, // Q118 BOSS: The Windfall ⚔
  { x: 50, y: 82 }, // Q119 Tax Strategy
  { x: 64, y: 78 }, // Q120 Gold Insurance
  { x: 76, y: 72 }, // Q121 The 2022 Stress Test
  { x: 86, y: 64 }, // Q122 Write Your Rules
  { x: 88, y: 78 }, // Q123 One Million
  { x: 76, y: 88 }, // Q124 Year Two Review
  { x: 60, y: 92 }, // Q125 BOSS: The Independence Test 🏆
]

const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner: '#3A9E5C',
  Intermediate: '#E8A820',
  Advanced: '#E8453A',
  Expert: '#9B59B6',
}

export default function MapPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedQuest, setSelectedQuest] = useState<{ quest: Quest; scenarioInfo: typeof SCENARIO_TITLES[number] } | null>(null)
  const [activeChapter, setActiveChapter] = useState<1 | 2>(1)

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/login'); return }
      const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single()
      setProfile(data)
      setLoading(false)
    }
    load()
  }, [router])

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) return (
    <div className="min-h-screen bg-[#0f1f0f] flex items-center justify-center">
      <div className="text-5xl animate-pulse">⚔️</div>
    </div>
  )
  if (!profile) return null

  const completed = profile.completed_quests || []
  const currentQuests = activeChapter === 1 ? CHAPTER_ONE : CHAPTER_TWO
  const currentPositions = activeChapter === 1 ? CH1_POSITIONS : CH2_POSITIONS
  const ch1Completed = completed.filter((id: number) => id >= 1 && id <= 25).length
  const ch2Completed = completed.filter((id: number) => id >= 101 && id <= 125).length
  const ch1Unlocked = ch1Completed >= 25

  function getStatus(quest: Quest, index: number): 'done' | 'active' | 'locked' {
    if (completed.includes(quest.id)) return 'done'
    // Chapter 2 requires Chapter 1 completion
    if (activeChapter === 2 && !ch1Unlocked) return 'locked'
    if (index === 0) return 'active'
    const prev = currentQuests[index - 1]
    if (completed.includes(prev.id)) return 'active'
    return 'locked'
  }

  return (
    <div className="min-h-screen bg-[#0f1f0f] overflow-hidden relative" style={{ height: '100dvh' }}>

      {/* NAV */}
      <nav className="absolute top-0 left-0 right-0 z-50 h-14 flex items-center px-4 gap-3"
        style={{ background: 'rgba(15,31,15,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(100,160,80,0.2)' }}>
        <Link href="/dashboard" className="flex items-center gap-2 flex-1">
          <div className="w-8 h-8 rounded-lg bg-[#E8A820] flex items-center justify-center text-base">⚔️</div>
          <span className="font-black text-base text-white hidden sm:block" style={{ fontFamily: 'serif' }}>WealthQuest</span>
        </Link>

        {/* Chapter toggle */}
        <div className="flex items-center gap-1 rounded-full p-1" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <button onClick={() => setActiveChapter(1)}
            className="px-3 py-1 rounded-full text-xs font-bold transition-all"
            style={{
              background: activeChapter === 1 ? 'rgba(58,158,92,0.3)' : 'transparent',
              color: activeChapter === 1 ? '#6FCF97' : 'rgba(255,255,255,0.4)',
              border: activeChapter === 1 ? '1px solid rgba(58,158,92,0.4)' : '1px solid transparent',
            }}>
            Ch.I {ch1Completed}/25
          </button>
          <button onClick={() => setActiveChapter(2)}
            className="px-3 py-1 rounded-full text-xs font-bold transition-all"
            style={{
              background: activeChapter === 2 ? 'rgba(155,89,182,0.3)' : 'transparent',
              color: activeChapter === 2 ? '#C8A4F8' : 'rgba(255,255,255,0.4)',
              border: activeChapter === 2 ? '1px solid rgba(155,89,182,0.4)' : '1px solid transparent',
              opacity: ch1Unlocked ? 1 : 0.5,
            }}>
            {ch1Unlocked ? `Ch.II ${ch2Completed}/25` : '🔒 Ch.II'}
          </button>
        </div>

        <span className="text-[#E8A820] font-bold text-xs">🪙 {profile.gold}</span>
        <Link href="/dashboard"
          className="px-3 py-1.5 rounded-full text-xs font-bold transition-all"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}>
          Dashboard
        </Link>
        <button onClick={signOut} className="text-xs hidden sm:block" style={{ color: 'rgba(255,255,255,0.4)' }}>Exit</button>
      </nav>

      {/* MAP AREA */}
      <div className="absolute inset-0 pt-14 overflow-auto" style={{ cursor: 'default' }}>
        <div className="relative" style={{ width: '100%', minHeight: '100%', minWidth: '700px' }}>

          {/* Background SVG */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice" style={{ minHeight: '600px' }}>
            <defs>
              <radialGradient id="bgGrad" cx="50%" cy="30%" r="70%">
                <stop offset="0%" stopColor={activeChapter === 1 ? '#1a3a1a' : '#1a1a3a'} />
                <stop offset="100%" stopColor={activeChapter === 1 ? '#0a150a' : '#0a0a18'} />
              </radialGradient>
              <filter id="blur4"><feGaussianBlur stdDeviation="4" /></filter>
            </defs>
            <rect width="1000" height="700" fill="url(#bgGrad)" />

            {/* Terrain */}
            <path d="M0,500 Q100,440 200,460 Q300,480 400,420 Q500,360 600,400 Q700,440 800,380 Q900,320 1000,360 L1000,700 L0,700 Z"
              fill={activeChapter === 1 ? '#1a3a12' : '#12123a'} opacity="0.7" />
            <path d="M0,560 Q200,520 400,540 Q600,560 800,520 Q900,500 1000,520 L1000,700 L0,700 Z"
              fill={activeChapter === 1 ? '#0f2009' : '#09091e'} opacity="0.9" />

            {/* Mountains */}
            <polygon points="120,380 200,260 280,380" fill={activeChapter === 1 ? '#1f4015' : '#15152a'} opacity="0.5" />
            <polygon points="700,340 800,200 900,340" fill={activeChapter === 1 ? '#1f4015' : '#15152a'} opacity="0.4" />
            <polygon points="400,300 490,160 580,300" fill={activeChapter === 1 ? '#1f4015' : '#15152a'} opacity="0.35" />

            {/* Stars */}
            {[...Array(35)].map((_, i) => (
              <circle key={i} cx={(i * 137.5) % 1000} cy={(i * 97.3) % 220}
                r={i % 3 === 0 ? 1.5 : 0.8} fill="white" opacity={0.2 + (i % 5) * 0.08} />
            ))}

            {/* Moon */}
            <circle cx={activeChapter === 1 ? 850 : 150} cy="80" r="35"
              fill={activeChapter === 1 ? '#FFF8E0' : '#E0E8FF'} opacity="0.1" />

            {/* Path connecting nodes */}
            {currentQuests.map((quest, i) => {
              if (i === currentQuests.length - 1) return null
              const from = currentPositions[i]
              const to = currentPositions[i + 1]
              if (!from || !to) return null
              const x1 = from.x * 10, y1 = from.y * 7
              const x2 = to.x * 10, y2 = to.y * 7
              const isDone = completed.includes(quest.id)
              return (
                <line key={quest.id} x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={isDone ? (activeChapter === 1 ? 'rgba(58,158,92,0.5)' : 'rgba(155,89,182,0.5)') : 'rgba(255,255,255,0.08)'}
                  strokeWidth={isDone ? 2 : 1.5}
                  strokeDasharray={isDone ? 'none' : '6 4'} />
              )
            })}
          </svg>

          {/* Quest Nodes */}
          <div className="absolute inset-0">
            {currentQuests.map((quest, i) => {
              const pos = currentPositions[i]
              if (!pos) return null
              const status = getStatus(quest, i)
              const scenarioInfo = SCENARIO_TITLES[quest.id]
              const isBoss = scenarioInfo?.isBoss ?? false
              const diff = scenarioInfo?.difficulty ?? 'Beginner'
              const diffColor = DIFFICULTY_COLORS[diff] ?? '#3A9E5C'
              const isLast = i === currentQuests.length - 1
              const nodeSize = isBoss ? 60 : isLast ? 60 : 48

              return (
                <button key={quest.id}
                  onClick={() => {
                    if (status !== 'locked') {
                      setSelectedQuest({ quest, scenarioInfo: scenarioInfo ?? { title: quest.title, subtitle: '', isBoss: false, skill: '', difficulty: 'Beginner' } })
                    }
                  }}
                  className="absolute group"
                  style={{
                    left: `calc(${pos.x}% - ${nodeSize / 2}px)`,
                    top: `calc(${pos.y}% - ${nodeSize / 2}px)`,
                    width: `${nodeSize}px`,
                    height: `${nodeSize}px`,
                    zIndex: selectedQuest?.quest.id === quest.id ? 30 : 20,
                  }}>

                  {/* Active glow */}
                  {status === 'active' && (
                    <div className="absolute inset-[-16px] rounded-full animate-pulse"
                      style={{ background: `radial-gradient(circle, ${isBoss ? 'rgba(232,69,58,0.3)' : 'rgba(232,168,32,0.25)'} 0%, transparent 70%)` }} />
                  )}
                  {status === 'done' && (
                    <div className="absolute inset-[-10px] rounded-full"
                      style={{ background: `radial-gradient(circle, ${activeChapter === 1 ? 'rgba(58,158,92,0.15)' : 'rgba(155,89,182,0.15)'} 0%, transparent 70%)` }} />
                  )}

                  {/* Boss ring */}
                  {isBoss && status === 'active' && (
                    <div className="absolute inset-[-4px] rounded-full border-2 border-red-500 animate-pulse opacity-60" />
                  )}

                  {/* Node circle */}
                  <div className="relative transition-transform duration-200 group-hover:scale-110 w-full h-full rounded-full flex items-center justify-center"
                    style={{
                      fontSize: isBoss || isLast ? '24px' : '18px',
                      background: status === 'done'
                        ? (activeChapter === 1 ? 'linear-gradient(135deg, #2d7a45, #3A9E5C)' : 'linear-gradient(135deg, #6a2a9a, #9B59B6)')
                        : status === 'active'
                          ? isBoss
                            ? 'linear-gradient(135deg, #8a1a1a, #E8453A)'
                            : 'linear-gradient(135deg, #c4870a, #E8A820)'
                          : 'rgba(255,255,255,0.06)',
                      border: status === 'done'
                        ? (activeChapter === 1 ? '2px solid rgba(58,158,92,0.8)' : '2px solid rgba(155,89,182,0.8)')
                        : status === 'active'
                          ? `2px solid ${isBoss ? 'rgba(232,69,58,0.9)' : 'rgba(232,168,32,0.8)'}`
                          : '2px solid rgba(255,255,255,0.1)',
                      boxShadow: status === 'done'
                        ? `0 0 16px ${activeChapter === 1 ? 'rgba(58,158,92,0.4)' : 'rgba(155,89,182,0.4)'}`
                        : status === 'active'
                          ? `0 0 20px ${isBoss ? 'rgba(232,69,58,0.5)' : 'rgba(232,168,32,0.4)'}`
                          : 'none',
                      filter: status === 'locked' ? 'grayscale(0.8)' : 'none',
                      opacity: status === 'locked' ? 0.4 : 1,
                    }}>
                    {status === 'done' ? '✅' : status === 'locked' ? '🔒' : isBoss ? '⚔️' : isLast ? '🏆' : quest.icon}
                  </div>

                  {/* Quest number badge */}
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-black"
                    style={{
                      background: status === 'done'
                        ? (activeChapter === 1 ? '#3A9E5C' : '#9B59B6')
                        : status === 'active'
                          ? isBoss ? '#E8453A' : '#E8A820'
                          : 'rgba(255,255,255,0.12)',
                      color: status === 'active' && !isBoss ? '#1A1200' : 'white',
                      border: '1.5px solid rgba(0,0,0,0.4)',
                    }}>
                    {isLast ? '🏆' : quest.id > 100 ? quest.id - 100 : quest.id}
                  </div>

                  {/* Difficulty dot */}
                  {status !== 'locked' && (
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full border border-black"
                      style={{ background: diffColor }} />
                  )}

                  {/* Label */}
                  <div className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{
                      background: 'rgba(0,0,0,0.65)',
                      color: status === 'done'
                        ? (activeChapter === 1 ? '#6FCF97' : '#C8A4F8')
                        : status === 'active'
                          ? isBoss ? '#FF8A7A' : '#F5BC38'
                          : 'rgba(255,255,255,0.35)',
                      border: `1px solid ${status === 'done'
                        ? (activeChapter === 1 ? 'rgba(58,158,92,0.3)' : 'rgba(155,89,182,0.3)')
                        : status === 'active'
                          ? isBoss ? 'rgba(232,69,58,0.4)' : 'rgba(232,168,32,0.3)'
                          : 'rgba(255,255,255,0.08)'}`,
                      maxWidth: '88px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                    {(scenarioInfo?.title ?? quest.title).length > 16
                      ? (scenarioInfo?.title ?? quest.title).slice(0, 14) + '…'
                      : (scenarioInfo?.title ?? quest.title)}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Chapter label */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 text-center pointer-events-none">
            <div className="text-[10px] font-black tracking-[0.2em] uppercase mb-1"
              style={{ color: activeChapter === 1 ? 'rgba(111,207,151,0.5)' : 'rgba(200,164,248,0.5)' }}>
              {activeChapter === 1 ? 'Chapter I' : 'Chapter II'}
            </div>
            <div className="text-2xl font-black"
              style={{
                fontFamily: 'serif',
                color: activeChapter === 1 ? 'rgba(245,188,56,0.12)' : 'rgba(200,164,248,0.12)',
                textShadow: activeChapter === 1 ? '0 0 40px rgba(232,168,32,0.08)' : '0 0 40px rgba(155,89,182,0.08)',
              }}>
              {activeChapter === 1 ? '⚔ The Foundation' : '🌳 Build Your System'}
            </div>
          </div>

          {/* Phase legend */}
          <div className="absolute top-20 right-4 pointer-events-none">
            <div className="flex flex-col gap-1">
              {(activeChapter === 1
                ? [{ icon: '🌱', label: 'Entry', range: '1-5' }, { icon: '📈', label: 'Behavior', range: '6-12' }, { icon: '⚔️', label: 'Uncertainty', range: '13-20' }, { icon: '🔥', label: 'Stress Test', range: '21-25' }]
                : [{ icon: '📈', label: 'Under Pressure', range: '101-106' }, { icon: '⚔️', label: 'Architecture', range: '107-112' }, { icon: '🔥', label: 'Independence', range: '113-118' }, { icon: '🎯', label: 'Optimization', range: '119-125' }]
              ).map(p => (
                <div key={p.label} className="flex items-center gap-1.5 text-[9px]" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  <span>{p.icon}</span>
                  <span>{p.label}</span>
                  <span style={{ color: 'rgba(255,255,255,0.2)' }}>Q{p.range}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* QUEST DETAIL PANEL */}
      {selectedQuest && (() => {
        const { quest, scenarioInfo } = selectedQuest
        const idx = currentQuests.findIndex(q => q.id === quest.id)
        const status = getStatus(quest, idx)
        const isBoss = scenarioInfo.isBoss
        const diff = scenarioInfo.difficulty
        const diffColor = DIFFICULTY_COLORS[diff] ?? '#3A9E5C'

        return (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(12,24,12,0.98)',
              border: isBoss ? '1px solid rgba(232,69,58,0.4)' : '1px solid rgba(100,160,80,0.25)',
              backdropFilter: 'blur(20px)',
              boxShadow: isBoss ? '0 8px 40px rgba(232,69,58,0.2)' : '0 8px 40px rgba(0,0,0,0.6)',
            }}>

            {/* Boss banner */}
            {isBoss && (
              <div className="px-4 py-2 text-center text-xs font-black uppercase tracking-widest"
                style={{ background: 'rgba(232,69,58,0.15)', borderBottom: '1px solid rgba(232,69,58,0.2)', color: '#FF8A7A' }}>
                ⚔️ Boss Quest — Phase Complete Required
              </div>
            )}

            <div className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{
                    background: status === 'done'
                      ? 'rgba(58,158,92,0.15)'
                      : status === 'active'
                        ? isBoss ? 'rgba(232,69,58,0.15)' : 'rgba(232,168,32,0.15)'
                        : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${status === 'done' ? 'rgba(58,158,92,0.3)' : status === 'active' ? (isBoss ? 'rgba(232,69,58,0.4)' : 'rgba(232,168,32,0.3)') : 'rgba(255,255,255,0.08)'}`,
                  }}>
                  {isBoss ? '⚔️' : quest.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-bold tracking-widest uppercase mb-0.5"
                    style={{ color: 'rgba(111,207,151,0.6)' }}>
                    Quest {quest.id} · {scenarioInfo.skill}
                  </div>
                  <div className="font-black text-sm text-white leading-tight">{scenarioInfo.title}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>{scenarioInfo.subtitle}</div>
                </div>
                <button onClick={() => setSelectedQuest(null)}
                  className="text-xs w-6 h-6 flex items-center justify-center rounded-full flex-shrink-0"
                  style={{ color: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.05)' }}>✕</button>
              </div>

              {/* Tags row */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: diffColor + '20', color: diffColor, border: `1px solid ${diffColor}30` }}>
                  {diff === 'Beginner' ? '🌱' : diff === 'Intermediate' ? '📈' : diff === 'Advanced' ? '⚔️' : '🎯'} {diff}
                </span>
                {isBoss && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(232,69,58,0.15)', color: '#FF8A7A', border: '1px solid rgba(232,69,58,0.3)' }}>
                    Boss Quest
                  </span>
                )}
                <span className="ml-auto text-xs font-bold" style={{ color: '#F5BC38' }}>
                  +{quest.xp} XP · +{quest.gold} 🪙
                </span>
              </div>

              {status === 'locked' ? (
                <div className="text-center py-3 text-xs rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.03)', color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  {activeChapter === 2 && !ch1Unlocked
                    ? '🔒 Complete Chapter I first'
                    : '🔒 Complete previous quest to unlock'}
                </div>
              ) : (
                <button
                  onClick={() => router.push(`/quest/${quest.id}`)}
                  className="w-full py-3 rounded-xl font-black text-sm transition-all active:scale-95"
                  style={{
                    background: status === 'done'
                      ? 'linear-gradient(135deg, #2d7a45, #3A9E5C)'
                      : isBoss
                        ? 'linear-gradient(135deg, #8a1a1a, #E8453A)'
                        : 'linear-gradient(135deg, #c4870a, #E8A820)',
                    color: (status !== 'done' && !isBoss) ? '#1A1200' : 'white',
                    boxShadow: status === 'done'
                      ? '0 4px 16px rgba(58,158,92,0.25)'
                      : isBoss
                        ? '0 4px 20px rgba(232,69,58,0.35)'
                        : '0 4px 16px rgba(232,168,32,0.35)',
                  }}>
                  {status === 'done' ? '▶ Replay Quest' : isBoss ? '⚔️ Enter Boss Quest' : '⚔️ Start Quest'}
                </button>
              )}
            </div>
          </div>
        )
      })()}

      {/* Legend */}
      <div className="absolute bottom-4 right-4 z-40 rounded-xl p-3 text-xs"
        style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span style={{ color: 'rgba(255,255,255,0.5)' }}>Completed</span>
        </div>
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <span style={{ color: 'rgba(255,255,255,0.5)' }}>Available</span>
        </div>
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span style={{ color: 'rgba(255,255,255,0.5)' }}>⚔️ Boss</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }} />
          <span style={{ color: 'rgba(255,255,255,0.5)' }}>Locked</span>
        </div>
      </div>

    </div>
  )
}

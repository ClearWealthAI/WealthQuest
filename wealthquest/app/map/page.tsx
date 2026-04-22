'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase, Profile } from '@/lib/supabase'
import { CHAPTER_ONE, Quest } from '@/lib/quests'

// Node positions for 25 quests on the map (x%, y%)
const NODE_POSITIONS = [
  { x: 14, y: 75 }, // 1  What is an ETF
  { x: 24, y: 62 }, // 2  Stock Market
  { x: 16, y: 48 }, // 3  Accumulating vs Distributing
  { x: 28, y: 36 }, // 4  TER
  { x: 42, y: 24 }, // 5  Compound Interest
  { x: 56, y: 18 }, // 6  Open Broker
  { x: 70, y: 14 }, // 7  Dollar Cost Averaging
  { x: 82, y: 24 }, // 8  MSCI World
  { x: 88, y: 38 }, // 9  Diversification
  { x: 84, y: 52 }, // 10 Risk & Return
  { x: 72, y: 60 }, // 11 3-Fund Portfolio
  { x: 60, y: 66 }, // 12 Inflation
  { x: 48, y: 60 }, // 13 Emergency Fund
  { x: 36, y: 52 }, // 14 ETF vs Active
  { x: 24, y: 74 }, // 15 Tax Basics
  { x: 36, y: 82 }, // 16 Market Crashes
  { x: 50, y: 78 }, // 17 Savings Rate
  { x: 64, y: 74 }, // 18 ESG ETFs
  { x: 76, y: 68 }, // 19 Investment Goals
  { x: 86, y: 60 }, // 20 Tracking Portfolio
  { x: 88, y: 74 }, // 21 Biggest Mistakes
  { x: 76, y: 82 }, // 22 Bonds
  { x: 62, y: 88 }, // 23 ETF Factsheet
  { x: 46, y: 88 }, // 24 ETF Savings Plan
  { x: 30, y: 90 }, // 25 Chapter Complete 🏆
]

export default function MapPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null)

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
    <div className="min-h-screen bg-[#1a2e1a] flex items-center justify-center">
      <div className="text-5xl animate-pulse">⚔️</div>
    </div>
  )
  if (!profile) return null

  const completed = profile.completed_quests || []
  const ch1Completed = completed.filter((id: number) => id <= 25).length

  function getStatus(quest: Quest, index: number): 'done' | 'active' | 'locked' {
    if (completed.includes(quest.id)) return 'done'
    if (index === 0) return 'active'
    const prev = CHAPTER_ONE[index - 1]
    if (completed.includes(prev.id)) return 'active'
    return 'locked'
  }

  return (
    <div className="min-h-screen bg-[#0f1f0f] overflow-hidden relative" style={{ height: '100dvh' }}>

      {/* NAV */}
      <nav className="absolute top-0 left-0 right-0 z-50 h-14 flex items-center px-4 gap-3"
        style={{ background: 'rgba(15,31,15,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(100,160,80,0.2)' }}>
        <Link href="/dashboard" className="flex items-center gap-2 flex-1">
          <div className="w-8 h-8 rounded-lg bg-[#E8A820] flex items-center justify-center text-base">⚔️</div>
          <span className="font-black text-base text-white" style={{ fontFamily: 'serif' }}>Wealth Quest</span>
        </Link>
        <div className="flex items-center gap-3 text-sm">
          {/* Chapter progress pill */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
            style={{ background: 'rgba(58,158,92,0.15)', border: '1px solid rgba(58,158,92,0.3)', color: '#6FCF97' }}>
            <span>⚔ ETF Highlands</span>
            <span style={{ color: 'rgba(111,207,151,0.5)' }}>·</span>
            <span>{ch1Completed}/25</span>
          </div>
          <span className="text-[#E8A820] font-bold text-xs">🪙 {profile.gold}</span>
          <Link href="/dashboard"
            className="px-3 py-1.5 rounded-full text-xs font-bold transition-all"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}>
            Dashboard
          </Link>
          <button onClick={signOut} className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Exit</button>
        </div>
      </nav>

      {/* MAP AREA */}
      <div className="absolute inset-0 pt-14 overflow-auto" style={{ cursor: 'default' }}>
        <div className="relative" style={{ width: '100%', minHeight: '100%', minWidth: '700px' }}>

          {/* Background terrain SVG */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice" style={{ minHeight: '600px' }}>
            {/* Sky gradient */}
            <defs>
              <radialGradient id="glow1" cx="50%" cy="30%" r="60%">
                <stop offset="0%" stopColor="#1a3a1a" />
                <stop offset="100%" stopColor="#0a150a" />
              </radialGradient>
              <radialGradient id="nodeGlowDone" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#3A9E5C" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#3A9E5C" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="nodeGlowActive" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#E8A820" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#E8A820" stopOpacity="0" />
              </radialGradient>
              <filter id="blur4">
                <feGaussianBlur stdDeviation="4" />
              </filter>
            </defs>
            <rect width="1000" height="700" fill="url(#glow1)" />

            {/* Rolling hills terrain */}
            <path d="M0,500 Q100,440 200,460 Q300,480 400,420 Q500,360 600,400 Q700,440 800,380 Q900,320 1000,360 L1000,700 L0,700 Z"
              fill="#1a3a12" opacity="0.8" />
            <path d="M0,540 Q150,500 280,520 Q400,540 520,480 Q640,420 760,460 Q880,500 1000,440 L1000,700 L0,700 Z"
              fill="#152e0e" opacity="0.9" />
            <path d="M0,600 Q200,570 400,590 Q600,610 800,575 Q900,560 1000,580 L1000,700 L0,700 Z"
              fill="#0f2009" />

            {/* Mountains in background */}
            <polygon points="120,380 200,260 280,380" fill="#1f4015" opacity="0.6" />
            <polygon points="80,380 180,240 260,380" fill="#2a5520" opacity="0.4" />
            <polygon points="700,340 800,200 900,340" fill="#1f4015" opacity="0.5" />
            <polygon points="750,340 860,180 960,340" fill="#2a5520" opacity="0.3" />
            <polygon points="400,300 490,160 580,300" fill="#1f4015" opacity="0.4" />

            {/* Stars */}
            {[...Array(30)].map((_, i) => (
              <circle key={i}
                cx={((i * 137.5) % 1000)}
                cy={((i * 97.3) % 250)}
                r={i % 3 === 0 ? 1.5 : 0.8}
                fill="white"
                opacity={0.3 + (i % 5) * 0.1} />
            ))}

            {/* Moon */}
            <circle cx="850" cy="80" r="35" fill="#FFF8E0" opacity="0.12" />
            <circle cx="850" cy="80" r="30" fill="#FFF8E0" opacity="0.08" />

            {/* Path connecting nodes */}
            {CHAPTER_ONE.map((quest, i) => {
              if (i === CHAPTER_ONE.length - 1) return null
              const from = NODE_POSITIONS[i]
              const to = NODE_POSITIONS[i + 1]
              const fx = from.x * 10
              const fy = from.y * 7
              const tx = to.x * 10
              const ty = to.y * 7
              const status = getStatus(quest, i)
              const nextStatus = getStatus(CHAPTER_ONE[i + 1], i + 1)
              const isActive = status === 'done'
              return (
                <line key={i}
                  x1={fx} y1={fy} x2={tx} y2={ty}
                  stroke={isActive ? '#3A9E5C' : 'rgba(255,255,255,0.1)'}
                  strokeWidth={isActive ? 2.5 : 1.5}
                  strokeDasharray={isActive ? 'none' : '6 4'}
                  opacity={isActive ? 0.6 : 0.4} />
              )
            })}
          </svg>

          {/* Quest Nodes */}
          <div className="absolute inset-0" style={{ minHeight: '600px' }}>
            {CHAPTER_ONE.map((quest, i) => {
              const pos = NODE_POSITIONS[i]
              const status = getStatus(quest, i)
              const isSelected = selectedQuest?.id === quest.id

              return (
                <button
                  key={quest.id}
                  onClick={() => setSelectedQuest(isSelected ? null : quest)}
                  className="absolute group"
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: 'translate(-50%, -50%)',
                    cursor: status === 'locked' ? 'not-allowed' : 'pointer',
                  }}>

                  {/* Glow behind active node */}
                  {status === 'active' && (
                    <div className="absolute inset-[-16px] rounded-full animate-pulse"
                      style={{ background: 'radial-gradient(circle, rgba(232,168,32,0.3) 0%, transparent 70%)' }} />
                  )}
                  {status === 'done' && (
                    <div className="absolute inset-[-12px] rounded-full"
                      style={{ background: 'radial-gradient(circle, rgba(58,158,92,0.2) 0%, transparent 70%)' }} />
                  )}

                  {/* Node circle */}
                  <div className="relative transition-transform duration-200 group-hover:scale-110"
                    style={{
                      width: i === 24 ? '60px' : '48px',
                      height: i === 24 ? '60px' : '48px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: i === 24 ? '24px' : '20px',
                      background: status === 'done'
                        ? 'linear-gradient(135deg, #2d7a45, #3A9E5C)'
                        : status === 'active'
                        ? 'linear-gradient(135deg, #c4870a, #E8A820)'
                        : 'rgba(255,255,255,0.07)',
                      border: status === 'done'
                        ? '2px solid rgba(58,158,92,0.8)'
                        : status === 'active'
                        ? '2px solid rgba(232,168,32,0.8)'
                        : '2px solid rgba(255,255,255,0.12)',
                      boxShadow: status === 'done'
                        ? '0 0 16px rgba(58,158,92,0.4)'
                        : status === 'active'
                        ? '0 0 20px rgba(232,168,32,0.5)'
                        : 'none',
                      filter: status === 'locked' ? 'grayscale(0.7)' : 'none',
                      opacity: status === 'locked' ? 0.5 : 1,
                    }}>
                    {status === 'done' ? '✅' : status === 'locked' ? '🔒' : quest.icon}
                  </div>

                  {/* Quest number badge */}
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black"
                    style={{
                      background: status === 'done' ? '#3A9E5C' : status === 'active' ? '#E8A820' : 'rgba(255,255,255,0.15)',
                      color: status === 'active' ? '#1A1200' : 'white',
                      border: '1.5px solid rgba(0,0,0,0.3)',
                    }}>
                    {quest.id === 25 ? '🏆' : quest.id}
                  </div>

                  {/* Label below */}
                  <div className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{
                      background: 'rgba(0,0,0,0.6)',
                      color: status === 'done' ? '#6FCF97' : status === 'active' ? '#F5BC38' : 'rgba(255,255,255,0.4)',
                      border: `1px solid ${status === 'done' ? 'rgba(58,158,92,0.4)' : status === 'active' ? 'rgba(232,168,32,0.4)' : 'rgba(255,255,255,0.1)'}`,
                      maxWidth: '90px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                    {quest.title.length > 16 ? quest.title.slice(0, 14) + '…' : quest.title}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Chapter label */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 text-center pointer-events-none">
            <div className="text-[10px] font-black tracking-[0.2em] uppercase mb-1" style={{ color: 'rgba(111,207,151,0.5)' }}>Chapter I</div>
            <div className="text-2xl font-black" style={{ fontFamily: 'serif', color: 'rgba(245,188,56,0.15)', textShadow: '0 0 40px rgba(232,168,32,0.1)' }}>⚔ ETF Highlands</div>
          </div>

        </div>
      </div>

      {/* QUEST TOOLTIP / PANEL */}
      {selectedQuest && (() => {
        const idx = CHAPTER_ONE.findIndex(q => q.id === selectedQuest.id)
        const status = getStatus(selectedQuest, idx)
        return (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 w-[340px] max-w-[calc(100vw-2rem)] rounded-2xl p-4"
            style={{
              background: 'rgba(15,31,15,0.97)',
              border: '1px solid rgba(100,160,80,0.3)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
            }}>
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{
                  background: status === 'done' ? 'rgba(58,158,92,0.2)' : status === 'active' ? 'rgba(232,168,32,0.2)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${status === 'done' ? 'rgba(58,158,92,0.4)' : status === 'active' ? 'rgba(232,168,32,0.4)' : 'rgba(255,255,255,0.1)'}`,
                }}>
                {selectedQuest.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-bold tracking-widest uppercase mb-0.5"
                  style={{ color: 'rgba(111,207,151,0.6)' }}>
                  Quest {selectedQuest.id} · ETF Highlands
                </div>
                <div className="font-black text-sm text-white leading-tight">{selectedQuest.title}</div>
                <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>{selectedQuest.desc}</div>
              </div>
              <button onClick={() => setSelectedQuest(null)}
                className="text-xs w-6 h-6 flex items-center justify-center rounded-full flex-shrink-0"
                style={{ color: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.05)' }}>✕</button>
            </div>

            <div className="flex items-center gap-2 mb-3">
              {selectedQuest.tags.map(t => (
                <span key={t} className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  {t}
                </span>
              ))}
              <span className="ml-auto text-xs font-bold" style={{ color: '#F5BC38' }}>+{selectedQuest.xp} XP · +{selectedQuest.gold} 🪙</span>
            </div>

            {status === 'locked' ? (
              <div className="text-center py-2 text-xs rounded-xl"
                style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.07)' }}>
                🔒 Complete previous quest to unlock
              </div>
            ) : (
              <button
                onClick={() => router.push(`/quest/${selectedQuest.id}`)}
                className="w-full py-2.5 rounded-xl font-black text-sm transition-all active:scale-95"
                style={{
                  background: status === 'done'
                    ? 'linear-gradient(135deg, #2d7a45, #3A9E5C)'
                    : 'linear-gradient(135deg, #c4870a, #E8A820)',
                  color: status === 'done' ? 'white' : '#1A1200',
                  boxShadow: status === 'done'
                    ? '0 4px 16px rgba(58,158,92,0.3)'
                    : '0 4px 16px rgba(232,168,32,0.4)',
                }}>
                {status === 'done' ? '▶ Play Again' : '⚔️ Start Quest'}
              </button>
            )}
          </div>
        )
      })()}

      {/* Bottom legend */}
      <div className="absolute bottom-4 right-4 z-40 rounded-xl p-3 text-xs"
        style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: '#3A9E5C' }} />
          <span style={{ color: 'rgba(255,255,255,0.5)' }}>Completed</span>
        </div>
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: '#E8A820' }} />
          <span style={{ color: 'rgba(255,255,255,0.5)' }}>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }} />
          <span style={{ color: 'rgba(255,255,255,0.5)' }}>Locked</span>
        </div>
      </div>

    </div>
  )
}

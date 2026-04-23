'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase, Profile } from '@/lib/supabase'

type LeaderboardEntry = {
  id: string
  username: string
  class_icon: string
  class_name: string
  level: number
  xp: number
  gold: number
  streak: number
  longest_streak: number
  completed_quests: number[]
  portfolio: any
}

type Tab = 'xp' | 'gold' | 'streak' | 'portfolio'

const TABS: { id: Tab; label: string; icon: string; color: string }[] = [
  { id: 'xp', label: 'Knowledge', icon: '⭐', color: '#3B7AD8' },
  { id: 'gold', label: 'Gold', icon: '🪙', color: '#E8A820' },
  { id: 'streak', label: 'Streak', icon: '🔥', color: '#E8453A' },
  { id: 'portfolio', label: 'Portfolio', icon: '📊', color: '#3A9E5C' },
]

function getMedalColor(rank: number) {
  if (rank === 1) return { bg: '#FFF8E6', border: '#F5D478', text: '#B8820A', medal: '🥇' }
  if (rank === 2) return { bg: '#F8F8F8', border: '#C0C0C0', text: '#707070', medal: '🥈' }
  if (rank === 3) return { bg: '#FFF3EB', border: '#F5C4A0', text: '#C05008', medal: '🥉' }
  return { bg: '#FFFFFF', border: '#E4E0D8', text: '#6B6355', medal: String(rank) }
}

function getValue(entry: LeaderboardEntry, tab: Tab): number {
  switch (tab) {
    case 'xp': return entry.xp + (entry.level - 1) * 100
    case 'gold': return entry.gold
    case 'streak': return entry.longest_streak || entry.streak || 0
    case 'portfolio':
      if (!entry.portfolio) return 10000
      let val = entry.portfolio.cash || 0
      const prices = entry.portfolio.prices || {}
      const holdings = entry.portfolio.holdings || {}
      Object.keys(holdings).forEach(id => {
        val += (holdings[id].shares || 0) * (prices[id] || 0)
      })
      return val || 10000
  }
}

function formatValue(val: number, tab: Tab): string {
  switch (tab) {
    case 'xp': return `${val.toLocaleString()} XP`
    case 'gold': return `${val.toLocaleString()} 🪙`
    case 'streak': return `${val} days`
    case 'portfolio': return `€${val.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
  }
}

export default function LeaderboardPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<Tab>('xp')
  const [myRank, setMyRank] = useState<number | null>(null)

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/login'); return }

      // Load current user
      const { data: me } = await supabase.from('profiles').select('*').eq('id', session.user.id).single()
      setProfile(me)

      // Load all profiles for leaderboard
      const { data: all } = await supabase
        .from('profiles')
        .select('id, username, class_icon, class_name, level, xp, gold, streak, longest_streak, completed_quests, portfolio')
        .order('xp', { ascending: false })
        .limit(100)

      setEntries(all || [])
      setLoading(false)
    }
    load()
  }, [router])

  // Calculate rank for current user on active tab
  useEffect(() => {
    if (!profile || entries.length === 0) return
    const sorted = [...entries].sort((a, b) => getValue(b, activeTab) - getValue(a, activeTab))
    const rank = sorted.findIndex(e => e.id === profile.id) + 1
    setMyRank(rank > 0 ? rank : null)
  }, [profile, entries, activeTab])

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const sortedEntries = [...entries]
    .sort((a, b) => getValue(b, activeTab) - getValue(a, activeTab))
    .slice(0, 10)

  const activeTabInfo = TABS.find(t => t.id === activeTab)!

  if (loading) return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="text-4xl animate-pulse">🏆</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-bg">
      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border px-4 py-3 flex items-center gap-3">
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
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">🏆</div>
          <h1 className="font-serif font-black text-2xl text-text1">Leaderboard</h1>
          <p className="text-sm text-text2 mt-1">Who are the top investors in Wealth Quest?</p>
        </div>

        {/* My Rank Banner */}
        {profile && myRank && (
          <div className="rounded-2xl p-4 mb-5 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0f2009, #1a3a12)', border: '1px solid rgba(58,158,92,0.3)' }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gold-bg border-2 border-gold-bd flex items-center justify-center text-2xl">
                {profile.class_icon}
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: 'rgba(111,207,151,0.7)' }}>Your Ranking</div>
                <div className="font-serif font-black text-lg text-white">{profile.username}</div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {profile.class_name} · Level {profile.level}
                </div>
              </div>
              <div className="text-right">
                <div className="font-serif font-black text-3xl" style={{ color: '#F5BC38' }}>
                  #{myRank}
                </div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {formatValue(getValue(profile as any, activeTab), activeTab)}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Tabs */}
        <div className="grid grid-cols-4 gap-2 mb-5">
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`py-2.5 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                activeTab === tab.id ? 'text-white shadow-sm' : 'bg-bg3 text-text3 hover:bg-gold-bg'
              }`}
              style={activeTab === tab.id ? { background: tab.color } : {}}>
              <span className="text-base">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Top 3 Podium */}
        {sortedEntries.length >= 3 && (
          <div className="flex items-end justify-center gap-3 mb-5 px-4">
            {/* 2nd place */}
            <div className="flex-1 flex flex-col items-center">
              <div className="text-3xl mb-1">{sortedEntries[1].class_icon}</div>
              <div className="font-bold text-xs text-text1 truncate w-full text-center">{sortedEntries[1].username}</div>
              <div className="text-[10px] text-text3 mb-1">{formatValue(getValue(sortedEntries[1], activeTab), activeTab)}</div>
              <div className="w-full rounded-t-xl flex items-center justify-center py-3 text-2xl font-black"
                style={{ background: '#F8F8F8', border: '2px solid #C0C0C0', height: '70px' }}>
                🥈
              </div>
            </div>
            {/* 1st place */}
            <div className="flex-1 flex flex-col items-center">
              <div className="text-3xl mb-1">{sortedEntries[0].class_icon}</div>
              <div className="font-bold text-xs text-text1 truncate w-full text-center">{sortedEntries[0].username}</div>
              <div className="text-[10px] text-gold-dk mb-1 font-bold">{formatValue(getValue(sortedEntries[0], activeTab), activeTab)}</div>
              <div className="w-full rounded-t-xl flex items-center justify-center py-3 text-2xl font-black"
                style={{ background: '#FFF8E6', border: '2px solid #F5D478', height: '90px' }}>
                🥇
              </div>
            </div>
            {/* 3rd place */}
            <div className="flex-1 flex flex-col items-center">
              <div className="text-3xl mb-1">{sortedEntries[2].class_icon}</div>
              <div className="font-bold text-xs text-text1 truncate w-full text-center">{sortedEntries[2].username}</div>
              <div className="text-[10px] text-text3 mb-1">{formatValue(getValue(sortedEntries[2], activeTab), activeTab)}</div>
              <div className="w-full rounded-t-xl flex items-center justify-center py-3 text-2xl font-black"
                style={{ background: '#FFF3EB', border: '2px solid #F5C4A0', height: '55px' }}>
                🥉
              </div>
            </div>
          </div>
        )}

        {/* Full Rankings List */}
        <div className="flex flex-col gap-2 mb-6">
          {sortedEntries.map((entry, i) => {
            const rank = i + 1
            const medal = getMedalColor(rank)
            const isMe = entry.id === profile?.id
            const val = getValue(entry, activeTab)
            const returnPct = activeTab === 'portfolio' ? ((val - 10000) / 10000 * 100) : null

            return (
              <div key={entry.id}
                className={`rounded-2xl p-3 flex items-center gap-3 transition-all ${isMe ? 'border-2' : 'border border-border'}`}
                style={{
                  background: isMe ? 'rgba(58,158,92,0.05)' : medal.bg,
                  borderColor: isMe ? '#3A9E5C' : medal.border,
                  boxShadow: rank <= 3 ? '0 2px 8px rgba(0,0,0,0.06)' : 'none'
                }}>

                {/* Rank */}
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0"
                  style={{ background: medal.bg, border: `1.5px solid ${medal.border}`, color: medal.text }}>
                  {rank <= 3 ? medal.medal : rank}
                </div>

                {/* Icon */}
                <div className="w-10 h-10 rounded-xl bg-gold-bg border border-gold-bd flex items-center justify-center text-xl flex-shrink-0">
                  {entry.class_icon}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-text1 truncate">{entry.username}</span>
                    {isMe && <span className="text-[10px] font-bold text-green-700 bg-green-bg border border-green-bd px-1.5 py-0.5 rounded-full">You</span>}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-text3">Lv.{entry.level}</span>
                    <span className="text-xs text-text3">·</span>
                    <span className="text-xs text-text3">{entry.completed_quests?.length || 0} quests</span>
                    {(entry.streak || 0) > 0 && (
                      <>
                        <span className="text-xs text-text3">·</span>
                        <span className="text-xs text-orange-500">🔥 {entry.streak}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Value */}
                <div className="text-right flex-shrink-0">
                  <div className="font-bold text-sm" style={{ color: activeTabInfo.color }}>
                    {formatValue(val, activeTab)}
                  </div>
                  {returnPct !== null && (
                    <div className={`text-xs font-bold ${returnPct >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                      {returnPct >= 0 ? '+' : ''}{returnPct.toFixed(1)}%
                    </div>
                  )}
                </div>
              </div>
            )
          })}

          {sortedEntries.length === 0 && (
            <div className="card text-center py-8">
              <div className="text-3xl mb-2">🏆</div>
              <div className="font-bold text-text1">No players yet</div>
              <div className="text-sm text-text2">Be the first on the leaderboard!</div>
            </div>
          )}
        </div>

        {/* Category descriptions */}
        <div className="card bg-bg3 mb-4">
          <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-2">About this ranking</div>
          <div className="text-xs text-text2 leading-relaxed">
            {activeTab === 'xp' && '⭐ Knowledge ranking is based on total XP earned from completing quests. The more quests you complete, the higher you rank.'}
            {activeTab === 'gold' && '🪙 Gold ranking shows who has earned the most gold through quests, daily challenges and streak bonuses.'}
            {activeTab === 'streak' && '🔥 Streak ranking is based on longest streak ever achieved. Consistency is the key to wealth!'}
            {activeTab === 'portfolio' && '📊 Portfolio ranking shows virtual portfolio value in the Investment Simulator. Starting value is €10,000 for everyone.'}
          </div>
        </div>

      </div>
    </div>
  )
}

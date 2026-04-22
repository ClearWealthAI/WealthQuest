'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase, Profile } from '@/lib/supabase'
import { QUESTS, CHAPTER_ONE, CHAPTER_TWO, LEVEL_NAMES, XP_PER_LEVEL } from '@/lib/quests'

export default function Dashboard() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

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

  if (loading) return <div className="min-h-screen bg-bg flex items-center justify-center"><div className="text-4xl animate-pulse">⚔️</div></div>
  if (!profile) return null

  const levelName = LEVEL_NAMES[Math.min(profile.level - 1, LEVEL_NAMES.length - 1)]
  const xpPct = Math.round((profile.xp / (profile.level * XP_PER_LEVEL)) * 100)
  const completedCount = profile.completed_quests?.length || 0
  const ch1Completed = profile.completed_quests?.filter((id: number) => id <= 25).length || 0
  const ch2Completed = profile.completed_quests?.filter((id: number) => id >= 101 && id <= 125).length || 0
  const ch1Total = CHAPTER_ONE.length
  const ch2Total = CHAPTER_TWO.length

  return (
    <div className="min-h-screen bg-bg">
      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border px-4 py-3 flex items-center gap-3">
        <Link href="/dashboard" className="flex items-center gap-2 flex-1">
          <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center text-base">⚔️</div>
          <span className="font-serif font-black text-base text-text1">Wealth Quest</span>
        </Link>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-yellow-600 font-bold">🪙 {profile.gold}</span>
          <Link href="/profile" className="w-8 h-8 rounded-full bg-gold-bg border border-gold-bd flex items-center justify-center text-lg">{profile.class_icon}</Link>
          <button onClick={signOut} className="text-text3 text-xs hover:text-text2">Exit</button>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Player Card */}
        <div className="card mb-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gold-bg border-2 border-gold-bd flex items-center justify-center text-4xl">{profile.class_icon}</div>
            <div className="flex-1">
              <div className="font-serif font-black text-xl text-text1">{profile.username}</div>
              <div className="text-sm text-text2">{profile.class_name} · Level {profile.level} {levelName}</div>
              <div className="mt-2">
                <div className="flex justify-between text-xs text-text3 mb-1">
                  <span>XP</span><span>{profile.xp} / {profile.level * XP_PER_LEVEL}</span>
                </div>
                <div className="h-2 bg-bg3 rounded-full overflow-hidden border border-border">
                  <div className="h-full bg-gradient-to-r from-gold to-yellow-300 rounded-full transition-all" style={{ width: `${Math.min(xpPct, 100)}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chapter I Banner */}
        <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 rounded-2xl p-5 mb-3 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 1px, transparent 14px)' }} />
          <div className="relative">
            <div className="text-xs font-bold text-green-300 uppercase tracking-widest mb-1">Chapter I</div>
            <h2 className="font-serif font-black text-xl text-yellow-300 mb-1">⚔ ETF Highlands</h2>
            <p className="text-green-200 text-sm mb-3">Master the basics of ETFs, compound interest, and long-term thinking.</p>
            <div>
              <div className="flex justify-between text-xs text-green-300 mb-1">
                <span>Chapter Progress</span><span>{ch1Completed} / {ch1Total} quests</span>
              </div>
              <div className="h-2 bg-green-900 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-400 rounded-full transition-all" style={{ width: `${(ch1Completed / ch1Total) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Chapter II Banner */}
        <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 rounded-2xl p-5 mb-5 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 1px, transparent 14px)' }} />
          <div className="relative">
            <div className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-1">Chapter II</div>
            <h2 className="font-serif font-black text-xl text-cyan-300 mb-1">🌊 Compound Sea</h2>
            <p className="text-blue-200 text-sm mb-3">Dive deeper into advanced investing strategies and wealth psychology.</p>
            <div>
              <div className="flex justify-between text-xs text-blue-300 mb-1">
                <span>Chapter Progress</span><span>{ch2Completed} / {ch2Total} quests</span>
              </div>
              <div className="h-2 bg-blue-900 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-400 rounded-full transition-all" style={{ width: `${(ch2Completed / ch2Total) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: 'Quests Done', value: completedCount },
            { label: 'Level', value: profile.level },
            { label: 'Gold', value: `🪙 ${profile.gold}` },
          ].map(s => (
            <div key={s.label} className="card text-center py-4">
              <div className="font-serif font-black text-2xl text-gold-dk">{s.value}</div>
              <div className="text-xs text-text3 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Quest List */}
        <h3 className="font-bold text-text1 mb-3 text-sm uppercase tracking-wider">Active Quests</h3>
        <div className="flex flex-col gap-3 mb-6">
          {QUESTS.map((q, i) => {
            const done = profile.completed_quests?.includes(q.id)
            const locked = i > 0 && !profile.completed_quests?.includes(QUESTS[i - 1].id)
            return (
              <div key={q.id}
                onClick={() => !locked && router.push(`/quest/${q.id}`)}
                className={`card flex items-center gap-4 transition-all ${!locked ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-md hover:border-gold-bd' : 'opacity-60 cursor-default'} ${done ? 'border-green-bd bg-green-bg' : ''}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${done ? 'bg-green-bg' : locked ? 'bg-bg3' : 'bg-gold-bg'}`}>
                  {done ? '✅' : locked ? '🔒' : q.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm text-text1">{q.title}</div>
                  <div className="text-xs text-text2 mt-0.5 truncate">{q.desc}</div>
                  <div className="flex gap-1.5 mt-1.5">
                    {q.tags.map(t => <span key={t} className="pill bg-bg3 text-text3 text-[10px]">{t}</span>)}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  {done ? <div className="text-green font-bold text-sm">✓ Done</div> : (
                    <>
                      <div className="font-bold text-gold-dk text-sm">+{q.xp} XP</div>
                      <div className="text-xs text-text3">+{q.gold} 🪙</div>
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="https://clearwealthai.com/clearwealthai-quiz.html" target="_blank"
            className="card text-center hover:border-gold-bd hover:bg-gold-bg transition-all cursor-pointer">
            <div className="text-2xl mb-1">🎯</div>
            <div className="font-bold text-sm text-text1">ETF Quiz</div>
            <div className="text-xs text-text2 mt-0.5">Find your profile</div>
          </Link>
          <Link href="https://clearwealthai.com/clearwealthai.html" target="_blank"
            className="card text-center hover:border-gold-bd hover:bg-gold-bg transition-all cursor-pointer">
            <div className="text-2xl mb-1">📊</div>
            <div className="font-bold text-sm text-text1">Calculator</div>
            <div className="text-xs text-text2 mt-0.5">See your future wealth</div>
          </Link>
        </div>
      </div>
    </div>
  )
}

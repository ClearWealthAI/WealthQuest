'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase, Profile } from '@/lib/supabase'
import { CHAPTER_1, CHAPTER_2, DAILY_QUESTS, LEVEL_NAMES, XP_PER_LEVEL } from '@/lib/quests'

export default function Dashboard() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeChapter, setActiveChapter] = useState(1)
  const [dailyDone, setDailyDone] = useState<string[]>([])

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/login'); return }
      const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single()
      setProfile(data)
      setLoading(false)
      const today = new Date().toDateString()
      const saved = localStorage.getItem(`daily_${today}`)
      if (saved) setDailyDone(JSON.parse(saved))
    }
    load()
  }, [router])

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  function completeDailyQuest(id: string) {
    const today = new Date().toDateString()
    const newDone = [...dailyDone, id]
    setDailyDone(newDone)
    localStorage.setItem(`daily_${today}`, JSON.stringify(newDone))
    if (profile) {
      supabase.from('profiles').update({ xp: profile.xp + 15, gold: profile.gold + 5 }).eq('id', profile.id)
      setProfile({...profile, xp: profile.xp + 15, gold: profile.gold + 5})
    }
  }

  if (loading) return <div className="min-h-screen bg-[#F8F6F1] flex items-center justify-center"><div className="text-5xl animate-pulse">⚔️</div></div>
  if (!profile) return null

  const levelName = LEVEL_NAMES[Math.min(profile.level - 1, LEVEL_NAMES.length - 1)]
  const xpNeeded = profile.level * XP_PER_LEVEL
  const xpPct = Math.min(Math.round((profile.xp / xpNeeded) * 100), 100)
  const completedQuests = profile.completed_quests || []
  const ch1Done = CHAPTER_1.filter(q => completedQuests.includes(q.id)).length
  const ch2Done = CHAPTER_2.filter(q => completedQuests.includes(q.id)).length
  const ch2Unlocked = ch1Done >= 5
  const currentQuests = activeChapter === 1 ? CHAPTER_1 : CHAPTER_2
  const todayDaily = DAILY_QUESTS[new Date().getDay() % DAILY_QUESTS.length]

  return (
    <div className="min-h-screen bg-[#F8F6F1]">
      <nav className="sticky top-0 z-50 bg-white/96 backdrop-blur border-b border-[#E4E0D8] px-4 h-14 flex items-center gap-3 shadow-sm">
        <Link href="/dashboard" className="flex items-center gap-2 flex-1">
          <div className="w-8 h-8 rounded-lg bg-[#E8A820] flex items-center justify-center text-base shadow-sm">⚔️</div>
          <span className="font-serif font-black text-base text-[#1C1A16]">Wealth Quest</span>
        </Link>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-yellow-600 font-bold">🪙 {profile.gold}</span>
          <Link href="/profile" className="w-8 h-8 rounded-full bg-[#FFF8E6] border border-[#F5D478] flex items-center justify-center text-lg">{profile.class_icon}</Link>
          <button onClick={signOut} className="text-[#A89E90] text-xs hover:text-[#6B6355] transition-colors">Exit</button>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {/* Player Card */}
        <div className="bg-white border border-[#E4E0D8] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#FFF8E6] border-2 border-[#F5D478] flex items-center justify-center text-4xl flex-shrink-0">{profile.class_icon}</div>
            <div className="flex-1 min-w-0">
              <div className="font-serif font-black text-xl text-[#1C1A16] truncate">{profile.username}</div>
              <div className="text-sm text-[#6B6355]">{profile.class_name} · Level {profile.level} {levelName}</div>
              <div className="mt-2">
                <div className="flex justify-between text-xs text-[#A89E90] mb-1"><span>XP</span><span>{profile.xp} / {xpNeeded}</span></div>
                <div className="h-2 bg-[#F0EDE6] rounded-full overflow-hidden border border-[#E4E0D8]">
                  <div className="h-full bg-gradient-to-r from-[#E8A820] to-[#F5BC38] rounded-full transition-all" style={{ width: `${xpPct}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Quest */}
        <div className="bg-gradient-to-r from-[#1C1A16] to-[#2C2A26] rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg,white 0,white 1px,transparent 1px,transparent 12px)' }} />
          <div className="relative flex items-start gap-4">
            <div className="text-3xl">{todayDaily.icon}</div>
            <div className="flex-1">
              <div className="text-xs font-bold text-[#E8A820] uppercase tracking-widest mb-1">⚡ Daily Quest</div>
              <div className="font-serif font-black text-[#F0C96A] text-lg mb-1">{todayDaily.title}</div>
              <div className="text-sm text-white/60 mb-3">{todayDaily.desc}</div>
              {dailyDone.includes(todayDaily.id)
                ? <div className="text-green-400 font-bold text-sm">✓ Completed! +{todayDaily.xp} XP</div>
                : <button onClick={() => completeDailyQuest(todayDaily.id)} className="bg-[#E8A820] text-[#1A1200] font-bold text-sm px-4 py-2 rounded-full hover:bg-[#F5BC38] transition-colors">{todayDaily.action} → +{todayDaily.xp} XP</button>
              }
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[{label:'Ch.I',value:`${ch1Done}/25`},{label:'Ch.II',value:ch2Unlocked?`${ch2Done}/25`:'🔒'},{label:'Gold',value:`🪙${profile.gold}`}].map(s => (
            <div key={s.label} className="bg-white border border-[#E4E0D8] rounded-xl p-4 text-center shadow-sm">
              <div className="font-serif font-black text-xl text-[#B8820A]">{s.value}</div>
              <div className="text-xs text-[#A89E90] mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Chapter Tabs */}
        <div className="flex gap-2">
          {[{num:1,label:'⚔️ ETF Highlands',done:ch1Done,total:25,unlocked:true},{num:2,label:'🌊 Compound Sea',done:ch2Done,total:25,unlocked:ch2Unlocked}].map(ch => (
            <button key={ch.num} onClick={() => ch.unlocked && setActiveChapter(ch.num)}
              className={`flex-1 rounded-xl p-3 border transition-all text-left ${activeChapter===ch.num?'bg-[#FFF8E6] border-[#F5D478]':ch.unlocked?'bg-white border-[#E4E0D8] hover:border-[#F5D478]':'bg-[#F0EDE6] border-[#E4E0D8] opacity-60'}`}>
              <div className="text-xs font-bold text-[#B8820A] mb-0.5">{ch.unlocked?ch.label:'🔒 Locked'}</div>
              <div className="text-xs text-[#A89E90]">{ch.unlocked?`${ch.done}/${ch.total} complete`:'Complete 5 Ch.I quests'}</div>
              {ch.unlocked && <div className="mt-2 h-1.5 bg-[#F0EDE6] rounded-full overflow-hidden"><div className="h-full bg-[#E8A820] rounded-full" style={{width:`${(ch.done/ch.total)*100}%`}} /></div>}
            </button>
          ))}
        </div>

        {/* Quests */}
        <div>
          <h3 className="font-bold text-[#1C1A16] mb-3 text-xs uppercase tracking-wider">
            {activeChapter===1?'Chapter I — ETF Highlands':'Chapter II — Compound Sea'}
          </h3>
          <div className="flex flex-col gap-2 pb-6">
            {currentQuests.map((q,i) => {
              const done = completedQuests.includes(q.id)
              const prevDone = i===0 || completedQuests.includes(currentQuests[i-1].id)
              const locked = !done && !prevDone && i>0
              return (
                <div key={q.id} onClick={() => !locked && router.push(`/quest/${q.id}`)}
                  className={`bg-white border rounded-xl p-4 flex items-center gap-3 transition-all ${!locked?'cursor-pointer hover:-translate-y-0.5 hover:shadow-md hover:border-[#F5D478]':'opacity-50 cursor-default'} ${done?'border-[#90D4AC] bg-[#EDFAF2]':'border-[#E4E0D8]'}`}>
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${done?'bg-[#EDFAF2]':locked?'bg-[#F0EDE6]':'bg-[#FFF8E6]'}`}>
                    {done?'✅':locked?'🔒':q.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm text-[#1C1A16] truncate">{q.title}</div>
                    <div className="text-xs text-[#6B6355] mt-0.5 truncate">{q.desc}</div>
                    <div className="flex gap-1 mt-1.5 flex-wrap">
                      {q.tags.map(t => <span key={t} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F0EDE6] text-[#A89E90]">{t}</span>)}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    {done?<div className="text-[#3A9E5C] font-bold text-sm">✓</div>:<><div className="font-bold text-[#B8820A] text-sm">+{q.xp} XP</div><div className="text-xs text-[#A89E90]">+{q.gold} 🪙</div></>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

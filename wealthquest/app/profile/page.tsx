'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase, Profile } from '@/lib/supabase'
import { QUESTS, LEVEL_NAMES, XP_PER_LEVEL } from '@/lib/quests'

export default function ProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/login'); return }
      const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single()
      setProfile(data)
    }
    load()
  }, [router])

  if (!profile) return <div className="min-h-screen bg-bg flex items-center justify-center"><div className="text-4xl animate-pulse">⚔️</div></div>

  const levelName = LEVEL_NAMES[Math.min(profile.level - 1, LEVEL_NAMES.length - 1)]
  const completedCount = profile.completed_quests?.length || 0

  return (
    <div className="min-h-screen bg-bg">
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border px-4 py-3 flex items-center gap-3">
        <Link href="/dashboard" className="text-gold-dk text-sm font-bold">← Back</Link>
        <span className="font-serif font-black text-base text-text1 flex-1 text-center">My Profile</span>
        <div className="w-16" />
      </nav>

      <div className="max-w-md mx-auto px-4 py-6">
        <div className="card text-center mb-4">
          <div className="w-20 h-20 rounded-2xl bg-gold-bg border-2 border-gold-bd flex items-center justify-center text-5xl mx-auto mb-3">{profile.class_icon}</div>
          <h1 className="font-serif font-black text-2xl text-text1">{profile.username}</h1>
          <p className="text-text2 text-sm mt-1">{profile.class_name} · Level {profile.level} {levelName}</p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { label: 'Level', value: profile.level },
            { label: 'Total XP', value: profile.xp },
            { label: 'Gold', value: `🪙${profile.gold}` },
          ].map(s => (
            <div key={s.label} className="card text-center py-4">
              <div className="font-serif font-black text-xl text-gold-dk">{s.value}</div>
              <div className="text-xs text-text3 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="card mb-4">
          <h3 className="font-bold text-sm text-text1 mb-3">Quest Progress</h3>
          {QUESTS.map(q => {
            const done = profile.completed_quests?.includes(q.id)
            return (
              <div key={q.id} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                <div className="text-lg">{done ? '✅' : '🔒'}</div>
                <div className="flex-1 text-sm text-text2">{q.title}</div>
                {done && <div className="text-xs text-gold-dk font-bold">+{q.xp} XP</div>}
              </div>
            )
          })}
        </div>

        <button onClick={async () => { await supabase.auth.signOut(); router.push('/login') }}
          className="btn-ghost w-full">
          Sign Out
        </button>
      </div>
    </div>
  )
}

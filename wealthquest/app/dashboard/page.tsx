'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase, Profile } from '@/lib/supabase'
import { QUESTS, CHAPTER_ONE, CHAPTER_TWO, LEVEL_NAMES, XP_PER_LEVEL, getDailyQuest, DailyQuest } from '@/lib/quests'
import { IdentityCard, SkillTreeCard } from '@/components/skill_tree_widget'

// ─── WEEKLY CHALLENGE ─────────────────────────────────────────────────────────

const WEEKLY_CHALLENGES = [
  { id: 'wc1', title: 'Quest Warrior', desc: 'Complete 5 quests this week', icon: '⚔️', goal: 5, type: 'quests', xpReward: 300, goldReward: 60 },
  { id: 'wc2', title: 'Daily Devotion', desc: 'Log in 5 days this week', icon: '📅', goal: 5, type: 'logins', xpReward: 250, goldReward: 50 },
  { id: 'wc3', title: 'Gold Rush', desc: 'Earn 150 gold this week', icon: '🪙', goal: 150, type: 'gold', xpReward: 200, goldReward: 75 },
  { id: 'wc4', title: 'Knowledge Seeker', desc: 'Answer 3 daily quests correctly', icon: '🧠', goal: 3, type: 'daily', xpReward: 220, goldReward: 45 },
  { id: 'wc5', title: 'Mission Possible', desc: 'Complete an entire Mission', icon: '🎯', goal: 1, type: 'mission', xpReward: 400, goldReward: 80 },
  { id: 'wc6', title: 'XP Hunter', desc: 'Earn 500 XP this week', icon: '⭐', goal: 500, type: 'xp', xpReward: 350, goldReward: 70 },
  { id: 'wc7', title: 'Market Reactor', desc: 'React to a market event in the Simulator', icon: '📊', goal: 1, type: 'event', xpReward: 300, goldReward: 65 },
]

function getCurrentWeekChallenge(): typeof WEEKLY_CHALLENGES[0] {
  const weekNumber = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000))
  return WEEKLY_CHALLENGES[weekNumber % WEEKLY_CHALLENGES.length]
}

function getWeekStart(): string {
  const now = new Date()
  const day = now.getDay()
  const diff = now.getDate() - day + (day === 0 ? -6 : 1)
  const monday = new Date(now.setDate(diff))
  return monday.toISOString().slice(0, 10)
}

function getDaysUntilMonday(): number {
  const now = new Date()
  const day = now.getDay()
  return day === 0 ? 1 : 8 - day
}

// ─── ACHIEVEMENT BADGES ───────────────────────────────────────────────────────

type Badge = {
  id: string
  title: string
  desc: string
  icon: string
  color: string
  unlocked: boolean
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

function computeBadges(profile: Profile): Badge[] {
  const completed = profile.completed_quests || []
  const streak = profile.streak || 0
  const longestStreak = profile.longest_streak || 0
  const gold = profile.gold || 0
  const xp = profile.xp || 0
  const level = profile.level || 1
  const ch1Done = completed.filter((id: number) => id >= 1 && id <= 25).length
  const ch2Done = completed.filter((id: number) => id >= 101 && id <= 125).length

  return [
    {
      id: 'first_quest', title: 'First Steps', desc: 'Complete your first quest',
      icon: '🌱', color: '#3A9E5C', rarity: 'common',
      unlocked: completed.length >= 1,
    },
    {
      id: 'five_quests', title: 'Getting Started', desc: 'Complete 5 quests',
      icon: '📚', color: '#3B7AD8', rarity: 'common',
      unlocked: completed.length >= 5,
    },
    {
      id: 'streak_7', title: 'On Fire', desc: 'Reach a 7-day streak',
      icon: '🔥', color: '#E8453A', rarity: 'common',
      unlocked: longestStreak >= 7,
    },
    {
      id: 'gold_500', title: 'Gold Hoarder', desc: 'Accumulate 500 gold',
      icon: '🪙', color: '#E8A820', rarity: 'common',
      unlocked: gold >= 500,
    },
    {
      id: 'mission_1', title: 'Foundation Builder', desc: 'Complete Mission 1',
      icon: '🏛️', color: '#3A9E5C', rarity: 'rare',
      unlocked: [1,2,3,4,5].every(id => completed.includes(id)),
    },
    {
      id: 'mission_2', title: 'Portfolio Pioneer', desc: 'Complete Mission 2',
      icon: '💼', color: '#3B7AD8', rarity: 'rare',
      unlocked: [6,7,8,9,10].every(id => completed.includes(id)),
    },
    {
      id: 'mission_3', title: 'Market Survivor', desc: 'Complete Mission 3',
      icon: '⚔️', color: '#E8A820', rarity: 'rare',
      unlocked: [11,12,13,14,15].every(id => completed.includes(id)),
    },
    {
      id: 'mission_4', title: 'Detail Master', desc: 'Complete Mission 4',
      icon: '🔬', color: '#9B59B6', rarity: 'rare',
      unlocked: [16,17,18,19,20].every(id => completed.includes(id)),
    },
    {
      id: 'level_5', title: 'Rising Investor', desc: 'Reach Level 5',
      icon: '⭐', color: '#E8A820', rarity: 'rare',
      unlocked: level >= 5,
    },
    {
      id: 'streak_30', title: 'Dedicated', desc: 'Reach a 30-day streak',
      icon: '💎', color: '#9B59B6', rarity: 'epic',
      unlocked: longestStreak >= 30,
    },
    {
      id: 'ch1_complete', title: 'ETF Highlander', desc: 'Complete all Chapter I quests',
      icon: '🏔️', color: '#E8A820', rarity: 'epic',
      unlocked: ch1Done >= 25,
    },
    {
      id: 'xp_1000', title: 'Knowledge is Power', desc: 'Earn 1,000 XP',
      icon: '🧠', color: '#3B7AD8', rarity: 'epic',
      unlocked: xp >= 1000,
    },
    {
      id: 'gold_2000', title: 'Treasure Hunter', desc: 'Accumulate 2,000 gold',
      icon: '👑', color: '#E8A820', rarity: 'epic',
      unlocked: gold >= 2000,
    },
    {
      id: 'streak_100', title: 'Legendary Streak', desc: 'Reach a 100-day streak',
      icon: '🌟', color: '#E8453A', rarity: 'legendary',
      unlocked: longestStreak >= 100,
    },
    {
      id: 'ch2_complete', title: 'Compound Sea Champion', desc: 'Complete all Chapter II quests',
      icon: '🌊', color: '#60A5FA', rarity: 'legendary',
      unlocked: ch2Done >= 25,
    },
    {
      id: 'all_quests', title: 'Wealth Quest Master', desc: 'Complete all 50 quests',
      icon: '🏆', color: '#F5BC38', rarity: 'legendary',
      unlocked: completed.length >= 50,
    },
  ]
}

const RARITY_COLORS = {
  common: { bg: '#F8F8F8', border: '#E4E0D8', label: 'Common' },
  rare: { bg: '#EEF4FF', border: '#B8D0FF', label: 'Rare' },
  epic: { bg: '#F4EEFF', border: '#C8A0FF', label: 'Epic' },
  legendary: { bg: '#FFFBE6', border: '#F5D478', label: 'Legendary' },
}

// ─── MAIN DASHBOARD ───────────────────────────────────────────────────────────

export default function Dashboard() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [dailyQuest] = useState<DailyQuest>(() => getDailyQuest())
  const [dailyAnswered, setDailyAnswered] = useState<'correct' | 'wrong' | null>(null)
  const [dailySelected, setDailySelected] = useState<number | null>(null)
  const [streakUpdated, setStreakUpdated] = useState(false)
  const [showBadges, setShowBadges] = useState(false)
  const [newBadge, setNewBadge] = useState<Badge | null>(null)

  // Weekly challenge state (localStorage-based for simplicity)
  const weekStart = getWeekStart()
  const weekKey = `wc_${weekStart}`
  const challenge = getCurrentWeekChallenge()
  const [weeklyProgress, setWeeklyProgress] = useState(0)
  const [weeklyClaimed, setWeeklyClaimed] = useState(false)

  const todayKey = `dq_${new Date().toISOString().slice(0, 10)}`
  const today = new Date().toISOString().slice(0, 10)

  useEffect(() => {
    // Load weekly challenge progress from localStorage
    const saved = JSON.parse(localStorage.getItem(weekKey) || '{"progress":0,"claimed":false}')
    setWeeklyProgress(saved.progress || 0)
    setWeeklyClaimed(saved.claimed || false)
  }, [weekKey])

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/login'); return }
      const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single()

      // --- STREAK LOGIC ---
      let streak = data?.streak || 0
      let longest_streak = data?.longest_streak || 0
      const last_login = data?.last_login

      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayStr = yesterday.toISOString().slice(0, 10)

      let streakChanged = false
      if (last_login !== today) {
        if (last_login === yesterdayStr) {
          streak = streak + 1
        } else if (!last_login) {
          streak = 1
        } else {
          streak = 1
        }
        longest_streak = Math.max(streak, longest_streak)

        let bonusXp = 0
        if (streak === 7) bonusXp = 50
        if (streak === 30) bonusXp = 200
        if (streak === 100) bonusXp = 500

        await supabase.from('profiles').update({
          streak,
          longest_streak,
          last_login: today,
          xp: (data?.xp || 0) + bonusXp,
        }).eq('id', session.user.id)

        streakChanged = true

        // Update weekly login progress
        if (challenge.type === 'logins') {
          const saved = JSON.parse(localStorage.getItem(weekKey) || '{"progress":0,"claimed":false}')
          const newProgress = Math.min((saved.progress || 0) + 1, challenge.goal)
          localStorage.setItem(weekKey, JSON.stringify({ ...saved, progress: newProgress }))
          setWeeklyProgress(newProgress)
        }
      }

      const newProfile = { ...data, streak, longest_streak }
      setProfile(newProfile)
      setStreakUpdated(streakChanged)
      setLoading(false)

      // Check daily quest
      const serverDone = (data as any)?.last_daily_quest === today
      if (serverDone) {
        setDailyAnswered('correct')
        localStorage.setItem(todayKey, 'correct')
      } else {
        const done = localStorage.getItem(todayKey)
        if (done) setDailyAnswered(done as 'correct' | 'wrong')
      }

      // Check for newly unlocked badges
      const prevBadges = JSON.parse(localStorage.getItem('badges_unlocked') || '[]')
      const currentBadges = computeBadges(newProfile)
      const newlyUnlocked = currentBadges.find(b => b.unlocked && !prevBadges.includes(b.id))
      if (newlyUnlocked) {
        setNewBadge(newlyUnlocked)
        localStorage.setItem('badges_unlocked', JSON.stringify([...prevBadges, newlyUnlocked.id]))
      }
    }
    load()
  }, [router])

  async function answerDaily(idx: number) {
    if (dailyAnswered || !profile) return
    const { data: fresh } = await supabase.from('profiles').select('last_daily_quest').eq('id', profile.id).single()
    if ((fresh as any)?.last_daily_quest === today) {
      setDailyAnswered('correct')
      localStorage.setItem(todayKey, 'correct')
      return
    }
    const correct = dailyQuest.options[idx].correct
    setDailySelected(idx)
    setDailyAnswered(correct ? 'correct' : 'wrong')
    localStorage.setItem(todayKey, correct ? 'correct' : 'wrong')

    if (correct) {
      const newXp = profile.xp + dailyQuest.xp
      const newGold = profile.gold + dailyQuest.gold
      const newLevel = newXp >= profile.level * XP_PER_LEVEL ? profile.level + 1 : profile.level
      await supabase.from('profiles').update({
        xp: newXp, gold: newGold, level: newLevel, last_daily_quest: today,
      }).eq('id', profile.id)
      setProfile({ ...profile, xp: newXp, gold: newGold, level: newLevel })

      // Update weekly daily quest progress
      if (challenge.type === 'daily') {
        const saved = JSON.parse(localStorage.getItem(weekKey) || '{"progress":0,"claimed":false}')
        const newProgress = Math.min((saved.progress || 0) + 1, challenge.goal)
        localStorage.setItem(weekKey, JSON.stringify({ ...saved, progress: newProgress }))
        setWeeklyProgress(newProgress)
      }
    } else {
      await supabase.from('profiles').update({ last_daily_quest: today }).eq('id', profile.id)
    }
  }

  async function claimWeeklyReward() {
    if (!profile || weeklyClaimed || weeklyProgress < challenge.goal) return
    const newXp = profile.xp + challenge.xpReward
    const newGold = profile.gold + challenge.goldReward
    const newLevel = newXp >= profile.level * XP_PER_LEVEL ? profile.level + 1 : profile.level
    await supabase.from('profiles').update({ xp: newXp, gold: newGold, level: newLevel }).eq('id', profile.id)
    setProfile({ ...profile, xp: newXp, gold: newGold, level: newLevel })
    const saved = JSON.parse(localStorage.getItem(weekKey) || '{}')
    localStorage.setItem(weekKey, JSON.stringify({ ...saved, claimed: true }))
    setWeeklyClaimed(true)
  }

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) return <div className="min-h-screen bg-bg flex items-center justify-center"><div className="text-4xl animate-pulse">⚔️</div></div>
  if (!profile) return null

  const levelName = LEVEL_NAMES[Math.min(profile.level - 1, LEVEL_NAMES.length - 1)]
  const xpPct = Math.round((profile.xp / (profile.level * XP_PER_LEVEL)) * 100)
  const completedCount = profile.completed_quests?.length || 0
  const ch1Completed = profile.completed_quests?.filter((id: number) => id >= 1 && id <= 25).length || 0
  const ch2Completed = profile.completed_quests?.filter((id: number) => id >= 101 && id <= 125).length || 0
  const ch1Total = CHAPTER_ONE.length
  const ch2Total = CHAPTER_TWO.length
  const streak = profile.streak || 0
  const alreadyDoneToday = dailyAnswered !== null

  const streakColor = streak >= 30 ? '#E8453A' : streak >= 7 ? '#E8A820' : '#F97316'
  const streakBg = streak >= 30 ? 'rgba(232,69,58,0.1)' : streak >= 7 ? 'rgba(232,168,32,0.1)' : 'rgba(249,115,22,0.1)'

  const badges = computeBadges(profile)
  const unlockedBadges = badges.filter(b => b.unlocked)
  const challengeComplete = weeklyProgress >= challenge.goal
  const challengePct = Math.min((weeklyProgress / challenge.goal) * 100, 100)
  const daysLeft = getDaysUntilMonday()

  return (
    <div className="min-h-screen bg-bg">

      {/* NEW BADGE POPUP */}
      {newBadge && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}>
          <div className="w-full max-w-sm rounded-3xl p-8 text-center"
            style={{ background: RARITY_COLORS[newBadge.rarity].bg, border: `2px solid ${RARITY_COLORS[newBadge.rarity].border}`, boxShadow: `0 0 40px ${newBadge.color}44` }}>
            <div className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: newBadge.color }}>
              🏅 Badge Unlocked!
            </div>
            <div className="text-7xl mb-3">{newBadge.icon}</div>
            <div className="font-serif font-black text-2xl text-text1 mb-1">{newBadge.title}</div>
            <div className="text-sm text-text2 mb-2">{newBadge.desc}</div>
            <div className="text-xs font-bold px-3 py-1 rounded-full inline-block mb-5"
              style={{ background: RARITY_COLORS[newBadge.rarity].border, color: '#333' }}>
              {RARITY_COLORS[newBadge.rarity].label}
            </div>
            <button onClick={() => setNewBadge(null)}
              className="w-full py-3 rounded-2xl font-black text-base text-white transition-all active:scale-95"
              style={{ background: `linear-gradient(135deg, ${newBadge.color}cc, ${newBadge.color})` }}>
              Awesome! 🎉
            </button>
          </div>
        </div>
      )}

      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border px-4 py-3 flex items-center gap-3">
        <Link href="/dashboard" className="flex items-center gap-2 flex-1">
          <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center text-base">⚔️</div>
          <span className="font-serif font-black text-base text-text1">Wealth Quest</span>
        </Link>
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold"
            style={{ background: streakBg, color: streakColor }}>
            🔥 {streak}
          </div>
          <span className="text-yellow-600 font-bold">🪙 {profile.gold}</span>
          <Link href="/profile" className="w-8 h-8 rounded-full bg-gold-bg border border-gold-bd flex items-center justify-center text-lg">{profile.class_icon}</Link>
          <button onClick={signOut} className="text-text3 text-xs hover:text-text2">Exit</button>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-6">

        {/* Player Card */}
        <div className="card mb-4">
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

        {/* WEEKLY CHALLENGE */}
        <div className="card mb-4 border-2" style={{
          borderColor: challengeComplete ? '#88D4A4' : 'rgba(59,122,216,0.3)',
          background: challengeComplete ? '#EDFAF2' : '#F8FAFF'
        }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base"
              style={{ background: challengeComplete ? '#3A9E5C' : '#3B7AD8', color: 'white' }}>
              {challenge.icon}
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: challengeComplete ? '#3A9E5C' : '#3B7AD8' }}>
                Weekly Challenge · {daysLeft}d left
              </div>
              <div className="font-bold text-sm text-text1">{challenge.title}</div>
            </div>
            <div className="text-right">
              <div className="text-xs font-bold text-gold-dk">+{challenge.xpReward} XP</div>
              <div className="text-xs text-text3">+{challenge.goldReward} 🪙</div>
            </div>
          </div>

          <p className="text-xs text-text2 mb-3">{challenge.desc}</p>

          {/* Progress bar */}
          <div className="mb-3">
            <div className="flex justify-between text-xs text-text3 mb-1">
              <span>Progress</span>
              <span className="font-bold">{weeklyProgress} / {challenge.goal}</span>
            </div>
            <div className="h-3 bg-bg3 rounded-full overflow-hidden border border-border">
              <div className="h-full rounded-full transition-all duration-500"
                style={{ width: `${challengePct}%`, background: challengeComplete ? '#3A9E5C' : 'linear-gradient(90deg, #3B7AD8, #60A5FA)' }} />
            </div>
          </div>

          {challengeComplete && !weeklyClaimed ? (
            <button onClick={claimWeeklyReward}
              className="w-full py-2.5 rounded-xl font-black text-sm text-white transition-all active:scale-95"
              style={{ background: 'linear-gradient(135deg, #2d7a45, #3A9E5C)', boxShadow: '0 3px 12px rgba(58,158,92,0.4)' }}>
              🎉 Claim Reward → +{challenge.xpReward} XP · +{challenge.goldReward} 🪙
            </button>
          ) : weeklyClaimed ? (
            <div className="text-center text-sm font-bold text-green-700 py-2">✅ Reward claimed! New challenge on Monday.</div>
          ) : (
            <div className="text-xs text-text3 text-center">Keep going — {challenge.goal - weeklyProgress} more to go!</div>
          )}
        </div>

        {/* IDENTITY + SKILL TREE */}
        <IdentityCard completedQuests={profile.completed_quests || []} />
        <SkillTreeCard completedQuests={profile.completed_quests || []} />

        {/* SHOP + RANKINGS BANNERS */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Link href="/shop">
            <div className="rounded-2xl p-4 relative overflow-hidden cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg h-full"
              style={{ background: 'linear-gradient(135deg, #2a1a00, #4a3000)', border: '1.5px solid rgba(232,168,32,0.5)' }}>
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 1px, transparent 14px)' }} />
              <div className="relative flex flex-col gap-1">
                <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'rgba(245,188,56,0.7)' }}>Gold Shop</div>
                <div className="font-serif font-black text-base" style={{ color: '#F5BC38' }}>🛒 Spend Gold</div>
                <div className="text-[10px]" style={{ color: 'rgba(255,255,255,0.4)' }}>Boosts · Skins · Hints</div>
                <div className="font-black text-lg mt-1" style={{ color: '#F5BC38' }}>🪙 {profile.gold}</div>
              </div>
            </div>
          </Link>
          <Link href="/leaderboard">
            <div className="rounded-2xl p-4 relative overflow-hidden cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg h-full"
              style={{ background: 'linear-gradient(135deg, #0a0a2a, #1a1a4a)', border: '1.5px solid rgba(59,122,216,0.4)' }}>
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 1px, transparent 14px)' }} />
              <div className="relative flex flex-col gap-1">
                <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'rgba(100,160,255,0.7)' }}>Rankings</div>
                <div className="font-serif font-black text-base" style={{ color: '#60A5FA' }}>🏆 Leaderboard</div>
                <div className="text-[10px]" style={{ color: 'rgba(255,255,255,0.4)' }}>Top players</div>
                <div className="font-black text-lg mt-1" style={{ color: '#60A5FA' }}>#{profile.level}</div>
              </div>
            </div>
          </Link>
        </div>

        {/* STREAK CARD */}
        <div className="card mb-4 border-2" style={{ borderColor: streakColor + '40', background: streakBg }}>
          <div className="flex items-center gap-3">
            <div className="text-4xl" style={{ filter: streak === 0 ? 'grayscale(1)' : 'none' }}>🔥</div>
            <div className="flex-1">
              <div className="font-serif font-black text-2xl" style={{ color: streakColor }}>
                {streak} {streak === 1 ? 'day' : 'days'}
              </div>
              <div className="text-xs text-text2">
                {streak === 0 ? 'Start your streak by logging in daily!' :
                 streak < 7 ? `${7 - streak} more days to reach the 7-day bonus! (+50 XP)` :
                 streak < 30 ? `${30 - streak} more days to reach the 30-day bonus! (+200 XP)` :
                 streak < 100 ? `${100 - streak} more days to reach the 100-day bonus! (+500 XP)` :
                 '🏆 Legendary streak! You are unstoppable!'}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-text3">Best</div>
              <div className="font-bold text-sm text-text1">🔥 {profile.longest_streak || 0}</div>
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            {[{ days: 7, xp: '+50 XP', label: '7d' }, { days: 30, xp: '+200 XP', label: '30d' }, { days: 100, xp: '+500 XP', label: '100d' }].map(m => (
              <div key={m.days} className={`flex-1 rounded-xl py-2 text-center border ${streak >= m.days ? 'border-green-bd bg-green-bg' : 'border-border bg-white/50'}`}>
                <div className="text-xs font-bold" style={{ color: streak >= m.days ? '#3A9E5C' : '#A89E90' }}>{m.label}</div>
                <div className="text-xs" style={{ color: streak >= m.days ? '#3A9E5C' : '#A89E90' }}>{m.xp}</div>
                {streak >= m.days && <div className="text-xs">✓</div>}
              </div>
            ))}
          </div>
        </div>

        {/* ACHIEVEMENT BADGES */}
        <div className="card mb-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="font-bold text-sm text-text1">🏅 Achievements</div>
              <div className="text-xs text-text2">{unlockedBadges.length} / {badges.length} unlocked</div>
            </div>
            <button onClick={() => setShowBadges(!showBadges)}
              className="text-xs font-bold text-gold-dk hover:underline">
              {showBadges ? 'Hide' : 'View All'}
            </button>
          </div>

          {/* Unlocked badges preview */}
          <div className="flex gap-2 flex-wrap mb-2">
            {unlockedBadges.slice(0, showBadges ? 999 : 6).map(badge => (
              <div key={badge.id} title={`${badge.title}: ${badge.desc}`}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl border-2 transition-all hover:scale-110"
                style={{ background: RARITY_COLORS[badge.rarity].bg, borderColor: RARITY_COLORS[badge.rarity].border }}>
                {badge.icon}
              </div>
            ))}
            {!showBadges && unlockedBadges.length > 6 && (
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold bg-bg3 border-2 border-border text-text3">
                +{unlockedBadges.length - 6}
              </div>
            )}
          </div>

          {/* Locked badges (show when expanded) */}
          {showBadges && (
            <div>
              <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-2 mt-3">Locked</div>
              <div className="flex flex-col gap-2">
                {badges.filter(b => !b.unlocked).map(badge => (
                  <div key={badge.id} className="flex items-center gap-3 p-2 rounded-xl opacity-50"
                    style={{ background: '#F8F8F8', border: '1.5px solid #E4E0D8' }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg grayscale">{badge.icon}</div>
                    <div className="flex-1">
                      <div className="font-bold text-xs text-text1">{badge.title}</div>
                      <div className="text-[10px] text-text3">{badge.desc}</div>
                    </div>
                    <div className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                      style={{ background: RARITY_COLORS[badge.rarity].border, color: '#555' }}>
                      {RARITY_COLORS[badge.rarity].label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Daily Quest Card */}
        <div className="card mb-4 border-2" style={{
          borderColor: alreadyDoneToday ? (dailyAnswered === 'correct' ? '#88D4A4' : '#F0D068') : '#F0D068',
          background: alreadyDoneToday && dailyAnswered === 'correct' ? '#EDFAF2' : '#FFFEF8'
        }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center text-base">⚡</div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-gold-dk">Daily Quest</div>
              <div className="font-bold text-sm text-text1">{dailyQuest.title}</div>
            </div>
            <div className="ml-auto text-right">
              <div className="text-xs font-bold text-gold-dk">+{dailyQuest.xp} XP</div>
              <div className="text-xs text-text3">+{dailyQuest.gold} 🪙</div>
            </div>
          </div>

          {alreadyDoneToday ? (
            <div className={`rounded-xl p-3 text-center text-sm font-bold ${dailyAnswered === 'correct' ? 'bg-green-bg text-green-700' : 'bg-gold-bg text-gold-dk'}`}>
              {dailyAnswered === 'correct' ? '✅ Completed! Come back tomorrow.' : '📖 Come back tomorrow for a new challenge.'}
            </div>
          ) : (
            <>
              <p className="text-sm font-semibold text-text1 mb-3">{dailyQuest.question}</p>
              <div className="flex flex-col gap-2">
                {dailyQuest.options.map((opt, i) => (
                  <button key={i} onClick={() => answerDaily(i)} disabled={dailyAnswered !== null}
                    className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${
                      dailyAnswered !== null && dailySelected === i
                        ? opt.correct ? 'border-green-500 bg-green-bg text-green-700' : 'border-red-400 bg-red-50 text-red-700'
                        : dailyAnswered !== null && opt.correct ? 'border-green-500 bg-green-bg text-green-700'
                        : 'border-border bg-bg hover:border-gold-bd hover:bg-gold-bg cursor-pointer text-text1'
                    }`}>{opt.text}</button>
                ))}
              </div>
              {dailyAnswered && (
                <div className={`mt-3 p-3 rounded-xl text-sm ${dailyAnswered === 'correct' ? 'bg-green-bg text-green-700' : 'bg-gold-bg text-gold-dk'}`}>
                  {dailyAnswered === 'correct' ? `✅ ${dailyQuest.correctFeedback}` : `💡 ${dailyQuest.wrongFeedback}`}
                </div>
              )}
            </>
          )}
        </div>

        {/* World Map Banner */}
        <Link href="/map" className="block mb-4">
          <div className="rounded-2xl p-5 relative overflow-hidden cursor-pointer transition-all hover:scale-[1.01] hover:shadow-lg"
            style={{ background: 'linear-gradient(135deg, #0f2009 0%, #1a3a12 50%, #0f2009 100%)', border: '1px solid rgba(58,158,92,0.3)' }}>
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 1px, transparent 14px)' }} />
            <div className="relative flex items-center justify-between">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: 'rgba(111,207,151,0.7)' }}>Explore</div>
                <div className="font-serif font-black text-xl mb-1" style={{ color: '#F5BC38' }}>🗺️ World Map</div>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>See your journey through the ETF Highlands</p>
              </div>
              <div className="text-4xl opacity-60">⚔️</div>
            </div>
          </div>
        </Link>

        {/* Portfolio Simulator Banner */}
        <Link href="/portfolio" className="block mb-4">
          <div className="rounded-2xl p-5 relative overflow-hidden cursor-pointer transition-all hover:scale-[1.01] hover:shadow-lg"
            style={{ background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a3a 50%, #0a0a1a 100%)', border: '1px solid rgba(59,122,216,0.3)' }}>
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 1px, transparent 14px)' }} />
            <div className="relative flex items-center justify-between">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: 'rgba(100,160,255,0.7)' }}>Simulator</div>
                <div className="font-serif font-black text-xl mb-1" style={{ color: '#60A5FA' }}>📊 Portfolio Simulator</div>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Invest €10,000 virtual money — react to market events</p>
              </div>
              <div className="text-4xl opacity-60">💰</div>
            </div>
          </div>
        </Link>

        {/* Chapter Banners */}
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

        {/* MISSIONS */}
        <h3 className="font-bold text-text1 mb-3 text-sm uppercase tracking-wider">⚔️ Your Missions</h3>
        <div className="flex flex-col gap-3 mb-6">
          {[
            { id: 1, title: 'The Foundation', icon: '🏛️', questIds: [1,2,3,4,5], color: '#3A9E5C', subtitle: 'Master the basics' },
            { id: 2, title: 'Your First Portfolio', icon: '💼', questIds: [6,7,8,9,10], color: '#3B7AD8', subtitle: 'Build your strategy' },
            { id: 3, title: 'Survive the Market', icon: '⚔️', questIds: [11,12,13,14,15], color: '#E8A820', subtitle: 'Stay calm under pressure' },
            { id: 4, title: 'Master the Details', icon: '🔬', questIds: [16,17,18,19,20], color: '#9B59B6', subtitle: 'Refine like a pro' },
            { id: 5, title: 'ETF Highlands Complete', icon: '🏆', questIds: [21,22,23,24,25], color: '#E8A820', subtitle: 'Become a champion' },
          ].map((mission, mi) => {
            const completed = mission.questIds.filter(id => profile.completed_quests?.includes(id)).length
            const total = mission.questIds.length
            const isComplete = completed === total
            const isLocked = mi > 0 && ![1,2,3,4,5].slice(0, mi).every(m =>
              [[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15],[16,17,18,19,20],[21,22,23,24,25]][m-1]
                ?.every(id => profile.completed_quests?.includes(id))
            )
            const nextQuestId = mission.questIds.find(id => !profile.completed_quests?.includes(id))
            return (
              <div key={mission.id}
                onClick={() => !isLocked && nextQuestId && router.push(`/quest/${nextQuestId}`)}
                className={`card transition-all ${!isLocked ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-md' : 'opacity-50 cursor-default'} ${isComplete ? 'border-green-bd bg-green-bg' : ''}`}
                style={!isLocked && !isComplete ? { borderColor: `${mission.color}40` } : {}}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: isComplete ? '#EDFAF2' : `${mission.color}15`, border: `1.5px solid ${isComplete ? '#88D4A4' : mission.color + '40'}` }}>
                    {isComplete ? '✅' : isLocked ? '🔒' : mission.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: mission.color }}>Mission {mission.id} of 5</div>
                    <div className="font-bold text-sm text-text1">{mission.title}</div>
                    <div className="text-xs text-text2">{mission.subtitle}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-bold text-sm" style={{ color: isComplete ? '#3A9E5C' : mission.color }}>{completed}/{total}</div>
                    <div className="text-xs text-text3">quests</div>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  {mission.questIds.map(id => (
                    <div key={id} className="flex-1 h-2 rounded-full transition-all"
                      style={{ background: profile.completed_quests?.includes(id) ? mission.color : 'rgba(0,0,0,0.08)' }} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Links */}
        <div className="grid grid-cols-4 gap-2">
          <Link href="/map" className="card text-center hover:border-gold-bd hover:bg-gold-bg transition-all cursor-pointer p-3">
            <div className="text-2xl mb-1">🗺️</div>
            <div className="font-bold text-xs text-text1">World Map</div>
          </Link>
          <Link href="/leaderboard" className="card text-center hover:border-gold-bd hover:bg-gold-bg transition-all cursor-pointer p-3">
            <div className="text-2xl mb-1">🏆</div>
            <div className="font-bold text-xs text-text1">Rankings</div>
          </Link>
          <Link href="/shop" className="card text-center hover:border-gold-bd hover:bg-gold-bg transition-all cursor-pointer p-3">
            <div className="text-2xl mb-1">🛒</div>
            <div className="font-bold text-xs text-text1">Shop</div>
          </Link>
          <Link href="/portfolio" className="card text-center hover:border-gold-bd hover:bg-gold-bg transition-all cursor-pointer p-3">
            <div className="text-2xl mb-1">📊</div>
            <div className="font-bold text-xs text-text1">Simulator</div>
          </Link>
        </div>

      </div>
    </div>
  )
}

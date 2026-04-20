'use client'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { supabase, Profile } from '@/lib/supabase'
import { QUESTS, LEVEL_NAMES, XP_PER_LEVEL } from '@/lib/quests'

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

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border px-4 py-3 flex items-center gap-3">
        <button onClick={() => router.push('/dashboard')} className="text-text2 hover:text-text1 transition-colors flex items-center gap-1 text-sm font-semibold">
          ← Map
        </button>
        <div className="flex-1 text-center font-bold text-sm text-text1 truncate">{quest.title}</div>
        <div className="text-sm font-bold text-gold-dk">+{quest.xp} XP</div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Quest intro card */}
        <div className="bg-gradient-to-br from-green-900 to-green-700 rounded-2xl p-5 mb-5 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 1px, transparent 14px)' }} />
          <div className="relative">
            <div className="text-xs font-bold text-green-300 uppercase tracking-widest mb-2">{quest.icon} Quest {quest.id} of 5</div>
            <h1 className="font-serif font-black text-2xl text-yellow-300 mb-2">{quest.title}</h1>
            <p className="text-green-200 text-sm">{quest.lesson.intro}</p>
          </div>
        </div>

        {/* Lesson blocks */}
        {quest.lesson.blocks.map((block, i) => (
          <div key={i} className="card mb-4">
            <div className="text-xs font-bold text-gold-dk uppercase tracking-widest mb-2">{block.label}</div>
            <h2 className="font-serif font-black text-lg text-text1 mb-3">{block.heading}</h2>
            <p className="text-text2 text-sm leading-relaxed mb-4">{block.body}</p>
            <div className="bg-gold-bg border border-gold-bd rounded-xl p-4 border-l-4 border-l-gold">
              <p className="text-gold-dk text-sm font-semibold leading-relaxed">{block.highlight}</p>
            </div>
          </div>
        ))}

        {/* Quiz */}
        <div className="card mb-5">
          <div className="text-xs font-bold text-text3 uppercase tracking-widest mb-3">🧠 Knowledge Check</div>
          <h3 className="font-bold text-text1 mb-4">{quest.lesson.quiz.question}</h3>
          <div className="flex flex-col gap-2.5 mb-4">
            {quest.lesson.quiz.options.map((opt, i) => {
              let style = 'border-border bg-white hover:border-border hover:bg-bg3'
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

        {/* Complete button */}
        {done ? (
          <div className="card text-center">
            <div className="text-4xl mb-2">🎉</div>
            <div className="font-serif font-black text-xl text-text1 mb-1">Quest Complete!</div>
            <div className="text-text2 text-sm mb-4">+{quest.xp} XP · +{quest.gold} 🪙 earned</div>
            <button onClick={() => router.push('/dashboard')} className="btn-gold w-full">
              Return to Map →
            </button>
          </div>
        ) : (
          <button onClick={completeQuest}
            disabled={!answered || completing}
            className={`btn-gold w-full text-base py-4 ${!answered ? 'opacity-40 cursor-not-allowed' : ''}`}>
            {completing ? 'Saving...' : answered ? `Complete Quest → +${quest.xp} XP` : 'Answer the question first'}
          </button>
        )}

        <p className="text-center text-xs text-text3 mt-4">Not financial advice. Educational purposes only.</p>
      </div>
    </div>
  )
}

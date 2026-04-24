'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const CLASSES = [
  { icon: '🛡️', name: 'The Guardian', desc: 'Slow and steady. You protect your wealth before chasing big returns.', trait: '+ Bonus XP on risk management quests' },
  { icon: '⚖️', name: 'The Strategist', desc: 'Balanced growth with calculated risks. The most popular class.', trait: '+ Bonus XP on portfolio quests' },
  { icon: '🚀', name: 'The Trailblazer', desc: 'High risk, high reward. You chase aggressive long-term growth.', trait: '+ Bonus XP on growth quests' },
]

function generateSuggestions(base: string): string[] {
  const clean = base.replace(/[^a-zA-Z0-9]/g, '').slice(0, 16)
  if (!clean) return []
  const suffixes = ['42', '_ETF', '_Investor', '2025', '_Pro', '_Gold', '99', '_Wealth']
  return suffixes.map(s => `${clean}${s}`).slice(0, 4)
}

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [usernameStatus, setUsernameStatus] = useState<'idle' | 'checking' | 'available' | 'taken' | 'invalid'>('idle')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [selectedClass, setSelectedClass] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const debounceRef = useRef<NodeJS.Timeout>()

  // Check username availability with debounce
  useEffect(() => {
    if (username.length < 2) {
      setUsernameStatus('idle')
      setSuggestions([])
      return
    }

    // Validate format
    if (!/^[a-zA-Z0-9_]{2,24}$/.test(username)) {
      setUsernameStatus('invalid')
      setSuggestions([])
      return
    }

    setUsernameStatus('checking')
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      const { data } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username)
        .single()

      if (data) {
        setUsernameStatus('taken')
        setSuggestions(generateSuggestions(username))
      } else {
        setUsernameStatus('available')
        setSuggestions([])
      }
    }, 500)

    return () => clearTimeout(debounceRef.current)
  }, [username])

  async function handleRegister() {
    if (usernameStatus !== 'available') return
    setLoading(true)
    setError('')
    const cls = CLASSES[selectedClass]
    const { data, error: signUpError } = await supabase.auth.signUp({ email, password })
    if (signUpError) { setError(signUpError.message); setLoading(false); return }
    if (data.user) {
      await supabase.from('profiles').upsert({
        id: data.user.id,
        username,
        class_icon: cls.icon,
        class_name: cls.name,
        level: 1, xp: 0, gold: 0, completed_quests: [],
        streak: 0, longest_streak: 0, last_login: null,
      })
    }
    router.push('/dashboard')
  }

  const canProceedStep2 = username.length >= 2 && usernameStatus === 'available'

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-4 py-10">
      <Link href="https://clearwealthai.com" className="flex items-center gap-2 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gold flex items-center justify-center text-xl shadow-md">⚔️</div>
        <span className="font-serif font-black text-xl text-text1">Wealth Quest</span>
      </Link>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-6">
        {[1, 2, 3].map(s => (
          <div key={s} className={`h-2 rounded-full transition-all ${s === step ? 'w-8 bg-gold' : s < step ? 'w-4 bg-gold-dk' : 'w-4 bg-border'}`} />
        ))}
      </div>

      <div className="card w-full max-w-md">

        {/* STEP 1 — Email + Password */}
        {step === 1 && (
          <>
            <h1 className="font-serif font-black text-2xl text-text1 mb-1">Create your account</h1>
            <p className="text-text2 text-sm mb-6">Start your investing journey today.</p>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-bold text-text3 uppercase tracking-wider mb-1.5 block">Email</label>
                <input className="input" type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div>
                <label className="text-xs font-bold text-text3 uppercase tracking-wider mb-1.5 block">Password</label>
                <input className="input" type="password" placeholder="Min. 8 characters" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <button className="btn-gold w-full mt-2" onClick={() => { if (email && password.length >= 8) setStep(2) }}>
                Next →
              </button>
            </div>
          </>
        )}

        {/* STEP 2 — Username */}
        {step === 2 && (
          <>
            <h1 className="font-serif font-black text-2xl text-text1 mb-1">Choose your name</h1>
            <p className="text-text2 text-sm mb-6">This is how other adventurers will know you.</p>
            <div className="flex flex-col gap-3">

              {/* Input */}
              <div className="relative">
                <input
                  className={`input text-lg pr-10 transition-all ${
                    usernameStatus === 'available' ? 'border-green-400 focus:border-green-500' :
                    usernameStatus === 'taken' || usernameStatus === 'invalid' ? 'border-red-300 focus:border-red-400' :
                    ''
                  }`}
                  placeholder="e.g. WealthSeeker42"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  maxLength={24}
                />
                {/* Status icon */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-lg">
                  {usernameStatus === 'checking' && <span className="animate-spin inline-block">⏳</span>}
                  {usernameStatus === 'available' && <span>✅</span>}
                  {usernameStatus === 'taken' && <span>❌</span>}
                  {usernameStatus === 'invalid' && <span>⚠️</span>}
                </div>
              </div>

              {/* Status message */}
              {usernameStatus === 'available' && (
                <div className="flex items-center gap-2 text-sm text-green-700 bg-green-bg border border-green-bd rounded-xl px-3 py-2">
                  <span>✓</span> <strong>{username}</strong> is available!
                </div>
              )}
              {usernameStatus === 'taken' && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                  ❌ <strong>{username}</strong> is already taken.
                </div>
              )}
              {usernameStatus === 'invalid' && (
                <div className="text-sm text-orange-600 bg-orange-50 border border-orange-200 rounded-xl px-3 py-2">
                  ⚠️ Only letters, numbers and underscores allowed (2–24 chars).
                </div>
              )}

              {/* Suggestions */}
              {suggestions.length > 0 && (
                <div>
                  <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-2">Available alternatives:</div>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map(s => (
                      <button key={s} onClick={() => setUsername(s)}
                        className="px-3 py-1.5 rounded-full text-sm font-bold border-2 transition-all hover:border-gold-bd hover:bg-gold-bg border-border bg-bg3 text-text2">
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                className="btn-gold w-full mt-1 disabled:opacity-40 disabled:cursor-not-allowed"
                onClick={() => { if (canProceedStep2) setStep(3) }}
                disabled={!canProceedStep2}>
                {usernameStatus === 'checking' ? 'Checking...' : 'Next →'}
              </button>
              <button className="btn-ghost w-full" onClick={() => setStep(1)}>← Back</button>
            </div>
          </>
        )}

        {/* STEP 3 — Class */}
        {step === 3 && (
          <>
            <h1 className="font-serif font-black text-2xl text-text1 mb-1">Choose your class</h1>
            <p className="text-text2 text-sm mb-4">Your class shapes your investing style.</p>

            {/* Username preview */}
            <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-xl bg-gold-bg border border-gold-bd">
              <span className="text-lg">{CLASSES[selectedClass].icon}</span>
              <span className="font-bold text-sm text-gold-dk">{username}</span>
              <span className="text-xs text-text3 ml-auto">Your username</span>
            </div>

            <div className="flex flex-col gap-3 mb-5">
              {CLASSES.map((cls, i) => (
                <div key={i} onClick={() => setSelectedClass(i)}
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${selectedClass === i ? 'border-gold bg-gold-bg' : 'border-border bg-white hover:border-gold-bd'}`}>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{cls.icon}</div>
                    <div className="flex-1">
                      <div className="font-bold text-text1 text-sm">{cls.name}</div>
                      <div className="text-text2 text-xs mt-0.5">{cls.desc}</div>
                      <div className="text-gold-dk text-xs font-semibold mt-1">{cls.trait}</div>
                    </div>
                    {selectedClass === i && <div className="w-5 h-5 rounded-full bg-gold flex items-center justify-center text-white text-xs">✓</div>}
                  </div>
                </div>
              ))}
            </div>

            {error && <p className="text-red-500 text-sm bg-red-50 rounded-xl px-4 py-3 mb-4">{error}</p>}

            <button className="btn-gold w-full" onClick={handleRegister} disabled={loading}>
              {loading ? 'Creating your quest...' : 'Begin Your Journey ⚔️'}
            </button>
            <button className="btn-ghost w-full mt-3" onClick={() => setStep(2)}>← Back</button>
          </>
        )}
      </div>

      <p className="mt-4 text-sm text-text2">
        Already have an account?{' '}
        <Link href="/login" className="text-gold-dk font-bold hover:underline">Sign in</Link>
      </p>
    </div>
  )
}

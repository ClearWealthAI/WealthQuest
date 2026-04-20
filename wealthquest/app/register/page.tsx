'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const CLASSES = [
  { icon: '🛡️', name: 'The Guardian', desc: 'Slow and steady. You protect your wealth before chasing big returns.', trait: '+ Bonus XP on risk management quests' },
  { icon: '⚖️', name: 'The Strategist', desc: 'Balanced growth with calculated risks. The most popular class.', trait: '+ Bonus XP on portfolio quests' },
  { icon: '🚀', name: 'The Trailblazer', desc: 'High risk, high reward. You chase aggressive long-term growth.', trait: '+ Bonus XP on growth quests' },
]

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [selectedClass, setSelectedClass] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleRegister() {
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
        level: 1, xp: 0, gold: 0, completed_quests: []
      })
    }
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-4 py-10">
      <Link href="https://clearwealthai.com" className="flex items-center gap-2 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gold flex items-center justify-center text-xl shadow-md">⚔️</div>
        <span className="font-serif font-black text-xl text-text1">Wealth Quest</span>
      </Link>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-6">
        {[1,2,3].map(s => (
          <div key={s} className={`h-2 rounded-full transition-all ${s === step ? 'w-8 bg-gold' : s < step ? 'w-4 bg-gold-dk' : 'w-4 bg-border'}`} />
        ))}
      </div>

      <div className="card w-full max-w-md">
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
              <button className="btn-gold w-full mt-2" onClick={() => { if(email && password.length >= 8) setStep(2) }}>
                Next →
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="font-serif font-black text-2xl text-text1 mb-1">Choose your name</h1>
            <p className="text-text2 text-sm mb-6">This is how other adventurers will know you.</p>
            <div className="flex flex-col gap-4">
              <input className="input text-lg" placeholder="e.g. WealthSeeker42" value={username} onChange={e => setUsername(e.target.value)} maxLength={24} />
              <button className="btn-gold w-full" onClick={() => { if(username.length >= 2) setStep(3) }}>
                Next →
              </button>
              <button className="btn-ghost w-full" onClick={() => setStep(1)}>← Back</button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h1 className="font-serif font-black text-2xl text-text1 mb-1">Choose your class</h1>
            <p className="text-text2 text-sm mb-4">Your class shapes your investing style.</p>
            <div className="flex flex-col gap-3 mb-5">
              {CLASSES.map((cls, i) => (
                <div key={i} onClick={() => setSelectedClass(i)}
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${selectedClass === i ? 'border-gold bg-gold-bg' : 'border-border bg-white hover:border-border'}`}>
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

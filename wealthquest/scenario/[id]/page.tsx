'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { XP_PER_LEVEL } from '@/lib/quests'

// ─── SCENARIO QUEST DATA ──────────────────────────────────────────────────────

const BIAS_COLORS: Record<string, string> = {
  'Loss Aversion': '#E8453A',
  'Panic Selling': '#E8453A',
  'FOMO': '#9B59B6',
  'Recency Bias': '#9B59B6',
  'Overconfidence': '#E8A820',
  'Disciplined': '#3A9E5C',
  'Contrarian Thinking': '#3B7AD8',
  'Decision Paralysis': '#E8A820',
  'Reactive Selling': '#E8453A',
  'Bear Market Psychology': '#3B7AD8',
  'DCA Power': '#3A9E5C',
}

type Choice = {
  id: string
  label: string
  icon: string
  desc: string
  isOptimal: boolean
  biasLabel: string
  consequence: string
  portfolioImpact: number // % change
  timeframe: string
  aldricFeedback: string
  emotionalLabel: string
}

type ScenarioQuest = {
  id: string
  title: string
  skill: string
  skillLevel: number
  difficulty: 1 | 2 | 3
  xpReward: number
  goldReward: number
  situation: string
  portfolioSnapshot: { label: string; pct: number; color: string }[]
  portfolioValue: number
  question: string
  choices: Choice[]
  reflection: string
  statFact: string
  aldricOpening: string
  skillUnlocked: string
}

const SCENARIO_QUESTS: ScenarioQuest[] = [
  {
    id: 'sq1',
    title: 'Crash Day',
    skill: 'Behavioral Biases',
    skillLevel: 1,
    difficulty: 1,
    xpReward: 80,
    goldReward: 20,
    situation: 'It\'s Monday morning. The DAX drops 6% on surprise inflation data. Social media is full of "SELL EVERYTHING" posts. Your portfolio is down €1,840 today.',
    portfolioValue: 28160,
    portfolioSnapshot: [
      { label: 'MSCI World ETF', pct: 60, color: '#3A9E5C' },
      { label: 'Emerging Markets', pct: 20, color: '#3B7AD8' },
      { label: 'Cash', pct: 20, color: '#A89E90' },
    ],
    question: 'Markets are falling fast. What do you do?',
    aldricOpening: 'The market is testing your discipline today — not your knowledge. Take a breath before you decide.',
    choices: [
      {
        id: 'sell_all',
        label: 'Sell Everything',
        icon: '🏃',
        desc: 'Convert to cash and stop the bleeding',
        isOptimal: false,
        biasLabel: 'Panic Selling',
        consequence: 'Markets recover +9% over the next 3 weeks. You are out. The €1,840 paper loss becomes a permanent real loss — plus you miss the recovery.',
        portfolioImpact: -6.5,
        timeframe: '3 weeks later',
        aldricFeedback: 'You did what 72% of beginners do — and it cost you. The pain of loss felt so real that selling felt like relief. But you converted a temporary paper loss into a permanent real one. Markets always recover from 6% drops. Always.',
        emotionalLabel: 'Panic Selling · Loss Aversion',
      },
      {
        id: 'hold',
        label: 'Hold My Plan',
        icon: '🧘',
        desc: 'Do nothing. Stay the course.',
        isOptimal: true,
        biasLabel: 'Disciplined',
        consequence: 'Markets recover in 3 weeks. Your portfolio is back above where it started — plus €420. You did nothing and won.',
        portfolioImpact: +1.5,
        timeframe: '6 weeks later',
        aldricFeedback: 'Excellent discipline. Doing nothing during a crash is one of the hardest — and most rewarding — decisions in investing. Only 28% of investors hold here. You are in rare company.',
        emotionalLabel: 'Disciplined Investor',
      },
      {
        id: 'buy_more',
        label: 'Buy More',
        icon: '💪',
        desc: 'Use cash to buy ETFs at a discount',
        isOptimal: true,
        biasLabel: 'Contrarian Thinking',
        consequence: 'You buy at the low. Markets recover +9%. Your additional shares amplify the gains. Portfolio is +€890 above your starting point.',
        portfolioImpact: +3.2,
        timeframe: '6 weeks later',
        aldricFeedback: 'Be greedy when others are fearful. You just did what Warren Buffett recommends — bought when everyone else was panicking. This is the mindset that builds generational wealth.',
        emotionalLabel: 'Contrarian Thinking',
      },
    ],
    reflection: 'A 6% single-day drop feels catastrophic emotionally. Statistically, it is normal. The MSCI World has experienced 200+ single-day drops of 5% or more since 1970 — and recovered from every single one.',
    statFact: '72% of retail investors sell during the first major crash they experience.',
    skillUnlocked: 'Loss Aversion Recognition',
  },
  {
    id: 'sq2',
    title: 'The FOMO Trap',
    skill: 'Behavioral Biases',
    skillLevel: 1,
    difficulty: 1,
    xpReward: 80,
    goldReward: 20,
    situation: 'Nvidia is up +34% this week. Your friend invested €5,000 and made €1,700. Your boring MSCI World ETF is up just +1.2% this week.',
    portfolioValue: 24120,
    portfolioSnapshot: [
      { label: 'MSCI World ETF', pct: 80, color: '#3A9E5C' },
      { label: 'Cash', pct: 20, color: '#A89E90' },
    ],
    question: 'Your friend is getting rich on Nvidia. What do you do?',
    aldricOpening: 'Your friend\'s gains feel very real right now. Remember: your MSCI World already holds Nvidia. The question is how much concentration risk you want.',
    choices: [
      {
        id: 'buy_nvidia',
        label: 'Buy Nvidia with Cash',
        icon: '🎰',
        desc: 'Put €3,000 into Nvidia — I want in',
        isOptimal: false,
        biasLabel: 'FOMO',
        consequence: 'Nvidia corrects -28% over the next 4 weeks. You bought the top. Loss: €840. Meanwhile your MSCI World keeps growing steadily.',
        portfolioImpact: -3.5,
        timeframe: '4 weeks later',
        aldricFeedback: 'You bought at the exact top — which is what FOMO investing almost always does. Your friend got lucky on timing. You got the painful lesson. The good news: you learned this with simulated money, not real euros.',
        emotionalLabel: 'FOMO · Recency Bias',
      },
      {
        id: 'stay_course',
        label: 'Stay With My ETF',
        icon: '🧭',
        desc: 'My MSCI World already holds Nvidia',
        isOptimal: true,
        biasLabel: 'Disciplined',
        consequence: 'Nvidia corrects -28%. Your friend loses €1,400 of his gains. Your MSCI World continues its steady climb. You are €840 ahead of where you would have been.',
        portfolioImpact: +0.8,
        timeframe: '4 weeks later',
        aldricFeedback: 'Perfect thinking. Your MSCI World holds Nvidia at approximately 3.5% weight — you captured the upside without the concentration risk. This is exactly how smart investors think.',
        emotionalLabel: 'Disciplined · Long-term Thinking',
      },
      {
        id: 'wait',
        label: 'Wait and Watch',
        icon: '👀',
        desc: 'Keep cash, see what happens',
        isOptimal: false,
        biasLabel: 'Decision Paralysis',
        consequence: 'Nvidia corrects -28%. You correctly avoided the trap. But your cash earned nothing while your ETF could have grown. Paralysis has a cost too.',
        portfolioImpact: -0.5,
        timeframe: '4 weeks later',
        aldricFeedback: 'You avoided the FOMO trap — well done. But cash sitting idle is not a neutral decision. It loses real value to inflation every day. Inaction is also a choice with consequences.',
        emotionalLabel: 'Decision Paralysis',
      },
    ],
    reflection: 'FOMO investing costs the average investor 3.2% in annual returns. Your MSCI World ETF holds Nvidia, Apple, Microsoft and 1,597 other companies — you already own the winners without the concentration risk.',
    statFact: 'Investors who chase last month\'s top performer underperform the index by an average of 3.8% annually.',
    skillUnlocked: 'FOMO Recognition',
  },
  {
    id: 'sq3',
    title: 'The Rate Hike',
    skill: 'Market Understanding',
    skillLevel: 1,
    difficulty: 2,
    xpReward: 100,
    goldReward: 25,
    situation: 'The ECB raises rates by 0.75% — a surprise. Bonds fall -4% instantly. Stocks fall -3%. Only your cash position is safe today.',
    portfolioValue: 31750,
    portfolioSnapshot: [
      { label: 'MSCI World ETF', pct: 70, color: '#3A9E5C' },
      { label: 'Global Bonds', pct: 15, color: '#9B59B6' },
      { label: 'Cash', pct: 15, color: '#A89E90' },
    ],
    question: 'Interest rates just surged. Your bonds are falling. What do you do?',
    aldricOpening: 'Interest rates and bond prices move in opposite directions — that is mathematics, not opinion. The question is: what do you do with that knowledge right now?',
    choices: [
      {
        id: 'sell_bonds',
        label: 'Sell Bonds Now',
        icon: '❌',
        desc: 'Cut losses — bonds will keep falling',
        isOptimal: false,
        biasLabel: 'Reactive Selling',
        consequence: 'Rates stabilise after 6 weeks. Bonds recover +3%. You sold at the bottom. You realised the loss AND missed the recovery. Net result: -7% on your bond position.',
        portfolioImpact: -1.1,
        timeframe: '6 weeks later',
        aldricFeedback: 'Selling bonds after the rate hike already happened means you sold after the damage was done. The market had already priced in the hike. By selling, you turned a temporary unrealised loss into a permanent real one.',
        emotionalLabel: 'Reactive Selling · Hindsight Bias',
      },
      {
        id: 'hold_bonds',
        label: 'Hold Everything',
        icon: '📊',
        desc: 'My diversified portfolio can absorb this',
        isOptimal: true,
        biasLabel: 'Disciplined',
        consequence: 'Rates stabilise. Bonds recover +3% over 3 months. Stocks rise +7%. Your diversified portfolio absorbed the shock exactly as designed.',
        portfolioImpact: +2.1,
        timeframe: '6 months later',
        aldricFeedback: 'Your portfolio was built for exactly this moment. Bonds fell — but they cushioned your equity exposure. Stocks recovered. This is why diversification exists. You did not need to do anything.',
        emotionalLabel: 'Disciplined · Macro Aware',
      },
      {
        id: 'buy_stocks',
        label: 'Shift Cash to Stocks',
        icon: '📈',
        desc: 'Stocks are cheaper — buy more equities',
        isOptimal: true,
        biasLabel: 'Contrarian Thinking',
        consequence: 'Stocks fall another -5% before recovering. Your timing was early — but your thinking was right. Over 6 months: +9% on the additional equity position.',
        portfolioImpact: +1.8,
        timeframe: '6 months later',
        aldricFeedback: 'Good instinct — stocks often present opportunities during rate shock events. Your timing was slightly early, but the long-term thinking was correct. Tactical reallocation during macro events is an advanced skill you are developing.',
        emotionalLabel: 'Contrarian · Macro Understanding',
      },
    ],
    reflection: 'When interest rates rise, existing bond prices fall — because newer bonds pay higher rates, making old bonds less attractive. This is not a crisis. It is mechanics. Bonds still play their role: they fell less than stocks and will recover.',
    statFact: 'After rate hike events, investors who sold bonds missed an average +4.2% recovery within 6 months.',
    skillUnlocked: 'Interest Rate Mechanics',
  },
  {
    id: 'sq4',
    title: 'The Windfall',
    skill: 'Portfolio Construction',
    skillLevel: 1,
    difficulty: 2,
    xpReward: 100,
    goldReward: 25,
    situation: 'You unexpectedly inherit €15,000. Everyone has advice: your father says gold, your friend says Bitcoin, your bank advisor pushes their active fund charging 1.8% TER.',
    portfolioValue: 15000,
    portfolioSnapshot: [
      { label: 'Cash (inherited)', pct: 100, color: '#A89E90' },
    ],
    question: 'You have €15,000 to invest. What is your move?',
    aldricOpening: 'Sudden money creates sudden pressure to act perfectly. There is no perfect. There is only evidence-based and disciplined.',
    choices: [
      {
        id: 'lump_sum',
        label: 'Invest All Now (Lump Sum)',
        icon: '🚀',
        desc: 'Put all €15,000 into MSCI World ETF immediately',
        isOptimal: true,
        biasLabel: 'Evidence-Based',
        consequence: 'Markets rise +11% over 12 months. Your full €15,000 compounds from day one. Final value: €16,650. Lump sum wins again — as it does in 68% of cases.',
        portfolioImpact: +11,
        timeframe: '12 months later',
        aldricFeedback: 'Statistically the right call. Vanguard research shows lump sum investing beats DCA in approximately 2 out of 3 cases — because markets trend upward over time. Every day you wait costs you expected return.',
        emotionalLabel: 'Evidence-Based · Time In Market',
      },
      {
        id: 'dca',
        label: 'Invest €1,250/Month (DCA)',
        icon: '📅',
        desc: 'Spread over 12 months to reduce timing risk',
        isOptimal: true,
        biasLabel: 'Disciplined',
        consequence: 'Markets rise +11%. You catch some of the gain but miss some early appreciation. Final value: €16,180 — slightly less than lump sum, but you slept better.',
        portfolioImpact: +7.9,
        timeframe: '12 months later',
        aldricFeedback: 'Psychologically sound. DCA reduces the fear of bad timing and is completely valid — especially for large windfalls that feel emotionally significant. The best strategy is the one you can emotionally sustain.',
        emotionalLabel: 'Disciplined · Risk Aware',
      },
      {
        id: 'wait',
        label: 'Wait for a Correction',
        icon: '⏳',
        desc: 'Hold cash until markets dip, then invest',
        isOptimal: false,
        biasLabel: 'Market Timing',
        consequence: 'Markets rise +11% without a significant correction. You wait 12 months. Your cash loses 3% to inflation. You invest at +11% higher prices. Cost of waiting: €1,650 + inflation loss.',
        portfolioImpact: -3,
        timeframe: '12 months later',
        aldricFeedback: 'Waiting for a correction that may never come — or that comes in 5 years — is market timing. It almost never works. The market is up approximately 75% of all calendar years. Waiting costs real money.',
        emotionalLabel: 'Market Timing · Decision Paralysis',
      },
      {
        id: 'bank_fund',
        label: 'Take the Bank\'s Active Fund',
        icon: '🏦',
        desc: 'The advisor seems professional and trustworthy',
        isOptimal: false,
        biasLabel: 'Authority Bias',
        consequence: 'The active fund underperforms the MSCI World by -2.3% annually after its 1.8% TER. Over 30 years: €15,000 becomes €58,000 vs €112,000 in a simple ETF. Cost: €54,000.',
        portfolioImpact: -2.3,
        timeframe: '30 years later',
        aldricFeedback: 'The advisor is selling a product, not giving advice. A 1.8% TER on €15,000 over 30 years destroys €54,000 in wealth — silently, invisibly, every year. Always check the TER before you sign anything.',
        emotionalLabel: 'Authority Bias · Fee Blindness',
      },
    ],
    reflection: 'Lump sum vs DCA is not a moral question — it is a mathematical one. Lump sum wins in 68% of cases. But the best choice is the one you will not abandon during the first market dip.',
    statFact: 'Active funds with TERs above 1.5% underperform simple index ETFs in over 90% of 15-year periods.',
    skillUnlocked: 'Lump Sum vs DCA · Fee Impact',
  },
  {
    id: 'sq5',
    title: 'The Long Winter',
    skill: 'Behavioral Biases',
    skillLevel: 2,
    difficulty: 3,
    xpReward: 120,
    goldReward: 30,
    situation: 'Month 14 of a bear market. Your portfolio is -31% from its peak. Every financial news headline screams recession. You have been investing €300/month the entire time. You are down €9,300 on paper.',
    portfolioValue: 20700,
    portfolioSnapshot: [
      { label: 'MSCI World ETF', pct: 85, color: '#3A9E5C' },
      { label: 'Cash', pct: 15, color: '#A89E90' },
    ],
    question: 'Month 14. Still no recovery in sight. What do you do with your €300/month savings plan?',
    aldricOpening: 'You have survived 14 months of pain. What you do right now — at the moment of maximum despair — will define your long-term results more than any other single decision.',
    choices: [
      {
        id: 'pause',
        label: 'Pause the Savings Plan',
        icon: '⏸️',
        desc: 'Stop investing until markets recover',
        isOptimal: false,
        biasLabel: 'Bear Market Capitulation',
        consequence: 'You paused at the bottom. Markets recover +48% over the next 18 months. You missed buying 14+ months of the cheapest prices in years. Opportunity cost: €11,400 in foregone gains.',
        portfolioImpact: -15,
        timeframe: '18 months later',
        aldricFeedback: 'You paused at exactly the wrong moment. Your €300/month was buying more shares than ever before — at 31% discount. By pausing, you stopped accumulating the cheap shares that would have driven enormous gains in the recovery.',
        emotionalLabel: 'Capitulation · Anchoring Bias',
      },
      {
        id: 'continue',
        label: 'Keep Investing €300/Month',
        icon: '💪',
        desc: 'Stay the course — this is the plan',
        isOptimal: true,
        biasLabel: 'Disciplined',
        consequence: 'You kept buying through the bottom. Recovery: +48% over 18 months. Your consistent buying at -31% prices amplifies your gains dramatically. Portfolio far exceeds previous peak.',
        portfolioImpact: +22,
        timeframe: '18 months later',
        aldricFeedback: 'This is what separates wealthy investors from average ones. Month 14 of a bear market is when most people quit — and when the most important buying happens. Every €300 you invested during this period generated outsized returns in the recovery.',
        emotionalLabel: 'Disciplined · DCA Power',
      },
      {
        id: 'double',
        label: 'Double to €600/Month',
        icon: '🔥',
        desc: 'Everything is on sale — buy more',
        isOptimal: true,
        biasLabel: 'Contrarian Thinking',
        consequence: 'You maximised buying at the bottom. Recovery: +48%. Your aggressive accumulation during the bear market generates extraordinary gains. Portfolio is your best performing period ever.',
        portfolioImpact: +38,
        timeframe: '18 months later',
        aldricFeedback: 'This is the rarest and most powerful investor behaviour: doubling down at maximum pain. If you had the cash flow to support it, this was optimal. Bear markets are the greatest transfer of wealth from the impatient to the patient.',
        emotionalLabel: 'Contrarian · Conviction Investing',
      },
    ],
    reflection: 'A bear market for a savings plan investor is not a threat — it is an opportunity. Every €300 buys 31% more shares than it did at the peak. The investors who kept buying through 2008 and 2020 achieved their best long-term returns.',
    statFact: 'Investors who paused their savings plans during the 2020 COVID crash missed an average of 48% recovery gains in the following 12 months.',
    skillUnlocked: 'Bear Market Psychology · DCA Power',
  },
]

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

type Phase = 'intro' | 'decision' | 'consequence' | 'reflection' | 'rebuild' | 'complete'

export default function ScenarioQuestPage() {
  const router = useRouter()
  const params = useParams()
  const questId = params.id as string
  const quest = SCENARIO_QUESTS.find(q => q.id === questId)

  const [phase, setPhase] = useState<Phase>('intro')
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null)
  const [rebuiltChoice, setRebuiltChoice] = useState<Choice | null>(null)
  const [profile, setProfile] = useState<any>(null)
  const [saving, setSaving] = useState(false)
  const [showAldric, setShowAldric] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/login'); return }
      const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single()
      setProfile(data)
    }
    load()
  }, [router])

  if (!quest) return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-3">🗺️</div>
        <div className="font-bold text-text1 mb-2">Quest not found</div>
        <button onClick={() => router.push('/dashboard')} className="btn-gold">← Dashboard</button>
      </div>
    </div>
  )

  async function handleComplete() {
    if (!profile || saving) return
    setSaving(true)
    const newXp = profile.xp + quest!.xpReward
    const newGold = profile.gold + quest!.goldReward
    const newLevel = newXp >= profile.level * XP_PER_LEVEL ? profile.level + 1 : profile.level
    await supabase.from('profiles').update({ xp: newXp, gold: newGold, level: newLevel }).eq('id', profile.id)
    setProfile({ ...profile, xp: newXp, gold: newGold, level: newLevel })
    setSaving(false)
    setPhase('complete')
  }

  const difficulty = ['', '⭐', '⭐⭐', '⭐⭐⭐'][quest.difficulty]

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border px-4 py-3 flex items-center gap-3">
        <button onClick={() => router.push('/dashboard')} className="text-text2 text-sm font-semibold hover:text-text1">← Back</button>
        <div className="flex-1 text-center">
          <div className="text-xs font-bold text-text3 uppercase tracking-widest">Scenario Quest</div>
          <div className="font-bold text-sm text-text1 truncate">{quest.title}</div>
        </div>
        <div className="text-xs font-bold text-gold-dk">{difficulty}</div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 pb-12">

        {/* PHASE: INTRO */}
        {phase === 'intro' && (
          <div className="flex flex-col gap-4">
            {/* Skill badge */}
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 rounded-full text-xs font-bold border"
                style={{ background: '#EEF4FF', borderColor: '#B8D0FF', color: '#3B7AD8' }}>
                {quest.skill} · Level {quest.skillLevel}
              </div>
              <div className="text-xs text-text3">{difficulty} Difficulty</div>
            </div>

            {/* Situation card */}
            <div className="rounded-2xl overflow-hidden border border-border"
              style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)' }}>
              <div className="px-4 py-2 flex items-center gap-2"
                style={{ background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-white/60">Breaking Situation</span>
              </div>
              <div className="p-5">
                <p className="text-white/90 text-sm leading-relaxed">{quest.situation}</p>
              </div>
            </div>

            {/* Portfolio snapshot */}
            <div className="card p-4">
              <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">Your Portfolio</div>
              <div className="text-2xl font-black text-text1 mb-3">
                €{quest.portfolioValue.toLocaleString('de-DE')}
              </div>
              <div className="flex h-4 rounded-full overflow-hidden mb-3">
                {quest.portfolioSnapshot.map((s, i) => (
                  <div key={i} style={{ width: `${s.pct}%`, background: s.color }} />
                ))}
              </div>
              <div className="flex gap-3 flex-wrap">
                {quest.portfolioSnapshot.map((s, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-text2">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
                    {s.label} {s.pct}%
                  </div>
                ))}
              </div>
            </div>

            {/* Aldric hint */}
            {showAldric && (
              <div className="flex items-start gap-3 p-4 rounded-2xl"
                style={{ background: '#FFFEF8', border: '1.5px solid #F5D478' }}>
                <div className="w-10 h-10 rounded-full bg-gold-bg border-2 border-gold-bd flex items-center justify-center text-xl flex-shrink-0">🧙</div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-gold-dk mb-1">Aldric</div>
                  <p className="text-sm text-text2 italic leading-relaxed">"{quest.aldricOpening}"</p>
                </div>
                <button onClick={() => setShowAldric(false)} className="text-text3 text-xs">✕</button>
              </div>
            )}

            <button onClick={() => setPhase('decision')}
              className="w-full py-4 rounded-2xl font-black text-base text-[#1A1200] transition-all active:scale-95"
              style={{ background: 'linear-gradient(135deg, #c4870a, #E8A820)', boxShadow: '0 4px 20px rgba(232,168,32,0.4)' }}>
              Make Your Decision →
            </button>
          </div>
        )}

        {/* PHASE: DECISION */}
        {phase === 'decision' && (
          <div className="flex flex-col gap-4">
            <div className="text-center">
              <div className="text-xs font-bold text-text3 uppercase tracking-widest mb-1">Your Decision</div>
              <h2 className="font-bold text-lg text-text1 leading-snug">{quest.question}</h2>
            </div>

            {/* Portfolio reminder */}
            <div className="rounded-xl p-3 text-xs text-text2 border border-border bg-bg3">
              💼 Portfolio: {quest.portfolioSnapshot.map(s => `${s.pct}% ${s.label}`).join(' · ')}
            </div>

            <div className="flex flex-col gap-3">
              {quest.choices.map((choice) => (
                <button key={choice.id}
                  onClick={() => { setSelectedChoice(choice); setPhase('consequence') }}
                  className="text-left p-4 rounded-2xl border-2 transition-all active:scale-[0.98] hover:shadow-md"
                  style={{ borderColor: '#E4E0D8', background: '#fff' }}>
                  <div className="flex items-start gap-3">
                    <span className="text-3xl flex-shrink-0">{choice.icon}</span>
                    <div className="flex-1">
                      <div className="font-bold text-text1 mb-0.5">{choice.label}</div>
                      <div className="text-sm text-text2">{choice.desc}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <p className="text-xs text-center text-text3">Choose carefully — there are real consequences either way.</p>
          </div>
        )}

        {/* PHASE: CONSEQUENCE */}
        {phase === 'consequence' && selectedChoice && (
          <div className="flex flex-col gap-4">
            {/* Result header */}
            <div className={`rounded-2xl p-5 text-center ${selectedChoice.isOptimal ? 'bg-gradient-to-br from-green-900 to-green-700' : 'bg-gradient-to-br from-red-900 to-red-800'}`}>
              <div className="text-5xl mb-3">{selectedChoice.isOptimal ? '✅' : '📉'}</div>
              <div className="font-bold text-white/60 text-sm mb-1">You chose: {selectedChoice.label}</div>
              <div className="font-black text-white text-xl">
                {selectedChoice.isOptimal ? 'Good Decision' : 'Costly Mistake'}
              </div>
              <div className="mt-3 inline-block px-3 py-1 rounded-full text-xs font-bold"
                style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.8)' }}>
                {selectedChoice.emotionalLabel}
              </div>
            </div>

            {/* What happened */}
            <div className="card p-4">
              <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-2">⏱ {selectedChoice.timeframe}</div>
              <p className="text-sm text-text2 leading-relaxed mb-3">{selectedChoice.consequence}</p>

              {/* Portfolio impact */}
              <div className={`flex items-center gap-3 p-3 rounded-xl ${selectedChoice.portfolioImpact >= 0 ? 'bg-green-bg border border-green-bd' : 'bg-red-50 border border-red-200'}`}>
                <div className="text-2xl">{selectedChoice.portfolioImpact >= 0 ? '📈' : '📉'}</div>
                <div>
                  <div className={`font-black text-lg ${selectedChoice.portfolioImpact >= 0 ? 'text-green-700' : 'text-red-600'}`}>
                    {selectedChoice.portfolioImpact >= 0 ? '+' : ''}{selectedChoice.portfolioImpact}%
                  </div>
                  <div className="text-xs text-text3">Portfolio impact</div>
                </div>
              </div>
            </div>

            {/* Aldric feedback */}
            <div className="rounded-2xl p-4"
              style={{ background: selectedChoice.isOptimal ? '#EDFAF2' : '#FFF0F0', border: `1.5px solid ${selectedChoice.isOptimal ? '#88D4A4' : '#F5A0A0'}` }}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-white border-2 border-gold-bd flex items-center justify-center text-xl flex-shrink-0">🧙</div>
                <div>
                  <div className="text-xs font-bold mb-1" style={{ color: selectedChoice.isOptimal ? '#2d7a45' : '#c0392b' }}>Aldric says:</div>
                  <p className="text-sm leading-relaxed" style={{ color: selectedChoice.isOptimal ? '#2d7a45' : '#c0392b' }}>
                    "{selectedChoice.aldricFeedback}"
                  </p>
                </div>
              </div>
            </div>

            <button onClick={() => setPhase('reflection')}
              className="w-full py-3 rounded-2xl font-black text-sm text-white transition-all active:scale-95"
              style={{ background: 'linear-gradient(135deg, #1a3a50, #2a5a78)' }}>
              See the Full Picture →
            </button>
          </div>
        )}

        {/* PHASE: REFLECTION */}
        {phase === 'reflection' && selectedChoice && (
          <div className="flex flex-col gap-4">
            <div className="text-center">
              <div className="text-3xl mb-2">🧠</div>
              <div className="font-bold text-lg text-text1">The Investor Mindset</div>
              <div className="text-sm text-text2">What this situation teaches you</div>
            </div>

            {/* Reflection */}
            <div className="card p-4 border-l-4 border-gold">
              <div className="text-xs font-bold text-gold-dk uppercase tracking-wider mb-2">💡 Key Insight</div>
              <p className="text-sm text-text2 leading-relaxed">{quest.reflection}</p>
            </div>

            {/* Stat fact */}
            <div className="rounded-2xl p-4"
              style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'rgba(245,188,56,0.7)' }}>📊 Data Point</div>
              <p className="text-sm text-white/80 leading-relaxed">{quest.statFact}</p>
            </div>

            {/* All outcomes comparison */}
            <div className="card p-4">
              <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">All Outcomes Compared</div>
              <div className="flex flex-col gap-2">
                {quest.choices.map(choice => (
                  <div key={choice.id} className={`flex items-center gap-3 p-3 rounded-xl border ${selectedChoice.id === choice.id ? 'border-gold-bd bg-gold-bg' : 'border-border bg-bg3'}`}>
                    <span className="text-xl">{choice.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-xs text-text1">{choice.label}</div>
                      <div className="text-[10px] text-text3 truncate">{choice.emotionalLabel}</div>
                    </div>
                    <div className={`font-black text-sm flex-shrink-0 ${choice.portfolioImpact >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                      {choice.portfolioImpact >= 0 ? '+' : ''}{choice.portfolioImpact}%
                    </div>
                    {selectedChoice.id === choice.id && <div className="text-gold-dk text-xs">← you</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* Skill unlocked */}
            <div className="rounded-xl p-3 flex items-center gap-3"
              style={{ background: '#EEF4FF', border: '1.5px solid #B8D0FF' }}>
              <div className="text-2xl">🔓</div>
              <div>
                <div className="text-xs font-bold text-blue-700">Skill Unlocked</div>
                <div className="text-sm font-bold text-text1">{quest.skillUnlocked}</div>
              </div>
            </div>

            {/* Rebuild option */}
            {!selectedChoice.isOptimal && (
              <button onClick={() => setPhase('rebuild')}
                className="w-full py-3 rounded-2xl font-black text-sm text-white transition-all active:scale-95"
                style={{ background: 'linear-gradient(135deg, #c4870a, #E8A820)', color: '#1A1200' }}>
                🔄 Try Again With New Knowledge →
              </button>
            )}

            <button onClick={handleComplete}
              className={`w-full py-3 rounded-2xl font-black text-sm transition-all active:scale-95 ${selectedChoice.isOptimal ? 'text-white' : 'bg-bg3 text-text2 border border-border'}`}
              style={selectedChoice.isOptimal ? { background: 'linear-gradient(135deg, #2d7a45, #3A9E5C)' } : {}}>
              {saving ? 'Saving...' : selectedChoice.isOptimal ? `✅ Complete → +${quest.xpReward} XP · +${quest.goldReward} 🪙` : 'Complete Quest'}
            </button>
          </div>
        )}

        {/* PHASE: REBUILD */}
        {phase === 'rebuild' && (
          <div className="flex flex-col gap-4">
            <div className="text-center">
              <div className="text-3xl mb-2">🔄</div>
              <div className="font-bold text-lg text-text1">Rebuild Your Decision</div>
              <div className="text-sm text-text2">Now that you know the outcome — what would you do?</div>
            </div>

            {/* Reminder of situation */}
            <div className="rounded-xl p-3 bg-bg3 border border-border text-sm text-text2">
              {quest.situation}
            </div>

            <div className="flex flex-col gap-3">
              {quest.choices.map((choice) => (
                <button key={choice.id}
                  onClick={() => { setRebuiltChoice(choice); handleComplete() }}
                  className={`text-left p-4 rounded-2xl border-2 transition-all active:scale-[0.98] ${choice.isOptimal ? 'border-green-bd bg-green-bg hover:shadow-md' : 'border-border bg-white hover:border-gold-bd'}`}>
                  <div className="flex items-start gap-3">
                    <span className="text-3xl flex-shrink-0">{choice.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="font-bold text-text1">{choice.label}</div>
                        {choice.isOptimal && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-green-600 text-white">Optimal</span>}
                      </div>
                      <div className="text-sm text-text2">{choice.desc}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* PHASE: COMPLETE */}
        {phase === 'complete' && (
          <div className="flex flex-col gap-4 text-center">
            <div className="text-7xl mb-2">🎉</div>
            <div className="font-black text-2xl text-text1">Scenario Complete!</div>
            <div className="text-text2 text-sm">+{quest.xpReward} XP · +{quest.goldReward} 🪙 earned</div>

            <div className="card p-4 text-left">
              <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-2">What you learned</div>
              <div className="flex items-center gap-2 mb-2">
                <div className="text-xl">🔓</div>
                <div className="font-bold text-sm text-text1">{quest.skillUnlocked}</div>
              </div>
              <p className="text-xs text-text2">{quest.reflection}</p>
            </div>

            <div className="flex flex-col gap-2">
              {/* Next scenario */}
              {SCENARIO_QUESTS.findIndex(q => q.id === quest.id) < SCENARIO_QUESTS.length - 1 && (() => {
                const nextIdx = SCENARIO_QUESTS.findIndex(q => q.id === quest.id) + 1
                const next = SCENARIO_QUESTS[nextIdx]
                return (
                  <button onClick={() => router.push(`/scenario/${next.id}`)}
                    className="w-full py-3 rounded-2xl font-black text-sm text-[#1A1200] transition-all active:scale-95"
                    style={{ background: 'linear-gradient(135deg, #c4870a, #E8A820)' }}>
                    Next Scenario: {next.title} →
                  </button>
                )
              })()}
              <button onClick={() => router.push('/dashboard')}
                className="w-full py-3 rounded-2xl font-bold text-sm bg-bg3 text-text2 border border-border">
                🏠 Dashboard
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

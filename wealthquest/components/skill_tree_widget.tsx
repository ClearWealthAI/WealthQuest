'use client'
import { useState } from 'react'
import { SKILLS, getSkillProgress, DIFFICULTY_CONFIG } from '@/lib/skill_tree'
import { getDominantIdentity, getIdentityBreakdown } from '@/lib/identity_system'

// ─── IDENTITY CARD ─────────────────────────────────────────────────────────────

export function IdentityCard({ completedQuests }: { completedQuests: number[] }) {
  const [expanded, setExpanded] = useState(false)
  const dominant = getDominantIdentity()
  const breakdown = getIdentityBreakdown()

  if (!dominant || breakdown.length === 0) {
    return (
      <div className="card mb-4 border-2 border-dashed border-border">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-bg3 border border-border flex items-center justify-center text-2xl">🪞</div>
          <div>
            <div className="font-bold text-sm text-text1">Your Investor Identity</div>
            <div className="text-xs text-text3">Complete scenario quests to discover your investor type</div>
          </div>
        </div>
      </div>
    )
  }

  const { identity, count, total } = dominant

  return (
    <div className="card mb-4 border-2" style={{ borderColor: identity.color + '40', background: identity.color + '08' }}>
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ background: identity.color + '15', border: `1.5px solid ${identity.color}30` }}>
          {identity.icon}
        </div>
        <div className="flex-1">
          <div className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: identity.color }}>
            Your Investor Identity
          </div>
          <div className="font-bold text-base text-text1">{identity.label}</div>
          <div className="text-xs text-text2 mt-0.5">{count} of {total} decisions matched this profile</div>
        </div>
        <button onClick={() => setExpanded(!expanded)} className="text-text3 text-xs hover:text-text1 flex-shrink-0">
          {expanded ? '▲' : '▼'}
        </button>
      </div>

      {/* Identity bar */}
      <div className="flex gap-1 h-2 rounded-full overflow-hidden mb-3">
        {breakdown.map((b, i) => (
          <div key={i} style={{ width: `${b.pct}%`, background: b.identity.color }} title={`${b.type}: ${b.pct}%`} />
        ))}
      </div>

      {!expanded && (
        <p className="text-xs text-text2 leading-relaxed italic">"{identity.description}"</p>
      )}

      {expanded && (
        <div className="flex flex-col gap-3">
          <p className="text-xs text-text2 leading-relaxed">"{identity.description}"</p>

          {/* Strengths */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color: identity.color }}>
              Your Strengths
            </div>
            {identity.strengths.map((s, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-text2 mb-1">
                <span style={{ color: identity.color }}>✓</span>{s}
              </div>
            ))}
          </div>

          {/* Watch out */}
          <div className="rounded-xl p-3" style={{ background: 'rgba(232,168,32,0.08)', border: '1px solid rgba(232,168,32,0.2)' }}>
            <div className="text-[10px] font-bold text-gold-dk uppercase tracking-wider mb-1">Watch Out For</div>
            <p className="text-xs text-text2">{identity.watchOut}</p>
          </div>

          {/* Famous example */}
          <div className="text-xs text-text3 italic">
            Famous example: {identity.famousExample}
          </div>

          {/* Breakdown */}
          <div>
            <div className="text-[10px] font-bold text-text3 uppercase tracking-wider mb-2">All Your Decisions</div>
            {breakdown.map((b, i) => (
              <div key={i} className="flex items-center gap-2 mb-1.5">
                <span className="text-sm w-5">{b.identity.icon}</span>
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-0.5">
                    <span className="font-medium text-text1">{b.type}</span>
                    <span className="text-text3">{b.count}x</span>
                  </div>
                  <div className="h-1.5 bg-bg3 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${b.pct}%`, background: b.identity.color }} />
                  </div>
                </div>
                <span className="text-[10px] text-text3 w-8 text-right">{b.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── SKILL TREE CARD ───────────────────────────────────────────────────────────

export function SkillTreeCard({ completedQuests }: { completedQuests: number[] }) {
  const [expanded, setExpanded] = useState(false)
  const progress = getSkillProgress(completedQuests)

  const totalLevel = Object.values(progress).reduce((sum, p) => sum + p.level, 0)
  const maxLevel = SKILLS.length * 4
  const levelLabels = ['Recognition', 'Application', 'Pressure', 'Integration']

  return (
    <div className="card mb-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="font-bold text-sm text-text1">🌳 Skill Tree</div>
          <div className="text-xs text-text2">Investor Level {totalLevel} / {maxLevel}</div>
        </div>
        <button onClick={() => setExpanded(!expanded)} className="text-xs font-bold text-gold-dk hover:underline">
          {expanded ? 'Collapse' : 'View All'}
        </button>
      </div>

      {/* Compact skill overview */}
      <div className="grid grid-cols-5 gap-1.5 mb-2">
        {SKILLS.map(skill => {
          const p = progress[skill.id]
          const pct = p.completedNodes > 0 ? (p.completedNodes / p.totalNodes) * 100 : 0
          return (
            <div key={skill.id} className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg relative"
                style={{ background: skill.bgColor, border: `1.5px solid ${skill.color}30` }}>
                {skill.icon}
                {p.level > 0 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black text-white"
                    style={{ background: skill.color }}>
                    {p.level}
                  </div>
                )}
              </div>
              <div className="w-full h-1 rounded-full overflow-hidden bg-bg3">
                <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(pct, 100)}%`, background: skill.color }} />
              </div>
              <div className="text-[9px] text-text3 text-center leading-tight">{skill.name.split(' ')[0]}</div>
            </div>
          )
        })}
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div className="flex flex-col gap-3 mt-3 pt-3 border-t border-border">
          {SKILLS.map(skill => {
            const p = progress[skill.id]
            const pct = p.totalNodes > 0 ? (p.completedNodes / p.totalNodes) * 100 : 0

            return (
              <div key={skill.id} className="rounded-xl p-3" style={{ background: skill.bgColor, border: `1px solid ${skill.color}20` }}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: 'white', border: `1.5px solid ${skill.color}30` }}>
                    {skill.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="font-bold text-sm text-text1">{skill.name}</div>
                      {p.level > 0 && (
                        <div className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
                          style={{ background: skill.color }}>
                          Lvl {p.level} · {p.levelLabel}
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-text2 mt-0.5">{skill.tagline}</div>
                  </div>
                </div>

                {/* Node progress bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-[10px] text-text3 mb-1">
                    <span>{p.completedNodes} / {p.totalNodes} nodes unlocked</span>
                    <span style={{ color: skill.color }}>{p.level === 4 ? '🏆 Mastered' : p.levelLabel}</span>
                  </div>
                  <div className="h-2 bg-white rounded-full overflow-hidden border border-border">
                    <div className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(Math.max(pct, 0), 100)}%`, background: skill.color }} />
                  </div>
                </div>

                {/* Node list */}
                <div className="flex flex-col gap-1.5">
                  {p.nodeDetails.map(({ node, completed, unlocked }) => (
                    <div key={node.id} className={`flex items-center gap-2 text-xs rounded-lg px-2 py-1.5 ${
                      completed ? 'opacity-100' : unlocked ? 'opacity-60' : 'opacity-30'
                    }`} style={{ background: completed ? skill.color + '20' : 'rgba(0,0,0,0.04)' }}>
                      <span className="text-sm flex-shrink-0">
                        {completed ? '✅' : unlocked ? '🔓' : '🔒'}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-text1 text-[11px]">{node.name}</div>
                        <div className="text-text3 text-[10px] leading-tight">{node.description}</div>
                      </div>
                      <div className="text-[9px] font-bold flex-shrink-0" style={{ color: skill.color }}>
                        Lvl {node.level}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Level markers */}
                <div className="flex gap-1 mt-2">
                  {levelLabels.map((label, i) => (
                    <div key={label}
                      className="flex-1 py-1 rounded text-center text-[9px] font-bold"
                      style={{
                        background: p.level >= i + 1 ? skill.color : 'rgba(0,0,0,0.06)',
                        color: p.level >= i + 1 ? 'white' : '#A89E90'
                      }}>
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ─── DIFFICULTY BADGE ─────────────────────────────────────────────────────────

export function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const config = DIFFICULTY_CONFIG[difficulty as keyof typeof DIFFICULTY_CONFIG]
  if (!config) return null

  return (
    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
      style={{ background: config.bg, color: config.color, border: `1px solid ${config.color}30` }}>
      {config.icon} {difficulty}
    </div>
  )
}

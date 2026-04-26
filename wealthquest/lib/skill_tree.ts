// ─── SKILL TREE SYSTEM ────────────────────────────────────────────────────────

export type SkillLevel = {
  level: number
  label: string
  description: string
  questsRequired: number
}

export type Skill = {
  id: string
  name: string
  icon: string
  color: string
  bgColor: string
  description: string
  levels: SkillLevel[]
  questIds: number[] // Which quests contribute to this skill
}

export const SKILLS: Skill[] = [
  {
    id: 'behavioral_control',
    name: 'Behavioral Control',
    icon: '🧠',
    color: '#9B59B6',
    bgColor: '#F4EEFF',
    description: 'Master your emotional reactions to market events. The most valuable skill in investing.',
    levels: [
      { level: 1, label: 'Aware', description: 'You can identify basic emotional biases like panic selling and FOMO', questsRequired: 1 },
      { level: 2, label: 'Controlled', description: 'You hold through standard corrections without emotional decisions', questsRequired: 3 },
      { level: 3, label: 'Disciplined', description: 'You stay consistent under severe stress — bear markets and crashes', questsRequired: 5 },
      { level: 4, label: 'Master', description: 'You act decisively while others panic — buying at the lows', questsRequired: 7 },
    ],
    questIds: [1, 2, 5, 6, 16, 17, 19, 20, 21], // Behavioral quests
  },
  {
    id: 'risk_management',
    name: 'Risk Management',
    icon: '📊',
    color: '#E8453A',
    bgColor: '#FFF0EE',
    description: 'Understand and manage portfolio risk across asset classes and time horizons.',
    levels: [
      { level: 1, label: 'Risk Aware', description: 'You understand the basic relationship between risk and return', questsRequired: 1 },
      { level: 2, label: 'Allocator', description: 'You can construct a portfolio appropriate for your risk tolerance', questsRequired: 3 },
      { level: 3, label: 'Manager', description: 'You manage sequence risk and lifecycle allocation shifts', questsRequired: 5 },
      { level: 4, label: 'Strategist', description: 'You think in probabilities and expected outcomes across scenarios', questsRequired: 7 },
    ],
    questIds: [7, 9, 10, 12, 22, 23], // Risk quests
  },
  {
    id: 'market_understanding',
    name: 'Market Understanding',
    icon: '🌍',
    color: '#3B7AD8',
    bgColor: '#EEF4FF',
    description: 'Understand how macro events — rates, inflation, cycles — affect your portfolio.',
    levels: [
      { level: 1, label: 'Observer', description: 'You can connect major events to market movements', questsRequired: 1 },
      { level: 2, label: 'Analyst', description: 'You understand interest rates, inflation and their portfolio impact', questsRequired: 3 },
      { level: 3, label: 'Macro Aware', description: 'You can anticipate portfolio impact of macro shifts before they happen', questsRequired: 5 },
      { level: 4, label: 'Economist', description: 'You think in economic cycles and position accordingly', questsRequired: 6 },
    ],
    questIds: [3, 8, 11, 13, 16], // Market quests
  },
  {
    id: 'portfolio_construction',
    name: 'Portfolio Construction',
    icon: '🏗️',
    color: '#E8A820',
    bgColor: '#FFFBE6',
    description: 'Build and maintain an optimal portfolio for your goals and time horizon.',
    levels: [
      { level: 1, label: 'Builder', description: 'You can select appropriate ETFs and build a basic diversified portfolio', questsRequired: 1 },
      { level: 2, label: 'Architect', description: 'You construct multi-asset portfolios with appropriate allocation', questsRequired: 3 },
      { level: 3, label: 'Optimizer', description: 'You understand tax efficiency, rebalancing and lifecycle shifts', questsRequired: 5 },
      { level: 4, label: 'Expert', description: 'You construct portfolios optimized for risk-adjusted returns across all conditions', questsRequired: 6 },
    ],
    questIds: [4, 9, 10, 14, 15, 18], // Portfolio quests
  },
  {
    id: 'execution_discipline',
    name: 'Execution Discipline',
    icon: '⚙️',
    color: '#3A9E5C',
    bgColor: '#EDFAF2',
    description: 'Consistently execute your investment plan — DCA, savings plans, and goal-setting.',
    levels: [
      { level: 1, label: 'Starter', description: 'You have set up an investment account and savings plan', questsRequired: 1 },
      { level: 2, label: 'Consistent', description: 'You invest regularly regardless of market conditions', questsRequired: 3 },
      { level: 3, label: 'Optimized', description: 'You maximize tax efficiency and automate your investing system', questsRequired: 5 },
      { level: 4, label: 'Machine', description: 'Your system runs automatically — you never miss a contribution', questsRequired: 6 },
    ],
    questIds: [6, 15, 17, 19, 20, 24, 25], // Execution quests
  },
]

// ─── DIFFICULTY SYSTEM ─────────────────────────────────────────────────────────

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'

export const DIFFICULTY_CONFIG: Record<Difficulty, { color: string; bg: string; icon: string; description: string }> = {
  'Beginner': {
    color: '#3A9E5C', bg: '#EDFAF2',
    icon: '🌱',
    description: 'Clear scenarios with defined options. Learn the fundamentals.',
  },
  'Intermediate': {
    color: '#E8A820', bg: '#FFFBE6',
    icon: '📈',
    description: 'Multiple variables and genuine uncertainty. Think carefully.',
  },
  'Advanced': {
    color: '#E8453A', bg: '#FFF0EE',
    icon: '⚔️',
    description: 'High emotional intensity and complex trade-offs. No easy answers.',
  },
  'Expert': {
    color: '#9B59B6', bg: '#F4EEFF',
    icon: '🎯',
    description: 'Multi-factor decisions with conflicting signals. Real investor conditions.',
  },
}

// Quest difficulty and skill mapping
export type QuestMeta = {
  questId: number
  skill: string
  skillId: string
  difficulty: Difficulty
  difficultyScore: number // 1-4
}

export const QUEST_META: QuestMeta[] = [
  { questId: 1,  skill: 'Behavioral Control',    skillId: 'behavioral_control',    difficulty: 'Beginner',     difficultyScore: 1 },
  { questId: 2,  skill: 'Behavioral Control',    skillId: 'behavioral_control',    difficulty: 'Beginner',     difficultyScore: 1 },
  { questId: 3,  skill: 'Market Understanding',  skillId: 'market_understanding',  difficulty: 'Intermediate', difficultyScore: 2 },
  { questId: 4,  skill: 'Execution Discipline',  skillId: 'execution_discipline',  difficulty: 'Intermediate', difficultyScore: 2 },
  { questId: 5,  skill: 'Behavioral Control',    skillId: 'behavioral_control',    difficulty: 'Advanced',     difficultyScore: 3 },
  { questId: 6,  skill: 'Execution Discipline',  skillId: 'execution_discipline',  difficulty: 'Beginner',     difficultyScore: 1 },
  { questId: 7,  skill: 'Risk Management',       skillId: 'risk_management',       difficulty: 'Beginner',     difficultyScore: 1 },
  { questId: 8,  skill: 'Market Understanding',  skillId: 'market_understanding',  difficulty: 'Intermediate', difficultyScore: 2 },
  { questId: 9,  skill: 'Risk Management',       skillId: 'risk_management',       difficulty: 'Intermediate', difficultyScore: 2 },
  { questId: 10, skill: 'Portfolio Construction', skillId: 'portfolio_construction', difficulty: 'Intermediate', difficultyScore: 2 },
  { questId: 11, skill: 'Market Understanding',  skillId: 'market_understanding',  difficulty: 'Beginner',     difficultyScore: 1 },
  { questId: 12, skill: 'Risk Management',       skillId: 'risk_management',       difficulty: 'Beginner',     difficultyScore: 1 },
  { questId: 13, skill: 'Market Understanding',  skillId: 'market_understanding',  difficulty: 'Intermediate', difficultyScore: 2 },
  { questId: 14, skill: 'Portfolio Construction', skillId: 'portfolio_construction', difficulty: 'Intermediate', difficultyScore: 2 },
  { questId: 15, skill: 'Execution Discipline',  skillId: 'execution_discipline',  difficulty: 'Beginner',     difficultyScore: 1 },
  { questId: 16, skill: 'Behavioral Control',    skillId: 'behavioral_control',    difficulty: 'Advanced',     difficultyScore: 3 },
  { questId: 17, skill: 'Execution Discipline',  skillId: 'execution_discipline',  difficulty: 'Intermediate', difficultyScore: 2 },
  { questId: 18, skill: 'Portfolio Construction', skillId: 'portfolio_construction', difficulty: 'Intermediate', difficultyScore: 2 },
  { questId: 19, skill: 'Execution Discipline',  skillId: 'execution_discipline',  difficulty: 'Intermediate', difficultyScore: 2 },
  { questId: 20, skill: 'Behavioral Control',    skillId: 'behavioral_control',    difficulty: 'Beginner',     difficultyScore: 1 },
  { questId: 21, skill: 'Behavioral Control',    skillId: 'behavioral_control',    difficulty: 'Intermediate', difficultyScore: 2 },
  { questId: 22, skill: 'Risk Management',       skillId: 'risk_management',       difficulty: 'Advanced',     difficultyScore: 3 },
  { questId: 23, skill: 'Portfolio Construction', skillId: 'portfolio_construction', difficulty: 'Intermediate', difficultyScore: 2 },
  { questId: 24, skill: 'Execution Discipline',  skillId: 'execution_discipline',  difficulty: 'Beginner',     difficultyScore: 1 },
  { questId: 25, skill: 'Execution Discipline',  skillId: 'execution_discipline',  difficulty: 'Expert',       difficultyScore: 4 },
]

// ─── SKILL PROGRESS HELPERS ────────────────────────────────────────────────────

export function getSkillProgress(completedQuestIds: number[]): Record<string, { completed: number; total: number; level: number; levelLabel: string; nextLevelAt: number }> {
  const result: Record<string, { completed: number; total: number; level: number; levelLabel: string; nextLevelAt: number }> = {}

  SKILLS.forEach(skill => {
    const completed = skill.questIds.filter(id => completedQuestIds.includes(id)).length
    const total = skill.questIds.length

    // Determine level
    let currentLevel = 0
    let levelLabel = 'Not Started'
    let nextLevelAt = skill.levels[0].questsRequired

    for (const lvl of skill.levels) {
      if (completed >= lvl.questsRequired) {
        currentLevel = lvl.level
        levelLabel = lvl.label
        const nextLvl = skill.levels[lvl.level] // next level (0-indexed)
        nextLevelAt = nextLvl ? nextLvl.questsRequired : total
      }
    }

    result[skill.id] = { completed, total, level: currentLevel, levelLabel, nextLevelAt }
  })

  return result
}

export function getQuestMeta(questId: number): QuestMeta | null {
  return QUEST_META.find(m => m.questId === questId) || null
}

export function getSkillById(skillId: string): Skill | null {
  return SKILLS.find(s => s.id === skillId) || null
}

// ─── SKILL TREE — NODE SYSTEM ─────────────────────────────────────────────────
// Tracks behavior, not knowledge.
// Each node = a specific, trainable investor capability.
// Nodes unlock progressively. Cross-skill integration at higher levels.

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'

export type SkillNode = {
  id: string
  name: string
  description: string
  level: 1 | 2 | 3 | 4
  questIds: number[]            // Which quests train this node
  requires?: string[]           // Node IDs that must be completed first
  behaviorTracked: string       // What behavior this node trains
}

export type Skill = {
  id: string
  name: string
  icon: string
  color: string
  bgColor: string
  description: string
  tagline: string
  nodes: SkillNode[]
}

export const SKILLS: Skill[] = [

  // ── BEHAVIORAL CONTROL ─────────────────────────────────────────────────────
  {
    id: 'behavioral_control',
    name: 'Behavioral Control',
    icon: '🧠',
    color: '#9B59B6',
    bgColor: '#F4EEFF',
    description: 'Master your emotional reactions to market events. The most valuable and rarest skill in investing.',
    tagline: 'Act on strategy, not emotion.',
    nodes: [
      {
        id: 'first_loss_response',
        name: 'First Loss Response',
        description: 'Hold or buy during your first real market dip',
        level: 1,
        questIds: [5],
        behaviorTracked: 'Did you hold or buy during your first loss experience?',
      },
      {
        id: 'correction_tolerance',
        name: 'Correction Tolerance',
        description: 'Sit through a 7%+ correction without selling',
        level: 1,
        questIds: [7],
        requires: ['first_loss_response'],
        behaviorTracked: 'Did you hold through a multi-week correction?',
      },
      {
        id: 'fomo_recognition',
        name: 'FOMO Recognition',
        description: 'Resist social pressure to chase hot assets',
        level: 1,
        questIds: [6],
        behaviorTracked: 'Did you avoid FOMO-driven buying after a large gain?',
      },
      {
        id: 'social_pressure',
        name: 'Social Pressure Resistance',
        description: 'Hold your strategy when partner, friends, or media push you to sell',
        level: 2,
        questIds: [12, 19],
        requires: ['correction_tolerance', 'fomo_recognition'],
        behaviorTracked: 'Did you maintain your strategy under combined social pressure?',
      },
      {
        id: 'monitoring_discipline',
        name: 'Monitoring Discipline',
        description: 'Reduce checking frequency to quarterly and hold the habit',
        level: 2,
        questIds: [18],
        requires: ['correction_tolerance'],
        behaviorTracked: 'Did you choose to reduce portfolio monitoring frequency?',
      },
      {
        id: 'crash_resilience',
        name: 'Crash Resilience',
        description: 'Hold or buy during a major crash (6%+ single-day falls)',
        level: 3,
        questIds: [20],
        requires: ['social_pressure', 'correction_tolerance'],
        behaviorTracked: 'Did you hold through a major crash with full social pressure?',
      },
      {
        id: 'extended_uncertainty',
        name: 'Extended Uncertainty',
        description: 'Maintain DCA through a multi-month bear market',
        level: 3,
        questIds: [23],
        requires: ['crash_resilience'],
        behaviorTracked: 'Did you continue investing through a historic crash?',
      },
      {
        id: 'multi_factor_pressure',
        name: 'Multi-Factor Pressure',
        description: 'Make rational decisions when market stress, job uncertainty, and relationship pressure arrive simultaneously',
        level: 4,
        questIds: [24],
        requires: ['crash_resilience', 'social_pressure'],
        behaviorTracked: 'Did you use evidence over anxiety when every factor pushed toward panic?',
      },
    ],
  },

  // ── RISK MANAGEMENT ────────────────────────────────────────────────────────
  {
    id: 'risk_management',
    name: 'Risk Management',
    icon: '📊',
    color: '#E8453A',
    bgColor: '#FFF0EE',
    description: 'Understand and manage risk across your portfolio — from emergency funds to concentration.',
    tagline: 'Know the difference between risk you chose and risk you accumulated.',
    nodes: [
      {
        id: 'emergency_fund',
        name: 'Emergency Fund Architecture',
        description: 'Build 3–6 months cash buffer before investing',
        level: 1,
        questIds: [2],
        behaviorTracked: 'Did you recognise the emergency fund as the correct solution?',
      },
      {
        id: 'concentration_risk',
        name: 'Concentration Risk',
        description: 'Limit employer stock or single-stock exposure to 5–10%',
        level: 2,
        questIds: [10],
        requires: ['emergency_fund'],
        behaviorTracked: 'Did you avoid dangerous employer stock concentration?',
      },
      {
        id: 'mistake_ranking',
        name: 'Mistake Ranking',
        description: 'Correctly identify which investment error costs the most over time',
        level: 3,
        questIds: [21],
        requires: ['concentration_risk'],
        behaviorTracked: 'Did you correctly identify fee compounding as the most certain ongoing loss?',
      },
    ],
  },

  // ── PORTFOLIO CONSTRUCTION ─────────────────────────────────────────────────
  {
    id: 'portfolio_construction',
    name: 'Portfolio Construction',
    icon: '🏗️',
    color: '#E8A820',
    bgColor: '#FFFBE6',
    description: 'Build and maintain an optimal, efficient portfolio for your specific goals and time horizon.',
    tagline: 'Build what you will actually hold.',
    nodes: [
      {
        id: 'fee_selection',
        name: 'Fee-First Selection',
        description: 'Choose the lowest-cost fund over any recommendation based on past performance',
        level: 1,
        questIds: [3],
        behaviorTracked: 'Did you choose the low-cost fund over the advisor-recommended high-cost one?',
      },
      {
        id: 'active_vs_passive',
        name: 'Active vs Passive',
        description: 'Understand and apply the evidence that index funds outperform active management',
        level: 1,
        questIds: [9],
        requires: ['fee_selection'],
        behaviorTracked: 'Did you keep your index fund over a star active fund?',
      },
      {
        id: 'portfolio_simplicity',
        name: 'Portfolio Simplicity',
        description: 'Choose appropriate complexity — one or two funds — over unnecessary additions',
        level: 2,
        questIds: [11],
        requires: ['active_vs_passive'],
        behaviorTracked: 'Did you resist adding unnecessary complexity to your portfolio?',
      },
      {
        id: 'tax_efficiency',
        name: 'Tax Efficiency',
        description: 'Use available tax-advantaged accounts and structures to reduce drag',
        level: 2,
        questIds: [15],
        requires: ['portfolio_simplicity'],
        behaviorTracked: 'Did you investigate and use available tax-advantaged investment structures?',
      },
      {
        id: 'esg_decision',
        name: 'Values Alignment',
        description: 'Understand the real trade-offs of ESG investing and make an informed choice',
        level: 2,
        questIds: [16],
        requires: ['active_vs_passive'],
        behaviorTracked: 'Did you make an informed, research-backed values alignment decision?',
      },
      {
        id: 'system_optimisation',
        name: 'System Optimisation',
        description: 'Audit and improve all elements of your investing system systematically',
        level: 3,
        questIds: [22],
        requires: ['tax_efficiency'],
        behaviorTracked: 'Did you methodically fix all inefficiencies in order of impact?',
      },
    ],
  },

  // ── EXECUTION DISCIPLINE ───────────────────────────────────────────────────
  {
    id: 'execution_discipline',
    name: 'Execution Discipline',
    icon: '⚙️',
    color: '#3A9E5C',
    bgColor: '#EDFAF2',
    description: 'Start investing. Keep investing. Automate everything. Never let perfect stop good.',
    tagline: 'The plan you execute beats the plan you design.',
    nodes: [
      {
        id: 'starting_now',
        name: 'Starting Now',
        description: 'Invest without waiting for the perfect moment',
        level: 1,
        questIds: [1, 5, 25],
        behaviorTracked: 'Did you choose to start investing rather than wait for perfect conditions?',
      },
      {
        id: 'broker_selection',
        name: 'Broker Selection',
        description: 'Choose a regulated low-cost broker over familiar high-cost alternatives',
        level: 1,
        questIds: [4],
        requires: ['starting_now'],
        behaviorTracked: 'Did you choose based on cost and regulation rather than brand familiarity?',
      },
      {
        id: 'lump_sum_decision',
        name: 'Large Sum Decision',
        description: 'Invest a large one-time sum without excessive delay',
        level: 2,
        questIds: [13],
        requires: ['starting_now'],
        behaviorTracked: 'Did you deploy a lump sum without excessive hedging or delay?',
      },
      {
        id: 'savings_rate',
        name: 'Savings Rate Optimisation',
        description: 'Meaningfully increase savings rate by cutting waste, not lifestyle',
        level: 2,
        questIds: [14],
        requires: ['starting_now'],
        behaviorTracked: 'Did you make a sustainable, meaningful increase to your savings rate?',
      },
      {
        id: 'goal_setting',
        name: 'Goal Setting',
        description: 'Calculate a specific financial independence number',
        level: 2,
        questIds: [17],
        requires: ['savings_rate'],
        behaviorTracked: 'Did you calculate and commit to a specific financial independence target?',
      },
    ],
  },

  // ── MARKET UNDERSTANDING ───────────────────────────────────────────────────
  {
    id: 'market_understanding',
    name: 'Market Understanding',
    icon: '🌍',
    color: '#3B7AD8',
    bgColor: '#EEF4FF',
    description: 'Understand how macro forces — inflation, cycles, crashes — actually affect your portfolio.',
    tagline: 'Understand the mechanism. Ignore the noise.',
    nodes: [
      {
        id: 'inflation_mechanics',
        name: 'Inflation Mechanics',
        description: 'Understand real vs nominal returns and cash purchasing power erosion',
        level: 1,
        questIds: [8],
        behaviorTracked: 'Did you correctly identify inflation as the hidden cost of cash savings?',
      },
      {
        id: 'crash_history',
        name: 'Crash History',
        description: 'Apply historical pattern recognition during a major crash',
        level: 3,
        questIds: [20, 23],
        requires: ['inflation_mechanics'],
        behaviorTracked: 'Did you trust historical recovery patterns during maximum fear?',
      },
    ],
  },

]

// ─── DIFFICULTY SYSTEM ─────────────────────────────────────────────────────────

export const DIFFICULTY_CONFIG: Record<Difficulty, {
  color: string; bg: string; icon: string; description: string; phase: string
}> = {
  'Beginner':     { color: '#3A9E5C', bg: '#EDFAF2', icon: '🌱', description: 'Clear scenarios with defined outcomes. Build the foundation.', phase: 'Entry' },
  'Intermediate': { color: '#E8A820', bg: '#FFFBE6', icon: '📈', description: 'Trade-offs and genuine uncertainty. Think carefully.', phase: 'Behavior' },
  'Advanced':     { color: '#E8453A', bg: '#FFF0EE', icon: '⚔️', description: 'High emotional intensity. Complex decisions. No easy answers.', phase: 'Uncertainty' },
  'Expert':       { color: '#9B59B6', bg: '#F4EEFF', icon: '🎯', description: 'Multi-factor decisions. Boss-level. Real investor conditions.', phase: 'Stress Test' },
}

// ─── QUEST META ────────────────────────────────────────────────────────────────

export type QuestMeta = {
  questId: number
  skill: string
  skillId: string
  skillNode: string
  nodeId: string
  difficulty: Difficulty
  isBoss: boolean
  phase: 1 | 2 | 3 | 4
}

export const QUEST_META: QuestMeta[] = [
  // Phase 1: Entry
  { questId: 1,  skill: 'Execution Discipline',  skillId: 'execution_discipline',  skillNode: 'Starting Now',            nodeId: 'starting_now',          difficulty: 'Beginner',     isBoss: false, phase: 1 },
  { questId: 2,  skill: 'Risk Management',        skillId: 'risk_management',        skillNode: 'Emergency Fund',          nodeId: 'emergency_fund',        difficulty: 'Beginner',     isBoss: false, phase: 1 },
  { questId: 3,  skill: 'Portfolio Construction', skillId: 'portfolio_construction', skillNode: 'Fee-First Selection',     nodeId: 'fee_selection',         difficulty: 'Beginner',     isBoss: false, phase: 1 },
  { questId: 4,  skill: 'Execution Discipline',  skillId: 'execution_discipline',  skillNode: 'Broker Selection',        nodeId: 'broker_selection',      difficulty: 'Beginner',     isBoss: false, phase: 1 },
  { questId: 5,  skill: 'Behavioral Control',    skillId: 'behavioral_control',    skillNode: 'First Loss Response',     nodeId: 'first_loss_response',   difficulty: 'Beginner',     isBoss: true,  phase: 1 },
  // Phase 2: Behavior
  { questId: 6,  skill: 'Behavioral Control',    skillId: 'behavioral_control',    skillNode: 'FOMO Recognition',        nodeId: 'fomo_recognition',      difficulty: 'Beginner',     isBoss: false, phase: 2 },
  { questId: 7,  skill: 'Behavioral Control',    skillId: 'behavioral_control',    skillNode: 'Correction Tolerance',    nodeId: 'correction_tolerance',  difficulty: 'Beginner',     isBoss: false, phase: 2 },
  { questId: 8,  skill: 'Market Understanding',  skillId: 'market_understanding',  skillNode: 'Inflation Mechanics',     nodeId: 'inflation_mechanics',   difficulty: 'Beginner',     isBoss: false, phase: 2 },
  { questId: 9,  skill: 'Portfolio Construction', skillId: 'portfolio_construction', skillNode: 'Active vs Passive',      nodeId: 'active_vs_passive',     difficulty: 'Beginner',     isBoss: false, phase: 2 },
  { questId: 10, skill: 'Risk Management',        skillId: 'risk_management',        skillNode: 'Concentration Risk',     nodeId: 'concentration_risk',    difficulty: 'Intermediate', isBoss: false, phase: 2 },
  { questId: 11, skill: 'Portfolio Construction', skillId: 'portfolio_construction', skillNode: 'Portfolio Simplicity',   nodeId: 'portfolio_simplicity',  difficulty: 'Beginner',     isBoss: false, phase: 2 },
  { questId: 12, skill: 'Behavioral Control',    skillId: 'behavioral_control',    skillNode: 'Social Pressure',         nodeId: 'social_pressure',       difficulty: 'Intermediate', isBoss: true,  phase: 2 },
  // Phase 3: Uncertainty
  { questId: 13, skill: 'Execution Discipline',  skillId: 'execution_discipline',  skillNode: 'Large Sum Decision',      nodeId: 'lump_sum_decision',     difficulty: 'Intermediate', isBoss: false, phase: 3 },
  { questId: 14, skill: 'Execution Discipline',  skillId: 'execution_discipline',  skillNode: 'Savings Rate',            nodeId: 'savings_rate',          difficulty: 'Intermediate', isBoss: false, phase: 3 },
  { questId: 15, skill: 'Portfolio Construction', skillId: 'portfolio_construction', skillNode: 'Tax Efficiency',         nodeId: 'tax_efficiency',        difficulty: 'Intermediate', isBoss: false, phase: 3 },
  { questId: 16, skill: 'Portfolio Construction', skillId: 'portfolio_construction', skillNode: 'Values Alignment',       nodeId: 'esg_decision',          difficulty: 'Intermediate', isBoss: false, phase: 3 },
  { questId: 17, skill: 'Execution Discipline',  skillId: 'execution_discipline',  skillNode: 'Goal Setting',            nodeId: 'goal_setting',          difficulty: 'Intermediate', isBoss: false, phase: 3 },
  { questId: 18, skill: 'Behavioral Control',    skillId: 'behavioral_control',    skillNode: 'Monitoring Discipline',   nodeId: 'monitoring_discipline', difficulty: 'Intermediate', isBoss: false, phase: 3 },
  { questId: 19, skill: 'Behavioral Control',    skillId: 'behavioral_control',    skillNode: 'Social Pressure',         nodeId: 'social_pressure',       difficulty: 'Intermediate', isBoss: false, phase: 3 },
  { questId: 20, skill: 'Behavioral Control',    skillId: 'behavioral_control',    skillNode: 'Crash Resilience',        nodeId: 'crash_resilience',      difficulty: 'Advanced',     isBoss: true,  phase: 3 },
  // Phase 4: Stress Test
  { questId: 21, skill: 'Risk Management',        skillId: 'risk_management',        skillNode: 'Mistake Ranking',        nodeId: 'mistake_ranking',       difficulty: 'Advanced',     isBoss: false, phase: 4 },
  { questId: 22, skill: 'Portfolio Construction', skillId: 'portfolio_construction', skillNode: 'System Optimisation',    nodeId: 'system_optimisation',   difficulty: 'Advanced',     isBoss: false, phase: 4 },
  { questId: 23, skill: 'Behavioral Control',    skillId: 'behavioral_control',    skillNode: 'Extended Uncertainty',   nodeId: 'extended_uncertainty',  difficulty: 'Advanced',     isBoss: false, phase: 4 },
  { questId: 24, skill: 'Behavioral Control',    skillId: 'behavioral_control',    skillNode: 'Multi-Factor Pressure',  nodeId: 'multi_factor_pressure', difficulty: 'Advanced',     isBoss: false, phase: 4 },
  { questId: 25, skill: 'Execution Discipline',  skillId: 'execution_discipline',  skillNode: 'Starting Now',            nodeId: 'starting_now',          difficulty: 'Expert',       isBoss: true,  phase: 4 },
]

// ─── HELPERS ──────────────────────────────────────────────────────────────────

export function getQuestMeta(questId: number): QuestMeta | null {
  return QUEST_META.find(m => m.questId === questId) || null
}

export function getSkillById(skillId: string): Skill | null {
  return SKILLS.find(s => s.id === skillId) || null
}

export function getNodeById(skillId: string, nodeId: string): SkillNode | null {
  const skill = getSkillById(skillId)
  return skill?.nodes.find(n => n.id === nodeId) || null
}

export function getCompletedNodes(completedQuestIds: number[]): string[] {
  const completed: string[] = []
  SKILLS.forEach(skill => {
    skill.nodes.forEach(node => {
      const allDone = node.questIds.some(qId => completedQuestIds.includes(qId))
      if (allDone) completed.push(node.id)
    })
  })
  return completed
}

export function getSkillProgress(completedQuestIds: number[]): Record<string, {
  completedNodes: number
  totalNodes: number
  level: number
  levelLabel: string
  nodeDetails: { node: SkillNode; completed: boolean; unlocked: boolean }[]
}> {
  const completedNodes = getCompletedNodes(completedQuestIds)
  const result: Record<string, any> = {}

  SKILLS.forEach(skill => {
    const nodeDetails = skill.nodes.map(node => {
      const isCompleted = completedNodes.includes(node.id)
      const prereqsMet = !node.requires || node.requires.every(r => completedNodes.includes(r))
      return { node, completed: isCompleted, unlocked: prereqsMet || isCompleted }
    })

    const completedCount = nodeDetails.filter(n => n.completed).length
    const totalNodes = skill.nodes.length
    const maxLevel = skill.nodes.reduce((max, n) => Math.max(max, n.level), 0)
    const achievedLevel = skill.nodes
      .filter(n => completedNodes.includes(n.id))
      .reduce((max, n) => Math.max(max, n.level), 0)

    const levelLabels = ['', 'Recognition', 'Application', 'Pressure', 'Integration']

    result[skill.id] = {
      completedNodes: completedCount,
      totalNodes,
      level: achievedLevel,
      levelLabel: achievedLevel > 0 ? levelLabels[achievedLevel] : 'Not Started',
      nodeDetails,
    }
  })

  return result
}

export function getBossQuests(): QuestMeta[] {
  return QUEST_META.filter(m => m.isBoss)
}

export function getPhaseQuests(phase: 1 | 2 | 3 | 4): QuestMeta[] {
  return QUEST_META.filter(m => m.phase === phase)
}

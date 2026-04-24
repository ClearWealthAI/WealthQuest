export const MISSIONS = [
  {
    id: 1,
    title: 'The Foundation',
    subtitle: 'Master the basics of investing',
    icon: '🏛️',
    questIds: [1, 2, 3, 4, 5],
    xpBonus: 200,
    goldBonus: 40,
    badge: '🎖️',
    color: '#3A9E5C',
    description: 'Every great investor started here. Learn what ETFs are, how compound interest works, and why the right fund type matters.',
    aldricIntro: "Welcome, young investor! Before we venture into the ETF Highlands, you must master the fundamentals. These first 5 quests will give you the foundation everything else is built on.",
  },
  {
    id: 2,
    title: 'Your First Portfolio',
    subtitle: 'Build and understand your investments',
    icon: '💼',
    questIds: [6, 7, 8, 9, 10],
    xpBonus: 250,
    goldBonus: 50,
    badge: '⚜️',
    color: '#3B7AD8',
    description: 'Time to put knowledge into action. Open a broker, understand DCA, explore the MSCI World and learn about diversification and risk.',
    aldricIntro: "You have learned the theory — now it is time to act. These 5 quests will take you from knowing what ETFs are to actually building a real portfolio strategy.",
  },
  {
    id: 3,
    title: 'Survive the Market',
    subtitle: 'Learn to stay calm when markets crash',
    icon: '⚔️',
    questIds: [11, 12, 13, 14, 15],
    xpBonus: 300,
    goldBonus: 60,
    badge: '🛡️',
    color: '#E8A820',
    description: 'Markets crash. Inflation eats savings. Most investors panic. You will not. Learn the 3-fund portfolio, inflation protection and tax basics.',
    aldricIntro: "The market is a battlefield, young one. Most investors are defeated not by the market — but by their own fear. These quests will forge your discipline.",
  },
  {
    id: 4,
    title: 'Master the Details',
    subtitle: 'Refine your strategy like a pro',
    icon: '🔬',
    questIds: [16, 17, 18, 19, 20],
    xpBonus: 350,
    goldBonus: 70,
    badge: '💎',
    color: '#9B59B6',
    description: 'Go deeper. Understand market crashes, savings rates, ESG investing, goal setting and portfolio tracking.',
    aldricIntro: "You have survived the basics. Now we sharpen your edge. The difference between a good investor and a great one is in the details — these 5 quests reveal them.",
  },
  {
    id: 5,
    title: 'ETF Highlands Complete',
    subtitle: 'Become a true ETF Highland Champion',
    icon: '🏆',
    questIds: [21, 22, 23, 24, 25],
    xpBonus: 500,
    goldBonus: 100,
    badge: '👑',
    color: '#E8A820',
    description: 'The final challenge. Avoid the biggest mistakes, master bonds, read ETF factsheets and set up your perfect savings plan.',
    aldricIntro: "This is it, champion. The final 5 quests of the ETF Highlands. Complete these and you will know more about investing than 90% of the population. I am proud of how far you have come.",
  },
]

export type Mission = typeof MISSIONS[0]

export function getMissionForQuest(questId: number): Mission | undefined {
  return MISSIONS.find(m => m.questIds.includes(questId))
}

export function getMissionProgress(completedQuests: number[], mission: Mission): number {
  return mission.questIds.filter(id => completedQuests.includes(id)).length
}

export function isMissionComplete(completedQuests: number[], mission: Mission): boolean {
  return mission.questIds.every(id => completedQuests.includes(id))
}

// ============================================================
// WEALTH QUEST — COMPLETE QUEST LIBRARY
// Chapter I: ETF Highlands (25 Quests)
// Chapter II: Compound Sea (25 Quests)
// Daily Quests System
// ============================================================

export const LEVEL_NAMES = ['Novice', 'Apprentice', 'Investor', 'Strategist', 'Wealth Master', 'Legend']
export const XP_PER_LEVEL = 100

export type Quest = {
  id: number
  chapter: number
  title: string
  icon: string
  desc: string
  tags: string[]
  xp: number
  gold: number
  lesson: {
    heading: string
    intro: string
    blocks: {
      label: string
      heading: string
      body: string
      highlight: string
      example: string
    }[]
    quiz: {
      question: string
      options: { text: string; correct: boolean }[]
      correctFeedback: string
      wrongFeedback: string
    }
  }
}

// ============================================================
// CHAPTER I — ETF HIGHLANDS (25 Quests)
// ============================================================
export const CHAPTER_1: Quest[] = [
  {
    id: 1, chapter: 1,
    title: "What Is an ETF?",
    icon: "📦", desc: "Learn what ETFs are and why they are the most powerful tool for everyday investors.", tags: ["Basics", "5 min"], xp: 50, gold: 10,
    lesson: {
      heading: "Your first lesson: What is an ETF?", intro: "Before you invest a single euro, you need to understand the most important tool in your arsenal. Welcome to Quest 1.",
      blocks: [
        { label: "The concept", heading: "ETF = Exchange Traded Fund", body: "An ETF is a basket of many stocks or bonds bundled into a single investment you can buy like a regular share. One purchase gives you instant exposure to hundreds or thousands of companies.", highlight: "One MSCI World ETF gives you exposure to 1,600+ companies across 23 countries — for as little as €1/month.", example: "<strong>Example:</strong> Instead of buying Apple, Microsoft, and Amazon separately, one S&P 500 ETF holds all of them — plus 497 more." },
        { label: "Why ETFs win", heading: "ETFs vs. picking single stocks", body: "Most professional fund managers fail to beat the market long-term. Individual stock pickers do even worse. ETFs don't try to beat the market — they simply track it. And historically, that beats 90% of active strategies.", highlight: "Warren Buffett's advice for most investors: put your money in a low-cost index ETF and leave it alone.", example: "<strong>Stats:</strong> Over 15 years, 88% of active fund managers underperformed a simple index ETF." }
      ],
      quiz: { question: "What is the main advantage of an ETF over picking individual stocks?", options: [{ text: "ETFs always guarantee higher returns", correct: false }, { text: "ETFs provide instant diversification at low cost", correct: true }, { text: "ETFs only invest in tech companies", correct: false }, { text: "ETFs are only for professional investors", correct: false }], correctFeedback: "Correct! Diversification is the superpower of ETFs. You spread risk across hundreds of companies automatically.", wrongFeedback: "The key benefit is diversification — instant exposure to many companies with a single purchase." }
    }
  },
  {
    id: 2, chapter: 1,
    title: "How ETFs Are Structured",
    icon: "🏗️", desc: "Understand how ETFs are built and why they are safer than you think.", tags: ["Basics", "5 min"], xp: 55, gold: 11,
    lesson: {
      heading: "Inside an ETF: How it works", intro: "You know what an ETF is — now let's understand how it's built and why your money is protected.",
      blocks: [
        { label: "Structure", heading: "Special Purpose Vehicle", body: "Your ETF investment is legally separate from the fund company. Even if the ETF provider goes bankrupt, your shares are protected. This is called a Special Purpose Vehicle (SPV) structure.", highlight: "Your money is legally separated from the fund company. If BlackRock went bankrupt, your iShares ETF would still exist.", example: "<strong>Example:</strong> In 2008 during the financial crisis, ETF investors were protected even when banks collapsed." },
        { label: "How prices work", heading: "NAV and market price", body: "ETFs have two prices: the Net Asset Value (NAV) which is the true value of all holdings, and the market price which is what you pay. These are almost always nearly identical thanks to arbitrage traders.", highlight: "ETF prices stay accurate because large traders constantly buy and sell to keep the market price in line with the NAV.", example: "<strong>Practical tip:</strong> Always use limit orders when buying ETFs, not market orders, to get a fair price." }
      ],
      quiz: { question: "What happens to your ETF investment if the ETF provider (like BlackRock) goes bankrupt?", options: [{ text: "You lose all your money", correct: false }, { text: "Your investment is protected as it is legally separated", correct: true }, { text: "The government compensates you", correct: false }, { text: "Your shares are transferred to a competitor", correct: false }], correctFeedback: "Exactly! The SPV structure means your investment is legally separate and protected.", wrongFeedback: "ETFs use a Special Purpose Vehicle structure that keeps your money legally separated from the fund company." }
    }
  },
  {
    id: 3, chapter: 1,
    title: "Accumulating vs. Distributing",
    icon: "🔄", desc: "Understand the difference between reinvesting dividends and taking them as cash.", tags: ["ETF Types", "5 min"], xp: 60, gold: 12,
    lesson: {
      heading: "Accumulating vs. Distributing ETFs", intro: "When a company in your ETF pays dividends, your ETF has to do something with that money. The answer shapes how your wealth grows.",
      blocks: [
        { label: "Type 1", heading: "Accumulating ETFs (Thesaurierend)", body: "Accumulating ETFs automatically reinvest dividends back into the fund. You never see the cash — but your shares grow in value. This is compound interest working silently for you.", highlight: "For long-term wealth building, accumulating ETFs are almost always the better choice.", example: "<strong>Example:</strong> €10,000 in an accumulating ETF at 7%/year = €76,000 after 30 years." },
        { label: "Type 2", heading: "Distributing ETFs (Ausschüttend)", body: "Distributing ETFs pay dividends directly to your account as cash. Great if you need regular income. But if you reinvest manually, you may owe tax on each payout first.", highlight: "In Germany and most EU countries, receiving dividends triggers immediate tax. Accumulating ETFs defer this — a major long-term advantage.", example: "<strong>Best for:</strong> Accumulating = younger investors building wealth. Distributing = retirees needing regular income." }
      ],
      quiz: { question: "For a 25-year-old building long-term wealth, which ETF type is generally better?", options: [{ text: "Distributing — to get regular cash payouts", correct: false }, { text: "Accumulating — to benefit from automatic compounding", correct: true }, { text: "Both are always identical in outcome", correct: false }, { text: "Neither — only buy individual stocks", correct: false }], correctFeedback: "Spot on! Accumulating ETFs let compound interest do its magic without tax drag.", wrongFeedback: "Accumulating ETFs reinvest dividends automatically, letting your money grow exponentially without immediate tax." }
    }
  },
  {
    id: 4, chapter: 1,
    title: "Understanding TER (Fund Costs)",
    icon: "💸", desc: "Learn why fees are the silent killer of returns — and how to avoid them.", tags: ["Costs", "5 min"], xp: 60, gold: 12,
    lesson: {
      heading: "TER: The most important number you've never heard of", intro: "You can't control market returns. But you can control costs. And costs matter more than almost anything else.",
      blocks: [
        { label: "What is TER?", heading: "Total Expense Ratio explained", body: "The TER is the annual cost of owning an ETF, expressed as a percentage. A TER of 0.20% means you pay €2 per year for every €1,000 invested. It's deducted automatically — you never see a bill.", highlight: "Target TER: Under 0.25% for broad market ETFs. Many cost as little as 0.07%.", example: "<strong>Good:</strong> iShares Core MSCI World — TER 0.20%. <strong>Bad:</strong> Active fund — TER 1.50-2.00%." },
        { label: "The true cost", heading: "Why 1% fee costs you a fortune", body: "A 1% higher fee sounds small. But over 30 years on €100,000, it costs you roughly €100,000 in lost compound growth. That's real money that goes to the fund company instead of you.", highlight: "A 1% annual fee difference on €100,000 over 30 years = ~€100,000 lost. Always check the TER before buying.", example: "<strong>0.20% TER:</strong> €100k → €574k after 30 years at 7%. <strong>1.50% TER:</strong> €100k → €385k. Same market, different outcome." }
      ],
      quiz: { question: "What does a TER of 0.20% mean for a €10,000 investment?", options: [{ text: "You pay €200 per year in fees", correct: false }, { text: "You pay €20 per year in fees", correct: true }, { text: "You pay €20 once when you buy", correct: false }, { text: "You pay 20% of your profits", correct: false }], correctFeedback: "Correct! 0.20% of €10,000 = €20 per year, deducted automatically.", wrongFeedback: "TER is annual. 0.20% of €10,000 = €20 per year, taken automatically from the fund value." }
    }
  },
  {
    id: 5, chapter: 1,
    title: "The MSCI World Index",
    icon: "🌍", desc: "Deep dive into the world's most popular ETF index and what it actually contains.", tags: ["Indexes", "6 min"], xp: 65, gold: 13,
    lesson: {
      heading: "MSCI World: The backbone of most ETF portfolios", intro: "If you only ever buy one ETF, most experts would say it should track the MSCI World. Here's why.",
      blocks: [
        { label: "What's inside", heading: "1,500+ companies, 23 countries", body: "The MSCI World Index tracks the largest companies in 23 developed countries. It covers about 85% of the investable market in each country. The biggest holdings are US companies (about 70%), followed by Japan, UK, France, and Germany.", highlight: "The MSCI World includes companies like Apple, Microsoft, LVMH, Toyota, Nestlé — the world's best businesses in one fund.", example: "<strong>Top countries:</strong> USA 70%, Japan 6%, UK 4%, France 3%, Canada 3%, Others 14%." },
        { label: "Performance", heading: "Historical returns", body: "Since its creation in 1986, the MSCI World has returned approximately 8-10% per year on average. It has survived oil crises, the dot-com crash, 2008, COVID — and always recovered to new highs.", highlight: "€10,000 invested in MSCI World in 1986 would be worth over €300,000 today. That's the power of staying invested.", example: "<strong>Worst years:</strong> 2008: -40%. <strong>Recovery:</strong> By 2013 it hit new all-time highs. Patience always wins." }
      ],
      quiz: { question: "Approximately what percentage of the MSCI World Index is made up of US companies?", options: [{ text: "About 30%", correct: false }, { text: "About 50%", correct: false }, { text: "About 70%", correct: true }, { text: "About 90%", correct: false }], correctFeedback: "Correct! US companies make up around 70% of the MSCI World, reflecting the dominance of American markets.", wrongFeedback: "The US makes up about 70% of the MSCI World Index, which some investors see as a concentration risk." }
    }
  },
  {
    id: 6, chapter: 1,
    title: "Open Your First Broker Account",
    icon: "🏦", desc: "A step-by-step mission to get you set up with a real investing account in under 10 minutes.", tags: ["Action Quest", "10 min"], xp: 100, gold: 25,
    lesson: {
      heading: "Your first real-world mission", intro: "This quest turns knowledge into action. Opening a broker account is the most important financial move most people never take.",
      blocks: [
        { label: "Step 1", heading: "Choose your broker", body: "For European beginners, two brokers stand out for zero fees and simplicity: Trade Republic and Scalable Capital. Both let you start a savings plan from €1/month with no order fees.", highlight: "Recommended for beginners: Trade Republic (mobile-first, ultra-simple) or Scalable Capital (more features).", example: "<strong>What you need:</strong> A smartphone, your ID/passport, 10 minutes. That's it." },
        { label: "Step 2", heading: "Set up a savings plan (Sparplan)", body: "Don't buy a lump sum. Set up an automatic monthly savings plan. Choose your ETF, choose an amount (even €50 works), choose a date. Done. The money moves automatically every month.", highlight: "The single most powerful investing habit: automate it. Set it once and let compound interest run for decades.", example: "<strong>€50/month at 7%/year for 35 years = €97,000</strong> — from only €21,000 invested." }
      ],
      quiz: { question: "What is the key advantage of setting up an automated monthly savings plan?", options: [{ text: "You can time the market perfectly every month", correct: false }, { text: "It removes emotion and ensures consistency through dollar-cost averaging", correct: true }, { text: "Brokers charge lower fees for automated plans", correct: false }, { text: "Automated plans always buy at the lowest price", correct: false }], correctFeedback: "Exactly! Automation removes emotion — the #1 enemy of investors.", wrongFeedback: "Automation removes the temptation to time the market and ensures you invest consistently through ups and downs." }
    }
  },
  {
    id: 7, chapter: 1,
    title: "Dollar-Cost Averaging",
    icon: "📅", desc: "Why investing the same amount every month is smarter than trying to time the market.", tags: ["Strategy", "5 min"], xp: 65, gold: 13,
    lesson: {
      heading: "Dollar-Cost Averaging: Your secret weapon", intro: "What if you could automatically buy more shares when prices are low and fewer when prices are high — without thinking about it?",
      blocks: [
        { label: "The strategy", heading: "Same amount, every month", body: "Dollar-Cost Averaging (DCA) means investing a fixed amount regularly regardless of market conditions. When prices are low, your €100 buys more shares. When prices are high, it buys fewer. Over time, your average cost per share is lower than the average price.", highlight: "DCA turns market volatility from your enemy into your friend. Crashes become opportunities to buy more cheaply.", example: "<strong>Month 1:</strong> Price €100 → buy 1 share. <strong>Month 2:</strong> Price €50 → buy 2 shares. <strong>Month 3:</strong> Price €80 → buy 1.25 shares. Average cost: €75. Average price: €77." },
        { label: "vs. Lump sum", heading: "DCA vs. investing all at once", body: "Studies show that lump-sum investing beats DCA about 67% of the time because markets generally go up. But DCA wins psychologically — it removes the fear of investing at the wrong time and keeps you consistent.", highlight: "For most beginners, DCA with a monthly savings plan is the best approach. It builds the habit and removes timing anxiety.", example: "<strong>Best of both worlds:</strong> If you receive a bonus, invest it immediately as a lump sum. For regular income, use DCA monthly." }
      ],
      quiz: { question: "You invest €100/month. In month 1 the ETF costs €50/share, in month 2 it costs €25/share. How many shares do you own after 2 months?", options: [{ text: "4 shares", correct: false }, { text: "6 shares", correct: true }, { text: "8 shares", correct: false }, { text: "3 shares", correct: false }], correctFeedback: "Correct! Month 1: €100/€50 = 2 shares. Month 2: €100/€25 = 4 shares. Total: 6 shares.", wrongFeedback: "Month 1: €100 ÷ €50 = 2 shares. Month 2: €100 ÷ €25 = 4 shares. Total = 6 shares." }
    }
  },
  {
    id: 8, chapter: 1,
    title: "The 3-Fund Portfolio",
    icon: "⚖️", desc: "Discover the simplest, most diversified investment strategy used by millions of smart investors.", tags: ["Portfolio", "8 min"], xp: 80, gold: 20,
    lesson: {
      heading: "The legendary 3-fund portfolio", intro: "Most investors overcomplicate things. The 3-fund portfolio is used by some of the world's smartest investors — and it's beautifully simple.",
      blocks: [
        { label: "The strategy", heading: "Three funds. Global coverage. Done.", body: "The 3-fund portfolio uses just three ETFs: a developed markets fund (MSCI World), an emerging markets fund (MSCI EM), and optionally a bond fund for stability.", highlight: "Classic allocation for a growth investor: 80% MSCI World + 20% Emerging Markets. That's it.", example: "<strong>Coverage:</strong> MSCI World = 1,600 companies in 23 countries. + Emerging Markets = 1,400 more in 24 developing economies." },
        { label: "Rebalancing", heading: "Once a year: rebalance", body: "Over time one fund grows faster and your allocation drifts. Once a year, sell a little of the overperformer and buy the underperformer to restore your target split.", highlight: "Rebalancing annually takes 15 minutes and forces you to buy low and sell high automatically.", example: "<strong>Example:</strong> Target: 80/20. After a year: 85/15. Sell 5% of MSCI World, buy 5% Emerging Markets. Done." }
      ],
      quiz: { question: "What is the purpose of annual rebalancing in a 3-fund portfolio?", options: [{ text: "To switch to better-performing funds every year", correct: false }, { text: "To restore your target allocation and systematically buy low, sell high", correct: true }, { text: "To reduce your tax bill by selling everything", correct: false }, { text: "Rebalancing is only for professional investors", correct: false }], correctFeedback: "Perfect! Rebalancing restores your target allocation and mechanically enforces buying underperformers and selling outperformers.", wrongFeedback: "Rebalancing maintains your risk profile and systematically buys what's cheap and sells what's expensive." }
    }
  },
  {
    id: 9, chapter: 1,
    title: "Understanding Diversification",
    icon: "🎯", desc: "Why spreading your investments is the only free lunch in investing.", tags: ["Risk", "5 min"], xp: 65, gold: 13,
    lesson: {
      heading: "Diversification: The only free lunch in investing", intro: "Nobel Prize winner Harry Markowitz called diversification the only free lunch in investing. Here's what he meant.",
      blocks: [
        { label: "The concept", heading: "Don't put all eggs in one basket", body: "When you own many different investments, the poor performance of one is offset by the good performance of others. A globally diversified ETF holds thousands of companies — so no single company failure can devastate you.", highlight: "If you owned only Enron stock in 2001, you lost everything. If you owned a US index fund, Enron was just 0.3% of your portfolio.", example: "<strong>Single stock risk:</strong> Nokia was worth $250 billion in 2000. Today it's worth $20 billion. Index investors barely noticed." },
        { label: "How many is enough?", heading: "The magic number of stocks", body: "Research shows that owning 20-30 different stocks removes most company-specific risk. But to remove country and sector risk, you need global diversification across hundreds of stocks — which is exactly what a global ETF provides.", highlight: "A single global ETF gives you better diversification than most professional fund managers achieve.", example: "<strong>MSCI World:</strong> Spreads your money across 1,600 companies, 23 countries, 11 sectors. No single position exceeds 5%." }
      ],
      quiz: { question: "Why did owning the MSCI World ETF protect investors when Nokia lost 92% of its value?", options: [{ text: "ETFs automatically sell failing stocks", correct: false }, { text: "Nokia was a tiny percentage of the total portfolio", correct: true }, { text: "ETFs are insured against individual company failures", correct: false }, { text: "The ETF predicted Nokia's decline", correct: false }], correctFeedback: "Exactly! When diversified across 1,600 companies, any single company's collapse has minimal impact.", wrongFeedback: "Diversification means no single company makes up a large portion. Nokia was <1% of the index, so its decline barely mattered." }
    }
  },
  {
    id: 10, chapter: 1,
    title: "Inflation: The Silent Thief",
    icon: "📉", desc: "Why keeping money in a savings account is actually losing money every year.", tags: ["Economics", "5 min"], xp: 60, gold: 12,
    lesson: {
      heading: "Inflation: Why cash loses value every year", intro: "Most people think keeping money in a savings account is safe. It's not. Here's why.",
      blocks: [
        { label: "What is inflation?", heading: "Your money buys less every year", body: "Inflation is the rate at which prices rise over time. If inflation is 3% and your savings account pays 0.5%, you are effectively losing 2.5% of your purchasing power every year.", highlight: "€10,000 in a savings account at 0.5% interest with 3% inflation = you lose about €250 of real value every year.", example: "<strong>1970s example:</strong> €1,000 in 1970 could buy what costs €8,000 today. Savers who held cash lost 87% of purchasing power." },
        { label: "The solution", heading: "Investing beats inflation historically", body: "The stock market has historically returned 7-10% annually, well above average inflation of 2-3%. This is why investing is not just about getting rich — it's about preserving your wealth.", highlight: "The S&P 500 has beaten inflation in 70% of all 10-year periods since 1926. Long-term investors almost always win.", example: "<strong>Real returns:</strong> 8% stock return - 2.5% inflation = 5.5% real annual gain. Your wealth genuinely grows." }
      ],
      quiz: { question: "If inflation is 3% and your savings account pays 1%, what is your real annual return?", options: [{ text: "+4%", correct: false }, { text: "+2%", correct: false }, { text: "-2%", correct: true }, { text: "0%", correct: false }], correctFeedback: "Correct! Real return = nominal return minus inflation. 1% - 3% = -2%. You're losing purchasing power.", wrongFeedback: "Real return = nominal return - inflation rate. 1% - 3% = -2%. Your money is actually losing purchasing power." }
    }
  },
  {
    id: 11, chapter: 1,
    title: "Risk and Return",
    icon: "⚡", desc: "The fundamental relationship between risk and potential reward in investing.", tags: ["Risk", "5 min"], xp: 65, gold: 13,
    lesson: {
      heading: "Risk and return: The fundamental trade-off", intro: "In investing, there is no free lunch except diversification. Higher potential returns always come with higher short-term risk.",
      blocks: [
        { label: "The relationship", heading: "More risk = more potential reward", body: "Government bonds are very safe but return about 2-3% annually. Stocks are more volatile but return 7-10% annually. This isn't coincidence — investors demand higher returns to compensate for higher risk.", highlight: "The risk-return trade-off is the foundation of all investing. Understanding it helps you choose the right investments for your timeline.", example: "<strong>Savings account:</strong> 0-1% return, no risk. <strong>Government bonds:</strong> 2-3%, low risk. <strong>Global ETF:</strong> 7-10%, medium volatility. <strong>Single stocks:</strong> High variance, high risk." },
        { label: "Your timeline matters", heading: "Time reduces risk dramatically", body: "Short-term, stocks can lose 40-50%. But over 20+ years, every major market has recovered and reached new highs. The longer your time horizon, the more risk you can afford to take.", highlight: "If you won't need your money for 10+ years, short-term volatility is irrelevant. Time in the market beats timing the market.", example: "<strong>S&P 500:</strong> In any single year, could fall 40%. Over any 20-year period since 1926, it has never lost money." }
      ],
      quiz: { question: "You are 25 years old and won't retire for 40 years. Which investment makes most sense?", options: [{ text: "Government bonds for safety", correct: false }, { text: "Cash savings account", correct: false }, { text: "Global stock ETF for long-term growth", correct: true }, { text: "Gold only", correct: false }], correctFeedback: "Exactly! With 40 years ahead, you have time to ride out any volatility. Stocks historically provide the best long-term returns.", wrongFeedback: "With a 40-year horizon, short-term volatility is irrelevant. Stocks have outperformed all other asset classes over long periods." }
    }
  },
  {
    id: 12, chapter: 1,
    title: "Your Emergency Fund First",
    icon: "🛡️", desc: "Why you must build a financial safety net before investing a single euro.", tags: ["Foundations", "5 min"], xp: 70, gold: 14,
    lesson: {
      heading: "Emergency fund: Your financial foundation", intro: "Before you invest in ETFs, you need one thing in place. Without it, one unexpected bill could force you to sell your investments at the worst time.",
      blocks: [
        { label: "What it is", heading: "3-6 months of expenses in cash", body: "An emergency fund is 3-6 months of your essential living expenses held in cash or a high-interest savings account. It covers job loss, medical bills, car repairs — anything unexpected.", highlight: "Never invest money you might need within the next 3-5 years. Only invest money you can afford to leave untouched.", example: "<strong>If your monthly expenses are €1,500:</strong> Emergency fund = €4,500 to €9,000. Keep this in a separate account you don't touch." },
        { label: "Where to keep it", heading: "High-interest savings account", body: "Your emergency fund should be immediately accessible but earning some interest. Look for a Tagesgeldkonto (daily money account) in Germany or equivalent in your country. Aim for 2-4% interest.", highlight: "Your emergency fund is insurance, not investment. Don't invest it in ETFs — you need it available instantly.", example: "<strong>Good options:</strong> Trade Republic Savings (3-4%), ING DiBa, DKB. All offer instant access and reasonable rates." }
      ],
      quiz: { question: "You have €5,000 saved and monthly expenses of €1,500. What should you do first?", options: [{ text: "Invest all €5,000 in ETFs immediately", correct: false }, { text: "Keep €4,500 as emergency fund, invest only €500", correct: true }, { text: "Keep all €5,000 in cash", correct: false }, { text: "Split equally between ETFs and emergency fund", correct: false }], correctFeedback: "Correct! With €1,500 monthly expenses, you need €4,500 minimum (3 months) as emergency fund before investing.", wrongFeedback: "Always secure 3 months of expenses first. €1,500 × 3 = €4,500 emergency fund. The remaining €500 can be invested." }
    }
  },
  {
    id: 13, chapter: 1,
    title: "How to Read an ETF Factsheet",
    icon: "📄", desc: "Master the key numbers you need to evaluate any ETF before buying.", tags: ["Research", "7 min"], xp: 75, gold: 15,
    lesson: {
      heading: "Reading an ETF factsheet like a pro", intro: "Every ETF publishes a factsheet. Knowing what to look for takes 2 minutes and can save you thousands.",
      blocks: [
        { label: "Key numbers", heading: "The 5 numbers that matter", body: "1. TER (Total Expense Ratio) — annual cost, aim for under 0.25%. 2. AUM (Assets Under Management) — how much money is in the fund, bigger is usually safer. 3. Replication method — physical or synthetic. 4. Distribution — accumulating or distributing. 5. Benchmark — which index it tracks.", highlight: "Always check: TER under 0.25%, AUM over €500 million, physical replication, your preferred distribution type.", example: "<strong>iShares Core MSCI World:</strong> TER 0.20%, AUM €60 billion, physical replication, accumulating version available." },
        { label: "Replication methods", heading: "Physical vs. Synthetic ETFs", body: "Physical ETFs actually buy the stocks in the index. Synthetic ETFs use derivatives (swaps) to mimic performance. Physical is simpler and more transparent. Synthetic can be cheaper but adds counterparty risk.", highlight: "For beginners, stick to physically replicated ETFs. You know exactly what you own.", example: "<strong>Physical:</strong> iShares, Vanguard, Xtrackers most are physical. <strong>Synthetic:</strong> Some Lyxor and Amundi products. Both are legal and regulated." }
      ],
      quiz: { question: "You're comparing two ETFs tracking the same index. ETF A: TER 0.20%, AUM €45 billion, physical. ETF B: TER 0.15%, AUM €200 million, synthetic. Which is generally better for a beginner?", options: [{ text: "ETF B — lower cost is always better", correct: false }, { text: "ETF A — larger, simpler, despite slightly higher cost", correct: true }, { text: "They are identical", correct: false }, { text: "Always choose synthetic ETFs", correct: false }], correctFeedback: "Correct! For beginners, the larger, physically replicated ETF is better. The 0.05% cost difference is minimal vs. the benefits.", wrongFeedback: "ETF A wins: larger AUM means more liquidity and stability. Physical replication is simpler. The tiny cost difference is worth it." }
    }
  },
  {
    id: 14, chapter: 1,
    title: "Tax Basics for ETF Investors",
    icon: "🧾", desc: "A simple overview of how ETF taxes work in Germany and the EU.", tags: ["Tax", "7 min"], xp: 80, gold: 16,
    lesson: {
      heading: "ETF taxes: What you actually need to know", intro: "Taxes sound complicated. For ETF investors, they're actually quite manageable. Here's the simple version.",
      blocks: [
        { label: "Germany basics", heading: "Abgeltungsteuer: 25% flat tax", body: "In Germany, investment returns are taxed at 25% flat (plus solidarity surcharge and church tax if applicable). This covers dividends, interest, and realized capital gains. The good news: you have an annual tax-free allowance.", highlight: "Annual tax-free allowance (Sparerpauschbetrag): €1,000 per person (€2,000 for couples) from 2023. Use it fully every year.", example: "<strong>Example:</strong> If you earn €800 in dividends/gains this year, you pay zero tax. If you earn €1,500, you pay 25% on €500 = €125." },
        { label: "Smart tax moves", heading: "How to minimize ETF taxes legally", body: "1. Use your full annual allowance (€1,000). 2. Prefer accumulating ETFs to defer dividend tax. 3. Don't sell unnecessarily — unrealized gains aren't taxed. 4. Use a Freistellungsauftrag with your broker to automatically apply the allowance.", highlight: "Set up a Freistellungsauftrag with your broker immediately. It's free, takes 5 minutes, and saves you money automatically.", example: "<strong>Practical step:</strong> Log into your broker → Settings → Freistellungsauftrag → enter €1,000. Done. Your first €1,000 of gains each year is tax-free." }
      ],
      quiz: { question: "You earned €1,200 from ETF gains this year in Germany. You have a €1,000 Freistellungsauftrag. How much tax do you pay?", options: [{ text: "€300 (25% of €1,200)", correct: false }, { text: "€50 (25% of €200)", correct: true }, { text: "€0 — ETFs are tax-free", correct: false }, { text: "€600 (50% of gains)", correct: false }], correctFeedback: "Correct! €1,200 - €1,000 allowance = €200 taxable. 25% of €200 = €50.", wrongFeedback: "The allowance covers the first €1,000. Only the excess (€200) is taxed at 25% = €50." }
    }
  },
  {
    id: 15, chapter: 1,
    title: "5 Mistakes to Avoid",
    icon: "⚠️", desc: "The most common beginner errors — and exactly how to sidestep each one.", tags: ["Wisdom", "6 min"], xp: 70, gold: 30,
    lesson: {
      heading: "The 5 traps that cost beginners fortunes", intro: "Knowledge isn't just about what TO do. Knowing what NOT to do is worth even more.",
      blocks: [
        { label: "Mistakes 1-3", heading: "The deadly trio", body: "Mistake 1: Waiting for the 'right moment'. There is no right moment — start now.\n\nMistake 2: Panic-selling during a crash. Markets always recover — selling locks in losses permanently.\n\nMistake 3: Paying high fees. A 1% annual fee over 30 years can cost 25% of your final portfolio.", highlight: "A 1% fee difference on €100,000 over 30 years costs you ~€100,000 in lost compound growth.", example: "<strong>Target TER:</strong> Under 0.25%/year. Many cost as little as 0.07%." },
        { label: "Mistakes 4-5", heading: "The subtle killers", body: "Mistake 4: Investing money you might need soon. Your emergency fund (3-6 months) must exist before you invest a euro.\n\nMistake 5: Checking your portfolio every day. Daily checking leads to emotional decisions. Check quarterly at most.", highlight: "The best investor behaviour: set it up correctly once, automate it, and almost completely ignore it for decades.", example: "<strong>Warren Buffett:</strong> 'The stock market transfers money from the Active to the Patient.'" }
      ],
      quiz: { question: "An investor sees their portfolio drop 30% during a market crash. What should they do?", options: [{ text: "Sell everything to prevent further losses", correct: false }, { text: "Do nothing — or buy more if they can afford to", correct: true }, { text: "Switch all funds to cash immediately", correct: false }, { text: "Check the portfolio every hour", correct: false }], correctFeedback: "Exactly right! Every major market crash has recovered and gone on to new highs. Patience is the investor's greatest weapon.", wrongFeedback: "Selling during a crash turns a temporary paper loss into a permanent real loss. Markets always recover." }
    }
  },
  {
    id: 16, chapter: 1,
    title: "ETF vs. Active Funds",
    icon: "🥊", desc: "Why passive ETFs beat actively managed funds in the long run.", tags: ["Comparison", "6 min"], xp: 70, gold: 14,
    lesson: {
      heading: "ETFs vs. Active funds: The data doesn't lie", intro: "The investment industry wants you to believe active fund managers can beat the market. The data tells a different story.",
      blocks: [
        { label: "The evidence", heading: "88% of active funds lose long-term", body: "The SPIVA report (S&P Indices vs. Active) tracks how active funds perform against their benchmark index. After 15 years, 88% of active large-cap funds underperform their benchmark. After fees, it's even worse.", highlight: "After 15 years, only 12% of active funds beat their benchmark index. ETFs beat 88% of professionals — automatically.", example: "<strong>SPIVA 2023:</strong> Over 20 years, 95% of US active funds underperformed the S&P 500 index." },
        { label: "Why active fails", heading: "Three reasons active funds lose", body: "1. High fees (1.5-2%) create a permanent headwind. 2. Managers are human — they panic, get emotional, make mistakes. 3. Every trade has a cost. Frequent trading destroys returns.", highlight: "The average active fund charges 1.5% annually. The average ETF charges 0.20%. That 1.3% gap compounds dramatically over decades.", example: "<strong>Simple math:</strong> If the market returns 7%, your active fund (after 1.5% fees) returns 5.5%. ETF (after 0.20%) returns 6.8%. Over 30 years on €10,000: Active = €48k vs ETF = €72k." }
      ],
      quiz: { question: "What percentage of active large-cap funds outperform their benchmark index over 15 years?", options: [{ text: "About 50% — managers are skilled", correct: false }, { text: "About 30%", correct: false }, { text: "About 12%", correct: true }, { text: "About 75%", correct: false }], correctFeedback: "Correct! Only about 12% of active funds beat their benchmark over 15 years. Passive ETFs win by default.", wrongFeedback: "The SPIVA report shows only about 12% of active funds beat their benchmark over 15 years. The other 88% lose." }
    }
  },
  {
    id: 17, chapter: 1,
    title: "Building Your First Portfolio",
    icon: "🏗️", desc: "A practical guide to setting up your first real ETF portfolio.", tags: ["Action", "8 min"], xp: 90, gold: 20,
    lesson: {
      heading: "Building your first portfolio: Step by step", intro: "Everything you've learned comes together here. Let's build your actual portfolio.",
      blocks: [
        { label: "Simple start", heading: "The one-ETF portfolio", body: "You don't need multiple ETFs to start. A single global ETF like the MSCI World or FTSE All-World covers 23-49 countries and 1,600-3,600 companies. For most beginners, one ETF is enough.", highlight: "Start simple. One ETF, one broker, one monthly savings plan. You can always add complexity later.", example: "<strong>One-ETF options:</strong> Vanguard FTSE All-World (VWRL/VWCE) — 49 countries, 3,600 companies, TER 0.22%. Or iShares MSCI World (IWDA/EUNL) — 23 developed countries, 1,600 companies, TER 0.20%." },
        { label: "Step by step", heading: "Your action plan", body: "Step 1: Open a broker account (Trade Republic or Scalable Capital). Step 2: Set up a Freistellungsauftrag (€1,000 tax allowance). Step 3: Choose your ETF. Step 4: Set up a monthly Sparplan for whatever you can afford. Step 5: Forget about it.", highlight: "The entire setup takes about 30 minutes. Then your money works automatically for decades.", example: "<strong>Recommended for beginners:</strong> Vanguard FTSE All-World Acc (VWCE) on Trade Republic. €50+/month Sparplan. TER 0.22%. Done." }
      ],
      quiz: { question: "Which is the best approach for a complete beginner with €100/month to invest?", options: [{ text: "Buy 10 different ETFs to be well diversified", correct: false }, { text: "Buy one global ETF monthly via a savings plan", correct: true }, { text: "Buy individual stocks of companies you know", correct: false }, { text: "Wait until you have €10,000 to invest as a lump sum", correct: false }], correctFeedback: "Perfect! One global ETF via monthly savings plan is the optimal strategy for beginners. Simple, diversified, automated.", wrongFeedback: "One global ETF gives you all the diversification you need. Adding more ETFs just adds complexity without benefit for beginners." }
    }
  },
  {
    id: 18, chapter: 1,
    title: "Understanding Market Cycles",
    icon: "🔃", desc: "Why markets go up and down — and why that's actually good for long-term investors.", tags: ["Markets", "6 min"], xp: 70, gold: 14,
    lesson: {
      heading: "Market cycles: Your guide to not panicking", intro: "Markets don't go up in a straight line. Understanding cycles helps you stay calm when everyone else is panicking.",
      blocks: [
        { label: "The cycle", heading: "Bull and bear markets", body: "A bull market is when prices rise 20%+ from a low. A bear market is when prices fall 20%+ from a high. Since 1928, there have been 26 bear markets in the S&P 500. The average decline was 36%. Every single one was followed by a recovery to new highs.", highlight: "Bear markets are temporary. They last an average of 9.6 months. Bull markets last an average of 2.7 years. Time is on your side.", example: "<strong>COVID crash (2020):</strong> S&P 500 fell 34% in 33 days. By August 2020 — just 5 months later — it had fully recovered." },
        { label: "What to do", heading: "How to behave during a crash", body: "During a crash: do nothing. Or if you can, buy more. The worst thing you can do is sell. Your monthly savings plan automatically buys at lower prices during a crash — this is DCA working perfectly.", highlight: "Crashes are sales on stocks. If your favorite store put everything on 40% off, would you stop shopping there? No — you'd buy more.", example: "<strong>If you invested €500/month during COVID:</strong> Your March-May 2020 purchases were 30-40% cheaper. Those shares tripled in value by 2021." }
      ],
      quiz: { question: "The stock market drops 30% due to an economic crisis. You have a monthly savings plan of €200. What should you do?", options: [{ text: "Cancel your savings plan immediately", correct: false }, { text: "Sell your existing holdings to prevent more losses", correct: false }, { text: "Continue your savings plan — you're buying at a 30% discount", correct: true }, { text: "Switch to gold and bonds", correct: false }], correctFeedback: "Exactly right! A 30% drop means your €200 buys significantly more shares than before. Long-term, this is hugely beneficial.", wrongFeedback: "Crashes are opportunities for long-term investors. Your savings plan buys at discounted prices. Continue and you'll benefit from the recovery." }
    }
  },
  {
    id: 19, chapter: 1,
    title: "Emerging Markets ETFs",
    icon: "🌏", desc: "Should you add emerging markets to your portfolio? Here's the honest answer.", tags: ["Advanced", "6 min"], xp: 75, gold: 15,
    lesson: {
      heading: "Emerging markets: Higher risk, higher potential", intro: "China, India, Brazil, South Korea — emerging markets represent the world's fastest-growing economies. But should you invest in them?",
      blocks: [
        { label: "What are they?", heading: "MSCI Emerging Markets explained", body: "Emerging markets (EM) are economies that are growing rapidly but are less developed than markets like the US or Germany. The MSCI EM index covers 24 countries including China (30%), Taiwan (15%), India (15%), South Korea (13%).", highlight: "Emerging markets represent 40% of global GDP but only about 12% of the MSCI World. Adding EM gives you fuller global exposure.", example: "<strong>Top holdings:</strong> Taiwan Semiconductor, Samsung, Alibaba, Tencent, Reliance Industries — the biggest companies of the developing world." },
        { label: "Should you invest?", heading: "The honest assessment", body: "EM ETFs have higher potential returns AND higher volatility than developed markets. They add true diversification. The simplest approach: use a single FTSE All-World ETF which includes EM automatically, or add 20% EM alongside an MSCI World.", highlight: "If you want simplicity: FTSE All-World (includes EM). If you want control: 80% MSCI World + 20% MSCI EM.", example: "<strong>Last 10 years:</strong> MSCI World returned ~150%. MSCI EM returned ~40%. But future returns may be the opposite — no one knows." }
      ],
      quiz: { question: "Which country has the largest weighting in the MSCI Emerging Markets Index?", options: [{ text: "India", correct: false }, { text: "Brazil", correct: false }, { text: "China", correct: true }, { text: "South Korea", correct: false }], correctFeedback: "Correct! China is the largest component of the MSCI EM index at approximately 30%.", wrongFeedback: "China is the dominant country in the MSCI Emerging Markets index, representing about 30% of the index." }
    }
  },
  {
    id: 20, chapter: 1,
    title: "ESG and Sustainable Investing",
    icon: "🌱", desc: "What ESG ETFs are and whether they make sense for your portfolio.", tags: ["ESG", "5 min"], xp: 65, gold: 13,
    lesson: {
      heading: "ESG investing: Values meet returns", intro: "Can you invest according to your values without sacrificing returns? The honest answer might surprise you.",
      blocks: [
        { label: "What is ESG?", heading: "Environmental, Social, Governance", body: "ESG funds screen companies based on environmental impact, social responsibility, and corporate governance. They exclude or underweight companies in tobacco, weapons, fossil fuels, and other controversial sectors.", highlight: "ESG ETFs typically exclude the worst offenders but still hold thousands of companies. They're not perfect but they're a step toward aligned investing.", example: "<strong>iShares MSCI World ESG Screened:</strong> Excludes tobacco, controversial weapons, coal. Still holds Apple, Microsoft, Nestlé. TER: 0.20%." },
        { label: "Performance reality", heading: "Do ESG funds perform as well?", body: "Research shows ESG ETFs have performed similarly to conventional ETFs over the past 10 years — sometimes slightly better, sometimes slightly worse. The difference is not significant. You don't have to sacrifice returns to invest ethically.", highlight: "ESG ETFs are a valid choice. The performance difference vs. conventional ETFs is minimal. Choose based on your values.", example: "<strong>iShares MSCI World vs iShares MSCI World ESG:</strong> Over 5 years, performance has been within 1% of each other annually." }
      ],
      quiz: { question: "Which statement about ESG ETFs is most accurate?", options: [{ text: "ESG ETFs always outperform conventional ETFs", correct: false }, { text: "ESG ETFs always underperform due to restrictions", correct: false }, { text: "ESG ETFs perform similarly to conventional ETFs over time", correct: true }, { text: "ESG ETFs hold no fossil fuel companies at all", correct: false }], correctFeedback: "Correct! ESG ETFs have performed comparably to conventional ETFs. The trade-off between values and returns is minimal.", wrongFeedback: "Research shows ESG ETFs perform similarly to conventional ETFs. You don't have to sacrifice returns to invest according to your values." }
    }
  },
  {
    id: 21, chapter: 1,
    title: "Bonds: Your Portfolio's Seatbelt",
    icon: "🔒", desc: "What bonds are and when it makes sense to add them to your ETF portfolio.", tags: ["Bonds", "5 min"], xp: 65, gold: 13,
    lesson: {
      heading: "Bonds: The stabilizer in your portfolio", intro: "Bonds are often called boring. But understanding them could save your retirement.",
      blocks: [
        { label: "What are bonds?", heading: "Lending money to governments and companies", body: "When you buy a bond ETF, you're lending money to governments or corporations. In return, you receive regular interest payments (the coupon) and your money back at the end (maturity). They're generally less volatile than stocks.", highlight: "Government bonds are considered very safe (especially German Bunds). Corporate bonds offer higher returns with slightly more risk.", example: "<strong>Typical returns:</strong> Government bonds: 2-4%. Corporate bonds: 3-6%. Stocks: 7-10%. Bonds provide stability, stocks provide growth." },
        { label: "When to use bonds", heading: "Age and allocation", body: "A common rule: your bond allocation (%) should roughly equal your age. At 25, you might hold 20-25% bonds. At 60, you might hold 60% bonds. The closer to retirement, the more stability you need.", highlight: "For investors under 35 with long time horizons, bonds may not be necessary. Focus on growth now, add bonds as you approach retirement.", example: "<strong>Simple allocation:</strong> 30 years old = 70% global stocks ETF + 30% bond ETF. Adjust as you age." }
      ],
      quiz: { question: "You are 28 years old and plan to retire at 65. How much of your portfolio should likely be in bonds?", options: [{ text: "0-20% — you have 37 years and should focus on growth", correct: true }, { text: "50% — always split equally between stocks and bonds", correct: false }, { text: "80% — bonds are always safer", correct: false }, { text: "100% — stocks are too risky", correct: false }], correctFeedback: "Correct! At 28 with a 37-year horizon, keeping bonds minimal (0-20%) maximizes long-term growth potential.", wrongFeedback: "With 37 years until retirement, you can afford to focus on growth. Most young investors keep bonds below 20% of their portfolio." }
    }
  },
  {
    id: 22, chapter: 1,
    title: "The Power of Starting Early",
    icon: "⏰", desc: "Why starting at 20 vs. 30 makes a difference of hundreds of thousands of euros.", tags: ["Mindset", "5 min"], xp: 70, gold: 14,
    lesson: {
      heading: "Time is your most valuable investing asset", intro: "The most important investing decision isn't which ETF to buy. It's when you start.",
      blocks: [
        { label: "The numbers", heading: "Starting at 20 vs. 30 vs. 40", body: "Investor A starts at 20, invests €200/month until 65 (45 years). Investor B starts at 30, invests €200/month until 65 (35 years). Investor C starts at 40, invests €200/month until 65 (25 years). All earn 7% annually.", highlight: "Investor A ends up with €960,000. Investor B: €525,000. Investor C: €243,000. Same monthly amount — completely different outcomes.", example: "<strong>The brutal truth:</strong> The 10-year head start that A has over B is worth €435,000. Those 10 years are worth more than all the extra money B invested." },
        { label: "The lesson", heading: "Start now, with any amount", body: "You cannot go back in time. But you can start today. Even €25/month started now is infinitely better than €500/month started in 10 years.", highlight: "The second best time to start investing is right now. Don't wait for the 'right amount' or the 'right moment'.", example: "<strong>€25/month from age 25 to 65 at 7%:</strong> = €65,000 from just €12,000 invested. Even tiny amounts, started early, become significant." }
      ],
      quiz: { question: "Investor A invests €100/month for 30 years. Investor B waits 10 years then invests €200/month for 20 years. Both earn 7%. Who has more at the end?", options: [{ text: "Investor B — they invested more money in total", correct: false }, { text: "Investor A — time beats amount", correct: true }, { text: "They end up with the same amount", correct: false }, { text: "It depends on market conditions", correct: false }], correctFeedback: "Correct! Investor A: ~€121,000. Investor B: ~€104,000. Time in the market beats amount invested.", wrongFeedback: "Investor A wins despite investing less money total. Time in the market is more powerful than the amount invested." }
    }
  },
  {
    id: 23, chapter: 1,
    title: "How to Track Your Portfolio",
    icon: "📊", desc: "The right way to monitor your investments without becoming obsessed.", tags: ["Habits", "5 min"], xp: 60, gold: 12,
    lesson: {
      heading: "Portfolio tracking: How much is too much?", intro: "Checking your portfolio is necessary. Checking it daily is dangerous. Here's the healthy approach.",
      blocks: [
        { label: "The psychology", heading: "Why daily checking is harmful", body: "Studies show investors who check their portfolios daily make 4x more trades than those who check monthly. More trades = more fees, more taxes, more emotional decisions, lower returns. The dopamine hit from watching numbers is real — and dangerous.", highlight: "The ideal frequency: check monthly at most. Annual review for rebalancing. Your wealth is built over decades, not days.", example: "<strong>Research finding:</strong> Swedish investors who checked portfolios daily had 20% lower returns over 5 years than those who checked quarterly." },
        { label: "What to track", heading: "Three metrics that actually matter", body: "1. Total invested (how much you've put in). 2. Total current value. 3. Asset allocation (are you still at your target split?). Everything else is noise.", highlight: "Don't obsess over daily percentage changes. Focus on whether you're on track for your long-term goal.", example: "<strong>Good habit:</strong> First of every month, check your total value and that your savings plan ran successfully. Annual review: rebalance if allocation has drifted more than 5%." }
      ],
      quiz: { question: "Research shows investors who check their portfolios daily compared to quarterly tend to have:", options: [{ text: "Higher returns due to better information", correct: false }, { text: "Lower returns due to more emotional trading", correct: true }, { text: "Identical returns — checking frequency doesn't matter", correct: false }, { text: "Lower risk due to being more aware", correct: false }], correctFeedback: "Correct! Daily checkers make more emotional trades, leading to lower long-term returns.", wrongFeedback: "Daily portfolio checking leads to more emotional decisions and trading, which consistently produces lower returns." }
    }
  },
  {
    id: 24, chapter: 1,
    title: "Sector ETFs: Pros and Cons",
    icon: "🏭", desc: "Should you invest in specific sectors like tech or healthcare? The honest analysis.", tags: ["Advanced", "6 min"], xp: 75, gold: 15,
    lesson: {
      heading: "Sector ETFs: Concentrated bets or smart moves?", intro: "Tech ETFs, healthcare ETFs, clean energy ETFs — sector investing is tempting. But is it smart?",
      blocks: [
        { label: "What they are", heading: "Sector ETFs explained", body: "Sector ETFs track specific industries: technology, healthcare, financials, energy, consumer goods, etc. Instead of owning all sectors, you bet heavily on one. This can boost returns dramatically — or destroy them.", highlight: "Sector ETFs replace diversification with conviction. Only use them if you have a strong, researched thesis.", example: "<strong>NASDAQ-100 ETF:</strong> Heavily tech-focused. Returned 400% over 10 years — but also fell 80% from 2000-2002. High highs, low lows." },
        { label: "The problem", heading: "Why most sector bets lose", body: "To beat a sector ETF with perfect timing, you need to be right twice: when to buy AND when to sell. Most investors get one right but not both. The sector that performed best last year is often the worst next year.", highlight: "Sectors rotate unpredictably. Energy was the best sector in 2022. It was the worst in 2020. No one predicted this.", example: "<strong>Safe approach:</strong> Keep 80-90% in a global ETF. If you want sector exposure, allocate max 10-20% of your portfolio." }
      ],
      quiz: { question: "You believe AI will transform the economy. You want to invest in AI. What is the most prudent approach?", options: [{ text: "Put 100% of your savings into a tech/AI ETF", correct: false }, { text: "Allocate 10-20% to a tech ETF, keep 80-90% in global ETF", correct: true }, { text: "Buy individual AI company stocks", correct: false }, { text: "Avoid tech entirely to be safe", correct: false }], correctFeedback: "Exactly right! Satellite allocation (10-20%) for conviction bets, core holding (80-90%) in global ETF. Best of both worlds.", wrongFeedback: "Even strong convictions should be limited to 10-20% of your portfolio. Global ETF forms the core, sector ETF is a satellite." }
    }
  },
  {
    id: 25, chapter: 1,
    title: "Chapter I Complete: Your Investing Foundation",
    icon: "🏆", desc: "Congratulations! Review everything you've learned and prepare for Chapter II.", tags: ["Milestone", "10 min"], xp: 150, gold: 50,
    lesson: {
      heading: "Chapter I Complete — You're no longer a beginner", intro: "You've completed the ETF Highlands. You now know more about investing than 90% of the population. Let's review what you've mastered.",
      blocks: [
        { label: "What you know", heading: "Your Chapter I knowledge", body: "You understand: what ETFs are and how they're structured, accumulating vs. distributing, TER costs, MSCI World, dollar-cost averaging, the 3-fund portfolio, diversification, inflation, risk and return, emergency funds, tax basics, market cycles, and more.", highlight: "You have the complete foundation. Most investors spend years learning what you've covered in Chapter I.", example: "<strong>Key rules you've mastered:</strong> Keep TER under 0.25%. Build emergency fund first. Automate investing. Don't check daily. Never sell in a crash." },
        { label: "What's next", heading: "Chapter II: Compound Sea", intro: "In Chapter II you'll go deeper: compound interest mathematics, advanced portfolio construction, tax optimization, retirement planning, the FIRE movement, leverage, real estate ETFs, dividend investing strategies, and more.", highlight: "Chapter II is where good investors become great investors. Get ready to go deeper.", example: "<strong>Preview of Chapter II quests:</strong> The Math of Compound Interest, FIRE Movement, Real Estate ETFs (REITs), Advanced Tax Strategies, Building a €1 Million Portfolio, and much more." }
      ],
      quiz: { question: "Which of the following is NOT a key principle from Chapter I?", options: [{ text: "Keep TER under 0.25%", correct: false }, { text: "Build emergency fund before investing", correct: false }, { text: "Try to time the market to buy at the lowest point", correct: true }, { text: "Automate monthly savings plan", correct: false }], correctFeedback: "Correct! Trying to time the market is a mistake. Dollar-cost averaging and staying invested consistently wins long-term.", wrongFeedback: "Market timing is one of the key mistakes to avoid. Consistent investing beats trying to predict market movements." }
    }
  }
]

// ============================================================
// CHAPTER II — COMPOUND SEA (25 Quests)
// ============================================================
export const CHAPTER_2: Quest[] = [
  {
    id: 101, chapter: 2,
    title: "The Magic of Compound Interest",
    icon: "✨", desc: "The mathematical formula that builds millionaires — explained simply.", tags: ["Compound", "6 min"], xp: 80, gold: 20,
    lesson: {
      heading: "Compound interest: The 8th wonder of the world", intro: "Einstein allegedly called compound interest the 8th wonder of the world. Whether he said it or not, the math backs it up.",
      blocks: [
        { label: "Simple vs. compound", heading: "The crucial difference", body: "Simple interest: you earn interest only on your original investment. Compound interest: you earn interest on your investment AND on your previous interest. This seemingly small difference creates enormous differences over time.", highlight: "Compound interest: your returns earn returns, which earn returns. It's exponential, not linear growth.", example: "<strong>Simple interest:</strong> €1,000 at 7% for 30 years = €3,100. <strong>Compound interest:</strong> €1,000 at 7% for 30 years = €7,612. Same rate, more than double the result." },
        { label: "The formula", heading: "Future Value = P × (1 + r)^n", body: "P = principal (starting amount). r = annual return rate. n = number of years. This formula shows why time is so powerful. Each additional year multiplies the entire previous amount.", highlight: "The formula: FV = P × (1 + r)^n. At 7% for 30 years, your money grows by 7.6x. At 40 years, it grows by 14.97x.", example: "<strong>The Rule of 72:</strong> Divide 72 by your return rate to find how many years to double your money. At 7%: 72/7 = ~10 years to double." }
      ],
      quiz: { question: "Using the Rule of 72, approximately how long does it take to double your money at a 9% annual return?", options: [{ text: "9 years", correct: false }, { text: "8 years", correct: true }, { text: "12 years", correct: false }, { text: "18 years", correct: false }], correctFeedback: "Correct! 72 ÷ 9 = 8 years to double your money at 9% annual return.", wrongFeedback: "The Rule of 72: divide 72 by the return rate. 72 ÷ 9 = 8 years to double your money." }
    }
  },
  {
    id: 102, chapter: 2,
    title: "Building a €1 Million Portfolio",
    icon: "💰", desc: "The exact math behind reaching €1 million through ETF investing.", tags: ["Goals", "7 min"], xp: 85, gold: 22,
    lesson: {
      heading: "The €1 million portfolio: Is it realistic?", intro: "A million euros sounds impossible. The math says otherwise — if you start early enough.",
      blocks: [
        { label: "The paths", heading: "Multiple routes to €1 million", body: "At 7% annual return: investing €500/month for 40 years = €1.3 million. Investing €1,000/month for 30 years = €1.2 million. Investing €300/month for 45 years = €1.1 million. The key variable is always time.", highlight: "You don't need a high income to reach €1 million. You need time and consistency.", example: "<strong>The most achievable path:</strong> Start at 25, invest €500/month, retire at 65 = €1.3 million. That's €500/month for 40 years." },
        { label: "The mindset", heading: "Think in decades, not years", body: "Most people overestimate what they can achieve in 1 year and underestimate what they can achieve in 20 years. A €1 million portfolio feels impossible until year 15, then suddenly inevitable.", highlight: "The last 10 years of a 40-year investing journey produce MORE wealth than the first 30 years combined. That's compound interest accelerating.", example: "<strong>€500/month at 7%:</strong> After 10 years: €86,000. After 20 years: €260,000. After 30 years: €606,000. After 40 years: €1,310,000." }
      ],
      quiz: { question: "Someone invests €500/month for 40 years at 7% annual return. How much do they invest in total (out of pocket)?", options: [{ text: "€240,000", correct: true }, { text: "€1,310,000", correct: false }, { text: "€500,000", correct: false }, { text: "€120,000", correct: false }], correctFeedback: "Correct! €500 × 12 months × 40 years = €240,000 invested. The rest (~€1,070,000) is compound growth.", wrongFeedback: "€500 × 12 × 40 = €240,000 actually invested. The portfolio grows to €1.3 million — most of it is compound growth, not your contributions." }
    }
  },
  {
    id: 103, chapter: 2,
    title: "The FIRE Movement",
    icon: "🔥", desc: "Financial Independence, Retire Early — is it possible and how does it work?", tags: ["FIRE", "7 min"], xp: 85, gold: 22,
    lesson: {
      heading: "FIRE: Financial Independence, Retire Early", intro: "What if you could retire at 40? Or 45? The FIRE movement has figured out the math to make it possible.",
      blocks: [
        { label: "The concept", heading: "What is FIRE?", body: "FIRE stands for Financial Independence, Retire Early. The goal is to accumulate enough investments so that the returns cover your annual expenses — forever. You stop working not because you have to, but because you choose to.", highlight: "Financial independence = your portfolio generates enough returns to cover your living expenses. You never need to work again — unless you want to.", example: "<strong>Key variants:</strong> LeanFIRE (frugal lifestyle, smaller portfolio), FatFIRE (comfortable lifestyle, larger portfolio), BaristaFIRE (part-time work + smaller portfolio)." },
        { label: "The math", heading: "The 4% rule and your FIRE number", body: "The '4% rule' says you can safely withdraw 4% of your portfolio annually without running out of money over 30+ years. Your FIRE number = annual expenses × 25.", highlight: "FIRE number = annual spending × 25. If you spend €30,000/year, you need €750,000 to retire. If you spend €50,000, you need €1.25 million.", example: "<strong>Example:</strong> Monthly expenses = €2,000 (€24,000/year). FIRE number = €24,000 × 25 = €600,000. At 7% return, €600,000 generates €42,000/year — more than your expenses." }
      ],
      quiz: { question: "You spend €2,500/month (€30,000/year). What is your FIRE number using the 4% rule?", options: [{ text: "€300,000", correct: false }, { text: "€750,000", correct: true }, { text: "€1,200,000", correct: false }, { text: "€500,000", correct: false }], correctFeedback: "Correct! €30,000 × 25 = €750,000. At 4% withdrawal, that's €30,000/year — exactly covering your expenses.", wrongFeedback: "FIRE number = annual spending × 25. €30,000 × 25 = €750,000. This portfolio generates €30,000/year at the 4% safe withdrawal rate." }
    }
  },
  {
    id: 104, chapter: 2,
    title: "Dividend Investing Strategy",
    icon: "💵", desc: "How dividend ETFs work and when they make sense for your portfolio.", tags: ["Dividends", "6 min"], xp: 80, gold: 20,
    lesson: {
      heading: "Dividend investing: Passive income from ETFs", intro: "The idea of companies paying you money just for owning their shares is appealing. Here's how to do it smartly with ETFs.",
      blocks: [
        { label: "How it works", heading: "Dividends explained", body: "Companies distribute a portion of profits to shareholders as dividends. Dividend ETFs focus on companies that pay high, consistent dividends. You receive cash payments quarterly or annually.", highlight: "Dividend ETFs generate regular cash income. Great for retirement income. Less optimal for wealth building due to tax drag.", example: "<strong>Vanguard FTSE All-World High Dividend:</strong> Yields about 3-4% annually. On €100,000 invested, that's €3,000-4,000 per year in cash dividends." },
        { label: "When to use", heading: "Dividends vs. growth: Choose wisely", body: "During wealth building phase: growth (accumulating) ETFs are better — no tax drag, automatic reinvestment. During retirement: dividend ETFs provide income without selling shares — psychologically easier.", highlight: "Build wealth with accumulating ETFs. Fund retirement with distributing dividend ETFs. Switch the allocation as you approach retirement.", example: "<strong>Strategy:</strong> Ages 20-55: 100% accumulating ETFs. Ages 55-65: gradually shift to 30-50% dividend ETFs. Retirement: live off dividends + small share sales." }
      ],
      quiz: { question: "You're 30 years old and want to maximize wealth for retirement at 65. Which approach is better?", options: [{ text: "Dividend ETFs to get regular cash now", correct: false }, { text: "Accumulating ETFs to maximize compound growth", correct: true }, { text: "Equal split between both", correct: false }, { text: "Dividend ETFs are always better", correct: false }], correctFeedback: "Correct! At 30 with 35 years to retirement, accumulating ETFs maximize compound growth by avoiding dividend tax drag.", wrongFeedback: "Accumulating ETFs are better for wealth building. Dividends trigger taxes even if you reinvest. Save dividend ETFs for retirement income." }
    }
  },
  {
    id: 105, chapter: 2,
    title: "Real Estate ETFs (REITs)",
    icon: "🏢", desc: "How to invest in real estate without buying a property.", tags: ["REITs", "6 min"], xp: 80, gold: 20,
    lesson: {
      heading: "REITs: Real estate investing without the headaches", intro: "Real estate has made many people wealthy. REITs let you participate without a mortgage, tenants, or maintenance.",
      blocks: [
        { label: "What are REITs?", heading: "Real Estate Investment Trusts", body: "REITs are companies that own income-producing real estate — offices, shopping centres, warehouses, apartments, hospitals. They must distribute at least 90% of taxable income to shareholders. REITs trade like stocks.", highlight: "REITs give you real estate exposure with stock market liquidity. You can buy €100 of a REIT — you can't buy €100 of an apartment.", example: "<strong>Types:</strong> Residential REITs (apartments), Commercial REITs (offices, retail), Industrial REITs (warehouses, logistics), Healthcare REITs (hospitals, care homes)." },
        { label: "REIT ETFs", heading: "How to invest in REITs", body: "Instead of picking individual REITs, buy a REIT ETF for instant diversification across dozens of real estate companies. REIT ETFs typically yield 3-5% dividends and provide a hedge against inflation since rents rise with inflation.", highlight: "Adding 10-20% REIT ETF to your portfolio provides real estate diversification, inflation protection, and additional income.", example: "<strong>Popular options:</strong> iShares Developed Markets Property Yield (IWDP) — 300+ real estate companies globally. TER 0.59%. Distributing." }
      ],
      quiz: { question: "What percentage of their taxable income are REITs legally required to distribute to shareholders?", options: [{ text: "At least 50%", correct: false }, { text: "At least 90%", correct: true }, { text: "At least 70%", correct: false }, { text: "100% — all profits", correct: false }], correctFeedback: "Correct! REITs must distribute at least 90% of taxable income — this is why they're attractive income investments.", wrongFeedback: "REITs are legally required to distribute at least 90% of taxable income to shareholders, making them reliable income generators." }
    }
  },
  {
    id: 106, chapter: 2,
    title: "Advanced Tax Optimization",
    icon: "🧮", desc: "Legal strategies to minimize the taxes you pay on your ETF investments.", tags: ["Tax", "8 min"], xp: 90, gold: 25,
    lesson: {
      heading: "Tax optimization: Keep more of what you earn", intro: "You can't control market returns. But you can legally control how much tax you pay. Here's how.",
      blocks: [
        { label: "Core strategies", heading: "4 legal tax minimization strategies", body: "1. Use your full Sparerpauschbetrag (€1,000/year). 2. Prefer accumulating ETFs to defer dividend tax. 3. Don't sell unless necessary — unrealized gains aren't taxed. 4. If you must sell, consider selling in a low-income year.", highlight: "Every euro of tax you avoid staying invested = compound growth continuing on that euro. Tax efficiency compounds just like returns.", example: "<strong>Example:</strong> Instead of selling €10,000 of ETFs to buy a car, take a low-interest car loan. The €10,000 continues compounding at 7% while the loan costs 3%. Net gain: 4%/year." },
        { label: "Advanced moves", heading: "Verlustverrechnung and more", body: "In Germany, you can offset investment losses against gains (Verlustverrechnung). If an investment loses money, those losses reduce your taxable gains. Also: between spouses, both can use separate €1,000 allowances = €2,000 total per household.", highlight: "Married couples: use both Sparerpauschbetrag allowances = €2,000/year tax-free gains. Ensure each spouse has their own depot account.", example: "<strong>Practical tip:</strong> At year-end, review your depot. If you have losses, realize them to offset gains. This is called tax-loss harvesting — legal and smart." }
      ],
      quiz: { question: "A married couple each have separate broker accounts. How much can they earn in investment gains each year without paying German capital gains tax?", options: [{ text: "€1,000 total (shared allowance)", correct: false }, { text: "€2,000 total (€1,000 each)", correct: true }, { text: "€500 each", correct: false }, { text: "There is no tax-free allowance", correct: false }], correctFeedback: "Correct! Each person has a €1,000 Sparerpauschbetrag. Married couples can use both = €2,000 per year tax-free.", wrongFeedback: "Each individual has their own €1,000 Sparerpauschbetrag. Married couples with separate accounts each use €1,000 = €2,000 total." }
    }
  },
  {
    id: 107, chapter: 2,
    title: "Leverage and Leveraged ETFs",
    icon: "⚙️", desc: "What leveraged ETFs are and why they're dangerous for most investors.", tags: ["Advanced", "7 min"], xp: 85, gold: 22,
    lesson: {
      heading: "Leveraged ETFs: Amplified gains and amplified losses", intro: "Leveraged ETFs promise 2x or 3x the daily returns of an index. They sound amazing. The reality is more complicated.",
      blocks: [
        { label: "How they work", heading: "2x and 3x daily leverage", body: "A 2x leveraged ETF aims to deliver double the daily return of its index. If the MSCI World rises 1%, the 2x ETF rises 2%. If the MSCI World falls 1%, the 2x ETF falls 2%. The key word is DAILY.", highlight: "Leveraged ETFs reset daily. This means they suffer from 'volatility decay' in sideways or choppy markets — losing money even when the index is flat.", example: "<strong>Volatility decay example:</strong> Index up 10%, down 9.09%: back to start. 2x ETF: up 20%, down 18.18%. Net result: -2%. The index is flat, the leveraged ETF lost money." },
        { label: "The verdict", heading: "Should you use leveraged ETFs?", body: "For 99% of investors: no. They're complex, carry decay risk, have high TERs, and require active management. They can work in strong bull markets but devastate portfolios in volatile periods.", highlight: "Warren Buffett has never used leverage. Jack Bogle, the father of index investing, called leverage dangerous for retail investors. That should tell you something.", example: "<strong>If you still want leverage:</strong> Limit to max 5-10% of portfolio. Use only in strong uptrends. Accept you could lose 80%+ in a market crash." }
      ],
      quiz: { question: "A 2x leveraged ETF tracks the S&P 500. The S&P 500 rises 5% on Monday and falls 4.76% on Tuesday (returning to exactly where it started). What happened to the 2x ETF?", options: [{ text: "It also returned to where it started", correct: false }, { text: "It made a small gain", correct: false }, { text: "It lost money despite the index being flat", correct: true }, { text: "It doubled the index loss", correct: false }], correctFeedback: "Correct! This is volatility decay. 2x ETF: +10% Monday, -9.52% Tuesday. Net: approximately -0.5% loss. The index is flat.", wrongFeedback: "Volatility decay: the 2x ETF gains 10% then loses 9.52%, resulting in a small net loss even though the index returned to its starting point." }
    }
  },
  {
    id: 108, chapter: 2,
    title: "Factor Investing (Smart Beta)",
    icon: "🎲", desc: "Can you systematically beat the market by tilting to specific factors?", tags: ["Advanced", "7 min"], xp: 85, gold: 22,
    lesson: {
      heading: "Factor investing: Is there a smarter way to index?", intro: "Academic research has identified specific 'factors' that have historically produced higher returns than the broad market. This is the basis of factor investing.",
      blocks: [
        { label: "The factors", heading: "5 factors that historically outperform", body: "1. Value — cheap companies outperform expensive ones long-term. 2. Size — small companies outperform large ones. 3. Quality — profitable, low-debt companies outperform. 4. Momentum — recent winners tend to continue winning short-term. 5. Low volatility — less volatile stocks often outperform.", highlight: "Factor investing (also called Smart Beta) sits between passive indexing and active management. Evidence supports it, but patience is required.", example: "<strong>Value factor example:</strong> Companies with low P/E ratios have historically returned ~2% more annually than the broad market over long periods." },
        { label: "Practical application", heading: "How to implement factor investing", body: "Factor ETFs exist for each factor. You can tilt your portfolio toward factors you believe in. The key: factors can underperform for years before outperforming. You need conviction and patience.", highlight: "Factor investing requires 10+ years to see meaningful results. Don't switch factors if they underperform for 1-3 years — that's normal.", example: "<strong>Simple factor tilt:</strong> 70% MSCI World + 15% MSCI World Value + 15% MSCI World Quality. Slightly different exposure without abandoning diversification." }
      ],
      quiz: { question: "The 'value factor' refers to which investment approach?", options: [{ text: "Buying stocks with high recent momentum", correct: false }, { text: "Buying stocks that appear cheap relative to fundamentals", correct: true }, { text: "Buying the highest-quality companies regardless of price", correct: false }, { text: "Buying small-cap stocks only", correct: false }], correctFeedback: "Correct! Value investing means buying cheap stocks (low P/E, P/B ratios). Historically, these have outperformed over long periods.", wrongFeedback: "The value factor means buying stocks that appear undervalued relative to their fundamentals. Low P/E ratio stocks have historically outperformed." }
    }
  },
  {
    id: 109, chapter: 2,
    title: "The Safe Withdrawal Rate",
    icon: "🔐", desc: "How much can you safely withdraw from your portfolio in retirement without running out?", tags: ["Retirement", "7 min"], xp: 85, gold: 22,
    lesson: {
      heading: "The 4% rule: Your retirement spending guide", intro: "You've built a big portfolio. Now how do you actually live off it without running out of money?",
      blocks: [
        { label: "The 4% rule", heading: "The Trinity Study findings", body: "The 4% rule comes from the Trinity Study (1998) which analyzed historical market data. They found that withdrawing 4% of your portfolio annually (adjusted for inflation) meant the portfolio lasted 30+ years in 95% of historical scenarios.", highlight: "4% withdrawal rate has a 95%+ historical success rate over 30 years with a stocks/bonds portfolio. This is the foundation of most retirement planning.", example: "<strong>€1 million portfolio:</strong> 4% = €40,000/year safe withdrawal. Adjusted for 3% inflation: Year 2 = €41,200, Year 3 = €42,436, etc." },
        { label: "Refinements", heading: "Making the 4% rule work for you", body: "For early retirees with 40-50 year horizons, some researchers suggest 3-3.5% is safer. For those with other income (pension, rental), 4-5% may be fine. Flexibility helps enormously.", highlight: "Flexible withdrawal strategy: spend 4% in good years, reduce to 3% in market downturns. This dramatically improves portfolio survival.", example: "<strong>The guardrails approach:</strong> Normal withdrawal: 4%. If portfolio falls 20%: reduce withdrawal by 10%. If portfolio rises 20%: you can spend a bit more. Stay flexible." }
      ],
      quiz: { question: "Using the 4% rule, how much can someone with a €800,000 portfolio safely withdraw annually in retirement?", options: [{ text: "€20,000", correct: false }, { text: "€32,000", correct: true }, { text: "€40,000", correct: false }, { text: "€80,000", correct: false }], correctFeedback: "Correct! 4% of €800,000 = €32,000 per year — the historically safe withdrawal rate.", wrongFeedback: "4% of €800,000 = €32,000 per year. This amount can be withdrawn annually with a historically high probability of not running out." }
    }
  },
  {
    id: 110, chapter: 2,
    title: "Inflation-Protected Investments",
    icon: "🛡️", desc: "How to protect your portfolio against high inflation periods.", tags: ["Inflation", "6 min"], xp: 80, gold: 20,
    lesson: {
      heading: "Inflation protection: Keeping your purchasing power", intro: "2022 showed us that inflation can return. Here's how to protect your portfolio when it does.",
      blocks: [
        { label: "What works", heading: "Assets that beat inflation", body: "Historically, stocks have beaten inflation over long periods. But in the short-term, high inflation hurts stock valuations. The best short-term inflation hedges: TIPS (inflation-linked bonds), real estate (REITs), commodities, and gold.", highlight: "For long-term investors (10+ years): staying in stocks is the best inflation protection. For near-retirees: add some TIPS and REITs.", example: "<strong>Germany inflation 2022:</strong> 7.9% annual inflation. German government bonds: -15%. Global stock ETF: -13% in EUR. REIT ETF: -20%. Commodities ETF: +20%." },
        { label: "TIPS explained", heading: "Inflation-linked bonds", body: "TIPS (Treasury Inflation-Protected Securities) are bonds where the principal adjusts with inflation. If inflation rises 5%, the bond's value rises 5% too. You're guaranteed to maintain purchasing power.", highlight: "ETFs of TIPS/inflation-linked bonds: iShares $ TIPS (ITPS) or Lyxor EUR 2-10Y Inflation Exp. These hedge against unexpected inflation spikes.", example: "<strong>Practical allocation:</strong> If you're 5-10 years from retirement: consider 10% in inflation-linked bond ETF as insurance against high-inflation scenarios." }
      ],
      quiz: { question: "Which asset class has historically provided the best LONG-TERM protection against inflation?", options: [{ text: "Cash savings accounts", correct: false }, { text: "Gold", correct: false }, { text: "Government bonds", correct: false }, { text: "Equities (stocks/ETFs)", correct: true }], correctFeedback: "Correct! Over long periods (10+ years), stocks have consistently outpaced inflation better than any other major asset class.", wrongFeedback: "While gold and TIPS protect against short-term inflation, stocks have historically provided the best long-term inflation protection through real business growth." }
    }
  },
  {
    id: 111, chapter: 2,
    title: "Sequence of Returns Risk",
    icon: "📊", desc: "The hidden risk that can destroy a retirement portfolio — and how to prevent it.", tags: ["Retirement", "7 min"], xp: 85, gold: 22,
    lesson: {
      heading: "Sequence of returns: The timing risk no one talks about", intro: "Two investors with identical portfolios and withdrawal rates can have completely different outcomes. The difference? When the bad years happen.",
      blocks: [
        { label: "The risk", heading: "Why timing matters in retirement", body: "Sequence of returns risk: experiencing large losses early in retirement is far more damaging than the same losses later. Why? Because you're selling shares at low prices to fund expenses, leaving fewer shares to recover when markets rise.", highlight: "A 30% crash in year 1 of retirement is devastating. A 30% crash in year 20 is manageable. The sequence matters enormously.", example: "<strong>Example:</strong> Portfolio A: -30% in year 1, then 10%/year. Portfolio B: 10%/year for 19 years, then -30%. Same average return. Portfolio A runs out in year 23. Portfolio B lasts 30+ years." },
        { label: "Solutions", heading: "How to protect against sequence risk", body: "1. Cash buffer: keep 1-2 years of expenses in cash. Don't sell stocks during crashes. 2. Bond tent: increase bonds as retirement approaches, reduce after first 10 years. 3. Flexible spending: reduce withdrawals during market downturns. 4. Delay retirement if possible after a major crash.", highlight: "A 2-year cash buffer eliminates the need to sell stocks during market crashes. This single strategy dramatically improves retirement outcomes.", example: "<strong>Cash buffer strategy:</strong> Keep €60,000 in cash if spending €30,000/year. In a crash, live off cash for 2 years while your stocks recover." }
      ],
      quiz: { question: "Why is a major market crash more damaging in year 1 of retirement than in year 20?", options: [{ text: "Markets are more volatile early in retirement", correct: false }, { text: "You sell shares at low prices early on, leaving fewer shares to recover", correct: true }, { text: "Tax rules are different in early retirement", correct: false }, { text: "It affects only high-income retirees", correct: false }], correctFeedback: "Exactly! Selling shares at depressed prices early in retirement means fewer shares to participate in the eventual recovery.", wrongFeedback: "Sequence risk: selling shares at low prices early in retirement depletes your portfolio before it can recover. Later crashes are less damaging because you've already benefited from years of growth." }
    }
  },
  {
    id: 112, chapter: 2,
    title: "Portfolio Rebalancing Deep Dive",
    icon: "⚖️", desc: "Advanced rebalancing strategies to optimize returns and manage risk.", tags: ["Advanced", "7 min"], xp: 85, gold: 22,
    lesson: {
      heading: "Rebalancing: The discipline that beats most investors", intro: "Rebalancing sounds boring. But systematic rebalancing has been shown to add 0.5-1% annual returns while managing risk. Here's how to do it properly.",
      blocks: [
        { label: "Why rebalance", heading: "What happens without rebalancing", body: "Without rebalancing, your portfolio drifts. A portfolio that starts 80% stocks / 20% bonds will, after a bull market, become 90% stocks / 10% bonds. Your risk level has changed — and you probably didn't notice.", highlight: "Rebalancing forces you to sell high and buy low automatically. It's a mechanical discipline that removes emotion from the process.", example: "<strong>Without rebalancing (2019):</strong> 60% stocks / 40% bonds drifted to 70% stocks / 30% bonds. Covid crash (2020) then hit harder than intended." },
        { label: "When to rebalance", heading: "Calendar vs. threshold rebalancing", body: "Calendar rebalancing: rebalance at fixed intervals (annually is best). Threshold rebalancing: rebalance when any asset class drifts more than 5-10% from target. Combine both for optimal results.", highlight: "Annual rebalancing combined with 5% drift threshold is the sweet spot. Too frequent = excess costs. Too rare = excess risk.", example: "<strong>Practical process:</strong> Each January: check allocation. If stocks are >5% above target → sell some, buy bonds. If stocks are <5% below target → let new contributions rebalance naturally." }
      ],
      quiz: { question: "Your target allocation is 80% stocks / 20% bonds. After a bull market, you're at 90% stocks / 10% bonds. What should you do?", options: [{ text: "Nothing — let the winners run", correct: false }, { text: "Sell some stocks and buy bonds to restore 80/20", correct: true }, { text: "Switch entirely to stocks since they're performing well", correct: false }, { text: "Sell everything and start fresh", correct: false }], correctFeedback: "Correct! Rebalancing to 80/20 means selling stocks (selling high) and buying bonds (buying relatively lower). Disciplined and systematic.", wrongFeedback: "Rebalancing means restoring your target allocation. Selling stocks that have run up and buying underperforming bonds forces you to sell high and buy low." }
    }
  },
  {
    id: 113, chapter: 2,
    title: "The Psychology of Investing",
    icon: "🧠", desc: "The mental biases that destroy investor returns — and how to overcome them.", tags: ["Psychology", "7 min"], xp: 80, gold: 20,
    lesson: {
      heading: "Your brain is your biggest investing enemy", intro: "Behavioral finance shows that investors consistently underperform the very funds they invest in. The reason? Their own emotions.",
      blocks: [
        { label: "The biases", heading: "5 biases that cost you money", body: "1. Loss aversion: losses feel 2x worse than equivalent gains feel good. This causes premature selling. 2. Recency bias: assuming recent trends will continue. 3. Overconfidence: thinking you can pick stocks or time markets. 4. Herd behavior: buying high (when everyone's excited) and selling low (when everyone's panicking). 5. Confirmation bias: seeking information that confirms existing beliefs.", highlight: "DALBAR research: average investor earned 3.6%/year over 20 years while the S&P 500 earned 9.5%/year. The gap is entirely behavioral.", example: "<strong>How to fight biases:</strong> Automate everything. Set rules in advance. Never make investment decisions during emotional moments. Treat investing as boring on purpose." },
        { label: "The solution", heading: "Rules-based investing", body: "The best investors have simple, written rules they follow mechanically: invest €X every month on day Y. Rebalance annually. Never sell during crashes. Review only quarterly. Automate everything possible.", highlight: "Write down your investing rules when calm. Follow them automatically when emotional. The rules override feelings.", example: "<strong>Your investing rules (write these down):</strong> 1. Invest €___ on the 1st of every month. 2. Rebalance every January. 3. Don't sell for 10+ years. 4. Check portfolio maximum monthly. 5. Never change plan during a crash." }
      ],
      quiz: { question: "According to DALBAR research, why do average investors earn significantly less than index funds over 20 years?", options: [{ text: "They choose bad funds", correct: false }, { text: "They pay too many fees", correct: false }, { text: "Their behavioral mistakes — buying high and selling low", correct: true }, { text: "Index funds are fraudulent", correct: false }], correctFeedback: "Correct! Behavioral mistakes — buying during bull markets and selling during crashes — cost average investors 5-6% per year in lost returns.", wrongFeedback: "DALBAR research consistently shows the performance gap is behavioral: investors buy after markets rise and sell after they fall, destroying their returns." }
    }
  },
  {
    id: 114, chapter: 2,
    title: "Pension Planning with ETFs",
    icon: "👴", desc: "How to combine ETF investing with state pension and private pension for maximum retirement security.", tags: ["Retirement", "8 min"], xp: 90, gold: 25,
    lesson: {
      heading: "Pension planning: The three pillars approach", intro: "Relying only on state pension is risky. Combining three sources creates a robust retirement.",
      blocks: [
        { label: "The three pillars", heading: "State + Company + Private", body: "Pillar 1: State pension (Gesetzliche Rentenversicherung in Germany). Pillar 2: Company pension (Betriebliche Altersvorsorge). Pillar 3: Private savings — this is where ETFs come in. Building all three creates genuine security.", highlight: "In Germany, state pension alone will likely replace only 40-50% of your pre-retirement income. ETFs fill the gap.", example: "<strong>Target income in retirement:</strong> €2,500/month. State pension: €1,200. Company pension: €300. ETF portfolio (4% withdrawal): €1,000. Total: €2,500. Covered." },
        { label: "ETF pension strategy", heading: "The Riester and Rürup alternatives", body: "Germany offers state-subsidized pension products (Riester, Rürup). Most have high fees and restrictions that make them inferior to self-managed ETF portfolios for most people. The exception: Rürup can be valuable for self-employed with high tax rates.", highlight: "For most employees in Germany: self-managed ETF depot outperforms Riester after fees and restrictions. Do your own math.", example: "<strong>Recommended approach:</strong> Maximize company pension matching (free money!). Then self-managed ETF depot. Consider Rürup only if you're self-employed with 35%+ marginal tax rate." }
      ],
      quiz: { question: "In Germany, approximately what percentage of pre-retirement income does the state pension (GRV) typically replace?", options: [{ text: "70-80%", correct: false }, { text: "40-50%", correct: true }, { text: "90-100%", correct: false }, { text: "10-20%", correct: false }], correctFeedback: "Correct! The German state pension typically replaces about 40-50% of pre-retirement income. Private savings are essential to fill the gap.", wrongFeedback: "German state pension replaces approximately 40-50% of pre-retirement income. Private savings — ideally through ETFs — are necessary to maintain living standards." }
    }
  },
  {
    id: 115, chapter: 2,
    title: "Commodity ETFs",
    icon: "🛢️", desc: "Gold, oil, agriculture — when commodities belong in a portfolio and when they don't.", tags: ["Commodities", "6 min"], xp: 75, gold: 19,
    lesson: {
      heading: "Commodity ETFs: Real assets for uncertain times", intro: "Commodities — gold, oil, wheat, copper — behave differently from stocks. That makes them interesting for diversification.",
      blocks: [
        { label: "Gold", heading: "Gold: The crisis hedge", body: "Gold has no earnings, pays no dividends, and produces nothing. Yet it has maintained purchasing power for 5,000 years. It rises during crises, geopolitical tension, and high inflation. It often falls when stocks rise strongly.", highlight: "Gold is insurance, not investment. It protects against tail risks — currency crises, wars, high inflation. Keep it small (5-10% max).", example: "<strong>2020 COVID crash:</strong> Stocks fell 34%. Gold rose 25%. Gold's negative correlation during crises is why people hold it." },
        { label: "Other commodities", heading: "Oil, agriculture, metals", body: "Commodity ETFs track baskets of raw materials. They provide inflation protection since commodity prices rise with inflation. However, they have no intrinsic return — they only go up if the commodity price goes up.", highlight: "Commodity ETFs are for inflation hedging and diversification. They shouldn't form the core of a long-term portfolio.", example: "<strong>Practical approach:</strong> No commodities for most investors. If you want: 5% gold ETC + 5% broad commodity ETF max. Everything else in stocks." }
      ],
      quiz: { question: "Why do investors hold gold in their portfolio despite it paying no dividends and producing no earnings?", options: [{ text: "Gold always outperforms stocks", correct: false }, { text: "It acts as insurance against crises and maintains purchasing power long-term", correct: true }, { text: "Gold has guaranteed returns", correct: false }, { text: "It grows faster than any other asset class", correct: false }], correctFeedback: "Correct! Gold is insurance — it tends to rise when other assets fall, providing portfolio protection during crises.", wrongFeedback: "Gold is held as crisis insurance and inflation hedge. It often moves inversely to stocks during market stress, providing diversification benefits." }
    }
  },
  {
    id: 116, chapter: 2,
    title: "International vs. Home Country Bias",
    icon: "🌐", desc: "Why investing mostly in your home country is a mistake — and how to fix it.", tags: ["Diversification", "5 min"], xp: 75, gold: 19,
    lesson: {
      heading: "Home country bias: The invisible mistake", intro: "Most German investors have too much Germany in their portfolio. Most American investors have too much USA. This is called home country bias — and it's a subtle but costly mistake.",
      blocks: [
        { label: "The problem", heading: "What is home country bias?", body: "Investors disproportionately invest in companies from their own country. Germans often hold too much DAX. Americans too much S&P 500. This creates unnecessary concentration in one economy.", highlight: "Germany represents about 2.5% of global stock market cap. If you hold 50% German stocks, you're massively overweighted in one economy.", example: "<strong>Counter-example:</strong> A global ETF gives you exposure to all major economies automatically. If Germany struggles but the US booms, you benefit from both." },
        { label: "The solution", heading: "True global diversification", body: "A simple global ETF (MSCI World or FTSE All-World) already solves home country bias automatically. You get proper global weighting without having to think about it.", highlight: "The MSCI World and FTSE All-World are built for global investors. They eliminate home country bias while maintaining professional-grade diversification.", example: "<strong>If you're German:</strong> MSCI World is perfectly fine — Germany is 2.5% of it (correct weighting). No need to add more DAX exposure." }
      ],
      quiz: { question: "Germany represents approximately what percentage of global stock market capitalization?", options: [{ text: "About 15%", correct: false }, { text: "About 8%", correct: false }, { text: "About 2.5%", correct: true }, { text: "About 25%", correct: false }], correctFeedback: "Correct! Germany is about 2.5% of global market cap. A global ETF gives you this correct weighting automatically.", wrongFeedback: "Germany represents approximately 2.5% of global stock market capitalization. A global ETF weights it correctly without any home country bias." }
    }
  },
  {
    id: 117, chapter: 2,
    title: "ETF Liquidity and Trading",
    icon: "💧", desc: "How ETF trading works in practice and how to avoid common execution mistakes.", tags: ["Trading", "6 min"], xp: 75, gold: 19,
    lesson: {
      heading: "ETF trading: Getting the best execution", intro: "You've chosen your ETF. Now you need to actually buy it without overpaying. This quest shows you how.",
      blocks: [
        { label: "Bid-ask spread", heading: "Understanding the spread", body: "ETFs have a bid price (what buyers will pay) and an ask price (what sellers want). The difference is the spread. For liquid ETFs like MSCI World trackers, this is typically 0.01-0.05%. For less liquid ETFs, it can be 0.3%+.", highlight: "Always buy liquid ETFs with tight spreads. The most popular ETFs tracking major indices have the lowest spreads.", example: "<strong>Checking spread:</strong> IWDA (iShares MSCI World) typical spread: 0.01-0.05%. A niche emerging market ETF might have 0.2-0.3% spread. That 0.2% is an immediate cost." },
        { label: "Limit orders", heading: "Always use limit orders", body: "A market order buys at whatever price is available — you might get a bad deal if liquidity is low. A limit order specifies the maximum price you'll pay. Use limit orders for ETF purchases, especially larger amounts.", highlight: "Always use limit orders. Set your limit slightly above the current ask price. This ensures execution while protecting against sudden price jumps.", example: "<strong>Practical:</strong> IWDA is trading at €85.50. Set limit order at €85.55. You'll almost certainly get filled at the current price without overpaying if there's a sudden move." }
      ],
      quiz: { question: "What type of order should you generally use when buying ETFs to avoid overpaying?", options: [{ text: "Market order — fastest execution", correct: false }, { text: "Limit order — specify maximum price", correct: true }, { text: "Stop order — triggered by price", correct: false }, { text: "Type of order doesn't matter for ETFs", correct: false }], correctFeedback: "Correct! Limit orders protect you from paying more than intended, especially for less liquid ETFs or during volatile markets.", wrongFeedback: "Limit orders let you specify the maximum price you'll pay. This protects against overpaying, especially for less liquid ETFs or in volatile conditions." }
    }
  },
  {
    id: 118, chapter: 2,
    title: "Children's Investment Accounts",
    icon: "👶", desc: "How to start investing for your children — and why starting early makes a huge difference.", tags: ["Planning", "6 min"], xp: 80, gold: 20,
    lesson: {
      heading: "Investing for children: The greatest gift", intro: "Starting a child's investment account could mean the difference between financial freedom and financial struggle for them. Here's how.",
      blocks: [
        { label: "The power", heading: "What €100/month from birth becomes", body: "If you invest €100/month for a child from birth to age 18 (€21,600 total), and the child continues investing €200/month from 18 to 65 at 7% return, they retire with approximately €2.5 million.", highlight: "€100/month from birth + continuing investing = lifelong financial security. The gift of starting early is worth millions.", example: "<strong>Just the first 18 years:</strong> €100/month for 18 years at 7% = €46,000 — more than double the €21,600 invested. The child has a head start." },
        { label: "How to set it up", heading: "Depot for minors in Germany", body: "In Germany, minors can have a Depot (broker account) with a parent as custodian. Trade Republic and Comdirect both offer minor accounts. Until 18, parents control it. At 18, the child inherits it.", highlight: "Minor accounts in Germany: the child's own tax-free allowance (€1,000 Sparerpauschbetrag) can be used from birth. Combine with parent's allowance for maximum tax efficiency.", example: "<strong>Setup:</strong> Open minor depot at Trade Republic or Comdirect. Add €50-200/month savings plan to MSCI World ETF. Forget about it until they're 18." }
      ],
      quiz: { question: "What is the main advantage of investing for a child from birth rather than starting when they turn 18?", options: [{ text: "Children get better interest rates", correct: false }, { text: "The 18 extra years of compound growth dramatically increases final wealth", correct: true }, { text: "There are no tax rules for children", correct: false }, { text: "Children's accounts have higher returns", correct: false }], correctFeedback: "Correct! 18 extra years of compound growth at 7% means the portfolio grows ~3.4x more than starting at 18.", wrongFeedback: "Starting 18 years earlier allows compound interest to work for 18 additional years, creating dramatically larger final wealth due to exponential growth." }
    }
  },
  {
    id: 119, chapter: 2,
    title: "Socially Responsible Investing Deep Dive",
    icon: "🌍", desc: "Beyond basic ESG — impact investing, exclusions, and building a values-aligned portfolio.", tags: ["ESG", "6 min"], xp: 75, gold: 19,
    lesson: {
      heading: "Values-based investing: Going deeper than ESG labels", intro: "ESG is a broad term. If your values really matter to you, you need to understand exactly what's in your ETF.",
      blocks: [
        { label: "ESG spectrum", heading: "From exclusions to impact", body: "Level 1 (Exclusion): Remove worst offenders (tobacco, weapons). Still holds most companies. Level 2 (ESG-scored): Weight companies by ESG scores. Better performers get larger allocation. Level 3 (Thematic): Focus on specific themes like clean energy, water, or social housing.", highlight: "Most 'ESG ETFs' are Level 1 — they mostly look like the regular index with a few sectors removed. True impact investing requires more effort.", example: "<strong>If carbon footprint matters to you:</strong> Look for ETFs with explicit carbon intensity targets. iShares Paris-Aligned Climate ETFs aim to align with 1.5°C warming scenarios." },
        { label: "Practical ESG investing", heading: "Building a values-aligned portfolio", body: "Research the specific exclusions and methodology of any ESG ETF you're considering. MSCI and Sustainalytics both rate companies — check which rating agency your ETF uses.", highlight: "Before buying any ESG ETF, check: 1. What does it exclude? 2. Does it hold companies you disagree with? 3. What is its carbon footprint vs. regular index?", example: "<strong>Tools:</strong> ETF.com, JustETF.com, and fund factsheets all show holdings. You can check if your 'clean' ETF still holds companies you want to avoid." }
      ],
      quiz: { question: "A 'Level 1' ESG ETF primarily works by:", options: [{ text: "Only investing in companies with perfect ESG scores", correct: false }, { text: "Excluding companies in specific controversial industries like tobacco and weapons", correct: true }, { text: "Actively voting against management of all companies", correct: false }, { text: "Investing only in renewable energy", correct: false }], correctFeedback: "Correct! Level 1 ESG ETFs primarily use negative screening — removing the worst offenders while mostly tracking the regular index.", wrongFeedback: "Level 1 ESG ETFs use negative screening: they remove specific industries (tobacco, weapons, adult entertainment) but otherwise look similar to conventional indices." }
    }
  },
  {
    id: 120, chapter: 2,
    title: "Currency Risk in Global ETFs",
    icon: "💱", desc: "How currency fluctuations affect your global ETF returns — and what to do about it.", tags: ["Advanced", "6 min"], xp: 80, gold: 20,
    lesson: {
      heading: "Currency risk: The hidden factor in global investing", intro: "When you buy a US stock ETF in Europe, you're exposed to two things: US stock performance AND EUR/USD exchange rate movements.",
      blocks: [
        { label: "How it works", heading: "Currency exposure explained", body: "Your MSCI World ETF is priced in EUR, but most underlying holdings are in USD, GBP, JPY, etc. If the USD strengthens 5% against EUR, your US holdings gain an extra 5% in EUR terms. If USD weakens 5%, you lose 5%.", highlight: "Currency exposure works both ways. Over long periods, currencies tend to mean-revert, making currency risk less important for long-term investors.", example: "<strong>2022 example:</strong> US stocks fell 20% in USD terms. But EUR/USD fell 10% (dollar strengthened). European investors in MSCI World lost only ~12% — the weak euro cushioned the blow." },
        { label: "Hedged vs. unhedged", heading: "Currency-hedged ETFs", body: "Currency-hedged ETFs remove exchange rate risk by using currency forwards. They maintain the pure stock market return in your base currency. However, hedging costs 0.5-1.5% annually and varies.", highlight: "For long-term investors (10+ years): currency risk averages out, unhedged is fine and cheaper. For short-term (under 5 years): consider hedged ETFs.", example: "<strong>Conclusion for most investors:</strong> Use unhedged global ETFs. Currency fluctuations add short-term noise but smooth out over decades. The extra cost of hedging isn't worth it long-term." }
      ],
      quiz: { question: "You hold a USD-denominated ETF. The US market is flat (0% return) but the USD strengthens 8% against the EUR. What is your return in EUR?", options: [{ text: "0% — only stock returns matter", correct: false }, { text: "-8% — the currency move hurts you", correct: false }, { text: "+8% — the stronger dollar benefits you as a EUR investor", correct: true }, { text: "It depends on the ETF structure", correct: false }], correctFeedback: "Correct! A stronger USD means your dollar-denominated assets are worth more in EUR terms. Currency moves can help or hurt returns.", wrongFeedback: "When USD strengthens against EUR, your dollar-denominated holdings are worth more when converted to EUR. The currency appreciation adds to your return." }
    }
  },
  {
    id: 121, chapter: 2,
    title: "Comparing Brokers in Depth",
    icon: "🏦", desc: "A deep comparison of the major European brokers for ETF investing.", tags: ["Practical", "7 min"], xp: 80, gold: 20,
    lesson: {
      heading: "Choosing the right broker: A complete comparison", intro: "Your broker choice affects costs, available ETFs, and your overall experience. Here's what actually matters.",
      blocks: [
        { label: "Key criteria", heading: "What to look for in a broker", body: "1. ETF savings plan fees (many now offer €0). 2. Selection of ETFs available for savings plans. 3. Minimum investment amount. 4. App quality and usability. 5. Safety (regulated, deposit protection). 6. Additional services (tax reports, etc.).", highlight: "For buy-and-hold ETF investors, the most important factor is savings plan fees. Most top brokers now charge €0 for major ETF savings plans.", example: "<strong>Top brokers in Germany 2024:</strong> Trade Republic (€0 plans, 4% interest on cash), Scalable Capital (free plan available), DKB (€0 plans, established bank), Comdirect (large selection, slightly higher costs)." },
        { label: "Comparison", heading: "Trade Republic vs. Scalable vs. DKB", body: "Trade Republic: best for simplicity, 4% interest on uninvested cash, app-only, limited to major ETFs. Scalable Capital: more ETFs, desktop access, Prime plan for active traders. DKB: established bank, full banking features, good ETF selection.", highlight: "For most beginners: Trade Republic or Scalable Capital free plan. Both offer €0 savings plans for the most important ETFs.", example: "<strong>Our recommendation:</strong> Start with Trade Republic for simplicity. As you grow, consider adding Scalable Capital for broader ETF access and desktop interface." }
      ],
      quiz: { question: "What is the most important factor when choosing a broker for a buy-and-hold ETF savings plan strategy?", options: [{ text: "The broker's history and brand recognition", correct: false }, { text: "Savings plan fees and available ETF selection", correct: true }, { text: "Whether they offer currency trading", correct: false }, { text: "Physical branch locations", correct: false }], correctFeedback: "Correct! For ETF savings plan investors, the key factors are savings plan fees (aim for €0) and the ETF selection available.", wrongFeedback: "For long-term ETF investors, the savings plan fees and ETF selection are most important. A €0 savings plan in MSCI World ETF is the ideal setup." }
    }
  },
  {
    id: 122, chapter: 2,
    title: "The Endowment Model",
    icon: "🎓", desc: "How university endowments like Yale invest — and what retail investors can learn.", tags: ["Advanced", "7 min"], xp: 85, gold: 22,
    lesson: {
      heading: "The Yale Endowment Model: Lessons for regular investors", intro: "Yale's endowment has averaged 13.7% annually for 30 years. What can regular investors learn from it?",
      blocks: [
        { label: "The model", heading: "Alternative assets and diversification", body: "Yale allocates heavily to: private equity (40%), real assets (30%), hedge funds (20%), and only 10% to traditional stocks and bonds. This broad diversification has driven exceptional returns.", highlight: "The Yale model works for Yale because they have decades-long lockups and billions to allocate. Most of this is inaccessible to retail investors.", example: "<strong>What retail investors CAN access:</strong> REITs (real estate), commodity ETFs, TIPS (inflation protection), small-cap value ETFs. A simplified 'endowment lite' approach." },
        { label: "Retail version", heading: "The accessible endowment portfolio", body: "A simplified endowment-inspired retail portfolio: 50% global equities ETF, 15% REIT ETF, 15% small-cap value ETF, 10% TIPS (inflation bonds), 10% commodity ETF. This provides broad diversification across asset classes.", highlight: "Even a simplified version of alternative diversification can improve risk-adjusted returns. REITs and commodities reduce correlation to pure stock exposure.", example: "<strong>Simple endowment-lite ETF portfolio:</strong> VWCE 55% + REIT ETF 20% + TIPS ETF 10% + Commodity ETF 10% + Small Cap ETF 5%. Diversified, accessible, low-cost." }
      ],
      quiz: { question: "Why can't retail investors directly replicate the Yale Endowment model?", options: [{ text: "It's illegal for retail investors", correct: false }, { text: "Most of Yale's assets (private equity, hedge funds) are inaccessible to retail investors", correct: true }, { text: "The strategy doesn't work for smaller amounts", correct: false }, { text: "Retail investors are not allowed to hold alternative assets", correct: false }], correctFeedback: "Correct! Yale's main allocations (private equity, hedge funds) require minimum investments of millions and multi-year lockups — inaccessible to retail investors.", wrongFeedback: "Yale's main allocations are to private equity and hedge funds, which typically require millions in minimum investment and years of lockup — inaccessible to most retail investors." }
    }
  },
  {
    id: 123, chapter: 2,
    title: "Building Passive Income Streams",
    icon: "💸", desc: "How to build multiple passive income streams using ETFs and other investments.", tags: ["Income", "7 min"], xp: 85, gold: 22,
    lesson: {
      heading: "Passive income: Building streams that pay you while you sleep", intro: "True financial freedom comes from income that doesn't require your time. Here's how to build it systematically.",
      blocks: [
        { label: "Income types", heading: "Three types of passive investment income", body: "1. Dividends from dividend ETFs (typically 2-4% annually). 2. Interest from bond ETFs (typically 3-5%). 3. Rental income proxied through REIT ETFs (typically 3-5%). Combined: a diversified passive income portfolio can generate 3-4% annually.", highlight: "A €500,000 diversified income portfolio generating 3-4% = €15,000-20,000/year in passive income. That's €1,250-1,667/month.", example: "<strong>Sample income portfolio:</strong> 40% Dividend ETF (3% yield) + 30% REIT ETF (4% yield) + 30% Bond ETF (4% yield). Blended yield: ~3.5%. On €300,000: €10,500/year." },
        { label: "Building the portfolio", heading: "The accumulation to income transition", body: "Phase 1 (age 20-45): Accumulate wealth using growth ETFs. No dividends — reinvest everything. Phase 2 (age 45-55): Gradually shift to income-producing ETFs. Phase 3 (retirement): Live primarily on portfolio income.", highlight: "The transition from growth to income portfolio should be gradual — 5-10 years before retirement. Sudden switches risk poor timing.", example: "<strong>Practical transition:</strong> Age 50: 70% growth + 30% income. Age 55: 50/50. Age 60: 30% growth + 70% income. Age 65: 20% growth + 80% income." }
      ],
      quiz: { question: "You have a €400,000 income portfolio with a blended yield of 3.5%. How much annual passive income does this generate?", options: [{ text: "€14,000", correct: true }, { text: "€40,000", correct: false }, { text: "€4,000", correct: false }, { text: "€35,000", correct: false }], correctFeedback: "Correct! €400,000 × 3.5% = €14,000 per year in passive income.", wrongFeedback: "€400,000 × 3.5% = €14,000 per year. That's €1,166/month in passive income without selling any assets." }
    }
  },
  {
    id: 124, chapter: 2,
    title: "Advanced Portfolio Stress Testing",
    icon: "🔬", desc: "How to test your portfolio against historical crashes and worst-case scenarios.", tags: ["Advanced", "7 min"], xp: 85, gold: 22,
    lesson: {
      heading: "Stress testing: Can your portfolio survive the worst?", intro: "The true test of a portfolio isn't how it performs in good times — it's whether you can hold it through the worst.",
      blocks: [
        { label: "Historical scenarios", heading: "What history tells us about crashes", body: "Great Depression (1929-1932): US stocks fell 89%. Recovery: 25 years. Dot-com (2000-2002): NASDAQ fell 78%. Recovery: 15 years. 2008: Global stocks fell 50-60%. Recovery: 5-7 years. COVID (2020): Global stocks fell 34%. Recovery: 6 months.", highlight: "The key insight: the more diversified and global your portfolio, the faster the recovery. US-only portfolios took 25 years after 1929. Global ETFs would have recovered faster.", example: "<strong>MSCI World in 2008:</strong> Fell 41%. Recovered by 2013 — just 5 years. A US-only investor in 1929 waited 25 years. Diversification dramatically speeds recovery." },
        { label: "Your test", heading: "Stress test your own portfolio", body: "Ask yourself: If my portfolio fell 50% tomorrow, what would I do? If you'd sell, your allocation is too aggressive. If you'd stay calm and maybe buy more, it's right. Your emotional response during stress is the real measure.", highlight: "The correct portfolio is one you can hold through a 40-50% temporary decline without panic-selling. Reduce risk until you reach that point.", example: "<strong>Practical test:</strong> Calculate your portfolio down 40%. Could you maintain your lifestyle? Would you panic? A 40% drawdown on €100,000 = €60,000 remaining. How does that feel? Adjust risk accordingly." }
      ],
      quiz: { question: "A globally diversified ETF portfolio fell 50% in 2008. Approximately how long did it take to recover to previous highs?", options: [{ text: "25 years", correct: false }, { text: "About 5 years", correct: true }, { text: "1 year", correct: false }, { text: "It never recovered", correct: false }], correctFeedback: "Correct! A globally diversified ETF portfolio recovered from the 2008 crash in approximately 5 years — by 2013.", wrongFeedback: "Global ETF portfolios recovered from 2008 in about 5 years. Diversification significantly speeds recovery compared to concentrated positions." }
    }
  },
  {
    id: 125, chapter: 2,
    title: "Chapter II Complete: Advanced Investor",
    icon: "🌊", desc: "Congratulations on completing the Compound Sea! You are now an advanced investor.", tags: ["Milestone", "10 min"], xp: 200, gold: 75,
    lesson: {
      heading: "Chapter II Complete — You've mastered the Compound Sea", intro: "You've completed one of the most comprehensive investing educations available anywhere. Let's celebrate what you've achieved.",
      blocks: [
        { label: "Your knowledge", heading: "What you've mastered in Chapter II", body: "Compound interest mathematics, building a €1M portfolio, FIRE movement, dividend investing, REITs, advanced tax optimization, factor investing, pension planning, safe withdrawal rates, behavioral finance, sequence of returns risk, and much more.", highlight: "You now understand investing at a level most financial advisors don't clearly explain to their clients. This knowledge is genuinely valuable.", example: "<strong>Your Chapter II skills:</strong> You can now plan for financial independence, build a diversified income portfolio, minimize taxes legally, plan your retirement, and stay emotionally disciplined through market crashes." },
        { label: "What's ahead", heading: "Your investing journey continues", body: "Chapter III will cover: Stock market analysis, individual company evaluation, global macroeconomics, alternative investments, entrepreneurial wealth building, and advanced wealth preservation strategies.", highlight: "Chapter III: Stock Mountains — where we go even deeper into wealth creation strategies for serious investors.", example: "<strong>Your mission now:</strong> Apply what you've learned. Open a broker account if you haven't. Set up your savings plan. Build your emergency fund. Start your journey to financial independence." }
      ],
      quiz: { question: "Which of the following best describes someone who has completed Chapters I and II of Wealth Quest?", options: [{ text: "A complete beginner who needs more help", correct: false }, { text: "Someone with more investing knowledge than most financial advisors clearly explain", correct: true }, { text: "A professional fund manager", correct: false }, { text: "Someone who still needs to learn the basics", correct: false }], correctFeedback: "Correct! Completing Chapters I and II gives you a comprehensive understanding that exceeds what most people ever learn about investing.", wrongFeedback: "Chapters I and II cover everything from the basics to advanced strategies — knowledge that most people never acquire and that even many financial advisors don't clearly explain to clients." }
    }
  }
]

// ============================================================
// DAILY QUESTS — Mini quests that refresh daily
// ============================================================
export const DAILY_QUESTS = [
  { id: 'd1', title: 'Market Check', icon: '📈', desc: 'Check the MSCI World price today. Is it up or down? Remember: short-term moves are noise.', xp: 15, gold: 5, action: 'Reflect' },
  { id: 'd2', title: 'The Rule of 72', icon: '🧮', desc: 'Calculate how long it takes your money to double at 7% return. Answer: 72/7 ≈ 10 years.', xp: 15, gold: 5, action: 'Calculate' },
  { id: 'd3', title: 'Fee Check', icon: '💸', desc: 'Look up the TER of the ETF you own or want to buy. Is it under 0.25%?', xp: 15, gold: 5, action: 'Research' },
  { id: 'd4', title: 'Emergency Fund Status', icon: '🛡️', desc: 'Do you have 3-6 months of expenses in cash? If not, what is your plan to get there?', xp: 15, gold: 5, action: 'Plan' },
  { id: 'd5', title: 'Compound Visualization', icon: '✨', desc: 'Use the ClearWealth AI calculator. What would €200/month grow to over 30 years at 7%?', xp: 15, gold: 5, action: 'Calculate' },
  { id: 'd6', title: 'Behavioral Check', icon: '🧠', desc: 'Have you checked your portfolio today? If yes — close the app and don\'t check again until next week.', xp: 15, gold: 5, action: 'Reflect' },
  { id: 'd7', title: 'Savings Rate Review', icon: '💰', desc: 'What percentage of your income are you investing? Even 10% is a great start. 20% builds real wealth.', xp: 15, gold: 5, action: 'Review' },
]

// All quests combined
export const QUESTS: Quest[] = [...CHAPTER_1, ...CHAPTER_2]

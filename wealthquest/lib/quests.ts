export const LEVEL_NAMES = ['Novice', 'Apprentice', 'Investor', 'Strategist', 'Wealth Builder', 'ETF Master', 'Market Sage', 'Wealth Master']
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
    blocks: { label: string; heading: string; body: string; highlight: string; example: string }[]
    quiz: {
      question: string
      options: { text: string; correct: boolean }[]
      correctFeedback: string
      wrongFeedback: string
    }
  }
}

export type DailyQuest = {
  id: string
  title: string
  icon: string
  desc: string
  xp: number
  gold: number
  question: string
  options: { text: string; correct: boolean }[]
  correctFeedback: string
  wrongFeedback: string
}

export const CHAPTER_ONE: Quest[] = [
  // ─── MISSION 1: THE FOUNDATION (Extended — 3 blocks each) ────────────────
  {
    id: 1, chapter: 1,
    title: "What is an ETF?", icon: "📦", desc: "Discover the most powerful investment tool for beginners.",
    tags: ["Basics", "8 min"], xp: 50, gold: 10,
    lesson: {
      heading: "Your first step into investing",
      intro: "Before you invest a single euro, you need to understand the tool that will do most of the work for you. ETFs have quietly made millions of ordinary people wealthy — and most people have never heard of them.",
      blocks: [
        {
          label: "The concept",
          heading: "What exactly is an ETF?",
          body: "ETF stands for Exchange Traded Fund. Imagine a shopping basket at the supermarket. Instead of buying one apple, you buy a basket containing 1,600 different fruits from 23 countries. That is what an ETF does with stocks. One purchase gives you instant ownership of hundreds or thousands of companies simultaneously — at a fraction of the cost of buying each individually.",
          highlight: "One MSCI World ETF gives you exposure to 1,600+ companies across 23 countries for as little as €1 per month. Apple, Microsoft, Nestlé, Toyota, Samsung — all in one purchase.",
          example: "Example: Instead of spending €3,400 to buy one Apple share, one S&P 500 ETF holds Apple plus 499 other companies for as little as €50. You own a tiny piece of every company inside."
        },
        {
          label: "Why ETFs beat almost everything",
          heading: "The three superpowers of ETFs",
          body: "ETFs have three advantages that no other investment can match simultaneously. First, diversification: one purchase spreads risk across hundreds of companies. Second, low cost: ETFs charge as little as 0.07% per year — a traditional fund charges 1.5% or more. Third, simplicity: no stock-picking, no research, no timing required. You buy the whole market and let it grow.",
          highlight: "Warren Buffett, the world's greatest investor, has publicly recommended low-cost index ETFs for ordinary investors for over 20 years. His own will instructs that 90% of his estate be invested in index funds for his family.",
          example: "Real numbers: Investor A picks individual stocks and earns 6% per year. Investor B buys a simple MSCI World ETF and earns 8% per year. On €100,000 over 30 years: Investor A ends with €574,000. Investor B ends with €1,006,000. Same effort. Very different outcome."
        },
        {
          label: "Deep dive",
          heading: "How ETFs actually work behind the scenes",
          body: "When you buy an ETF, a fund provider like iShares or Vanguard uses your money to purchase the actual underlying stocks in the correct proportions. If Apple is 5% of the MSCI World, they hold 5% Apple. When Apple's price rises, your ETF price rises proportionally. The ETF trades on a stock exchange just like a regular share — you can buy or sell any day the market is open.",
          highlight: "ETFs are not magic — they are simple, transparent and boring. That is exactly what makes them so powerful for long-term investors. Boring compounds beautifully.",
          example: "Common mistake: Many beginners think ETFs are risky because they contain stocks. In reality, a diversified ETF is far LESS risky than any individual stock. When one company in the MSCI World fails completely, it affects your portfolio by less than 0.1%."
        }
      ],
      quiz: {
        question: "What is the main advantage of an ETF over picking individual stocks?",
        options: [
          { text: "ETFs always guarantee higher returns", correct: false },
          { text: "ETFs provide instant diversification across hundreds of companies at low cost", correct: true },
          { text: "ETFs only invest in tech companies", correct: false },
          { text: "ETFs are only for professional investors", correct: false }
        ],
        correctFeedback: "Exactly right! Diversification across hundreds of companies is the superpower of ETFs — combined with very low costs and complete simplicity.",
        wrongFeedback: "The key benefit is diversification — instant exposure to hundreds or thousands of companies with a single purchase, at very low cost."
      }
    }
  },
  {
    id: 2, chapter: 1,
    title: "How the Stock Market Works", icon: "🏛️", desc: "Understand what you are actually buying when you invest.",
    tags: ["Basics", "8 min"], xp: 50, gold: 10,
    lesson: {
      heading: "The stock market explained simply",
      intro: "Most people are afraid of the stock market because they do not understand it. They see red numbers and think casino. But the stock market is simply a mechanism for buying ownership in real businesses. Once you understand what you are actually buying, that fear disappears permanently.",
      blocks: [
        {
          label: "What is a stock?",
          heading: "You become a part-owner of real businesses",
          body: "When you buy a stock, you buy a tiny ownership stake in a real company with real employees, real products and real profits. If you buy Apple stock, you own a fraction of every iPhone sold, every App Store purchase, every Mac shipped. When Apple grows and becomes more valuable, your ownership stake grows in value too. A stock is not a number on a screen — it is a piece of a living, breathing business.",
          highlight: "Every time you buy an ETF like the MSCI World, you become a part-owner of 1,600 of the world's most successful companies. You collect a fraction of their profits every single day, forever.",
          example: "Real example: If you had bought €1,000 of Apple stock in 2010, it would be worth approximately €175,000 today. Your €1,000 bought you ownership in a business that grew enormously. The stock price simply reflected that growth."
        },
        {
          label: "How prices move",
          heading: "Short-term noise vs long-term truth",
          body: "Stock prices move for two completely different reasons depending on the timeframe. In the short term — days, weeks, months — prices are driven almost entirely by emotion: fear, greed, news headlines, political events and speculation. This is pure noise. In the long term — years and decades — prices follow one thing only: the actual earnings and growth of the underlying businesses. This is the signal. Your job as an investor is to ignore the noise and trust the signal.",
          highlight: "Benjamin Graham, Warren Buffett's mentor, described it perfectly: In the short term the market is a voting machine — it counts who is popular. In the long term it is a weighing machine — it measures what is actually valuable.",
          example: "During COVID in March 2020, the MSCI World fell 34% in 33 days. Pure panic — the underlying businesses had not changed. Six months later, all losses were recovered. Investors who sold in panic locked in real losses. Investors who held or bought more made substantial gains."
        },
        {
          label: "Deep dive",
          heading: "Why stock markets go up over time",
          body: "Here is the most important thing to understand: over long periods, stock markets go up because human productivity and innovation increase over time. Companies find ways to produce more, sell more, earn more. New technologies create new industries. Population growth creates more customers. Inflation raises prices and therefore revenues. These forces do not reverse. They compound. This is why a diversified global ETF held for decades has historically always risen in value.",
          highlight: "The MSCI World has delivered approximately 10% average annual returns since 1969 — through oil crises, wars, recessions, financial crashes, pandemics and political upheaval. Economic progress always wins long term.",
          example: "If you had invested €10,000 in a MSCI World ETF in 1994 and done absolutely nothing, you would have approximately €120,000 today — despite living through the Dot-com crash, the 2008 financial crisis, and COVID. Time and patience are the only ingredients required."
        }
      ],
      quiz: {
        question: "What do you actually own when you buy a stock?",
        options: [
          { text: "A loan to the company", correct: false },
          { text: "A small ownership stake in the company — a share of its assets and profits", correct: true },
          { text: "The right to use the company products for free", correct: false },
          { text: "A guaranteed dividend payment every year", correct: false }
        ],
        correctFeedback: "Exactly! A stock is ownership. You become a shareholder — a part-owner of a real business. Your wealth grows as the business grows.",
        wrongFeedback: "A stock represents ownership in a real business. When you buy a stock, you become a part-owner. Your investment grows as the company grows and earns more profits."
      }
    }
  },
  {
    id: 3, chapter: 1,
    title: "Accumulating vs. Distributing ETFs", icon: "🔄", desc: "Learn which ETF type is better for building long-term wealth.",
    tags: ["ETF Types", "8 min"], xp: 60, gold: 12,
    lesson: {
      heading: "Two types of ETFs — one crucial difference",
      intro: "When the companies inside your ETF pay dividends — cash payments to shareholders — the ETF has to decide what to do with that money. This decision, which you make when you choose your ETF, can make a six-figure difference to your final wealth over 30 years.",
      blocks: [
        {
          label: "Type 1: Accumulating",
          heading: "The silent compounder",
          body: "Accumulating ETFs (called Thesaurierend in German) automatically take any dividends received from companies and immediately reinvest them back into the fund. You never see the cash. Instead, your share price silently increases as more stocks are purchased on your behalf. Every dividend becomes more shares, which earn more dividends, which become more shares. This is compound interest at its most powerful — automated, invisible, relentless.",
          highlight: "For long-term wealth building, accumulating ETFs are almost always the better choice. Dividends are reinvested instantly, with no tax event triggered, no decision required, no action needed. Pure automatic compounding.",
          example: "Real numbers: €10,000 in an accumulating ETF at 7% per year for 30 years = €76,123. The same €10,000 in a distributing ETF where dividends are taxed at 26% before reinvestment = approximately €58,000. Same ETF, same return — €18,000 difference from one word: accumulating."
        },
        {
          label: "Type 2: Distributing",
          heading: "Regular income — but at a cost",
          body: "Distributing ETFs (Ausschüttend in German) pay dividends directly to your bank account as cash — typically quarterly or annually. This sounds appealing — free money arriving regularly! But there is a critical problem for wealth builders: in Germany, every dividend payment triggers immediate Abgeltungsteuer at 26.375%. That tax is paid now, reducing the money available to compound. You then have to manually reinvest the remainder.",
          highlight: "Distributing ETFs are excellent for retirees who need regular income to live on. For anyone still building wealth, accumulating ETFs are superior because they defer all tax until the final sale — keeping more money compounding longer.",
          example: "Practical scenario: Your distributing ETF pays €500 in dividends. After 26.375% tax, you receive €368. You must then manually invest this €368 back. An accumulating ETF would have automatically reinvested the full €500 — with no tax, no action, no friction."
        },
        {
          label: "Deep dive",
          heading: "How to identify which type you are buying",
          body: "Every ETF name includes a clue about its type. Look for the words Acc or Accumulating (accumulating) or Dis, Dist or Distributing (distributing) in the fund name. For example: iShares Core MSCI World UCITS ETF USD (Acc) — the (Acc) tells you it is accumulating. Also check: ETFs domiciled in Ireland are the most tax-efficient for European investors. Look for IE at the start of the ISIN number.",
          highlight: "The ideal setup for a European wealth builder: Accumulating ETF + Ireland domicile + TER below 0.25%. This combination maximises compound growth and minimises tax drag over decades.",
          example: "Top accumulating ETFs for European investors: IWDA (iShares MSCI World, Acc, Ireland, TER 0.20%), XDWD (Xtrackers MSCI World, Acc, Ireland, TER 0.19%), LCUW (Amundi MSCI World, Acc, Luxembourg, TER 0.12%). All are excellent — pick any one and stick with it."
        }
      ],
      quiz: {
        question: "For a 25-year-old building long-term wealth, which ETF type is generally better and why?",
        options: [
          { text: "Distributing — receiving regular cash payouts feels rewarding", correct: false },
          { text: "Accumulating — dividends reinvest automatically with no tax until final sale", correct: true },
          { text: "Both are always identical in long-term outcome", correct: false },
          { text: "Neither — only individual stocks build real wealth", correct: false }
        ],
        correctFeedback: "Spot on! Accumulating ETFs let compound interest work at full power — no tax drag on each dividend, no manual reinvestment needed. The difference over 30 years can be enormous.",
        wrongFeedback: "Accumulating ETFs automatically reinvest dividends without triggering immediate tax. This means more money compounding for longer. Over 30 years the difference versus distributing can be tens of thousands of euros."
      }
    }
  },
  {
    id: 4, chapter: 1,
    title: "Understanding TER — The Hidden Cost", icon: "💸", desc: "Learn how fees silently destroy your returns over decades.",
    tags: ["Costs", "8 min"], xp: 60, gold: 12,
    lesson: {
      heading: "The fee that silently steals your wealth",
      intro: "A 1% annual fee sounds completely harmless. It is just 1%. But compounding works in both directions. Fees compound against you just as powerfully as returns compound for you. What sounds like a tiny cost becomes a six-figure theft over a lifetime of investing.",
      blocks: [
        {
          label: "What is TER?",
          heading: "Total Expense Ratio — the cost you never see",
          body: "TER stands for Total Expense Ratio. It is the annual cost of owning an ETF or fund, expressed as a percentage of your total investment. Crucially, this fee is never charged separately — it is automatically deducted from the fund's assets daily, in tiny increments. You never see a bill. You never approve a payment. The fee simply silently reduces your returns every single day, year after year. This invisibility is precisely what makes it so dangerous.",
          highlight: "Always look for ETFs with a TER below 0.25% per year. The best MSCI World ETFs cost as little as 0.12%. Many actively managed funds charge 1.5% to 2.5% — ten to twenty times more expensive for statistically worse performance.",
          example: "Side by side: iShares Core MSCI World ETF (IWDA) — TER 0.20% per year. Typical actively managed global equity fund — TER 1.75% per year. On €100,000 invested, the ETF costs €200 per year. The active fund costs €1,750 per year. That €1,550 annual difference, reinvested, becomes enormous over decades."
        },
        {
          label: "The true cost",
          heading: "What 1% really costs you over a lifetime",
          body: "Two investors each put €100,000 into a global stock fund returning 8% per year gross. Investor A pays 0.20% TER (ETF). Investor B pays 1.75% TER (active fund). After 30 years, Investor A has €930,000. Investor B has €654,000. The 1.55% fee difference cost Investor B €276,000 — nearly three times their original investment — for no additional benefit. In fact, Investor B's active fund almost certainly underperformed Investor A's passive ETF as well.",
          highlight: "The difference between a 0.20% TER ETF and a 1.75% TER active fund on a €100,000 portfolio over 30 years exceeds €276,000 in lost wealth. This is not a small decision. It is potentially the most financially significant choice you make.",
          example: "The TER trap is invisible but permanent. Every year you own a high-fee fund, the compounding damage grows. An investor who switches from a 1.75% TER fund to a 0.20% ETF at age 35 and retires at 65 recovers hundreds of thousands of euros in wealth."
        },
        {
          label: "Deep dive",
          heading: "What you actually get for higher fees — and why it is nothing",
          body: "The investment industry has spent decades convincing investors that paying higher fees buys better performance. The data says the opposite. The SPIVA report — the largest ongoing study of active fund performance — consistently shows that over 15-year periods, approximately 90% of actively managed funds underperform their benchmark index after fees. The higher the fee, the harder it is to overcome the mathematical disadvantage.",
          highlight: "The single most reliable predictor of future fund performance is not past returns, not the fund manager's track record, not the fund's strategy. It is the TER. Lower fees reliably predict better net returns. This is the most important investment research finding of the last 50 years.",
          example: "How to check a TER: Go to justetf.com, search for any ETF, and the TER is listed prominently. For any ETF you consider buying, the TER should be below 0.25%. If it is above 0.50%, look for an alternative immediately."
        }
      ],
      quiz: {
        question: "What does TER stand for and why does it matter enormously for long-term investors?",
        options: [
          { text: "Total Earnings Rate — the return your fund generates each year", correct: false },
          { text: "Total Expense Ratio — the annual cost that silently compounds against your returns for decades", correct: true },
          { text: "Tax Exempt Return — a government-approved investment vehicle", correct: false },
          { text: "Trading Execution Rate — the cost of buying and selling shares", correct: false }
        ],
        correctFeedback: "Perfect! TER is the annual fee that silently compounds against you. Even tiny differences in TER create enormous wealth differences over 30 years. Always choose the lowest TER ETF available.",
        wrongFeedback: "TER = Total Expense Ratio. It is the annual cost automatically deducted from your fund. A 1.75% TER vs 0.20% TER can cost you over €276,000 on a €100,000 portfolio over 30 years."
      }
    }
  },
  {
    id: 5, chapter: 1,
    title: "The Power of Compound Interest", icon: "🌱", desc: "Discover why Einstein called this the eighth wonder of the world.",
    tags: ["Fundamentals", "10 min"], xp: 70, gold: 15,
    lesson: {
      heading: "The force that makes the wealthy richer",
      intro: "Compound interest is not just a financial concept. It is the fundamental force that separates those who build generational wealth from those who work their entire lives and retire with little. Understanding it deeply will permanently change how you think about time, money and decisions.",
      blocks: [
        {
          label: "How it works",
          heading: "Interest on interest on interest — the snowball",
          body: "Simple interest pays you on your original investment only. If you invest €1,000 at 7% simple interest, you earn €70 every year. After 30 years: €1,000 + (30 × €70) = €3,100. Compound interest pays you on your original investment PLUS all accumulated returns. In year 1 you earn €70. In year 2 you earn 7% on €1,070 = €74.90. Each year the base grows larger, so each year's gain is larger. This creates an exponential curve — slow at first, then breathtakingly fast. After 30 years at 7% compound: €7,612.",
          highlight: "Einstein reportedly called compound interest the eighth wonder of the world. Those who understand it earn it. Those who do not pay it. The gap between €3,100 (simple) and €7,612 (compound) from the same €1,000 shows you exactly why.",
          example: "The snowball analogy: Imagine rolling a small snowball down a very long snowy hill. At first it barely grows. After halfway down, it starts picking up speed. Near the bottom, it is enormous and growing faster than you can believe. Your investment portfolio works exactly this way — the last 10 years produce more wealth than the first 20 combined."
        },
        {
          label: "Time is everything",
          heading: "The single most valuable asset you have right now",
          body: "Every year you delay investing costs you far more than you intuit. Starting 10 years earlier does not just add 10 years of returns. It means every euro you invested gets 10 additional years to compound — including all the gains those euros generated in the first 10 years. This is why two investors with identical monthly contributions can end up with vastly different wealth purely based on when they started.",
          highlight: "Starting investing at 25 versus 35, investing the same €200 per month at 7% annual return, produces a €281,000 difference by age 65. You invested only €24,000 more in total — but the compounding difference is €281,000. Time is not money. Time IS the multiplier of money.",
          example: "Alex starts at 25: €200/month × 40 years at 7% = €524,000. Jordan starts at 35: €200/month × 30 years at 7% = €243,000. Same monthly amount. Same ETF. Same return. €281,000 difference. To catch up, Jordan would need to invest €430/month — more than double — for those 30 years just to match Alex."
        },
        {
          label: "Deep dive",
          heading: "The Rule of 72 — and why the last decade matters most",
          body: "The Rule of 72 is the fastest way to estimate compound growth: divide 72 by your annual return to find how many years to double your money. At 7% returns: 72 ÷ 7 = approximately 10.3 years to double. This means: €10,000 at age 25 becomes €20,000 by 35, €40,000 by 45, €80,000 by 55 and €160,000 by 65. The final decade alone adds €80,000 — as much as the previous 30 years combined. This is why selling early is catastrophically expensive.",
          highlight: "The Rule of 72: divide 72 by your annual return to find the years to double your money. At 7% returns, money doubles every ~10 years. At 10% returns, every ~7 years. Starting early and staying invested are the two most important investing decisions you will ever make.",
          example: "Monthly savings plan power: €100/month invested from age 20 to 65 at 7% = €341,000. You invested €54,000 in total. The other €287,000 was created by compound interest — pure mathematical magic. €100 per month. 45 years. Patience. Nothing else required."
        }
      ],
      quiz: {
        question: "Why does starting to invest 10 years earlier make such a dramatically larger difference than simply adding 10 more years of contributions?",
        options: [
          { text: "Younger investors receive preferential interest rates from brokers", correct: false },
          { text: "Earlier investments have more time to compound — generating returns on returns on returns exponentially", correct: true },
          { text: "Stock markets historically perform better when investors are younger", correct: false },
          { text: "Early investors pay less tax on their investment gains", correct: false }
        ],
        correctFeedback: "Exactly right! It is not about the extra contributions — it is about the extra years of compounding. Each earlier year means every euro earns more, and those earnings earn more, creating exponential rather than linear growth.",
        wrongFeedback: "Compound interest is exponential — it accelerates over time. Starting earlier means your money has more time to compound on itself. The first €100 invested at 25 has 40 years to multiply. The same €100 invested at 35 has only 30. That 10-year difference, compounded, becomes enormous."
      }
    }
  },

  // ─── QUESTS 6-25 (Original content unchanged) ────────────────────────────
  {
    id: 6, chapter: 1,
    title: "Open Your First Broker Account", icon: "🏦", desc: "A step-by-step mission to get you set up with a real investing account.",
    tags: ["Action Quest", "10 min"], xp: 100, gold: 25,
    lesson: {
      heading: "Your first real-world mission", intro: "Opening a broker account is the most important financial move most people never take. Today, you take it.",
      blocks: [
        { label: "Choose your broker", heading: "Which broker is right for beginners?", body: "For European beginners, Trade Republic and Scalable Capital both let you start a savings plan from 1 euro per month with no order fees. Both are regulated, safe and trusted by millions of Europeans.", highlight: "Recommended for beginners: Trade Republic (mobile-first, ultra-simple) or Scalable Capital (more features, great ETF selection).", example: "What you need: A smartphone, your ID or passport, 10 minutes. That is it." },
        { label: "Set up your Sparplan", heading: "The savings plan that builds wealth automatically", body: "Set up an automatic monthly savings plan. Choose your ETF, choose an amount, choose a date. Done. The money moves automatically every month.", highlight: "The single most powerful investing habit: automate it. Set it once and let compound interest run for decades.", example: "50 euros per month at 7% per year for 35 years = 97,000 euros from only 21,000 euros invested." }
      ],
      quiz: { question: "What is the key advantage of setting up an automated monthly savings plan?", options: [{ text: "You can time the market perfectly every month", correct: false }, { text: "It removes emotion and ensures consistency through dollar-cost averaging", correct: true }, { text: "Brokers charge lower fees for automated plans", correct: false }, { text: "Automated plans always buy at the lowest price", correct: false }], correctFeedback: "Exactly! Automation removes emotion — the number one enemy of investors — and dollar-cost averages your purchases over time.", wrongFeedback: "Automation removes the temptation to time the market and ensures you invest consistently through ups and downs." }
    }
  },
  {
    id: 7, chapter: 1,
    title: "Dollar-Cost Averaging", icon: "📅", desc: "The strategy that removes the stress of market timing.",
    tags: ["Strategy", "5 min"], xp: 65, gold: 13,
    lesson: {
      heading: "Invest regularly — regardless of price", intro: "Nobody knows when the market will go up or down. Dollar-cost averaging makes this uncertainty irrelevant.",
      blocks: [
        { label: "What it means", heading: "Buy regularly, not perfectly", body: "Dollar-cost averaging means investing a fixed amount at regular intervals regardless of market conditions. When prices are high, you buy fewer shares. When prices are low, you buy more.", highlight: "DCA turns market volatility from an enemy into a friend. Falling markets mean you buy more shares at cheaper prices.", example: "Month 1: 200 euros at 10 euros per share = 20 shares. Month 2: 200 euros at 8 euros per share = 25 shares. Average cost: 9 euros." },
        { label: "Why it works", heading: "The psychology behind the strategy", body: "Most investors try to time the market. Studies consistently show this strategy fails. DCA removes the decision entirely.", highlight: "Time in the market beats timing the market. Every time. DCA is the systematic way to ensure you always stay invested.", example: "Study: Investors who tried to time the market earned 1.9% per year less than those who invested regularly." }
      ],
      quiz: { question: "What happens when you use dollar-cost averaging during a market decline?", options: [{ text: "You should stop investing until prices recover", correct: false }, { text: "You automatically buy more shares at cheaper prices", correct: true }, { text: "Your existing shares lose value permanently", correct: false }, { text: "You should switch to a different ETF", correct: false }], correctFeedback: "Correct! When prices fall, your fixed monthly investment buys more shares. This lowers your average cost.", wrongFeedback: "With DCA, falling prices are an opportunity. Your fixed investment buys more shares when they are cheap." }
    }
  },
  {
    id: 8, chapter: 1,
    title: "The MSCI World Index", icon: "🌍", desc: "Meet the most popular ETF index for long-term investors.",
    tags: ["Indices", "6 min"], xp: 65, gold: 13,
    lesson: {
      heading: "The index that owns the world", intro: "If you could know only one index, it should be the MSCI World. It is the foundation of millions of investment portfolios.",
      blocks: [
        { label: "What it is", heading: "MSCI World explained", body: "The MSCI World Index tracks approximately 1,600 large and mid-cap companies across 23 developed countries. It covers roughly 85% of the free-float adjusted market capitalization in each country.", highlight: "The MSCI World has delivered an average annual return of approximately 10% since its inception in 1969.", example: "Top holdings: Apple around 5%, Microsoft around 4%, Amazon around 2%, Nvidia around 3%. The US makes up about 70% of the index." },
        { label: "Popular ETFs", heading: "How to buy the MSCI World", body: "You cannot buy the MSCI World Index directly — you buy an ETF that tracks it. The most popular in Europe are from iShares, Xtrackers and Amundi.", highlight: "IWDA from iShares is one of the most popular ETFs in Europe with over 70 billion euros in assets and a TER of just 0.20%.", example: "Top MSCI World ETFs: IWDA from iShares at TER 0.20%, XDWD from Xtrackers at TER 0.19%, LCUW from Amundi at TER 0.12%." }
      ],
      quiz: { question: "Approximately how many companies does the MSCI World Index contain?", options: [{ text: "100 companies", correct: false }, { text: "500 companies", correct: false }, { text: "1,600 companies across 23 countries", correct: true }, { text: "10,000 companies worldwide", correct: false }], correctFeedback: "Correct! The MSCI World contains approximately 1,600 companies across 23 developed countries.", wrongFeedback: "The MSCI World contains approximately 1,600 companies across 23 developed countries." }
    }
  },
  {
    id: 9, chapter: 1,
    title: "Diversification — The Only Free Lunch", icon: "🥚", desc: "Understand why spreading your investments protects your wealth.",
    tags: ["Risk", "5 min"], xp: 60, gold: 12,
    lesson: {
      heading: "The only free lunch in investing", intro: "Diversification reduces your risk without reducing your expected returns.",
      blocks: [
        { label: "The concept", heading: "Spread your risk", body: "If you put all your money into one company and that company fails, you lose everything. If you spread your money across 1,600 companies, one failure barely affects you.", highlight: "A single stock can go to zero. A diversified index of 1,600 companies cannot.", example: "2001 Enron collapse: Employees with all savings in Enron stock lost everything. Those with diversified index funds were largely unaffected." },
        { label: "Types of diversification", heading: "How to diversify properly", body: "True diversification means spreading across companies, sectors AND countries. A global ETF covering technology, healthcare, finance and consumer goods across dozens of countries is properly diversified.", highlight: "A single global ETF like the MSCI World achieves more diversification than most professional portfolios from 20 years ago.", example: "MSCI World sectors: Technology 25%, Financials 15%, Healthcare 13%, Consumer Discretionary 11%, Industrials 10%, Other 26%." }
      ],
      quiz: { question: "Why is a global ETF with 1,600 companies considered well diversified?", options: [{ text: "Because it is managed by professionals", correct: false }, { text: "Because it spreads risk across many companies, sectors and countries", correct: true }, { text: "Because it only invests in profitable companies", correct: false }, { text: "Because government regulations protect it", correct: false }], correctFeedback: "Exactly! Diversification across companies, sectors and countries means no single failure can significantly harm your portfolio.", wrongFeedback: "A global ETF reduces the impact of any single company or country performing badly." }
    }
  },
  {
    id: 10, chapter: 1,
    title: "Risk and Return", icon: "⚖️", desc: "Understand the relationship between risk and potential reward.",
    tags: ["Risk", "6 min"], xp: 65, gold: 13,
    lesson: {
      heading: "No reward without risk", intro: "Every investment decision involves a trade-off between risk and potential return.",
      blocks: [
        { label: "The relationship", heading: "Higher risk, higher potential return", body: "Safe investments like savings accounts offer low returns because the risk of losing money is very low. Stocks offer higher potential returns because there is real risk of loss in the short term.", highlight: "Risk is not something to eliminate — it is something to manage and be compensated for.", example: "Risk spectrum: Cash savings at 0 to 1% with minimal risk, Government bonds at 2 to 4%, Diversified ETFs at 6 to 10% long-term, Individual stocks with higher variance." },
        { label: "Time reduces risk", heading: "Why long-term investing is safer", body: "The longer you stay invested, the lower your risk of loss. Over 20 years, the probability of profit with a global ETF has historically been very high.", highlight: "Historical data shows that over any 15-year period, a diversified global ETF has never delivered a negative return.", example: "Historical data: Over 1 year, markets have fallen about 30% of the time. Over 20 years — rarely negative." }
      ],
      quiz: { question: "Why do stocks offer higher potential returns than savings accounts?", options: [{ text: "Banks are corrupt and pay artificially low rates", correct: false }, { text: "Higher potential return compensates for the higher short-term risk", correct: true }, { text: "Stocks are regulated to pay higher returns", correct: false }, { text: "Savings accounts are limited by law", correct: false }], correctFeedback: "Correct! Higher returns are compensation for accepting higher risk.", wrongFeedback: "Risk and return are inseparable. Higher potential returns always come with higher risk." }
    }
  },
  {
    id: 11, chapter: 1,
    title: "The 3-Fund Portfolio", icon: "🗂️", desc: "The simplest diversified portfolio used by millions of smart investors.",
    tags: ["Portfolio", "8 min"], xp: 80, gold: 20,
    lesson: {
      heading: "The legendary 3-fund portfolio", intro: "Most investors overcomplicate things. The 3-fund portfolio is beautifully simple.",
      blocks: [
        { label: "The strategy", heading: "Three funds. Global coverage. Done.", body: "The 3-fund portfolio uses just three ETFs: a developed markets fund like MSCI World, an emerging markets fund like MSCI Emerging Markets and optionally a bond fund for stability.", highlight: "A classic allocation: 80% MSCI World plus 20% Emerging Markets. Over 3,000 companies across 47 countries.", example: "Coverage: MSCI World = 1,600 companies in 23 developed countries. MSCI EM = 1,400 more in 24 developing economies." },
        { label: "Rebalancing", heading: "Once a year: rebalance", body: "Over time, one fund grows faster than another and your allocation drifts. Once a year, sell a little of the overperformer and buy the underperformer to restore your target split.", highlight: "Rebalancing annually takes 15 minutes and is one of the most effective portfolio management techniques.", example: "Example: Target 80/20. After a year: 85/15. Sell 5% of MSCI World, buy 5% Emerging Markets. Done." }
      ],
      quiz: { question: "What is the purpose of annual rebalancing in a 3-fund portfolio?", options: [{ text: "To switch to better-performing funds every year", correct: false }, { text: "To restore your target allocation and systematically buy low, sell high", correct: true }, { text: "To reduce your tax bill by selling everything", correct: false }, { text: "Rebalancing is only for professional investors", correct: false }], correctFeedback: "Perfect! Rebalancing restores your target allocation and mechanically enforces buying underperformers and selling outperformers.", wrongFeedback: "Rebalancing maintains your risk profile and systematically buys what is cheap and sells what is expensive." }
    }
  },
  {
    id: 12, chapter: 1,
    title: "Inflation — The Silent Wealth Destroyer", icon: "🔥", desc: "Why keeping money in cash is not actually safe.",
    tags: ["Economics", "5 min"], xp: 60, gold: 12,
    lesson: {
      heading: "Your savings are losing value right now", intro: "Most people think keeping money in savings is the safe option. In reality, inflation silently destroys purchasing power every single year.",
      blocks: [
        { label: "What is inflation?", heading: "Prices rise — your money shrinks", body: "Inflation means the same amount of money buys less over time. If inflation is 3% and your savings account pays 1%, you are effectively losing 2% of purchasing power every year.", highlight: "At 3% annual inflation, 10,000 euros today is worth only 7,400 euros in purchasing power after 10 years.", example: "1990s vs today: A cinema ticket that cost 5 euros in 1990 costs 15 euros today." },
        { label: "The solution", heading: "Invest to beat inflation", body: "The stock market has historically returned 8 to 10% per year on average — well above typical inflation rates.", highlight: "The real goal of investing is to preserve and grow purchasing power. ETFs have consistently beaten inflation over the long term.", example: "Historical comparison: 10,000 euros in cash over 30 years at 3% inflation = 4,100 euros purchasing power. 10,000 euros invested at 8% return = 100,000 euros purchasing power." }
      ],
      quiz: { question: "If inflation is 3% and your savings account pays 1%, what is happening to your wealth?", options: [{ text: "Your wealth is growing by 1% per year", correct: false }, { text: "Your purchasing power is declining by about 2% per year", correct: true }, { text: "Your wealth is unaffected because the account balance stays the same", correct: false }, { text: "You are breaking even", correct: false }], correctFeedback: "Correct! Real return = nominal return minus inflation. 1% minus 3% = negative 2%. Your money buys less every year.", wrongFeedback: "Real return = nominal return minus inflation. 1% minus 3% = negative 2% real return." }
    }
  },
  {
    id: 13, chapter: 1,
    title: "Build Your Emergency Fund First", icon: "🛡️", desc: "Why you need cash reserves before you invest a single euro.",
    tags: ["Planning", "5 min"], xp: 60, gold: 12,
    lesson: {
      heading: "Protect yourself before you invest", intro: "The biggest mistake new investors make is putting money into the market that they might need soon.",
      blocks: [
        { label: "What is an emergency fund?", heading: "Your financial safety net", body: "An emergency fund is 3 to 6 months of living expenses kept in a liquid, accessible savings account. Not invested. Just sitting there as cash for genuine emergencies — job loss, medical bills, urgent repairs.", highlight: "Never invest money you might need within the next 3 years. Only invest money you can leave untouched long-term.", example: "If monthly expenses are 1,500 euros: Emergency fund = 4,500 to 9,000 euros in a savings account before you invest anything." },
        { label: "Why it matters", heading: "Without it, you will panic sell", body: "Without an emergency fund, any unexpected expense forces you to sell investments — potentially at the worst time. Having cash means you never need to sell ETFs at a loss.", highlight: "The emergency fund is insurance that allows you to stay invested through downturns without being forced to sell.", example: "Scenario: Market crashes 30%. You lose your job. Without emergency fund: forced to sell at a loss. With emergency fund: do nothing, wait for recovery." }
      ],
      quiz: { question: "How much should an emergency fund contain?", options: [{ text: "1,000 euros regardless of expenses", correct: false }, { text: "3 to 6 months of living expenses in accessible cash", correct: true }, { text: "All your savings — invest nothing until retirement", correct: false }, { text: "Emergency funds are unnecessary if you have ETFs", correct: false }], correctFeedback: "Correct! 3 to 6 months of expenses gives you a buffer for any financial emergency without touching your investments.", wrongFeedback: "3 to 6 months of living expenses is the standard recommendation." }
    }
  },
  {
    id: 14, chapter: 1,
    title: "ETF vs Active Funds", icon: "🏆", desc: "Why passive ETFs consistently beat actively managed funds.",
    tags: ["Comparison", "6 min"], xp: 65, gold: 13,
    lesson: {
      heading: "The data is clear — passive wins", intro: "For decades, the financial industry sold expensive actively managed funds. The data tells a very different story.",
      blocks: [
        { label: "Active vs passive", heading: "What is the difference?", body: "An active fund employs professional managers who try to beat the market and charge 1 to 2% per year. A passive ETF simply buys all the companies in an index and charges 0.07 to 0.25% per year.", highlight: "The irony: the more a fund manager trades, the more it costs — and the worse it typically performs.", example: "Cost comparison: Active fund at 1.5% per year. ETF at 0.20% per year. On 100,000 euros that is 1,500 vs 200 euros annually." },
        { label: "The evidence", heading: "What the data actually shows", body: "The SPIVA report studies active fund performance every year. Over 15 years, roughly 90% of actively managed funds underperform their benchmark index after fees.", highlight: "Over any 15-year period, approximately 90% of active funds underperform a simple index ETF after fees.", example: "S&P SPIVA 2023: Over 20 years, 95% of US active equity funds underperformed the S&P 500." }
      ],
      quiz: { question: "What percentage of active funds underperform index ETFs over 15 years?", options: [{ text: "About 30%", correct: false }, { text: "About 50%", correct: false }, { text: "About 90%", correct: true }, { text: "Active funds usually outperform ETFs", correct: false }], correctFeedback: "Correct! Approximately 90% of active funds underperform their benchmark index over 15 years after fees.", wrongFeedback: "About 90% of active funds underperform simple index ETFs over 15 years after fees." }
    }
  },
  {
    id: 15, chapter: 1,
    title: "Tax Basics for ETF Investors", icon: "🧾", desc: "Understand how ETF profits are taxed in Germany and Europe.",
    tags: ["Tax", "7 min"], xp: 75, gold: 16,
    lesson: {
      heading: "Keep more of what you earn", intro: "Taxes can significantly reduce your investment returns if you do not plan for them.",
      blocks: [
        { label: "German tax basics", heading: "Abgeltungsteuer explained", body: "In Germany, investment profits are subject to Abgeltungsteuer of 25% plus solidarity surcharge, bringing the effective rate to approximately 26 to 28%. However, each person has an annual tax-free allowance of 1,000 euros called Sparerpauschbetrag.", highlight: "Set up a Freistellungsauftrag with your broker to use your 1,000 euro annual tax-free allowance automatically.", example: "With 1,000 euro allowance: Your first 1,000 euros of investment profits each year is completely tax-free." },
        { label: "Tax-efficient structure", heading: "Why accumulating ETFs win again", body: "With distributing ETFs, you pay tax every time dividends are distributed. With accumulating ETFs, no tax is triggered until you sell — potentially decades later.", highlight: "Accumulating plus Ireland-domiciled equals the most tax-efficient structure for EU investors.", example: "Tax deferral advantage: Paying 26% tax on 1,000 euro profit today vs in 20 years means more compound growth in the meantime." }
      ],
      quiz: { question: "What is the Sparerpauschbetrag and why should you use it?", options: [{ text: "A penalty for selling ETFs early", correct: false }, { text: "An annual 1,000 euro tax-free allowance on investment profits that you should set up with your broker", correct: true }, { text: "A government savings account with guaranteed returns", correct: false }, { text: "A tax on dividends paid by foreign companies", correct: false }], correctFeedback: "Exactly! Set up a Freistellungsauftrag with your broker immediately to claim it automatically.", wrongFeedback: "Sparerpauschbetrag = 1,000 euro annual tax-free allowance. Set up a Freistellungsauftrag with your broker." }
    }
  },
  {
    id: 16, chapter: 1,
    title: "Market Crashes — History and Recovery", icon: "📉", desc: "Learn why market crashes are temporary and recovery is inevitable.",
    tags: ["Psychology", "7 min"], xp: 70, gold: 15,
    lesson: {
      heading: "Every crash in history has recovered", intro: "Market crashes feel terrifying. Understanding their history transforms fear into patience.",
      blocks: [
        { label: "Historical crashes", heading: "The crashes that scared everyone", body: "The Great Depression in 1929: minus 89%. Black Monday in 1987: minus 22% in one day. Dot-com bust 2000 to 2002: minus 49%. Financial crisis 2008 to 2009: minus 57%. COVID crash 2020: minus 34% in 33 days. Every single one recovered and went to new highs.", highlight: "The COVID crash of 2020 was the fastest 34% decline in history — and the market had fully recovered within 6 months.", example: "2008 Financial Crisis: Markets fell 57%. By 2013, fully recovered. By 2020, they had tripled from the 2009 low." },
        { label: "The right response", heading: "What to do in a crash", body: "The worst thing you can do is sell. Selling converts a temporary paper loss into a permanent real loss. The second worst is to stop investing.", highlight: "Be greedy when others are fearful, and fearful when others are greedy. Warren Buffett.", example: "The right action in every crash: Do nothing with existing holdings. Continue monthly savings plan. If possible, invest extra. Then wait." }
      ],
      quiz: { question: "What should a long-term ETF investor do during a major market crash?", options: [{ text: "Sell everything immediately to preserve capital", correct: false }, { text: "Continue the monthly savings plan and do nothing with existing holdings", correct: true }, { text: "Switch to a safer ETF until markets recover", correct: false }, { text: "Stop investing until confidence returns", correct: false }], correctFeedback: "Correct! Continuing to invest during crashes is one of the most powerful things you can do.", wrongFeedback: "In a crash: do nothing with existing holdings and continue investing. Every crash has recovered. Selling locks in losses permanently." }
    }
  },
  {
    id: 17, chapter: 1,
    title: "The Savings Rate", icon: "💰", desc: "Why how much you save matters more than how you invest.",
    tags: ["Planning", "5 min"], xp: 60, gold: 12,
    lesson: {
      heading: "Save more. Invest it. Repeat.", intro: "Investment returns matter — but your savings rate matters more, especially early on.",
      blocks: [
        { label: "What is savings rate?", heading: "The percentage that changes everything", body: "Your savings rate is the percentage of your income you save and invest each month. A 10% savings rate is average. A 20% rate is good. A 30% or higher rate is exceptional.", highlight: "Increasing your savings rate from 10% to 20% can more than halve the time to reach your financial goals.", example: "On 3,000 euros monthly income: 10% = 300 euros per month. 20% = 600 euros per month. 30% = 900 euros per month." },
        { label: "How to increase it", heading: "Practical ways to save more", body: "The two ways to increase savings rate are earning more and spending less. The fastest path is often cutting the largest expenses: housing, car, subscriptions, eating out.", highlight: "Track every expense for one month. Most people are shocked to discover where their money actually goes.", example: "Hidden savings: Cancelling one streaming service = 15 euros per month = 180 euros per year = 36,000 euros over 40 years invested at 7%." }
      ],
      quiz: { question: "Why is savings rate considered more important than investment returns early in your investing journey?", options: [{ text: "Returns do not matter for small portfolios", correct: false }, { text: "With a small portfolio, how much you invest has more impact than the return percentage", correct: true }, { text: "Savings rates are guaranteed while returns are not", correct: false }, { text: "Savings accounts pay more than ETFs", correct: false }], correctFeedback: "Exactly right! When your portfolio is small, adding more money has more impact than earning a better percentage return.", wrongFeedback: "On a small portfolio, saving more matters most. As the portfolio grows, investment returns become more impactful." }
    }
  },
  {
    id: 18, chapter: 1,
    title: "Sustainable Investing — ESG ETFs", icon: "🌿", desc: "Invest according to your values without sacrificing returns.",
    tags: ["ESG", "6 min"], xp: 65, gold: 13,
    lesson: {
      heading: "Can you invest ethically and profitably?", intro: "ESG investing has grown from a niche to a mainstream option.",
      blocks: [
        { label: "What is ESG?", heading: "Environmental, Social and Governance", body: "ESG stands for Environmental, Social and Governance. ESG ETFs screen companies based on these criteria, typically excluding heavily polluting industries, companies with poor labor practices or those with weak corporate governance.", highlight: "ESG ETFs typically exclude tobacco, weapons, coal and oil sands companies. They emphasize climate policies, fair labor and transparent governance.", example: "iShares MSCI World ESG Enhanced: Tracks a version of the MSCI World overweighting high-ESG-rated companies. TER: 0.20%." },
        { label: "Performance", heading: "Do ESG ETFs sacrifice returns?", body: "Historically, ESG ETFs have performed similarly to standard equivalents. The evidence does not support the idea that investing ethically costs significantly in returns.", highlight: "ESG investing is not charity — many ESG-screened portfolios have matched or slightly outperformed standard indices over the past decade.", example: "Comparison over 10 years: MSCI World approximately 10% annual return. MSCI World ESG Leaders approximately 10.5% annual return." }
      ],
      quiz: { question: "What does ESG stand for in ESG ETFs?", options: [{ text: "Extra Secure Growth", correct: false }, { text: "Environmental, Social and Governance", correct: true }, { text: "European Stock Growth", correct: false }, { text: "Equity, Savings and Gold", correct: false }], correctFeedback: "Correct! ESG = Environmental, Social and Governance.", wrongFeedback: "ESG = Environmental, Social and Governance — criteria used to evaluate companies on ethics and sustainability." }
    }
  },
  {
    id: 19, chapter: 1,
    title: "How to Set Investment Goals", icon: "🎯", desc: "Define clear goals that guide every investment decision you make.",
    tags: ["Planning", "5 min"], xp: 60, gold: 12,
    lesson: {
      heading: "Invest with purpose", intro: "The biggest mistake investors make is not having clear goals. Without a destination, every market movement becomes a crisis.",
      blocks: [
        { label: "Types of goals", heading: "Short, medium and long-term goals", body: "Financial goals fall into three time horizons. Short-term from 1 to 3 years: keep in cash. Medium-term from 3 to 10 years: lower-risk investments. Long-term over 10 years: this is where ETFs shine.", highlight: "Only invest in ETFs money you do not need for at least 5 years.", example: "Wrong: Investing house deposit in MSCI World ETF — too risky for a 2-year goal. Right: High-yield savings for short goals, ETFs for 10-plus year goals." },
        { label: "SMART goals", heading: "Make your goals specific", body: "Vague goals like save for retirement do not work. SMART goals do: Specific, Measurable, Achievable, Relevant, Time-bound.", highlight: "Write down your financial goals with specific numbers and dates. Investors with written goals are significantly more likely to achieve them.", example: "SMART goal: Invest 200 euros per month in IWDA starting January 2025. Goal: 200,000 euros by age 55 over 30 years. Expected outcome at 7%: 243,000 euros." }
      ],
      quiz: { question: "For which time horizon are ETFs most appropriate?", options: [{ text: "Money you need within 1 year", correct: false }, { text: "Money you will not need for at least 5 to 10 years", correct: true }, { text: "Your emergency fund", correct: false }, { text: "Any money regardless of when you need it", correct: false }], correctFeedback: "Exactly right! ETFs are for long-term money. The longer your horizon, the more confidently you can ride out market volatility.", wrongFeedback: "ETFs are appropriate for money you will not need for at least 5 to 10 years." }
    }
  },
  {
    id: 20, chapter: 1,
    title: "Tracking Your Portfolio", icon: "📱", desc: "How to monitor your investments without becoming obsessed.",
    tags: ["Practical", "5 min"], xp: 55, gold: 11,
    lesson: {
      heading: "Monitor — do not obsess", intro: "Knowing how to track your portfolio correctly can mean the difference between disciplined investing and emotional trading.",
      blocks: [
        { label: "How often to check", heading: "The right monitoring frequency", body: "Check your portfolio quarterly — four times per year. Each quarter: total portfolio value, whether allocation has drifted, whether savings plan is running and whether your life situation has changed.", highlight: "Checking more than quarterly increases the chance of making emotional decisions.", example: "Quarterly checklist: 1) Is my savings plan running? 2) What is my current allocation? 3) Is rebalancing needed? 4) Have my goals changed?" },
        { label: "Tools to use", heading: "Simple tracking tools", body: "Your broker app shows portfolio value. For tracking across multiple accounts, tools like Portfolio Performance (free desktop app) or Parqet (German, free tier) work well.", highlight: "The best portfolio tracker is one you actually use — even a simple spreadsheet updated quarterly is better than a complex app you check daily.", example: "Minimal tracking: Spreadsheet with date, total value, each ETF value and allocation percentage. Update quarterly." }
      ],
      quiz: { question: "How often should a long-term ETF investor check their portfolio?", options: [{ text: "Every day to stay informed", correct: false }, { text: "Quarterly — four times per year", correct: true }, { text: "Only when markets crash", correct: false }, { text: "Never — set it and completely forget it", correct: false }], correctFeedback: "Correct! Quarterly monitoring gives enough visibility to make necessary adjustments without triggering emotional reactions.", wrongFeedback: "Quarterly is the sweet spot. Daily checking leads to emotional decisions." }
    }
  },
  {
    id: 21, chapter: 1,
    title: "The Biggest Investing Mistakes", icon: "⚠️", desc: "The most common errors beginners make — and how to avoid them.",
    tags: ["Wisdom", "6 min"], xp: 70, gold: 15,
    lesson: {
      heading: "Learn from others expensive mistakes", intro: "The fastest way to become a better investor is to understand the mistakes that cost others the most — and consciously avoid them.",
      blocks: [
        { label: "Mistakes 1 to 3", heading: "The deadly trio", body: "Mistake 1: Waiting for the perfect moment. There is no perfect moment. Mistake 2: Panic selling during crashes. Markets always recover. Mistake 3: High fees. A 1.5% TER versus 0.2% costs you potentially 100,000 euros over 30 years.", highlight: "These three mistakes alone account for the majority of wealth destroyed by amateur investors.", example: "Waiting costs: Starting investing 10 years later costs approximately 500,000 euros in final wealth on a 500 euro per month savings plan." },
        { label: "Mistakes 4 to 5", heading: "The subtle killers", body: "Mistake 4: Investing money you might need soon — build your emergency fund first. Mistake 5: Checking your portfolio every day — daily checking leads to emotional decisions.", highlight: "The best performing accounts at Fidelity were those of investors who had either forgotten about them or were dead. Inactivity is a superpower.", example: "Fidelity finding: The best-performing retail accounts belonged to inactive investors who simply bought and forgot." }
      ],
      quiz: { question: "An investor sees their portfolio drop 25% in a crash. What is the correct response?", options: [{ text: "Sell immediately to prevent further losses", correct: false }, { text: "Do nothing — or buy more if possible — and continue the monthly savings plan", correct: true }, { text: "Switch to a bond ETF until markets recover", correct: false }, { text: "Check the portfolio every day and wait for a signal", correct: false }], correctFeedback: "Exactly right! Every major crash has fully recovered. Do nothing with existing holdings, continue buying and wait.", wrongFeedback: "Do nothing and continue investing. Every crash has recovered. Selling locks in losses permanently." }
    }
  },
  {
    id: 22, chapter: 1,
    title: "Bonds — The Calming Force", icon: "📜", desc: "Understand bonds and when to add them to your portfolio.",
    tags: ["Assets", "6 min"], xp: 65, gold: 13,
    lesson: {
      heading: "The stabilizer in your portfolio", intro: "Bonds are often dismissed by young investors. Understanding them helps you make better decisions as your portfolio grows.",
      blocks: [
        { label: "What are bonds?", heading: "Lending money to governments and companies", body: "When you buy a bond, you are lending money to a government or company for a set period. In return, they pay you regular interest and return your original money at the end.", highlight: "Bonds move differently from stocks — often rising when stocks fall. This makes them powerful portfolio stabilizers.", example: "German Government Bond: You lend money to the German government for 10 years and receive guaranteed interest payments. Extremely low risk." },
        { label: "When to use bonds", heading: "Age-based allocation", body: "A common rule of thumb: hold your age in bonds as a percentage. At 25: 25% bonds, 75% stocks. At 50: 50 to 50. At 70: 70% bonds. This shifts your portfolio toward stability as you approach withdrawal age.", highlight: "Young investors should prioritize stocks for growth. As retirement approaches, gradually shift toward bonds.", example: "Simple portfolio at 30: 70% MSCI World ETF plus 20% Emerging Markets ETF plus 10% Global Bond ETF." }
      ],
      quiz: { question: "Why might an investor close to retirement hold more bonds than a 25-year-old?", options: [{ text: "Bonds always outperform stocks for older investors", correct: false }, { text: "Bonds provide stability and protect wealth when you are close to needing the money", correct: true }, { text: "Government regulations require older investors to hold bonds", correct: false }, { text: "Bonds pay higher interest rates to older investors", correct: false }], correctFeedback: "Correct! As you approach the time when you need to withdraw, stability becomes more important than growth.", wrongFeedback: "Near retirement, a major stock market crash could devastate a portfolio right when you need to withdraw. Bonds reduce this risk." }
    }
  },
  {
    id: 23, chapter: 1,
    title: "Reading an ETF Factsheet", icon: "📄", desc: "Know exactly what to look for before buying any ETF.",
    tags: ["Practical", "7 min"], xp: 70, gold: 15,
    lesson: {
      heading: "Decode any ETF in 5 minutes", intro: "Every ETF publishes a factsheet with all key information. Knowing how to read it means you will never buy an ETF blindly again.",
      blocks: [
        { label: "Key metrics", heading: "The 5 numbers that matter", body: "When evaluating any ETF, focus on: TER for annual cost, AUM for fund size where bigger is safer, replication method where physical is better, index tracked and domicile where Ireland is most tax-efficient for EU investors.", highlight: "The ideal ETF: low TER under 0.25%, large AUM over 500 million euros, physical replication, broad index and Ireland domicile.", example: "iShares Core MSCI World IWDA: TER 0.20%, AUM over 70 billion euros, Physical replication, MSCI World index, Ireland domicile." },
        { label: "What to avoid", heading: "Red flags in ETF selection", body: "Avoid ETFs with very high TERs above 0.5%, very small AUM under 100 million euros, complex structures you do not understand, leveraged ETFs and inverse ETFs.", highlight: "Complexity is the enemy of the long-term investor. If you cannot explain the ETF in one sentence, do not buy it.", example: "Red flags: 2x Leveraged NASDAQ ETF (dangerous), Short DAX ETF (speculative), any ETF with TER above 0.5% (overpriced)." }
      ],
      quiz: { question: "Which ETF would be the best choice for a long-term beginner investor?", options: [{ text: "A 2x Leveraged S&P 500 ETF with TER of 0.95%", correct: false }, { text: "A physically replicated MSCI World ETF with TER of 0.20% and 70 billion AUM", correct: true }, { text: "A synthetic small-cap ETF with 50 million AUM and TER of 0.45%", correct: false }, { text: "An inverse DAX ETF that profits when markets fall", correct: false }], correctFeedback: "Perfect choice! Low TER, physical replication, massive AUM and a broad diversified index.", wrongFeedback: "For long-term investing: choose physical replication, low TER, large AUM and a broad diversified index. Avoid leverage and complexity." }
    }
  },
  {
    id: 24, chapter: 1,
    title: "ETF Savings Plan — Step by Step", icon: "📋", desc: "Set up your first automatic ETF savings plan from start to finish.",
    tags: ["Action Quest", "8 min"], xp: 90, gold: 22,
    lesson: {
      heading: "Your automated wealth machine", intro: "An ETF savings plan is the single most powerful thing you can set up for your financial future.",
      blocks: [
        { label: "Step 1 and 2", heading: "Open and verify your account", body: "Open an account with Trade Republic or Scalable Capital. Download the app, enter your personal details and verify your identity with your ID or passport. Verification typically takes 1 to 2 business days.", highlight: "Both Trade Republic and Scalable Capital are BaFin-regulated German brokers. Your money is protected by German investor protection up to 100,000 euros.", example: "Trade Republic: Download app, click Create account, enter email and phone, verify identity, account confirmed. Takes 10 minutes of your time." },
        { label: "Step 3 and 4", heading: "Choose your ETF and set up the plan", body: "Search for IWDA or XDWD in the ETF section. Click Savings plan or Sparplan. Enter your monthly amount. Choose the execution date. Confirm.", highlight: "Once set up, the savings plan runs automatically every month. You never have to think about it again.", example: "IWDA setup in Trade Republic: Search IWDA, click Savings plan, enter 50 euros, choose 1st of each month, confirm. Done forever." }
      ],
      quiz: { question: "Once you have set up an automated ETF savings plan, what is the most important thing to do?", options: [{ text: "Check it daily to make sure it is working", correct: false }, { text: "Leave it running and review it quarterly at most", correct: true }, { text: "Cancel and restart every time markets fall", correct: false }, { text: "Switch to a different ETF every year", correct: false }], correctFeedback: "Exactly right! Set it up and let it run. The power of a savings plan comes from consistency, not constant adjustment.", wrongFeedback: "The best action after setting up a savings plan is to leave it running. Review quarterly at most. Consistency is the key." }
    }
  },
  {
    id: 25, chapter: 1,
    title: "Chapter I Complete — Your Foundation", icon: "🏆", desc: "Congratulations! You have mastered the fundamentals of ETF investing.",
    tags: ["Milestone", "5 min"], xp: 150, gold: 50,
    lesson: {
      heading: "You have built your foundation", intro: "You have completed Chapter I — ETF Highlands. You now know more about investing than 90% of the population.",
      blocks: [
        { label: "What you know", heading: "Your Chapter I knowledge", body: "You now understand: ETFs and how they work, compound interest, TER and costs, diversification, the MSCI World, dollar-cost averaging, emergency funds, tax basics, market crashes, the biggest mistakes and how to track your portfolio.", highlight: "You have covered every concept a beginner needs to make intelligent, confident investing decisions.", example: "Your next step: Open a broker account if you have not already. Start a savings plan with even 25 to 50 euros per month. The most important thing is to start." },
        { label: "What is next", heading: "Chapter II — Compound Sea awaits", body: "In Chapter II, you will go deeper: dividend strategies, the FIRE movement, factor investing, REITs, behavioral finance, advanced portfolio construction and much more.", highlight: "Chapter II unlocks now. You are ready. The Compound Sea awaits.", example: "Chapter II preview: Dividends, FIRE movement, factor investing, REITs, behavioral finance, international tax optimization and more." }
      ],
      quiz: { question: "What is the single most important action you can take now?", options: [{ text: "Wait until you have 10,000 euros saved before investing", correct: false }, { text: "Start investing immediately with whatever amount you can — even 25 euros per month", correct: true }, { text: "Study for another year before making any decisions", correct: false }, { text: "Ask a financial advisor before doing anything", correct: false }], correctFeedback: "Exactly right! The best time to start was yesterday. The second best time is now. Even 25 euros per month invested consistently will compound into significant wealth.", wrongFeedback: "Start now. Even 25 euros per month makes a real difference over time. Waiting costs you compound interest." }
    }
  }
]

export const CHAPTER_TWO: Quest[] = [
  {
    id: 101, chapter: 2,
    title: "Welcome to the Compound Sea", icon: "🌊", desc: "Begin your deeper journey into advanced investing concepts.",
    tags: ["Intro", "5 min"], xp: 60, gold: 15,
    lesson: {
      heading: "Deeper waters, greater rewards", intro: "You have mastered the basics. Now it is time to go deeper. Chapter II covers the concepts that separate good investors from great ones.",
      blocks: [
        { label: "What you will learn", heading: "Chapter II overview", body: "In the Compound Sea, you will explore: dividend investing strategies, the FIRE movement, factor investing, REITs, advanced portfolio construction, behavioral finance, international investing and the psychology of wealth building.", highlight: "The concepts in Chapter II are what separate investors who build real wealth from those who simply save.", example: "Chapter II topics: Dividends, FIRE, factor investing, REITs, behavioral finance, tax optimization and portfolio psychology." },
        { label: "The journey continues", heading: "Build on your foundation", body: "Everything in Chapter II builds directly on Chapter I. Your understanding of ETFs, compound interest, diversification and cost management is the foundation. Now you will optimize and expand it.", highlight: "Advanced investing is not about complexity — it is about doing simple things exceptionally well.", example: "The progression: Chapter I = Foundation. Chapter II = Optimization and Mastery." }
      ],
      quiz: { question: "What is the primary focus of Chapter II?", options: [{ text: "Learning to trade stocks for short-term profit", correct: false }, { text: "Deepening knowledge with advanced concepts that optimize your investment strategy", correct: true }, { text: "Starting completely over with a different approach", correct: false }, { text: "Learning about cryptocurrency and alternative assets", correct: false }], correctFeedback: "Exactly! Chapter II builds on your foundation with optimization and advanced concepts.", wrongFeedback: "Chapter II deepens and optimizes what you learned in Chapter I." }
    }
  },
  {
    id: 102, chapter: 2,
    title: "Dividend Investing — Income from Ownership", icon: "💵", desc: "Learn how dividends work and how to build a passive income stream.",
    tags: ["Dividends", "7 min"], xp: 70, gold: 16,
    lesson: {
      heading: "Getting paid to own companies", intro: "Dividends are one of the most powerful forces in long-term investing.",
      blocks: [
        { label: "What are dividends?", heading: "Companies sharing their profits", body: "When a company makes a profit, it can distribute profits to shareholders as dividends. Many mature, profitable companies pay regular dividends — typically quarterly or annually.", highlight: "Dividends represent real cash payment from real company profits. Unlike stock price appreciation, dividends are tangible — money in your account.", example: "Example: You own 100 shares paying 2 euros annually in dividends. You receive 200 euros per year in passive income regardless of stock price movements." },
        { label: "Dividend strategies", heading: "How to build dividend income", body: "Dividend investors look for companies with long histories of paying and growing dividends — called Dividend Aristocrats. Dividend ETFs target high-dividend-paying companies.", highlight: "A portfolio yielding 3% in dividends means 3,000 euros per year in passive income on a 100,000 euro portfolio — without selling anything.", example: "Popular dividend ETFs: VHYL from Vanguard FTSE All-World High Dividend Yield at TER 0.29%." }
      ],
      quiz: { question: "What is a dividend yield?", options: [{ text: "The total return of a stock including price appreciation", correct: false }, { text: "The annual dividend payment as a percentage of the share price", correct: true }, { text: "The interest rate paid by government bonds", correct: false }, { text: "The percentage of profit a company reinvests in itself", correct: false }], correctFeedback: "Correct! Dividend yield = annual dividend per share divided by share price.", wrongFeedback: "Dividend yield = annual dividend divided by share price. A 3% yield means 3 euros in dividends for every 100 euros invested." }
    }
  },
  {
    id: 103, chapter: 2,
    title: "FIRE — Financial Independence, Retire Early", icon: "🔥", desc: "Discover the movement that helps people retire decades early.",
    tags: ["FIRE", "8 min"], xp: 80, gold: 20,
    lesson: {
      heading: "Freedom from the 9-to-5", intro: "FIRE stands for Financial Independence, Retire Early. It is built on aggressive saving, smart investing and the mathematical reality of compound interest.",
      blocks: [
        { label: "The concept", heading: "The 4% rule", body: "The FIRE movement is built on the 4% rule from the Trinity Study. It states that if you withdraw 4% of your portfolio annually, your money will last at least 30 years. To retire, you need 25 times your annual expenses invested.", highlight: "Annual expenses multiplied by 25 equals your FIRE number. Spending 24,000 euros per year? You need 600,000 euros invested.", example: "FIRE calculation: Annual expenses 24,000 euros. FIRE number: 600,000 euros. Monthly savings of 1,500 euros at 7% for 22 years reaches 600,000 euros." },
        { label: "Types of FIRE", heading: "Different flavors of financial freedom", body: "Lean FIRE: extreme frugality, retire very early on a minimal budget. Fat FIRE: higher spending lifestyle, larger portfolio. Barista FIRE: semi-retired with part-time work. Coast FIRE: invest enough young that compound interest does the rest.", highlight: "FIRE is not about retiring and doing nothing — it is about gaining the freedom to choose how you spend your time.", example: "Coast FIRE example: Invest 50,000 euros by age 30. At 7% growth, this becomes 760,000 euros by age 60 without adding another cent." }
      ],
      quiz: { question: "According to the 4% rule, how much do you need invested to retire on 30,000 euros per year?", options: [{ text: "300,000 euros", correct: false }, { text: "500,000 euros", correct: false }, { text: "750,000 euros", correct: true }, { text: "1,000,000 euros", correct: false }], correctFeedback: "Correct! 30,000 euros multiplied by 25 equals 750,000 euros.", wrongFeedback: "FIRE number = annual expenses times 25. 30,000 times 25 = 750,000 euros." }
    }
  },
  {
    id: 104, chapter: 2,
    title: "Factor Investing — Finding the Edge", icon: "🔬", desc: "Evidence-based strategies that have historically outperformed.",
    tags: ["Advanced", "8 min"], xp: 85, gold: 20,
    lesson: {
      heading: "The science behind market outperformance", intro: "Decades of academic research have identified specific characteristics — called factors — associated with higher long-term returns.",
      blocks: [
        { label: "What are factors?", heading: "The drivers of return", body: "Factors are characteristics of stocks associated with higher returns. The five most researched: Value (cheap companies outperform expensive ones), Size (small companies outperform large), Momentum (rising stocks keep rising), Quality (profitable stable companies outperform) and Low Volatility.", highlight: "Factor investing is not picking hot stocks — it is systematically tilting toward characteristics that data shows produce better returns.", example: "Value factor: Buying a basket of cheapest stocks has historically outperformed the broad market by 3 to 5% annually." },
        { label: "Factor ETFs", heading: "How to access factors", body: "Several ETF providers offer factor-based ETFs — sometimes called smart beta ETFs. These tilt your portfolio toward specific factor exposures.", highlight: "For most investors, a standard MSCI World ETF is sufficient. Factor tilts are for investors who understand and commit to them long-term.", example: "Core satellite approach: 80% MSCI World (core) plus 10% MSCI World Value plus 10% MSCI World Momentum." }
      ],
      quiz: { question: "What is the Value factor in factor investing?", options: [{ text: "Investing only in the highest-quality, most expensive companies", correct: false }, { text: "Systematically buying stocks that appear cheap relative to their fundamentals", correct: true }, { text: "Investing in companies that provide the most value to customers", correct: false }, { text: "Choosing ETFs with the lowest management fees", correct: false }], correctFeedback: "Correct! Value investing targets stocks that are cheap relative to their fundamentals.", wrongFeedback: "Value factor = buying cheap stocks relative to earnings or book value." }
    }
  },
  {
    id: 105, chapter: 2,
    title: "REITs — Real Estate Without Buying Property", icon: "🏢", desc: "Invest in real estate through the stock market without a mortgage.",
    tags: ["Real Estate", "7 min"], xp: 75, gold: 17,
    lesson: {
      heading: "Real estate returns without the hassle", intro: "Most people think real estate investing requires a mortgage. REITs change that.",
      blocks: [
        { label: "What is a REIT?", heading: "Real Estate Investment Trust explained", body: "A REIT is a company that owns income-producing real estate — offices, apartments, hospitals, data centers. By law, REITs must distribute at least 90% of their taxable income to shareholders as dividends.", highlight: "REITs offer real estate diversification, high dividend yields and liquidity — you can sell your REIT ETF instantly, unlike physical property.", example: "Types of REITs: Residential, Commercial, Industrial, Retail, Healthcare, Infrastructure including cell towers and data centers." },
        { label: "REIT ETFs", heading: "How to invest in REITs", body: "REIT ETFs give you diversified exposure to dozens or hundreds of REITs worldwide. REITs typically yield 3 to 5% in dividends annually.", highlight: "REITs add real estate exposure to a portfolio that is otherwise entirely in stocks and bonds — genuine asset class diversification.", example: "REIT allocation example: Some investors allocate 5 to 15% to REITs. Example: 70% MSCI World plus 20% EM plus 10% Global REIT ETF." }
      ],
      quiz: { question: "What percentage of taxable income must REITs legally distribute to shareholders?", options: [{ text: "50%", correct: false }, { text: "75%", correct: false }, { text: "90%", correct: true }, { text: "100%", correct: false }], correctFeedback: "Correct! REITs must legally distribute at least 90% of taxable income as dividends.", wrongFeedback: "REITs must distribute at least 90% of taxable income — creating their high dividend yields." }
    }
  },
  {
    id: 106, chapter: 2,
    title: "Behavioral Finance — Your Brain is the Enemy", icon: "🧠", desc: "The psychological biases that destroy investment returns.",
    tags: ["Psychology", "8 min"], xp: 80, gold: 18,
    lesson: {
      heading: "The investor greatest enemy is themselves", intro: "Studies show the average investor dramatically underperforms the funds they invest in — because of their own behavior.",
      blocks: [
        { label: "The main biases", heading: "Cognitive errors that cost money", body: "Loss aversion: losses feel twice as painful as gains — causing panic selling. Recency bias: assuming recent trends continue. Confirmation bias: seeking only confirming information. Overconfidence: believing you can predict markets better than you can.", highlight: "The DALBAR study found that over 30 years, the average equity fund investor earned 4% less per year than the S&P 500 itself — entirely due to behavior.", example: "Loss aversion: A 20% drop causes many investors to panic sell. Then they miss the recovery." },
        { label: "How to overcome biases", heading: "Systems beat willpower", body: "You cannot eliminate psychological biases — but you can design systems that prevent them from harming you. Automate everything. Write an Investment Policy Statement with your rules before the next crisis hits.", highlight: "An Investment Policy Statement written during calm markets guides behavior during turbulent ones.", example: "Investment Policy Statement example: My allocation is 80 to 20. I rebalance quarterly. I will not sell during declines. I invest 300 euros per month automatically." }
      ],
      quiz: { question: "What does the DALBAR study consistently find about average investor behavior?", options: [{ text: "Average investors significantly outperform their funds", correct: false }, { text: "Average investors earn significantly less than the funds they invest in due to poor timing decisions", correct: true }, { text: "Investor behavior has no impact on returns", correct: false }, { text: "Active trading improves investor returns", correct: false }], correctFeedback: "Correct! DALBAR consistently shows investors earn far less than their funds because they buy high and sell low.", wrongFeedback: "DALBAR shows average investors earn 3 to 4% less annually than the funds they invest in — entirely due to behavioral errors." }
    }
  },
  {
    id: 107, chapter: 2,
    title: "Emerging Markets — Growth Frontier", icon: "🌏", desc: "Access the fastest-growing economies in the world through ETFs.",
    tags: ["Global", "7 min"], xp: 70, gold: 16,
    lesson: {
      heading: "The next billion investors", intro: "The MSCI World covers developed economies. The world's fastest growing economies are in emerging markets.",
      blocks: [
        { label: "What are emerging markets?", heading: "The developing world's stock exchanges", body: "Emerging markets are economies in transition — faster growing than developed markets but with more risk. The MSCI Emerging Markets index covers 24 countries including China at around 30%, India at around 20%, Taiwan at around 17% and South Korea at around 13%.", highlight: "Emerging markets represent enormous long-term growth potential — the rising middle class, urbanization and technology adoption will drive growth for decades.", example: "MSCI EM composition: China 30%, India 20%, Taiwan 17%, South Korea 13%, Brazil 5%, Saudi Arabia 4%, Other 11%." },
        { label: "EM in your portfolio", heading: "How much emerging markets?", body: "The most common EM allocation for long-term growth investors is 10 to 30% of the equity portion. The classic 3-fund portfolio uses 20% in emerging markets.", highlight: "An 80% MSCI World plus 20% MSCI Emerging Markets portfolio is one of the most recommended simple portfolios for European long-term investors.", example: "Popular EM ETFs: EMIM from iShares MSCI EM IMI at TER 0.18%, VFEM from Vanguard FTSE Emerging Markets at TER 0.22%." }
      ],
      quiz: { question: "Which country currently has the largest weight in the MSCI Emerging Markets index?", options: [{ text: "India", correct: false }, { text: "Brazil", correct: false }, { text: "China", correct: true }, { text: "South Korea", correct: false }], correctFeedback: "Correct! China represents approximately 30% of the MSCI Emerging Markets index.", wrongFeedback: "China is the largest component of the MSCI Emerging Markets index at approximately 30%." }
    }
  },
  {
    id: 108, chapter: 2,
    title: "Asset Allocation — The Most Important Decision", icon: "🎨", desc: "Why how you split your portfolio matters more than which funds you pick.",
    tags: ["Portfolio", "8 min"], xp: 80, gold: 18,
    lesson: {
      heading: "The decision that determines 90% of your returns", intro: "Research consistently shows that asset allocation determines approximately 90% of portfolio performance.",
      blocks: [
        { label: "What is asset allocation?", heading: "The big picture of your portfolio", body: "Asset allocation is the strategic distribution of investments across different asset classes: stocks, bonds, real estate, commodities and cash. Each behaves differently. The mix determines your risk level and expected return.", highlight: "A 90 to 10 stocks to bonds portfolio will behave very differently from a 60 to 40 — far more volatile but with higher expected long-term returns.", example: "Common allocations: Aggressive at 100% stocks for maximum growth. Balanced at 70 to 30 for good growth with smoother ride. Conservative at 40 to 60 for capital preservation." },
        { label: "Choosing your allocation", heading: "Risk tolerance and time horizon", body: "Your allocation should reflect your time horizon and your risk tolerance — how much loss you can stomach emotionally without selling.", highlight: "A simple rule: subtract your age from 110 to get your equity percentage. At 30: 80% stocks. At 50: 60% stocks. At 70: 40% stocks.", example: "Stress test: If your 100,000 euro portfolio fell to 60,000 euros, would you panic sell? If yes, your equity allocation is too high." }
      ],
      quiz: { question: "According to research, approximately what percentage of portfolio performance is determined by asset allocation?", options: [{ text: "30%", correct: false }, { text: "60%", correct: false }, { text: "90%", correct: true }, { text: "It depends entirely on stock selection", correct: false }], correctFeedback: "Correct! Research by Brinson, Hood and Beebower found asset allocation explains approximately 90% of portfolio return variation.", wrongFeedback: "Asset allocation determines approximately 90% of portfolio performance. Individual stock selection is secondary." }
    }
  },
  {
    id: 109, chapter: 2,
    title: "The All-Weather Portfolio", icon: "🌤️", desc: "Ray Dalio's portfolio designed to perform in any economic environment.",
    tags: ["Strategy", "7 min"], xp: 75, gold: 17,
    lesson: {
      heading: "A portfolio for every season", intro: "Ray Dalio, founder of Bridgewater, created the All Weather Portfolio — designed to perform in any economic environment.",
      blocks: [
        { label: "The concept", heading: "Four economic seasons", body: "Dalio identified four economic environments: Rising growth with low inflation where stocks win, Falling growth with low inflation where bonds win, Rising growth with high inflation where commodities win, Falling growth with high inflation where gold and inflation-protected bonds win.", highlight: "No asset class performs well in every environment. The All Weather Portfolio holds something that performs in each.", example: "The four environments: Rising growth = stocks. Falling growth = bonds. Rising inflation = commodities. Stagflation = gold." },
        { label: "The allocation", heading: "All Weather Portfolio composition", body: "The original All Weather Portfolio: 30% stocks, 40% long-term bonds, 15% intermediate bonds, 7.5% gold, 7.5% commodities. This is risk-weighted rather than dollar-weighted.", highlight: "The All Weather Portfolio has historically delivered approximately 7 to 8% annual return with maximum drawdown of only minus 11%.", example: "Historical performance: All Weather delivered around 7 to 8% annual return since 1984 vs S&P 500 drawdown of minus 51% in 2008 to 2009." }
      ],
      quiz: { question: "Why does the All Weather Portfolio hold 40% in long-term bonds if stocks historically return more?", options: [{ text: "Bonds always outperform stocks", correct: false }, { text: "Bonds are risk-weighted — less volatile, so more is needed to balance risk contribution", correct: true }, { text: "The portfolio is designed for retirees only", correct: false }, { text: "Long-term bonds have the same return as stocks", correct: false }], correctFeedback: "Exactly right! Risk weighting means holding more of less volatile assets to equalize risk contribution.", wrongFeedback: "Risk weighting: stocks are more volatile than bonds. You hold more bonds to equalize each asset's risk contribution." }
    }
  },
  {
    id: 110, chapter: 2,
    title: "The Psychology of Money", icon: "💭", desc: "How your relationship with money shapes your financial future.",
    tags: ["Psychology", "8 min"], xp: 80, gold: 18,
    lesson: {
      heading: "Money is emotional before it is mathematical", intro: "Morgan Housel argues that financial success has more to do with behavior than intelligence.",
      blocks: [
        { label: "Key insights", heading: "What really drives financial outcomes", body: "Saving money is entirely behavioral. Investing is about staying invested through fear — again behavioral. Every financial mistake has a behavioral root: impatience, greed, envy, fear or pride.", highlight: "Being reasonable is more important than being rational. A good financial plan you actually follow beats a perfect plan you abandon at the first market crash.", example: "Housel insight: Two people with identical knowledge will have wildly different outcomes based on behavior." },
        { label: "Practical wisdom", heading: "The timeless financial principles", body: "Key principles: Enough is a superpower — defining what enough means prevents the endless pursuit of more. Save like a pessimist, invest like an optimist. Your time horizon is your biggest advantage.", highlight: "The most important financial decision is not which ETF to buy — it is how long you stay invested without panicking.", example: "Defining enough: If you know your FIRE number and reach it, the rational decision is to stop taking excessive risks." }
      ],
      quiz: { question: "What is the primary driver of long-term investment success?", options: [{ text: "Superior stock selection skills", correct: false }, { text: "Behavioral discipline — staying invested and avoiding emotional decisions", correct: true }, { text: "Timing market movements correctly", correct: false }, { text: "Access to insider information", correct: false }], correctFeedback: "Exactly right! Behavioral discipline — staying invested through crashes, not panic selling, saving consistently — is the primary driver.", wrongFeedback: "Behavioral discipline is the key: staying invested through crashes, not panic selling, saving consistently." }
    }
  },
  {
    id: 111, chapter: 2,
    title: "International Diversification", icon: "🗺️", desc: "Why investing globally reduces risk and increases opportunity.",
    tags: ["Global", "6 min"], xp: 70, gold: 15,
    lesson: {
      heading: "The world is your portfolio", intro: "Home bias — investing mostly in your own country — is one of the most common and costly investing mistakes.",
      blocks: [
        { label: "Home bias problem", heading: "Why local investing limits you", body: "Investors consistently overweight their home country. Germany represents only about 2 to 3% of global market capitalization. An investor who holds mostly German stocks is missing 97% of the world's investable assets.", highlight: "Germany represents only about 2 to 3% of global market capitalization. A 100% German portfolio means ignoring Apple, Microsoft, ASML, LVMH, Samsung and thousands more.", example: "Germany equals 2 to 3% of global markets. A 100% German portfolio means ignoring 97% of global opportunity." },
        { label: "True global diversification", heading: "Owning the world", body: "A global ETF like MSCI World automatically distributes your investment across the world's best companies. Adding emerging markets extends this to fast-growing developing economies.", highlight: "When the US market struggled in 2000 to 2009, international markets performed better. Global diversification smooths out regional cycles.", example: "MSCI ACWI All Country World Index: Covers 47 countries, approximately 2,900 companies. One ETF. The whole world." }
      ],
      quiz: { question: "What percentage of global market capitalization does Germany represent?", options: [{ text: "About 15%", correct: false }, { text: "About 10%", correct: false }, { text: "About 2 to 3%", correct: true }, { text: "About 25%", correct: false }], correctFeedback: "Correct! Germany represents only about 2 to 3% of global market cap.", wrongFeedback: "Germany equals approximately 2 to 3% of global markets. Global ETFs give access to the 97% of opportunities outside any single country." }
    }
  },
  {
    id: 112, chapter: 2,
    title: "Building Multiple Income Streams", icon: "🌊", desc: "Understand how to create financial security through income diversification.",
    tags: ["Strategy", "7 min"], xp: 75, gold: 17,
    lesson: {
      heading: "Never depend on a single source", intro: "True financial security comes from multiple streams of income.",
      blocks: [
        { label: "Types of income", heading: "Active vs passive income", body: "Active income requires your time: salary, freelancing, consulting. Passive income flows regardless of your time: dividends, rental income, bond interest, business profits. Financial independence is achieved when passive income covers your expenses.", highlight: "The wealthy do not just earn more — they create systems that generate income while they sleep. ETF dividends are the simplest form of this.", example: "Multiple income streams: Salary plus 200,000 euro ETF portfolio generating 4% equals 8,000 euros per year in dividends." },
        { label: "Building the streams", heading: "The progression of income building", body: "Phase 1: Save from active income and invest it. Phase 2: Build investment portfolio generating passive income. Phase 3: Develop knowledge-based income like courses or content. Phase 4: Scale the most successful streams.", highlight: "Start with Phase 1. Invest consistently. The portfolio itself is Phase 2. Opportunities for Phases 3 and 4 emerge as your knowledge and security grow.", example: "Timeline: Age 25 to 35 maximize salary and invest aggressively. Age 35 to 45 growing investment income supplements salary. Age 45 plus investment income covers basic expenses." }
      ],
      quiz: { question: "What is passive income?", options: [{ text: "Income earned from a very easy job with minimal effort", correct: false }, { text: "Income that flows regardless of your time — dividends, rental income, interest", correct: true }, { text: "Government welfare payments", correct: false }, { text: "Income earned working part-time", correct: false }], correctFeedback: "Correct! Passive income flows without requiring your active time — dividends, rental income, interest payments.", wrongFeedback: "Passive income flows regardless of your time: ETF dividends, rental income, interest." }
    }
  },
  {
    id: 113, chapter: 2,
    title: "Portfolio Rebalancing Mastery", icon: "⚖️", desc: "Master the practice that keeps your portfolio on track year after year.",
    tags: ["Management", "7 min"], xp: 70, gold: 16,
    lesson: {
      heading: "Restore order to your portfolio", intro: "Rebalancing is the disciplined practice of restoring your target allocation when market movements cause it to drift.",
      blocks: [
        { label: "Why rebalance?", heading: "Drift creates hidden risk", body: "If you start with 80% stocks and 20% bonds, after a strong bull market you might drift to 90% stocks and 10% bonds. Your portfolio is now riskier than you intended — without making a conscious decision.", highlight: "Rebalancing is not just about optimization — it is about maintaining the risk level you consciously chose and can emotionally tolerate.", example: "Drift example: Start 80% stocks 100,000 euros and 20% bonds 25,000 euros. After stocks rise 50%: 86% stocks and 14% bonds. Risk increased without your decision." },
        { label: "How to rebalance", heading: "Threshold and calendar methods", body: "Two approaches: Calendar rebalancing — rebalance once per year on a fixed date. Threshold rebalancing — rebalance whenever any asset class drifts more than 5% from target.", highlight: "Rebalancing with new contributions is more tax efficient than selling overweighted ones. Avoid triggering capital gains taxes unless necessary.", example: "Rebalancing with savings plan: Target 80 to 20. Stocks drifted to 85%: direct next month's savings entirely to bonds. No selling needed." }
      ],
      quiz: { question: "What is the most tax-efficient way to rebalance a portfolio?", options: [{ text: "Sell the overweighted assets and buy the underweighted ones", correct: false }, { text: "Direct new savings contributions toward underweighted assets to restore balance", correct: true }, { text: "Completely liquidate and reinvest the entire portfolio", correct: false }, { text: "Rebalancing is not necessary for long-term investors", correct: false }], correctFeedback: "Correct! Using new contributions to rebalance avoids triggering capital gains taxes.", wrongFeedback: "The most tax-efficient rebalancing uses new contributions to buy underweighted assets — no capital gains taxes triggered." }
    }
  },
  {
    id: 114, chapter: 2,
    title: "Robo-Advisors vs DIY Investing", icon: "🤖", desc: "Compare automated investing services with managing your own portfolio.",
    tags: ["Practical", "6 min"], xp: 65, gold: 14,
    lesson: {
      heading: "Managed or managed yourself?", intro: "Robo-advisors like Scalable Capital or Quirion offer automated portfolio management. Understanding their trade-offs helps you decide what is right for you.",
      blocks: [
        { label: "What robo-advisors do", heading: "Automated portfolio management", body: "Robo-advisors automatically create a portfolio based on your risk profile, invest your money in ETFs, rebalance regularly and report performance.", highlight: "A robo-advisor charging 0.5% per year on top of ETF fees is still dramatically cheaper than a traditional bank charging 1.5 to 2.5%.", example: "German robo-advisors: Scalable Capital at 0.75% per annum, Quirion at 0.48% per annum. All use diversified ETF portfolios." },
        { label: "DIY investing", heading: "Managing your own portfolio", body: "DIY investing — buying ETFs directly through a broker like Trade Republic — typically costs 0.15 to 0.25% per year with no additional management fee.", highlight: "DIY investing with a simple ETF portfolio beats robo-advisors on cost and typically delivers similar or better returns.", example: "30-year comparison: 500 euros per month at 7%. DIY at 0.20% TER: approximately 580,000 euros. Robo at 0.90% total: approximately 530,000 euros. 50,000 euro difference from fees." }
      ],
      quiz: { question: "For someone with basic knowledge who can commit to not panic selling, which option is generally better?", options: [{ text: "A robo-advisor, because professionals always know best", correct: false }, { text: "DIY ETF investing, because lower fees compound into significantly better long-term outcomes", correct: true }, { text: "A traditional bank portfolio, because of the personal relationship", correct: false }, { text: "They are identical in outcome", correct: false }], correctFeedback: "Correct! DIY ETF investing delivers better outcomes over time due to lower fees.", wrongFeedback: "For investors with basic knowledge and discipline, DIY ETF investing outperforms robo-advisors due to lower fees." }
    }
  },
  {
    id: 115, chapter: 2,
    title: "Gold and Commodities", icon: "🥇", desc: "Understand the role of gold and commodities in a diversified portfolio.",
    tags: ["Assets", "6 min"], xp: 65, gold: 14,
    lesson: {
      heading: "The ancient store of value", intro: "Gold has been used as a store of value for thousands of years.",
      blocks: [
        { label: "Gold's role", heading: "Inflation hedge and crisis protection", body: "In investment portfolios, gold serves as: an inflation hedge, a crisis hedge and a diversifier. It does not generate earnings or dividends — its value comes from scarcity.", highlight: "Gold is not a growth investment — it is portfolio insurance. Small allocations of 5 to 10% can reduce overall portfolio volatility.", example: "2008 Financial Crisis: S&P 500 fell 57%. Gold rose approximately 5%." },
        { label: "Commodities", heading: "Oil, metals, agriculture and more", body: "Commodity ETFs invest in physical commodities or futures: oil, industrial metals, agricultural products and precious metals. They often perform well during inflationary periods.", highlight: "For most beginners, a small gold allocation of 5 to 10% is sufficient commodity exposure.", example: "Gold ETF options: Xetra-Gold (physical gold, TER 0.36%), iShares Physical Gold (TER 0.12%). Hold actual gold bars." }
      ],
      quiz: { question: "What is the primary investment role of gold in a diversified portfolio?", options: [{ text: "To generate high dividend income", correct: false }, { text: "To act as an inflation hedge and portfolio stabilizer during crises", correct: true }, { text: "To replace stocks as the main growth driver", correct: false }, { text: "To eliminate all portfolio risk", correct: false }], correctFeedback: "Correct! Gold serves as insurance — an inflation hedge and crisis protection.", wrongFeedback: "Gold is portfolio insurance. It hedges against inflation and provides stability during market crises." }
    }
  },
  {
    id: 116, chapter: 2,
    title: "Leverage — The Double-Edged Sword", icon: "⚡", desc: "Understand leverage and why beginners should avoid it.",
    tags: ["Risk", "6 min"], xp: 65, gold: 14,
    lesson: {
      heading: "Amplified gains — and amplified losses", intro: "Leverage means using borrowed money or financial instruments to amplify investment exposure. It multiplies gains — and multiplies losses equally.",
      blocks: [
        { label: "How leverage works", heading: "Borrowing to invest more", body: "A 2x leveraged ETF attempts to deliver twice the daily return of its index. Volatility decay makes leveraged products extremely dangerous for long-term holding.", highlight: "Volatility decay: a 2x ETF that falls 50% needs to rise 100% to break even.", example: "Decay example: 2x ETF. Day 1 minus 10% (ETF falls 20%). Day 2 plus 10% (ETF rises 20%). Net: you are down 4% after flat performance in the underlying." },
        { label: "When leverage destroys wealth", heading: "The danger in numbers", body: "Many retail investors in 2020 to 2022 bought leveraged tech ETFs attracted by massive gains. When the tech correction came in 2022, these ETFs lost 70 to 90% of their value.", highlight: "Leveraged ETFs are designed for professional traders managing positions daily — not for long-term investors.", example: "3x Nasdaq ETF TQQQ: From peak to trough in 2022, lost approximately 80% of its value. Required a 400% gain just to break even." }
      ],
      quiz: { question: "Why are leveraged ETFs generally inappropriate for long-term investors?", options: [{ text: "They are illegal in most countries", correct: false }, { text: "Volatility decay means they systematically lose value over time in volatile markets", correct: true }, { text: "They only hold bonds, not stocks", correct: false }, { text: "They have very high TERs that eliminate all gains", correct: false }], correctFeedback: "Correct! Volatility decay is the mathematical reality that makes leveraged products dangerous for long-term holding.", wrongFeedback: "Volatility decay: the mathematics of daily leverage rebalancing erodes value over time in volatile markets." }
    }
  },
  {
    id: 117, chapter: 2,
    title: "Sequence of Returns Risk", icon: "🎲", desc: "The retirement risk nobody talks about — and how to protect yourself.",
    tags: ["Retirement", "7 min"], xp: 75, gold: 17,
    lesson: {
      heading: "When the order of returns matters enormously", intro: "During accumulation, the order of returns does not matter much. In retirement, it can be the difference between security and running out of money.",
      blocks: [
        { label: "What is the risk?", heading: "Bad timing can ruin retirement", body: "Sequence of returns risk is the danger of experiencing large negative returns early in retirement. If your portfolio crashes 40% in year one and you are withdrawing 4%, you have far less capital remaining to recover with.", highlight: "Two identical portfolios with identical average returns can produce dramatically different outcomes depending on whether the bad years come at the start or end of retirement.", example: "Example: Retire with 500,000 euros. Year 1 minus 40% (portfolio = 280,000 euros after withdrawal). Year 2 minus 20% (214,400 euros). Strong recovery cannot compensate." },
        { label: "Protection strategies", heading: "How to protect against sequence risk", body: "Key strategies: Cash buffer — keep 1 to 2 years of expenses in cash to avoid selling during crashes. Bond ladder — hold bonds maturing in sequence. Flexible withdrawals — reduce during market downturns.", highlight: "A cash buffer of 1 to 2 years of expenses is the simplest and most effective protection against sequence of returns risk.", example: "Cash buffer strategy: Keep 24,000 euros (one year of expenses) in a savings account. In a crash, live from cash. Let the portfolio recover." }
      ],
      quiz: { question: "What is a cash buffer and why is it important for retirees?", options: [{ text: "Extra stocks held in reserve to buy during crashes", correct: false }, { text: "1 to 2 years of living expenses in cash that prevents selling investments during market downturns", correct: true }, { text: "A percentage of bonds kept liquid for emergencies", correct: false }, { text: "Government pension payments received before investment income", correct: false }], correctFeedback: "Exactly right! A cash buffer provides spending money during downturns without forcing portfolio sales at depressed prices.", wrongFeedback: "Cash buffer = 1 to 2 years of living expenses in cash. During a crash, live from cash and let investments recover undisturbed." }
    }
  },
  {
    id: 118, chapter: 2,
    title: "Tax-Loss Harvesting", icon: "🌾", desc: "A legal strategy to reduce your tax bill using market downturns.",
    tags: ["Tax", "7 min"], xp: 70, gold: 16,
    lesson: {
      heading: "Turn losses into tax savings", intro: "Tax-loss harvesting is a sophisticated but simple strategy: selling investments at a loss to offset capital gains taxes.",
      blocks: [
        { label: "How it works", heading: "Crystallize losses to reduce taxes", body: "If you hold an ETF that is down 20%, selling it realizes a capital loss. This loss can be used to offset capital gains from other investments. Immediately after selling, you buy a similar but not identical ETF to maintain market exposure.", highlight: "Tax-loss harvesting does not eliminate taxes — it defers them. But tax deferral is valuable: money not paid in taxes continues to compound.", example: "Example: Sell MSCI World ETF at a 5,000 euro loss. Immediately buy an equivalent global ETF. Tax credit offsets 5,000 euros of gains elsewhere." },
        { label: "Important rules", heading: "The wash sale rule", body: "Tax authorities have rules to prevent investors from immediately buying back the same security they sold for a loss. You must ensure you are buying a genuinely different ETF.", highlight: "Tax-loss harvesting is most valuable in large portfolios and in years with significant capital gains elsewhere to offset.", example: "Swap candidates: MSCI World to FTSE Developed World. MSCI Emerging Markets to FTSE Emerging Markets." }
      ],
      quiz: { question: "What is the primary purpose of tax-loss harvesting?", options: [{ text: "To permanently eliminate all capital gains taxes", correct: false }, { text: "To realize losses that offset capital gains, reducing or deferring the tax bill", correct: true }, { text: "To switch to better performing ETFs after losses", correct: false }, { text: "To comply with government regulations on portfolio composition", correct: false }], correctFeedback: "Correct! Tax-loss harvesting realizes losses to offset gains, reducing or deferring taxes while maintaining market exposure.", wrongFeedback: "Crystallize losses to offset capital gains — reducing your tax bill while maintaining market exposure." }
    }
  },
  {
    id: 119, chapter: 2,
    title: "Cryptocurrency — What You Need to Know", icon: "₿", desc: "An objective look at crypto as an asset class for your portfolio.",
    tags: ["Alternative", "7 min"], xp: 70, gold: 15,
    lesson: {
      heading: "The most controversial asset class", intro: "Cryptocurrency divides opinion sharply. This quest provides an objective look at what crypto is and what role it might play.",
      blocks: [
        { label: "What is crypto?", heading: "Digital assets and their properties", body: "Cryptocurrency is digital money secured by cryptography on decentralized networks. Bitcoin has a fixed supply of 21 million coins. Unlike stocks, cryptocurrencies do not represent ownership in a productive business — their value is driven by supply, demand and sentiment.", highlight: "Crypto is not an investment in a business — it is speculation on a technology and narrative.", example: "Bitcoin vs MSCI World: MSCI World rises because underlying companies generate profits. Bitcoin rises because more people want it." },
        { label: "Risk and allocation", heading: "If you invest in crypto", body: "Crypto is extremely volatile — drawdowns of 70 to 90% are not rare. If you choose to include it, limit crypto to 1 to 5% of your total portfolio — an amount you could afford to lose entirely.", highlight: "Only invest in crypto what you could afford to lose completely without losing sleep. Treat it as high-risk speculation, not a core investment.", example: "Reasonable approach: Core portfolio = 95% diversified ETFs. Speculative allocation = maximum 5% in crypto." }
      ],
      quiz: { question: "What percentage of a portfolio is commonly recommended as a maximum crypto allocation?", options: [{ text: "25 to 50%", correct: false }, { text: "10 to 20%", correct: false }, { text: "1 to 5%", correct: true }, { text: "Crypto should form the majority of a growth portfolio", correct: false }], correctFeedback: "Correct! 1 to 5% is the commonly recommended maximum for crypto.", wrongFeedback: "Maximum 1 to 5% in crypto. This limits the damage if crypto falls 90% while allowing you to benefit from upside." }
    }
  },
  {
    id: 120, chapter: 2,
    title: "Building a Million Euro Portfolio", icon: "💎", desc: "The math behind reaching seven figures through consistent investing.",
    tags: ["Goals", "7 min"], xp: 80, gold: 20,
    lesson: {
      heading: "One million euros — the math is simpler than you think", intro: "A million euro portfolio sounds impossible. The mathematics of compound interest reveals that for most people, it is entirely achievable.",
      blocks: [
        { label: "The math", heading: "How to reach 1,000,000 euros", body: "At 7% average annual return: investing 500 euros per month for 35 years gives approximately 960,000 euros. Starting with 10,000 euros and investing 500 euros per month for 35 years gives approximately 1,100,000 euros.", highlight: "A million euro portfolio is achievable on a middle-class income. The ingredient most people underestimate is time — not income.", example: "The formula: Start early. Invest consistently. Choose low-cost ETFs. Reinvest everything. Do not panic sell. Wait." },
        { label: "Realistic scenarios", heading: "Different paths to the same destination", body: "Early starter at 25 years old with 300 euros per month: reaches 1 million euros by age 65 over 40 years. Moderate starter at 30 with 500 euros per month: reaches 1 million by age 65 over 35 years.", highlight: "Every decade of delay approximately doubles the monthly investment needed to reach the same goal.", example: "Start at 25 vs 35: Both want 1 million by 65. Age 25 needs 290 euros per month. Age 35 needs 660 euros per month." }
      ],
      quiz: { question: "Approximately how much per month starting at age 25 to reach 1,000,000 euros by age 65 at 7%?", options: [{ text: "100 euros per month", correct: false }, { text: "290 euros per month", correct: true }, { text: "1,000 euros per month", correct: false }, { text: "2,000 euros per month", correct: false }], correctFeedback: "Correct! Approximately 290 euros per month invested from age 25 at 7% annual return reaches 1 million euros by age 65.", wrongFeedback: "Approximately 290 euros per month from age 25 at 7% reaches 1 million by 65. 40 years of compound interest is extraordinary." }
    }
  },
  {
    id: 121, chapter: 2,
    title: "Inheritance and Wealth Transfer", icon: "🏰", desc: "Plan for the efficient transfer of your wealth to future generations.",
    tags: ["Planning", "7 min"], xp: 70, gold: 15,
    lesson: {
      heading: "Build wealth that outlasts you", intro: "Building wealth is one thing. Preserving and transferring it efficiently is another.",
      blocks: [
        { label: "Inheritance tax in Germany", heading: "Erbschaftsteuer basics", body: "In Germany, inheritances are subject to Erbschaftsteuer. Spouses have a 500,000 euro tax-free allowance. Children have a 400,000 euro allowance. These allowances reset every 10 years — enabling systematic tax-free gifting.", highlight: "The 10-year gifting rule is one of the most powerful legal tools for tax-efficient wealth transfer.", example: "Gifting strategy: Gift 400,000 euros to your child at age 45. Wait 10 years. Gift another 400,000 euros at age 55. Total: 800,000 euros transferred tax-free." },
        { label: "Estate planning basics", heading: "Wills and beneficiary designations", body: "A will is essential if you want control over how your assets are distributed. Without one, German intestate succession law applies — which may not reflect your wishes.", highlight: "Writing a will is one of the most important financial acts you can take. It costs little, takes time once and ensures your wishes are respected.", example: "Minimum estate planning: Write a will. Document all accounts and assets. Ensure your partner knows where everything is. Review every 5 years." }
      ],
      quiz: { question: "How much can a child inherit tax-free from a parent in Germany?", options: [{ text: "100,000 euros", correct: false }, { text: "250,000 euros", correct: false }, { text: "400,000 euros", correct: true }, { text: "1,000,000 euros", correct: false }], correctFeedback: "Correct! Children have a 400,000 euro tax-free inheritance allowance from each parent, resetting every 10 years.", wrongFeedback: "In Germany, children can inherit 400,000 euros from each parent tax-free. This allowance resets every 10 years." }
    }
  },
  {
    id: 122, chapter: 2,
    title: "The Investment Policy Statement", icon: "📋", desc: "Write your personal investing rulebook before you need it.",
    tags: ["Planning", "7 min"], xp: 70, gold: 15,
    lesson: {
      heading: "Rules written in calm, followed in chaos", intro: "Professional investors follow formal investment policies. Smart individual investors should too.",
      blocks: [
        { label: "What it contains", heading: "Your IPS components", body: "A good Investment Policy Statement contains: your financial goals and timeline, your target asset allocation and why, your rebalancing rules, your savings plan amount and frequency, your rules for what NOT to do and your plan for life events.", highlight: "The most important section is what you commit NOT to do. Writing I will not sell during market crashes makes you far more likely to hold through one.", example: "Sample IPS: I invest 400 euros per month in IWDA 70% and EMIM 30%. I rebalance annually. I will not sell if markets fall more than 30%." },
        { label: "Why it works", heading: "Pre-commitment beats willpower", body: "Research shows that pre-commitment — making rules before being in the situation — is far more effective than relying on willpower in the moment.", highlight: "Odysseus tied himself to the mast before sailing past the sirens. Your IPS is the rope that keeps you tied to your strategy when market sirens call.", example: "The power of pre-commitment: Investors with written investment policies consistently make better decisions during market volatility." }
      ],
      quiz: { question: "What is the primary purpose of writing an Investment Policy Statement?", options: [{ text: "To legally protect yourself from investment losses", correct: false }, { text: "To pre-commit to rational rules that prevent emotional decisions during market volatility", correct: true }, { text: "To satisfy broker account requirements", correct: false }, { text: "To predict future market movements", correct: false }], correctFeedback: "Exactly right! An IPS is behavioral finance in practice — pre-committing to rational rules before emotional situations arise.", wrongFeedback: "An IPS works through pre-commitment: writing rules when calm that you follow when emotional." }
    }
  },
  {
    id: 123, chapter: 2,
    title: "Inflation-Linked Bonds", icon: "🔗", desc: "Bonds that protect your purchasing power against rising prices.",
    tags: ["Bonds", "6 min"], xp: 65, gold: 14,
    lesson: {
      heading: "Bonds that grow with inflation", intro: "Standard bonds pay fixed interest — eroded by inflation. Inflation-linked bonds solve this.",
      blocks: [
        { label: "How they work", heading: "Inflation protection built in", body: "Inflation-linked bonds have their principal value adjusted upward with inflation. If inflation is 3%, your 10,000 euro bond becomes 10,300 euros. Interest is paid on the adjusted principal.", highlight: "Inflation-linked bonds guarantee you maintain purchasing power — the one thing standard bonds cannot promise.", example: "Example: Buy 10,000 euros in a 10-year German inflation-linked bond. 30% cumulative inflation over 10 years. At maturity: 13,000 euros back plus inflation-adjusted interest." },
        { label: "Portfolio role", heading: "When to use inflation-linked bonds", body: "Inflation-linked bonds are most valuable during periods of rising or unexpected inflation. For investors close to retirement who depend on their portfolio for living expenses, a small allocation provides genuine inflation insurance.", highlight: "A small allocation to inflation-linked bonds of 5 to 10% of the bond allocation provides meaningful inflation protection.", example: "ETF options: IBCI from iShares Euro Inflation Linked Government Bond ETF at TER 0.09%." }
      ],
      quiz: { question: "How do inflation-linked bonds protect investors against rising prices?", options: [{ text: "They pay a very high fixed interest rate", correct: false }, { text: "Their principal value is adjusted upward with inflation, protecting purchasing power", correct: true }, { text: "They are backed by physical commodities", correct: false }, { text: "They convert to gold when inflation exceeds 5%", correct: false }], correctFeedback: "Correct! Inflation-linked bonds adjust their principal with inflation, protecting the real value.", wrongFeedback: "Inflation-linked bonds have their principal adjusted for inflation. 10,000 euros with 5% inflation becomes 10,500 euros in principal." }
    }
  },
  {
    id: 124, chapter: 2,
    title: "Government Bonds and Safe Haven Assets", icon: "🏛️", desc: "Safe haven assets explained for the conservative investor.",
    tags: ["Bonds", "6 min"], xp: 65, gold: 14,
    lesson: {
      heading: "The safest investments in the world", intro: "When safety matters most — near retirement or during uncertainty — government bonds offer capital preservation that stocks cannot.",
      blocks: [
        { label: "Government bonds", heading: "Lending to sovereign states", body: "Government bonds are loans made to national governments. They are considered among the safest investments because governments can raise taxes or issue currency to repay.", highlight: "German Bunds are considered the gold standard of safety in European fixed income.", example: "German Bund example: 10-year Bund yields approximately 2.5%. Invest 10,000 euros, receive approximately 250 euros per year for 10 years, then 10,000 euros back." },
        { label: "Bond ETFs", heading: "Access bonds through ETFs", body: "Bond ETFs allow you to invest in diversified portfolios of bonds. They offer instant diversification across many bond issuers and maturities.", highlight: "Bond ETFs add stability to your portfolio. A 10 to 20% allocation to a diversified bond ETF smooths out stock market volatility significantly.", example: "Popular European bond ETFs: IBCI from iShares Euro Government Bond at TER 0.09%, VECP from Vanguard EUR Corporate Bond at TER 0.09%." }
      ],
      quiz: { question: "Why are government bonds from stable developed countries considered very safe?", options: [{ text: "They are guaranteed by the EU", correct: false }, { text: "Governments can always raise taxes or issue currency to repay debts", correct: true }, { text: "Their value never decreases", correct: false }, { text: "They are backed by physical gold reserves", correct: false }], correctFeedback: "Correct! Governments have sovereign powers — they can tax citizens or issue currency to meet obligations.", wrongFeedback: "Government bonds are safe because governments have sovereign power — they can raise taxes or issue currency to repay debts." }
    }
  },
  {
    id: 125, chapter: 2,
    title: "Chapter II Complete — Advanced Investor", icon: "🌊", desc: "Congratulations! You have completed the Compound Sea.",
    tags: ["Milestone", "5 min"], xp: 200, gold: 75,
    lesson: {
      heading: "You are now an advanced investor", intro: "You have completed Chapter II — Compound Sea. You now know more about investing than most people who manage money for a living.",
      blocks: [
        { label: "What you mastered", heading: "Chapter II achievements", body: "You now understand: dividend investing, FIRE and the 4% rule, factor investing, REITs, behavioral finance biases, emerging markets, asset allocation theory, the All Weather Portfolio, international diversification, gold, sequence of returns risk, leverage dangers, tax-loss harvesting, rebalancing, robo-advisors vs DIY, cryptocurrency, inheritance planning, multiple income streams, the psychology of money and the mathematics of reaching 1 million euros.", highlight: "This knowledge, consistently applied over decades, will compound into genuine wealth.", example: "The journey so far: Chapter I = Foundation. Chapter II = Mastery." },
        { label: "What is next", heading: "Chapter III — Stock Mountains", body: "Chapter III moves into individual stock analysis, fundamental valuation, sector rotation, advanced tax optimization and the mindset of the truly wealthy.", highlight: "Chapter III is for those who want to build on a perfect foundation with advanced strategies.", example: "Chapter III preview: Stock valuation with P/E ratio and DCF, sector analysis, dividend growth investing, options for income and the wealth mindset." }
      ],
      quiz: { question: "What single concept from Chapters I and II is most important to consistently apply over the next 30 years?", options: [{ text: "Timing the market perfectly using technical analysis", correct: false }, { text: "Investing consistently in low-cost diversified ETFs and staying invested through all market conditions", correct: true }, { text: "Switching strategies based on the current economic environment", correct: false }, { text: "Concentrating in the highest-returning assets each year", correct: false }], correctFeedback: "Exactly right! Consistent investment in low-cost diversified ETFs, combined with the discipline to stay invested through volatility, is the foundation of everything.", wrongFeedback: "The core principle: invest consistently in low-cost diversified ETFs and stay invested through all market conditions." }
    }
  }
]

export const QUESTS: Quest[] = [...CHAPTER_ONE, ...CHAPTER_TWO]

export const DAILY_QUESTS: DailyQuest[] = [
  { id: "dq1", title: "Quick Fire: ETF Basics", icon: "⚡", desc: "Test your ETF knowledge.", xp: 25, gold: 5, question: "What does ETF stand for?", options: [{ text: "Exchange Traded Fund", correct: true }, { text: "Electronic Transfer Fund", correct: false }, { text: "Equity Trading Foundation", correct: false }, { text: "European Tax Fund", correct: false }], correctFeedback: "Correct! ETF = Exchange Traded Fund.", wrongFeedback: "ETF = Exchange Traded Fund. A basket of stocks or bonds traded on a stock exchange." },
  { id: "dq2", title: "Quick Fire: Compound Interest", icon: "⚡", desc: "Test your compound interest knowledge.", xp: 25, gold: 5, question: "If you invest 1,000 euros at 7% per year for 10 years, approximately what do you have?", options: [{ text: "1,700 euros", correct: false }, { text: "1,967 euros", correct: true }, { text: "2,500 euros", correct: false }, { text: "1,000 euros", correct: false }], correctFeedback: "Correct! 1,000 euros at 7% compounded for 10 years = approximately 1,967 euros.", wrongFeedback: "1,000 euros at 7% compounded for 10 years = approximately 1,967 euros. Compound interest at work." },
  { id: "dq3", title: "Quick Fire: TER", icon: "⚡", desc: "Test your knowledge of ETF costs.", xp: 25, gold: 5, question: "Which TER is better for a long-term investor?", options: [{ text: "0.07% per year", correct: true }, { text: "1.5% per year", correct: false }, { text: "2.5% per year", correct: false }, { text: "They are all the same", correct: false }], correctFeedback: "Correct! Lower TER = more money stays in your pocket.", wrongFeedback: "0.07% is dramatically better. A 1.4% difference in annual fees costs potentially 100,000 euros over 30 years." },
  { id: "dq4", title: "Quick Fire: MSCI World", icon: "⚡", desc: "Test your index knowledge.", xp: 25, gold: 5, question: "Approximately how many companies does the MSCI World Index contain?", options: [{ text: "100", correct: false }, { text: "500", correct: false }, { text: "1,600", correct: true }, { text: "50", correct: false }], correctFeedback: "Correct! The MSCI World contains approximately 1,600 companies across 23 developed countries.", wrongFeedback: "The MSCI World contains approximately 1,600 companies across 23 developed countries." },
  { id: "dq5", title: "Quick Fire: Emergency Fund", icon: "⚡", desc: "Test your emergency fund knowledge.", xp: 25, gold: 5, question: "How many months of expenses should an emergency fund contain?", options: [{ text: "1 month", correct: false }, { text: "3 to 6 months", correct: true }, { text: "12 months", correct: false }, { text: "No emergency fund needed if you have ETFs", correct: false }], correctFeedback: "Correct! 3 to 6 months of expenses in liquid cash.", wrongFeedback: "3 to 6 months is the standard recommendation." },
  { id: "dq6", title: "Quick Fire: FIRE Number", icon: "⚡", desc: "Calculate your FIRE number.", xp: 30, gold: 6, question: "Using the 4% rule, what is the FIRE number for someone spending 20,000 euros per year?", options: [{ text: "200,000 euros", correct: false }, { text: "400,000 euros", correct: false }, { text: "500,000 euros", correct: true }, { text: "1,000,000 euros", correct: false }], correctFeedback: "Correct! 20,000 euros times 25 equals 500,000 euros.", wrongFeedback: "FIRE number = annual expenses times 25. 20,000 times 25 = 500,000 euros." },
  { id: "dq7", title: "Quick Fire: Inflation", icon: "⚡", desc: "Test your inflation knowledge.", xp: 25, gold: 5, question: "At 3% annual inflation, 10,000 euros today is worth how much in purchasing power after 10 years?", options: [{ text: "10,000 euros — inflation does not affect savings", correct: false }, { text: "7,441 euros", correct: true }, { text: "5,000 euros", correct: false }, { text: "13,000 euros", correct: false }], correctFeedback: "Correct! At 3% inflation over 10 years, 10,000 euros has only 7,441 euros of purchasing power.", wrongFeedback: "At 3% inflation, 10,000 euros has only 7,441 euros of purchasing power after 10 years." },
  { id: "dq8", title: "Quick Fire: DCA", icon: "⚡", desc: "Test your dollar-cost averaging knowledge.", xp: 25, gold: 5, question: "What does dollar-cost averaging involve?", options: [{ text: "Investing only in US dollar-denominated assets", correct: false }, { text: "Investing a fixed amount at regular intervals regardless of price", correct: true }, { text: "Converting all savings to US dollars before investing", correct: false }, { text: "Waiting for prices to fall before investing", correct: false }], correctFeedback: "Correct! DCA means investing a fixed amount regularly.", wrongFeedback: "Dollar-cost averaging = investing a fixed amount at regular intervals." },
  { id: "dq9", title: "Quick Fire: Tax Allowance", icon: "⚡", desc: "Know your tax benefits.", xp: 25, gold: 5, question: "What is the annual tax-free investment profit allowance for a single person in Germany?", options: [{ text: "500 euros", correct: false }, { text: "1,000 euros", correct: true }, { text: "5,000 euros", correct: false }, { text: "10,000 euros", correct: false }], correctFeedback: "Correct! 1,000 euros per year tax-free, 2,000 euros for couples.", wrongFeedback: "1,000 euros per year is tax-free for single investors in Germany." },
  { id: "dq10", title: "Quick Fire: Market History", icon: "⚡", desc: "Test your market history knowledge.", xp: 30, gold: 6, question: "What happened to the stock market after the 2008 to 2009 financial crisis crash of minus 57%?", options: [{ text: "Markets never fully recovered", correct: false }, { text: "Markets fully recovered and reached new all-time highs", correct: true }, { text: "Markets recovered slightly but remain below 2007 levels", correct: false }, { text: "Governments had to intervene permanently", correct: false }], correctFeedback: "Correct! After falling 57%, markets fully recovered by 2013 and tripled from the 2009 low by 2020.", wrongFeedback: "After the 2008 to 2009 crash, markets fully recovered by 2013 and tripled from the 2009 lows by 2020." },
]

export function getDailyQuest(): DailyQuest {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
  return DAILY_QUESTS[dayOfYear % DAILY_QUESTS.length]
}

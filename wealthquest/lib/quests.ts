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
      heading: "Your first real-world mission",
      intro: "Opening a broker account is the most important financial move most people never take. They mean to do it. They research it. They think about it. Then months pass and nothing happens. Today, you take action.",
      blocks: [
        {
          label: "Choose your broker",
          heading: "Which broker is right for beginners?",
          body: "For European beginners, Trade Republic and Scalable Capital both let you start a savings plan from 1 euro per month with no order fees. Both are BaFin-regulated, insured and trusted by millions of Europeans. Trade Republic is mobile-first and ultra-simple — ideal if you want to set it up and forget it. Scalable Capital offers more features, a wider ETF selection and a desktop platform for those who want more control.",
          highlight: "Recommended for beginners: Trade Republic (mobile-first, ultra-simple) or Scalable Capital (more features, great ETF selection). Both are free to open and have no monthly fees.",
          example: "What you need: A smartphone or computer, your ID or passport, a German bank account (or EU equivalent), 10 minutes. That is it. No minimum investment. No experience required."
        },
        {
          label: "Set up your Sparplan",
          heading: "The savings plan that builds wealth automatically",
          body: "A Sparplan (savings plan) is an automatic monthly instruction to your broker: on the 1st of every month, buy exactly this ETF for exactly this amount. The money leaves your account automatically, the ETF shares appear automatically, and compound interest begins working automatically. You do not have to think, decide or remember anything. Automation removes the biggest risk in investing: yourself.",
          highlight: "The single most powerful investing habit: automate it. Set it once and let compound interest run for decades. The best investors are not more disciplined — they have simply designed systems that require no discipline.",
          example: "50 euros per month at 7% per year for 35 years = 97,000 euros from only 21,000 euros invested. The other 76,000 euros was created purely by compound interest — generated automatically while you lived your life."
        },
        {
          label: "Deep dive",
          heading: "What actually happens when you place an order",
          body: "When your savings plan executes, your broker sends an order to a stock exchange. The exchange matches your buy order with a sell order from another investor. Shares change hands at the current market price. The transaction settles within 2 business days — meaning the shares officially appear in your account. Your broker holds these shares in your name in a segregated custody account, completely separate from the broker's own assets. If the broker fails, your ETF shares are protected.",
          highlight: "Your ETF shares are held in a segregated custody account — completely separate from the broker's own money. Even if Trade Republic or Scalable Capital went bankrupt tomorrow, your ETF investments would be safe and transferable to another broker.",
          example: "Practical tip: Start with a small amount — even 25 euros per month — to get comfortable with the process. You can always increase your savings plan later. The most important step is simply starting."
        }
      ],
      quiz: {
        question: "What is the key advantage of setting up an automated monthly savings plan?",
        options: [
          { text: "You can time the market perfectly every month", correct: false },
          { text: "It removes emotion and ensures consistency through dollar-cost averaging", correct: true },
          { text: "Brokers charge lower fees for automated plans", correct: false },
          { text: "Automated plans always buy at the lowest price", correct: false }
        ],
        correctFeedback: "Exactly! Automation removes emotion — the number one enemy of investors — and ensures you invest consistently through all market conditions.",
        wrongFeedback: "Automation removes the temptation to time the market and ensures you invest consistently through ups and downs. Consistency, not perfection, builds wealth."
      }
    }
  },
  {
    id: 7, chapter: 1,
    title: "Dollar-Cost Averaging", icon: "📅", desc: "The strategy that removes the stress of market timing.",
    tags: ["Strategy", "8 min"], xp: 65, gold: 13,
    lesson: {
      heading: "Invest regularly — regardless of price",
      intro: "Nobody knows when the market will go up or down. Professional fund managers with teams of analysts and decades of experience cannot reliably predict short-term market movements. Dollar-cost averaging makes this uncertainty completely irrelevant.",
      blocks: [
        {
          label: "What it means",
          heading: "Buy regularly, not perfectly",
          body: "Dollar-cost averaging means investing a fixed amount of money at regular intervals — regardless of what the market is doing. When prices are high, your fixed amount buys fewer shares. When prices are low, the same amount buys more shares. Over time, your average purchase price is automatically smoothed out — typically lower than the average market price during the same period.",
          highlight: "DCA turns market volatility from an enemy into a friend. Falling markets mean you automatically buy more shares at cheaper prices — without making any decision.",
          example: "Month 1: €200 invested at €10/share = 20 shares bought. Month 2: Market falls. €200 at €8/share = 25 shares bought. Month 3: €200 at €6/share = 33 shares bought. Average cost: €7.69. Average market price: €8. DCA bought cheaper than the average price."
        },
        {
          label: "Why it works",
          heading: "The psychology and mathematics behind the strategy",
          body: "Most investors try to time the market — waiting for the perfect moment to invest. This approach consistently fails for two reasons. First, nobody can reliably predict short-term market movements, not even professionals. Second, the emotional paralysis of waiting causes investors to miss significant returns while sitting in cash. DCA eliminates the timing decision entirely. You invest the same amount on the same date every month, regardless of news, fear, or market conditions.",
          highlight: "Time in the market beats timing the market. Every time. A DALBAR study found that investors who tried to time the market earned 1.9% per year less than those who invested consistently — for decades.",
          example: "The mathematical advantage: During the 2020 COVID crash, the MSCI World fell 34%. DCA investors who continued investing monthly bought shares at extremely low prices. When markets recovered 6 months later, those additional discounted shares had already gained 40-50%."
        },
        {
          label: "Deep dive",
          heading: "DCA vs lump sum — which is better?",
          body: "Research shows that lump sum investing — putting all available cash in at once — actually outperforms DCA about 65% of the time, because markets trend upward and staying invested longer captures more growth. However, for most people, DCA is far superior in practice for two reasons: they do not have a lump sum available, they invest from monthly income. DCA is not a compromise — it is the optimal strategy for regular investors building wealth from income.",
          highlight: "For regular investors who invest from monthly salary rather than a lump sum windfall, DCA is not just acceptable — it is the ideal, psychologically sustainable strategy that consistently beats attempting to time the market.",
          example: "Practical setup: On the 1st of every month, your broker automatically buys €200 of IWDA. You never check the price. You never decide whether to invest. The system runs automatically for 30 years. This simple discipline, consistently applied, will produce extraordinary results."
        }
      ],
      quiz: {
        question: "What happens when you use dollar-cost averaging during a market decline?",
        options: [
          { text: "You should stop investing until prices recover", correct: false },
          { text: "You automatically buy more shares at cheaper prices, lowering your average cost", correct: true },
          { text: "Your existing shares lose value permanently", correct: false },
          { text: "You should switch to a different ETF", correct: false }
        ],
        correctFeedback: "Correct! When prices fall, your fixed monthly investment automatically buys more shares. This lowers your average cost and amplifies gains when prices recover.",
        wrongFeedback: "With DCA, falling prices are an opportunity — not a threat. Your fixed investment buys more shares when they are cheap, improving your average cost automatically."
      }
    }
  },
  {
    id: 8, chapter: 1,
    title: "The MSCI World Index", icon: "🌍", desc: "Meet the most popular ETF index for long-term investors.",
    tags: ["Indices", "8 min"], xp: 65, gold: 13,
    lesson: {
      heading: "The index that owns the world",
      intro: "If you could know only one index, it should be the MSCI World. It is the foundation of millions of investment portfolios around the globe — including those of pension funds, sovereign wealth funds and individual investors alike.",
      blocks: [
        {
          label: "What it is",
          heading: "MSCI World explained",
          body: "The MSCI World Index tracks approximately 1,600 large and mid-cap companies across 23 developed market countries. It covers roughly 85% of the free-float adjusted market capitalization in each country — meaning it captures the majority of investable wealth in the developed world in a single index. The index is maintained by MSCI (Morgan Stanley Capital International) and reviewed quarterly to add or remove companies that meet the criteria.",
          highlight: "The MSCI World has delivered an average annual return of approximately 10% since its inception in 1969 — through oil crises, Cold War tensions, the Dot-com crash, the 2008 financial crisis, COVID and every other crisis imaginable.",
          example: "Top 5 holdings: Apple ~5%, Microsoft ~4%, NVIDIA ~3%, Amazon ~2%, Alphabet ~2%. The US makes up about 70% of the index, followed by Japan ~6%, UK ~4%, France ~3%, Canada ~3%."
        },
        {
          label: "Popular ETFs",
          heading: "How to buy the MSCI World",
          body: "You cannot buy the MSCI World Index directly — indices are just lists of companies. You buy an ETF that tracks it. The fund provider purchases all 1,600 companies in the correct proportions and packages them into a single tradeable share. The most popular MSCI World ETFs in Europe come from three providers: iShares (by BlackRock), Xtrackers (by DWS) and Amundi. All three track the same index with very similar performance.",
          highlight: "IWDA from iShares is one of the most popular ETFs in Europe with over 70 billion euros in assets and a TER of just 0.20%. It is accumulating, Ireland-domiciled and physically replicated — the perfect combination.",
          example: "Top MSCI World ETFs for European investors: IWDA (iShares, Acc, TER 0.20%), XDWD (Xtrackers, Acc, TER 0.19%), LCUW (Amundi, Acc, TER 0.12%). All track the same index. Pick the cheapest or the most familiar."
        },
        {
          label: "Deep dive",
          heading: "MSCI World vs S&P 500 — which is better?",
          body: "The S&P 500 tracks the 500 largest US companies. The MSCI World tracks 1,600 companies across 23 countries. The US makes up ~70% of the MSCI World anyway, so performance has been very similar historically. The key difference: the MSCI World gives you geographic diversification — if the US market underperforms for a decade (as it did in 2000-2009), your non-US holdings provide balance. For maximum simplicity, either index is excellent. For maximum diversification, MSCI World.",
          highlight: "There is no wrong choice between MSCI World and S&P 500 for a long-term investor. Both are excellent. The most important decision is not which to choose — it is to start and stay invested consistently.",
          example: "2000-2009: The S&P 500 returned -1% per year. International stocks returned +2% per year. MSCI World investors with global exposure fared better. 2010-2023: US stocks massively outperformed. Neither decade predicts the next. Diversification protects against both scenarios."
        }
      ],
      quiz: {
        question: "Approximately how many companies does the MSCI World Index contain?",
        options: [
          { text: "100 companies", correct: false },
          { text: "500 companies", correct: false },
          { text: "1,600 companies across 23 developed countries", correct: true },
          { text: "10,000 companies worldwide", correct: false }
        ],
        correctFeedback: "Correct! The MSCI World contains approximately 1,600 companies across 23 developed countries — covering about 85% of investable market cap in the developed world.",
        wrongFeedback: "The MSCI World contains approximately 1,600 companies across 23 developed countries. It is the broadest, most diversified single-index option for European investors."
      }
    }
  },
  {
    id: 9, chapter: 1,
    title: "Diversification — The Only Free Lunch", icon: "🥚", desc: "Understand why spreading your investments protects your wealth.",
    tags: ["Risk", "8 min"], xp: 60, gold: 12,
    lesson: {
      heading: "The only free lunch in investing",
      intro: "Nobel Prize winner Harry Markowitz famously called diversification the only free lunch in investing. It is the one strategy that reduces your risk without reducing your expected returns. Understanding it deeply is fundamental to every investing decision you will ever make.",
      blocks: [
        {
          label: "The concept",
          heading: "Never put all your eggs in one basket",
          body: "If you invest all your money in a single company and that company fails — through fraud, bankruptcy, disruption or bad management — you lose everything. If you spread your money across 1,600 companies, one failure barely moves the needle. The worst case for any single company in your diversified portfolio is a 0.06% impact. Your wealth cannot be destroyed by one bad outcome.",
          highlight: "A single stock can go to zero. A diversified index of 1,600 companies across 23 countries cannot go to zero — it would require the complete collapse of the entire global economy.",
          example: "2001: Enron was one of America's largest companies, considered extremely safe. It was fraudulent and collapsed to zero in weeks. Employees with 100% Enron stock in their pensions lost everything. Those with diversified index funds lost less than 0.1% of their portfolio from the same event."
        },
        {
          label: "Types of diversification",
          heading: "Company, sector, country — all three matter",
          body: "True diversification means spreading risk across three dimensions simultaneously. Company diversification: owning many companies so no single failure is devastating. Sector diversification: owning technology, healthcare, finance, consumer goods and industrials so no single industry collapse is fatal. Geographic diversification: owning companies across multiple countries so no single economy's recession devastates your portfolio.",
          highlight: "A single global ETF like the MSCI World automatically achieves all three types of diversification simultaneously — more diversification than most professional portfolios from 20 years ago, in a single purchase.",
          example: "MSCI World sector breakdown: Technology 25%, Financials 15%, Healthcare 13%, Consumer Discretionary 11%, Industrials 10%, Communication 9%, Consumer Staples 7%, Energy 5%, Other 5%. No single sector can destroy your wealth."
        },
        {
          label: "Deep dive",
          heading: "The correlation secret — why diversification really works",
          body: "Diversification works because different assets do not all move together at the same time. When technology stocks fall, healthcare stocks may hold steady. When European markets struggle, Asian markets may outperform. When stocks fall in a crisis, bonds often rise. This lack of perfect correlation — called negative or low correlation — means your portfolio as a whole is smoother and less volatile than any individual holding.",
          highlight: "The mathematical magic of diversification: combining two assets that each have 20% volatility, if they are uncorrelated, produces a portfolio with only 14% volatility — not 20%. Risk literally disappears through diversification without sacrificing return.",
          example: "Practical proof: During the 2008 financial crisis, the average individual stock fell 57%. A diversified MSCI World ETF fell 57% too — but recovered fully by 2013. Investors with single-stock concentration often faced permanent losses as their specific companies never recovered."
        }
      ],
      quiz: {
        question: "Why is a global ETF with 1,600 companies considered well diversified?",
        options: [
          { text: "Because it is managed by professionals", correct: false },
          { text: "Because it spreads risk across many companies, sectors and countries simultaneously", correct: true },
          { text: "Because it only invests in profitable companies", correct: false },
          { text: "Because government regulations protect it", correct: false }
        ],
        correctFeedback: "Exactly! Triple diversification — across companies, sectors AND countries — means no single failure can significantly harm your portfolio.",
        wrongFeedback: "A global ETF achieves diversification across companies, sectors and countries simultaneously. No single failure — company, sector or country — can significantly damage your overall wealth."
      }
    }
  },
  {
    id: 10, chapter: 1,
    title: "Risk and Return", icon: "⚖️", desc: "Understand the relationship between risk and potential reward.",
    tags: ["Risk", "8 min"], xp: 65, gold: 13,
    lesson: {
      heading: "No reward without risk",
      intro: "Every investment decision involves a fundamental trade-off between risk and potential return. Understanding this relationship is not optional — it is the foundation of every intelligent financial decision. Most people either take too much risk without understanding it, or too little risk and pay a huge price in lost wealth.",
      blocks: [
        {
          label: "The relationship",
          heading: "Higher risk demands higher potential return",
          body: "The relationship between risk and return is one of the most reliable rules in finance. Safe investments — like German government bonds or savings accounts — pay low returns because investors know they will get their money back. Risky investments — like stocks — must offer higher potential returns to attract investors who might lose money. If stocks only returned 2% like savings accounts, nobody would accept the risk of investing in them.",
          highlight: "Risk is not something to eliminate — it is something to understand, manage and be compensated for. The goal is not zero risk — it is the right amount of risk for your timeline, rewarded with appropriate returns.",
          example: "The risk-return spectrum: Cash savings account 0-1% return, minimal risk. Government bonds 2-4%, very low risk. Corporate bonds 3-6%, low-medium risk. Diversified global ETF 7-10% long-term average, medium short-term risk. Individual stocks: higher variance. Cryptocurrency: extreme variance."
        },
        {
          label: "Time reduces risk",
          heading: "Why long-term investing is fundamentally safer",
          body: "Here is the most important and counterintuitive insight about risk: the longer your investment horizon, the lower your actual risk of losing money in a diversified ETF. Over 1 year, stock markets have fallen about 30% of the time. Over 5 years, they have fallen about 12% of the time. Over 15 years, a diversified global ETF has historically never delivered a negative total return. Time literally eliminates the risk of loss in a diversified portfolio.",
          highlight: "Historical data shows that over any 15-year period since 1970, a diversified global ETF has never delivered a negative return. The longer your horizon, the closer your actual risk approaches zero.",
          example: "Risk by holding period (MSCI World historical data): 1 year = 30% chance of loss. 5 years = 12% chance of loss. 10 years = 4% chance of loss. 15 years = approximately 0% chance of loss. 20 years = 0% recorded losses in history. Time is the ultimate risk reducer."
        },
        {
          label: "Deep dive",
          heading: "Volatility vs permanent loss — the crucial distinction",
          body: "The biggest misunderstanding most investors have about risk is confusing temporary volatility with permanent loss. When the MSCI World falls 30% in a crisis, that is volatility — a temporary fluctuation in price. It becomes permanent loss only if you sell at the low. Investors who held through every major market crash in history have never permanently lost money in a diversified global index. The only way to permanently lose money in a diversified ETF is to sell during a crash.",
          highlight: "Volatility is normal, temporary and ultimately irrelevant for long-term investors who do not sell. Permanent loss requires a selling decision. Your greatest risk as a long-term investor is not market volatility — it is your own reaction to volatility.",
          example: "2008 crisis: Investor A holds through the 57% decline. By 2013, fully recovered. By 2023, up 300% from the pre-crisis peak. Investor B panic sells at the bottom in March 2009 and waits for stability before reinvesting in 2012. Misses the entire 100%+ recovery and permanently locks in massive losses."
        }
      ],
      quiz: {
        question: "Why do stocks offer higher potential returns than savings accounts?",
        options: [
          { text: "Banks are corrupt and pay artificially low rates", correct: false },
          { text: "Higher potential return compensates investors for accepting higher short-term risk", correct: true },
          { text: "Stocks are regulated to pay higher returns by law", correct: false },
          { text: "Savings accounts are deliberately limited by government", correct: false }
        ],
        correctFeedback: "Correct! Higher returns exist to compensate investors for accepting higher risk. This risk-return trade-off is one of the most fundamental and reliable principles in finance.",
        wrongFeedback: "Risk and return are inseparable. Stocks offer higher potential returns because investors must be compensated for accepting the risk of short-term losses. Without that compensation, no rational investor would hold stocks."
      }
    }
  },
  {
    id: 11, chapter: 1,
    title: "The 3-Fund Portfolio", icon: "🗂️", desc: "The simplest diversified portfolio used by millions of smart investors.",
    tags: ["Portfolio", "8 min"], xp: 80, gold: 20,
    lesson: {
      heading: "The legendary 3-fund portfolio",
      intro: "Most investors overcomplicate investing. They buy dozens of funds, chase performance, constantly tinker and end up with worse results than someone who simply held three simple ETFs. The 3-fund portfolio is the antidote to complexity — beautifully simple, globally diversified and proven to outperform the vast majority of professional portfolios over time.",
      blocks: [
        {
          label: "The strategy",
          heading: "Three funds. The entire world. Done.",
          body: "The 3-fund portfolio uses just three ETFs to cover virtually the entire investable universe. Fund 1: A developed markets ETF like MSCI World — 1,600 companies across 23 developed economies. Fund 2: An emerging markets ETF like MSCI Emerging Markets — 1,400 companies across 24 developing economies. Fund 3 (optional): A global bond ETF for stability as you age. Together, these three funds give you exposure to over 3,000 companies across 47 countries.",
          highlight: "Classic allocation for a growth investor: 80% MSCI World plus 20% Emerging Markets. This single combination gives you more diversification than most professional portfolios — managed in 15 minutes per year.",
          example: "Total coverage: MSCI World = 1,600 companies in 23 developed countries (US, Europe, Japan, Australia etc). MSCI EM = 1,400 companies in 24 developing economies (China, India, Brazil, Taiwan etc). Combined: essentially the entire global stock market."
        },
        {
          label: "Rebalancing",
          heading: "Once a year: rebalance in 15 minutes",
          body: "Over time, different funds grow at different rates and your allocation drifts from your target. Once a year — ideally on a fixed date like your birthday — check your allocation. If stocks have surged and you have drifted from 80/20 to 88/12, sell some stocks and buy emerging markets to restore your target. This simple annual discipline automatically enforces buying what is cheap and selling what is expensive — the fundamental principle of successful investing.",
          highlight: "Annual rebalancing takes 15 minutes, costs almost nothing if done through your savings plan, and is one of the most effective portfolio management techniques available to individual investors.",
          example: "Example: Target 80% MSCI World / 20% Emerging Markets. After a strong US bull market: 88% MSCI World / 12% EM. Sell 8% of MSCI World, buy 8% Emerging Markets. Target restored. You have automatically bought low (EM was underperforming) and sold high (MSCI World was overperforming)."
        },
        {
          label: "Deep dive",
          heading: "Why simpler usually wins in investing",
          body: "The research on portfolio complexity is clear: adding more funds beyond a well-diversified core almost never improves returns, but reliably increases costs, complexity and behavioral risk. The more funds you own, the more decisions you face, the more opportunities to make emotional mistakes. The legendary Bogleheads community — followers of Vanguard founder Jack Bogle — have documented decades of evidence that simple three-fund portfolios outperform complex multi-fund strategies after costs and behavioral errors.",
          highlight: "Jack Bogle, founder of Vanguard and inventor of the index fund, held a two-fund portfolio his entire life: US stocks and US bonds. Complexity is the enemy of excellent long-term results.",
          example: "The complexity trap: An investor with 20 different ETFs faces 20 different rebalancing decisions, 20 sets of performance to monitor and 20 potential sources of emotional decision-making. An investor with 3 ETFs faces 3 decisions. Fewer decisions = fewer mistakes = better long-term outcomes."
        }
      ],
      quiz: {
        question: "What is the purpose of annual rebalancing in a 3-fund portfolio?",
        options: [
          { text: "To switch to better-performing funds every year", correct: false },
          { text: "To restore your target allocation and automatically buy underperformers and sell outperformers", correct: true },
          { text: "To reduce your tax bill by selling everything annually", correct: false },
          { text: "Rebalancing is only necessary for professional investors", correct: false }
        ],
        correctFeedback: "Perfect! Rebalancing restores your target risk level and mechanically enforces the golden rule of investing: buy low, sell high — automatically, without emotion.",
        wrongFeedback: "Rebalancing restores your intended risk level and systematically buys what is relatively cheap (underperformers) and sells what is relatively expensive (outperformers). It is disciplined investing on autopilot."
      }
    }
  },
  {
    id: 12, chapter: 1,
    title: "Inflation — The Silent Wealth Destroyer", icon: "🔥", desc: "Why keeping money in cash is not actually safe.",
    tags: ["Economics", "8 min"], xp: 60, gold: 12,
    lesson: {
      heading: "Your savings are losing value right now",
      intro: "Most people think keeping money in a savings account is the safe, responsible choice. In reality, inflation silently and relentlessly destroys the purchasing power of that money every single year. Understanding inflation is not optional — it is the core reason why investing is not optional.",
      blocks: [
        {
          label: "What is inflation?",
          heading: "Prices rise — your money buys less",
          body: "Inflation is the rate at which the general price level of goods and services rises over time. If inflation is 3% annually and your savings account pays 1%, you are losing 2% of purchasing power every year — even though your account balance is growing. The number in your account goes up, but what that number can actually buy goes down. This is the inflation trap that quietly impoverishes savers.",
          highlight: "At 3% annual inflation, €10,000 today will only have €7,441 in purchasing power in 10 years — even if you never spend a cent. Your money has lost 26% of its real value while sitting safely in a bank account.",
          example: "Real-world inflation impact: In Germany, the cost of a cinema ticket went from ~€5 in 1990 to ~€15 today — a 200% increase. A monthly rent that was €400 in 2000 might be €900 today. Your savings that felt large in 2000 feel much smaller now. This is inflation compounding against you."
        },
        {
          label: "The solution",
          heading: "Invest to beat inflation and build real wealth",
          body: "The solution to inflation is straightforward: invest in assets that grow faster than inflation. The global stock market has historically returned 8-10% per year on average — well above any inflation rate in modern history. Real assets — stocks, real estate, gold — historically preserve and grow purchasing power because they represent ownership in productive enterprises that raise their prices with inflation.",
          highlight: "The real goal of investing is not to accumulate numbers in an account — it is to preserve and grow purchasing power over time. ETFs have consistently beaten inflation by 5-7% per year over every long-term historical period.",
          example: "The stark comparison: €10,000 held in cash for 30 years at 3% inflation = €4,100 in purchasing power. €10,000 invested in a global ETF for 30 years at 8% return = approximately €100,627. Not investing is not the safe choice — it is guaranteed slow impoverishment."
        },
        {
          label: "Deep dive",
          heading: "The real return — what actually matters",
          body: "Investors often fixate on nominal returns — the raw percentage their investment grows. But what truly matters is the real return: nominal return minus inflation. If your investment grows 3% per year but inflation is 3%, your real return is 0% — you are running to stand still. If your investment grows 8% and inflation is 3%, your real return is 5% — genuine wealth creation. Always evaluate investments on their real return, not their nominal return.",
          highlight: "The real return formula: Real return = Nominal return − Inflation rate. A savings account paying 2% with 3% inflation has a real return of −1%. A global ETF returning 8% with 3% inflation has a real return of +5%. Only real returns build genuine long-term wealth.",
          example: "European inflation 2022: inflation hit 8-10% in Europe. Savings accounts paid 0-1%. Real returns on savings: approximately −7% to −9%. Every €10,000 in a savings account lost approximately €700-900 of real purchasing power in a single year — silently, invisibly, inevitably."
        }
      ],
      quiz: {
        question: "If inflation is 3% and your savings account pays 1%, what is actually happening to your wealth?",
        options: [
          { text: "Your wealth is growing by 1% per year", correct: false },
          { text: "Your purchasing power is declining by about 2% per year in real terms", correct: true },
          { text: "Your wealth is completely safe because your account balance keeps growing", correct: false },
          { text: "You are exactly breaking even", correct: false }
        ],
        correctFeedback: "Exactly right! Real return = nominal return minus inflation = 1% − 3% = −2%. Your bank balance grows but buys progressively less. This is the inflation trap.",
        wrongFeedback: "Real return = nominal return minus inflation. 1% − 3% = −2% per year in real terms. Your account balance grows but your purchasing power falls. Not investing means guaranteed slow loss of wealth."
      }
    }
  },
  {
    id: 13, chapter: 1,
    title: "Build Your Emergency Fund First", icon: "🛡️", desc: "Why you need cash reserves before you invest a single euro.",
    tags: ["Planning", "8 min"], xp: 60, gold: 12,
    lesson: {
      heading: "Build your fortress before the battle",
      intro: "The single biggest mistake new investors make is putting money into the market that they might need in the short term. Without a financial safety net, any emergency — job loss, medical bill, car repair, relationship change — forces you to sell investments at the worst possible moment. The emergency fund is not boring — it is the foundation that makes everything else possible.",
      blocks: [
        {
          label: "What is an emergency fund?",
          heading: "Your financial shock absorber",
          body: "An emergency fund is 3 to 6 months of your total living expenses held in a liquid, instantly accessible savings account — not invested in ETFs, not locked in fixed-term deposits. Just cash, available immediately for genuine financial emergencies: unexpected job loss, medical expenses, urgent home or car repairs, family crises. This money has one job: to prevent financial emergencies from becoming financial disasters.",
          highlight: "Never invest money you might need within the next 3 years. Only money you can truly leave untouched long-term belongs in an ETF. The emergency fund is what makes this rule possible to follow.",
          example: "Calculating your emergency fund: Monthly expenses (rent €900 + food €300 + transport €200 + subscriptions €100 + other €200) = €1,700/month. Emergency fund target: 3 months = €5,100. 6 months = €10,200. Keep this in a high-yield savings account (Tagesgeld) paying 2-3%, separate from your investment account."
        },
        {
          label: "Why it protects your investments",
          heading: "Without it, you will panic sell",
          body: "Here is the scenario that destroys most investment plans: the market crashes 30% at exactly the same time you face an unexpected €3,000 expense. Without an emergency fund, you are forced to sell your investments at a 30% loss — converting a temporary paper loss into a permanent real loss. With an emergency fund, you simply use that cash, leave your investments alone and wait for the market to recover. The emergency fund is not separate from your investment strategy — it is the foundation of it.",
          highlight: "The emergency fund is investment insurance. Its entire purpose is to ensure that no life emergency can force you to sell your investments at an inopportune time. It protects your long-term wealth by absorbing short-term shocks.",
          example: "March 2020, COVID crash: MSCI World fell 34% in 33 days. Investors without emergency funds who lost income were forced to sell at the bottom to pay expenses. Investors with emergency funds did nothing. By September 2020 — 6 months later — the market had fully recovered. The emergency fund was the difference between locking in a 34% loss and recovering fully."
        },
        {
          label: "Deep dive",
          heading: "Where to keep your emergency fund",
          body: "Your emergency fund needs three properties: safety (no risk of loss), liquidity (accessible within 1-2 business days) and a reasonable return. In Germany, the best option is a Tagesgeldkonto (daily savings account) with a bank like ING, DKB or Comdirect. These accounts are covered by German deposit insurance up to €100,000, immediately accessible and currently pay 2-3% interest. Never invest your emergency fund in ETFs — a 30% market drop at the wrong moment defeats the entire purpose.",
          highlight: "Keep your emergency fund in a Tagesgeldkonto at a separate bank from your current account. Psychological separation makes it easier to resist spending it on non-emergencies. Aim for 3 months minimum, 6 months if your income is variable.",
          example: "Emergency fund setup checklist: 1) Open a Tagesgeldkonto at ING, DKB or similar. 2) Transfer 3-6 months of expenses there. 3) Set up a small monthly automatic top-up if needed. 4) Only access it for genuine emergencies. 5) Replenish it immediately after use. Then, and only then, start investing your remaining savings in ETFs."
        }
      ],
      quiz: {
        question: "How large should an emergency fund be?",
        options: [
          { text: "€1,000 regardless of your monthly expenses", correct: false },
          { text: "3 to 6 months of your total living expenses in instantly accessible cash", correct: true },
          { text: "All your savings — invest nothing until you retire", correct: false },
          { text: "Emergency funds are unnecessary if you have ETF investments", correct: false }
        ],
        correctFeedback: "Correct! 3 to 6 months of living expenses in liquid cash gives you a buffer for any financial emergency without ever touching your investments.",
        wrongFeedback: "3 to 6 months of living expenses is the standard recommendation. This covers most realistic emergencies and ensures no financial shock can force you to sell your investments."
      }
    }
  },
  {
    id: 14, chapter: 1,
    title: "ETF vs Active Funds", icon: "🏆", desc: "Why passive ETFs consistently beat actively managed funds.",
    tags: ["Comparison", "8 min"], xp: 65, gold: 13,
    lesson: {
      heading: "The most important investment debate — settled",
      intro: "For over 50 years, the financial industry has argued that professional fund managers, armed with research teams, sophisticated models and years of experience, can beat the market. Fifty years of data have delivered a definitive verdict. The data wins. Passive beats active. Here is why.",
      blocks: [
        {
          label: "Active vs passive",
          heading: "What is the fundamental difference?",
          body: "An actively managed fund employs professional portfolio managers who research individual companies, analyze economic trends and constantly buy and sell stocks attempting to beat the market. For this service, they charge 1-2.5% per year. A passive ETF simply buys every company in an index in the correct proportions and holds them. No decisions. No research. No trading. For this simplicity, ETFs charge 0.07-0.25% per year. The fee difference alone makes active funds extremely difficult to justify.",
          highlight: "The mathematical reality: to justify paying 1.5% more in annual fees, an active fund manager must outperform their benchmark by 1.5% every single year — just to break even with the ETF. Over 15 years, compounded, this becomes an enormous performance hurdle.",
          example: "Fee comparison on €100,000 over 30 years: ETF at 0.20% TER = €200/year in fees = total fees approximately €24,000 over 30 years. Active fund at 1.75% TER = €1,750/year = total fees approximately €210,000 over 30 years. The active fund must dramatically outperform just to compensate for this fee disadvantage."
        },
        {
          label: "The evidence",
          heading: "50 years of data — the verdict is unanimous",
          body: "The SPIVA (S&P Indices Versus Active) report has tracked active fund performance versus passive benchmarks for decades. The results are remarkably consistent across every asset class, every country and every time period: approximately 80-95% of active funds underperform their benchmark index after fees over any 15-year period. This is not a recent trend. It has been true in every decade since the 1970s. The longer the time period, the worse active funds look compared to passive ETFs.",
          highlight: "SPIVA 2023: Over 20 years, 95% of US large-cap active funds underperformed the S&P 500. In European equity, 88% underperformed over 15 years. In emerging markets, 85%. The pattern is universal and relentless.",
          example: "Why active funds fail: Even if a manager is genuinely skilled (rare), their fund charges 1.5-2% in fees plus transaction costs from frequent trading. To beat a 0.20% ETF, they need to generate 1.3-1.8% of alpha (excess return) every single year — for decades. The mathematics make this virtually impossible to sustain."
        },
        {
          label: "Deep dive",
          heading: "Why do smart, well-paid professionals consistently fail to beat the market?",
          body: "The efficient market hypothesis explains why: in a market where thousands of skilled analysts are simultaneously researching and trading the same stocks, prices already reflect all publicly available information. Any genuine opportunity to profit from publicly known information gets immediately traded away by the collective intelligence of millions of market participants. The market is not perfectly efficient — but it is efficient enough that consistently beating it after fees is extraordinarily difficult.",
          highlight: "The painful irony: the best way to exploit the collective intelligence of thousands of brilliant analysts, researchers and fund managers is to buy an ETF that simply owns everything they collectively decide is worth owning. You benefit from their work without paying their fees.",
          example: "Warren Buffett's bet: In 2007, Buffett bet $1 million that a simple S&P 500 index fund would outperform a basket of hedge funds over 10 years. By 2017, the index fund had returned 7.1% annually. The hedge funds returned 2.2% annually. Even the world's most sophisticated active investors lost to a passive index over a decade."
        }
      ],
      quiz: {
        question: "What percentage of actively managed funds underperform simple index ETFs over 15 years?",
        options: [
          { text: "About 30%", correct: false },
          { text: "About 50%", correct: false },
          { text: "About 80-90%", correct: true },
          { text: "Active funds usually outperform ETFs", correct: false }
        ],
        correctFeedback: "Correct! Approximately 80-90% of actively managed funds underperform their benchmark index after fees over 15 years. The pattern is universal across asset classes and countries.",
        wrongFeedback: "About 80-90% of active funds underperform simple index ETFs over 15 years after fees. The longer the time period studied, the more definitively passive investing wins."
      }
    }
  },
  {
    id: 15, chapter: 1,
    title: "Tax Basics for ETF Investors", icon: "🧾", desc: "Understand how ETF profits are taxed in Germany and Europe.",
    tags: ["Tax", "8 min"], xp: 75, gold: 16,
    lesson: {
      heading: "Keep more of what you earn",
      intro: "Taxes can significantly reduce your investment returns if you do not plan for them. The good news: German tax law offers several legal advantages for ETF investors. Understanding just two things — the Abgeltungsteuer and the Sparerpauschbetrag — can save you hundreds of euros every year.",
      blocks: [
        {
          label: "German tax basics",
          heading: "Abgeltungsteuer — the flat investment tax",
          body: "In Germany, investment profits — capital gains, dividends and interest income — are subject to Abgeltungsteuer, a flat withholding tax of 25% plus the solidarity surcharge (Soli) of 5.5% on that tax amount. The effective combined rate is approximately 26.375%. Church tax may also apply (8-9% of the tax amount for church members). This tax is automatically withheld by your broker — you do not need to file separately for it in most cases.",
          highlight: "The single most important tax action every German investor must take: set up a Freistellungsauftrag with your broker. This instructs them to apply your annual tax-free allowance automatically. Without it, you pay full tax from the first euro of investment profit.",
          example: "How Abgeltungsteuer works: You sell an ETF for €5,000 profit. Without Freistellungsauftrag: broker withholds €5,000 × 26.375% = €1,319 in tax immediately. With Freistellungsauftrag covering €1,000 of the profit: only €4,000 × 26.375% = €1,055 withheld. You keep €264 extra just from a 2-minute setup."
        },
        {
          label: "The Sparerpauschbetrag",
          heading: "Your annual €1,000 tax-free allowance",
          body: "The Sparerpauschbetrag is the annual allowance that exempts the first €1,000 of investment income from Abgeltungsteuer for single filers (€2,000 for married couples filing jointly). This allowance covers capital gains, dividends and interest income combined. It resets on January 1st every year. To benefit, you must submit a Freistellungsauftrag to each broker you use — allocating your allowance across brokers if you have multiple.",
          highlight: "The Sparerpauschbetrag is completely free money. At 26.375% tax rate, it saves you up to €263.75 per year as a single investor. Over 30 years of investing, that is potentially €7,900 in saved taxes — from a 2-minute form submission.",
          example: "Setting up your Freistellungsauftrag: Log in to your broker (Trade Republic, Scalable Capital etc.). Find the tax settings or Freistellungsauftrag section. Enter €1,000 (or less if you have multiple brokers). Submit. Done. This 2-minute action saves you money every single year indefinitely."
        },
        {
          label: "Deep dive",
          heading: "Tax-efficient investing strategies for ETF investors",
          body: "Beyond the Sparerpauschbetrag, there are three additional tax strategies for German ETF investors. First, use accumulating ETFs — they defer tax on dividends until you sell, allowing more compound growth. Second, hold ETFs long-term — the longer you hold without selling, the more tax-deferred compounding you benefit from. Third, Ireland-domiciled ETFs (ISIN starting IE) benefit from a favorable double-taxation treaty that reduces withholding tax on US dividends from 30% to 15%.",
          highlight: "The optimal German ETF setup: accumulating ETF + Ireland domicile + Freistellungsauftrag set up + hold for decades. This combination legally minimizes your tax burden while maximizing compound growth.",
          example: "Tax deferral value: You earn €1,000 in dividends this year. Distributing ETF: pay €263.75 in tax now. Accumulating ETF: no tax until you sell — potentially in 20 years. That €263.75 continues compounding at 7% for 20 years and becomes approximately €1,020 — the tax deferral itself generates more than the original tax amount."
        }
      ],
      quiz: {
        question: "What is the Sparerpauschbetrag and why must every German investor set it up?",
        options: [
          { text: "A government penalty for selling ETFs within the first year", correct: false },
          { text: "An annual €1,000 tax-free investment allowance that must be activated via Freistellungsauftrag", correct: true },
          { text: "A government savings account with guaranteed returns for retirees", correct: false },
          { text: "A tax on dividends received from foreign companies", correct: false }
        ],
        correctFeedback: "Exactly! The Sparerpauschbetrag gives you €1,000 of tax-free investment profits per year. Set up your Freistellungsauftrag with your broker immediately — it takes 2 minutes and saves money every year.",
        wrongFeedback: "Sparerpauschbetrag = €1,000 annual tax-free investment allowance (€2,000 for couples). You must set up a Freistellungsauftrag with your broker to activate it. Without this, you pay full tax from the first euro of investment profit."
      }
    }
  },
  {
    id: 16, chapter: 1,
    title: "Market Crashes — History and Recovery", icon: "📉", desc: "Learn why market crashes are temporary and recovery is inevitable.",
    tags: ["Psychology", "9 min"], xp: 70, gold: 15,
    lesson: {
      heading: "Every crash in history has recovered",
      intro: "Market crashes feel terrifying. Headlines scream disaster. Friends tell you to sell. Social media is full of panic. But every single crash in market history has one thing in common: full recovery, followed by new all-time highs. Understanding this history transforms fear into patience.",
      blocks: [
        {
          label: "Historical crashes",
          heading: "The crashes that terrified everyone",
          body: "Great Depression 1929: markets fell 89% over 3 years. Black Monday 1987: fell 22% in a single day. Dot-com bust 2000 to 2002: fell 49% over 2.5 years. Financial Crisis 2008 to 2009: fell 57% over 17 months. COVID crash 2020: fell 34% in just 33 days. Every single one of these crashes felt like the end of the financial world. Every single one fully recovered and went on to new all-time highs.",
          highlight: "The COVID crash of 2020 was the fastest 34% decline in history — and the market had fully recovered within 6 months. Investors who held through it went on to some of the best returns in decades.",
          example: "2008 Financial Crisis timeline: Markets fell 57% from October 2007 to March 2009. By April 2013: fully recovered. By 2020: tripled from the 2009 low. An investor who held through the entire crisis and kept investing ended up extraordinarily well."
        },
        {
          label: "The right response",
          heading: "What to do during a crash — and what not to do",
          body: "The worst action: sell everything. Selling converts a temporary paper loss into a permanent real loss and forces you to make a second impossible decision — when to buy back in. The second worst: stop investing. This means missing the best buying opportunity of the decade. The correct action: do nothing with existing holdings, continue your monthly savings plan, and if possible invest additional cash.",
          highlight: "Be greedy when others are fearful, and fearful when others are greedy. Warren Buffett made his greatest investments during crashes — not despite the fear, but because of it.",
          example: "Crash investor comparison: Investor A panic sold in March 2020 when MSCI World was down 34%. Waited for safety. Bought back in December 2020. Missed the 50% recovery. Investor B did nothing. Continued monthly plan. By end of 2020: portfolio fully recovered plus gains."
        },
        {
          label: "Deep dive",
          heading: "Why crashes are inevitable — and why that is good news",
          body: "Market crashes are not accidents. They are a fundamental feature of capitalism. They happen because investors are human — they get greedy, overvalue assets, then panic when reality sets in. Crashes reset valuations, shake out weak hands and create extraordinary buying opportunities for long-term investors. The emotional pain of a crash is the price you pay for long-term equity returns that dramatically exceed safer assets.",
          highlight: "The stock market is the only store in the world where people run away when things go on sale. Crashes are sales on the world's greatest businesses. Patient investors who buy during crashes earn the highest long-term returns.",
          example: "The math of staying invested: Missing the 10 best days in the S&P 500 over 20 years cuts your return roughly in half. Those best days almost always occur during or immediately after the worst crashes — when most investors have already panic sold."
        }
      ],
      quiz: {
        question: "What should a long-term ETF investor do during a major market crash?",
        options: [
          { text: "Sell everything immediately to preserve capital", correct: false },
          { text: "Continue the monthly savings plan and do nothing with existing holdings", correct: true },
          { text: "Switch to a safer ETF until markets recover", correct: false },
          { text: "Stop investing until confidence returns", correct: false }
        ],
        correctFeedback: "Correct! Continuing to invest during crashes is one of the most powerful wealth-building actions you can take. Every crash has recovered.",
        wrongFeedback: "In a crash: hold existing positions, continue investing monthly, and consider investing more. Every crash has recovered. Selling converts temporary losses into permanent ones."
      }
    }
  },
  {
    id: 17, chapter: 1,
    title: "The Savings Rate", icon: "💰", desc: "Why how much you save matters more than how you invest.",
    tags: ["Planning", "9 min"], xp: 60, gold: 12,
    lesson: {
      heading: "Save more. Invest it. Repeat.",
      intro: "Most people focus on finding the perfect investment. But research consistently shows that for wealth building — especially in the early years — your savings rate matters far more than your investment returns. A mediocre investor who saves 30% of income will dramatically outperform a brilliant investor who saves 5%.",
      blocks: [
        {
          label: "What is savings rate?",
          heading: "The percentage that changes everything",
          body: "Your savings rate is the percentage of your after-tax income that you save and invest each month. A 10% savings rate is average. A 20% rate is good. A 30% or higher rate is exceptional and will dramatically accelerate your path to financial freedom. The savings rate directly determines how quickly your wealth compounds.",
          highlight: "Increasing your savings rate from 10% to 20% does not just double your savings — it more than halves the time needed to reach financial independence, because you are investing more AND needing less to live on.",
          example: "On €3,000 monthly take-home income: 10% = €300/month invested. 20% = €600/month invested. 30% = €900/month invested. At 7% return over 30 years: 10% rate = €340k. 20% rate = €680k. 30% rate = €1,020,000."
        },
        {
          label: "How to increase it",
          heading: "Practical ways to save significantly more",
          body: "There are only two ways to increase your savings rate: earn more or spend less. The fastest path is usually attacking your three largest expenses: housing (30-40% of most budgets), transportation and food. A 10% reduction in housing costs can add 5-10% to your savings rate instantly. Tracking every expense for 30 days is the essential first step — most people are genuinely shocked by what they discover.",
          highlight: "Track every single expense for one month before making any changes. Most people find 200 to 500 euros per month in spending they genuinely do not miss — on subscriptions they forgot, impulse purchases and convenience spending.",
          example: "The latte myth vs reality: Cutting coffee saves €100/month = €36,000 over 30 years invested at 7%. But cutting one unused gym membership, two streaming services and reducing takeaway by half = €300/month = €108,000 over 30 years. Small cuts compound enormously."
        },
        {
          label: "Deep dive",
          heading: "The savings rate and time to financial independence",
          body: "The relationship between savings rate and time to financial independence is one of the most important mathematical relationships in personal finance. At a 10% savings rate, you need approximately 51 years of work to reach financial independence. At 20%: 37 years. At 30%: 28 years. At 50%: 17 years. At 70%: just 8.5 years. Each additional percentage point of savings rate shaves years off your working life.",
          highlight: "The savings rate is the single variable most under your direct control. Investment returns depend on markets. Savings rate depends on you. Optimize what you can control.",
          example: "Real-world application: A person earning €3,500/month who increases their savings rate from 15% to 25% by moving to a slightly cheaper apartment and cutting subscriptions — investing an extra €350/month — reaches their financial goals 8 years earlier."
        }
      ],
      quiz: {
        question: "Why is savings rate considered more important than investment returns early in your investing journey?",
        options: [
          { text: "Returns do not matter for small portfolios", correct: false },
          { text: "With a small portfolio, how much you invest has more impact than the return percentage", correct: true },
          { text: "Savings rates are guaranteed while returns are not", correct: false },
          { text: "Savings accounts pay more than ETFs", correct: false }
        ],
        correctFeedback: "Exactly right! When your portfolio is small, the absolute amount you add matters more than the percentage return. A 1% better return on €5,000 is €50. An extra €200/month is €2,400.",
        wrongFeedback: "On a small portfolio, how much you save matters most. 1% extra return on €10,000 = €100. An extra €100/month = €1,200. As the portfolio grows to hundreds of thousands, returns become more impactful."
      }
    }
  },
  {
    id: 18, chapter: 1,
    title: "Sustainable Investing — ESG ETFs", icon: "🌿", desc: "Invest according to your values without sacrificing returns.",
    tags: ["ESG", "9 min"], xp: 65, gold: 13,
    lesson: {
      heading: "Can you invest ethically and profitably?",
      intro: "ESG investing has exploded from a niche concept to a mainstream investment category worth trillions of euros. But behind the marketing, what does ESG actually mean? Do ESG ETFs really avoid harmful companies? And most importantly — do they sacrifice returns to do so?",
      blocks: [
        {
          label: "What is ESG?",
          heading: "Environmental, Social and Governance explained",
          body: "ESG stands for Environmental, Social and Governance. These are three categories of non-financial criteria used to evaluate how a company operates beyond pure profit. Environmental: carbon emissions, water use, waste management, climate risk. Social: labor practices, supply chain ethics, employee wellbeing, community impact. Governance: board independence, executive pay, shareholder rights, transparency. ESG ETFs screen companies on these criteria and exclude or underweight the worst offenders.",
          highlight: "ESG ETFs typically exclude tobacco companies, weapons manufacturers, coal miners, oil sands producers and companies with major corruption or labor violations. They overweight companies with strong climate policies, fair labor practices and transparent governance.",
          example: "iShares MSCI World ESG Enhanced ETF (IESE): Tracks the MSCI World ESG Enhanced Focus Index. Excludes fossil fuel companies, weapons and tobacco. Overweights high-ESG-rated companies. TER: 0.20%. Same cost as the standard MSCI World ETF."
        },
        {
          label: "Performance reality",
          heading: "Do ESG ETFs sacrifice returns?",
          body: "This is the question every ESG investor asks. The honest answer from the data: over the past decade, ESG ETFs have performed similarly to or slightly better than their standard equivalents. This is partly because the excluded sectors — coal, tobacco, weapons — have generally underperformed. But it is also important to be honest: ESG outperformance is not guaranteed, and the future may look different as ESG becomes more mainstream and priced in.",
          highlight: "ESG investing is not charity — it is a bet that companies with better environmental, social and governance practices are better run, face fewer regulatory risks and are more resilient long-term. The data supports this hypothesis over the past decade.",
          example: "10-year comparison ending 2023: MSCI World Index: approximately 10% annual return. MSCI World ESG Leaders Index: approximately 10.5% annual return. MSCI World ESG Enhanced Focus: approximately 10.3% annual return. ESG has not cost investors returns — if anything, the opposite."
        },
        {
          label: "Deep dive",
          heading: "The limits of ESG — what you should know",
          body: "ESG is not perfect. Different rating agencies give the same company wildly different ESG scores. Tesla has been excluded from some ESG indices due to governance concerns despite its clean energy focus. Some oil companies score highly on ESG while still extracting fossil fuels. If ESG investing matters to you, read the actual methodology of the index — not just the label.",
          highlight: "Two ESG ETFs can have very different holdings. Always check the index methodology and top holdings list before buying. MSCI ESG Enhanced and MSCI ESG Leaders have different screens and exclusions.",
          example: "Practical ESG start: If values-based investing appeals to you, replace your standard MSCI World ETF with IESE (iShares MSCI World ESG Enhanced, TER 0.20%). Virtually identical cost, similar diversification, with exclusions that align with most investors values."
        }
      ],
      quiz: {
        question: "What does ESG stand for in ESG ETFs?",
        options: [
          { text: "Extra Secure Growth", correct: false },
          { text: "Environmental, Social and Governance", correct: true },
          { text: "European Stock Growth", correct: false },
          { text: "Equity, Savings and Gold", correct: false }
        ],
        correctFeedback: "Correct! ESG = Environmental, Social and Governance — three criteria for evaluating company behavior beyond pure financial metrics.",
        wrongFeedback: "ESG = Environmental, Social and Governance. These criteria evaluate how a company manages environmental impact, social responsibility and leadership quality."
      }
    }
  },
  {
    id: 19, chapter: 1,
    title: "How to Set Investment Goals", icon: "🎯", desc: "Define clear goals that guide every investment decision you make.",
    tags: ["Planning", "9 min"], xp: 60, gold: 12,
    lesson: {
      heading: "Invest with purpose",
      intro: "The biggest mistake investors make is not having clear goals. Without a destination, every market movement becomes a potential crisis. When the market falls 20%, investors without clear goals panic — because they have no framework to evaluate whether selling or holding is right for them. Clear goals solve this.",
      blocks: [
        {
          label: "Types of goals",
          heading: "Short, medium and long-term goals",
          body: "Financial goals fall into three time horizons, each requiring a different investment approach. Short-term goals from 0 to 3 years — house deposit, car, holiday, emergency buffer: keep this money in cash or a high-yield savings account. Market risk is inappropriate. Medium-term goals from 3 to 10 years — starting a business, early retirement buffer: lower-risk mixed portfolio. Long-term goals from 10 years plus — retirement, financial independence, building generational wealth: this is where ETFs shine and volatility becomes your friend.",
          highlight: "Never invest money in ETFs that you might need within 5 years. Market downturns can last several years, and being forced to sell at a loss because you need the money is the most preventable investing mistake.",
          example: "Correct goal-to-investment matching: House deposit needed in 2 years = high-yield savings account at 3-4%. Children's university fund in 15 years = MSCI World ETF. Retirement in 35 years = 80% global ETFs, 20% bonds, gradually shift as retirement approaches."
        },
        {
          label: "SMART goals",
          heading: "Make your goals specific enough to act on",
          body: "Vague goals produce vague actions. 'Save for retirement' tells you nothing about what to do. A SMART goal — Specific, Measurable, Achievable, Relevant, Time-bound — tells you exactly what to do, how much to invest, and when you have succeeded. Research consistently shows that investors with written financial goals are significantly more likely to achieve them than those who keep goals vague or unwritten.",
          highlight: "Write down your top three financial goals with specific numbers and specific dates. Then work backwards to calculate exactly how much you need to invest monthly to reach each one. This calculation turns vague hope into a concrete plan.",
          example: "Vague goal: Retire comfortably someday. SMART goal: Accumulate €800,000 in my ETF portfolio by age 60. I am 28. At 7% return, I need to invest €650/month for 32 years. I currently invest €300/month. Plan: Increase by €50 every 6 months as salary grows."
        },
        {
          label: "Deep dive",
          heading: "The goal that changes everything — your number",
          body: "The most powerful financial goal you can set is your FIRE number — the portfolio value at which you are financially independent. Calculate it: take your annual desired spending and multiply by 25 (the inverse of the 4% safe withdrawal rate). This is your target. Everything else — savings rate, investment choices, side income — is in service of reaching this number.",
          highlight: "Your financial independence number = annual spending times 25. Once you know this number, every financial decision becomes clear: does this get me closer to or further from my number?",
          example: "Example calculation: Desired annual spending in retirement = €36,000. Financial independence number = €36,000 times 25 = €900,000. Current savings rate of €500/month at 7% for 35 years = €951,000. You are on track. If you want to retire 5 years earlier: increase monthly investment to €780/month."
        }
      ],
      quiz: {
        question: "For which time horizon are ETFs most appropriate?",
        options: [
          { text: "Money you need within 1 year", correct: false },
          { text: "Money you will not need for at least 5 to 10 years", correct: true },
          { text: "Your emergency fund", correct: false },
          { text: "Any money regardless of when you need it", correct: false }
        ],
        correctFeedback: "Exactly right! ETFs are for long-term money. The longer your horizon, the more confidently you can ride out market volatility and benefit from compound growth.",
        wrongFeedback: "ETFs are appropriate for money you will not need for at least 5 to 10 years. Shorter time horizons require more stable, accessible options like high-yield savings accounts."
      }
    }
  },
  {
    id: 20, chapter: 1,
    title: "Tracking Your Portfolio", icon: "📱", desc: "How to monitor your investments without becoming obsessed.",
    tags: ["Practical", "9 min"], xp: 55, gold: 11,
    lesson: {
      heading: "Monitor — do not obsess",
      intro: "Knowing how to track your portfolio correctly can mean the difference between disciplined long-term investing and emotional short-term trading. Most investors check their portfolios far too often — and this costs them money.",
      blocks: [
        {
          label: "How often to check",
          heading: "The right monitoring frequency",
          body: "The optimal portfolio checking frequency is quarterly — four times per year. Each quarterly review covers four questions: Is my savings plan still running? What is my current allocation vs my target? Has life changed in a way that should change my strategy? Do I need to rebalance? This takes 15 minutes. That is all the portfolio attention required for an excellent long-term outcome.",
          highlight: "Research shows that investors who check their portfolios daily make significantly worse decisions than those who check quarterly. The more frequently you look, the more noise you see — and the more tempted you are to act on it.",
          example: "Fidelity ran an internal analysis to find which customer accounts had the best returns over a 10-year period. The answer was striking: the best-performing accounts belonged to customers who had either forgotten they had an account or were deceased. Inactivity was the winning strategy."
        },
        {
          label: "Tools to use",
          heading: "Simple, effective tracking tools",
          body: "Your broker app shows your current portfolio value and individual position performance. For tracking multiple accounts or building a comprehensive picture, Portfolio Performance is a free and excellent desktop application used by serious German investors. Parqet is a German browser-based alternative with a clean interface and free tier. For the simplest possible tracking, a spreadsheet updated quarterly is more than sufficient.",
          highlight: "The best portfolio tracker is the one you actually use consistently. A quarterly-updated spreadsheet beats a sophisticated app you never open.",
          example: "Minimal quarterly spreadsheet: Date, Total Portfolio Value, MSCI World Value and Allocation %, Emerging Markets Value and Allocation %, Cash Value, Total Return Since Start, Notes. Five columns. 15 minutes per quarter. Complete picture."
        },
        {
          label: "Deep dive",
          heading: "What to actually do at each quarterly review",
          body: "Step 1: Record current values in your tracker. Step 2: Calculate allocation percentages. Step 3: Compare to target allocation — if any asset class is more than 5% away from target, plan to rebalance using next month's savings contribution. Step 4: Confirm savings plan amount is still correct for your goals. Step 5: Note anything in your life that has changed — income, expenses, goals, time horizon. Step 6: Close the app and do nothing until next quarter.",
          highlight: "The quarterly review should almost never result in selling. Rebalancing is done by directing new contributions toward underweighted assets — not by selling overweighted ones, which would trigger unnecessary taxes.",
          example: "Target allocation: 80% MSCI World, 20% Emerging Markets. After review: 84% MSCI World, 16% EM — drifted 4%. Action: Direct next two months of savings entirely into Emerging Markets ETF. No selling, no tax event, allocation restored."
        }
      ],
      quiz: {
        question: "How often should a long-term ETF investor check their portfolio?",
        options: [
          { text: "Every day to stay informed about market movements", correct: false },
          { text: "Quarterly — four times per year", correct: true },
          { text: "Only when markets crash significantly", correct: false },
          { text: "Never — set it and completely forget it", correct: false }
        ],
        correctFeedback: "Correct! Quarterly monitoring provides enough visibility to make necessary adjustments without creating the temptation for emotional decisions driven by short-term noise.",
        wrongFeedback: "Quarterly is the sweet spot — enough to stay informed and make genuine adjustments, not so often that short-term noise triggers emotional decisions."
      }
    }
  },
  {
    id: 21, chapter: 1,
    title: "The Biggest Investing Mistakes", icon: "⚠️", desc: "The most common errors beginners make — and how to avoid them.",
    tags: ["Wisdom", "9 min"], xp: 70, gold: 15,
    lesson: {
      heading: "Learn from others expensive mistakes",
      intro: "The fastest and cheapest way to become a better investor is to deeply understand the mistakes that cost others the most — and consciously design your investing system to prevent them. These are not rare errors. They are nearly universal among beginners.",
      blocks: [
        {
          label: "Mistakes 1 to 3",
          heading: "The three most costly mistakes",
          body: "Mistake 1 — Waiting for the perfect moment: There is no perfect moment. Every year of waiting costs compound growth that can never be recovered. Mistake 2 — Panic selling during crashes: Every crash has recovered. Selling converts temporary paper losses into permanent real losses and forces an impossible second decision of when to buy back. Mistake 3 — High fees: A 1.5% TER versus 0.2% costs approximately €276,000 on a €100,000 portfolio over 30 years. This is wealth silently extracted from you while you sleep.",
          highlight: "These three mistakes alone — waiting, panic selling and high fees — account for the vast majority of wealth destroyed by individual investors. Avoiding all three requires no skill, just awareness.",
          example: "Cost of waiting: Starting a €500/month investment 10 years late costs approximately €350,000 in final wealth at age 65 — not because of less money invested, but because of lost compound time. This is the single most expensive financial mistake most young people make."
        },
        {
          label: "Mistakes 4 to 6",
          heading: "The subtle but expensive errors",
          body: "Mistake 4 — Investing money you might need soon: Without an emergency fund, any unexpected expense forces selling at potentially the worst time. Mistake 5 — Over-checking the portfolio: Daily checking leads to emotional decisions. Studies show more checking equals worse returns. Mistake 6 — Chasing past performance: Last year's best performing fund is not next year's best performer. Research consistently shows that choosing funds based on recent performance produces below-average returns.",
          highlight: "The best performing accounts at Fidelity were those of investors who had either forgotten about them or passed away. Inactivity is a superpower in investing — but only after you have set up the right system.",
          example: "Performance chasing data: Investors who moved money into the top-performing fund each year consistently underperformed investors who simply held a boring index ETF unchanged for the entire period — by an average of 3% per year."
        },
        {
          label: "Deep dive",
          heading: "How to design a mistake-proof investing system",
          body: "The solution to all six mistakes is not willpower — it is system design. Automate your savings plan so investment happens without a decision. Choose low-cost index ETFs and never change them based on performance. Build your emergency fund before investing. Set a calendar reminder to check quarterly and close the app on all other days. Write an investment policy statement with your rules before the next crisis.",
          highlight: "Successful investing requires almost no intelligence — but extraordinary consistency. Design a system that runs automatically, review it quarterly, and your primary job is simply to not interfere with your own success.",
          example: "The mistake-proof system: 1) Emergency fund complete. 2) €X/month automatic savings plan in IWDA and EMIM ETFs. 3) Calendar reminder every 3 months to check. 4) Written rule: do not sell during crashes. 5) TER under 0.25%. This system, left running for 30 years, will produce extraordinary wealth."
        }
      ],
      quiz: {
        question: "An investor sees their portfolio drop 25% in a crash. What is the correct response?",
        options: [
          { text: "Sell immediately to prevent further losses", correct: false },
          { text: "Do nothing with existing holdings, continue the monthly savings plan and if possible invest extra", correct: true },
          { text: "Switch to a bond ETF until markets recover", correct: false },
          { text: "Check the portfolio every day and wait for a recovery signal", correct: false }
        ],
        correctFeedback: "Exactly right! Every major crash has fully recovered. Hold existing positions, continue your regular investment plan, and if possible take advantage of the lower prices.",
        wrongFeedback: "Do nothing with existing holdings, continue investing monthly, and consider investing extra during the sale. Every crash has recovered. Selling converts temporary losses into permanent ones."
      }
    }
  },
  {
    id: 22, chapter: 1,
    title: "Bonds — The Calming Force", icon: "📜", desc: "Understand bonds and when to add them to your portfolio.",
    tags: ["Assets", "9 min"], xp: 65, gold: 13,
    lesson: {
      heading: "The stabilizer in your portfolio",
      intro: "Bonds are often dismissed by young investors as boring and unnecessary. But they serve a critical function that stocks cannot: they move differently. When stocks crash, bonds often rise — providing stability exactly when you need it most. Understanding bonds helps you make better allocation decisions as your portfolio grows.",
      blocks: [
        {
          label: "What are bonds?",
          heading: "Lending money to governments and companies",
          body: "When you buy a bond, you are lending money to an issuer — a government or company — for a defined period. In return, the issuer pays you regular interest payments (called the coupon) and returns your original investment at maturity. Government bonds from stable countries like Germany are among the safest investments in the world. Corporate bonds pay higher interest but carry more risk — the company could fail.",
          highlight: "Bonds move differently from stocks — often rising when stocks fall dramatically. In the 2008 financial crisis, government bonds gained value while stocks lost 57%. This negative correlation is what makes bonds powerful portfolio stabilizers.",
          example: "German Government Bond (Bund) example: You invest €10,000 in a 10-year German Bund yielding 2.5%. Each year you receive €250 in interest. After 10 years, you receive your €10,000 back. Total interest received: €2,500. Completely guaranteed by the German government."
        },
        {
          label: "When to use bonds",
          heading: "Age-based and goal-based allocation",
          body: "The most common guideline for bonds: hold your age as a percentage in bonds. At 25: 25% bonds. At 50: 50% bonds. At 70: 70% bonds. This gradually shifts the portfolio from growth-oriented to stability-oriented as you approach the point when you need to withdraw. For goal-based investing: money needed within 5 years should be partly in bonds, not purely stocks.",
          highlight: "Young investors with 30+ year horizons can afford minimal bond allocation — time absorbs volatility. Investors approaching retirement need bonds as insurance against a major crash right when they begin withdrawals.",
          example: "Simple portfolio evolution: Age 25 to 40: 90% stocks (MSCI World + EM), 10% bonds — maximum growth. Age 40 to 55: 75% stocks, 25% bonds — gradual shift. Age 55 to 65: 60% stocks, 40% bonds — protecting accumulated wealth. Age 65+: 40% stocks, 60% bonds — income focus."
        },
        {
          label: "Deep dive",
          heading: "Bond ETFs — the practical way to hold bonds",
          body: "Individual bonds require large minimum investments and are complex to manage. Bond ETFs solve this. A global bond ETF holds hundreds of different bonds from multiple governments and maturities. When interest rates rise, bond prices fall — but the ETF automatically reinvests into higher-yielding new bonds over time. For most investors, a single Global Government Bond ETF provides sufficient fixed income exposure.",
          highlight: "The 2022 bond crash was unusual — both stocks and bonds fell simultaneously due to rapid interest rate increases. This is rare historically. Over most multi-year periods, bonds and stocks move in opposite directions, providing genuine diversification.",
          example: "Popular bond ETFs for European investors: IBCI (iShares Euro Government Bond, TER 0.09%), IGLO (iShares Global Government Bond EUR Hedged, TER 0.10%). Both provide diversified government bond exposure at very low cost."
        }
      ],
      quiz: {
        question: "Why might an investor close to retirement hold significantly more bonds than a 25-year-old?",
        options: [
          { text: "Bonds always outperform stocks for older investors", correct: false },
          { text: "Bonds provide stability and protect accumulated wealth when you are close to needing the money", correct: true },
          { text: "Government regulations require older investors to hold bonds", correct: false },
          { text: "Bonds pay higher interest rates specifically to older investors", correct: false }
        ],
        correctFeedback: "Correct! As you approach the withdrawal phase, a major market crash could devastate a stock-heavy portfolio right when you need to start spending. Bonds reduce this timing risk.",
        wrongFeedback: "Near retirement, sequence of returns risk becomes critical. A 50% stock crash right as you retire can be devastating if your portfolio is stocks-only. Bonds provide the stability buffer needed during the withdrawal phase."
      }
    }
  },
  {
    id: 23, chapter: 1,
    title: "Reading an ETF Factsheet", icon: "📄", desc: "Know exactly what to look for before buying any ETF.",
    tags: ["Practical", "9 min"], xp: 70, gold: 15,
    lesson: {
      heading: "Decode any ETF in 5 minutes",
      intro: "Every ETF publishes a Key Investor Information Document (KIID) and a detailed factsheet containing everything you need to evaluate it. Knowing how to read these documents means you will never buy an ETF blindly again — and you will be able to compare any two ETFs in minutes.",
      blocks: [
        {
          label: "Key metrics",
          heading: "The 6 numbers that matter",
          body: "When evaluating any ETF, focus on six metrics. TER: annual management cost — lower is better, target below 0.25%. AUM (Assets Under Management): fund size — larger is more stable, minimum €500 million. Replication method: physical means the ETF actually holds the underlying stocks, synthetic uses derivatives — physical is safer and more transparent. Index tracked: what does the ETF actually follow? Domicile: Ireland-domiciled ETFs are most tax-efficient for EU investors. Distribution policy: Acc (accumulating) or Dist (distributing)?",
          highlight: "The ideal ETF for a long-term European investor: TER under 0.25%, AUM above €1 billion, physical replication, broad diversified index, Irish domicile, accumulating distribution. IWDA ticks every single box.",
          example: "IWDA factsheet summary: Full name: iShares Core MSCI World UCITS ETF USD (Acc). TER: 0.20%. AUM: over €70 billion. Replication: Physical. Index: MSCI World. Domicile: Ireland. Distribution: Accumulating. Holdings: 1,600+ companies. This is one of the best ETFs ever created for individual investors."
        },
        {
          label: "Where to find factsheets",
          heading: "How to access and compare ETFs",
          body: "The best free resource for comparing European ETFs is justETF.com. Search any ETF ticker, compare multiple ETFs side by side, filter by index, domicile, TER and size. Each ETF page shows the full factsheet link, historical performance, top holdings and sector breakdown. Always read the top 10 holdings list — it reveals exactly what you own.",
          highlight: "Always check the top 10 holdings of any ETF before buying. For an MSCI World ETF, you expect to see Apple, Microsoft, Amazon, NVIDIA at the top. If you see unexpected names, read the methodology carefully.",
          example: "JustETF comparison example: Search MSCI World ETFs on justETF.com. Filter: Accumulating, EUR, TER under 0.25%. Results: IWDA (0.20%), XDWD (0.19%), LCUW (0.12%). All three are excellent. Choose any one — the differences are marginal. Consistency of holding matters far more than which one you pick."
        },
        {
          label: "Deep dive",
          heading: "Red flags that should stop you buying",
          body: "Five red flags to watch for: TER above 0.50% — almost always unjustifiable. AUM below €100 million — risk of fund closure (though your money is protected, it is inconvenient). Synthetic replication without understanding the counterparty risk. The word 'Leveraged' or 'Short' in the name — not for long-term investors. Very new fund with less than 3 years of history — wait for a track record.",
          highlight: "Complexity is the enemy of the long-term investor. If you cannot explain exactly what an ETF holds in one sentence, do not buy it. Simplicity wins over decades.",
          example: "Red flag examples to avoid: '2x Leveraged NASDAQ 100 ETF' (dangerous volatility decay), 'Inverse DAX ETF' (speculative, loses money in rising markets), 'Thematic Metaverse ETF' (narrow, expensive, unproven), any ETF with TER above 0.75% (unjustifiably expensive when broad alternatives cost 0.07%)."
        }
      ],
      quiz: {
        question: "Which ETF would be the best choice for a long-term beginner investor?",
        options: [
          { text: "A 2x Leveraged S&P 500 ETF with TER of 0.95%", correct: false },
          { text: "A physically replicated MSCI World ETF with TER of 0.20% and €70 billion AUM, accumulating", correct: true },
          { text: "A synthetic small-cap thematic ETF with €50 million AUM and TER of 0.65%", correct: false },
          { text: "An inverse DAX ETF that profits when German markets fall", correct: false }
        ],
        correctFeedback: "Perfect choice! Low TER, physical replication, massive AUM, broad diversification, accumulating structure and Irish domicile — every box ticked.",
        wrongFeedback: "For long-term investing: physical replication, low TER (under 0.25%), large AUM (over €1 billion), broad diversified index, accumulating, Irish domicile. Avoid leverage, inverse, synthetic complexity."
      }
    }
  },
  {
    id: 24, chapter: 1,
    title: "ETF Savings Plan — Step by Step", icon: "📋", desc: "Set up your first automatic ETF savings plan from start to finish.",
    tags: ["Action Quest", "9 min"], xp: 90, gold: 22,
    lesson: {
      heading: "Your automated wealth machine",
      intro: "An ETF savings plan is the single most powerful financial tool available to ordinary investors. It combines the benefits of dollar-cost averaging, compound interest, automation and low cost into one simple setup. Most people spend more time choosing a Netflix subscription than setting up their savings plan. This quest changes that.",
      blocks: [
        {
          label: "Step 1 and 2",
          heading: "Choose your broker and verify your account",
          body: "Step 1 — Choose your broker: For German investors, Trade Republic and Scalable Capital are both excellent. Trade Republic is the simplest — mobile-only, minimal interface, 0 euro order fees. Scalable Capital offers more features, a web interface and a broader ETF selection. Both are BaFin-regulated. Both have millions of customers. Both are safe. Step 2 — Open and verify: Download the app. Create an account with your email. Verify your identity with your ID or passport using the in-app process. This takes 10 minutes and typically completes within 1 to 2 business days.",
          highlight: "Both Trade Republic and Scalable Capital are BaFin-regulated German brokers. Your ETF holdings are held in a segregated custody account — completely separate from the broker's own assets. Even if the broker went bankrupt, your ETF shares are protected.",
          example: "Trade Republic step by step: 1) Download app from App Store or Google Play. 2) Tap Create account. 3) Enter email and phone number. 4) Verify identity with ID — takes 5 minutes in the app. 5) Account approved within 1 business day. 6) Add your bank account and make your first transfer. Total effort: 15 minutes."
        },
        {
          label: "Step 3 and 4",
          heading: "Choose your ETF and set up the automatic plan",
          body: "Step 3 — Choose your ETF: For most beginners, a single MSCI World ETF is the perfect starting point. IWDA (iShares Core MSCI World) is the most popular choice in Europe. Search for it in your broker app. Step 4 — Set up the savings plan: In Trade Republic, tap on IWDA, then 'Savings plan'. Enter your monthly amount — start with whatever you can afford, even €25. Choose the execution date — the 1st or 15th of the month works well. Confirm. The plan is now active and will execute automatically every month without any action from you.",
          highlight: "Once set up, the savings plan runs automatically every month for the rest of your life if you choose. You never have to make the investment decision again. This removes emotion from the equation entirely — the most important thing you can do for your financial future.",
          example: "IWDA savings plan in Trade Republic: Search 'IWDA' → tap on iShares Core MSCI World UCITS ETF → tap 'Savings plan' → enter €100/month → select execution date: 1st of month → confirm → done. Your first purchase executes on the 1st of next month automatically. Repeat indefinitely."
        },
        {
          label: "Deep dive",
          heading: "Set up your Freistellungsauftrag — do not miss this",
          body: "After opening your broker account, there is one critical tax step most beginners miss: setting up a Freistellungsauftrag. This is a declaration that assigns your annual €1,000 tax-free investment profit allowance to your broker. Without it, your broker automatically withholds 26.375% tax on any profits from the first euro. Setting up the Freistellungsauftrag takes 2 minutes in your broker app and can save you hundreds of euros per year.",
          highlight: "The Freistellungsauftrag must be set up separately with each broker you use. If you have accounts at both Trade Republic and Scalable Capital, split the €1,000 allowance between them. Total across all brokers cannot exceed €1,000 (or €2,000 for couples filing jointly).",
          example: "Setting up Freistellungsauftrag in Trade Republic: Go to Account → Tax → Freistellungsauftrag → Enter €1,000 → Save. This takes 2 minutes. Once done, your first €1,000 of investment profits this year is completely tax-free. For a couple: each partner gets €1,000 = €2,000 total tax-free per year."
        }
      ],
      quiz: {
        question: "Once you have set up an automated ETF savings plan, what is the most important thing to do?",
        options: [
          { text: "Check it daily to make sure it is working correctly", correct: false },
          { text: "Leave it running and review it quarterly at most", correct: true },
          { text: "Cancel and restart every time markets fall more than 10%", correct: false },
          { text: "Switch to a different ETF every year based on performance", correct: false }
        ],
        correctFeedback: "Exactly right! Set it up and leave it running. The extraordinary power of a savings plan comes entirely from consistency and compounding — both of which require inaction, not constant adjustment.",
        wrongFeedback: "The best action after setting up a savings plan is simply to leave it running. Review quarterly at most. Consistency over decades — not optimization — is what builds extraordinary wealth."
      }
    }
  },
  {
    id: 25, chapter: 1,
    title: "Chapter I Complete — Your Foundation", icon: "🏆", desc: "Congratulations! You have mastered the fundamentals of ETF investing.",
    tags: ["Milestone", "8 min"], xp: 150, gold: 50,
    lesson: {
      heading: "You have built your foundation",
      intro: "You have completed Chapter I — ETF Highlands. Take a moment to appreciate what you have achieved. You have built a foundation of financial knowledge that most people never acquire. The concepts you now understand — ETFs, compound interest, TER, diversification, DCA, emergency funds, tax basics, market crashes, savings rate — are exactly what separates investors who build real wealth from those who never start.",
      blocks: [
        {
          label: "What you have mastered",
          heading: "Chapter I — your complete knowledge",
          body: "Over 25 quests, you have learned: what ETFs are and how they work, how the stock market operates, accumulating vs distributing ETFs, Total Expense Ratio and its enormous impact, the power of compound interest and the Rule of 72, how to open a broker account, dollar-cost averaging, the MSCI World index, diversification as risk reduction, risk and return trade-offs, the 3-fund portfolio, inflation and purchasing power, emergency fund construction, ETFs vs active funds, German tax basics and the Sparerpauschbetrag, market crash history and the correct response, savings rate mathematics, ESG investing, SMART goal setting, portfolio tracking, the six biggest investing mistakes, bonds as stabilizers, how to read an ETF factsheet, and how to set up an automatic savings plan.",
          highlight: "You now know more about investing than the vast majority of the population — including many people who have been investing for years. This knowledge, consistently applied, will compound into genuine wealth over time.",
          example: "Your complete foundation: Emergency fund built → Broker account open → Freistellungsauftrag set up → MSCI World ETF savings plan running → Check quarterly → Never panic sell → Let it compound for decades. This is the complete strategy. Nothing else is required."
        },
        {
          label: "Your immediate action plan",
          heading: "What to do now — in order",
          body: "If you have not already done these things, do them now in order: 1) Build your emergency fund of 3 to 6 months of expenses in a high-yield savings account. 2) Open a broker account at Trade Republic or Scalable Capital. 3) Set up your Freistellungsauftrag for €1,000. 4) Set up an automatic monthly savings plan in IWDA or XDWD for whatever you can afford — even €25. 5) Mark a calendar reminder every 3 months to review. 6) Read your Investment Policy Statement (your personal rules) before every major market movement.",
          highlight: "The most important step is the first one. Opening a broker account and starting a savings plan — even with €25 per month — sets the compound engine in motion. A journey of a million euros begins with a single investment.",
          example: "Power of starting now: If you are 25 and start a €200/month savings plan today at 7% return, you will have €524,000 by age 65. If you wait just 5 years and start at 30, you will have €362,000. Those 5 years of delay cost you €162,000 — from only €12,000 less invested. Compound interest is not forgiving of delay."
        },
        {
          label: "What is next",
          heading: "Chapter II — The Compound Sea awaits",
          body: "In Chapter II, you will go significantly deeper. You will explore dividend investing and building passive income, the FIRE movement and your financial independence number, factor investing and smart beta strategies, REITs and real estate through ETFs, the psychology of behavioral finance, emerging markets, advanced asset allocation, the All-Weather Portfolio, the psychology of money, international diversification, multiple income streams, portfolio rebalancing mastery, tax-loss harvesting, sequence of returns risk, and the mathematics of building a million euro portfolio.",
          highlight: "Chapter II unlocks right now. You are ready. The foundational knowledge you have built in Chapter I is exactly the base required for everything in Chapter II to make sense and be actionable.",
          example: "Chapter II preview quest titles: Dividend Investing, FIRE and the 4% Rule, Factor Investing, REITs, Behavioral Finance, Emerging Markets, Asset Allocation Theory, The All-Weather Portfolio, The Psychology of Money, Building Multiple Income Streams, Rebalancing Mastery, Tax-Loss Harvesting, Sequence of Returns Risk, and Building a Million Euro Portfolio."
        }
      ],
      quiz: {
        question: "What is the single most important action you can take now?",
        options: [
          { text: "Wait until you have €10,000 saved before making your first investment", correct: false },
          { text: "Start investing immediately with whatever amount you can — even €25 per month", correct: true },
          { text: "Study investing for another year before making any decisions", correct: false },
          { text: "Consult a financial advisor before investing a single euro", correct: false }
        ],
        correctFeedback: "Exactly right! The best time to start was yesterday. The second best time is now. Even €25 per month invested consistently for decades will compound into significant wealth. Start today.",
        wrongFeedback: "Start now. Even €25 per month makes a real difference over time. Every month of delay costs compound growth that can never be recovered. The perfect portfolio started imperfectly beats the perfect portfolio never started."
      }
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

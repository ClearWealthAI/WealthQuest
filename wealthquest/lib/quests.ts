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
    tags: ["Intro", "8 min"], xp: 60, gold: 15,
    lesson: {
      heading: "Deeper waters, greater rewards",
      intro: "You have completed Chapter I and built a foundation that most people never acquire. Now it is time to go deeper. Chapter II covers the concepts that separate good investors from great ones — the strategies, psychology and advanced knowledge that produce genuinely exceptional long-term wealth.",
      blocks: [
        { label: "What you will master", heading: "Chapter II overview", body: "In the Compound Sea, you will explore dividend investing and passive income, the FIRE movement and financial independence mathematics, factor investing and smart beta strategies, REITs and real estate exposure, behavioral finance and the psychology of decision-making, emerging market investing, advanced asset allocation theory, the All-Weather Portfolio, international diversification, multiple income streams, rebalancing mastery, tax-loss harvesting, sequence of returns risk, cryptocurrency as an asset class, inheritance planning, and the mathematics of building a million-euro portfolio.", highlight: "The concepts in Chapter II are what separate investors who build real wealth from those who simply save. Chapter I gave you the tools. Chapter II teaches you to use them with precision.", example: "Chapter II progression: Quest 102 teaches you to generate passive income from dividends. Quest 103 shows you the exact mathematics of retiring early. Quest 106 reveals why your brain is your greatest investing enemy — and how to defeat it." },
        { label: "Building on Chapter I", heading: "Your foundation in action", body: "Everything in Chapter II builds directly on Chapter I. Dividend investing builds on your knowledge of accumulating vs distributing ETFs. FIRE builds on compound interest and savings rate. Behavioral finance builds on why you hold through crashes. Advanced asset allocation builds on the 3-fund portfolio. You will not encounter anything completely foreign — only deeper, more powerful applications of what you already know.", highlight: "Advanced investing is not about complexity — it is about doing simple things exceptionally well, with deeper understanding of why they work. Chapter II gives you that depth.", example: "Connection example: In Chapter I, you learned that DCA removes market timing pressure. In Chapter II, you will learn the exact mathematical proof of why, when lump-sum investing beats DCA, and how to decide which approach fits your specific situation." },
        { label: "Deep dive", heading: "The wealth gap — knowledge vs behavior", body: "Research by Vanguard's Adviser Alpha studies shows that behavioral coaching — helping investors avoid emotional mistakes — adds approximately 1.5% in annual returns. Over 30 years, 1.5% additional annual return on a 200,000 euro portfolio is the difference between 760,000 and 1,150,000 euros final wealth. Knowledge alone does not produce this difference. Consistently applying knowledge through emotional market cycles does.", highlight: "The difference between an investor who knows the theory and one who applies it during every crash, every bull market and every period of uncertainty is worth hundreds of thousands of euros over a lifetime.", example: "Chapter II goal: By the end of these 25 quests, you will not only understand advanced concepts — you will have internalized them deeply enough to apply them automatically, without emotional interference, for the rest of your investing life." }
      ],
      quiz: { question: "What is the primary focus of Chapter II?", options: [{ text: "Learning to trade stocks for short-term profit", correct: false }, { text: "Deepening knowledge with advanced concepts that optimize your investment strategy and behavior", correct: true }, { text: "Starting completely over with a different approach", correct: false }, { text: "Learning about cryptocurrency as a primary investment", correct: false }], correctFeedback: "Exactly! Chapter II builds on your foundation with deeper knowledge, advanced strategies and the behavioral understanding needed to apply them through all market conditions.", wrongFeedback: "Chapter II deepens and optimizes what you learned in Chapter I — advanced strategies, behavioral mastery, and the concepts that produce genuinely exceptional long-term wealth." }
    }
  },
  {
    id: 102, chapter: 2,
    title: "Dividend Investing — Income from Ownership", icon: "💵", desc: "Learn how dividends work and how to build a passive income stream.",
    tags: ["Dividends", "9 min"], xp: 70, gold: 16,
    lesson: {
      heading: "Getting paid to own companies",
      intro: "Dividends are one of the oldest and most powerful mechanisms for building passive income. When you own shares in a company that pays dividends, you receive regular cash payments simply for being an owner — whether you work that day or not, whether markets are up or down.",
      blocks: [
        { label: "What are dividends?", heading: "Companies sharing their profits with owners", body: "When a profitable company has more cash than it needs for operations and growth, it can return that excess to shareholders as dividends. Most dividend-paying companies distribute profits quarterly or annually. Dividends are expressed as a yield — the annual dividend payment as a percentage of the share price. A 50 euro share paying 2 euros annually in dividends has a 4% dividend yield.", highlight: "Dividends represent real cash from real profits. Unlike stock price movements — which can be driven by sentiment and speculation — dividends are tangible: actual money deposited in your account on a predictable schedule.", example: "Ownership income example: You own 1,000 shares of a global dividend ETF yielding 3% annually. Current portfolio value: 40,000 euros. Annual dividend income: 1,200 euros. Monthly passive income: 100 euros. This income arrives regardless of whether markets are rising or falling — because it comes from company profits, not price changes." },
        { label: "Dividend strategies", heading: "How to build a dividend income machine", body: "Three dividend investing approaches exist. Dividend Growth Investing targets companies that consistently grow their dividend payments year after year — called Dividend Aristocrats if they have raised dividends for 25+ consecutive years. High-Yield Investing targets the highest current yields — attractive but potentially riskier. Dividend ETFs provide diversified exposure to many dividend-paying companies simultaneously.", highlight: "A portfolio yielding 3% in dividends produces 3,000 euros per year in passive income on a 100,000 euro portfolio — without selling a single share. At 500,000 euros, that is 15,000 euros per year. At 1,000,000 euros, it is 30,000 euros per year — approaching financial independence from dividends alone.", example: "Dividend Aristocrats example: Johnson and Johnson has paid and increased its dividend for over 60 consecutive years. Through recessions, pandemics and market crashes, the dividend kept growing. An investor who bought shares 30 years ago and never sold is now receiving a dividend yield on original cost of over 20% per year." },
        { label: "Deep dive", heading: "The dividend vs total return debate", body: "There is an important debate in investing: should you optimize for dividends or total return? Total return investors argue that dividends are not free money — when a company pays a 1 euro dividend, its share price typically falls by approximately 1 euro. They prefer accumulating ETFs that reinvest automatically without tax drag. Dividend investors counter that dividends create behavioral discipline — you see real income and are less tempted to sell during downturns.", highlight: "For long-term wealth building, accumulating ETFs typically produce more total wealth than distributing dividend ETFs, due to tax deferral. But for those who need regular income or find dividends motivating, dividend strategies are psychologically powerful and financially sound.", example: "Real comparison over 30 years at 7% total return: 100,000 euros in accumulating ETF equals 761,000 euros. 100,000 euros in 3% dividend ETF with dividends reinvested after 26% tax equals approximately 640,000 euros. The accumulating ETF wins by 121,000 euros — but both represent extraordinary wealth creation." }
      ],
      quiz: { question: "What is a dividend yield?", options: [{ text: "The total return of a stock including price appreciation", correct: false }, { text: "The annual dividend payment expressed as a percentage of the share price", correct: true }, { text: "The interest rate paid by government bonds", correct: false }, { text: "The percentage of profit a company reinvests in its own growth", correct: false }], correctFeedback: "Correct! Dividend yield = annual dividend per share divided by current share price. A 3% yield means 3 euros in annual dividends for every 100 euros invested.", wrongFeedback: "Dividend yield = annual dividend divided by share price. If a 50 euro share pays 1.50 euros annually, the yield is 3%. This tells you how much income you receive per euro invested." }
    }
  },
  {
    id: 103, chapter: 2,
    title: "FIRE — Financial Independence, Retire Early", icon: "🔥", desc: "Discover the movement that helps people retire decades early.",
    tags: ["FIRE", "9 min"], xp: 80, gold: 20,
    lesson: {
      heading: "Freedom from the 9-to-5",
      intro: "FIRE — Financial Independence, Retire Early — is not a fringe movement for extreme minimalists. It is a mathematical framework that reveals exactly how much wealth you need to be financially free, and the precise path to get there.",
      blocks: [
        { label: "The 4% rule", heading: "The mathematics of financial independence", body: "The FIRE movement is built on the Trinity Study — research by three finance professors who analyzed historical portfolio data to determine sustainable withdrawal rates. Their finding: a diversified portfolio of stocks and bonds can sustain a 4% annual withdrawal rate indefinitely — with 95%+ historical success rates over 30-year periods. This means: to be financially independent, you need 25 times your annual expenses invested.", highlight: "Annual expenses multiplied by 25 equals your FIRE number. This is the exact amount invested in a diversified ETF portfolio that historically supports indefinite withdrawals without running out of money.", example: "FIRE number calculations: Annual spending 20,000 euros equals FIRE number 500,000 euros. Annual spending 30,000 euros equals FIRE number 750,000 euros. Annual spending 40,000 euros equals FIRE number 1,000,000 euros. Every 1,000 euro reduction in annual spending reduces your FIRE number by 25,000 euros." },
        { label: "Types of FIRE", heading: "Finding your version of financial freedom", body: "Lean FIRE: very low spending — perhaps 15,000 to 20,000 euros per year — enabling early retirement with a small portfolio. Fat FIRE: higher spending — 60,000 euros or more per year — requiring a larger portfolio. Coast FIRE: invest enough early that compound interest reaches your FIRE number without additional contributions. Barista FIRE: partially retired with minimal part-time work covering basic expenses while investments grow.", highlight: "FIRE is not about never working again — it is about working because you choose to, not because you must. The moment you reach your FIRE number, every day of work becomes voluntary. That shift in psychology is profound.", example: "Coast FIRE power: Invest 50,000 euros by age 30. At 7% growth with zero additional contributions, this becomes approximately 760,000 euros by age 65. You have reached your FIRE number — coasted there entirely through compound interest. Every additional contribution accelerates your timeline further." },
        { label: "Deep dive", heading: "The 4% rule limitations and how to adapt", body: "The 4% rule has important limitations. It was derived from US market data. European markets have historically delivered slightly lower returns, suggesting 3.5% might be a safer withdrawal rate for European investors. The rule assumes a 30-year retirement — for someone retiring at 40, a 50-year retirement may require 3% to 3.5%. Sequence of returns risk means a major crash in early retirement can significantly impact portfolio longevity.", highlight: "For European investors planning early retirement of 40 or more years, consider a 3.5% withdrawal rate — multiplying annual expenses by 28.5 rather than 25. This extra buffer significantly improves long-term survival probability.", example: "Adaptive withdrawal strategy: Your target withdrawal is 30,000 euros per year — 4% of 750,000 euros. In a year when markets fall 30%, reduce to 24,000 euros — 80% of target — and cover the rest from your cash buffer. This simple adjustment dramatically improves portfolio longevity according to modern FIRE research." }
      ],
      quiz: { question: "According to the 4% rule, how much do you need invested to retire on 30,000 euros per year?", options: [{ text: "300,000 euros", correct: false }, { text: "500,000 euros", correct: false }, { text: "750,000 euros", correct: true }, { text: "1,000,000 euros", correct: false }], correctFeedback: "Correct! 30,000 euros times 25 equals 750,000 euros. At a 4% withdrawal rate, 750,000 euros historically supports indefinite withdrawals without depleting the portfolio.", wrongFeedback: "FIRE number = annual expenses times 25. 30,000 times 25 = 750,000 euros. This is the portfolio size that supports a 4% annual withdrawal rate indefinitely based on historical market data." }
    }
  },
  {
    id: 104, chapter: 2,
    title: "Factor Investing — Finding the Edge", icon: "🔬", desc: "Evidence-based strategies that have historically outperformed.",
    tags: ["Advanced", "9 min"], xp: 85, gold: 20,
    lesson: {
      heading: "The science behind market outperformance",
      intro: "For decades, academics have studied why some groups of stocks consistently outperform others over long periods. Their findings — published in peer-reviewed journals and replicated across multiple markets — identified specific characteristics called factors that explain return differences.",
      blocks: [
        { label: "What are factors?", heading: "The evidence-based drivers of return", body: "Factors are measurable characteristics of stocks that explain differences in long-term returns. The five most robustly documented factors: Value — cheap stocks outperform expensive ones over time. Size — small-cap companies outperform large-cap. Momentum — stocks rising recently tend to keep rising. Quality — highly profitable stable companies outperform. Low Volatility — lower-risk stocks often outperform on a risk-adjusted basis.", highlight: "Factor investing is not picking hot stocks — it is systematically and mechanically tilting toward characteristics that decades of academic research associate with higher long-term returns. It is evidence-based, not opinion-based.", example: "Value factor historical data: From 1927 to 2020, value stocks outperformed growth stocks by approximately 4.5% per year in the US. This premium has been documented in European, Asian and emerging markets as well — suggesting it is a real structural phenomenon." },
        { label: "Factor ETFs in practice", heading: "How to access factors with ETFs", body: "Most major ETF providers now offer factor ETFs — sometimes called smart beta or strategic beta. These systematically tilt toward specific factors while maintaining broad diversification. The core-satellite approach is most common: 70 to 80% in a broad market ETF and 20 to 30% in factor ETFs.", highlight: "For most investors, a standard MSCI World ETF delivers excellent returns without complexity. Factor tilts are appropriate only for investors who deeply understand the factors, accept that factor premiums can underperform for a decade, and commit to staying the course.", example: "Example core-satellite portfolio: 70% MSCI World ETF at TER 0.20%, 15% MSCI World Value ETF at TER 0.30%, 15% MSCI World Quality ETF at TER 0.30%. This tilts toward value and quality factors while maintaining global diversification. Extra cost: approximately 0.09% per year." },
        { label: "Deep dive", heading: "The uncomfortable truth about factor investing", body: "Factor premiums are real but extremely difficult to capture in practice. The value factor disappeared for over a decade from 2010 to 2020 as growth stocks dominated. Many investors who added factor tilts in 2010 abandoned them in 2018 after years of underperformance — right before value outperformed strongly in 2021. The academic research is robust. The investor behavior required to benefit from it is rare.", highlight: "The factor premium is the reward for suffering through extended periods of underperformance without abandoning the strategy. If you cannot commit to a 10-year minimum holding period for factor ETFs without second-guessing, a simple MSCI World ETF will serve you better.", example: "Reality check: An investor who added a value tilt in 2010 underperformed a simple MSCI World ETF by 3 to 5% annually until 2021. Those 10 years of relative underperformance required exceptional discipline. In 2021 to 2022, value significantly outperformed. The premium was real — but only for those who stayed." }
      ],
      quiz: { question: "What is the Value factor in factor investing?", options: [{ text: "Investing only in the highest-quality, most expensive premium companies", correct: false }, { text: "Systematically buying stocks that appear cheap relative to their fundamentals like earnings or book value", correct: true }, { text: "Investing in companies that provide the most value to their customers", correct: false }, { text: "Choosing ETFs with the lowest management fees", correct: false }], correctFeedback: "Correct! The value factor systematically targets stocks trading at low prices relative to their fundamental value — earnings, book value, cash flow.", wrongFeedback: "Value factor = buying stocks that are cheap relative to fundamental measures. A stock with a low price-to-earnings ratio is a value stock. The premium comes from the systematic application of this criterion across hundreds of stocks." }
    }
  },
  {
    id: 105, chapter: 2,
    title: "REITs — Real Estate Without Buying Property", icon: "🏢", desc: "Invest in real estate through the stock market without a mortgage.",
    tags: ["Real Estate", "9 min"], xp: 75, gold: 17,
    lesson: {
      heading: "Real estate returns without the hassle",
      intro: "Real estate is one of the most popular wealth-building vehicles in history. But traditional property investment requires enormous capital, illiquidity and ongoing management. REITs provide real estate exposure without any of these drawbacks.",
      blocks: [
        { label: "What is a REIT?", heading: "Real Estate Investment Trusts explained", body: "A REIT is a company that owns, operates or finances income-producing real estate. By law, REITs must distribute at least 90% of their taxable income to shareholders as dividends — which is why they typically offer very high dividend yields of 3 to 6%. REITs cover virtually every type of real estate: residential apartments, office buildings, shopping centers, logistics warehouses, data centers, cell towers, hospitals and more.", highlight: "REITs offer three things physical property cannot: instant liquidity — sell in seconds. Small investment minimums — from 1 euro. And instant diversification across dozens of properties and geographies.", example: "REIT types and examples: Residential — apartment buildings. Industrial — Amazon warehouses. Data Centers — the physical servers powering the internet. Healthcare — hospitals and medical offices. Infrastructure — cell towers that your phone connects to. Each sub-sector has different yield and growth characteristics." },
        { label: "REITs in your portfolio", heading: "How much and which REITs to hold", body: "REITs behave differently from stocks and bonds — they have a positive but less-than-perfect correlation with both. This makes them genuine diversifiers. Most MSCI World ETFs already contain some REITs at about 3 to 4% allocation. Dedicated REIT ETFs provide higher concentration. Common REIT allocations range from 5% to 15% of total equity allocation.", highlight: "Adding a dedicated REIT ETF to a stock and bond portfolio historically improves risk-adjusted returns — not because REITs return more, but because they add a third asset class that moves differently from stocks and bonds.", example: "Practical REIT allocation: Core portfolio 75% MSCI World plus 15% EM plus 10% REIT ETF. Popular REIT ETFs: IPRP from iShares Developed Markets Property Yield at TER 0.59%, EPRE from iShares European Property Yield at TER 0.40%." },
        { label: "Deep dive", heading: "REITs vs direct property: the full comparison", body: "Direct property benefits: leverage amplifies returns, tangible asset, you control decisions. Direct property drawbacks: requires 50,000 euros or more down payment, single property concentration, illiquidity — selling takes months — maintenance costs, property management time, transaction costs of 5 to 10%. REIT ETF benefits: start with 1 euro, instant diversification, instant liquidity, no management required. REIT ETF drawbacks: no control, no leverage, subject to stock market volatility.", highlight: "For most investors without significant capital, REITs provide real estate exposure more efficiently than direct property. For investors with large capital who want control and leverage, direct property may be complementary.", example: "ROI comparison: Direct property purchased at 200,000 euros with 50,000 euro down payment appreciates 3% per year. Return on equity: approximately 12% due to leverage. But illiquid, concentrated and management intensive. REIT ETF: 5 to 7% total return, fully liquid, zero management. Both have a place in a sophisticated portfolio." }
      ],
      quiz: { question: "What percentage of taxable income must REITs legally distribute to shareholders?", options: [{ text: "50%", correct: false }, { text: "75%", correct: false }, { text: "90%", correct: true }, { text: "100%", correct: false }], correctFeedback: "Correct! REITs must legally distribute at least 90% of taxable income as dividends — which is why they typically offer high dividend yields of 3 to 6%.", wrongFeedback: "REITs must distribute at least 90% of taxable income. This legal requirement is what makes them high-yield investments — companies with excellent real estate income are required to share most of it with shareholders." }
    }
  },
  {
    id: 106, chapter: 2,
    title: "Behavioral Finance — Your Brain is the Enemy", icon: "🧠", desc: "The psychological biases that destroy investment returns.",
    tags: ["Psychology", "9 min"], xp: 80, gold: 18,
    lesson: {
      heading: "The investor's greatest enemy lives between their ears",
      intro: "The DALBAR Quantitative Analysis of Investor Behavior is the most important study most investors have never heard of. Its finding, replicated annually for 30 years: the average equity fund investor earns approximately 3 to 4% less per year than the funds they invest in. The gap is explained entirely by investor behavior.",
      blocks: [
        { label: "The main biases", heading: "The cognitive errors that silently cost a fortune", body: "Loss aversion: psychologically, losses feel approximately twice as painful as equivalent gains feel good. This causes investors to sell during downturns to stop the pain — at the worst possible time. Recency bias: we assume recent trends will continue — causing investors to buy at market tops and sell at bottoms. Confirmation bias: we seek information that confirms what we already believe. Overconfidence: most investors believe they are above-average — which is mathematically impossible. Herding: doing what everyone else is doing, regardless of whether it is rational.", highlight: "The DALBAR study found that over 30 years, the average equity fund investor earned approximately 4% less per year than the S&P 500 itself — not from fees, but entirely from behavioral mistakes. On a 200,000 euro portfolio over 30 years, 4% less annually is the difference between 800,000 and 2,000,000 euros final wealth.", example: "Loss aversion in action: Your portfolio falls from 100,000 to 75,000 euros. The emotional pain triggers the instinct to sell. But you lock in the 25% loss permanently. Three years later the portfolio would have recovered to 130,000 euros. The behavioral cost: 55,000 euros in foregone wealth from one emotional decision." },
        { label: "How to overcome biases", heading: "Systems that make good behavior automatic", body: "You cannot eliminate psychological biases through willpower — they are wired into human cognition. But you can design investing systems that prevent biases from translating into harmful actions. Automation: savings plans that invest without a decision. Pre-commitment: written investment policy statements you agree to follow before a crisis happens. Friction: making it harder to sell by requiring a 48-hour waiting period before any sell decision.", highlight: "An Investment Policy Statement written during calm markets is your most powerful behavioral tool. It contains your rules, your allocation targets and your commitment to not sell during crashes. Reading it when you are tempted to panic is far more effective than relying on willpower alone.", example: "Sample IPS rules: My allocation is 80% MSCI World, 20% EM. I will not change this during market crashes. I will rebalance annually using new contributions only. I will not check my portfolio more than quarterly. If I feel the urge to sell, I will wait 72 hours and reread this document before making any decision." },
        { label: "Deep dive", heading: "The disposition effect and mental accounting", body: "Two additional biases devastate investor returns. The disposition effect: investors hold losing positions too long and sell winning positions too quickly. This is the exact opposite of optimal behavior. Mental accounting: treating money differently based on where it came from or what account it is in. Bonus money feels like free money and gets spent. Dividend income feels separate from portfolio value and triggers higher spending.", highlight: "Optimal investment behavior is counterintuitive: sell losers and hold winners — the opposite of the disposition effect. Treat all money as identical regardless of source. Never count unrealized gains as money you have — they are not real until you sell.", example: "Disposition effect cost: Investors who sell winners early and hold losers long underperform by approximately 2 to 3% annually according to academic research. Simply reversing this pattern — holding winners and cutting losers — adds significant returns over time. This is why momentum investing is a documented factor premium." }
      ],
      quiz: { question: "What does the DALBAR study consistently find about average investor behavior?", options: [{ text: "Average investors significantly outperform the funds they invest in", correct: false }, { text: "Average investors earn significantly less than the funds they invest in due to poor behavioral decisions", correct: true }, { text: "Investor behavior has no measurable impact on long-term returns", correct: false }, { text: "Active trading consistently improves investor returns", correct: false }], correctFeedback: "Correct! DALBAR consistently shows investors earn 3 to 4% less annually than the funds they hold — entirely because of behavioral mistakes like panic selling, chasing performance and mistimed buying.", wrongFeedback: "DALBAR shows average investors earn 3 to 4% less annually than the funds they invest in. The gap is entirely behavioral: buying high, selling low, chasing performance and abandoning strategies during downturns." }
    }
  },
  {
    id: 107, chapter: 2,
    title: "Emerging Markets — Growth Frontier", icon: "🌏", desc: "Access the fastest-growing economies in the world through ETFs.",
    tags: ["Global", "9 min"], xp: 70, gold: 16,
    lesson: {
      heading: "The next billion investors",
      intro: "The MSCI World covers 23 developed countries representing approximately 85% of investable developed market capitalization. But the world's fastest-growing economies — China, India, Brazil, Taiwan, South Korea — are classified as emerging markets. Understanding them is one of the most important strategic decisions for a global investor.",
      blocks: [
        { label: "What are emerging markets?", heading: "The developing world's powerful stock exchanges", body: "Emerging markets are economies in transition — more developed than frontier markets, less developed than countries like Germany or the US. The MSCI Emerging Markets index covers 24 countries including China at approximately 30%, India at approximately 20%, Taiwan at approximately 17%, South Korea at approximately 13%, Brazil at approximately 5% and others. These countries typically have younger, faster-growing populations, rising middle classes and rapidly expanding consumer markets.", highlight: "Emerging markets represent approximately 40% of global GDP but only around 12% of global investable market capitalization. As these economies develop and their financial markets mature, this gap is expected to narrow — potentially generating strong long-term returns for patient investors.", example: "India growth story: India is projected to become the world's third-largest economy by 2030. Its stock market has been one of the best-performing globally over the past decade. An MSCI Emerging Markets ETF automatically gives you exposure to this growth — without picking individual Indian stocks." },
        { label: "EM in your portfolio", heading: "How much emerging markets exposure to take", body: "Emerging markets have higher expected returns than developed markets over the long term — but also higher volatility. Annual swings of 30% or more are common. For a long-term investor with 20 or more year horizon, this volatility is manageable. The most common recommendation: 20 to 30% of equity exposure in emerging markets. The classic 3-fund portfolio uses 20% EM.", highlight: "An 80% MSCI World plus 20% MSCI Emerging Markets portfolio gives you exposure to over 3,000 companies across 47 countries — essentially owning the entire world's investable equity market. This is one of the most recommended simple portfolios for European long-term investors.", example: "EM volatility reality: In 2021, MSCI EM returned plus 4%. In 2022, it fell minus 20%. In 2023, plus 10%. This volatility is expected — and is the price you pay for the higher long-term expected return. An investor who sold EM after 2022 locked in losses and missed the 2023 recovery." },
        { label: "Deep dive", heading: "China risk and emerging market geopolitics", body: "The largest emerging market risk many investors underestimate is China. At approximately 30% of the MSCI EM index, a major Chinese market event — regulatory crackdown, Taiwan conflict escalation, economic slowdown — would significantly impact your EM holdings. The Chinese government has demonstrated willingness to intervene in its stock market in ways that damage foreign investor returns. Some investors choose ex-China EM ETFs for this reason.", highlight: "Understanding what you own is essential. If you hold an MSCI EM ETF, approximately 30% is in China. Consider whether this concentration aligns with your risk tolerance and geopolitical views before investing.", example: "China intervention example: In 2021, the Chinese government cracked down on its technology sector. Alibaba fell 70% from its peak. Tencent fell 60%. The MSCI EM index fell significantly. Investors who understood this risk and held ex-China EM ETFs were significantly insulated." }
      ],
      quiz: { question: "Which country currently has the largest weight in the MSCI Emerging Markets index?", options: [{ text: "India", correct: false }, { text: "Brazil", correct: false }, { text: "China", correct: true }, { text: "South Korea", correct: false }], correctFeedback: "Correct! China represents approximately 30% of the MSCI Emerging Markets index — making it the dominant country weighting and a key risk factor to understand.", wrongFeedback: "China is the largest component at approximately 30% of MSCI EM. India is second at approximately 20%. Understanding country concentration helps you assess the political and economic risks in your EM allocation." }
    }
  },
  {
    id: 108, chapter: 2,
    title: "Asset Allocation — The Most Important Decision", icon: "🎨", desc: "Why how you split your portfolio matters more than which funds you pick.",
    tags: ["Portfolio", "9 min"], xp: 80, gold: 18,
    lesson: {
      heading: "The decision that determines 90% of your returns",
      intro: "A landmark 1986 study by Brinson, Hood and Beebower analyzed the returns of 91 large pension funds and found that asset allocation — the strategic split between stocks, bonds and other asset classes — explained approximately 93.6% of the variation in portfolio returns. Stock selection and market timing explained less than 7% combined.",
      blocks: [
        { label: "What is asset allocation?", heading: "The big picture of your investment mix", body: "Asset allocation is the strategic distribution of your investments across different asset classes: stocks, bonds, real estate, commodities and cash. Each asset class has different return characteristics, volatility profiles and correlation patterns. The combination you choose determines your portfolio's long-term risk and expected return far more than any individual investment selection.", highlight: "A 90% stocks and 10% bonds portfolio will behave dramatically differently from a 60% stocks and 40% bonds portfolio — regardless of which specific ETFs you hold within each category. The allocation decision dwarfs the fund selection decision in importance.", example: "Asset class behavior comparison in 2008: Global stocks fell 57%. Government bonds rose 5 to 8%. Gold rose 5%. Cash was flat. A 60% stocks and 40% bonds portfolio fell approximately 30% — painful, but far less devastating than an all-stock portfolio. The 40% bond allocation provided genuine crisis protection." },
        { label: "Choosing your allocation", heading: "Matching allocation to risk tolerance and time horizon", body: "Two factors determine your optimal asset allocation. Time horizon: longer horizons can tolerate more volatility and should hold more stocks. Risk tolerance: how much portfolio loss can you emotionally sustain without selling? A 50% decline on a 200,000 euro portfolio is a 100,000 euro loss on paper. If that would cause you to sell, your equity allocation is too high.", highlight: "A useful rule of thumb: your equity percentage equals 110 minus your age. At 30: 80% stocks. At 45: 65% stocks. At 60: 50% stocks. At 70: 40% stocks. This is a starting point, not a rigid rule — your personal risk tolerance matters as much as your age.", example: "Allocation comparison over 30 years at historical returns: 100% stocks equals 1,743,000 euros with minus 57% maximum drawdown. 80/20 stocks/bonds equals 1,412,000 euros with minus 42% maximum drawdown. 60/40 stocks/bonds equals 1,089,000 euros with minus 27% maximum drawdown. More stocks equals more wealth but more pain. You must choose the balance you can actually sustain." },
        { label: "Deep dive", heading: "Correlation — the true power of diversification", body: "The mathematical reason diversification works is correlation. Two perfectly correlated assets move in lockstep — combining them adds no diversification benefit. Two uncorrelated assets combine to reduce volatility without reducing expected return. Two negatively correlated assets perfectly offset each other. The magic zone is assets that have positive but less than perfect correlation — like stocks and bonds — which reduce volatility while preserving most of the expected return.", highlight: "The ideal diversification is assets with positive expected returns and low or negative correlation to each other. Stocks and government bonds historically have low positive correlation — each adds expected return while partially reducing the other's volatility. This is why the 60/40 portfolio has been so powerful over decades.", example: "Correlation matrix example: MSCI World to EM Stocks: plus 0.85 — high correlation, limited diversification benefit. MSCI World to Government Bonds: plus 0.10 — low correlation, significant diversification benefit. MSCI World to Gold: minus 0.05 — near zero correlation, excellent diversification. This explains why combining these three improves risk-adjusted returns." }
      ],
      quiz: { question: "According to the Brinson, Hood and Beebower study, approximately what percentage of portfolio performance variation is explained by asset allocation?", options: [{ text: "30%", correct: false }, { text: "60%", correct: false }, { text: "93%", correct: true }, { text: "It depends entirely on stock selection", correct: false }], correctFeedback: "Correct! The landmark study found asset allocation explains approximately 93.6% of portfolio return variation. Individual stock selection explains less than 7%. The allocation decision is the most important one you make.", wrongFeedback: "Asset allocation explains approximately 93.6% of portfolio return variation. This is why deciding how much to hold in stocks vs bonds vs alternatives matters far more than picking specific funds." }
    }
  },
  {
    id: 109, chapter: 2,
    title: "The All-Weather Portfolio", icon: "🌤️", desc: "Ray Dalio's portfolio designed to perform in any economic environment.",
    tags: ["Strategy", "9 min"], xp: 75, gold: 17,
    lesson: {
      heading: "A portfolio for every season",
      intro: "Ray Dalio is the founder of Bridgewater Associates — the world's largest hedge fund. After spending decades studying economic history, he concluded that most portfolios are secretly heavily concentrated in one type of economic environment. His solution was the All Weather Portfolio — designed to perform acceptably in any economic condition.",
      blocks: [
        { label: "The four economic seasons", heading: "Economic environments and which assets thrive", body: "Dalio identified four economic environments, each favorable to different assets. Rising growth with low inflation: stocks thrive as companies earn more. Falling growth with low inflation: bonds thrive as lower rates boost bond prices. Rising growth with high inflation: commodities thrive as raw materials appreciate. Falling growth with high inflation — stagflation: gold and inflation-linked bonds thrive. A typical 60/40 portfolio is essentially a bet on the first two environments.", highlight: "No asset class performs well in every environment. The All Weather Portfolio holds something that performs in each — so portfolio damage in any one environment is offset by gains in others.", example: "2022 test: Both stocks and bonds fell simultaneously as inflation spiked and rates rose. Traditional 60/40 portfolios had their worst year in decades — down approximately 16%. All Weather portfolios, with their gold and commodity exposure, fell significantly less. The diversification benefit was real." },
        { label: "The allocation", heading: "All Weather Portfolio composition", body: "The original All Weather Portfolio allocation: 30% stocks, 40% long-term government bonds, 15% intermediate-term bonds, 7.5% gold, 7.5% commodities. This is risk-weighted rather than dollar-weighted — bonds receive more weight because they are less volatile than stocks, so more is needed to equalize each asset's risk contribution.", highlight: "The All Weather Portfolio has historically delivered approximately 7 to 8% annual return with maximum drawdown of only approximately minus 11% — compared to the S&P 500's maximum drawdown of minus 51% in 2008 to 2009. Smoother ride, slightly lower return.", example: "ETF implementation of All Weather: 30% MSCI World, 40% Global Long Bond ETF, 15% Global Bond ETF, 7.5% Gold ETF, 7.5% Commodity ETF. Rebalance annually. Total annual cost approximately 0.25%." },
        { label: "Deep dive", heading: "All Weather vs traditional portfolios: who should use it?", body: "The All Weather Portfolio makes specific trade-offs. Its large bond allocation means it typically underperforms a stock-heavy portfolio during prolonged bull markets — like 2010 to 2021. Its gold and commodity exposure provides crisis protection that bonds alone cannot. The portfolio is most appropriate for investors who prioritize stability over maximum growth, are approaching retirement, or have experienced severe volatility and found it psychologically damaging.", highlight: "The All Weather Portfolio is not for maximizing long-term wealth. It is for investors who value a smoother ride more than maximum returns — those who know they would panic sell during a 50% drawdown and want to prevent that from ever happening.", example: "Comparison over 40 years from 1984 to 2024: 100% MSCI World gives approximately 10.5% annual return with minus 55% maximum drawdown. All Weather gives approximately 8.2% annual return with minus 11% maximum drawdown. The 2.3% lower annual return costs enormous wealth over 40 years — but for risk-averse investors, the psychological sustainability of the All Weather may actually produce better outcomes." }
      ],
      quiz: { question: "Why does the All Weather Portfolio hold 40% in long-term bonds if stocks historically return more?", options: [{ text: "Bonds always outperform stocks in the long run", correct: false }, { text: "Bonds are risk-weighted — less volatile assets need higher allocation to balance each asset's risk contribution", correct: true }, { text: "The portfolio is designed only for retirees who need income", correct: false }, { text: "Long-term bonds have identical expected returns to stocks", correct: false }], correctFeedback: "Exactly right! Risk weighting: because bonds are less volatile than stocks, you need more of them to equalize each asset's contribution to portfolio risk. This is fundamentally different from dollar-weighting.", wrongFeedback: "Risk weighting: bonds have lower volatility than stocks. To equalize each asset's contribution to portfolio risk — not just dollar value — you hold more of the less volatile asset. This is the key innovation in Dalio's portfolio construction." }
    }
  },
  {
    id: 110, chapter: 2,
    title: "The Psychology of Money", icon: "💭", desc: "How your relationship with money shapes your financial future.",
    tags: ["Psychology", "9 min"], xp: 80, gold: 18,
    lesson: {
      heading: "Money is emotional before it is mathematical",
      intro: "Morgan Housel's book The Psychology of Money is one of the most important investing books written in the last decade. Its central argument: financial success has far more to do with behavior than intelligence or knowledge.",
      blocks: [
        { label: "Key insights", heading: "What actually drives financial outcomes", body: "Housel's most powerful insight: no one is crazy. Everyone's financial behavior makes sense given their personal history, experiences and context. Someone who grew up in poverty and keeps too much cash is not irrational — they experienced financial insecurity and their behavior reflects that. Understanding this prevents you from making the opposite mistake: blindly applying academic theory to your unique situation without accounting for your own psychology.", highlight: "Being reasonable is more important than being rational. A theoretically optimal financial plan that you cannot emotionally sustain beats a perfect plan you abandon at the first crisis. Design your investing system for your actual psychology, not your ideal psychology.", example: "Practical application: If you know you would panic-sell during a 40% crash, do not hold 90% stocks — even if that is mathematically optimal for your time horizon. Hold 70% stocks instead. The lower expected return is worth the higher probability of staying invested through crises." },
        { label: "Timeless principles", heading: "The ideas that transcend market conditions", body: "Enough is a superpower: defining what enough looks like prevents the endless pursuit of more. The person who knows their FIRE number and reaches it is wealthier in every meaningful sense than the person who keeps chasing more beyond what they need. Save like a pessimist, invest like an optimist: expect bad things to happen, plan for them — but trust that long-term human progress will drive your investments higher.", highlight: "The most important financial variable is how long you stay invested — not what you invest in. Your time horizon is your greatest advantage. A mediocre investment held patiently for 40 years will vastly outperform an excellent investment held impatiently for 5.", example: "The power of enough: Warren Buffett has earned 99.6% of his wealth after age 52. His extraordinary wealth comes not from extraordinary returns but from starting early and never stopping. The lesson is not to earn 20% returns. It is to invest consistently for 70 or more years." },
        { label: "Deep dive", heading: "Wealth versus rich — the hidden distinction", body: "Housel makes a crucial distinction between being rich and being wealthy. Rich is visible: the expensive car, the large house, the luxury goods. Wealth is invisible: it is the savings you have not spent, the investments compounding quietly, the financial security that only shows up when you need it. The flashy rich person may be financially fragile. The quietly wealthy person — who lives modestly and invests consistently — is secure.", highlight: "Wealth is what you do not see. It is the income not spent. It is the lifestyle not upgraded with every salary raise. The investors who build extraordinary wealth are often not recognizable as wealthy from the outside — they are the ones who saved while others spent.", example: "The role of humility: No one knows what the market will do next month, next year or next decade — not professional investors, not central bankers, not economists. The investor who accepts this uncertainty and builds a diversified, low-cost, automated system outperforms the confident investor who believes they can predict and react." }
      ],
      quiz: { question: "What is the primary driver of long-term investment success according to behavioral research?", options: [{ text: "Superior stock selection skills that identify outperforming companies", correct: false }, { text: "Behavioral discipline — staying invested and avoiding emotional decisions through all market conditions", correct: true }, { text: "Correctly timing market movements to buy low and sell high", correct: false }, { text: "Access to superior financial information before other investors", correct: false }], correctFeedback: "Exactly right! Behavioral discipline — staying invested through crashes, not panic selling, saving consistently — is the primary driver of long-term investment success. Knowledge without behavior produces nothing.", wrongFeedback: "Behavioral discipline is the key driver: staying invested through crashes, not panic selling, saving consistently, not abandoning a strategy during underperformance. This is harder than it sounds and worth more than any investment insight." }
    }
  },
  {
    id: 111, chapter: 2,
    title: "International Diversification", icon: "🗺️", desc: "Why investing globally reduces risk and increases opportunity.",
    tags: ["Global", "9 min"], xp: 70, gold: 15,
    lesson: {
      heading: "The world is your portfolio",
      intro: "Home bias — the tendency to invest disproportionately in your own country — is one of the most pervasive and costly behavioral biases in investing. A German investor holding mostly DAX stocks is missing 97% of the world's investable equity.",
      blocks: [
        { label: "The home bias problem", heading: "Why domestic-only investing is a costly mistake", body: "Germany represents approximately 2 to 3% of global market capitalization. A 100% German stock portfolio concentrates your wealth in a single country's economy, currency, regulatory environment and political system. Vanguard research shows that US investors hold approximately 80% domestic stocks despite the US representing 60% of global markets. German investors show similar patterns.", highlight: "Germany represents only approximately 2 to 3% of global market capitalization. A Germany-heavy portfolio means ignoring Apple, Microsoft, ASML, LVMH, Samsung, Taiwan Semiconductor, Nestlé and thousands more — 97% of the world's most successful companies.", example: "Home bias cost: From 2000 to 2009, the DAX delivered approximately 0% returns as German companies struggled. The MSCI World — weighted toward US companies — also fell but included different cycles. From 2010 to 2020, the S&P 500 dramatically outperformed European indices. A globally diversified investor participated in both good and bad periods without country concentration risk." },
        { label: "True global diversification", heading: "Owning the entire world", body: "A global ETF like the MSCI World or MSCI ACWI automatically distributes your investment across the world's best companies — weighted by their size and market value. Adding emerging markets extends this to the fastest-growing economies. The MSCI ACWI covers 47 countries and approximately 2,900 companies in a single ETF.", highlight: "When the US market underperformed in the 2000s, international markets partially compensated. When European markets lagged in the 2010s, US tech drove global returns. Global diversification does not guarantee the best returns in any given decade — it guarantees you always own whatever part of the world happens to thrive.", example: "The rotation reality: In the 1980s, Japanese stocks were the best in the world. In the 1990s, US tech dominated. In the 2000s, emerging markets led. In the 2010s, US tech again. No one can reliably predict which country or region will lead next. Own them all." },
        { label: "Deep dive", heading: "Currency risk and how to manage it", body: "Global investing introduces currency risk — the possibility that foreign currency movements reduce your returns when translated back to euros. A US stock that rises 10% in dollars but the dollar falls 5% against the euro delivers only approximately 5% in euro terms. Currency risk is real but over long periods it diversifies — sometimes favorable, sometimes not. Hedged ETFs convert foreign currencies back to euros using financial instruments, eliminating currency risk — at a cost of approximately 0.1 to 0.3% per year.", highlight: "For long-term investors with 20 or more year horizons, currency risk tends to average out over time and is generally not worth hedging. For those close to retirement, hedged versions of global ETFs may be worth the small additional cost.", example: "Hedged versus unhedged decision: MSCI World unhedged versus MSCI World EUR-hedged. If the USD appreciates against EUR over your investment period, unhedged wins. If USD depreciates, hedged wins. Over 20 to 30 year periods, the currency impact tends to be modest and unpredictable. Most long-term investors choose unhedged for simplicity and lower cost." }
      ],
      quiz: { question: "What percentage of global market capitalization does Germany represent?", options: [{ text: "About 15%", correct: false }, { text: "About 10%", correct: false }, { text: "About 2 to 3%", correct: true }, { text: "About 25%", correct: false }], correctFeedback: "Correct! Germany represents only approximately 2 to 3% of global market capitalization. A Germany-only portfolio concentrates 100% of investment risk in 2 to 3% of the world's opportunities.", wrongFeedback: "Germany represents approximately 2 to 3% of global markets. A German investor holding only German stocks is missing 97% of global investment opportunities — a massive self-imposed concentration risk." }
    }
  },
  {
    id: 112, chapter: 2,
    title: "Building Multiple Income Streams", icon: "🌊", desc: "Understand how to create financial security through income diversification.",
    tags: ["Strategy", "9 min"], xp: 75, gold: 17,
    lesson: {
      heading: "Never depend on a single source",
      intro: "True financial security requires more than a savings account and a pension. It comes from multiple streams of income that provide resilience when any one source is disrupted.",
      blocks: [
        { label: "Active vs passive income", heading: "The two types of income and why the ratio matters", body: "Active income requires your time and presence: salary, freelancing, consulting. When you stop working, active income stops. Passive income flows regardless of your daily activity: ETF dividends, rental income, bond interest, royalties, business profits. Financial independence is achieved when passive income exceeds your expenses — when you no longer depend on active income to sustain your lifestyle.", highlight: "The wealthy do not just earn more — they build systems and assets that generate income while they sleep, travel, raise children or pursue passions. An ETF portfolio generating dividends is the simplest form of passive income available to ordinary investors.", example: "Income progression example: Salary 4,000 euros per month, 100% active. Invest 800 euros per month for 20 years at 7%. Portfolio: 495,000 euros. Dividend income at 3%: 14,850 euros per year equals 1,237 euros per month — 31% passive. Continue 10 more years: portfolio exceeds 1,000,000 euros. Dividend income: 30,000 euros per year equals 2,500 euros per month — 63% passive. The ratio gradually shifts." },
        { label: "Building the streams", heading: "The phases of income diversification", body: "Phase 1 at ages 20 to 30: Maximize active income through career development. Invest aggressively at 20 to 30% savings rate. Every euro invested compounds for the longest time. Phase 2 at ages 30 to 40: Growing investment portfolio produces meaningful passive income — perhaps 500 to 1,000 euros per month. Begin developing knowledge-based income. Phase 3 at ages 40 to 50: Investment income covers basic expenses. Active work becomes more optional. Phase 4 at ages 50 and above: Multiple streams provide true financial independence.", highlight: "The first income stream is always active income. The second is investment income. The third often emerges from expertise developed professionally — teaching, consulting, creating. Build in this order. The foundation of all passive income is time and invested capital.", example: "Knowledge income example: A marketing professional who spends 5 years becoming excellent at their craft can then teach that knowledge through a course, newsletter or consulting practice. Initial effort: high. Ongoing income: potentially perpetual. Many professionals earn more from knowledge products than from their day jobs — but only after years of active income created the expertise." },
        { label: "Deep dive", heading: "The passive income illusion — what it actually takes", body: "Passive income is real but rarely effortless. Rental income requires finding tenants, managing maintenance and dealing with vacancies. Dividends require building and maintaining a portfolio through market volatility. The term passive means income not directly tied to hours worked — not income that requires zero effort. The highest-quality passive income is investment income from a diversified ETF portfolio because it truly requires minimal ongoing effort once established.", highlight: "The most genuinely passive income for ordinary investors is ETF dividends and portfolio appreciation. It requires effort to build but virtually no ongoing management. All other passive income sources require more ongoing attention than the term suggests.", example: "Realistic passive income from ETFs: You invest 500 euros per month for 25 years at 7%. Portfolio: approximately 406,000 euros. Dividend income at 3%: 12,180 euros per year equals 1,015 euros per month. This does not replace a salary. But it fundamentally changes your financial security — if you lose your job, you have 1,015 euros per month while you search for the next opportunity. That security is transformative." }
      ],
      quiz: { question: "What is passive income?", options: [{ text: "Income earned from a very easy job that requires minimal effort", correct: false }, { text: "Income that flows regardless of your daily time input — dividends, rental income, interest", correct: true }, { text: "Government welfare or social security payments", correct: false }, { text: "Income earned working part-time or in a reduced role", correct: false }], correctFeedback: "Correct! Passive income flows without requiring daily time input — ETF dividends, rental income, bond interest, royalties. Building passive income streams is the path to financial independence.", wrongFeedback: "Passive income = income not directly tied to your time. ETF dividends, rental income and interest payments are passive — they arrive whether you work that day or not. This is distinct from active income which stops when you stop working." }
    }
  },
  {
    id: 113, chapter: 2,
    title: "Portfolio Rebalancing Mastery", icon: "⚖️", desc: "Master the practice that keeps your portfolio on track year after year.",
    tags: ["Management", "9 min"], xp: 70, gold: 16,
    lesson: {
      heading: "Restore order to your portfolio",
      intro: "Rebalancing is the disciplined practice of restoring your target allocation after market movements cause it to drift. It sounds mechanical and boring — which is exactly why most investors skip it, and exactly why it costs them. Proper rebalancing is one of the highest-value actions a long-term investor can take.",
      blocks: [
        { label: "Why drift creates hidden risk", heading: "What happens to your portfolio without rebalancing", body: "Suppose you start with 80% MSCI World and 20% Emerging Markets. After a strong year where MSCI World gains 25% and EM gains 5%, your portfolio drifts to approximately 85% MSCI World and 15% EM. Your portfolio is now riskier than you intended — without any conscious decision on your part. After another strong year, you might be at 90% and 10%. Your risk profile has changed dramatically through passive drift.", highlight: "Rebalancing is not just about optimization — it is about maintaining the risk level you consciously chose and verified you can emotionally tolerate. Without it, your portfolio quietly becomes more concentrated in whatever has recently performed best.", example: "The 2020 example: A 60/40 stocks/bonds portfolio from 2010 to 2020 — if never rebalanced — would have drifted to approximately 80/20 by 2020. This much higher stock allocation then fell much harder in the COVID crash. Regular rebalancing would have maintained the intended risk profile." },
        { label: "Rebalancing methods", heading: "Calendar vs threshold rebalancing", body: "Two main approaches exist. Calendar rebalancing: check and rebalance on a fixed schedule — quarterly or annually. Simple, predictable, low transaction frequency. Threshold rebalancing: rebalance whenever any asset class drifts more than 5% from target. More responsive but requires more monitoring. For most individual investors, annual calendar rebalancing is optimal — simple enough to actually do, frequent enough to prevent severe drift.", highlight: "Rebalancing with new contributions is more tax-efficient than selling and rebalancing. Direct your monthly savings plan contributions toward the underweighted asset class instead of proportionally. This restores balance without triggering capital gains taxes.", example: "Tax-efficient rebalancing example: Target 80% MSCI World, 20% EM. Current: 85% MSCI World, 15% EM — drifted 5%. Action: Direct next 3 months of 500 euro monthly savings entirely to EM ETF. After 3 months: 1,500 euros additional EM. Allocation approximately restored. No selling, no tax event, zero transaction cost." },
        { label: "Deep dive", heading: "Does rebalancing actually improve returns?", body: "The data on rebalancing and returns is nuanced. Rebalancing does not reliably improve absolute returns — in trending markets it can reduce returns by systematically selling the winner and buying the loser. What rebalancing reliably improves is risk-adjusted returns. By keeping risk constant, you prevent the portfolio from becoming dangerously concentrated. In volatile markets with mean reversion, rebalancing also generates a rebalancing bonus — systematically buying assets after they fall and selling after they rise.", highlight: "Rebalance because it maintains your intended risk level and enforces buying low and selling high in a systematic, emotion-free way — not primarily because it will maximize absolute returns. Risk management is the primary benefit.", example: "Rebalancing bonus evidence: Vanguard research shows that annual rebalancing added approximately 0.4% in risk-adjusted returns over 20-year periods compared to never rebalancing — primarily through risk control and systematic buy-low-sell-high enforcement. Small annual benefit, enormous long-term compounding effect." }
      ],
      quiz: { question: "What is the most tax-efficient way to rebalance a portfolio?", options: [{ text: "Sell the overweighted assets and immediately buy the underweighted ones", correct: false }, { text: "Direct new savings contributions toward underweighted assets to restore balance without selling", correct: true }, { text: "Completely liquidate and reinvest the entire portfolio annually", correct: false }, { text: "Rebalancing is unnecessary for investors with a long time horizon", correct: false }], correctFeedback: "Correct! Using new contributions to rebalance restores your target allocation without triggering capital gains taxes — the most efficient approach for ongoing investors.", wrongFeedback: "The most tax-efficient rebalancing directs new savings contributions to underweighted asset classes. This restores balance without selling anything, avoiding capital gains taxes entirely." }
    }
  },
  {
    id: 114, chapter: 2,
    title: "Robo-Advisors vs DIY Investing", icon: "🤖", desc: "Compare automated investing services with managing your own portfolio.",
    tags: ["Practical", "9 min"], xp: 65, gold: 14,
    lesson: {
      heading: "Managed automatically or managed yourself?",
      intro: "Robo-advisors have democratized professionally constructed portfolios — offering automated, algorithm-driven investing for fees far lower than traditional wealth managers. But how do they compare to simply buying ETFs yourself? The answer depends on your knowledge, discipline and the value you place on simplicity versus cost optimization.",
      blocks: [
        { label: "What robo-advisors do", heading: "Automated portfolio management explained", body: "Robo-advisors automatically assess your risk profile through a questionnaire, construct a diversified ETF portfolio matching that profile, invest your deposits immediately, rebalance periodically and provide regular performance reports. German robo-advisors like Scalable Capital, Quirion, Whitebox and Ginmon all use ETFs as their underlying instruments — they are essentially automated ETF portfolio managers.", highlight: "A robo-advisor charging 0.5% per year on top of ETF fees of 0.2% equals a total cost of 0.7% annually — still dramatically cheaper than a traditional bank portfolio manager charging 1.5 to 2.5% with no better expected returns.", example: "German robo-advisor comparison: Scalable Capital PRIME costs 0.75% per year plus ETF costs. Quirion costs 0.48% per year plus ETF costs. Whitebox costs 0.35% per year plus ETF costs. All use diversified ETF portfolios and automatically rebalance. The value is simplicity and automation — not superior investments." },
        { label: "DIY ETF investing", heading: "Why most knowledgeable investors choose DIY", body: "Buying ETFs directly through Trade Republic or Scalable Capital's free plan costs approximately 0.15 to 0.25% in ETF fees with no additional management charge. For a simple 2-ETF portfolio of MSCI World and EM, you do your own rebalancing once per year — a 15-minute task. The total cost saving versus a robo-advisor: 0.35 to 0.75% per year. On a 200,000 euro portfolio over 30 years, 0.5% less in fees compounds to approximately 140,000 euros in additional wealth.", highlight: "DIY investing with a simple 2 to 3 ETF portfolio delivers better outcomes than robo-advisors on cost. For investors with this guide's knowledge and the discipline not to panic sell, DIY is clearly superior on a purely financial basis.", example: "30-year comparison: 500 euros per month invested. DIY at 0.20% total cost equals approximately 596,000 euros. Robo-advisor at 0.90% total cost equals approximately 536,000 euros. Difference: 60,000 euros from fees alone. The DIY investor does everything the robo-advisor does automatically — but keeps an extra 60,000 euros." },
        { label: "Deep dive", heading: "When robo-advisors genuinely make sense", body: "Robo-advisors are genuinely valuable in specific situations. For beginners who feel overwhelmed by choice and might delay investing without a simple guided experience. For investors who know they lack the discipline to hold through crashes without automated rebalancing forcing them to stay the course. For those who value behavioral coaching some robo-advisors provide. The question is not which is objectively better — it is which you will actually stick to.", highlight: "A robo-advisor you use consistently beats a DIY strategy you abandon during the first major crash. Behavioral sustainability matters more than cost optimization.", example: "Hybrid approach: Start with a robo-advisor to build the habit of investing. After 1 to 2 years of comfortable experience with market volatility, migrate to DIY ETFs for lower cost. This uses the robo-advisor as a behavioral training tool while ultimately capturing the cost savings of DIY." }
      ],
      quiz: { question: "For a knowledgeable investor who can commit to not panic-selling, which approach typically produces better financial outcomes?", options: [{ text: "A robo-advisor, because professional algorithms always outperform manual approaches", correct: false }, { text: "DIY ETF investing, because lower fees compound into significantly better long-term outcomes", correct: true }, { text: "A traditional bank portfolio, because of personalized service", correct: false }, { text: "They are financially identical — choose based purely on preference", correct: false }], correctFeedback: "Correct! For a disciplined investor with this knowledge, DIY ETF investing delivers better outcomes due to lower fees — saving potentially tens of thousands of euros over decades.", wrongFeedback: "For disciplined investors who will not panic sell, DIY ETF investing outperforms robo-advisors due to lower fees. The saving of 0.35 to 0.75% annually compounds into tens of thousands of euros over decades." }
    }
  },
  {
    id: 115, chapter: 2,
    title: "Gold and Commodities", icon: "🥇", desc: "Understand the role of gold and commodities in a diversified portfolio.",
    tags: ["Assets", "9 min"], xp: 65, gold: 14,
    lesson: {
      heading: "The ancient store of value meets modern portfolios",
      intro: "Gold has been used as a store of value for over 5,000 years. In modern investment portfolios it serves three functions: inflation protection, crisis protection and diversification. Understanding when and how much gold to hold separates sophisticated investors from those who either ignore it entirely or over-invest based on fear.",
      blocks: [
        { label: "Gold's portfolio role", heading: "Insurance, not investment", body: "Gold does not generate earnings, dividends or cash flows. Its value comes from scarcity, universal recognition and its historical role as a safe haven. In portfolio construction, gold serves primarily as insurance against two scenarios: inflation — gold typically preserves purchasing power when currencies lose value — and systemic financial crises — gold often rises when financial systems are under severe stress. It is portfolio insurance: you hope you never need it, but you are glad it is there when you do.", highlight: "Gold is not a growth investment and should not be expected to match equity returns over long periods. Its value is in doing something completely different from stocks during specific crises — reducing overall portfolio volatility at a small cost to long-term returns.", example: "Gold in major crises: 2008 Financial Crisis — S&P 500 fell 57%, gold rose approximately 5%. 2020 COVID crash — S&P 500 fell 34%, gold rose approximately 15%. 2022 rate hikes — S&P 500 fell 18%, gold fell only 1%. Gold consistently provides at least partial protection when stock markets are stressed." },
        { label: "Commodity ETFs", heading: "Broad commodity exposure for inflation protection", body: "Beyond gold, commodity ETFs invest in oil, industrial metals such as copper and aluminium, agricultural products such as wheat and corn, and precious metals. Commodities are real assets whose prices tend to rise with inflation — unlike bonds which lose real value when inflation increases. In periods of rising inflation, commodity ETFs often significantly outperform both stocks and bonds.", highlight: "A small allocation to commodities of 5 to 10% has historically improved portfolio risk-adjusted returns during inflationary periods — like the 1970s and 2021 to 2022. For most investors, gold alone provides sufficient commodity exposure.", example: "Commodity ETF options: Xetra-Gold with TER 0.36% — physical gold backed 1 to 1 by gold bullion. iShares Physical Gold with TER 0.12% — physical gold. iShares Diversified Commodity Swap with TER 0.19% — broad commodity index. For most investors, one of the gold ETFs is sufficient." },
        { label: "Deep dive", heading: "How much gold to hold and when", body: "Most portfolio construction research suggests 5 to 10% gold allocation for investors seeking diversification benefits. Ray Dalio's All Weather Portfolio holds 7.5%. Harry Browne's Permanent Portfolio holds 25% — an extreme allocation. The research broadly agrees: small gold allocations improve risk-adjusted returns; large allocations significantly reduce long-term returns as gold underperforms equities over multi-decade periods.", highlight: "Gold allocation guideline: 5% for investors prioritizing maximum growth with minimal crisis insurance. 7 to 10% for balanced investors seeking genuine diversification. Above 10% only for investors with specific inflation or crisis concerns — and at the cost of long-term return.", example: "Long-term gold return reality: From 1973 to 2023, gold delivered approximately 7.7% annual return. MSCI World delivered approximately 11% annual return. Gold's 3.3% annual underperformance over 50 years is significant — but its negative correlation to stocks during crises justifies a small allocation for diversification purposes." }
      ],
      quiz: { question: "What is the primary investment role of gold in a diversified portfolio?", options: [{ text: "To generate high dividend income for regular cash flow", correct: false }, { text: "To act as inflation protection and a portfolio stabilizer during financial crises", correct: true }, { text: "To replace stocks as the primary long-term growth driver", correct: false }, { text: "To eliminate all portfolio volatility and risk", correct: false }], correctFeedback: "Correct! Gold serves as portfolio insurance — inflation protection and crisis stability. It is not a growth investment but a diversifier that does something completely different from stocks during specific stress scenarios.", wrongFeedback: "Gold is portfolio insurance. It protects against inflation and provides stability during financial crises. It is not expected to match equity long-term returns — its value is in doing something different from stocks when stocks struggle most." }
    }
  },
  {
    id: 116, chapter: 2,
    title: "Leverage — The Double-Edged Sword", icon: "⚡", desc: "Understand leverage and why beginners should avoid it.",
    tags: ["Risk", "9 min"], xp: 65, gold: 14,
    lesson: {
      heading: "Amplified gains — and catastrophic losses",
      intro: "Leverage is borrowed money used to amplify investment exposure. It sounds attractive: invest 10,000 euros, control 20,000 euros of assets, potentially earn twice the returns. But leverage works equally in reverse — a 50% decline in leveraged assets can wipe out your entire investment.",
      blocks: [
        { label: "How leverage destroys value", heading: "The mathematics of volatility decay", body: "A 2x leveraged ETF attempts to deliver twice the daily return of its index. This works mathematically over a single day. Over multiple days, something sinister occurs called volatility decay. Example: Day 1, index rises 10% — leveraged ETF rises 20% to 120 euros. Day 2, index falls 10% — leveraged ETF falls 20% to 96 euros. Net result: index is at 99 euros, nearly flat. Leveraged ETF is at 96 euros. Over longer periods, this decay compounds and leveraged ETFs systematically underperform their target multiple.", highlight: "Volatility decay is a mathematical certainty, not a risk. It means a 2x leveraged ETF will almost always underperform exactly 2x the underlying index over periods longer than a few days — especially in volatile markets. The decay is proportional to daily volatility squared.", example: "Real volatility decay example: 3x NASDAQ ETF during NASDAQ's 2021 to 2022 decline — NASDAQ fell approximately 33%. A static 3x exposure would predict a 99% loss. The actual ETF fell approximately 80% due to daily rebalancing and decay. To break even from minus 80%, you need plus 400% return. Most investors never recovered." },
        { label: "The leverage trap", heading: "Why leverage destroys retail investor wealth", body: "Leverage is designed for professional traders who manage positions daily, hedge precisely and take profits within hours or days. For individual investors who hold positions for weeks or months, leverage is a wealth destroyer. The psychological impact makes it worse: leveraged ETFs rise fast in bull markets, creating the feeling of genius. Then they crash catastrophically, creating devastating losses. The pattern lures investors at market tops and destroys them in corrections.", highlight: "Leveraged ETFs are designed for professional traders managing daily positions — not for long-term investors. Using them for buy-and-hold investing is a fundamental misapplication of a dangerous instrument.", example: "TQQQ from November 2021 to December 2022: An investor who bought at the peak and held would have seen their 10,000 euro investment fall to approximately 2,000 euros — an 80% loss. To recover, they need TQQQ to rise 400% from that level. Many investors panic-sold at minus 60 to 70%, crystallizing enormous losses." },
        { label: "Deep dive", heading: "When leverage can make sense — for the very few", body: "Leverage is not universally wrong — it simply requires sophisticated management. Mortgage leverage on a primary residence is the most common and usually appropriate form. Some evidence suggests modest leverage of 1.5x on a diversified portfolio — through margin borrowing at low rates — can improve long-term returns for investors with extreme risk tolerance and genuine understanding. But for the vast majority of individual investors, a simple unlevered ETF portfolio produces superior outcomes with dramatically less risk.", highlight: "The correct leverage for 95% of individual investors is exactly zero. The opportunity to earn slightly higher returns through leverage is not worth the psychological and financial catastrophe that leverage reliably produces when markets decline significantly.", example: "Appropriate versus inappropriate leverage: Appropriate — a mortgage to buy your primary residence, a productive use that hedges against rising rents. Inappropriate — a 3x NASDAQ ETF hoping to accelerate wealth building. The first is a strategic use of debt. The second is speculation that reliably destroys retail investor wealth." }
      ],
      quiz: { question: "Why are leveraged ETFs generally inappropriate for long-term investors?", options: [{ text: "They are illegal in most European countries for retail investors", correct: false }, { text: "Volatility decay means they systematically lose value relative to their target multiple over time in volatile markets", correct: true }, { text: "They hold bonds instead of stocks making them lower return", correct: false }, { text: "They have very high TERs that eliminate all potential gains", correct: false }], correctFeedback: "Correct! Volatility decay is a mathematical certainty that makes leveraged ETFs systematically underperform their target multiple over multi-day holding periods — especially in volatile markets.", wrongFeedback: "Volatility decay: the daily rebalancing mechanism of leveraged ETFs causes them to systematically underperform their intended multiple over periods longer than one day. In volatile markets, this decay can be catastrophic for long-term holders." }
    }
  },
  {
    id: 117, chapter: 2,
    title: "Sequence of Returns Risk", icon: "🎲", desc: "The retirement risk nobody talks about — and how to protect yourself.",
    tags: ["Retirement", "9 min"], xp: 75, gold: 17,
    lesson: {
      heading: "When the order of returns matters enormously",
      intro: "Here is a surprising mathematical reality: two investors with identical portfolios, identical average returns and identical withdrawal amounts can end up with dramatically different outcomes in retirement — simply because the order of good and bad years differed. Sequence of returns risk is one of the most important concepts for anyone approaching retirement.",
      blocks: [
        { label: "What is sequence risk?", heading: "Why bad years at the beginning are catastrophic", body: "During accumulation, poor early returns are actually beneficial — you buy more shares cheaply. But in retirement, when you are withdrawing money, poor early returns are devastating. A 40% market decline in year one of retirement, combined with your 4% withdrawal, forces you to sell shares at their lowest price. You permanently reduce the number of shares participating in the eventual recovery. The portfolio never fully recovers even when markets do.", highlight: "Two portfolios with identical 20-year average returns of 7% can produce outcomes ranging from financial security to running out of money — depending entirely on whether the bad years come at the beginning or end of the withdrawal period.", example: "Sequence risk demonstration: Both investors have 500,000 euros and withdraw 25,000 per year. Investor A: first five years return plus 20%, plus 15%, plus 10%, plus 5%, minus 40%. Final value after 20 years: approximately 870,000 euros. Investor B: first five years return minus 40%, plus 5%, plus 10%, plus 15%, plus 20%. Final value after 20 years: approximately 370,000 euros. Same returns, opposite sequence, 500,000 euro difference." },
        { label: "Protection strategies", heading: "How to defend against sequence risk", body: "Three proven strategies exist. Cash buffer: keep 1 to 2 years of living expenses in cash outside your investment portfolio. During market downturns, live from cash while investments recover. Bond ladder: hold bonds maturing in sequence so each year's expenses are covered by a maturing bond. Flexible withdrawals: reduce withdrawal amounts during down markets — if your portfolio falls 20%, reduce withdrawals by 10 to 15% to preserve capital.", highlight: "A cash buffer of 1 to 2 years of living expenses is the simplest and most effective protection against sequence of returns risk. It eliminates the need to sell investments at depressed prices during the most vulnerable years of retirement.", example: "Cash buffer in practice: You retire with 750,000 euros and need 30,000 euros per year. Keep 60,000 euros — 2 years — in a high-yield savings account. In year 1, market falls 40%. Live from cash savings — no portfolio selling. By year 3, market recovers 60%. Portfolio stabilizes. You weathered the crash without permanently depleting shares." },
        { label: "Deep dive", heading: "Dynamic withdrawal strategies — the research frontier", body: "Modern retirement research has moved beyond the simple 4% rule to dynamic withdrawal strategies that dramatically improve portfolio longevity. The Guardrails Strategy: set upper and lower withdrawal limits. If portfolio grows significantly, increase withdrawals. If portfolio falls to a trigger point, reduce withdrawals. This flexibility allows sustainable withdrawal rates of 5 to 5.5% versus the standard 4% — potentially enabling earlier retirement with the same portfolio size.", highlight: "The most robust withdrawal strategies are flexible — they increase spending in good years and reduce it in bad ones. This flexibility is worth approximately 1% in additional safe withdrawal rate compared to rigid fixed-amount withdrawals.", example: "Guardrails example: Target withdrawal 30,000 euros per year from 750,000 euros at 4%. Upper guardrail: if portfolio exceeds 900,000 euros, increase to 36,000 euros. Lower guardrail: if portfolio falls below 600,000 euros, reduce to 24,000 euros. This flexibility adds decades of portfolio longevity compared to rigid 30,000 euros regardless of market conditions." }
      ],
      quiz: { question: "What is a cash buffer and why is it the most effective protection against sequence of returns risk?", options: [{ text: "Extra stocks held in reserve to buy during market declines", correct: false }, { text: "1 to 2 years of living expenses in cash that prevents selling investments at depressed prices during downturns", correct: true }, { text: "A percentage of bonds kept liquid for unforeseen expenses", correct: false }, { text: "Government pension payments received before investment income begins", correct: false }], correctFeedback: "Exactly right! A cash buffer provides spending money during market downturns without forcing the sale of investments at their lowest prices — preserving more shares to participate in the eventual recovery.", wrongFeedback: "Cash buffer = 1 to 2 years of living expenses held separately from investments. During a market crash in early retirement, you live from cash while your investment portfolio recovers — without selling shares at depressed prices." }
    }
  },
  {
    id: 118, chapter: 2,
    title: "Tax-Loss Harvesting", icon: "🌾", desc: "A legal strategy to reduce your tax bill using market downturns.",
    tags: ["Tax", "9 min"], xp: 70, gold: 16,
    lesson: {
      heading: "Turn losses into tax savings",
      intro: "Tax-loss harvesting sounds counterintuitive: deliberately realizing losses on your investments to reduce your tax bill. But when executed properly, it converts what feels like a failure into a financial advantage — using the tax system's rules to your benefit while maintaining your intended market exposure.",
      blocks: [
        { label: "How it works", heading: "Crystallize losses to generate tax credits", body: "When you sell an ETF that has declined in value, you crystallize a capital loss. This loss can be used to offset capital gains from other investments — reducing your tax liability. The critical step: immediately after selling the losing ETF, buy a similar but not identical ETF that tracks a comparable index. This maintains your market exposure while generating a valuable tax loss on paper.", highlight: "Tax-loss harvesting does not eliminate taxes — it defers them. When you eventually sell the replacement ETF, you will pay tax on the larger gain since you bought at a lower price. But tax deferral is genuinely valuable: money not paid in taxes today continues to compound for years or decades.", example: "Example: You hold iShares MSCI World IWDA and it falls 20%, creating a paper loss of 10,000 euros. You sell IWDA, crystallizing the loss. Immediately buy Xtrackers MSCI World XDWD — tracks the same index but is technically a different fund. Tax authority sees a 10,000 euro loss you can use to offset gains. Your market exposure remains unchanged." },
        { label: "When to harvest", heading: "Opportunities and practical implementation", body: "Tax-loss harvesting opportunities arise whenever significant market declines occur. The COVID crash of 2020, the 2022 rate-hike correction, any major regional decline — all created tax-loss harvesting opportunities. The key timing: harvest the loss when the decline is significant enough to justify the transaction, and replace immediately to avoid being out of the market during any recovery.", highlight: "Tax-loss harvesting is most valuable for investors with large portfolios generating significant annual gains, or investors in high-gain years from other sources such as business sales, property sales or large bonuses who want to offset those gains.", example: "Practical German implementation: You sell 50,000 euros of MSCI World ETF at a 12,000 euro loss. Tax credit: 26.375% of 12,000 euros equals approximately 3,165 euros in tax savings now. You immediately buy an equivalent ETF. Net result: identical market exposure, 3,165 euros in tax savings this year that continue to compound." },
        { label: "Deep dive", heading: "Wash sale rules and implementation pitfalls", body: "Different tax authorities have different rules to prevent investors from immediately buying back the same security they sold for a loss. In Germany, the rules are less strict than in the US — but you must ensure you are buying a genuinely different ETF to be safe. Selling IWDA and buying IWDA one day later is not effective tax-loss harvesting. You must buy a fund tracking a different index — or the same index from a different provider — to maintain the distinct security requirement.", highlight: "Effective tax-loss harvesting pairs: MSCI World IWDA can be swapped for FTSE Developed World VEVE — a different index with similar exposure. MSCI EM EMIM can be swapped for FTSE Emerging Markets VFEM. These swaps maintain market exposure while creating distinct securities for tax purposes.", example: "Advanced strategy — direct indexing: Sophisticated investors with very large portfolios of 500,000 euros or more can harvest losses on individual stocks within a custom portfolio, generating far more loss harvesting opportunities than ETF swaps provide. Vanguard and others are developing accessible versions of this for retail investors in Europe." }
      ],
      quiz: { question: "What is the primary purpose of tax-loss harvesting?", options: [{ text: "To permanently eliminate all capital gains taxes on investment profits", correct: false }, { text: "To realize losses that offset current capital gains, reducing or deferring the immediate tax bill", correct: true }, { text: "To switch to better-performing ETFs using market downturns as an excuse", correct: false }, { text: "To comply with government regulations requiring annual portfolio realization", correct: false }], correctFeedback: "Correct! Tax-loss harvesting crystallizes losses to offset gains — reducing or deferring your tax bill while maintaining market exposure through an equivalent replacement ETF.", wrongFeedback: "Tax-loss harvesting realizes losses to offset current gains. Taxes are deferred, not eliminated — when you sell the replacement ETF you pay on the larger gain. But deferral is valuable: tax money that stays invested continues to compound." }
    }
  },
  {
    id: 119, chapter: 2,
    title: "Cryptocurrency — What You Need to Know", icon: "₿", desc: "An objective look at crypto as an asset class for your portfolio.",
    tags: ["Alternative", "9 min"], xp: 70, gold: 15,
    lesson: {
      heading: "The most controversial asset class — objectively examined",
      intro: "Cryptocurrency generates more heated debate than almost any other financial topic. Enthusiasts claim it is the future of money. Critics call it pure speculation. Both perspectives contain partial truth. An objective understanding — free from both hype and dismissal — is what a serious investor needs.",
      blocks: [
        { label: "What crypto actually is", heading: "The technology, the assets and the speculation", body: "Cryptocurrency is digital money secured by cryptography on decentralized computer networks called blockchains. Bitcoin, created in 2009, has a mathematically fixed supply of 21 million coins — designed to be digitally scarce like gold. Ethereum enables programmable financial contracts and decentralized applications. Unlike stocks, cryptocurrencies do not represent ownership in a productive business with earnings. Unlike bonds, they pay no interest. Their price is driven entirely by supply, demand and narrative.", highlight: "Crypto is not an investment in a productive asset — it is speculation on a technology and the narratives surrounding it. This is fundamentally different from owning a diversified portfolio of companies that generate real profits and pay dividends.", example: "Bitcoin versus MSCI World: MSCI World rises long-term because 1,600 underlying companies generate increasing profits year after year. Apple earns more. Microsoft earns more. ASML earns more. Bitcoin rises when more people want it and falls when fewer do. There is no underlying earnings engine — only supply, demand and belief." },
        { label: "Risk and appropriate allocation", heading: "If you choose to include crypto in your portfolio", body: "Crypto is extraordinarily volatile — drawdowns of 70 to 90% are not rare, they are historical facts. Bitcoin fell 84% from its 2017 peak to its 2018 low. It fell 77% from its 2021 peak to its 2022 low. Most altcoins fell 95% or more in each cycle. If you choose to include crypto, it should be a maximum of 1 to 5% of your total portfolio — an amount you could afford to lose entirely without affecting your financial goals.", highlight: "Only invest in crypto what you could afford to lose completely without losing sleep, changing your retirement timeline or compromising your financial goals. Treat it as high-risk speculation, never as a core investment.", example: "Appropriate approach: 200,000 euro total portfolio. Core: 190,000 euros in MSCI World and EM ETFs — 95%. Speculative: 10,000 euros in Bitcoin — 5%. Scenario: Bitcoin falls 90%. You lose 9,000 euros — painful but not financially devastating. Your 190,000 euro ETF core continues compounding. You have not compromised your financial future for a speculative bet." },
        { label: "Deep dive", heading: "Crypto in institutional portfolios and the future", body: "Institutional adoption of Bitcoin has grown significantly. BlackRock, Fidelity and others now offer Bitcoin ETFs in the US. Some pension funds hold small Bitcoin allocations as a portfolio diversifier. The correlation of Bitcoin to traditional assets has been inconsistent — sometimes positive with stocks as a risk-on asset, sometimes negative as a safe haven. Academic research suggests small allocations of 1 to 3% have historically improved portfolio Sharpe ratios by adding an uncorrelated return stream.", highlight: "The most credible case for a small Bitcoin allocation is as a genuine diversifier with low correlation to traditional assets. This requires accepting 70 to 90% drawdown risk on the allocated amount and a very long holding horizon of 10 or more years.", example: "Pragmatic framework: If the maximum loss scenario for your crypto allocation — losing 95% of it — would not materially affect your financial plan, a 1 to 3% allocation is defensible for investors with high risk tolerance and genuine belief in the technology. If any crypto loss would cause stress or plan revision, the correct allocation is zero." }
      ],
      quiz: { question: "What percentage of a portfolio is commonly recommended as a maximum crypto allocation for risk-aware investors?", options: [{ text: "25 to 50% — crypto offers the highest long-term expected returns", correct: false }, { text: "10 to 20% — a significant allocation for significant potential upside", correct: false }, { text: "1 to 5% — a speculative allocation you could afford to lose entirely", correct: true }, { text: "Crypto should form the majority for young investors with long horizons", correct: false }], correctFeedback: "Correct! Maximum 1 to 5% in crypto — only money you could afford to lose completely. This caps the downside while allowing participation in potential upside without compromising your financial plan.", wrongFeedback: "Maximum 1 to 5% in crypto. Only invest money you could afford to lose entirely. Bitcoin has historically fallen 75 to 90% in each major correction. A small allocation limits damage while allowing participation in potential upside." }
    }
  },
  {
    id: 120, chapter: 2,
    title: "Building a Million Euro Portfolio", icon: "💎", desc: "The math behind reaching seven figures through consistent investing.",
    tags: ["Goals", "9 min"], xp: 80, gold: 20,
    lesson: {
      heading: "One million euros — the math is simpler than you think",
      intro: "A million-euro portfolio sounds like a goal for the lucky or the exceptionally talented. The mathematics of compound interest reveals something different: for most people in developed countries with stable employment, reaching a million euros is not just possible — it is the predictable result of consistent, patient investing over sufficient time.",
      blocks: [
        { label: "The mathematics", heading: "How compound interest creates million-euro portfolios", body: "At 7% average annual return — consistent with long-term historical MSCI World performance — 500 euros per month invested for 35 years produces approximately 960,000 euros. With an initial 10,000 euro lump sum, the same monthly contributions reach approximately 1,100,000 euros. The mathematical reality: of that million euros, you personally invested approximately 220,000 euros. Compound interest created the other 880,000 euros — from nothing, simply by allowing time to work.", highlight: "A million-euro portfolio is achievable on a middle-class income. The ingredient most people underestimate — and most consistently underuse — is time. Not income, not investment skill, not financial sophistication. Time.", example: "The power of starting amounts: 100 euros per month from age 25 to 65 at 7% equals 264,000 euros. 300 euros per month equals 793,000 euros. 500 euros per month equals 1,322,000 euros. The key: same 40 years, same 7% return. The only variable is how much you contribute. At 500 euros per month — less than many people spend on dining and entertainment — you build over a million euros." },
        { label: "Different paths to the same destination", heading: "Starting at different ages", body: "The path to a million euros looks different depending on when you start — but remains achievable from almost any realistic starting point. Starting at 20 with 150 euros per month reaches approximately 1,000,000 euros by age 65. Starting at 30 with 300 euros per month reaches approximately 1,000,000 by age 65. Starting at 35 with 500 euros per month reaches approximately 1,000,000 by age 65. Starting at 40 with 900 euros per month reaches approximately 1,000,000 by age 65. Each decade of delay approximately doubles the required monthly contribution.", highlight: "Every decade of delay roughly doubles the monthly investment required to reach the same goal. Starting at 25 versus 35 is not a 100 euro per month difference — it is a 300 euro per month difference. The cost of waiting is not measured in days. It is measured in decades of compound growth foregone.", example: "The cruel math of late starting: To reach 1,000,000 euros by age 65 at 7%: Start at 25 requires 147 euros per month. Start at 30 requires 230 euros per month. Start at 35 requires 365 euros per month. Start at 40 requires 590 euros per month. Start at 45 requires 980 euros per month. Each 5-year delay increases the required monthly contribution by approximately 60 to 65%." },
        { label: "Deep dive", heading: "Beyond a million — the compound acceleration phase", body: "Once a portfolio reaches significant size, the compound returns in absolute euros dwarf the contributions. A 500,000 euro portfolio generating 7% annual returns produces 35,000 euros per year in growth — more than many people save annually from their salary. At 1,000,000 euros, the annual growth is 70,000 euros. At 2,000,000 euros, it is 140,000 euros. This is the compound acceleration phase — where your portfolio grows faster than you can save.", highlight: "The endgame of consistent investing: your portfolio begins growing faster than you can save. At this point, the most important action is simply not to interrupt the compounding — not panic selling, not withdrawing prematurely, not shifting to overly conservative investments that reduce returns.", example: "The million-euro milestone timeline at 7%: After 10 years of 500 euros per month: 86,000 euros — 9% of goal. After 20 years: 260,000 euros — 26% of goal. After 30 years: 567,000 euros — 57% of goal. After 35 years: 876,000 euros — 88% of goal. After 40 years: 1,312,000 euros. The final 5 years produce more wealth than the first 25 years combined. This is the compound acceleration." }
      ],
      quiz: { question: "Approximately how much per month, starting at age 25, is needed to reach 1,000,000 euros by age 65 at 7% annual return?", options: [{ text: "50 euros per month", correct: false }, { text: "147 euros per month", correct: true }, { text: "1,000 euros per month", correct: false }, { text: "2,000 euros per month", correct: false }], correctFeedback: "Correct! Approximately 147 euros per month from age 25, at 7% annual return, reaches 1,000,000 euros by age 65. Less than 5 euros per day invested consistently for 40 years creates a million-euro portfolio.", wrongFeedback: "Approximately 147 euros per month from age 25 at 7% reaches 1,000,000 by age 65. Less than 5 euros per day. The secret is not the amount — it is the 40 years of compound interest working on every euro you invest." }
    }
  },
  {
    id: 121, chapter: 2,
    title: "Inheritance and Wealth Transfer", icon: "🏰", desc: "Plan for the efficient transfer of your wealth to future generations.",
    tags: ["Planning", "9 min"], xp: 70, gold: 15,
    lesson: {
      heading: "Build wealth that outlasts you",
      intro: "Building wealth is one challenge. Preserving it and transferring it efficiently across generations is another. Germany has specific inheritance tax rules, gifting strategies and estate planning mechanisms that — used correctly — can transfer substantial wealth to the next generation completely tax-free.",
      blocks: [
        { label: "German inheritance tax basics", heading: "Erbschaftsteuer and tax-free allowances", body: "In Germany, inheritances are subject to Erbschaftsteuer. The tax rate ranges from 7 to 50% depending on the relationship and amount. But the allowances are generous and often overlooked. Spouses receive a 500,000 euro tax-free allowance. Children receive 400,000 euros tax-free from each parent. Grandchildren receive 200,000 euros tax-free. Crucially, these allowances reset every 10 years — meaning a parent can gift 400,000 euros to each child every 10 years completely tax-free.", highlight: "The 10-year gifting rule is one of the most powerful legal wealth transfer tools available to German families. By gifting strategically every decade, a family with significant wealth can transfer millions tax-free across generations.", example: "10-year gifting strategy: Parent A gifts 400,000 euros to child at age 45. Parent B gifts 400,000 euros to same child at age 45. Total: 800,000 euros transferred tax-free. 10 years later at age 55: each parent gifts again. Another 800,000 euros transferred. At age 65: final round. Total over 20 years: 2,400,000 euros transferred completely tax-free through systematic gifting within allowances." },
        { label: "Estate planning fundamentals", heading: "Wills, beneficiaries and asset protection", body: "Without a valid will, German intestate succession law applies — which may not reflect your wishes. German intestate law prioritizes spouse, then children, then parents, then siblings. If you are in a registered partnership rather than legal marriage, your partner may receive nothing without a specific will. A will is the foundation of any estate plan and requires proper notarization in Germany.", highlight: "Writing a will is one of the most important financial acts you can take for the people you love. It costs typically 300 to 1,000 euros for notarization, takes a few hours to prepare and ensures your assets are distributed according to your wishes rather than legal defaults.", example: "Estate planning minimum checklist: Write a notarized will specifying beneficiaries for all major assets. Create a list of all financial accounts and investments with access information. Discuss your wishes with your partner and adult children. Consider a Vorsorgevollmacht — power of attorney — for healthcare and financial decisions if you become incapacitated. Review every 5 years." },
        { label: "Deep dive", heading: "Advanced wealth transfer strategies", body: "Beyond direct gifting, several additional strategies optimize wealth transfer. Life insurance: death benefits pass outside the estate and can fund inheritance tax payments. Testamentary trusts — Testamentsvollstreckung — appoint a trustee to manage assets for minor children. Property transfers: gifting property with a life right — Nießbrauch — reduces the gift's assessed value, enabling tax-free transfer of higher-value assets.", highlight: "The most effective estate planning starts 20 to 30 years before you expect to need it. Systematic gifting within annual allowances, combined with a clear will, can legally transfer wealth of multiple millions completely tax-free over two decades.", example: "Nießbrauch strategy: Parent gifts an apartment worth 600,000 euros to their child while retaining the right to live in it or receive rental income. The gift's assessed value is reduced by the value of the retained life right — potentially bringing it below the 400,000 euro tax-free threshold. The child owns the appreciating asset; the parent retains use. Worth discussing with a tax advisor for significant property holdings." }
      ],
      quiz: { question: "How much can a child inherit tax-free from each parent in Germany, and how often does this allowance reset?", options: [{ text: "100,000 euros from each parent, resetting every 5 years", correct: false }, { text: "400,000 euros from each parent, resetting every 10 years", correct: true }, { text: "500,000 euros from each parent, resetting every 15 years", correct: false }, { text: "1,000,000 euros from each parent, resetting every 20 years", correct: false }], correctFeedback: "Correct! Children can receive 400,000 euros tax-free from each parent, and this allowance resets every 10 years. Over two decades, a couple can transfer 1,600,000 euros to a child completely tax-free through systematic gifting.", wrongFeedback: "In Germany, children can receive 400,000 euros tax-free from each parent, and this allowance resets every 10 years. Systematic gifting within these allowances is one of the most powerful legal wealth transfer strategies available." }
    }
  },
  {
    id: 122, chapter: 2,
    title: "The Investment Policy Statement", icon: "📋", desc: "Write your personal investing rulebook before you need it.",
    tags: ["Planning", "9 min"], xp: 70, gold: 15,
    lesson: {
      heading: "Rules written in calm, followed in chaos",
      intro: "Professional institutional investors — pension funds, endowments, sovereign wealth funds — all operate under formal Investment Policy Statements that define their objectives, constraints and decision-making rules. Individual investors who use the same tool gain a powerful behavioral advantage: pre-committed rules that prevent emotional decisions during the inevitable market crises they will face over a lifetime of investing.",
      blocks: [
        { label: "What your IPS contains", heading: "The seven components of an effective IPS", body: "A complete Investment Policy Statement contains: your financial goals with specific amounts and target dates, your time horizon for each goal, your target asset allocation and why you chose it, your rebalancing rules — when and how you rebalance, your savings plan commitments — how much you invest monthly, what you will NOT do — explicit commitments against panic selling and market timing, and your plan for life events such as marriage, children, job loss and retirement.", highlight: "The most important section of your IPS is what you commit not to do. Writing I will not sell my ETFs during a market decline — and signing it — makes you significantly less likely to abandon your strategy when markets fall 40% and the emotional pressure to sell is overwhelming.", example: "Sample IPS excerpt: My target allocation is 80% MSCI World IWDA, 20% MSCI Emerging Markets EMIM. I invest 500 euros per month automatically on the 1st. I rebalance annually in January using new contributions only. I will not sell any ETF unless my financial goals change fundamentally. If markets fall more than 20%, I will read this document before making any portfolio decision." },
        { label: "Why it works", heading: "The behavioral science of pre-commitment", body: "Pre-commitment is the most powerful tool in behavioral economics for changing future behavior. Research shows that people who explicitly commit to future actions — especially in writing — are dramatically more likely to follow through, even when circumstances make following through emotionally difficult. Your IPS is a contract with your future self — written by you at your most rational, to be honored by you at your most emotional.", highlight: "Odysseus had himself tied to the mast before sailing past the Sirens — because he knew that when he heard their song, his rational judgment would be overwhelmed. Your Investment Policy Statement is the rope. The market crash is the Siren song. Write it now.", example: "Pre-commitment research: A study of retirement plan participants found that those who pre-committed to specific contribution increases triggered by future salary raises saved 300% more over 4 years than a control group — without any reduction in current spending. Pre-commitment creates outcomes that neither willpower nor incentives alone can produce." },
        { label: "Deep dive", heading: "Reviewing and updating your IPS", body: "Your IPS should be a living document reviewed annually and updated when life changes significantly. Events that warrant an IPS review: marriage or divorce, children or grandchildren, significant inheritance received, job loss or major income change, approach of retirement within 10 years, major health change. What should NOT trigger an IPS review: market crashes, market booms, media predictions, friends' investment stories, feelings about the economy.", highlight: "Review your IPS because your life changed — not because markets changed. Market volatility is the most common reason investors abandon their strategy, and the most reliably wrong reason to do so. Financial circumstances are the appropriate trigger for strategy changes.", example: "Annual IPS review process: Spend 30 minutes once per year. Check actual allocation versus target. Confirm savings plan amount still matches goals. Verify goals have not materially changed. Update target amounts for time elapsed and any new goals. Read the entire document. Sign and date it. File it somewhere you will find it when markets crash." }
      ],
      quiz: { question: "What is the primary purpose of writing an Investment Policy Statement?", options: [{ text: "To legally protect yourself from investment losses in court", correct: false }, { text: "To pre-commit to rational rules that prevent emotional decisions during market volatility", correct: true }, { text: "To satisfy broker account opening requirements", correct: false }, { text: "To predict future market movements and plan accordingly", correct: false }], correctFeedback: "Exactly right! An IPS is behavioral finance in action — pre-committing to rational rules before emotional situations arise. Written in calm, followed in chaos.", wrongFeedback: "An IPS works through pre-commitment: you write rational rules when calm and commit to following them when emotional market events make abandoning those rules feel tempting. The document is your rational self speaking to your emotional future self." }
    }
  },
  {
    id: 123, chapter: 2,
    title: "Inflation-Linked Bonds", icon: "🔗", desc: "Bonds that protect your purchasing power against rising prices.",
    tags: ["Bonds", "9 min"], xp: 65, gold: 14,
    lesson: {
      heading: "Bonds that grow with inflation",
      intro: "Standard government bonds pay a fixed interest rate — attractive when inflation is low, deeply problematic when inflation rises. If you hold a bond paying 2% interest and inflation rises to 8%, your real return is negative 6%. Inflation-linked bonds solve this fundamental problem by adjusting both principal and interest payments in line with inflation.",
      blocks: [
        { label: "How they work", heading: "The mechanics of inflation protection", body: "Inflation-linked bonds — called Linkers in market parlance, or Inflationsanleihen in Germany — have their principal value adjusted periodically by the official inflation rate. If you invest 10,000 euros and inflation runs at 4% for the year, your bond's principal becomes 10,400 euros. Interest is paid on the adjusted principal. At maturity, you receive the inflation-adjusted principal — guaranteed to equal or exceed what you invested in real terms.", highlight: "Inflation-linked bonds provide something no standard bond can: a guaranteed real return adjusted for inflation. In exchange for this guarantee, they typically offer lower nominal yields than standard bonds — the inflation protection premium is paid through accepting lower starting income.", example: "Concrete example: You buy a 10-year German inflation-linked bond at a real yield of 0.5% with 10,000 euros. Over 10 years, cumulative inflation is 35%. Your principal adjusts to 13,500 euros. You receive 0.5% annual interest on the growing principal throughout. At maturity: 13,500 euros returned plus accumulated interest. Your purchasing power is fully maintained regardless of what inflation did." },
        { label: "When to use them", heading: "Portfolio role and appropriate allocation", body: "Inflation-linked bonds are most valuable in three scenarios: when inflation is expected to be higher than market consensus, when you are approaching retirement and need to protect purchasing power of your fixed income, and as a hedge against unexpected inflation spikes. For investors in their 30s and 40s with decades of equity compounding ahead, a small allocation of 5 to 10% of the bond portion suffices. For those approaching retirement with larger bond allocations, a higher proportion in inflation-linked form makes more sense.", highlight: "For young investors with small bond allocations, inflation-linked bonds are optional. For those approaching retirement who depend on bond income, they are an important tool for ensuring that income maintains its real purchasing power over a potentially 30-year retirement.", example: "Practical allocation: Investor age 55, 5 years from retirement, 30% bond allocation of 90,000 euros from 300,000 total. Consider: 60,000 euros in standard government bonds plus 30,000 euros in inflation-linked bonds. This provides yield stability from standard bonds and inflation protection from linkers. As retirement approaches, gradually increase the linker proportion." },
        { label: "Deep dive", heading: "The break-even inflation rate and how to use it", body: "The key analytical concept for inflation-linked bonds is the break-even inflation rate — the inflation rate at which inflation-linked and standard bonds produce identical real returns. If 10-year standard German bonds yield 3% and 10-year German linkers yield 0.5%, the break-even is 2.5%. If actual inflation exceeds 2.5%, linkers outperform. Below 2.5%, standard bonds win. This lets you make an informed decision about whether inflation protection is worth the lower nominal yield.", highlight: "Compare the break-even inflation rate to your own inflation expectations before buying inflation-linked bonds. If break-even is 2% and you expect 4% inflation, linkers are attractive. If break-even is 3% and you expect 2%, standard bonds offer better value.", example: "European linker ETFs: IBCI from iShares Euro Inflation Linked Government Bond ETF at TER 0.09% — diversified across eurozone inflation-linked government bonds. IBTS from iShares TIPS UCITS ETF at TER 0.10% — US TIPS for dollar inflation exposure. Both provide liquid, diversified, low-cost access to inflation protection for European investors." }
      ],
      quiz: { question: "How do inflation-linked bonds protect investors against rising prices?", options: [{ text: "They pay a very high fixed interest rate that exceeds most inflation scenarios", correct: false }, { text: "Their principal value is adjusted upward with official inflation rates, guaranteeing real purchasing power", correct: true }, { text: "They are backed by physical commodities whose prices rise with inflation", correct: false }, { text: "They automatically convert to equities when inflation exceeds 5%", correct: false }], correctFeedback: "Correct! Inflation-linked bonds adjust their principal with the official inflation rate. If you invest 10,000 euros and inflation runs 30% over 10 years, your principal becomes 13,000 euros — maintaining purchasing power regardless of what inflation does.", wrongFeedback: "Inflation-linked bonds adjust their principal value in line with official inflation. At maturity, you receive your original purchasing power back plus any real yield above inflation. Standard bonds cannot make this guarantee." }
    }
  },
  {
    id: 124, chapter: 2,
    title: "Government Bonds and Safe Haven Assets", icon: "🏛️", desc: "Safe haven assets explained for the conservative investor.",
    tags: ["Bonds", "9 min"], xp: 65, gold: 14,
    lesson: {
      heading: "The safest investments in the world",
      intro: "When financial crises strike — banking failures, market crashes, geopolitical conflicts — certain assets consistently attract capital from around the world. These are called safe haven assets: investments that hold or increase their value when most other assets are falling.",
      blocks: [
        { label: "Government bonds as safe havens", heading: "Why sovereign debt is the ultimate safe asset", body: "Government bonds from stable, developed countries are considered among the safest investments in existence. A German government bond — Bundesanleihe or Bund — is essentially a loan to the German government: an institution that has taxing authority over 84 million people, a central bank and a long history of debt repayment. The probability of default on a German Bund is considered negligible. During every major financial crisis, investors globally flee to German Bunds — pushing prices up and yields down as demand surges.", highlight: "German Bunds are the gold standard of safety in European fixed income. When global investors are panicked, they buy Bunds — which is why Bund yields fell into negative territory during the 2020 COVID crisis. Investors were literally paying Germany for the privilege of safety.", example: "Flight to safety in action: During the 2008 financial crisis, the US 10-year Treasury yield fell from 4.5% to 2.1% as global investors poured money into safe government bonds. Bond prices rose dramatically while stocks fell 57%. A portfolio containing 20 to 30% government bonds fell approximately 30 to 35% instead of 57% — the bonds did exactly what they were supposed to do." },
        { label: "Bond ETFs for safe haven exposure", heading: "Practical access to government bonds", body: "Buying individual government bonds requires significant minimum investments and active management of maturities. Bond ETFs provide diversified, liquid, low-cost access to government bond markets. A global government bond ETF holds bonds from multiple governments across different maturities — providing both credit diversification and interest rate diversification. For the fixed income portion of a long-term portfolio, a simple global government bond ETF is sufficient for most investors.", highlight: "For most individual investors, 10 to 30% of total portfolio in a diversified government bond ETF provides appropriate fixed income exposure — adding stability without significantly reducing long-term returns.", example: "Practical bond ETF selection: For eurozone focus: IBCI from iShares Core Euro Government Bond ETF at TER 0.09% or VGEA from Vanguard EUR Eurozone Government Bond ETF at TER 0.07%. For global exposure: IGLO from iShares Global Government Bond UCITS ETF at TER 0.10%. All three are excellent, diversified and extremely low cost." },
        { label: "Deep dive", heading: "Interest rate risk and duration — the crucial bond concept", body: "Bond prices move inversely to interest rates — when rates rise, existing bond prices fall, and vice versa. Duration measures how sensitive a bond or bond ETF is to interest rate changes. A duration of 7 years means a 1% rise in interest rates causes approximately a 7% decline in the bond's price. Long-term bonds have high duration and high sensitivity. Short-term bonds have low duration. This is why the 2022 rate hike cycle devastated long-term bond holders — the fastest rate increase in decades caused long-duration bonds to fall 20 to 30%.", highlight: "Understanding duration helps you choose the right bond ETF for your risk tolerance. Long-duration bonds provide more stability during stock market crashes but more losses when rates rise. Short-duration bonds are more stable in rising rate environments but provide less crash protection.", example: "Duration choice framework: If you are worried primarily about stock market crashes: long-duration bonds with 10 or more years provide most crisis protection. If you are worried primarily about inflation and rate rises: short-duration bonds with 1 to 3 years minimize rate risk. If uncertain: intermediate duration of 5 to 7 years provides a balanced compromise." }
      ],
      quiz: { question: "Why are government bonds from stable developed countries considered very safe investments?", options: [{ text: "They are guaranteed by the EU and protected against any losses", correct: false }, { text: "Governments have sovereign authority to raise taxes and issue currency to repay debts", correct: true }, { text: "Government bond prices never decrease under any market conditions", correct: false }, { text: "They are backed by physical gold reserves held in central bank vaults", correct: false }], correctFeedback: "Correct! Governments have sovereign powers that private companies lack: they can raise taxes, cut spending and — for countries with their own currency — issue money to meet obligations. This makes default on their bonds extremely unlikely.", wrongFeedback: "Government bonds are safe because governments have sovereign power — they can raise taxes and, for countries with their own currency, issue money to repay debts. This is fundamentally different from corporate bonds where the company could simply run out of money." }
    }
  },
  {
    id: 125, chapter: 2,
    title: "Chapter II Complete — Advanced Investor", icon: "🌊", desc: "Congratulations! You have completed the Compound Sea.",
    tags: ["Milestone", "8 min"], xp: 200, gold: 75,
    lesson: {
      heading: "You are now an advanced investor",
      intro: "You have completed Chapter II — Compound Sea. Over 50 quests, you have built a comprehensive understanding of investing that genuinely surpasses most professional advisors in practical, actionable knowledge. More importantly, you have internalized the behavioral frameworks needed to apply this knowledge consistently through every market condition you will face.",
      blocks: [
        { label: "What you have mastered", heading: "Chapter II — your complete knowledge", body: "You now understand: dividend investing and passive income mechanics, the 4% rule and FIRE mathematics, factor investing with its evidence base and practical limitations, REITs as a real estate alternative, behavioral finance biases and how to defeat them, emerging markets and China risk, asset allocation theory and correlation mathematics, the All-Weather Portfolio, the psychology of money, international diversification and currency risk, multiple income streams and passive income building, rebalancing mastery, robo-advisors versus DIY, gold and commodities as portfolio insurance, leverage dangers and volatility decay, sequence of returns risk and the cash buffer solution, tax-loss harvesting, cryptocurrency as a speculative allocation, building a million-euro portfolio, inheritance and wealth transfer mechanics, the Investment Policy Statement, inflation-linked bonds and government bond duration risk.", highlight: "This knowledge, consistently applied over decades — with the behavioral discipline to stay invested through every crash and every bull market — will compound into extraordinary wealth. You now have everything you need.", example: "The complete investor: You have an emergency fund, an automated ETF savings plan in IWDA and EMIM, a written Investment Policy Statement, a quarterly review calendar, an understanding of when to add bonds and gold, knowledge of tax-efficient strategies, and the behavioral framework to hold through every future market crisis. This is genuinely rare." },
        { label: "Your immediate action items", heading: "What to implement now — in priority order", body: "If not already done: Write your Investment Policy Statement today while this knowledge is fresh. Set your target asset allocation and verify it matches your genuine risk tolerance. Confirm your automated savings plan is running at your target amount. Set your annual rebalancing date in your calendar. Calculate your FIRE number — annual spending times 25. Determine how far you are from your FIRE number and what monthly investment you need. Share your financial plan with your partner or a trusted person — accountability improves follow-through.", highlight: "The most dangerous moment in investing education is immediately after acquiring knowledge — before implementing it. Knowledge without action produces nothing. Every day of delay is compound interest foregone.", example: "The simple complete portfolio for most investors at this stage: 80% MSCI World ETF such as IWDA or XDWD, 20% MSCI Emerging Markets ETF such as EMIM, automatic monthly savings plan, annual rebalancing in January, 5 to 10% gold when portfolio exceeds 100,000 euros, bonds added gradually as retirement approaches within 10 years. That is it. Everything else is refinement." },
        { label: "Deep dive", heading: "What comes next — the investor's ongoing journey", body: "Formal investing education may end here, but the investor's journey continues indefinitely. As your portfolio grows, tax optimization becomes more valuable — consult a Steuerberater specializing in investments. As you approach your FIRE number, sequence of returns risk planning becomes critical. As life changes — marriage, children, inheritance, career changes — your Investment Policy Statement needs updating. The most important ongoing discipline: do not consume too much financial media. The signal-to-noise ratio in financial news is extremely low.", highlight: "The best investors spend very little time thinking about investing after their system is established. The system is running. The compound interest is accumulating. The quarterly review takes 15 minutes. Everything else is noise that potentially distracts you from the most important action: leaving the system alone to compound.", example: "The investor's ongoing calendar: January — annual portfolio review and rebalancing. April — check savings plan still matches goals. July — mid-year portfolio check, no action expected. October — review coming year's financial goals. December — Freistellungsauftrag check for following year. That is 4 reviews per year. Each takes 15 minutes. The remaining 99.9% of your time is better spent elsewhere." }
      ],
      quiz: { question: "What single concept from Chapters I and II is most important to consistently apply over the next 30 years?", options: [{ text: "Timing the market using technical analysis and economic indicators", correct: false }, { text: "Investing consistently in low-cost diversified ETFs and staying invested through all market conditions", correct: true }, { text: "Continuously switching strategies based on the current economic environment", correct: false }, { text: "Concentrating in the highest-returning asset class each year based on performance", correct: false }], correctFeedback: "Exactly right! Consistent investment in low-cost diversified ETFs, combined with the behavioral discipline to stay invested through every market condition, is the foundation of everything. Simple, automated, sustained.", wrongFeedback: "The core principle across both chapters: invest consistently in low-cost diversified ETFs and stay invested through all market conditions. Simplicity, consistency and time — these three elements, combined, produce extraordinary wealth." }
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
  { id: "dq10", title: "Quick Fire: Market History", icon: "⚡", desc: "Test your market history knowledge.", xp: 30, gold: 6, question: "What happened to the stock market after the 2008 to 2009 financial crisis crash of minus 57%?", options: [{ text: "Markets never fully recovered", correct: false }, { text: "Markets fully recovered and reached new all-time highs", correct: true }, { text: "Markets recovered slightly but remain below 2007 levels", correct: false }, { text: "Governments had to intervene permanently", correct: false }], correctFeedback: "Correct! After falling 57%, markets fully recovered by 2013 and tripled from the 2009 low by 2020.", wrongFeedback: "After the 2008 to 2009 crash, markets fully recovered by 2013 and tripled from the 2009 lows by 2020." }
]

export function getDailyQuest(): DailyQuest {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
  return DAILY_QUESTS[dayOfYear % DAILY_QUESTS.length]
}

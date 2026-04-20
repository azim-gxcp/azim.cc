// Article content screens — Home, Category, Article, About, Newsletter.
const { useState: useScreenState } = React;

const ARTICLES = [
  {
    id: 'interest-moral',
    kicker: 'Economics', kickerTone: 'green',
    title: 'The interest rate as a moral question',
    lede: 'A short argument on why pricing time is always a claim about what we owe each other — and why that claim needs rehearsing in every generation.',
    author: 'Azim', date: 'April 18, 2026', readTime: 8,
  },
  {
    id: 'sukuk-poetry',
    kicker: 'Islamic Finance', kickerTone: 'purple',
    title: 'On sukūk and poetry',
    lede: 'I have been thinking about sukūk the way I used to think about poetry — as a form with rules that give it power, not chains that steal it.',
    author: 'Azim', date: 'April 11, 2026', readTime: 12,
  },
  {
    id: 'riba-deeper',
    kicker: 'Islamic Finance', kickerTone: 'purple',
    title: 'Ribā goes deeper than interest',
    lede: 'The prohibition names a specific kind of asymmetry; to flatten it into a ban on percentage points is to miss what it was protecting.',
    author: 'Azim', date: 'April 4, 2026', readTime: 10,
  },
  {
    id: 'central-bank-faith',
    kicker: 'Finance', kickerTone: 'green',
    title: 'Central banks require a kind of faith',
    lede: 'Monetary policy works because we believe it will. That is not a bug, it is the whole machine — which makes trust the scarcest resource of all.',
    author: 'Azim', date: 'March 28, 2026', readTime: 7,
  },
  {
    id: 'kuala-lumpur-window',
    kicker: 'Crazy Thoughts', kickerTone: 'purple',
    title: 'What a window in KL taught me about markets',
    lede: 'A small observation about condensation, rent, and the way prices hide the life behind them.',
    author: 'Azim', date: 'March 21, 2026', readTime: 5,
  },
  {
    id: 'gharar-uncertainty',
    kicker: 'Islamic Finance', kickerTone: 'purple',
    title: 'Gharar and the limits of contract',
    lede: 'Excessive uncertainty voids an exchange — but how much is excessive? A wander through the medieval jurists and modern derivatives.',
    author: 'Azim', date: 'March 14, 2026', readTime: 14,
  },
];

// --- HOME ---
const HomeScreen = ({ onOpen }) => {
  const feature = ARTICLES[0];
  const rest = ARTICLES.slice(1);
  return (
    <div className="screen screen--home">
      <section className="hero">
        <div className="hero__kicker">Essays by Azim · since 2023</div>
        <h1 className="hero__title">
          On <em>money</em>, <em>markets</em>,<br/>and what we owe each other.
        </h1>
        <p className="hero__lede">
          Long-form essays on economics, finance, and Islamic finance — plus the occasional thought that will not leave me alone.
        </p>
      </section>

      <FeatureCard article={feature} onOpen={onOpen} />

      <div className="article-grid">
        {rest.map((a) => <ArticleCard key={a.id} article={a} onOpen={onOpen} />)}
      </div>

      <Newsletter variant="soft" />
    </div>
  );
};

// --- CATEGORY ---
const CategoryScreen = ({ category, onOpen }) => {
  const label = { islamic: 'Islamic Finance', economics: 'Economics', finance: 'Finance', crazy: 'Crazy Thoughts' }[category] || 'Essays';
  const filter = {
    islamic: (a) => a.kicker === 'Islamic Finance',
    economics: (a) => a.kicker === 'Economics',
    finance: (a) => a.kicker === 'Finance',
    crazy: (a) => a.kicker === 'Crazy Thoughts',
  }[category] || (() => true);
  const items = ARTICLES.filter(filter);

  return (
    <div className="screen screen--category">
      <header className="cat-header">
        <div className="cat-header__kicker">Category</div>
        <h1 className="cat-header__title">{label}</h1>
        <p className="cat-header__lede">
          {category === 'islamic' && 'Essays on ribā, sukūk, and the moral architecture of money in the Islamic tradition.'}
          {category === 'economics' && 'On markets, prices, and the political economy beneath them.'}
          {category === 'finance' && 'On banks, rates, and the instruments that move the modern world.'}
          {category === 'crazy' && 'Things I cannot stop thinking about that do not quite fit the other categories.'}
          {!['islamic','economics','finance','crazy'].includes(category) && 'Everything I have written, newest first.'}
        </p>
      </header>
      <div className="article-grid">
        {items.map((a) => <ArticleCard key={a.id} article={a} onOpen={onOpen} />)}
      </div>
    </div>
  );
};

// --- ARTICLE ---
const ArticleScreen = ({ id, onBack }) => {
  const article = ARTICLES.find((a) => a.id === id) || ARTICLES[0];
  return (
    <div className="screen screen--article">
      <div className="article-head">
        <button className="back-link" onClick={onBack}>
          <i data-lucide="arrow-left"></i> All essays
        </button>
        <div className="article-head__kicker" style={{ color: article.kickerTone === 'green' ? 'var(--accent)' : 'var(--brand)' }}>
          {article.kicker} · {article.readTime} min read
        </div>
        <h1 className="article-head__title">{article.title}</h1>
        <p className="article-head__lede">{article.lede}</p>
        <div className="article-head__byline">
          By <strong>{article.author}</strong> · {article.date}
        </div>
      </div>

      <div className="article-body">
        <p className="drop-cap">
          I grew up hearing that <em>ribā</em> was forbidden, and for a long time I carried the prohibition without
          examining it — the way you carry a family photograph you cannot quite remember posing for. It was only
          later, when I started reading the jurists, that I realised the prohibition is not really about a number.
          It is about what happens when time itself is sold.
        </p>
        <p>
          Consider a loan at five percent. Consider the same loan at fifteen. The moral weight is not in the
          percentage point; it is in the <em>structure</em> — in the fact that one side of the exchange is asked to
          bear risk that the other is explicitly relieved of. To charge interest is to price certainty for one
          party at the cost of certainty for the other. That is a specific kind of asymmetry, and the medieval
          scholars had a name for it.
        </p>
        <blockquote className="pull-quote">
          "The prohibition of <em>ribā</em> isn't a quirk; it's a claim about what money is <em>for</em>."
        </blockquote>
        <p>
          The Arabic term <span lang="ar">الرِّبَا</span> shares a root with the verb <em>to grow</em>. Growth, in the
          agricultural metaphor, requires planting; it requires risk; it requires the possibility of failure. A crop
          that grows without being planted is not growth, it is miracle or deception. The jurists, reading this,
          concluded that money which multiplies itself — money that grows without being placed in any soil — is
          a distortion of what growth is supposed to look like.
        </p>
        <h2>What this means for finance today</h2>
        <p>
          Modern sukūk, at their best, take this seriously. They are structured so that the investor owns a share
          of a real thing — a building, a piece of equipment, a river of rents — and the return comes from that
          thing's performance, not from a promise of timely interest irrespective of outcome. When they are badly
          structured, they become interest-bearing bonds in a costume. The distinction is not cosmetic.
        </p>
        <p>
          What I want to suggest is that the distinction is also not only theological. It is an argument about
          what a financial system is <em>for</em>, and about what is lost when we forget.
        </p>
      </div>

      <div className="article-foot">
        <div className="article-foot__meta">Written in Kuala Lumpur · shared freely · CC BY</div>
      </div>

      <Newsletter variant="soft" />
    </div>
  );
};

// --- ABOUT ---
const AboutScreen = () => (
  <div className="screen screen--about">
    <header className="about-head">
      <div className="about-head__kicker">About</div>
      <h1 className="about-head__title">M Azim Abdul Majeed</h1>
      <p className="about-head__lede">
        I write about economics, finance, and Islamic finance — and I reserve a small corner of the site for thoughts
        that refuse to fit anywhere else.
      </p>
    </header>
    <div className="about-body">
      <p>
        I have spent most of my working life at the edge of two traditions — the quantitative vocabulary of modern
        finance, and the scholarly tradition of Islamic jurisprudence on exchange. Much of what I write here is an
        attempt to hold them in the same sentence.
      </p>
      <p>
        The site is a personal project. There is no sponsor, no paywall, no tracking. If you want to get in touch,
        the email is in the footer; if you want to subscribe, the button is everywhere.
      </p>
      <h2>Frequently written about</h2>
      <ul className="plain-list">
        <li><strong>Ribā, gharar, and the moral geometry of exchange.</strong></li>
        <li><strong>Sukūk as an institutional form</strong> — what works, what does not, and why.</li>
        <li><strong>Central banks, trust, and the politics of monetary credibility.</strong></li>
        <li><strong>Development economics</strong> and the quiet violence of poor policy.</li>
      </ul>
      <h2>Elsewhere</h2>
      <p>
        You can find occasional posts on <a href="#">Twitter / X</a>, longer threads on <a href="#">LinkedIn</a>,
        and a complete archive of older writing on the <a href="#">Essays</a> page.
      </p>
    </div>
  </div>
);

// --- NEWSLETTER (dedicated screen) ---
const NewsletterScreen = () => (
  <div className="screen screen--newsletter">
    <Newsletter variant="hero" />
    <div className="newsletter-extra">
      <h2>What you will get</h2>
      <ul className="plain-list">
        <li>One essay per week, delivered Sunday morning.</li>
        <li>Occasional short notes on things I am reading.</li>
        <li>Nothing else. No product launches, no affiliate links, no tracking pixels.</li>
      </ul>
      <h2>Recent issues</h2>
      <div className="article-grid">
        {ARTICLES.slice(0, 3).map((a) => <ArticleCard key={a.id} article={a} />)}
      </div>
    </div>
  </div>
);

window.HomeScreen = HomeScreen;
window.CategoryScreen = CategoryScreen;
window.ArticleScreen = ArticleScreen;
window.AboutScreen = AboutScreen;
window.NewsletterScreen = NewsletterScreen;
window.ARTICLES = ARTICLES;

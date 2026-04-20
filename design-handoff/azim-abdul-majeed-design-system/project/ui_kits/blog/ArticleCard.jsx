// Article card — used on Home and Category screens.
const ArticleCard = ({ article, size = 'md', onOpen }) => {
  const { id, kicker, kickerTone, title, lede, author, date, readTime } = article;
  const kickerColor = kickerTone === 'green' ? 'var(--accent)' : 'var(--brand)';

  return (
    <article
      className={'article-card article-card--' + size}
      onClick={() => onOpen && onOpen(id)}
      role="link"
      tabIndex={0}
    >
      <div className="article-card__kicker" style={{ color: kickerColor }}>
        {kicker} · {readTime} min
      </div>
      <h3 className="article-card__title">{title}</h3>
      <p className="article-card__lede">{lede}</p>
      <div className="article-card__byline">
        {author} · {date}
      </div>
    </article>
  );
};

// Feature (hero) version — larger, with optional background pattern.
const FeatureCard = ({ article, onOpen }) => {
  const { id, kicker, title, lede, author, date, readTime } = article;
  return (
    <article
      className="feature-card"
      onClick={() => onOpen && onOpen(id)}
      role="link"
      tabIndex={0}
    >
      <div className="feature-card__pattern" aria-hidden="true" />
      <div className="feature-card__body">
        <div className="feature-card__kicker">{kicker} · {readTime} min · Featured</div>
        <h2 className="feature-card__title">{title}</h2>
        <p className="feature-card__lede">{lede}</p>
        <div className="feature-card__byline">{author} · {date}</div>
      </div>
    </article>
  );
};

window.ArticleCard = ArticleCard;
window.FeatureCard = FeatureCard;

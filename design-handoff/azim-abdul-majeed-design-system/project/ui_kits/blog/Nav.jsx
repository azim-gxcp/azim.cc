// Top navigation bar — sticky, hairline border, wordmark + category links + theme toggle.
const Nav = ({ current = 'essays', onNav = () => {}, theme = 'light', onToggleTheme }) => {
  const items = [
    { key: 'essays', label: 'Essays' },
    { key: 'islamic', label: 'Islamic Finance' },
    { key: 'economics', label: 'Economics' },
    { key: 'finance', label: 'Finance' },
    { key: 'crazy', label: 'Crazy Thoughts' },
    { key: 'about', label: 'About' },
  ];
  return (
    <header className="site-nav">
      <a href="#" onClick={(e) => { e.preventDefault(); onNav('home'); }} className="site-nav__brand">
        M Azim Abdul Majeed<span className="site-nav__dot">.</span>
      </a>
      <nav className="site-nav__links">
        {items.map((it) => (
          <a
            key={it.key}
            href="#"
            onClick={(e) => { e.preventDefault(); onNav(it.key); }}
            className={'site-nav__link' + (current === it.key ? ' is-active' : '')}
          >
            {it.label}
          </a>
        ))}
      </nav>
      <div className="site-nav__tools">
        <button className="icon-btn" aria-label="Search" onClick={() => onNav('search')}>
          <i data-lucide="search"></i>
        </button>
        <button className="icon-btn" aria-label="Toggle theme" onClick={onToggleTheme}>
          <i data-lucide={theme === 'dark' ? 'sun' : 'moon'}></i>
        </button>
      </div>
    </header>
  );
};

window.Nav = Nav;

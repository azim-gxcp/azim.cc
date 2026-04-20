// Footer — tall, inverse surface, wordmark + columns + note.
const Footer = () => (
  <footer className="site-footer">
    <div className="site-footer__inner">
      <div className="site-footer__brand">
        <div className="site-footer__wordmark">M Azim Abdul Majeed<span style={{ color: 'var(--green-5)' }}>.</span></div>
        <p className="site-footer__tagline">
          Essays on economics, finance, Islamic finance, and whatever else I cannot stop thinking about.
        </p>
      </div>
      <div className="site-footer__cols">
        <div>
          <div className="site-footer__label">Read</div>
          <a href="#">All essays</a>
          <a href="#">Islamic Finance</a>
          <a href="#">Economics</a>
          <a href="#">Finance</a>
          <a href="#">Crazy Thoughts</a>
        </div>
        <div>
          <div className="site-footer__label">Follow</div>
          <a href="#">Email newsletter</a>
          <a href="#">RSS</a>
          <a href="#">Twitter / X</a>
          <a href="#">LinkedIn</a>
        </div>
        <div>
          <div className="site-footer__label">This site</div>
          <a href="#">About</a>
          <a href="#">Colophon</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </div>
    <div className="site-footer__note">
      <span>Written in Kuala Lumpur. Opinions are mine alone.</span>
      <span>© {new Date().getFullYear()} M Azim Abdul Majeed</span>
    </div>
  </footer>
);

window.Footer = Footer;

// Newsletter sign-up — full-width block, inverse-surface variant optional.
const { useState: useNewsletterState } = React;

const Newsletter = ({ variant = 'soft' }) => {
  const [email, setEmail] = useNewsletterState('');
  const [state, setState] = useNewsletterState('idle'); // idle | done

  const submit = (e) => {
    e.preventDefault();
    if (!email) return;
    setState('done');
  };

  return (
    <section className={'newsletter newsletter--' + variant}>
      <div className="newsletter__inner">
        <div className="newsletter__kicker">The weekly digest</div>
        <h2 className="newsletter__title">One essay a week, sent on Sunday morning.</h2>
        <p className="newsletter__lede">
          A single piece on economics, finance, or Islamic finance. No tracking, no list-sharing. Unsubscribe at any time.
        </p>
        {state === 'idle' ? (
          <form className="newsletter__form" onSubmit={submit}>
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="newsletter__input"
            />
            <button type="submit" className="btn btn--primary">Subscribe</button>
          </form>
        ) : (
          <div className="newsletter__done">
            Thanks — check <em>{email}</em> for a confirmation link.
          </div>
        )}
        <div className="newsletter__meta">
          2,400+ readers · weekly since 2023
        </div>
      </div>
    </section>
  );
};

window.Newsletter = Newsletter;

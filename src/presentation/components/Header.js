function Header({ languages, language, onLanguageChange, onNavigate, t }) {
  const links = [
    ['home', t('navHome')],
    ['services', t('navServices')],
    ['astrology', t('navAstrology')],
    ['videos', t('navVideos')],
    ['blogs', t('navBlogs')],
    ['contact', t('navContact')],
  ];

  return (
    <header className="site-header">
      <div className="top-strip">
        <span>
          {t('topLocations')} | {t('contactEmail')}
        </span>
        <div className="top-strip-actions" aria-label="Social links">
          <span>f</span>
          <span>x</span>
          <span>◎</span>
          <span>▶</span>
        </div>
      </div>

      <div className="main-nav">
        <button className="brand" type="button" onClick={() => onNavigate('home')}>
          <span className="brand-mark">ॐ</span>
          <span>{t('brand')}</span>
        </button>

        <nav className="nav-links" aria-label="Primary navigation">
          {links.map(([target, label]) => (
            <button key={target} type="button" onClick={() => onNavigate(target)}>
              {label}
            </button>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="nav-auth-button" type="button" onClick={() => onNavigate('booking')}>
            {t('signUp')}
          </button>
          <button className="nav-auth-button" type="button" onClick={() => onNavigate('booking')}>
            {t('signIn')}
          </button>
          <select
            className="language-select"
            aria-label="Language"
            value={language}
            onChange={(event) => onLanguageChange(event.target.value)}
          >
            {languages.map((item) => (
              <option key={item.code} value={item.code}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
}

export default Header;

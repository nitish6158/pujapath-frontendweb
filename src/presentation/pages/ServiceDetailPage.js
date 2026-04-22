function ServiceDetailPage({ item, onBack, onBook, t, text }) {
  if (!item) {
    return null;
  }

  const whatYouGet = [
    t('livePuja'),
    t('vedaPandits'),
    t('sankalpa'),
    t('prasad'),
  ];

  return (
    <section className="detail-page">
      <button className="ghost-button compact" type="button" onClick={onBack}>
        {t('navHome')}
      </button>

      <div className="detail-hero">
        <div className="detail-hero-copy">
          <p className="eyebrow">{t('sectionServices')}</p>
          <h1>{text(item.title)}</h1>
          <p>{text(item.summary)}</p>
          <button className="primary-button" type="button" onClick={() => onBook(item)}>
            {t('bookPujaNow')}
          </button>
        </div>
        <img src={item.image} alt={text(item.title)} />
      </div>

      <div className="detail-content-layout">
        <article className="detail-main">
          <section>
            <h2>{t('whatYouGet')}</h2>
            <div className="what-you-get-grid">
              {whatYouGet.map((benefit, index) => (
                <div className="what-you-get-card" key={benefit}>
                  <span>{index + 1}</span>
                  <p>{benefit}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2>{t('pujaDescription')}</h2>
            <p>
              {text(item.summary)} {t('aboutText')}
            </p>
            <ul className="benefit-list">
              {(text(item.benefits) || []).map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </section>
        </article>

        <aside className="detail-sidebar">
          <div className="details-box">
            <h2>{t('pujaDetails')}</h2>
            <dl className="detail-meta stacked">
              <div>
                <dt>{t('organizer')}</dt>
                <dd>{t('brand')}</dd>
              </div>
              <div>
                <dt>{t('pujaDate')}</dt>
                <dd>{t('date')}</dd>
              </div>
              <div>
                <dt>{t('time')}</dt>
                <dd>{text(item.duration)}</dd>
              </div>
              <div>
                <dt>{t('location')}</dt>
                <dd>{text(item.location)}</dd>
              </div>
              <div>
                <dt>{t('cost')}</dt>
                <dd>{item.price}</dd>
              </div>
            </dl>
            <button className="primary-button full-width" type="button" onClick={() => onBook(item)}>
              {t('bookPujaNow')}
            </button>
          </div>

          <form className="details-box enquiry-box" onSubmit={(event) => event.preventDefault()}>
            <h2>{t('enquiryAboutPuja')}</h2>
            <input aria-label={t('name')} placeholder={t('name')} />
            <input aria-label={t('mobile')} placeholder={t('mobile')} type="tel" />
            <textarea aria-label={t('message')} placeholder={t('enterMessage')} rows="4" />
            <button className="primary-button full-width" type="button" onClick={() => onBook(item)}>
              {t('submit')}
            </button>
          </form>
        </aside>
      </div>
    </section>
  );
}

export default ServiceDetailPage;

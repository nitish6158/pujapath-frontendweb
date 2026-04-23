import ContentCard from '../components/ContentCard';
import SectionHeader from '../components/SectionHeader';

function AstrologyPage({
  astrologyExperts,
  astrologyFlow,
  astrologyServices,
  astrologyTopics,
  onBook,
  onDetails,
  t,
  text,
}) {
  const primaryService = astrologyServices[0];

  return (
    <>
      <section className="astrology-hero page-screen">
        <div className="astrology-hero-copy">
          <p className="eyebrow">{t('sectionAstrology')}</p>
          <h1>{t('astrologyHeroTitle')}</h1>
          <p>{t('astrologyHeroSubtitle')}</p>
          <div className="hero-actions">
            <button className="primary-button" type="button" onClick={() => onBook(primaryService, 'astrology')}>
              {t('astrologyPrimary')}
            </button>
            <button className="secondary-button" type="button" onClick={() => onBook(primaryService, 'astrology')}>
              {t('astrologySecondary')}
            </button>
          </div>
          <div className="astro-trust-row">
            <span>{t('privateSecure')}</span>
            <span>{t('verifiedExperts')}</span>
            <span>{t('multiLanguage')}</span>
            <span>{t('fastResponse')}</span>
          </div>
        </div>

        <form className="astro-form" onSubmit={(event) => event.preventDefault()}>
          <h2>{t('astrologyFormTitle')}</h2>
          <label>
            <span>{t('name')}</span>
            <input placeholder={t('name')} />
          </label>
          <div className="astro-form-grid">
            <label>
              <span>{t('birthDate')}</span>
              <input type="date" />
            </label>
            <label>
              <span>{t('birthTime')}</span>
              <input type="time" />
            </label>
          </div>
          <label>
            <span>{t('birthPlace')}</span>
            <input placeholder={t('birthPlace')} />
          </label>
          <label>
            <span>{t('questionArea')}</span>
            <textarea rows="4" placeholder={t('questionArea')} />
          </label>
          <button className="primary-button full-width" type="button" onClick={() => onBook(primaryService, 'astrology')}>
            {t('requestReport')}
          </button>
        </form>
      </section>

      <section className="page-section">
        <SectionHeader title={t('sectionAstrology')}>{t('astrologyHeroSubtitle')}</SectionHeader>
        <div className="card-grid">
          {astrologyServices.map((service) => (
            <ContentCard
              key={service.id}
              item={service}
              onBook={(item) => onBook(item, 'astrology')}
              onDetails={onDetails}
              t={t}
              text={text}
            />
          ))}
        </div>
      </section>

      <section className="page-section soft-band">
        <SectionHeader title={t('astrologyTopicsTitle')} />
        <div className="astro-topic-grid">
          {astrologyTopics.map((topic) => (
            <button key={topic.id} type="button" onClick={() => onBook(primaryService, 'astrology')}>
              {text(topic.label)}
            </button>
          ))}
        </div>
      </section>

      <section className="page-section">
        <SectionHeader title={t('astrologyFlowTitle')} />
        <div className="astro-flow-grid">
          {astrologyFlow.map((step, index) => (
            <article key={step.id} className="astro-flow-card">
              <span>{index + 1}</span>
              <h3>{text(step.title)}</h3>
              <p>{text(step.summary)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section soft-band">
        <SectionHeader title={t('astrologyExpertsTitle')} />
        <div className="astro-expert-grid">
          {astrologyExperts.map((expert) => (
            <article key={expert.id} className="astro-expert-card">
              <div className="expert-avatar">{text(expert.name).slice(0, 1)}</div>
              <h3>{text(expert.name)}</h3>
              <p>{text(expert.expertise)}</p>
              <dl>
                <div>
                  <dt>{t('duration')}</dt>
                  <dd>{text(expert.experience)}</dd>
                </div>
                <div>
                  <dt>{t('multiLanguage')}</dt>
                  <dd>{text(expert.languages)}</dd>
                </div>
                <div>
                  <dt>{t('price')}</dt>
                  <dd>{expert.price}</dd>
                </div>
              </dl>
              <button className="primary-button full-width" type="button" onClick={() => onBook(primaryService, 'astrology')}>
                {t('astrologyPrimary')}
              </button>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default AstrologyPage;

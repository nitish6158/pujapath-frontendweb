function ContactPage({ booking, onChange, onSubmit, submitMessage, t }) {
  return (
    <section className="contact-page" id="contact">
      <div>
        <p className="eyebrow">{t('navContact')}</p>
        <h1>{t('contactTitle')}</h1>
        <p>{t('adminNotice')}</p>
        <a className="contact-email" href={`mailto:${t('contactEmail')}`}>
          {t('contactEmail')}
        </a>
      </div>

      <form className="booking-form" onSubmit={onSubmit}>
        <label>
          <span>{t('name')}</span>
          <input
            required
            value={booking.name}
            onChange={(event) => onChange('name', event.target.value)}
          />
        </label>
        <label>
          <span>{t('mobile')}</span>
          <input
            required
            type="tel"
            value={booking.mobile}
            onChange={(event) => onChange('mobile', event.target.value)}
          />
        </label>
        <label>
          <span>{t('city')}</span>
          <input value={booking.city} onChange={(event) => onChange('city', event.target.value)} />
        </label>
        <label>
          <span>{t('message')}</span>
          <textarea
            rows="5"
            value={booking.message}
            onChange={(event) => onChange('message', event.target.value)}
          />
        </label>
        <button className="primary-button full-width" type="submit">
          {t('enquiry')}
        </button>
        {submitMessage ? <p className="form-message">{submitMessage}</p> : null}
      </form>
    </section>
  );
}

export default ContactPage;

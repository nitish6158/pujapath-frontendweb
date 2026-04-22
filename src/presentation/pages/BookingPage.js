function BookingPage({
  booking,
  onChange,
  onLogin,
  onSubmit,
  selectedItem,
  submitMessage,
  t,
  text,
}) {
  const fields = [
    ['name', t('name'), 'text'],
    ['mobile', t('mobile'), 'tel'],
    ['city', t('city'), 'text'],
    ['date', t('date'), 'date'],
  ];

  return (
    <section className="booking-page" id="booking">
      <div className="booking-copy">
        <p className="eyebrow">{selectedItem ? text(selectedItem.title) : t('bookNow')}</p>
        <h1>{t('formTitle')}</h1>
        <p>{t('formSubtitle')}</p>
        <div className="status-path">
          <span>{t('bookNow')}</span>
          <span>{t('loginRegister')}</span>
          <span>{t('submitBooking')}</span>
          <span>{t('bookingPending')}</span>
        </div>
      </div>

      <form className="booking-form" onSubmit={onSubmit}>
        {fields.map(([field, label, type]) => (
          <label key={field}>
            <span>{label}</span>
            <input
              required={field !== 'date'}
              type={type}
              value={booking[field]}
              onChange={(event) => onChange(field, event.target.value)}
            />
          </label>
        ))}

        <label>
          <span>{t('message')}</span>
          <textarea
            rows="4"
            value={booking.message}
            onChange={(event) => onChange('message', event.target.value)}
          />
        </label>

        <label className="toggle-row">
          <input
            type="checkbox"
            checked={booking.loginRequired}
            onChange={(event) => onChange('loginRequired', event.target.checked)}
          />
          <span>{t('loginQuestion')}</span>
        </label>

        {booking.loginRequired && !booking.loggedIn ? (
          <button className="secondary-button full-width" type="button" onClick={onLogin}>
            {t('loginRegister')}
          </button>
        ) : null}

        <button className="primary-button full-width" type="submit">
          {t('submitBooking')}
        </button>

        {submitMessage ? <p className="form-message">{submitMessage}</p> : null}
      </form>
    </section>
  );
}

export default BookingPage;

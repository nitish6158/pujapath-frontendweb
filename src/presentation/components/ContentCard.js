function ContentCard({ item, text, t, onDetails, onBook, actionLabel }) {
  return (
    <article className="content-card">
      <img src={item.image} alt={text(item.title)} loading="lazy" />
      <div className="content-card-body">
        <h3>{text(item.title)}</h3>
        <p>{text(item.summary)}</p>
        {item.price ? (
          <dl className="meta-grid">
            <div>
              <dt>{t('price')}</dt>
              <dd>{item.price}</dd>
            </div>
            <div>
              <dt>{t('duration')}</dt>
              <dd>{text(item.duration)}</dd>
            </div>
          </dl>
        ) : null}
        <div className="card-actions">
          {onDetails ? (
            <button className="ghost-button" type="button" onClick={() => onDetails(item)}>
              {t('viewDetails')}
            </button>
          ) : null}
          <button className="primary-button" type="button" onClick={() => onBook(item)}>
            {actionLabel || t('bookNow')}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ContentCard;

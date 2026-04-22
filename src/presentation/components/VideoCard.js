function VideoCard({ item, onBook, onPlay, t, text }) {
  return (
    <article className="media-card video-card">
      <button className="media-thumb" type="button" onClick={() => onPlay(item)}>
        <img src={item.image} alt={text(item.title)} loading="lazy" />
        <span className="play-badge" aria-hidden="true">
          ▶
        </span>
        <span className="duration-badge">{text(item.duration)}</span>
      </button>
      <div className="media-card-body">
        <p className="media-kicker">{t('sectionVideos')}</p>
        <h3>{text(item.title)}</h3>
        <p>{text(item.summary)}</p>
        <div className="card-actions">
          <button className="primary-button" type="button" onClick={() => onPlay(item)}>
            {t('watchNow')}
          </button>
          <button className="ghost-button" type="button" onClick={() => onBook(item)}>
            {t('videosCta')}
          </button>
        </div>
      </div>
    </article>
  );
}

export default VideoCard;

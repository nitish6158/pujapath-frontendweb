function VideoModal({ video, onClose, t, text }) {
  if (!video) {
    return null;
  }

  return (
    <div className="video-modal-backdrop" role="presentation" onClick={onClose}>
      <section
        className="video-modal"
        role="dialog"
        aria-modal="true"
        aria-label={text(video.title)}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="video-modal-header">
          <div>
            <p className="media-kicker">{t('sectionVideos')}</p>
            <h2>{text(video.title)}</h2>
          </div>
          <button className="ghost-button" type="button" onClick={onClose}>
            {t('closeVideo')}
          </button>
        </div>

        <div className="video-frame">
          <iframe
            title={text(video.title)}
            src={`${video.embedUrl}?autoplay=1&rel=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </section>
    </div>
  );
}

export default VideoModal;

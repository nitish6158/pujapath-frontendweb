function BlogCard({ item, onBook, t, text }) {
  return (
    <article className="media-card blog-card">
      <img className="blog-image" src={item.image} alt={text(item.title)} loading="lazy" />
      <div className="media-card-body">
        <div className="blog-meta">
          <span>{text(item.category)}</span>
          <span>{text(item.readTime)}</span>
        </div>
        <h3>{text(item.title)}</h3>
        <p>{text(item.summary)}</p>
        <span className="blog-date">{text(item.date)}</span>
        <div className="card-actions">
          <button className="primary-button" type="button" onClick={() => onBook(item)}>
            {t('readMore')}
          </button>
          <button className="ghost-button" type="button" onClick={() => onBook(item)}>
            {t('blogsCta')}
          </button>
        </div>
      </div>
    </article>
  );
}

export default BlogCard;

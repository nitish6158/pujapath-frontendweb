import { useSlider } from '../../application/hooks/useSlider';
import { useState } from 'react';
import BlogCard from '../components/BlogCard';
import ContentCard from '../components/ContentCard';
import PujaServicesSection from '../components/PujaServicesSection';
import SectionHeader from '../components/SectionHeader';
import VideoCard from '../components/VideoCard';
import VideoModal from '../components/VideoModal';

function HomePage({
  astrologyServices,
  blogs,
  bookingHighlights,
  heroSlides,
  onBook,
  onDetails,
  onNavigate,
  protectionServices,
  services,
  t,
  text,
  videos,
}) {
  const [activeVideo, setActiveVideo] = useState(null);
  const slider = useSlider(heroSlides, 6000, (slide) =>
    slide?.id === 'mahakal-live-darshan' ? 14000 : 6000
  );
  const activeSlide = slider.activeItem;

  return (
    <>
      <section className={`hero ${activeSlide.theme === 'light' ? 'hero-light' : ''}`} id="home">
        <button
          className="slider-arrow slider-arrow-left"
          type="button"
          aria-label="Previous slide"
          onClick={slider.goToPrevious}
        >
          ‹
        </button>

        <div className="hero-slide" key={activeSlide.id}>
          <div className="hero-content">
            {activeSlide.accent ? (
              <span className="hero-symbol" aria-hidden="true">
                {activeSlide.accent}
              </span>
            ) : null}
            <p className="eyebrow">{text(activeSlide.eyebrow)}</p>
            <h1>{text(activeSlide.title)}</h1>
            <p>{text(activeSlide.summary)}</p>
            <div className="hero-actions">
              {activeSlide.embedUrl ? (
                <button className="primary-button" type="button" onClick={() => setActiveVideo(activeSlide)}>
                  {t('watchLiveDarshan')}
                </button>
              ) : (
                <button className="primary-button" type="button" onClick={() => onNavigate('services')}>
                  {t('knowMore')}
                </button>
              )}
              <button className="secondary-button" type="button" onClick={() => onNavigate('booking')}>
                {t('heroPrimary')}
              </button>
            </div>
          </div>

          <div className={`hero-figure ${activeSlide.theme === 'light' ? 'hero-figure-photo' : ''}`}>
            {activeSlide.embedUrl ? (
              <iframe
                title={text(activeSlide.title)}
                src={`${activeSlide.embedUrl}?autoplay=1&mute=1&rel=0`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <img src={activeSlide.image} alt={text(activeSlide.title)} />
            )}
          </div>
        </div>

        <button
          className="slider-arrow slider-arrow-right"
          type="button"
          aria-label="Next slide"
          onClick={slider.goToNext}
        >
          ›
        </button>

        <div className="slider-dots" aria-label="Hero slides">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.id}
              className={index === slider.activeIndex ? 'active' : ''}
              type="button"
              aria-label={`Go to ${text(slide.title)}`}
              onClick={() => slider.goToSlide(index)}
            />
          ))}
        </div>
      </section>

      <section className="quick-booking" aria-label="Booking options">
        {bookingHighlights.map((item) => (
          <article className="quick-card" key={item.id}>
            <div className="quick-icon">{item.icon}</div>
            <h3>{t(item.titleKey)}</h3>
            <p>{text(item.summary)}</p>
            <button className="quick-link" type="button" onClick={() => onNavigate('booking')}>
              {t('bookOnline')}
            </button>
          </article>
        ))}
      </section>

      <section className="page-section soft-band">
        <SectionHeader title={t('sectionProtection')}>{t('protectionSubtitle')}</SectionHeader>
        <div className="card-grid">
          {protectionServices.map((service) => (
            <ContentCard
              key={service.id}
              item={service}
              onDetails={onDetails}
              onBook={(item) => onBook(item, 'protection')}
              t={t}
              text={text}
            />
          ))}
        </div>
      </section>

      <PujaServicesSection
        onBook={onBook}
        onDetails={onDetails}
        onViewAll={() => onNavigate('services')}
        services={services.slice(0, 5)}
        t={t}
        text={text}
      />

      <section className="page-section soft-band" id="about">
        <SectionHeader title={t('sectionAbout')} />
        <div className="about-panel">
          <p>{t('aboutText')}</p>
          <div className="flow-steps" aria-label="Booking flow">
            <span>{t('bookNow')}</span>
            <span>{t('formTitle')}</span>
            <span>{t('bookingPending')}</span>
            <span>{t('adminNotice')}</span>
          </div>
        </div>
      </section>

      <section className="page-section" id="astrology">
        <SectionHeader title={t('sectionAstrology')}>{t('astrologyHeroSubtitle')}</SectionHeader>
        <button className="astrology-promo" type="button" onClick={() => onNavigate('astrology')}>
          <img src={astrologyServices[0].image} alt={t('sectionAstrology')} loading="lazy" />
          <span>
            <strong>{t('astrologyHeroTitle')}</strong>
            <small>{t('viewAll')}</small>
          </span>
        </button>
      </section>

      <section className="page-section media-section" id="videos">
        <SectionHeader title={t('sectionVideos')}>{t('latestVideos')}</SectionHeader>
        <div className="video-grid">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              item={video}
              onBook={(item) => onBook(item, 'video')}
              onPlay={setActiveVideo}
              t={t}
              text={text}
            />
          ))}
        </div>
      </section>

      <section className="page-section media-section blog-band" id="blogs">
        <SectionHeader title={t('sectionBlogs')}>{t('latestBlogs')}</SectionHeader>
        <div className="blog-grid">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              item={blog}
              onBook={(item) => onBook(item, 'blog')}
              t={t}
              text={text}
            />
          ))}
        </div>
      </section>

      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} t={t} text={text} />
    </>
  );
}

export default HomePage;

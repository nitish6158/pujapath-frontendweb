import { useEffect, useMemo, useState } from 'react';
import AdminApp from './admin/AdminApp';
import { usePublicContent } from './application/hooks/usePublicContent';
import { useBookingFlow } from './application/hooks/useBookingFlow';
import { useTranslation } from './application/hooks/useTranslation';
import { pujaPathApi } from './infrastructure/api/pujaPathApi';
import Header from './presentation/components/Header';
import AstrologyPage from './presentation/pages/AstrologyPage';
import BlogsPage from './presentation/pages/BlogsPage';
import BookingPage from './presentation/pages/BookingPage';
import ContactPage from './presentation/pages/ContactPage';
import HomePage from './presentation/pages/HomePage';
import ServiceDetailPage from './presentation/pages/ServiceDetailPage';
import ServicesPage from './presentation/pages/ServicesPage';
import VideosPage from './presentation/pages/VideosPage';
import './App.css';

function App() {
  const { language, languages, setLanguage, t, text } = useTranslation();
  const isAdminRoute = window.location.pathname.startsWith('/admin');
  const bookingFlow = useBookingFlow();
  const content = usePublicContent();
  const [currentPage, setCurrentPage] = useState('home');
  const [detailItem, setDetailItem] = useState(null);
  const [submitMessage, setSubmitMessage] = useState('');

  const allBookableItems = useMemo(
    () => [
      ...content.services,
      ...content.protectionServices,
      ...content.astrologyServices,
      ...content.videos,
      ...content.blogs,
    ],
    [content.astrologyServices, content.blogs, content.protectionServices, content.services, content.videos],
  );

  useEffect(() => {
    if (!detailItem && content.services.length) {
      setDetailItem(content.services[0]);
    }
  }, [content.services, detailItem]);

  const navigateTo = (target) => {
    setCurrentPage(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showDetails = (item) => {
    setDetailItem(item);
    setCurrentPage('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startBooking = (item = allBookableItems[0], type = 'service') => {
    bookingFlow.beginBooking(item, type);
    setSubmitMessage('');
    setCurrentPage('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const bookingTypeMap = {
    astrology: 'Astrology',
    blog: 'Blog',
    protection: 'Puja',
    service: 'Puja',
    video: 'Video',
  };

  const submitBooking = async (event) => {
    event.preventDefault();
    const result = bookingFlow.submitBooking();

    if (!result.ok) {
      setSubmitMessage(t('loginRegister'));
      return;
    }

    try {
      await pujaPathApi.createBooking({
        ...result.request,
        type: bookingTypeMap[bookingFlow.selectedItem?.type] || 'General',
      });
      setSubmitMessage(`${t('bookingPending')}. ${t('adminNotice')}`);
    } catch (requestError) {
      setSubmitMessage(requestError.message || 'Unable to submit booking right now.');
    }
  };

  const submitContact = async (event) => {
    event.preventDefault();

    try {
      await pujaPathApi.createContact({
        name: bookingFlow.booking.name,
        mobile: bookingFlow.booking.mobile,
        city: bookingFlow.booking.city,
        message: bookingFlow.booking.message,
        subject: 'Contact Enquiry',
      });
      setSubmitMessage(t('adminNotice'));
    } catch (requestError) {
      setSubmitMessage(requestError.message || 'Unable to submit contact enquiry right now.');
    }
  };

  const commonPageProps = {
    t,
    text,
  };

  return (
    isAdminRoute ? (
      <AdminApp text={text} />
    ) : (
    <div className="app-shell">
      <Header
        language={language}
        languages={languages}
        onLanguageChange={setLanguage}
        onNavigate={navigateTo}
        t={t}
      />

      <main>
        {content.error ? <p className="app-notice">{content.error}</p> : null}

        {currentPage === 'home' ? (
          <HomePage
            astrologyServices={content.astrologyServices}
            blogs={content.blogs}
            bookingHighlights={content.bookingHighlights}
            heroSlides={content.heroSlides}
            onBook={startBooking}
            onDetails={showDetails}
            onNavigate={(target) => (target === 'booking' ? startBooking() : navigateTo(target))}
            protectionServices={content.protectionServices}
            services={content.services}
            videos={content.videos}
            {...commonPageProps}
          />
        ) : null}

        {currentPage === 'services' ? (
          <ServicesPage
            onBook={startBooking}
            onDetails={showDetails}
            services={content.services}
            {...commonPageProps}
          />
        ) : null}

        {currentPage === 'astrology' ? (
          <AstrologyPage
            astrologyServices={content.astrologyServices}
            astrologyExperts={content.astrologyExperts}
            astrologyFlow={content.astrologyFlow}
            astrologyTopics={content.astrologyTopics}
            onBook={startBooking}
            onDetails={showDetails}
            {...commonPageProps}
          />
        ) : null}

        {currentPage === 'videos' ? (
          <VideosPage
            onBook={startBooking}
            videos={content.videos}
            {...commonPageProps}
          />
        ) : null}

        {currentPage === 'blogs' ? (
          <BlogsPage blogs={content.blogs} onBook={startBooking} {...commonPageProps} />
        ) : null}

        {currentPage === 'details' ? (
          <ServiceDetailPage
            item={detailItem}
            onBack={() => setCurrentPage('home')}
            onBook={startBooking}
            {...commonPageProps}
          />
        ) : null}

        {currentPage === 'booking' ? (
          <BookingPage
            booking={bookingFlow.booking}
            onChange={bookingFlow.updateBooking}
            onLogin={bookingFlow.login}
            onSubmit={submitBooking}
            selectedItem={bookingFlow.selectedItem}
            submitMessage={submitMessage}
            {...commonPageProps}
          />
        ) : null}

        {currentPage === 'contact' ? (
          <ContactPage
            booking={bookingFlow.booking}
            onChange={bookingFlow.updateBooking}
            onSubmit={submitContact}
            submitMessage={submitMessage}
            t={t}
          />
        ) : null}
      </main>

      <footer className="site-footer">
        <span>{t('brand')}</span>
        <a href={`mailto:${t('contactEmail')}`}>{t('contactEmail')}</a>
        <span>{t('confirmed')} | {t('followUp')} | {t('userConfirmation')}</span>
      </footer>
    </div>
    )
  );
}

export default App;

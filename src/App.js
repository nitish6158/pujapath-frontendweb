import { useMemo, useState } from 'react';
import { useBookingFlow } from './application/hooks/useBookingFlow';
import { useTranslation } from './application/hooks/useTranslation';
import {
  astrologyServices,
  blogs,
  bookingHighlights,
  heroSlides,
  serviceCategories,
  videos,
} from './domain/content';
import Header from './presentation/components/Header';
import BookingPage from './presentation/pages/BookingPage';
import ContactPage from './presentation/pages/ContactPage';
import HomePage from './presentation/pages/HomePage';
import ServiceDetailPage from './presentation/pages/ServiceDetailPage';
import './App.css';

function App() {
  const { language, languages, setLanguage, t, text } = useTranslation();
  const bookingFlow = useBookingFlow();
  const [currentPage, setCurrentPage] = useState('home');
  const [detailItem, setDetailItem] = useState(serviceCategories[0]);
  const [submitMessage, setSubmitMessage] = useState('');

  const allBookableItems = useMemo(
    () => [...serviceCategories, ...astrologyServices, ...videos, ...blogs],
    []
  );

  const navigateTo = (target) => {
    setCurrentPage(target);
    window.requestAnimationFrame(() => {
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
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

  const submitBooking = (event) => {
    event.preventDefault();
    const result = bookingFlow.submitBooking();

    if (!result.ok) {
      setSubmitMessage(t('loginRegister'));
      return;
    }

    setSubmitMessage(`${t('bookingPending')}. ${t('adminNotice')}`);
  };

  const commonPageProps = {
    t,
    text,
  };

  return (
    <div className="app-shell">
      <Header
        language={language}
        languages={languages}
        onLanguageChange={setLanguage}
        onNavigate={(target) => (target === 'contact' ? setCurrentPage('contact') : navigateTo(target))}
        t={t}
      />

      <main>
        {currentPage === 'home' ? (
          <HomePage
            astrologyServices={astrologyServices}
            blogs={blogs}
            bookingHighlights={bookingHighlights}
            heroSlides={heroSlides}
            onBook={startBooking}
            onDetails={showDetails}
            onNavigate={(target) => (target === 'booking' ? startBooking() : navigateTo(target))}
            services={serviceCategories}
            videos={videos}
            {...commonPageProps}
          />
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
            onSubmit={submitBooking}
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
  );
}

export default App;

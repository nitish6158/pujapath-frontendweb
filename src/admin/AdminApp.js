import { useState } from 'react';
import { useAdminAuth } from '../application/hooks/useAdminAuth';
import { useAdminBookingsApi } from '../application/hooks/useAdminBookingsApi';
import { useAdminContactsApi } from '../application/hooks/useAdminContactsApi';
import { useAdminDashboard } from '../application/hooks/useAdminDashboard';
import AdminLayout from './components/AdminLayout';
import AdminBookings from './pages/AdminBookings';
import AdminContentList from './pages/AdminContentList';
import AdminDashboard from './pages/AdminDashboard';
import AdminFeaturedPosts from './pages/AdminFeaturedPosts';
import AdminLogin from './pages/AdminLogin';
import AdminSupport from './pages/AdminSupport';

function AdminApp({ text }) {
  const auth = useAdminAuth();
  const [activePage, setActivePage] = useState('dashboard');
  const bookings = useAdminBookingsApi(auth.token);
  const contacts = useAdminContactsApi(auth.token);
  const dashboard = useAdminDashboard(auth.token);

  if (!auth.isLoggedIn) {
    return <AdminLogin error={auth.error} loading={auth.loading} onLogin={auth.login} />;
  }

  const renderPage = () => {
    if (activePage === 'dashboard') {
      return (
        <AdminDashboard
          bookings={bookings.bookings}
          contacts={contacts.contacts}
          error={dashboard.error}
          loading={dashboard.loading}
          onNavigate={setActivePage}
          stats={dashboard.stats}
        />
      );
    }

    if (activePage === 'bookings') {
      return (
        <AdminBookings
          error={bookings.error}
          filteredBookings={bookings.filteredBookings}
          filters={bookings.filters}
          loading={bookings.loading}
          onSelectBooking={bookings.selectBooking}
          onUpdateBooking={bookings.updateBooking}
          onUpdateFilter={bookings.updateFilter}
          selectedBooking={bookings.selectedBooking}
        />
      );
    }

    if (activePage === 'featured') {
      return <AdminFeaturedPosts token={auth.token} />;
    }

    if (activePage === 'highlights') {
      return <AdminContentList title="Manage Booking Highlights" pageType="booking highlight" text={text} token={auth.token} type="booking-highlight" />;
    }

    if (activePage === 'services') {
      return <AdminContentList title="Manage Puja Services" pageType="puja service" text={text} token={auth.token} type="service" />;
    }

    if (activePage === 'protection') {
      return <AdminContentList title="Manage Protection Services" pageType="protection service" text={text} token={auth.token} type="protection-service" />;
    }

    if (activePage === 'astrology') {
      return <AdminContentList title="Manage Astrology Services" pageType="astrology service" text={text} token={auth.token} type="astrology-service" />;
    }

    if (activePage === 'astrology-topics') {
      return <AdminContentList title="Manage Astrology Topics" pageType="astrology topic" text={text} token={auth.token} type="astrology-topic" />;
    }

    if (activePage === 'astrology-experts') {
      return <AdminContentList title="Manage Astrology Experts" pageType="astrology expert" text={text} token={auth.token} type="astrology-expert" />;
    }

    if (activePage === 'astrology-flow') {
      return <AdminContentList title="Manage Astrology Flow" pageType="astrology flow step" text={text} token={auth.token} type="astrology-flow" />;
    }

    if (activePage === 'videos') {
      return <AdminContentList title="Manage Videos" pageType="video" text={text} token={auth.token} type="video" />;
    }

    if (activePage === 'blogs') {
      return <AdminContentList title="Manage Blogs" pageType="blog" text={text} token={auth.token} type="blog" />;
    }

    if (activePage === 'slider') {
      return <AdminContentList title="Manage Home Slider" pageType="slider item" text={text} token={auth.token} type="hero-slide" />;
    }

    if (activePage === 'support') {
      return (
        <AdminSupport
          contacts={contacts.filteredContacts}
          error={contacts.error}
          filters={contacts.filters}
          loading={contacts.loading}
          onSelectContact={contacts.selectContact}
          onUpdateContact={contacts.updateContact}
          onUpdateFilter={contacts.updateFilter}
          selectedContact={contacts.selectedContact}
        />
      );
    }

    return null;
  };

  return (
    <AdminLayout
      activePage={activePage}
      onLogout={auth.logout}
      onNavigate={setActivePage}
    >
      {renderPage()}
    </AdminLayout>
  );
}

export default AdminApp;

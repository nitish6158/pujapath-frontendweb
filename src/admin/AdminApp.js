import { useState } from 'react';
import {
  astrologyServices,
  blogs,
  heroSlides,
  serviceCategories,
  videos,
} from '../domain/content';
import AdminLayout from './components/AdminLayout';
import { adminContacts } from './data/adminData';
import { useAdminBookings } from './hooks/useAdminBookings';
import AdminBookings from './pages/AdminBookings';
import AdminContentList from './pages/AdminContentList';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import AdminSupport from './pages/AdminSupport';

function AdminApp({ text }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');
  const bookings = useAdminBookings();

  if (!isLoggedIn) {
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  const renderPage = () => {
    if (activePage === 'dashboard') {
      return (
        <AdminDashboard
          bookings={bookings.bookings}
          contacts={adminContacts}
          onNavigate={setActivePage}
        />
      );
    }

    if (activePage === 'bookings') {
      return (
        <AdminBookings
          filteredBookings={bookings.filteredBookings}
          filters={bookings.filters}
          onSelectBooking={bookings.selectBooking}
          onUpdateBooking={bookings.updateBooking}
          onUpdateFilter={bookings.updateFilter}
          selectedBooking={bookings.selectedBooking}
        />
      );
    }

    if (activePage === 'services') {
      return <AdminContentList title="Manage Puja Services" pageType="puja service" items={serviceCategories} text={text} />;
    }

    if (activePage === 'astrology') {
      return <AdminContentList title="Manage Astrology Services" pageType="astrology service" items={astrologyServices} text={text} />;
    }

    if (activePage === 'videos') {
      return <AdminContentList title="Manage Videos" pageType="video" items={videos} text={text} />;
    }

    if (activePage === 'blogs') {
      return <AdminContentList title="Manage Blogs" pageType="blog" items={blogs} text={text} />;
    }

    if (activePage === 'slider') {
      return <AdminContentList title="Manage Home Slider" pageType="slider item" items={heroSlides} text={text} />;
    }

    if (activePage === 'support') {
      return <AdminSupport contacts={adminContacts} />;
    }

    return null;
  };

  return (
    <AdminLayout
      activePage={activePage}
      onLogout={() => setIsLoggedIn(false)}
      onNavigate={setActivePage}
    >
      {renderPage()}
    </AdminLayout>
  );
}

export default AdminApp;

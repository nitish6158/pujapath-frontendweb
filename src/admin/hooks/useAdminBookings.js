import { useMemo, useState } from 'react';
import { adminBookings } from '../data/adminData';

export function useAdminBookings() {
  const [bookings, setBookings] = useState(adminBookings);
  const [filters, setFilters] = useState({
    query: '',
    status: 'all',
    type: 'all',
  });
  const [selectedBookingId, setSelectedBookingId] = useState(adminBookings[0]?.id || '');

  const filteredBookings = useMemo(() => {
    const query = filters.query.trim().toLowerCase();

    return bookings.filter((booking) => {
      const matchesQuery = query
        ? [booking.id, booking.serviceName, booking.name, booking.city, booking.mobile]
            .join(' ')
            .toLowerCase()
            .includes(query)
        : true;
      const matchesStatus = filters.status === 'all' || booking.status === filters.status;
      const matchesType = filters.type === 'all' || booking.type === filters.type;

      return matchesQuery && matchesStatus && matchesType;
    });
  }, [bookings, filters]);

  const selectedBooking =
    bookings.find((booking) => booking.id === selectedBookingId) || filteredBookings[0] || bookings[0];

  const updateFilter = (field, value) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [field]: value,
    }));
  };

  const updateBooking = (id, patch) => {
    setBookings((currentBookings) =>
      currentBookings.map((booking) => (booking.id === id ? { ...booking, ...patch } : booking))
    );
  };

  return {
    bookings,
    filteredBookings,
    filters,
    selectedBooking,
    selectBooking: setSelectedBookingId,
    updateBooking,
    updateFilter,
  };
}

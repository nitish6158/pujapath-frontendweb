import { useCallback, useEffect, useMemo, useState } from 'react';
import { normalizeBookingItem } from '../../infrastructure/api/contentMappers';
import { pujaPathApi } from '../../infrastructure/api/pujaPathApi';

export function useAdminBookingsApi(token) {
  const [bookings, setBookings] = useState([]);
  const [filters, setFilters] = useState({
    query: '',
    status: 'all',
    type: 'all',
  });
  const [selectedBookingId, setSelectedBookingId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadBookings = useCallback(async () => {
    if (!token) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await pujaPathApi.getBookings(
        {
          q: filters.query,
          status: filters.status,
          type: filters.type,
        },
        token,
      );
      const items = (response.data.bookings || []).map(normalizeBookingItem);
      setBookings(items);
      setSelectedBookingId((currentId) => currentId || items[0]?.id || '');
    } catch (requestError) {
      setError(requestError.message || 'Unable to load bookings');
    } finally {
      setLoading(false);
    }
  }, [filters.query, filters.status, filters.type, token]);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  const filteredBookings = useMemo(() => bookings, [bookings]);

  const selectedBooking =
    bookings.find((booking) => booking.id === selectedBookingId) || filteredBookings[0] || null;

  const updateFilter = (field, value) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [field]: value,
    }));
  };

  const updateBooking = async (id, patch) => {
    try {
      const response = await pujaPathApi.updateBooking(id, patch, token);
      const updatedBooking = normalizeBookingItem(response.data.booking);

      setBookings((currentBookings) =>
        currentBookings.map((booking) => (booking.id === id ? updatedBooking : booking)),
      );

      return { ok: true };
    } catch (requestError) {
      setError(requestError.message || 'Unable to update booking');
      return { ok: false };
    }
  };

  return {
    bookings,
    error,
    filteredBookings,
    filters,
    loading,
    reload: loadBookings,
    selectedBooking,
    selectBooking: setSelectedBookingId,
    updateBooking,
    updateFilter,
  };
}

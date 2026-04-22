import { useMemo, useState } from 'react';
import { useLocalStorageState } from './useLocalStorageState';

const emptyBooking = {
  name: '',
  mobile: '',
  city: '',
  date: '',
  message: '',
  loginRequired: false,
  loggedIn: false,
};

export function useBookingFlow() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [booking, setBooking] = useState(emptyBooking);
  const [requests, setRequests] = useLocalStorageState('booking-requests', []);

  const status = useMemo(() => {
    if (!requests.length) {
      return null;
    }

    return requests[0].status;
  }, [requests]);

  const beginBooking = (item, type = 'service') => {
    setSelectedItem({ ...item, type });
    setBooking((currentBooking) => ({
      ...currentBooking,
      message: item?.title?.en ? `I want to enquire about ${item.title.en}.` : currentBooking.message,
    }));
  };

  const updateBooking = (field, value) => {
    setBooking((currentBooking) => ({
      ...currentBooking,
      [field]: value,
    }));
  };

  const login = () => {
    setBooking((currentBooking) => ({
      ...currentBooking,
      loggedIn: true,
    }));
  };

  const submitBooking = () => {
    if (booking.loginRequired && !booking.loggedIn) {
      return { ok: false, reason: 'login-required' };
    }

    const request = {
      id: `${Date.now()}`,
      selectedItem,
      form: booking,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    setRequests((currentRequests) => [request, ...currentRequests]);
    return { ok: true, request };
  };

  return {
    booking,
    beginBooking,
    login,
    requests,
    selectedItem,
    status,
    submitBooking,
    updateBooking,
  };
}

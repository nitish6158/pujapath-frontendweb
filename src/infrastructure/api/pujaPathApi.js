import { httpRequest } from './httpClient';

export const pujaPathApi = {
  adminLogin(credentials) {
    return httpRequest('/auth/login', {
      method: 'POST',
      body: credentials,
    });
  },
  getAdminMe(token) {
    return httpRequest('/auth/me', { token });
  },
  getAdminDashboard(token) {
    return httpRequest('/admin/dashboard', { token });
  },
  getHomeContent() {
    return httpRequest('/content/home');
  },
  getContentByType(type, options = {}) {
    return httpRequest(`/content/type/${type}`, {
      query: options,
      token: options.token,
    });
  },
  getContentItem(contentId, type) {
    return httpRequest(`/content/item/${contentId}`, {
      query: type ? { type } : undefined,
    });
  },
  createContent(payload, token) {
    return httpRequest('/content', {
      method: 'POST',
      body: payload,
      token,
    });
  },
  updateContent(id, payload, token) {
    return httpRequest(`/content/${id}`, {
      method: 'PATCH',
      body: payload,
      token,
    });
  },
  deleteContent(id, token) {
    return httpRequest(`/content/${id}`, {
      method: 'DELETE',
      token,
    });
  },
  createBooking(payload) {
    return httpRequest('/bookings', {
      method: 'POST',
      body: payload,
    });
  },
  getBookings(filters, token) {
    return httpRequest('/bookings', {
      query: filters,
      token,
    });
  },
  updateBooking(id, payload, token) {
    return httpRequest(`/bookings/${id}`, {
      method: 'PATCH',
      body: payload,
      token,
    });
  },
  createContact(payload) {
    return httpRequest('/contacts', {
      method: 'POST',
      body: payload,
    });
  },
  getContacts(filters, token) {
    return httpRequest('/contacts', {
      query: filters,
      token,
    });
  },
  updateContact(id, payload, token) {
    return httpRequest(`/contacts/${id}`, {
      method: 'PATCH',
      body: payload,
      token,
    });
  },
};

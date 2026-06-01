import { useCallback, useEffect, useMemo, useState } from 'react';
import { normalizeContactItem } from '../../infrastructure/api/contentMappers';
import { pujaPathApi } from '../../infrastructure/api/pujaPathApi';

export function useAdminContactsApi(token) {
  const [contacts, setContacts] = useState([]);
  const [filters, setFilters] = useState({
    query: '',
    status: 'all',
  });
  const [selectedContactId, setSelectedContactId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadContacts = useCallback(async () => {
    if (!token) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await pujaPathApi.getContacts({ status: filters.status }, token);
      const items = (response.data.contacts || []).map(normalizeContactItem);
      setContacts(items);
      setSelectedContactId((currentId) => currentId || items[0]?.id || '');
    } catch (requestError) {
      setError(requestError.message || 'Unable to load contacts');
    } finally {
      setLoading(false);
    }
  }, [filters.status, token]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  const filteredContacts = useMemo(() => {
    const query = filters.query.trim().toLowerCase();

    if (!query) {
      return contacts;
    }

    return contacts.filter((contact) =>
      [contact.id, contact.name, contact.mobile, contact.city, contact.message]
        .join(' ')
        .toLowerCase()
        .includes(query),
    );
  }, [contacts, filters.query]);

  const selectedContact =
    contacts.find((contact) => contact.id === selectedContactId) || filteredContacts[0] || null;

  const updateFilter = (field, value) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [field]: value,
    }));
  };

  const updateContact = async (id, patch) => {
    try {
      const response = await pujaPathApi.updateContact(id, patch, token);
      const updatedContact = normalizeContactItem(response.data.contact);

      setContacts((currentContacts) =>
        currentContacts.map((contact) => (contact.id === id ? updatedContact : contact)),
      );

      return { ok: true };
    } catch (requestError) {
      setError(requestError.message || 'Unable to update contact');
      return { ok: false };
    }
  };

  return {
    contacts,
    error,
    filteredContacts,
    filters,
    loading,
    reload: loadContacts,
    selectedContact,
    selectContact: setSelectedContactId,
    updateContact,
    updateFilter,
  };
}

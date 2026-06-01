import { useCallback, useEffect, useMemo, useState } from 'react';
import { normalizeContentItem } from '../../infrastructure/api/contentMappers';
import { pujaPathApi } from '../../infrastructure/api/pujaPathApi';

const createEmptyForm = () => ({
  contentId: '',
  titleEn: '',
  titleHi: '',
  summaryEn: '',
  summaryHi: '',
  descriptionEn: '',
  descriptionHi: '',
  image: '',
  price: '',
  durationEn: '',
  durationHi: '',
  locationEn: '',
  locationHi: '',
  benefitsEn: '',
  benefitsHi: '',
  status: 'active',
  sortOrder: '0',
  extraJson: '{}',
});

const localizedValue = (enValue, hiValue) => {
  const en = enValue.trim();
  const hi = hiValue.trim();

  if (!en && !hi) {
    return null;
  }

  return {
    ...(en ? { en } : {}),
    ...(hi ? { hi } : {}),
  };
};

const multilineValue = (value) =>
  value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const formFromItem = (item) => ({
  contentId: item.contentId || '',
  titleEn: item.title?.en || '',
  titleHi: item.title?.hi || '',
  summaryEn: item.summary?.en || '',
  summaryHi: item.summary?.hi || '',
  descriptionEn: item.description?.en || '',
  descriptionHi: item.description?.hi || '',
  image: item.image || '',
  price: item.price || '',
  durationEn: item.duration?.en || '',
  durationHi: item.duration?.hi || '',
  locationEn: item.location?.en || '',
  locationHi: item.location?.hi || '',
  benefitsEn: Array.isArray(item.benefits?.en) ? item.benefits.en.join('\n') : '',
  benefitsHi: Array.isArray(item.benefits?.hi) ? item.benefits.hi.join('\n') : '',
  status: item.status || 'active',
  sortOrder: `${item.sortOrder ?? 0}`,
  extraJson: JSON.stringify(item.meta || {}, null, 2),
});

const buildPayload = (form, type) => {
  let extra = {};

  try {
    extra = form.extraJson.trim() ? JSON.parse(form.extraJson) : {};
  } catch {
    throw new Error('Extra JSON is not valid');
  }

  return {
    contentId: form.contentId.trim() || slugify(form.titleEn || form.titleHi || `${type}-${Date.now()}`),
    type,
    title: localizedValue(form.titleEn, form.titleHi),
    summary: localizedValue(form.summaryEn, form.summaryHi),
    description: localizedValue(form.descriptionEn, form.descriptionHi),
    image: form.image.trim(),
    price: form.price.trim(),
    duration: localizedValue(form.durationEn, form.durationHi),
    location: localizedValue(form.locationEn, form.locationHi),
    benefits:
      form.benefitsEn.trim() || form.benefitsHi.trim()
        ? {
            en: multilineValue(form.benefitsEn),
            hi: multilineValue(form.benefitsHi),
          }
        : null,
    status: form.status,
    sortOrder: Number(form.sortOrder) || 0,
    meta: extra,
  };
};

export function useAdminContentManager(type, token) {
  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [form, setForm] = useState(createEmptyForm());
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const loadItems = useCallback(async () => {
    if (!type) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await pujaPathApi.getContentByType(type, { status: 'all' });
      const normalizedItems = (response.data.items || []).map(normalizeContentItem);
      setItems(normalizedItems);

      setSelectedId((currentId) => {
        const nextId = currentId || normalizedItems[0]?.dbId || '';
        const selectedItem = normalizedItems.find((item) => item.dbId === nextId);
        setForm(selectedItem ? formFromItem(selectedItem) : createEmptyForm());
        return nextId;
      });
    } catch (requestError) {
      setError(requestError.message || 'Unable to load content');
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const selectedItem = useMemo(
    () => items.find((item) => item.dbId === selectedId) || null,
    [items, selectedId],
  );

  const selectItem = (item) => {
    setSelectedId(item.dbId);
    setForm(formFromItem(item));
    setSuccessMessage('');
    setError('');
  };

  const startCreate = () => {
    setSelectedId('');
    setForm(createEmptyForm());
    setSuccessMessage('');
    setError('');
  };

  const updateField = (field, value) => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  };

  const saveItem = async () => {
    if (!token) {
      setError('Admin login is required');
      return { ok: false };
    }

    setSaving(true);
    setError('');
    setSuccessMessage('');

    try {
      const payload = buildPayload(form, type);
      const response = selectedItem
        ? await pujaPathApi.updateContent(selectedItem.dbId, payload, token)
        : await pujaPathApi.createContent(payload, token);
      const savedItem = normalizeContentItem(response.data.item);

      setItems((currentItems) => {
        if (selectedItem) {
          return currentItems.map((item) => (item.dbId === savedItem.dbId ? savedItem : item));
        }

        return [savedItem, ...currentItems];
      });

      setSelectedId(savedItem.dbId);
      setForm(formFromItem(savedItem));
      setSuccessMessage(selectedItem ? 'Content updated successfully.' : 'Content created successfully.');
      return { ok: true };
    } catch (requestError) {
      setError(requestError.message || 'Unable to save content');
      return { ok: false };
    } finally {
      setSaving(false);
    }
  };

  const removeItem = async () => {
    if (!selectedItem || !token) {
      return { ok: false };
    }

    setSaving(true);
    setError('');
    setSuccessMessage('');

    try {
      await pujaPathApi.deleteContent(selectedItem.dbId, token);
      const nextItems = items.filter((item) => item.dbId !== selectedItem.dbId);
      setItems(nextItems);
      setSelectedId(nextItems[0]?.dbId || '');
      setForm(nextItems[0] ? formFromItem(nextItems[0]) : createEmptyForm());
      setSuccessMessage('Content deleted successfully.');
      return { ok: true };
    } catch (requestError) {
      setError(requestError.message || 'Unable to delete content');
      return { ok: false };
    } finally {
      setSaving(false);
    }
  };

  return {
    error,
    form,
    items,
    loading,
    reload: loadItems,
    removeItem,
    saveItem,
    saving,
    selectItem,
    selectedItem,
    startCreate,
    successMessage,
    updateField,
  };
}

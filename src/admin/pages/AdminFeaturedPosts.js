import { useMemo } from 'react';
import { useAdminContentManager } from '../../application/hooks/useAdminContentManager';
import AdminTable from '../components/AdminTable';

function AdminFeaturedPosts({ token }) {
  const manager = useAdminContentManager('featured-post', token);
  const extraFields = useMemo(() => {
    try {
      return manager.form.extraJson.trim() ? JSON.parse(manager.form.extraJson) : {};
    } catch {
      return {};
    }
  }, [manager.form.extraJson]);

  const updateExtraField = (field, value) => {
    const nextValue = {
      ...extraFields,
      [field]: value,
    };

    manager.updateField('extraJson', JSON.stringify(nextValue, null, 2));
  };

  const columns = [
    { key: 'contentId', label: 'Code', render: (row) => row.contentId },
    { key: 'title', label: 'Title', render: (row) => row.title?.en || row.title?.hi || '-' },
    { key: 'note', label: 'Line / Note', render: (row) => row.note?.en || row.note?.hi || '-' },
    { key: 'price', label: 'Price' },
    { key: 'placement', label: 'Placement', render: (row) => row.placement || '-' },
    {
      key: 'status',
      label: 'Status',
      render: (row) => <span className={`admin-status ${row.status}`}>{row.status}</span>,
    },
  ];

  return (
    <section className="admin-page">
      <div className="admin-panel">
        <div className="admin-panel-header">
          <div>
            <h2>Manage Featured Posts</h2>
            <p>Post and manage special home hero sections like tantra badha nivaran, festival promotions, and highlighted campaigns.</p>
          </div>
          <button className="admin-primary-button" type="button" onClick={manager.startCreate}>
            Add Featured Post
          </button>
        </div>

        {manager.loading ? <p className="admin-helper-text">Loading featured posts...</p> : null}
        {manager.error ? <p className="admin-error">{manager.error}</p> : null}
        {manager.successMessage ? <p className="admin-success">{manager.successMessage}</p> : null}

        <div className="admin-upload-grid">
          <label>
            <span>Content ID</span>
            <input
              value={manager.form.contentId}
              placeholder="featured-post-code"
              onChange={(event) => manager.updateField('contentId', event.target.value)}
            />
          </label>
          <label>
            <span>Top Line / Note</span>
            <input
              value={extraFields.note?.en || ''}
              placeholder="Adesh Gurudev"
              onChange={(event) =>
                updateExtraField('note', {
                  ...(extraFields.note || {}),
                  en: event.target.value,
                  hi: extraFields.note?.hi || event.target.value,
                })
              }
            />
          </label>
          <label>
            <span>Title (English)</span>
            <input
              value={manager.form.titleEn}
              placeholder="Tantra Badha Nivaran Sadhana"
              onChange={(event) => manager.updateField('titleEn', event.target.value)}
            />
          </label>
          <label>
            <span>Title (Hindi)</span>
            <input
              value={manager.form.titleHi}
              placeholder="तंत्र बाधा निवारण साधना"
              onChange={(event) => manager.updateField('titleHi', event.target.value)}
            />
          </label>
          <label>
            <span>Price</span>
            <input
              value={manager.form.price}
              placeholder="₹2,100 onwards"
              onChange={(event) => manager.updateField('price', event.target.value)}
            />
          </label>
          <label>
            <span>Placement</span>
            <select
              value={extraFields.placement || 'Home Hero First Slide'}
              onChange={(event) => updateExtraField('placement', event.target.value)}
            >
              <option>Home Hero First Slide</option>
              <option>Home Mid Section</option>
              <option>Festival Promotion</option>
            </select>
          </label>
          <label>
            <span>Image URL</span>
            <input
              value={manager.form.image}
              placeholder="Paste image URL"
              onChange={(event) => manager.updateField('image', event.target.value)}
            />
          </label>
          <label>
            <span>CTA Label</span>
            <input
              value={extraFields.ctaLabel || ''}
              placeholder="Know More / Book Guidance"
              onChange={(event) => updateExtraField('ctaLabel', event.target.value)}
            />
          </label>
          <label>
            <span>Status</span>
            <select
              value={manager.form.status}
              onChange={(event) => manager.updateField('status', event.target.value)}
            >
              <option value="active">active</option>
              <option value="draft">draft</option>
              <option value="inactive">inactive</option>
            </select>
          </label>
          <label className="admin-field-wide">
            <span>Message (English)</span>
            <textarea
              rows="4"
              value={manager.form.summaryEn}
              placeholder="Write the featured post content..."
              onChange={(event) => manager.updateField('summaryEn', event.target.value)}
            />
          </label>
          <label className="admin-field-wide">
            <span>Message (Hindi)</span>
            <textarea
              rows="4"
              value={manager.form.summaryHi}
              placeholder="फीचर्ड पोस्ट का संदेश लिखें..."
              onChange={(event) => manager.updateField('summaryHi', event.target.value)}
            />
          </label>
          <label className="admin-field-wide">
            <span>Extra JSON</span>
            <textarea
              rows="7"
              value={manager.form.extraJson}
              placeholder='{"theme":"light"}'
              onChange={(event) => manager.updateField('extraJson', event.target.value)}
            />
          </label>
        </div>

        <div className="admin-action-row">
          <button className="admin-primary-button" type="button" onClick={manager.saveItem}>
            {manager.saving ? 'Saving...' : manager.selectedItem ? 'Update Featured Post' : 'Create Featured Post'}
          </button>
          <button className="admin-secondary-button" type="button" onClick={manager.reload}>
            Refresh
          </button>
          {manager.selectedItem ? (
            <button className="admin-danger-button" type="button" onClick={manager.removeItem}>
              Delete
            </button>
          ) : null}
        </div>

        <AdminTable
          columns={columns}
          rows={manager.items}
          selectedId={manager.selectedItem?.id}
          onRowClick={manager.selectItem}
        />
      </div>
    </section>
  );
}

export default AdminFeaturedPosts;

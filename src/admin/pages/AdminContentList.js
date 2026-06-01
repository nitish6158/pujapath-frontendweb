import { useAdminContentManager } from '../../application/hooks/useAdminContentManager';
import AdminTable from '../components/AdminTable';

function AdminContentList({ pageType, text, title, token, type }) {
  const manager = useAdminContentManager(type, token);

  const columns = [
    { key: 'contentId', label: 'Code', render: (row) => row.contentId },
    { key: 'title', label: 'Title', render: (row) => text(row.title) },
    {
      key: 'summary',
      label: 'Summary',
      render: (row) => text(row.summary || row.eyebrow || row.category || { en: '-' }),
    },
    { key: 'price', label: 'Price', render: (row) => row.price || '-' },
    { key: 'image', label: 'Image', render: (row) => (row.image ? 'Uploaded' : '-') },
  ];

  return (
    <section className="admin-page">
      <div className="admin-panel">
        <div className="admin-panel-header">
          <div>
            <h2>{title}</h2>
            <p>Design preview for managing {pageType}. Backend upload APIs will connect here later.</p>
          </div>
          <button className="admin-primary-button" type="button" onClick={manager.startCreate}>
            Add New
          </button>
        </div>

        {manager.loading ? <p className="admin-helper-text">Loading {pageType}...</p> : null}
        {manager.error ? <p className="admin-error">{manager.error}</p> : null}
        {manager.successMessage ? <p className="admin-success">{manager.successMessage}</p> : null}

        <div className="admin-upload-grid">
          <label>
            <span>Content ID</span>
            <input
              value={manager.form.contentId}
              placeholder={`Add ${pageType} code`}
              onChange={(event) => manager.updateField('contentId', event.target.value)}
            />
          </label>
          <label>
            <span>Title (English)</span>
            <input
              value={manager.form.titleEn}
              placeholder={`Add ${pageType} title`}
              onChange={(event) => manager.updateField('titleEn', event.target.value)}
            />
          </label>
          <label>
            <span>Title (Hindi)</span>
            <input
              value={manager.form.titleHi}
              placeholder={`Add ${pageType} title in Hindi`}
              onChange={(event) => manager.updateField('titleHi', event.target.value)}
            />
          </label>
          <label>
            <span>Price</span>
            <input
              value={manager.form.price}
              placeholder="Enter price"
              onChange={(event) => manager.updateField('price', event.target.value)}
            />
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
            <span>Summary (English)</span>
            <textarea
              rows="3"
              value={manager.form.summaryEn}
              placeholder="Short summary in English"
              onChange={(event) => manager.updateField('summaryEn', event.target.value)}
            />
          </label>
          <label>
            <span>Summary (Hindi)</span>
            <textarea
              rows="3"
              value={manager.form.summaryHi}
              placeholder="Short summary in Hindi"
              onChange={(event) => manager.updateField('summaryHi', event.target.value)}
            />
          </label>
          <label className="admin-field-wide">
            <span>Description (English)</span>
            <textarea
              rows="4"
              value={manager.form.descriptionEn}
              placeholder="Write details in English..."
              onChange={(event) => manager.updateField('descriptionEn', event.target.value)}
            />
          </label>
          <label className="admin-field-wide">
            <span>Description (Hindi)</span>
            <textarea
              rows="4"
              value={manager.form.descriptionHi}
              placeholder="Write details in Hindi..."
              onChange={(event) => manager.updateField('descriptionHi', event.target.value)}
            />
          </label>
          <label>
            <span>Duration (English)</span>
            <input
              value={manager.form.durationEn}
              placeholder="30 minutes"
              onChange={(event) => manager.updateField('durationEn', event.target.value)}
            />
          </label>
          <label>
            <span>Duration (Hindi)</span>
            <input
              value={manager.form.durationHi}
              placeholder="30 मिनट"
              onChange={(event) => manager.updateField('durationHi', event.target.value)}
            />
          </label>
          <label>
            <span>Location (English)</span>
            <input
              value={manager.form.locationEn}
              placeholder="Online or phone"
              onChange={(event) => manager.updateField('locationEn', event.target.value)}
            />
          </label>
          <label>
            <span>Location (Hindi)</span>
            <input
              value={manager.form.locationHi}
              placeholder="ऑनलाइन या फोन"
              onChange={(event) => manager.updateField('locationHi', event.target.value)}
            />
          </label>
          <label>
            <span>Benefits (English)</span>
            <textarea
              rows="4"
              value={manager.form.benefitsEn}
              placeholder="One item per line"
              onChange={(event) => manager.updateField('benefitsEn', event.target.value)}
            />
          </label>
          <label>
            <span>Benefits (Hindi)</span>
            <textarea
              rows="4"
              value={manager.form.benefitsHi}
              placeholder="प्रति लाइन एक बिंदु"
              onChange={(event) => manager.updateField('benefitsHi', event.target.value)}
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
          <label>
            <span>Sort Order</span>
            <input
              type="number"
              value={manager.form.sortOrder}
              onChange={(event) => manager.updateField('sortOrder', event.target.value)}
            />
          </label>
          <label className="admin-field-wide">
            <span>Extra JSON</span>
            <textarea
              rows="8"
              value={manager.form.extraJson}
              placeholder='{"embedUrl":"https://..."}'
              onChange={(event) => manager.updateField('extraJson', event.target.value)}
            />
          </label>
        </div>

        <div className="admin-action-row">
          <button className="admin-primary-button" type="button" onClick={manager.saveItem}>
            {manager.saving ? 'Saving...' : manager.selectedItem ? 'Update Content' : 'Create Content'}
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

export default AdminContentList;

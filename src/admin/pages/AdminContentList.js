import AdminTable from '../components/AdminTable';

function AdminContentList({ items, pageType, title, text }) {
  const columns = [
    { key: 'title', label: 'Title', render: (row) => text(row.title) },
    {
      key: 'summary',
      label: 'Summary',
      render: (row) => text(row.summary || row.eyebrow || row.category || { en: '-' }),
    },
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
          <button className="admin-primary-button" type="button">
            Add New
          </button>
        </div>
        <div className="admin-upload-grid">
          <label>
            <span>Title</span>
            <input placeholder={`Add ${pageType} title`} />
          </label>
          <label>
            <span>Image Upload</span>
            <input type="file" />
          </label>
          <label>
            <span>Video / Embed Link</span>
            <input placeholder="YouTube or media URL" />
          </label>
          <label>
            <span>Description</span>
            <textarea rows="3" placeholder="Write details..." />
          </label>
        </div>
        <AdminTable columns={columns} rows={items} />
      </div>
    </section>
  );
}

export default AdminContentList;

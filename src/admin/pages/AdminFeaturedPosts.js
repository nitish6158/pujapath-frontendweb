import AdminTable from '../components/AdminTable';

function AdminFeaturedPosts({ posts }) {
  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'note', label: 'Line / Note' },
    { key: 'price', label: 'Price' },
    { key: 'placement', label: 'Placement' },
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
          <button className="admin-primary-button" type="button">
            Add Featured Post
          </button>
        </div>

        <div className="admin-upload-grid">
          <label>
            <span>Top Line / Note</span>
            <input placeholder="Adesh Gurudev" />
          </label>
          <label>
            <span>Title</span>
            <input placeholder="Tantra Badha Nivaran Sadhana" />
          </label>
          <label>
            <span>Price</span>
            <input placeholder="₹2,100 onwards" />
          </label>
          <label>
            <span>Placement</span>
            <select defaultValue="Home Hero First Slide">
              <option>Home Hero First Slide</option>
              <option>Home Mid Section</option>
              <option>Festival Promotion</option>
            </select>
          </label>
          <label>
            <span>Image Upload</span>
            <input type="file" />
          </label>
          <label>
            <span>CTA Label</span>
            <input placeholder="Know More / Book Guidance" />
          </label>
          <label className="admin-field-wide">
            <span>Message</span>
            <textarea rows="4" placeholder="Write the featured post content..." />
          </label>
        </div>

        <AdminTable columns={columns} rows={posts} />
      </div>
    </section>
  );
}

export default AdminFeaturedPosts;

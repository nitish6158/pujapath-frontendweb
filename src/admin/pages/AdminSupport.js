import AdminTable from '../components/AdminTable';

function AdminSupport({ contacts }) {
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'mobile', label: 'Mobile' },
    { key: 'city', label: 'City' },
    { key: 'status', label: 'Status', render: (row) => <span className="admin-status pending">{row.status}</span> },
    { key: 'message', label: 'Message' },
  ];

  return (
    <section className="admin-page">
      <div className="admin-panel">
        <div className="admin-panel-header">
          <div>
            <h2>Contact Support</h2>
            <p>Track contact form requests and support messages.</p>
          </div>
        </div>
        <AdminTable columns={columns} rows={contacts} />
      </div>
    </section>
  );
}

export default AdminSupport;

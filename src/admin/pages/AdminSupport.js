import AdminTable from '../components/AdminTable';

function AdminSupport({
  contacts,
  error,
  filters,
  loading,
  onSelectContact,
  onUpdateContact,
  onUpdateFilter,
  selectedContact,
}) {
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'mobile', label: 'Mobile' },
    { key: 'city', label: 'City' },
    { key: 'status', label: 'Status', render: (row) => <span className="admin-status pending">{row.status}</span> },
    { key: 'message', label: 'Message' },
  ];

  return (
    <section className="admin-page admin-booking-layout">
        <div className="admin-panel">
          <div className="admin-panel-header">
            <div>
              <h2>Contact Support</h2>
              <p>Track contact form requests and support messages.</p>
            </div>
          </div>
          <div className="admin-filter-row">
            <input
              value={filters.query}
              placeholder="Search contact, mobile, city, or message"
              onChange={(event) => onUpdateFilter('query', event.target.value)}
            />
            <select value={filters.status} onChange={(event) => onUpdateFilter('status', event.target.value)}>
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
          {loading ? <p className="admin-helper-text">Loading contacts...</p> : null}
          {error ? <p className="admin-error">{error}</p> : null}
          <AdminTable
            columns={columns}
            rows={contacts}
            selectedId={selectedContact?.id}
            onRowClick={(contact) => onSelectContact(contact.id)}
          />
        </div>

        {selectedContact ? (
          <aside className="admin-panel booking-editor">
            <h2>Contact Detail</h2>
            <label>
              <span>Name</span>
              <input
                value={selectedContact.name}
                onChange={(event) => onUpdateContact(selectedContact.id, { name: event.target.value })}
              />
            </label>
            <label>
              <span>Mobile</span>
              <input
                value={selectedContact.mobile}
                onChange={(event) => onUpdateContact(selectedContact.id, { mobile: event.target.value })}
              />
            </label>
            <label>
              <span>City</span>
              <input
                value={selectedContact.city || ''}
                onChange={(event) => onUpdateContact(selectedContact.id, { city: event.target.value })}
              />
            </label>
            <label>
              <span>Status</span>
              <select
                value={selectedContact.status}
                onChange={(event) => onUpdateContact(selectedContact.id, { status: event.target.value })}
              >
                <option value="pending">pending</option>
                <option value="resolved">resolved</option>
              </select>
            </label>
            <label>
              <span>Message / Notes</span>
              <textarea
                rows="5"
                value={selectedContact.message}
                onChange={(event) => onUpdateContact(selectedContact.id, { message: event.target.value })}
              />
            </label>
            <div className="admin-action-row">
              <button
                className="admin-primary-button"
                type="button"
                onClick={() => onUpdateContact(selectedContact.id, { status: 'resolved' })}
              >
                Mark Resolved
              </button>
              <button
                className="admin-secondary-button"
                type="button"
                onClick={() => onUpdateContact(selectedContact.id, { status: 'pending' })}
              >
                Keep Pending
              </button>
            </div>
          </aside>
        ) : null}
    </section>
  );
}

export default AdminSupport;

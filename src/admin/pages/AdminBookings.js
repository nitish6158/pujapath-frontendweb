import AdminTable from '../components/AdminTable';
import { bookingStatusOptions } from '../data/adminData';

function AdminBookings({
  filteredBookings,
  filters,
  onSelectBooking,
  onUpdateBooking,
  onUpdateFilter,
  selectedBooking,
}) {
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'type', label: 'Type' },
    { key: 'serviceName', label: 'Service' },
    { key: 'name', label: 'User' },
    { key: 'city', label: 'City' },
    {
      key: 'status',
      label: 'Status',
      render: (row) => <span className={`admin-status ${row.status}`}>{row.status}</span>,
    },
  ];

  return (
    <section className="admin-page admin-booking-layout">
      <div className="admin-panel">
        <div className="admin-filter-row">
          <input
            value={filters.query}
            placeholder="Search booking, service, user, city, mobile"
            onChange={(event) => onUpdateFilter('query', event.target.value)}
          />
          <select value={filters.type} onChange={(event) => onUpdateFilter('type', event.target.value)}>
            <option value="all">All Types</option>
            <option value="Puja">Puja</option>
            <option value="Astrology">Astrology</option>
            <option value="Support">Support</option>
          </select>
          <select value={filters.status} onChange={(event) => onUpdateFilter('status', event.target.value)}>
            <option value="all">All Status</option>
            {bookingStatusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <AdminTable
          columns={columns}
          rows={filteredBookings}
          selectedId={selectedBooking?.id}
          onRowClick={(booking) => onSelectBooking(booking.id)}
        />
      </div>

      {selectedBooking ? (
        <aside className="admin-panel booking-editor">
          <h2>Booking Detail</h2>
          <label>
            <span>Service</span>
            <input
              value={selectedBooking.serviceName}
              onChange={(event) => onUpdateBooking(selectedBooking.id, { serviceName: event.target.value })}
            />
          </label>
          <label>
            <span>User Name</span>
            <input
              value={selectedBooking.name}
              onChange={(event) => onUpdateBooking(selectedBooking.id, { name: event.target.value })}
            />
          </label>
          <label>
            <span>Mobile</span>
            <input
              value={selectedBooking.mobile}
              onChange={(event) => onUpdateBooking(selectedBooking.id, { mobile: event.target.value })}
            />
          </label>
          <label>
            <span>City</span>
            <input
              value={selectedBooking.city}
              onChange={(event) => onUpdateBooking(selectedBooking.id, { city: event.target.value })}
            />
          </label>
          <label>
            <span>Date</span>
            <input
              type="date"
              value={selectedBooking.date}
              onChange={(event) => onUpdateBooking(selectedBooking.id, { date: event.target.value })}
            />
          </label>
          <label>
            <span>Status</span>
            <select
              value={selectedBooking.status}
              onChange={(event) => onUpdateBooking(selectedBooking.id, { status: event.target.value })}
            >
              {bookingStatusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Message / Notes</span>
            <textarea
              rows="4"
              value={selectedBooking.message}
              onChange={(event) => onUpdateBooking(selectedBooking.id, { message: event.target.value })}
            />
          </label>
          <div className="admin-action-row">
            <button
              className="admin-primary-button"
              type="button"
              onClick={() => onUpdateBooking(selectedBooking.id, { status: 'confirmed' })}
            >
              Confirm
            </button>
            <button
              className="admin-secondary-button"
              type="button"
              onClick={() => onUpdateBooking(selectedBooking.id, { status: 'follow-up' })}
            >
              Follow-up
            </button>
            <button
              className="admin-danger-button"
              type="button"
              onClick={() => onUpdateBooking(selectedBooking.id, { status: 'cancelled' })}
            >
              Cancel
            </button>
          </div>
        </aside>
      ) : null}
    </section>
  );
}

export default AdminBookings;

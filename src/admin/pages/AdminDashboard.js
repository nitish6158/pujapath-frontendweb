import { adminStats } from '../data/adminData';

function AdminDashboard({ bookings, contacts, onNavigate }) {
  const pendingBookings = bookings.filter((booking) => booking.status === 'pending').slice(0, 4);

  return (
    <section className="admin-page">
      <div className="admin-stat-grid">
        {adminStats.map((stat) => (
          <article className="admin-stat-card" key={stat.id}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
          </article>
        ))}
      </div>

      <div className="admin-grid-two">
        <article className="admin-panel">
          <div className="admin-panel-header">
            <h2>Pending Bookings</h2>
            <button type="button" onClick={() => onNavigate('bookings')}>
              View All
            </button>
          </div>
          <div className="admin-mini-list">
            {pendingBookings.map((booking) => (
              <div key={booking.id}>
                <strong>{booking.serviceName}</strong>
                <span>{booking.name} • {booking.city}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="admin-panel">
          <div className="admin-panel-header">
            <h2>Contact Support</h2>
            <button type="button" onClick={() => onNavigate('support')}>
              View All
            </button>
          </div>
          <div className="admin-mini-list">
            {contacts.map((contact) => (
              <div key={contact.id}>
                <strong>{contact.name}</strong>
                <span>{contact.message}</span>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

export default AdminDashboard;

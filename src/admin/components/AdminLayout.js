function AdminLayout({ activePage, children, onLogout, onNavigate }) {
  const navItems = [
    ['dashboard', 'Dashboard'],
    ['bookings', 'Bookings'],
    ['services', 'Puja Services'],
    ['astrology', 'Astrology'],
    ['videos', 'Videos'],
    ['blogs', 'Blogs'],
    ['slider', 'Slider'],
    ['support', 'Contact Support'],
  ];

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span>ॐ</span>
          <strong>PujaPath Admin</strong>
        </div>
        <nav className="admin-nav">
          {navItems.map(([page, label]) => (
            <button
              key={page}
              className={activePage === page ? 'active' : ''}
              type="button"
              onClick={() => onNavigate(page)}
            >
              {label}
            </button>
          ))}
        </nav>
      </aside>
      <div className="admin-main">
        <header className="admin-topbar">
          <div>
            <p>Admin Panel</p>
            <h1>{navItems.find(([page]) => page === activePage)?.[1] || 'Dashboard'}</h1>
          </div>
          <button className="admin-secondary-button" type="button" onClick={onLogout}>
            Logout
          </button>
        </header>
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;

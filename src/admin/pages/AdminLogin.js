import { useState } from 'react';
import { adminCredentials } from '../data/adminData';

function AdminLogin({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const updateField = (field, value) => {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
  };

  const submit = (event) => {
    event.preventDefault();

    if (form.email === adminCredentials.email && form.password === adminCredentials.password) {
      onLogin();
      return;
    }

    setError('Invalid credentials. Use admin@pujapath.com / admin123 for design preview.');
  };

  return (
    <main className="admin-login-screen">
      <form className="admin-login-card" onSubmit={submit}>
        <span className="admin-login-mark">ॐ</span>
        <h1>PujaPath Admin</h1>
        <p>Login to manage bookings, content, slider, videos, blogs, and support requests.</p>
        <label>
          <span>Email</span>
          <input
            type="email"
            value={form.email}
            placeholder={adminCredentials.email}
            onChange={(event) => updateField('email', event.target.value)}
          />
        </label>
        <label>
          <span>Password</span>
          <input
            type="password"
            value={form.password}
            placeholder={adminCredentials.password}
            onChange={(event) => updateField('password', event.target.value)}
          />
        </label>
        <button className="admin-primary-button" type="submit">
          Login
        </button>
        {error ? <p className="admin-error">{error}</p> : null}
      </form>
    </main>
  );
}

export default AdminLogin;

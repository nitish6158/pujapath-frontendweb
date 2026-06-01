import { useState } from 'react';

function AdminLogin({ error, loading, onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });

  const updateField = (field, value) => {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    await onLogin(form);
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
            placeholder="admin@pujapath.com"
            onChange={(event) => updateField('email', event.target.value)}
          />
        </label>
        <label>
          <span>Password</span>
          <input
            type="password"
            value={form.password}
            placeholder="admin123"
            onChange={(event) => updateField('password', event.target.value)}
          />
        </label>
        <button className="admin-primary-button" type="submit">
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error ? <p className="admin-error">{error}</p> : null}
      </form>
    </main>
  );
}

export default AdminLogin;

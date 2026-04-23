import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../utils/api.js';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const { data } = await api.post('/auth/login', formData);
      localStorage.setItem('anchor_admin_token', data.token);
      localStorage.setItem('anchor_admin_user', JSON.stringify(data.admin));
      toast.success('Welcome back');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-mesh px-4">
      <form onSubmit={handleSubmit} className="glass-panel w-full max-w-md rounded-[2rem] p-8 shadow-glow">
        <p className="text-sm uppercase tracking-[0.35em] text-brand-400">Admin Access</p>
        <h1 className="mt-4 text-3xl font-bold text-brand-900">Sign in to manage the portfolio</h1>
        <div className="mt-8 space-y-4">
          <input
            type="email"
            required
            placeholder="Admin email"
            value={formData.email}
            onChange={(event) => setFormData((value) => ({ ...value, email: event.target.value }))}
            className="w-full rounded-2xl border-brand-900/10 bg-brand-50/80 px-4 py-3 text-brand-900 placeholder:text-brand-500"
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={formData.password}
            onChange={(event) => setFormData((value) => ({ ...value, password: event.target.value }))}
            className="w-full rounded-2xl border-brand-900/10 bg-brand-50/80 px-4 py-3 text-brand-900 placeholder:text-brand-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full bg-brand-400 px-6 py-3 font-semibold text-brand-50 transition hover:bg-brand-600 disabled:opacity-60"
        >
          {loading ? 'Signing in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default AdminLoginPage;

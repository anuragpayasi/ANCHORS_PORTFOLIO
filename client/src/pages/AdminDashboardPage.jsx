import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../utils/api.js';
import { formatDate } from '../utils/helpers.js';

const tabs = ['stats', 'events', 'gallery', 'feedback', 'inquiries'];

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('stats');
  const [stats, setStats] = useState(null);
  const [events, setEvents] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [eventForm, setEventForm] = useState({ name: '', date: '', location: '', description: '', image: null });
  const [galleryForm, setGalleryForm] = useState({ title: '', category: '', type: 'image', youtubeUrl: '', image: null });

  const admin = useMemo(() => JSON.parse(localStorage.getItem('anchor_admin_user') || 'null'), []);

  const loadDashboard = async () => {
    try {
      const [statsRes, eventsRes, galleryRes, feedbackRes, inquiriesRes] = await Promise.all([
        api.get('/dashboard/stats'),
        api.get('/events'),
        api.get('/gallery'),
        api.get('/feedback/admin'),
        api.get('/inquiries/admin'),
      ]);

      setStats(statsRes.data.stats);
      setEvents(eventsRes.data.events);
      setGallery(galleryRes.data.items);
      setFeedback(feedbackRes.data.feedback);
      setInquiries(inquiriesRes.data.inquiries);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Session expired');
      localStorage.removeItem('anchor_admin_token');
      localStorage.removeItem('anchor_admin_user');
      navigate('/admin');
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('anchor_admin_token')) {
      navigate('/admin');
      return;
    }

    loadDashboard();
  }, [navigate]);

  const handleEventSubmit = async (event) => {
    event.preventDefault();
    try {
      const payload = new FormData();
      Object.entries(eventForm).forEach(([key, value]) => {
        if (value) payload.append(key, value);
      });
      await api.post('/events', payload);
      toast.success('Event added');
      setEventForm({ name: '', date: '', location: '', description: '', image: null });
      loadDashboard();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to add event');
    }
  };

  const handleGallerySubmit = async (event) => {
    event.preventDefault();
    try {
      const payload = new FormData();
      Object.entries(galleryForm).forEach(([key, value]) => {
        if (value) payload.append(key, value);
      });
      await api.post('/gallery', payload);
      toast.success('Gallery item added');
      setGalleryForm({ title: '', category: '', type: 'image', youtubeUrl: '', image: null });
      loadDashboard();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to add gallery item');
    }
  };

  const updateFeedbackStatus = async (id, status) => {
    try {
      await api.patch(`/feedback/${id}/status`, { status });
      toast.success(`Feedback ${status}`);
      loadDashboard();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to update feedback');
    }
  };

  const deleteResource = async (resource, id, label) => {
    try {
      await api.delete(`/${resource}/${id}`);
      toast.success(`${label} deleted`);
      loadDashboard();
    } catch (error) {
      toast.error(error.response?.data?.message || `Unable to delete ${label.toLowerCase()}`);
    }
  };

  return (
    <div className="min-h-screen bg-brand-50 px-4 py-8">
      <div className="section-shell grid gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="glass-panel rounded-[2rem] p-6 shadow-glow">
          <p className="text-sm uppercase tracking-[0.35em] text-brand-400">Admin</p>
          <h1 className="mt-3 text-2xl font-bold text-brand-900">{admin?.name || 'Portfolio Admin'}</h1>
          <div className="mt-8 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`w-full rounded-2xl px-4 py-3 text-left capitalize transition ${
                  activeTab === tab ? 'bg-brand-400 text-brand-50' : 'bg-brand-50 text-brand-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem('anchor_admin_token');
              localStorage.removeItem('anchor_admin_user');
              navigate('/admin');
            }}
            className="mt-8 w-full rounded-full border border-brand-900/10 px-4 py-3 text-brand-700"
          >
            Logout
          </button>
        </aside>

        <main className="space-y-6">
          {activeTab === 'stats' && stats && (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {Object.entries(stats).map(([key, value]) => (
                <div key={key} className="glass-panel rounded-[1.6rem] p-5">
                  <p className="text-sm uppercase tracking-[0.25em] text-brand-400">{key}</p>
                  <p className="mt-3 text-3xl font-bold text-brand-900">{value}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'events' && (
            <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
              <form onSubmit={handleEventSubmit} className="glass-panel rounded-[2rem] p-6">
                <h2 className="text-2xl font-semibold text-brand-900">Add Event</h2>
                <div className="mt-6 space-y-4">
                  <input required placeholder="Event name" value={eventForm.name} onChange={(e) => setEventForm((v) => ({ ...v, name: e.target.value }))} className="w-full rounded-2xl border-brand-900/10 bg-brand-50/80 px-4 py-3 text-brand-900" />
                  <input required type="date" value={eventForm.date} onChange={(e) => setEventForm((v) => ({ ...v, date: e.target.value }))} className="w-full rounded-2xl border-brand-900/10 bg-brand-50/80 px-4 py-3 text-brand-900" />
                  <input required placeholder="Location" value={eventForm.location} onChange={(e) => setEventForm((v) => ({ ...v, location: e.target.value }))} className="w-full rounded-2xl border-brand-900/10 bg-brand-50/80 px-4 py-3 text-brand-900" />
                  <textarea required rows="4" placeholder="Description" value={eventForm.description} onChange={(e) => setEventForm((v) => ({ ...v, description: e.target.value }))} className="w-full rounded-2xl border-brand-900/10 bg-brand-50/80 px-4 py-3 text-brand-900" />
                  <input required type="file" accept="image/*" onChange={(e) => setEventForm((v) => ({ ...v, image: e.target.files?.[0] || null }))} className="w-full rounded-2xl border-brand-900/10 bg-brand-50/80 px-4 py-3 text-brand-700 file:mr-4 file:rounded-full file:border-0 file:bg-brand-400 file:px-4 file:py-2 file:font-semibold file:text-brand-50" />
                  <button type="submit" className="w-full rounded-full bg-brand-400 px-6 py-3 font-semibold text-brand-50">Save Event</button>
                </div>
              </form>
              <div className="glass-panel rounded-[2rem] p-6">
                <h2 className="text-2xl font-semibold text-brand-900">Event List</h2>
                <div className="mt-6 space-y-4">
                  {events.map((item) => (
                    <div key={item._id} className="rounded-2xl bg-brand-50 p-4">
                      <p className="text-lg font-semibold text-brand-900">{item.name}</p>
                      <p className="mt-1 text-sm text-brand-500">{formatDate(item.date)} | {item.location}</p>
                      <button
                        type="button"
                        onClick={() => deleteResource('events', item._id, 'Event')}
                        className="mt-4 rounded-full border border-brand-900/10 px-4 py-2 text-sm text-brand-700"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
              <form onSubmit={handleGallerySubmit} className="glass-panel rounded-[2rem] p-6">
                <h2 className="text-2xl font-semibold text-brand-900">Add Gallery Item</h2>
                <div className="mt-6 space-y-4">
                  <input required placeholder="Title" value={galleryForm.title} onChange={(e) => setGalleryForm((v) => ({ ...v, title: e.target.value }))} className="w-full rounded-2xl border-brand-900/10 bg-brand-50/80 px-4 py-3 text-brand-900" />
                  <input required placeholder="Category" value={galleryForm.category} onChange={(e) => setGalleryForm((v) => ({ ...v, category: e.target.value }))} className="w-full rounded-2xl border-brand-900/10 bg-brand-50/80 px-4 py-3 text-brand-900" />
                  <select value={galleryForm.type} onChange={(e) => setGalleryForm((v) => ({ ...v, type: e.target.value }))} className="w-full rounded-2xl border-brand-900/10 bg-brand-50/80 px-4 py-3 text-brand-900">
                    <option value="image">Image</option>
                    <option value="youtube">YouTube</option>
                  </select>
                  {galleryForm.type === 'youtube' ? (
                    <input placeholder="YouTube URL" value={galleryForm.youtubeUrl} onChange={(e) => setGalleryForm((v) => ({ ...v, youtubeUrl: e.target.value }))} className="w-full rounded-2xl border-brand-900/10 bg-brand-50/80 px-4 py-3 text-brand-900" />
                  ) : (
                    <input required type="file" accept="image/*" onChange={(e) => setGalleryForm((v) => ({ ...v, image: e.target.files?.[0] || null }))} className="w-full rounded-2xl border-brand-900/10 bg-brand-50/80 px-4 py-3 text-brand-700 file:mr-4 file:rounded-full file:border-0 file:bg-brand-400 file:px-4 file:py-2 file:font-semibold file:text-brand-50" />
                  )}
                  <button type="submit" className="w-full rounded-full bg-brand-400 px-6 py-3 font-semibold text-brand-50">Save Gallery Item</button>
                </div>
              </form>
              <div className="glass-panel rounded-[2rem] p-6">
                <h2 className="text-2xl font-semibold text-brand-900">Gallery Items</h2>
                <div className="mt-6 space-y-4">
                  {gallery.map((item) => (
                    <div key={item._id} className="rounded-2xl bg-brand-50 p-4">
                      <p className="text-lg font-semibold text-brand-900">{item.title}</p>
                      <p className="mt-1 text-sm text-brand-500">{item.category} | {item.type}</p>
                      <button
                        type="button"
                        onClick={() => deleteResource('gallery', item._id, 'Gallery item')}
                        className="mt-4 rounded-full border border-brand-900/10 px-4 py-2 text-sm text-brand-700"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'feedback' && (
            <div className="glass-panel rounded-[2rem] p-6">
              <h2 className="text-2xl font-semibold text-brand-900">Approve Feedback</h2>
              <div className="mt-6 space-y-4">
                {feedback.map((item) => (
                  <div key={item._id} className="rounded-2xl bg-brand-50 p-4">
                    <p className="font-semibold text-brand-900">{item.name}</p>
                    <p className="mt-2 text-brand-700">{item.message}</p>
                    <p className="mt-2 text-sm uppercase tracking-[0.25em] text-brand-400">{item.status}</p>
                    <div className="mt-4 flex gap-3">
                      <button type="button" onClick={() => updateFeedbackStatus(item._id, 'approved')} className="rounded-full bg-brand-400 px-4 py-2 font-semibold text-brand-50">Approve</button>
                      <button type="button" onClick={() => updateFeedbackStatus(item._id, 'rejected')} className="rounded-full border border-brand-900/10 px-4 py-2 text-brand-700">Reject</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'inquiries' && (
            <div className="glass-panel rounded-[2rem] p-6">
              <h2 className="text-2xl font-semibold text-brand-900">Booking Inquiries</h2>
              <div className="mt-6 space-y-4">
                {inquiries.map((item) => (
                  <div key={item._id} className="rounded-2xl bg-brand-50 p-4">
                    <p className="font-semibold text-brand-900">{item.name} | {item.eventType}</p>
                    <p className="mt-1 text-brand-500">{item.email} | {item.phone}</p>
                    <p className="mt-3 text-brand-700">{item.message}</p>
                    <p className="mt-3 text-sm text-brand-400">Budget: {item.budget}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardPage;

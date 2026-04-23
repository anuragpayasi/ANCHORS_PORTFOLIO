import { useState } from 'react';
import toast from 'react-hot-toast';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../utils/api.js';
import SectionHeading from './SectionHeading.jsx';
import { getWhatsAppLink } from '../utils/helpers.js';

const initialState = {
  name: '',
  phone: '',
  email: '',
  eventType: '',
  budget: '',
  message: '',
};

const ContactSection = () => {
  const [formData, setFormData] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const bookingEmail = import.meta.env.VITE_BOOKING_EMAIL || 'bookings@example.com';

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      await api.post('/inquiries', formData);
      toast.success('Our team will coordinate you shortly');
      setFormData(initialState);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to submit inquiry');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Contact"
          title="Let’s plan a stage experience that feels premium, memorable, and audience-first."
          description="Use the booking form for direct inquiries or connect instantly on WhatsApp and email."
        />

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-5">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noreferrer"
              className="glass-panel flex items-center gap-4 rounded-[1.6rem] p-5 transition hover:-translate-y-1"
            >
              <div className="rounded-2xl bg-brand-400/10 p-3 text-brand-600">
                <MessageCircle />
              </div>
              <div>
                <p className="font-semibold text-brand-900">WhatsApp Booking</p>
                <p className="text-brand-700">Fast responses for availability and event discussion.</p>
              </div>
            </a>
            <a href={`mailto:${bookingEmail}`} className="glass-panel flex items-center gap-4 rounded-[1.6rem] p-5">
              <div className="rounded-2xl bg-brand-400/10 p-3 text-brand-600">
                <Mail />
              </div>
              <div>
                <p className="font-semibold text-brand-900">{bookingEmail}</p>
                <p className="text-brand-700">Ideal for detailed briefs and event decks.</p>
              </div>
            </a>
            <div className="glass-panel flex items-center gap-4 rounded-[1.6rem] p-5">
              <div className="rounded-2xl bg-brand-400/10 p-3 text-brand-600">
                <Phone />
              </div>
              <div>
                <p className="font-semibold text-brand-900">+91 99999 99999</p>
                <p className="text-brand-700">Available for premium bookings and collaborations.</p>
              </div>
            </div>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            onSubmit={handleSubmit}
            className="glass-panel rounded-[2rem] p-6 sm:p-8"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <input
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="rounded-2xl border-brand-900/10 bg-brand-50/80 px-4 py-3 text-brand-900 placeholder:text-brand-500"
              />
              <input
                required
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="rounded-2xl border-brand-900/10 bg-brand-50/80 px-4 py-3 text-brand-900 placeholder:text-brand-500"
              />
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="rounded-2xl border-brand-900/10 bg-brand-50/80 px-4 py-3 text-brand-900 placeholder:text-brand-500"
              />
              <input
                required
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                placeholder="Event Type"
                className="rounded-2xl border-brand-900/10 bg-brand-50/80 px-4 py-3 text-brand-900 placeholder:text-brand-500"
              />
              <input
                required
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="Budget"
                className="rounded-2xl border-brand-900/10 bg-brand-50/80 px-4 py-3 text-brand-900 placeholder:text-brand-500 md:col-span-2"
              />
              <textarea
                required
                minLength={10}
                rows="6"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your event"
                className="rounded-3xl border-brand-900/10 bg-brand-50/80 px-4 py-3 text-brand-900 placeholder:text-brand-500 md:col-span-2"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="mt-6 rounded-full bg-brand-400 px-7 py-3.5 font-semibold text-brand-50 transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? 'Sending...' : 'Send Booking Inquiry'}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

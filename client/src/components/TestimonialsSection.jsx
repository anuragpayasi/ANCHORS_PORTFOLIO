import { useState } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import api, { getUploadUrl } from '../utils/api.js';
import SectionHeading from './SectionHeading.jsx';

const TestimonialsSection = ({ feedback, loading, refreshFeedback }) => {
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    message: '',
    image: null,
  });

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('rating', formData.rating);
      payload.append('message', formData.message);
      if (formData.image) payload.append('image', formData.image);

      await api.post('/feedback', payload);
      toast.success('Feedback submitted for admin approval');

      setFormData({ name: '', rating: 5, message: '', image: null });
      refreshFeedback();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to submit feedback');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="testimonials" className="py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Testimonials"
          title="Client feedback that reflects trust, warmth, and premium experience."
          description="Approved reviews appear publicly. New feedback goes through an admin approval step."
        />

        {/* FIXED GRID */}
        <div className="grid gap-10 xl:grid-cols-2">

          {/* LEFT — SLIDER (OVERFLOW FIXED) */}
          <div className="glass-panel rounded-[2rem] p-8 overflow-hidden">
            <div className="mb-8 flex flex-col gap-4 border-b border-brand-900/10 pb-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-brand-400">
                  Client Experience
                </p>
                <h3 className="mt-2 text-3xl font-semibold text-brand-900">
                  Real stories from premium event clients
                </h3>
              </div>
              <div className="flex gap-4">
                <div className="rounded-2xl bg-brand-50 p-4 text-center">
                  <p className="text-2xl font-semibold text-brand-900">5.0</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.25em] text-brand-500">Rating</p>
                </div>
                <div className="rounded-2xl bg-brand-50 p-4 text-center">
                  <p className="text-2xl font-semibold text-brand-900">50+</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.25em] text-brand-500">Events</p>
                </div>
              </div>
            </div>

            {loading ? (
              <p className="text-brand-700 text-lg">Loading testimonials...</p>
            ) : (
              <Swiper
                modules={[Autoplay]}
                slidesPerView="auto"
                spaceBetween={28}
                loop={true}
                freeMode={true}
                speed={4000}
                autoplay={{
                  delay: 0,
                  disableOnInteraction: false,
                }}
                freeModeMomentum={false}
                loopAdditionalSlides={10}
              >
                {feedback.map((item) => (
                  <SwiperSlide key={item._id} className="!w-auto">
                    <div
                      className="flex h-full w-full min-h-[330px] flex-col justify-between rounded-3xl 
                        border border-white/20 bg-white/60 backdrop-blur-xl 
                        p-7 shadow-[0_8px_20px_rgba(0,0,0,0.05)]"
                    >
                      <div>
                        {/* Rating */}
                        <div className="mb-4 flex gap-1 text-brand-400">
                          {Array.from({ length: item.rating }).map((_, i) => (
                            <Star key={i} size={18} fill="currentColor" />
                          ))}
                        </div>

                        {/* Message */}
                        <p className="text-lg leading-relaxed text-brand-800 italic">
                          "{item.message}"
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="mt-6 flex items-center gap-4">
                        <div className="h-16 w-16 overflow-hidden rounded-full bg-brand-400/10">
                          {item.image ? (
                            <img
                              src={getUploadUrl(item.image)}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-brand-400/10 text-xl font-semibold text-brand-700">
                              {item.name[0]}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-brand-900">{item.name}</p>
                          <p className="text-sm text-brand-500">Verified Client</p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>

          {/* RIGHT — FEEDBACK FORM */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            onSubmit={handleSubmit}
            className="glass-panel rounded-[2rem] p-8"
          >
            <h3 className="text-2xl font-semibold text-brand-900">Share Your Experience</h3>
            <p className="mt-1 text-brand-700">Feedback will appear after admin approval.</p>

            <div className="mt-6 space-y-4">
              <input
                required
                value={formData.name}
                onChange={(e) => setFormData((v) => ({ ...v, name: e.target.value }))}
                placeholder="Your Name"
                className="w-full rounded-2xl border-brand-900/10 bg-brand-50/80 px-4 py-3 text-brand-900"
              />

              <select
                value={formData.rating}
                onChange={(e) =>
                  setFormData((v) => ({ ...v, rating: Number(e.target.value) }))
                }
                className="w-full rounded-2xl border-brand-900/10 bg-brand-50/80 px-4 py-3 text-brand-900"
              >
                {[5, 4, 3, 2, 1].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating} Star{rating > 1 ? 's' : ''}
                  </option>
                ))}
              </select>

              <textarea
                required
                rows="4"
                minLength={10}
                value={formData.message}
                onChange={(e) => setFormData((v) => ({ ...v, message: e.target.value }))}
                placeholder="Write your feedback"
                className="w-full rounded-2xl border-brand-900/10 bg-brand-50/80 px-4 py-3 text-brand-900"
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData((v) => ({ ...v, image: e.target.files?.[0] || null }))
                }
                className="w-full rounded-2xl border-brand-900/10 bg-brand-50/80 px-4 py-3 text-brand-700 
                file:mr-4 file:rounded-full file:border-0 file:bg-brand-400 file:px-4 file:py-2 file:text-brand-50"
              />

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-brand-400 px-6 py-3 font-semibold text-brand-50 transition hover:bg-brand-600 disabled:opacity-60"
              >
                {submitting ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section >
  );
};

export default TestimonialsSection;
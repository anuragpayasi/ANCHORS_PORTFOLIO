import { motion } from 'framer-motion';
import { CalendarDays, MapPin } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import SectionHeading from './SectionHeading.jsx';
import { formatDate } from '../utils/helpers.js';
import { getUploadUrl } from '../utils/api.js';

const EventsSection = ({ events, loading }) => (
  <section id="events" className="py-24">
    <div className="section-shell">
      <SectionHeading
        eyebrow="Featured Events"
        title="Recent and upcoming shows presented with poise, rhythm, and audience-first energy."
        description="This event slider is powered by the backend, so new shows can be added directly from the admin dashboard."
      />

      {loading ? (
        <div className="glass-panel rounded-[2rem] p-10 text-brand-700">Loading event highlights...</div>
      ) : (
        <Swiper
          modules={[Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{ delay: 3200 }}
          breakpoints={{ 768: { slidesPerView: 2 }, 1200: { slidesPerView: 3 } }}
        >
          {events.map((event) => (
            <SwiperSlide key={event._id}>
              <motion.article whileHover={{ y: -4 }} className="glass-panel h-full overflow-hidden rounded-[2rem]">
                <img src={getUploadUrl(event.image)} alt={event.name} className="h-64 w-full object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-brand-900">{event.name}</h3>
                  <p className="mt-3 leading-7 text-brand-700">{event.description}</p>
                  <div className="mt-6 space-y-2 text-sm text-brand-500">
                    <div className="flex items-center gap-2">
                      <CalendarDays size={16} />
                      {formatDate(event.date)}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      {event.location}
                    </div>
                  </div>
                </div>
              </motion.article>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  </section>
);

export default EventsSection;

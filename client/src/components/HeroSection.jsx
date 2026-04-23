import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, MessageCircle, Mic2, Sparkles } from 'lucide-react';
import { getWhatsAppLink } from '../utils/helpers.js';
import profilePlaceholder from '../assets/profile-placeholder.svg';

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 120]);
  const bookingEmail = import.meta.env.VITE_BOOKING_EMAIL || 'bookings@example.com';

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-mesh pt-28">
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(192,133,82,0.10),transparent_42%)]"
      />
      <div className="section-shell relative flex min-h-[calc(100vh-7rem)] flex-col items-center justify-center gap-14 py-16 lg:flex-row">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 rounded-full border border-brand-400/25 bg-white/75 px-4 py-2 text-sm text-brand-600"
          >
            <Sparkles size={16} />
            Premium stage presence for unforgettable live experiences
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.9 }}
            className="mt-8 text-5xl font-bold leading-tight text-brand-900 md:text-7xl"
          >
            Professional <span className="text-gradient">Anchor & Event Host</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.9 }}
            className="mt-6 max-w-2xl text-lg leading-8 text-brand-700 md:text-xl"
          >
            Anchor | Event Host | Stage Performer
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9 }}
            className="mt-4 max-w-2xl text-base leading-8 text-brand-700/90"
          >
            Weddings | Corporate Events | Award Nights | College Fests | Celebrity Shows
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand-400 px-7 py-3.5 font-semibold text-brand-50 transition hover:-translate-y-1 hover:bg-brand-600"
            >
              <MessageCircle size={18} />
              Book Me on WhatsApp
            </a>
            <a
              href={`mailto:${bookingEmail}`}
              className="inline-flex items-center gap-2 rounded-full border border-brand-400/35 px-7 py-3.5 font-semibold text-brand-900 transition hover:-translate-y-1 hover:border-brand-600 hover:bg-white/70"
            >
              <Mail size={18} />
              Email for Booking
            </a>
          </motion.div>
        </div>

        <motion.div
  initial={{ opacity: 0, scale: 0.94, rotate: -3 }}
  animate={{ opacity: 1, scale: 1, rotate: 0 }}
  transition={{ delay: 0.25, duration: 0.9 }}
  className="
    relative flex w-full max-w-md
    h-[420px] sm:h-[480px] md:h-[520px]
    items-center justify-center
  "
>
  <div className="absolute inset-0 rounded-[2.5rem] bg-brand-400/10 blur-2xl" />

  <div
    className="
      glass-panel relative flex w-full h-full flex-col justify-between
      overflow-hidden rounded-[2.5rem] p-5 sm:p-6 md:p-8
      shadow-glow
    "
  >
    {/* Top Section */}
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-brand-400">
          Live Host
        </p>
        <p className="mt-2 text-lg sm:text-xl md:text-2xl font-semibold text-brand-900">
          Stage-Ready Presence
        </p>
      </div>

      <div className="rounded-2xl bg-brand-400/12 p-2 sm:p-3 text-brand-600">
        <Mic2 size={22} className="sm:w-6 sm:h-6" />
      </div>
    </div>

    {/* Image */}
    <div
      className="
        mx-auto overflow-hidden rounded-[2rem]
        border border-brand-900/10 shadow-glow
      "
    >
      <img
        src="https://event-manpower-hyderabad.kontactus.in/assets/images/female-anchor-emcee-in-hyderabad-1.jpg"
        alt="Professional anchor placeholder"
        className="
          object-cover
          object-center
          h-48 w-48
          sm:h-56 sm:w-56
          md:h-64 md:w-64
        "
      />
    </div>

    {/* Bottom Stats */}
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      <div className="rounded-2xl border border-brand-900/8 bg-brand-50/75 p-3 sm:p-4">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-brand-400">
          Experience
        </p>
        <p className="mt-2 text-lg sm:text-xl font-semibold text-brand-900">
          Premium Events
        </p>
      </div>

      <div className="rounded-2xl border border-brand-900/8 bg-brand-50/75 p-3 sm:p-4">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-brand-400">
          Style
        </p>
        <p className="mt-2 text-lg sm:text-xl font-semibold text-brand-900">
          Energetic & Interactive
        </p>
      </div>
    </div>
  </div>
</motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

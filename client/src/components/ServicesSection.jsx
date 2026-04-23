import { motion } from 'framer-motion';
import {
  Award,
  BriefcaseBusiness,
  Gift,
  HandPlatter,
  Music4,
  PartyPopper,
  Rocket,
} from 'lucide-react';
import SectionHeading from './SectionHeading.jsx';

const services = [
  { title: 'Corporate Event Hosting', icon: BriefcaseBusiness, price: 'Starting from custom quote', description: 'Ideal for conferences, annual days, leadership meetings, and business showcases.' },
  { title: 'Wedding Hosting', icon: Gift, price: 'Starting from custom quote', description: 'Elegant hosting for couple entries, rituals, family moments, and reception highlights.' },
  { title: 'College Fests', icon: PartyPopper, price: 'Starting from custom quote', description: 'Fast-paced and youth-driven stage hosting for campus events and headline acts.' },
  { title: 'Product Launches', icon: Rocket, price: 'Starting from custom quote', description: 'Premium brand presentation, reveal moments, and audience engagement for launches.' },
  { title: 'Award Ceremonies', icon: Award, price: 'Starting from custom quote', description: 'Refined and well-paced hosting that elevates the recognition experience.' },
  { title: 'Sangeet Hosting', icon: Music4, price: 'Starting from custom quote', description: 'Music-led, playful, and family-friendly hosting for energetic celebration nights.' },
  { title: 'Social Events', icon: HandPlatter, price: 'Starting from custom quote', description: 'High-touch hosting for private gatherings, milestone parties, and curated experiences.' },
];

const ServicesSection = () => (
  <section id="services" className="py-24">
    <div className="section-shell">
      <SectionHeading
        eyebrow="Services"
        title="Versatile hosting for every format, from premium boardrooms to high-energy celebration stages."
        description="Every service includes event briefing, stage scripting support, host flow planning, and on-stage audience connection."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map(({ title, icon: Icon, price, description }, index) => (
          <motion.article
            key={title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.7 }}
            whileHover={{ y: -6 }}
            className="glass-panel group rounded-[1.8rem] p-7 shadow-glow"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-400/12 text-brand-600 transition group-hover:bg-brand-400/18">
              <Icon size={26} />
            </div>
            <h3 className="mt-6 text-2xl font-semibold text-brand-900">{title}</h3>
            <p className="mt-3 leading-7 text-brand-700">{description}</p>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-brand-400">{price}</p>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;

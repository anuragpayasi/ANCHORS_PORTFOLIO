import { motion } from 'framer-motion';
import { Building2, GraduationCap, Handshake, HeartHandshake } from 'lucide-react';
import SectionHeading from './SectionHeading.jsx';

const eventTypes = [
  { icon: Building2, title: 'Corporate', text: 'Sharp delivery for conferences, annual meets, and leadership summits.' },
  { icon: HeartHandshake, title: 'Weddings', text: 'Warm, elegant hosting for every emotional and celebratory moment.' },
  { icon: GraduationCap, title: 'College Fests', text: 'High-energy engagement for youth audiences, celebrity acts, and crowd games.' },
  { icon: Handshake, title: 'Launch Events', text: 'Premium stage communication for brand reveals and product storytelling.' },
];

const AboutSection = () => (
  <section id="about" className="py-24">
    <div className="section-shell">
      <SectionHeading
        eyebrow="About"
        title="A hosting style that feels lively, polished, and deeply connected to the audience."
        description="This portfolio is built around a professional emcee presence designed for modern events. The anchoring style blends energy, elegance, crowd interaction, and precise timing so every event feels seamless from welcome note to final spotlight."
      />

      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-panel rounded-[2rem] p-8 shadow-glow"
        >
          <p className="text-lg leading-8 text-brand-700">
            Known for an energetic, engaging, and interactive approach, the stage presence is crafted to keep the
            audience invested while maintaining a premium and professional tone. From ceremonial elegance to
            high-tempo entertainment, each segment is tailored to the event mood, brand voice, and guest profile.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {['Energetic delivery', 'Interactive audience flow', 'Professional stage command', 'Custom event scripting'].map(
              (item) => (
                <div key={item} className="rounded-2xl border border-brand-900/8 bg-brand-50/75 p-4 text-brand-800">
                  {item}
                </div>
              )
            )}
          </div>
        </motion.div>

        <div className="grid gap-4">
          {eventTypes.map(({ icon: Icon, title, text }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.65 }}
              whileHover={{ rotateX: 6, rotateY: -6, translateY: -4 }}
              className="glass-panel rounded-[1.75rem] p-6 transition-transform"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-brand-400/12 p-3 text-brand-600">
                  <Icon size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-brand-900">{title}</h3>
                  <p className="mt-2 leading-7 text-brand-700">{text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;

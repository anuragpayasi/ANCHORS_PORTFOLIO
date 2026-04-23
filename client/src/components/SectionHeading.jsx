import { motion } from 'framer-motion';

const SectionHeading = ({ eyebrow, title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.7 }}
    className="mb-12 max-w-3xl"
  >
    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-brand-400">{eyebrow}</p>
    <h2 className="text-3xl font-bold tracking-tight text-brand-900 md:text-5xl">{title}</h2>
    <p className="mt-4 text-base leading-7 text-brand-700 md:text-lg">{description}</p>
  </motion.div>
);

export default SectionHeading;

import { motion } from 'framer-motion';
import useMouseGlow from '../hooks/useMouseGlow.js';

const CursorGlow = () => {
  const { x, y } = useMouseGlow();

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-10 h-72 w-72 rounded-full bg-brand-400/8 blur-3xl"
        animate={{ x: x - 144, y: y - 144 }}
        transition={{ type: 'spring', stiffness: 60, damping: 25, mass: 0.2 }}
      />
      <motion.div
        className="pointer-events-none fixed z-10 h-28 w-28 rounded-full bg-brand-600/10 blur-2xl"
        animate={{ x: x - 56, y: y - 56 }}
        transition={{ type: 'spring', stiffness: 100, damping: 30, mass: 0.15 }}
      />
    </>
  );
};

export default CursorGlow;

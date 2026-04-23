import { useState } from 'react';
import { motion } from 'framer-motion';
import { PlayCircle } from 'lucide-react';
import SectionHeading from './SectionHeading.jsx';
import Lightbox from './Lightbox.jsx';
import { getUploadUrl } from '../utils/api.js';

const GallerySection = ({ gallery, loading }) => {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <section id="gallery" className="py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Gallery"
          title="A stage portfolio with image moments, event stills, and embedded video highlights."
          description="The gallery supports both uploaded images and YouTube links, with a responsive masonry layout and full-screen preview."
        />

        {loading ? (
          <div className="glass-panel rounded-[2rem] p-10 text-brand-700">Loading gallery...</div>
        ) : (
          <div className="grid-masonry">
            {gallery.map((item, index) => (
              <motion.button
                key={item._id}
                type="button"
                onClick={() => setActiveItem(item)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.6 }}
                className="group glass-panel mb-4 overflow-hidden rounded-[1.7rem] text-left"
              >
                <div className="relative">
                  {item.type === 'youtube' ? (
                    <div className="flex aspect-video items-center justify-center bg-brand-600">
                      <PlayCircle className="text-brand-50" size={72} />
                    </div>
                  ) : (
                    <img
                      src={getUploadUrl(item.image)}
                      alt={item.title}
                      className="w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-900/85 to-transparent p-5">
                    <p className="text-xs uppercase tracking-[0.3em] text-brand-100">{item.category}</p>
                    <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      <Lightbox item={activeItem} onClose={() => setActiveItem(null)} />
    </section>
  );
};

export default GallerySection;

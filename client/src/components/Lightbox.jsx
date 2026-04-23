import { X } from 'lucide-react';
import { getUploadUrl } from '../utils/api.js';
import { getYouTubeEmbedUrl } from '../utils/helpers.js';

const Lightbox = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-900/75 p-4 backdrop-blur-lg">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-6 top-6 rounded-full border border-white/20 bg-white/10 p-3 text-white"
        aria-label="Close lightbox"
      >
        <X />
      </button>

      <div className="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/20 bg-brand-50 shadow-glow">
        {item.type === 'youtube' ? (
          <div className="aspect-video">
            <iframe
              src={getYouTubeEmbedUrl(item.youtubeUrl)}
              title={item.title}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <img src={getUploadUrl(item.image)} alt={item.title} className="max-h-[80vh] w-full object-cover" />
        )}
      </div>
    </div>
  );
};

export default Lightbox;

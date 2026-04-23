export const formatDate = (date) =>
  new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));

export const getYouTubeEmbedUrl = (url) => {
  if (!url) return '';
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
};

export const getWhatsAppLink = () =>
  `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '919999999999'}?text=${encodeURIComponent(
    'Hello, I would like to book you for an event.'
  )}`;

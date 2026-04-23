import { Instagram, Linkedin, Youtube } from 'lucide-react';

const Footer = () => (
  <footer className="border-t border-brand-900/10 py-10">
    <div className="section-shell flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
      <div>
        <p className="text-lg font-semibold text-brand-900">Professional Anchor Portfolio</p>
        <p className="mt-2 text-brand-700">bookings@example.com | +91 99999 99999</p>
      </div>
      <div className="flex items-center gap-4 text-brand-700">
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="rounded-full border border-brand-900/10 p-3 hover:text-brand-500">
          <Instagram size={18} />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noreferrer" className="rounded-full border border-brand-900/10 p-3 hover:text-brand-500">
          <Youtube size={18} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="rounded-full border border-brand-900/10 p-3 hover:text-brand-500">
          <Linkedin size={18} />
        </a>
      </div>
      <p className="text-sm text-brand-500">© {new Date().getFullYear()} Professional Event Anchor. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Events', href: '#events' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <nav className="section-shell mt-4">
        <div className="glass-panel flex items-center justify-between rounded-full px-5 py-4 shadow-glow">
          <a href="#home" className="text-lg font-semibold tracking-[0.2em] text-brand-900">
            ANCHOR
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-brand-700 transition hover:text-brand-500"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="rounded-full bg-brand-400 px-5 py-2.5 text-sm font-semibold text-brand-50 transition hover:bg-brand-600"
            >
              Book Now
            </a>
          </div>

          <button
            type="button"
            className="inline-flex rounded-full border border-brand-900/10 p-2 text-brand-900 lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <div className="glass-panel mt-3 rounded-3xl px-5 py-4 lg:hidden">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-brand-700 transition hover:text-brand-500"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

import { useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import HeroSection from '../components/HeroSection.jsx';
import AboutSection from '../components/AboutSection.jsx';
import ServicesSection from '../components/ServicesSection.jsx';
import EventsSection from '../components/EventsSection.jsx';
import GallerySection from '../components/GallerySection.jsx';
import TestimonialsSection from '../components/TestimonialsSection.jsx';
import ContactSection from '../components/ContactSection.jsx';
import Footer from '../components/Footer.jsx';
import CursorGlow from '../components/CursorGlow.jsx';
import useApi from '../hooks/useApi.js';
import useSmoothScroll from '../hooks/useSmoothScroll.js';
import api from '../utils/api.js';
import { registerReveal } from '../animations/reveal.js';

const HomePage = () => {
  useSmoothScroll();
  const eventsState = useApi('/events', []);
  const galleryState = useApi('/gallery', []);
  const feedbackState = useApi('/feedback', []);

  useEffect(() => {
    registerReveal('.glass-panel');
  }, []);

  const refreshFeedback = async () => {
    const response = await api.get('/feedback');
    feedbackState.setData(response.data.feedback);
  };

  return (
    <div className="relative overflow-hidden bg-brand-50">
      <CursorGlow />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <EventsSection events={eventsState.data} loading={eventsState.loading} />
        <GallerySection gallery={galleryState.data} loading={galleryState.loading} />
        <TestimonialsSection
          feedback={feedbackState.data}
          loading={feedbackState.loading}
          refreshFeedback={refreshFeedback}
        />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;

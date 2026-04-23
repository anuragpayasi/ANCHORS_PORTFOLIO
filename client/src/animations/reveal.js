import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const registerReveal = (selector) => {
  gsap.utils.toArray(selector).forEach((item) => {
    gsap.fromTo(
      item,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
        },
      }
    );
  });
};

// import Event from '../models/Event.js';
// import Feedback from '../models/Feedback.js';
// import GalleryItem from '../models/GalleryItem.js';

// const defaultEvents = [
//   {
//     name: 'Global Leadership Summit 2026',
//     date: '2026-08-14',
//     location: 'Mumbai',
//     description: 'Corporate leadership summit with live audience engagement, keynote transitions, and high-energy stage control.',
//     image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
//   },
//   {
//     name: 'Royal Wedding Celebration',
//     date: '2026-11-28',
//     location: 'Jaipur',
//     description: 'Luxury wedding hosting with custom couple storytelling, family games, and crowd interaction.',
//     image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
//   },
//   {
//     name: 'Campus Pulse Fest',
//     date: '2026-09-09',
//     location: 'Delhi',
//     description: 'Youth-focused hosting for celebrity performances, competitions, and sponsor engagement segments.',
//     image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1200&q=80',
//   },
// ];

// const defaultFeedback = [
//   {
//     name: 'Ritika Sharma',
//     rating: 5,
//     message: 'The stage command, humor, and audience engagement were outstanding from the first cue to the final applause.',
//     status: 'approved',
//   },
//   {
//     name: 'Amit Verma',
//     rating: 5,
//     message: 'Our product launch felt premium and polished because every segment was introduced with confidence and clarity.',
//     status: 'approved',
//   },
//   {
//     name: 'Neha Kapoor',
//     rating: 5,
//     message: 'The wedding flow stayed energetic and emotional in all the right moments. Guests were fully involved throughout.',
//     status: 'approved',
//   },
//   {
//     name: 'Kunal Bhatia',
//     rating: 4,
//     message: 'Excellent hosting for our college fest with sharp crowd work, sponsor mentions, and seamless transitions.',
//     status: 'approved',
//   },
//   {
//     name: 'Priya Malhotra',
//     rating: 5,
//     message: 'Professional, elegant, and incredibly adaptable on stage. The award ceremony felt smooth and high-impact.',
//     status: 'approved',
//   },
// ];

// const defaultGallery = [
//   {
//     title: 'Corporate Gala Evening',
//     category: 'Corporate',
//     type: 'image',
//     image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
//   },
//   {
//     title: 'Wedding Stage Highlights',
//     category: 'Wedding',
//     type: 'image',
//     image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
//   },
//   {
//     title: 'Launch Event Reel',
//     category: 'Launch',
//     type: 'youtube',
//     youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
//   },
//   {
//     title: 'College Fest Crowd',
//     category: 'College Fest',
//     type: 'image',
//     image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
//   },
// ];

// const seedCollection = async (Model, documents) => {
//   const count = await Model.countDocuments();

//   if (!count) {
//     await Model.insertMany(documents);
//   }
// };

// const seedContent = async () => {
//   await Promise.all([
//     seedCollection(Event, defaultEvents),
//     seedCollection(Feedback, defaultFeedback),
//     seedCollection(GalleryItem, defaultGallery),
//   ]);
// };

// export default seedContent;

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  Users, Shield, Baby,
  Scale, Globe, ArrowRight, ChevronRight, ChevronLeft,
  HandHeart, Target, Activity,
} from 'lucide-react';
import CountUp from '../components/CountUp';
import NewsletterForm from '../components/NewsletterForm';
import { impactStats, impactStories, partners } from '../data/content';

const heroSlides = [
  {
    src: 'https://i.postimg.cc/Njxp4BRv/69.jpg',
    alt: 'MyCare Life community transformation initiative',
  },
  {
    src: 'https://i.postimg.cc/CxpMGRJr/289d7ec9-343e-4ebd-b751-2cafd44239b7-E8658E15-14E5-4A9D-92BD-14B2B9E34B05.jpg',
    alt: 'MyCare Life community development initiative',
  },
  {
    src: 'https://i.postimg.cc/TPGw6KDm/c378b4a9-89f0-4ec0-8f22-e875bc0d3a3a-D21BF61A-674A-4BD7-A8C9-03CF0DC159E2.jpg',
    alt: 'MyCare Life volunteerism and community engagement',
  },
  {
    src: 'https://i.postimg.cc/zfJJQ4sn/18e05eba-06b1-4e46-94d2-08978cd2c28a-ED6AB1EA-C23B-4E56-861E-3301F31F83FF.jpg',
    alt: 'MyCare Life youth empowerment program',
  },
  {
    src: 'https://i.postimg.cc/RhzDdmpS/IMG-0412.jpg',
    alt: 'MyCare Life multi-stakeholder engagement',
  },
  {
    src: 'https://i.postimg.cc/V6bZDCLt/IMG-0986.jpg',
    alt: 'MyCare Life event at the National Assembly',
  },
];

const featuredPrograms = [
  { id: 'youth-empowerment', title: 'Youth & Creativity Initiative', description: 'Skills, mentorship and leadership development for young people.', icon: Users },
  { id: 'good-governance', title: 'Good Governance Advocacy', description: 'Civic education, transparency and accountability campaigns.', icon: Scale },
  { id: 'indigenous-empowerment', title: 'Indigenous Empowerment', description: 'Rights, representation and inclusion of indigenous populations.', icon: Globe },
  { id: 'child-rights', title: 'Child Rights Advocacy', description: 'Protection, shelter and rehabilitation for vulnerable children.', icon: Baby },
  { id: 'womens-empowerment', title: "Women's Empowerment", description: 'Economic empowerment, legal aid and gender equality programs.', icon: Shield },
  { id: 'health-outreach', title: 'Health Outreach', description: 'Community health screenings, eye care and maternal health.', icon: Activity },
];

export default function HomePage() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setSlide((s) => (s + 1) % heroSlides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setSlide((s) => (s - 1 + heroSlides.length) % heroSlides.length);
  const next = () => setSlide((s) => (s + 1) % heroSlides.length);

  return (
    <div>
      {/* Hero Slideshow */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#0F172A' }}>
        <div className="absolute inset-0">
          {heroSlides.map((s, i) => (
            <img
              key={i}
              src={s.src}
              alt={i === slide ? s.alt : ''}
              aria-hidden={i !== slide}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
              style={{ opacity: i === slide ? 1 : 0 }}
            />
          ))}
          <div className="absolute inset-0" aria-hidden="true" style={{ background: 'linear-gradient(to right, rgba(15,23,42,0.45) 0%, rgba(15,23,42,0.38) 50%, rgba(15,23,42,0.35) 100%)' }} />
        </div>

        {/* Slide controls */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="w-2.5 h-2.5 rounded-full transition-all"
              style={{ backgroundColor: i === slide ? '#6eb7c7' : 'rgba(255,255,255,0.4)' }}
            />
          ))}
        </div>
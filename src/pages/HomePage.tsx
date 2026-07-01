import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  Heart, GraduationCap, Users, Shield, TreePine, Baby,
  Scale, Globe, ArrowRight, ChevronRight, ChevronLeft,
  HandHeart, Target, Activity, BookOpen,
} from 'lucide-react';
import CountUp from '../components/CountUp';
import NewsletterForm from '../components/NewsletterForm';
import { impactStats, impactStories, partners } from '../data/content';

const heroSlides = [
  {
    src: 'https://i.postimg.cc/TPGw6KDm/c378b4a9-89f0-4ec0-8f22-e875bc0d3a3a-D21BF61A-674A-4BD7-A8C9-03CF0DC159E2.jpg',
    alt: 'MyCare Life volunteerism and community engagement',
  },
  {
    src: 'https://i.postimg.cc/zfJJQ4sn/18e05eba-06b1-4e46-94d2-08978cd2c28a-ED6AB1EA-C23B-4E56-861E-3301F31F83FF.jpg',
    alt: 'MyCare Life youth empowerment program',
  },
  {
    src: 'https://i.postimg.cc/CxpMGRJr/289d7ec9-343e-4ebd-b751-2cafd44239b7-E8658E15-14E5-4A9D-92BD-14B2B9E34B05.jpg',
    alt: 'MyCare Life community development initiative',
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
              style={{ opacity: i === slide ? 0.4 : 0 }}
            />
          ))}
          <div className="absolute inset-0" aria-hidden="true" style={{ background: 'linear-gradient(to right, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.72) 50%, rgba(15,23,42,0.45) 100%)' }} />
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6" style={{ backgroundColor: 'rgba(110,183,199,0.15)', border: '1px solid rgba(110,183,199,0.3)', color: '#6eb7c7' }}>
              <Globe className="w-4 h-4" aria-hidden="true" />
              Transforming lives, Building sustainable communities
            </div>
            <h1 className="font-display font-bold text-white leading-tight mb-6" style={{ fontSize: 'clamp(36px,5vw,56px)', color: '#ffffff' }}>
              Transforming Lives.{' '}
              <span style={{ color: '#6eb7c7' }}>Building Hope.</span>{' '}
              Creating Change.
            </h1>
            <p className="text-lg md:text-xl leading-relaxed mb-8 max-w-2xl" style={{ color: '#cbd5e1' }}>
              MyCare Life Development Organization is a youth-led humanitarian and development organization dedicated to advancing civic inclusion, accountability, policy, poverty reduction, and community empowerment. We work with indigenous and vulnerable populations to create sustainable solutions and lasting impact across Nigeria and Africa.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/donate" className="btn-primary text-base px-8 py-4">
                <HandHeart className="w-5 h-5 mr-2" aria-hidden="true" />
                Donate Now
              </Link>
              <Link
                to="/volunteer"
                className="inline-flex items-center justify-center text-base px-8 py-4 border-2 rounded-lg font-semibold transition-colors"
                style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#ffffff' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                Volunteer With Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="relative -mt-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {impactStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                  <p className="text-sm text-gray-600 mt-2 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="accent-line mx-auto" />
            <p className="font-semibold text-sm uppercase tracking-wider mb-2" style={{ color: '#6eb7c7' }}>Our Programs</p>
            <h2 className="section-heading">What We Do</h2>
            <p className="section-subheading mx-auto mt-4">
              Through our core program areas, we address the most pressing challenges facing Nigerian communities.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPrograms.map((program) => {
              const Icon = program.icon;
              return (
                <Link
                  key={program.id}
                  to={`/programs#${program.id}`}
                  aria-label={`Learn about ${program.title}`}
                  className="card group p-6 hover:border-[#6eb7c7]"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors"
                    style={{ backgroundColor: '#f0f9fb' }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#d8f1f6')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#f0f9fb')}
                  >
                    <Icon className="w-6 h-6" aria-hidden="true" style={{ color: '#6eb7c7' }} />
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: '#0F172A', fontFamily: 'Poppins, system-ui, sans-serif', fontWeight: 600, fontSize: '18px' }}>
                    {program.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: '#374151' }}>{program.description}</p>
                  <span className="inline-flex items-center text-sm font-medium" aria-hidden="true" style={{ color: '#6eb7c7' }}>
                    Learn more <ChevronRight className="w-4 h-4" />
                  </span>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <Link to="/programs" className="btn-outline">
              View All Programs <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects CTA */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#f8fafc' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="accent-line" />
              <p className="font-semibold text-sm uppercase tracking-wider mb-2" style={{ color: '#6eb7c7' }}>Active Projects</p>
              <h2 className="section-heading mb-4">Making a Difference on the Ground</h2>
              <p className="leading-relaxed mb-6" style={{ color: '#374151', fontSize: '18px' }}>
                From empowering over 1,000 young citizens nationwide to training both youth and children, our projects deliver measurable impact in communities across Nigeria.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Green Nigeria Initiative - 25,000+ beneficiaries',
                  'Education for All - 12,000+ children reached',
                  'Youth and Creativity Initiative - 78% employment rate',
                  'Women Rising Economic Program - 3,500+ women empowered',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm" style={{ color: '#374151' }}>
                    <Target className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" style={{ color: '#D4A64A' }} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/projects" className="btn-primary">
                View All Projects <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://i.postimg.cc/pVfsYgfD/cb842b49-02b0-45da-87b6-61d9d3e3468f.jpg"
                alt="MyCare team working with community members on an active project"
                className="rounded-2xl shadow-lg w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                <div className="text-2xl font-bold" style={{ color: '#6eb7c7', fontFamily: 'Poppins, system-ui, sans-serif' }}>55+</div>
                <div className="text-sm text-gray-600">Projects Completed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community photo section */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <img
                src="https://i.postimg.cc/sxFczJ5T/IMG-0650.jpg"
                alt="MyCare program participants in community empowerment session"
                className="rounded-2xl shadow-lg w-full"
              />
              <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                <div className="text-2xl font-bold" style={{ color: '#D4A64A', fontFamily: 'Poppins, system-ui, sans-serif' }}>1,000+</div>
                <div className="text-sm text-gray-600">Lives Impacted</div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="accent-line" />
              <p className="font-semibold text-sm uppercase tracking-wider mb-2" style={{ color: '#6eb7c7' }}>Community Impact</p>
              <h2 className="section-heading mb-4">Rooted in Communities, Driven by Purpose</h2>
              <p className="leading-relaxed mb-6" style={{ color: '#374151', fontSize: '18px' }}>
                Our work reaches the most vulnerable people in Nigerian communities — indigenous populations, youth, women, and children — through programs designed with them, not just for them.
              </p>
              <Link to="/about" className="btn-primary">
                Our Story <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stories Preview */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#f8fafc' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-14">
            <div>
              <div className="accent-line" />
              <p className="font-semibold text-sm uppercase tracking-wider mb-2" style={{ color: '#6eb7c7' }}>Impact Stories</p>
              <h2 className="section-heading">Stories of Change</h2>
            </div>
            <Link to="/impact-stories" className="hidden md:inline-flex items-center font-semibold hover:opacity-80 transition-opacity" style={{ color: '#6eb7c7' }}>
              View All Stories <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {impactStories.slice(0, 3).map((story) => (
              <Link key={story.id} to="/impact-stories" aria-label={`Read: ${story.title}`} className="card group">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3" style={{ backgroundColor: '#f0f9fb', color: '#3a8fa4' }}>
                    {story.category}
                  </span>
                  <h3 className="font-bold mb-2 transition-colors line-clamp-2" style={{ color: '#0F172A', fontSize: '18px', fontFamily: 'Poppins, system-ui, sans-serif' }}>
                    {story.title}
                  </h3>
                  <p className="text-sm line-clamp-2" style={{ color: '#374151' }}>{story.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link to="/impact-stories" className="btn-outline">View All Stories</Link>
          </div>
        </div>
      </section>

      {/* Partners Banner — logos */}
      <section className="py-16 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="accent-line mx-auto" />
            <p className="font-semibold text-sm uppercase tracking-wider mb-2" style={{ color: '#6eb7c7' }}>Our Partners</p>
            <h2 className="text-2xl font-bold" style={{ color: '#0F172A', fontFamily: 'Poppins, system-ui, sans-serif' }}>Trusted by Leading Organizations</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 items-center">
            {partners.map((partner) => (
              <div
                key={partner.name}
                title={partner.name}
                className="bg-white rounded-xl p-3 flex items-center justify-center border border-gray-100 hover:shadow-md transition-all aspect-square"
                style={{ borderColor: '#e5e7eb' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#6eb7c7')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '#e5e7eb')}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + Newsletter */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ backgroundColor: '#0F172A' }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: '#6eb7c7' }} />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: '#D4A64A' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Join Us in Making a Difference
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: '#94a3b8' }}>
            Whether you donate, volunteer, or simply spread the word, your support helps transform lives in communities across Nigeria.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link to="/donate" className="inline-flex items-center gap-2 px-8 py-4 bg-white font-bold rounded-lg hover:bg-gray-50 transition-colors shadow-lg" style={{ color: '#6eb7c7' }}>
              <HandHeart className="w-5 h-5" aria-hidden="true" />
              Make a Donation
            </Link>
            <Link
              to="/volunteer"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 font-bold rounded-lg transition-colors"
              style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#ffffff' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <Users className="w-5 h-5" aria-hidden="true" />
              Become a Volunteer
            </Link>
          </div>
          <div className="max-w-lg mx-auto">
            <p className="text-sm mb-4" style={{ color: '#94a3b8' }}>Subscribe to our newsletter to stay updated:</p>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

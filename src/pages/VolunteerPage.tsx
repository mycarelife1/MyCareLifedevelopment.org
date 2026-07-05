import { useState, useId, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Users, CheckCircle, MapPin, Clock, Heart } from 'lucide-react';

const areas = [
  'Education & Tutoring',
  'Community Outreach',
  'Tree Planting & Climate',
  'Youth Mentoring',
  'Women Empowerment',
  'Child Rights Advocacy',
  'Disability Inclusion Support',
  'Counseling & Mental Health',
  'Good Governance Campaigns',
  'Administrative Support',
];

const availabilities = ['Weekdays', 'Weekends', 'Both', 'Flexible'];

const volunteerSlides = [
  'https://i.postimg.cc/xTv8FGkQ/786237b3-d5a5-407c-9b3d-f79d46018973-E672ED05-1A2B-4841-A329-BA83D696DBE8.jpg',
  'https://i.postimg.cc/76vvvqQq/c378b4a9-89f0-4ec0-8f22-e875bc0d3a3a-D21BF61A-674A-4BD7-A8C9-03CF0DC159E2.jpg',
  'https://i.postimg.cc/BbDb3HMr/df08d04f-ef57-4d3b-ace9-097df12e9680-BE712D78-4CAA-407E-A971-864A7E823A8E.jpg',
];

export default function VolunteerPage() {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    area_of_interest: '',
    availability: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setSlide((s) => (s + 1) % volunteerSlides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  // Stable IDs for label associations (WCAG 1.3.1)
  const fullNameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const areaId = useId();
  const availabilityGroupId = useId();
  const messageId = useId();
  const errorId = useId();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setStatus('loading');
    const { error } = await supabase.from('volunteers').insert(form);
    setStatus(error ? 'error' : 'success');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#0F172A' }}>
        <div className="absolute inset-0">
          {volunteerSlides.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
              style={{ opacity: i === slide ? 1 : 0 }}
            />
          ))}
          <div className="absolute inset-0" aria-hidden="true" style={{ background: 'linear-gradient(to right, rgba(15,23,42,0.45), rgba(15,23,42,0.38), rgba(15,23,42,0.35))' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <p className="font-semibold text-sm uppercase tracking-wider mb-2" style={{ color: '#6eb7c7' }}>Volunteer</p>
          <h1 className="font-display font-bold text-white mb-6" style={{ fontSize: 'clamp(36px,5vw,56px)' }}>
            Make Your Impact Count
          </h1>
          <p className="text-lg max-w-2xl leading-relaxed" style={{ color: '#cbd5e1' }}>
            Join our team of 100+ volunteers making a difference in communities across Nigeria. Your time and skills can change lives.
          </p>
        </div>
      </section>
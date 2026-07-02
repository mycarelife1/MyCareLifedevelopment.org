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
  'https://i.postimg.cc/bvCC7b67/bbce17bb-567a-4b50-9939-5a74f689c456-1AD51FC3-F48D-418F-B816-6D03C02A5D21.jpg',
  'https://i.postimg.cc/xTv8FGkQ/786237b3-d5a5-407c-9b3d-f79d46018973-E672ED05-1A2B-4841-A329-BA83D696DBE8.jpg',
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
              style={{ opacity: i === slide ? 0.3 : 0 }}
            />
          ))}
          <div className="absolute inset-0" aria-hidden="true" style={{ background: 'linear-gradient(to right, rgba(15,23,42,0.9), rgba(15,23,42,0.6))' }} />
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

      {/* Why Volunteer */}
      <section className="py-20 md:py-28" aria-label="Why volunteer with us">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Heart,
                title: 'Create Impact',
                desc: 'Directly contribute to programs that alleviate poverty, educate children, and empower communities.',
              },
              {
                icon: Users,
                title: 'Join a Community',
                desc: 'Connect with like-minded individuals passionate about social change and community development.',
              },
              {
                icon: MapPin,
                title: 'Gain Experience',
                desc: 'Develop professional skills, gain field experience, and build your network in the development sector.',
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="text-center">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#f0f9fb' }}>
                    <Icon className="w-7 h-7" aria-hidden="true" style={{ color: '#6eb7c7' }} />
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: '#0F172A', fontFamily: 'Poppins, system-ui, sans-serif' }}>{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Volunteer Photos */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <img
              src="https://i.postimg.cc/bvCC7b67/bbce17bb-567a-4b50-9939-5a74f689c456-1AD51FC3-F48D-418F-B816-6D03C02A5D21.jpg"
              alt="MyCare volunteers engaged in community outreach"
              className="w-full rounded-xl shadow-md object-cover aspect-video"
            />
            <img
              src="https://i.postimg.cc/DwmbCXXg/IMG-0559.jpg"
              alt="Volunteer team at a community event"
              className="w-full rounded-xl shadow-md object-cover aspect-video"
            />
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#f8fafc' }} aria-label="Volunteer application">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="font-semibold text-sm uppercase tracking-wider mb-2" style={{ color: '#6eb7c7' }}>Apply Now</p>
            <h2 className="section-heading">Volunteer Application</h2>
            <p className="section-subheading mx-auto mt-4">
              Fill out the form below and our team will get in touch with you.
            </p>
          </div>

          {status === 'success' ? (
            // role="status" announces this non-disruptively to screen readers
            <div role="status" className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-100">
              <CheckCircle className="w-16 h-16 mx-auto mb-4" aria-hidden="true" style={{ color: '#6eb7c7' }} />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Received!</h3>
              <p className="text-gray-600 mb-6">
                Thank you for your interest in volunteering with MyCare Life Development Organization. Our team will review your application and contact you soon.
              </p>
              <button
                onClick={() => {
                  setStatus('idle');
                  setForm({ full_name: '', email: '', phone: '', area_of_interest: '', availability: '', message: '' });
                }}
                className="btn-primary"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-gray-100 space-y-5"
              aria-describedby={status === 'error' ? errorId : undefined}
            >
              <div>
                <label htmlFor={fullNameId} className="block text-sm font-medium text-gray-700 mb-1.5">
                  Full Name <span aria-hidden="true">*</span>
                  <span className="sr-only">(required)</span>
                </label>
                <input
                  id={fullNameId}
                  type="text"
                  name="full_name"
                  value={form.full_name}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  className="input-field"
                  placeholder="Enter your full name"
                  autoComplete="name"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor={emailId} className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email Address <span aria-hidden="true">*</span>
                    <span className="sr-only">(required)</span>
                  </label>
                  <input
                    id={emailId}
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    className="input-field"
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </div>
                <div>
                  <label htmlFor={phoneId} className="block text-sm font-medium text-gray-700 mb-1.5">
                    Phone Number <span aria-hidden="true">*</span>
                    <span className="sr-only">(required)</span>
                  </label>
                  <input
                    id={phoneId}
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    className="input-field"
                    placeholder="+234 xxx xxx xxxx"
                    autoComplete="tel"
                  />
                </div>
              </div>

              <div>
                <label htmlFor={areaId} className="block text-sm font-medium text-gray-700 mb-1.5">
                  Area of Interest <span aria-hidden="true">*</span>
                  <span className="sr-only">(required)</span>
                </label>
                <select
                  id={areaId}
                  name="area_of_interest"
                  value={form.area_of_interest}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  className="input-field"
                >
                  <option value="">Select an area</option>
                  {areas.map((area) => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
              </div>

              {/* Availability — fieldset+legend groups the radio buttons for AT (WCAG 1.3.1) */}
              <fieldset>
                <legend id={availabilityGroupId} className="block text-sm font-medium text-gray-700 mb-1.5">
                  Availability <span aria-hidden="true">*</span>
                  <span className="sr-only">(required)</span>
                </legend>
                <div className="flex flex-wrap gap-3" role="group" aria-labelledby={availabilityGroupId}>
                  {availabilities.map((a) => (
                    <label
                      key={a}
                      className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg cursor-pointer transition-all text-sm ${
                        form.availability === a
                          ? 'border-[#6eb7c7] bg-[#f0f9fb] text-[#245e71]'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="availability"
                        value={a}
                        checked={form.availability === a}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <Clock className="w-4 h-4" aria-hidden="true" />
                      {a}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div>
                <label htmlFor={messageId} className="block text-sm font-medium text-gray-700 mb-1.5">
                  Additional Message
                </label>
                <textarea
                  id={messageId}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  className="input-field resize-none"
                  placeholder="Tell us about your skills, experience, or motivation for volunteering..."
                />
              </div>

              {/* role="alert" fires immediately so AT reads the error without waiting */}
              {status === 'error' && (
                <p id={errorId} role="alert" className="text-red-600 text-sm">
                  Something went wrong. Please try again.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary w-full"
                aria-busy={status === 'loading'}
              >
                {status === 'loading' ? 'Submitting…' : 'Submit Application'}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

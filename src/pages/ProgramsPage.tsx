import {
  Heart, GraduationCap, Users, Shield, TreePine, Baby,
  MessageCircle, Scale, Globe, ChevronDown,
  BookOpen, HandHeart, Activity, Lightbulb,
} from 'lucide-react';
import { useState } from 'react';
import { programs } from '../data/content';
import { useLiveRegion } from '../hooks/useLiveRegion';

const iconMap: Record<string, React.ElementType> = {
  Heart,
  GraduationCap,
  Users,
  Shield,
  TreePine,
  Baby,
  MessageCircle,
  Scale,
  Globe,
  BookOpen,
  HandHeart,
  Activity,
  Lightbulb,
};

// Map program ids to the right icon where the data `icon` field
// doesn't have a unique name (e.g. two programs share 'Heart').
const idIconOverride: Record<string, React.ElementType> = {
  'education': GraduationCap,
  'humanitarian-support': HandHeart,
  'health-outreach': Activity,
  'leadership-mentorship': Lightbulb,
  'research-policy': BookOpen,
};

export default function ProgramsPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const { announce } = useLiveRegion();

  const toggle = (id: string, title: string) => {
    const opening = expanded !== id;
    setExpanded(opening ? id : null);
    announce(opening ? `${title} expanded` : `${title} collapsed`);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#0F172A' }}>
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/9367117/pexels-photo-9367117.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <p className="font-semibold text-sm uppercase tracking-wider mb-2" style={{ color: '#6eb7c7' }}>Our Programs</p>
          <h1 className="font-display font-bold text-white mb-6" style={{ fontSize: 'clamp(36px,5vw,56px)', color: '#ffffff' }}>
            Areas of Impact
          </h1>
          <p className="text-lg max-w-2xl leading-relaxed" style={{ color: '#cbd5e1' }}>
            Our comprehensive programs address the interconnected challenges facing Nigerian communities, from youth empowerment and indigenous inclusion to governance, health, and environmental sustainability.
          </p>
        </div>
      </section>

      {/* Program overview cards */}
      <section className="py-16 md:py-20" style={{ backgroundColor: '#f8fafc' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="accent-line mx-auto" />
            <h2 className="section-heading mt-2">All Programs at a Glance</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {programs.map((program) => {
              const Icon = idIconOverride[program.id] ?? iconMap[program.icon] ?? Heart;
              return (
                <button
                  key={program.id}
                  onClick={() => {
                    const el = document.getElementById(program.id);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      toggle(program.id, program.title);
                    }
                  }}
                  className="group bg-white rounded-xl p-4 border border-gray-100 hover:border-[#6eb7c7]
                             hover:shadow-md transition-all text-left focus-visible:outline-none
                             focus-visible:ring-2 focus-visible:ring-[#6eb7c7]"
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                    style={{ backgroundColor: '#f0f9fb' }}>
                    <Icon className="w-5 h-5" aria-hidden="true" style={{ color: '#6eb7c7' }} />
                  </div>
                  <p className="text-sm font-semibold leading-tight" style={{ color: '#0F172A', fontFamily: 'Poppins, system-ui, sans-serif' }}>
                    {program.title}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Programs accordion */}
      <section className="py-16 md:py-24" aria-label="Program details">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {programs.map((program) => {
            const Icon = idIconOverride[program.id] ?? iconMap[program.icon] ?? Heart;
            const isExpanded = expanded === program.id;
            const panelId = `panel-${program.id}`;
            const buttonId = `btn-${program.id}`;
            const p = program as typeof program & { extraImages?: string[]; background?: string };

            return (
              <div
                key={program.id}
                id={program.id}
                className="card overflow-hidden scroll-mt-24"
              >
                <button
                  id={buttonId}
                  aria-expanded={isExpanded}
                  aria-controls={panelId}
                  onClick={() => toggle(program.id, program.title)}
                  className="w-full text-left hover:bg-gray-50/50 transition-colors
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset"
                  style={{ '--tw-ring-color': '#6eb7c7' } as React.CSSProperties}
                >
                  {p.background ? (
                    <div className="relative h-36 sm:h-44 overflow-hidden">
                      <img
                        src={p.background}
                        alt=""
                        aria-hidden="true"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(15,23,42,0.75), rgba(15,23,42,0.35))' }} />
                      <div className="absolute inset-0 flex items-center gap-4 px-5 md:px-8">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                          style={{ backgroundColor: 'rgba(110,183,199,0.9)' }}>
                          <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg sm:text-xl font-bold text-white truncate"
                            style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}>{program.title}</h3>
                          <p className="text-sm text-white/80 mt-0.5 line-clamp-1 hidden sm:block">{program.description}</p>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-white/70 shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4 p-5 md:p-7">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: '#f0f9fb' }}>
                        <Icon className="w-6 h-6" style={{ color: '#6eb7c7' }} aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold truncate"
                          style={{ color: '#0F172A', fontFamily: 'Poppins, system-ui, sans-serif' }}>{program.title}</h3>
                        <p className="text-sm text-gray-500 mt-0.5 line-clamp-1 hidden sm:block">{program.description}</p>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isExpanded}
                  className="px-5 md:px-8 pb-8"
                >
                  <div className="border-t border-gray-100 pt-6">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <img
                          src={program.image}
                          alt={program.title}
                          className="w-full rounded-xl shadow-sm object-cover aspect-video"
                        />
                        {p.extraImages && p.extraImages.length > 0 && (
                          <div className={`grid gap-3 ${p.extraImages.length === 1 ? 'grid-cols-1' : p.extraImages.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                            {p.extraImages.map((src, i) => (
                              <img
                                key={i}
                                src={src}
                                alt={`${program.title} — photo ${i + 2}`}
                                className="w-full rounded-xl shadow-sm object-cover aspect-video"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="space-y-4 text-gray-600 leading-relaxed">
                        <p>{program.description}</p>
                        <div className="rounded-xl p-4" style={{ backgroundColor: '#f0f9fb' }}>
                          <h4 className="font-semibold text-sm mb-3" style={{ color: '#245e71' }}>Key Activities</h4>
                          <ul className="space-y-2 text-sm" style={{ color: '#2e7389' }}>
                            {program.keyActivities.map((activity, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full inline-block"
                                  aria-hidden="true" style={{ backgroundColor: '#D4A64A', marginTop: '6px' }} />
                                {activity}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

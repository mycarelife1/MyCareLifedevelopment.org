import { MapPin, Users, DollarSign, Calendar, ArrowDownToLine } from 'lucide-react';
import { projects } from '../data/content';

export default function ProjectsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#0F172A' }}>
        <div className="absolute inset-0">
          <img
            src="https://i.postimg.cc/pLtszk1b/IMG-1027.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <p className="font-semibold text-sm uppercase tracking-wider mb-2" style={{ color: '#6eb7c7' }}>Our Projects</p>
          <h1 className="font-display font-bold text-white mb-6" style={{ fontSize: 'clamp(36px,5vw,56px)', color: '#ffffff' }}>
            Active & Completed Projects
          </h1>
          <p className="text-lg max-w-2xl leading-relaxed" style={{ color: '#cbd5e1' }}>
            Explore our portfolio of development projects delivering measurable results across Nigerian communities.
          </p>
        </div>
      </section>
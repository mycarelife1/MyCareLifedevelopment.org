import { Calendar, Tag, X } from 'lucide-react';
import { impactStories, galleryImages } from '../data/content';
import { useState, useRef } from 'react';
import FocusTrap from '../components/FocusTrap';
import PaginatedList from '../components/PaginatedList';
import { useFocusReturn } from '../hooks/useFocusReturn';
import { useLiveRegion } from '../hooks/useLiveRegion';

type Story = typeof impactStories[number];

export default function ImpactStoriesPage() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const { save: saveFocus, restore: restoreFocus } = useFocusReturn();
  const { announce } = useLiveRegion();

  const openLightbox = (src: string, alt: string) => {
    saveFocus();
    setLightbox({ src, alt });
    announce(`Photo enlarged: ${alt}`);
  };

  const closeLightbox = () => {
    setLightbox(null);
    restoreFocus();
    announce('Photo closed');
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#0F172A' }}>
        <div className="absolute inset-0">
          <img
            src="https://i.postimg.cc/SKNn9XxM/894f8eb5-2a54-43b6-84de-7a9b3792581f-A18674EA-2752-48D5-A307-3ED91B2456D3.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <p className="font-semibold text-sm uppercase tracking-wider mb-2" style={{ color: '#6eb7c7' }}>Impact Stories</p>
          <h1 className="font-display font-bold text-white mb-6" style={{ fontSize: 'clamp(36px,5vw,56px)', color: '#ffffff' }}>
            Stories of Transformation
          </h1>
          <p className="text-lg max-w-2xl leading-relaxed" style={{ color: '#cbd5e1' }}>
            Real stories from real people whose lives have been transformed through our programs and interventions.
          </p>
        </div>
      </section>
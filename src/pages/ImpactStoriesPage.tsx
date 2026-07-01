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
            src="https://images.pexels.com/photos/6627445/pexels-photo-6627445.jpeg?auto=compress&cs=tinysrgb&w=1920"
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

      {/* Stories — paginated list replaces static slice, giving keyboard/SR users
          a predictable, navigable structure instead of a truncated card dump */}
      <section className="py-20 md:py-28" aria-label="Impact stories">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PaginatedList<Story>
            items={impactStories}
            pageSize={4}
            itemLabel="impact stories"
            gridClassName="grid md:grid-cols-2 gap-8"
            renderItem={(story) => (
              <article key={story.id} className="card group">
                <div className="grid sm:grid-cols-2">
                  <div className="aspect-video sm:aspect-auto overflow-hidden">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full" style={{ backgroundColor: '#f0f9fb', color: '#3a8fa4' }}>
                        <Tag className="w-3 h-3" aria-hidden="true" />
                        {story.category}
                      </span>
                    </div>
                    <h3 className="font-bold mb-2 transition-colors" style={{ color: '#0F172A', fontFamily: 'Poppins, system-ui, sans-serif', fontSize: '18px' }}>
                      {story.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed flex-1">{story.excerpt}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-4 pt-4 border-t border-gray-100">
                      <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                      <time dateTime={story.date}>
                        {new Date(story.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </time>
                    </div>
                  </div>
                </div>
              </article>
            )}
          />
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#f8fafc' }} aria-label="Photo gallery">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="accent-line mx-auto" />
            <p className="font-semibold text-sm uppercase tracking-wider mb-2" style={{ color: '#6eb7c7' }}>Gallery</p>
            <h2 className="section-heading">Our Work in Pictures</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" role="list">
            {galleryImages.map((img, i) => (
              <div key={i} role="listitem">
                <button
                  onClick={() => openLightbox(img.src, img.alt)}
                  className="aspect-square overflow-hidden rounded-xl group cursor-pointer w-full
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  style={{ '--tw-ring-color': '#6eb7c7' } as React.CSSProperties}
                  aria-label={`View enlarged: ${img.alt}`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox – WCAG 2.4.3 compliant modal dialog */}
      {lightbox && (
        <FocusTrap active={!!lightbox} initialFocusRef={closeButtonRef} onEscape={closeLightbox}>
          {/* role="dialog" + aria-modal tells AT to confine virtual cursor */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label={lightbox.alt}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}
            onClick={(e) => {
              // Close only when clicking the backdrop, not the image itself
              if (e.target === e.currentTarget) closeLightbox();
            }}
          >
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
            <button
              ref={closeButtonRef}
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center
                         text-white/80 hover:text-white bg-white/10 hover:bg-white/20 transition-colors
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Close photo"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </FocusTrap>
      )}
    </div>
  );
}

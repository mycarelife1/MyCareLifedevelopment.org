import { Handshake } from 'lucide-react';
import { partners } from '../data/content';

export default function PartnersPage() {
  const govPartners = partners.filter((p) => p.category === 'Government');
  const civilPartners = partners.filter((p) => p.category !== 'Government');

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#0F172A' }}>
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <p className="font-semibold text-sm uppercase tracking-wider mb-2" style={{ color: '#6eb7c7' }}>Our Partners</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Partnerships for Impact
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
            We work alongside key government ministries, civil society organizations, and institutions to advance our mission of empowering communities and promoting inclusive development across Nigeria.
          </p>
        </div>
      </section>

      {/* Government Partners */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="accent-line" />
            <h2 className="text-2xl font-bold text-gray-900 mt-2" style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}>Government Partners</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {govPartners.map((partner) => (
              <div
                key={partner.name}
                title={partner.name}
                className="bg-white rounded-2xl p-5 flex flex-col items-center gap-4 border border-gray-100 hover:shadow-lg transition-all"
                style={{ borderColor: '#e5e7eb' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#6eb7c7')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '#e5e7eb')}
              >
                <div className="w-full aspect-square flex items-center justify-center p-2">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-xs font-semibold text-center text-gray-700 leading-snug">{partner.name}</p>
              </div>
            ))}
          </div>

          {civilPartners.length > 0 && (
            <div className="mt-16">
              <div className="mb-10">
                <div className="accent-line" />
                <h2 className="text-2xl font-bold text-gray-900 mt-2" style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}>Civil Society & Network Partners</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {civilPartners.map((partner) => (
                  <div
                    key={partner.name}
                    title={partner.name}
                    className="bg-white rounded-2xl p-5 flex flex-col items-center gap-4 border border-gray-100 hover:shadow-lg transition-all"
                    style={{ borderColor: '#e5e7eb' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = '#6eb7c7')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = '#e5e7eb')}
                  >
                    <div className="w-full aspect-square flex items-center justify-center p-2">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-xs font-semibold text-center text-gray-700 leading-snug">{partner.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Become a Partner */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#f8fafc' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Handshake className="w-12 h-12 mx-auto mb-4" style={{ color: '#6eb7c7' }} />
          <h2 className="section-heading mb-4">Become a Partner</h2>
          <p className="section-subheading mx-auto mb-8">
            We are always seeking new partnerships with organizations that share our vision of empowered and resilient communities.
          </p>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-left space-y-4">
            <h3 className="font-bold text-gray-900">Partnership Opportunities</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2"><span className="mt-0.5" style={{ color: '#D4A64A' }}>&#9679;</span> Program co-implementation and joint funding</li>
              <li className="flex items-start gap-2"><span className="mt-0.5" style={{ color: '#D4A64A' }}>&#9679;</span> Technical assistance and capacity building</li>
              <li className="flex items-start gap-2"><span className="mt-0.5" style={{ color: '#D4A64A' }}>&#9679;</span> Research and knowledge sharing</li>
              <li className="flex items-start gap-2"><span className="mt-0.5" style={{ color: '#D4A64A' }}>&#9679;</span> Advocacy and policy collaboration</li>
              <li className="flex items-start gap-2"><span className="mt-0.5" style={{ color: '#D4A64A' }}>&#9679;</span> Corporate social responsibility initiatives</li>
            </ul>
            <a href="mailto:partnerships@mycarelifedevelopment.org" className="btn-primary inline-block mt-4">
              Contact Our Partnerships Team
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

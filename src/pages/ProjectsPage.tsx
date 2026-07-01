import { MapPin, Users, DollarSign, Calendar, ArrowDownToLine } from 'lucide-react';
import { projects } from '../data/content';

export default function ProjectsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#0F172A' }}>
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=1920"
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

      {/* Projects Grid */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => {
              const p = project as typeof project & {
                extraImage?: string;
                extraImage2?: string;
                extraImage3?: string;
                extraImage4?: string;
                extraImage5?: string;
              };
              const extraImages = [p.extraImage, p.extraImage2, p.extraImage3, p.extraImage4, p.extraImage5].filter(Boolean) as string[];
              return (
                <div key={project.id} className="card flex flex-col">
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span
                        className="px-3 py-1 text-xs font-semibold rounded-full text-white"
                        style={{ backgroundColor: project.status === 'Active' ? '#6eb7c7' : '#6b7280' }}
                      >
                        {project.status}
                      </span>
                    </div>
                  </div>
                  {extraImages.length > 0 && (
                    <div className={`grid gap-1 ${extraImages.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                      {extraImages.map((src, i) => (
                        <div key={i} className="aspect-video overflow-hidden">
                          <img
                            src={src}
                            alt={`${project.title} photo ${i + 2}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#6eb7c7' }}>
                      {project.category}
                    </span>
                    <h3 className="font-bold mt-1 mb-3" style={{ color: '#0F172A', fontFamily: 'Poppins, system-ui, sans-serif', fontSize: '18px' }}>{project.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">{project.description}</p>
                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" style={{ color: '#6eb7c7' }} />
                        <span className="truncate">{project.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" style={{ color: '#6eb7c7' }} />
                        <span>{project.beneficiaries}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <DollarSign className="w-4 h-4" style={{ color: '#6eb7c7' }} />
                        <span>{project.budget}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" style={{ color: '#6eb7c7' }} />
                        <span>{new Date(project.startDate).getFullYear()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Download Reports */}
      <section className="py-16 border-t border-gray-100" style={{ backgroundColor: '#f8fafc' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0F172A', fontFamily: 'Poppins, system-ui, sans-serif' }}>Project Reports</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            Download our detailed project reports and annual impact assessments.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Annual Report 2025', 'Mid-Year Review 2025', 'Climate Action Report', 'Education Impact Study'].map((report) => (
              <button
                key={report}
                className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:shadow-sm transition-all"
                style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#6eb7c7')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '#e5e7eb')}
              >
                <ArrowDownToLine className="w-4 h-4" style={{ color: '#6eb7c7' }} />
                {report}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

import { Target, Eye, Heart, Award, Users, Globe } from 'lucide-react';
import { teamMembers } from '../data/content';

const values = [
  { icon: Heart, title: 'Compassion', description: 'We approach every person and community with empathy, dignity, and respect.' },
  { icon: Award, title: 'Integrity', description: 'We uphold transparency and accountability in all our operations and partnerships.' },
  { icon: Users, title: 'Inclusivity', description: 'We ensure no one is left behind, especially the most vulnerable and marginalized.' },
  { icon: Globe, title: 'Sustainability', description: 'We design programs that create lasting, self-sustaining community impact.' },
  { icon: Target, title: 'Accountability', description: 'We are answerable to our communities, partners, and donors for every action taken.' },
  { icon: Eye, title: 'Innovation', description: 'We embrace creative solutions and technology to maximize our development outcomes.' },
];

export default function AboutPage() {
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
          <p className="font-semibold text-sm uppercase tracking-wider mb-2" style={{ color: '#6eb7c7' }}>About Us</p>
          <h1 className="font-display font-bold text-white mb-6" style={{ fontSize: 'clamp(36px,5vw,56px)', color: '#ffffff' }}>
            Who We Are
          </h1>
          <p className="text-lg max-w-2xl leading-relaxed" style={{ color: '#cbd5e1' }}>
            MyCare Life Development Organization is a youth-led humanitarian and development organization in Nigeria, committed to advancing civic inclusion, accountability, and lasting community change.
          </p>
        </div>
      </section>

      {/* Our Background */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-2" style={{ color: '#6eb7c7' }}>Our Background</p>
              <h2 className="section-heading mb-6">Born from a Vision of Hope</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  The inspiration behind MyCare Life Development Organization stems from a poignant experience during adolescence. Witnessing young people and children living on the streets, devoid of adequate social amenities, parental care, formal education, and basic necessities, left an indelible mark.
                </p>
                <p>
                  Sylvanus Thomas witnessed first-hand where many are destitute, victims of broken homes, yet brimming with untapped potential. He firmly believed that they merely needed hope to transcend their current circumstances and reach their aspirations.
                </p>
                <p>
                  With a vision to effect positive change, the organization endeavors to reach out to the less privileged, empower youth and women, advocate for civic inclusion, sensitize communities on health issues, train and build people on skillets, counsel them on sex education, informed decision-making, financial management, and career guidance, to champion socio-economic development across Nigeria and the outermost parts of the world.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.pexels.com/photos/6645920/pexels-photo-6645920.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Community work"
                className="rounded-xl shadow-md w-full h-48 object-cover"
              />
              <img
                src="https://images.pexels.com/photos/8471831/pexels-photo-8471831.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Education program"
                className="rounded-xl shadow-md w-full h-48 object-cover mt-8"
              />
              <img
                src="https://images.pexels.com/photos/6627445/pexels-photo-6627445.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Women empowerment"
                className="rounded-xl shadow-md w-full h-48 object-cover"
              />
              <img
                src="https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Climate action"
                className="rounded-xl shadow-md w-full h-48 object-cover mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#f8fafc' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 md:p-10 border border-gray-100 shadow-sm">
              <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-primary-600" />
              </div>
              <h3 className="font-display text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To empower vulnerable communities across the world through sustainable development programs, advocacy, and capacity building that alleviate poverty, promote education, protect rights, and foster inclusive growth for all.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 md:p-10 border border-gray-100 shadow-sm">
              <div className="w-14 h-14 bg-secondary-100 rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-secondary-600" />
              </div>
              <h3 className="font-display text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To create sustainable change within communities by addressing critical needs, ensuring every person has access to dignity, education, civic participation, and inclusive growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-2" style={{ color: '#6eb7c7' }}>Our Values</p>
            <h2 className="section-heading">What Guides Our Work</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="card p-6">
                  <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{v.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{v.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#f8fafc' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-2" style={{ color: '#6eb7c7' }}>Our Team</p>
            <h2 className="section-heading">Leadership</h2>
            <p className="section-subheading mx-auto mt-4">
              Dedicated professionals driving change across Africa.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div key={member.name} className="card group">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-primary-600 font-medium">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

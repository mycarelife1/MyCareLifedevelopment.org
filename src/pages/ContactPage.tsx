import { useState, useId } from 'react';
import { supabase } from '../lib/supabase';
import { MapPin, Mail, Phone, Clock, CheckCircle, Send } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Stable ids for label↔input associations (WCAG 1.3.1)
  const nameId = useId();
  const emailId = useId();
  const subjectId = useId();
  const messageId = useId();
  const errorId = useId();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setStatus('loading');
    const { error } = await supabase.from('contact_messages').insert(form);
    setStatus(error ? 'error' : 'success');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
          <p className="font-semibold text-sm uppercase tracking-wider mb-2" style={{ color: '#6eb7c7' }}>Contact Us</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
            Have questions, want to partner with us, or need more information? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28" aria-label="Contact information and form">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h2 className="font-bold text-gray-900 mb-4">Contact Information</h2>
                <ul className="space-y-4" aria-label="Contact details">
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" style={{ color: '#6eb7c7' }} />
                    <div>
                      <p className="font-medium text-gray-900">Head Office</p>
                      <p className="text-sm text-gray-600">No. 8 Abdullahi Ibrahim Street, Utako, Abuja, Nigeria</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" style={{ color: '#6eb7c7' }} />
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-sm text-gray-600">info@mycarelifedevelopment.org</p>
                      <p className="text-sm text-gray-600">partnerships@mycarelifedevelopment.org</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" style={{ color: '#6eb7c7' }} />
                    <div>
                      <p className="font-medium text-gray-900">Phone</p>
                      <p className="text-sm text-gray-600">+234 815 736 4751</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" style={{ color: '#6eb7c7' }} />
                    <div>
                      <p className="font-medium text-gray-900">Office Hours</p>
                      <p className="text-sm text-gray-600">Monday - Friday: 8:00 AM - 5:00 PM</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Map */}
              <div className="bg-gray-200 rounded-2xl overflow-hidden aspect-[4/3]">
                <iframe
                  title="MyCare Life Development Organization office location in Utako, Abuja"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.0!2d7.4344!3d9.0765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0bde774d7c45%3A0x505d70e0ea506b81!2sUtako%2C%20Abuja%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1700000000000"
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              {status === 'success' ? (
                // role="status" announces the success message politely to AT
                <div role="status" className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-100 h-full flex flex-col items-center justify-center">
                  <CheckCircle className="w-16 h-16 mb-4" aria-hidden="true" style={{ color: '#6eb7c7' }} />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600 mb-6 max-w-md">
                    Thank you for reaching out. Our team will respond to your message within 24 hours.
                  </p>
                  <button
                    onClick={() => { setStatus('idle'); setForm({ name: '', email: '', subject: '', message: '' }); }}
                    className="btn-primary"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-gray-100 space-y-5"
                  aria-describedby={status === 'error' ? errorId : undefined}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Send className="w-5 h-5" aria-hidden="true" style={{ color: '#6eb7c7' }} />
                    <h2 className="text-xl font-bold text-gray-900">Send Us a Message</h2>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor={nameId} className="block text-sm font-medium text-gray-700 mb-1.5">
                        Your Name <span aria-hidden="true">*</span><span className="sr-only">(required)</span>
                      </label>
                      <input
                        id={nameId}
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        className="input-field"
                        placeholder="Full name"
                        autoComplete="name"
                      />
                    </div>
                    <div>
                      <label htmlFor={emailId} className="block text-sm font-medium text-gray-700 mb-1.5">
                        Email Address <span aria-hidden="true">*</span><span className="sr-only">(required)</span>
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
                  </div>
                  <div>
                    <label htmlFor={subjectId} className="block text-sm font-medium text-gray-700 mb-1.5">
                      Subject <span aria-hidden="true">*</span><span className="sr-only">(required)</span>
                    </label>
                    <input
                      id={subjectId}
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      className="input-field"
                      placeholder="What is your message about?"
                    />
                  </div>
                  <div>
                    <label htmlFor={messageId} className="block text-sm font-medium text-gray-700 mb-1.5">
                      Message <span aria-hidden="true">*</span><span className="sr-only">(required)</span>
                    </label>
                    <textarea
                      id={messageId}
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      rows={6}
                      className="input-field resize-none"
                      placeholder="Write your message here…"
                    />
                  </div>

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
                    {status === 'loading' ? 'Sending…' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

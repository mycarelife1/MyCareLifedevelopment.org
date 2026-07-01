import { useState, useId, useRef, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Heart, Shield, CheckCircle, CreditCard, Banknote, Smartphone } from 'lucide-react';

const amounts = [1000, 5000, 10000, 25000, 50000, 100000];
const methods = [
  { id: 'card', label: 'Credit/Debit Card', icon: CreditCard },
  { id: 'bank', label: 'Bank Transfer', icon: Banknote },
  { id: 'mobile', label: 'Mobile Money', icon: Smartphone },
];

export default function DonatePage() {
  const [form, setForm] = useState({
    donor_name: '',
    donor_email: '',
    amount: '',
    purpose: '',
    payment_method: '',
  });
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Stable ids for label↔input associations (WCAG 1.3.1)
  const amountCustomId = useId();
  const nameId = useId();
  const emailId = useId();
  const purposeId = useId();
  const errorId = useId();
  const successRef = useRef<HTMLHeadingElement>(null);

  // Move focus to the success heading so AT users know the form completed
  useEffect(() => {
    if (status === 'success') {
      successRef.current?.focus();
    }
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.amount && !selectedAmount) return;
    setStatus('loading');
    const { error } = await supabase.from('donations').insert({
      ...form,
      amount: selectedAmount || Number(form.amount),
    });
    setStatus(error ? 'error' : 'success');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAmountClick = (amt: number) => {
    setSelectedAmount(amt);
    setForm({ ...form, amount: amt.toString() });
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#0F172A' }} aria-label="Donate hero">
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: '#6eb7c7' }} />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-secondary-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <Heart className="w-12 h-12 mx-auto mb-4" aria-hidden="true" style={{ color: 'rgba(110,183,199,0.6)' }} />
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Your Generosity Changes Lives
          </h1>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Every donation, no matter the size, helps us provide education, food, shelter, and hope to vulnerable communities across Nigeria.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28" aria-label="Donation form">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {status === 'success' ? (
            // role="region" makes this a landmark; tabIndex="-1" lets focus be sent here
            <div role="region" aria-label="Donation confirmed" className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-100">
              <CheckCircle className="w-16 h-16 mx-auto mb-4" aria-hidden="true" style={{ color: '#6eb7c7' }} />
              {/* tabIndex="-1" + ref lets us move focus here on success (WCAG 3.3.1) */}
              <h3 ref={successRef} tabIndex={-1} className="text-2xl font-bold text-gray-900 mb-2 focus:outline-none">
                Thank You for Your Donation!
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Your generous contribution will make a real difference. We will send a confirmation to your email with details about how your donation is being used.
              </p>
              <button
                onClick={() => {
                  setStatus('idle');
                  setForm({ donor_name: '', donor_email: '', amount: '', purpose: '', payment_method: '' });
                  setSelectedAmount(null);
                }}
                className="btn-primary"
              >
                Make Another Donation
              </button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Form */}
              <div className="lg:col-span-3">
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-gray-100 space-y-6"
                  aria-describedby={status === 'error' ? errorId : undefined}
                >
                  <h2 className="text-xl font-bold text-gray-900">Donation Details</h2>

                  {/* Amount Selection — buttons use aria-pressed to expose selection state to AT */}
                  <div role="group" aria-labelledby="amount-group-label">
                    <p id="amount-group-label" className="block text-sm font-medium text-gray-700 mb-3">
                      Select Amount (NGN)
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      {amounts.map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => handleAmountClick(amt)}
                          aria-pressed={selectedAmount === amt}
                          className={`py-3 rounded-lg text-sm font-semibold transition-all ${
                            selectedAmount === amt
                              ? 'text-white shadow-md'
                              : 'bg-gray-50 text-gray-700 border border-gray-200 hover:border-[#6eb7c7]'
                          }`}
                          style={selectedAmount === amt ? { backgroundColor: '#6eb7c7' } : {}}
                        >
                          {amt.toLocaleString()}
                        </button>
                      ))}
                    </div>
                    <div className="mt-3">
                      <label htmlFor={amountCustomId} className="sr-only">
                        Custom donation amount in Nigerian Naira
                      </label>
                      <input
                        id={amountCustomId}
                        type="number"
                        name="amount"
                        value={form.amount}
                        onChange={(e) => { setSelectedAmount(null); handleChange(e); }}
                        className="input-field"
                        placeholder="Or enter a custom amount (NGN)"
                        min="100"
                        aria-label="Custom donation amount (NGN)"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor={nameId} className="block text-sm font-medium text-gray-700 mb-1.5">
                      Full Name <span aria-hidden="true">*</span><span className="sr-only">(required)</span>
                    </label>
                    <input
                      id={nameId}
                      type="text"
                      name="donor_name"
                      value={form.donor_name}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      className="input-field"
                      placeholder="Enter your full name"
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
                      name="donor_email"
                      value={form.donor_email}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      className="input-field"
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                  </div>

                  <div>
                    <label htmlFor={purposeId} className="block text-sm font-medium text-gray-700 mb-1.5">
                      Donation Purpose
                    </label>
                    <select
                      id={purposeId}
                      name="purpose"
                      value={form.purpose}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="">Where it's needed most</option>
                      <option value="Education">Education & Literacy</option>
                      <option value="Poverty Alleviation">Poverty Alleviation</option>
                      <option value="Youth Empowerment">Youth Empowerment</option>
                      <option value="Climate Action">Climate Action & Tree Planting</option>
                      <option value="Child Rights">Child Rights Advocacy</option>
                      <option value="Women Empowerment">Women's Empowerment</option>
                      <option value="Disability Inclusion">Disability Inclusion</option>
                      <option value="General">General Support</option>
                    </select>
                  </div>

                  {/* Payment method — aria-pressed exposes selected state to AT */}
                  <div role="group" aria-labelledby="method-group-label">
                    <p id="method-group-label" className="block text-sm font-medium text-gray-700 mb-3">
                      Payment Method <span aria-hidden="true">*</span><span className="sr-only">(required)</span>
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      {methods.map((m) => {
                        const Icon = m.icon;
                        return (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => setForm({ ...form, payment_method: m.id })}
                            aria-pressed={form.payment_method === m.id}
                            className={`flex flex-col items-center gap-2 py-4 px-3 rounded-lg text-xs font-medium transition-all ${
                              form.payment_method === m.id
                                ? 'bg-[#f0f9fb] border-2 border-[#6eb7c7] text-[#245e71]'
                                : 'bg-gray-50 border border-gray-200 text-gray-600 hover:border-gray-300'
                            }`}
                          >
                            <Icon className="w-5 h-5" aria-hidden="true" />
                            {m.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {status === 'error' && (
                    <p id={errorId} role="alert" className="text-red-600 text-sm">
                      Something went wrong. Please try again.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading' || !form.donor_name || !form.donor_email || (!form.amount && !selectedAmount) || !form.payment_method}
                    className="btn-primary w-full py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-busy={status === 'loading'}
                  >
                    {status === 'loading' ? 'Processing…' : `Donate ${form.amount ? `₦${Number(form.amount).toLocaleString()}` : 'Now'}`}
                  </button>
                </form>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-2 space-y-6">
                <div className="rounded-2xl p-6 border" style={{ backgroundColor: '#f0f9fb', borderColor: '#b0e3ed' }}>
                  <Shield className="w-8 h-8 mb-3" aria-hidden="true" style={{ color: '#6eb7c7' }} />
                  <h3 className="font-bold text-gray-900 mb-2">Secure & Transparent</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    All donations are processed securely. We provide full transparency on how every naira is spent, with regular impact reports sent to donors.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-4">How Your Donation Helps</h3>
                  <ul className="space-y-3">
                    {[
                      { amount: '₦1,000', impact: 'School supplies for 1 child' },
                      { amount: '₦5,000', impact: 'A tree planted and maintained for a year' },
                      { amount: '₦10,000', impact: 'One month of counseling sessions' },
                      { amount: '₦25,000', impact: 'Vocational training for 1 youth' },
                      { amount: '₦50,000', impact: 'Scholarship for 1 term' },
                      { amount: '₦100,000', impact: "Startup kit for a women's business" },
                    ].map((item) => (
                      <li key={item.amount} className="flex items-center justify-between text-sm">
                        <span className="font-semibold" style={{ color: '#6eb7c7' }}>{item.amount}</span>
                        <span className="text-gray-600 text-right">{item.impact}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-secondary-50 rounded-2xl p-6 border border-secondary-100">
                  <h3 className="font-bold text-gray-900 mb-2">Tax Deductible</h3>
                  <p className="text-sm text-gray-600">
                    MyCare Life Development Organization is a registered non-profit. Your donations may be tax-deductible. Contact us for donation receipts.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

import { useState, useId } from 'react';
import { supabase } from '../lib/supabase';
import { Mail, CheckCircle } from 'lucide-react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const inputId = useId();
  const errorId = useId();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !supabase) return;
    setStatus('loading');
    const { error } = await supabase.from('newsletter_subscribers').insert({ email });
    if (error) {
      setStatus(error.code === '23505' ? 'success' : 'error');
    } else {
      setStatus('success');
    }
  };

  if (status === 'success') {
    return (
      // role="status" announces this to screen readers without interrupting
      <div role="status" className="flex items-center gap-2 font-medium" style={{ color: '#6eb7c7' }}>
        <CheckCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
        <span>Thank you for subscribing!</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3" noValidate>
      <div className="relative flex-1">
        {/* Visible label associated via htmlFor — placeholder alone is not sufficient (WCAG 1.3.1) */}
        <label htmlFor={inputId} className="sr-only">
          Email address for newsletter
        </label>
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" aria-hidden="true" />
        <input
          id={inputId}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          className="input-field pl-10"
          required
          aria-required="true"
          aria-describedby={status === 'error' ? errorId : undefined}
          aria-invalid={status === 'error' ? 'true' : undefined}
          autoComplete="email"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary whitespace-nowrap"
        aria-busy={status === 'loading'}
      >
        {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
      </button>
      {/* role="alert" causes immediate announcement without waiting for AT polling */}
      {status === 'error' && (
        <p id={errorId} role="alert" className="text-red-600 text-sm mt-1 w-full">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}

import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About Us' },
  { path: '/programs', label: 'Programs' },
  { path: '/projects', label: 'Projects' },
  { path: '/impact-stories', label: 'Impact Stories' },
  { path: '/volunteer', label: 'Volunteer' },
  { path: '/partners', label: 'Partners' },
  { path: '/news', label: 'News' },
  { path: '/contact', label: 'Contact' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // WCAG 2.4.3: move focus to main content on every route change so keyboard
  // and screen-reader users start at the top of the new page, not wherever
  // focus happened to be in the previous page's DOM.
  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
    // Focus the main landmark; tabIndex="-1" makes it programmatically
    // focusable without adding it to the natural tab order.
    requestAnimationFrame(() => {
      mainRef.current?.focus({ preventScroll: true });
    });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Skip Links (WCAG 2.4.1) ─────────────────────────────────────────
          Visually hidden until focused; allows keyboard users to bypass the
          repeated navigation block and jump straight to main content or the
          primary navigation.
      ──────────────────────────────────────────────────────────────────── */}
      <a
        href="#main-content"
        className="skip-link"
        onClick={(e) => {
          e.preventDefault();
          mainRef.current?.focus({ preventScroll: false });
          mainRef.current?.scrollIntoView();
        }}
      >
        Skip to main content
      </a>
      <a href="#site-nav" className="skip-link">
        Skip to navigation
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : 'bg-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#6eb7c7' }}>
                <Heart className="w-6 h-6 text-white" fill="white" />
              </div>
              <div className="leading-tight">
                <span className="font-display font-bold text-lg block" style={{ color: '#0F172A' }}>MyCare Life</span>
                <span className="text-[10px] text-gray-500 tracking-wider uppercase">Development Org</span>
              </div>
            </Link>

            <nav id="site-nav" aria-label="Primary navigation" className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  aria-current={location.pathname === link.path ? 'page' : undefined}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors font-display ${
                    location.pathname === link.path
                      ? 'bg-primary-50'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  style={location.pathname === link.path ? { color: '#6eb7c7' } : {}}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Link
                to="/donate"
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm hover:opacity-90"
                style={{ backgroundColor: '#6eb7c7', fontFamily: 'Poppins, system-ui, sans-serif' }}
              >
                <Heart className="w-4 h-4" />
                Donate
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <nav
            id="mobile-menu"
            aria-label="Mobile navigation"
            className="lg:hidden bg-white border-t border-gray-100 shadow-lg"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  aria-current={location.pathname === link.path ? 'page' : undefined}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'bg-primary-50'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  style={location.pathname === link.path ? { color: '#6eb7c7' } : {}}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/donate"
                className="block px-4 py-2.5 text-white text-sm font-semibold rounded-lg text-center mt-2"
                style={{ backgroundColor: '#6eb7c7' }}
              >
                Donate Now
              </Link>
            </div>
          </nav>
        )}
      </header>

      {/* tabIndex="-1" makes this programmatically focusable (for route changes)
          without inserting it into the natural Tab sequence. The :focus-visible
          outline is suppressed via CSS so it's invisible to mouse users. */}
      <main
        id="main-content"
        ref={mainRef}
        tabIndex={-1}
        className="flex-1 pt-16 lg:pt-20 focus-main"
        aria-label="Main content"
      >
        {children}
      </main>

      <footer style={{ backgroundColor: '#0F172A' }} className="text-gray-300" aria-label="Site footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#6eb7c7' }}>
                  <Heart className="w-5 h-5 text-white" fill="white" />
                </div>
                <span className="font-display font-bold text-lg text-white">MyCare Life Development Organization</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                A humanitarian and development organization dedicated to empowering communities, alleviating poverty, and creating lasting change across Nigeria.
              </p>
              <div className="flex gap-3">
                {['Facebook', 'Twitter', 'LinkedIn', 'Instagram'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 transition-colors text-xs font-bold hover:text-white"
                    style={{ backgroundColor: '#1e2d45' }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#6eb7c7')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#1e2d45')}
                    aria-label={`${social} (opens in new tab)`}
                  >
                    {social[0]}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4" style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}>Quick Links</h4>
              <ul className="space-y-2.5 text-sm">
                {navLinks.slice(0, 5).map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-gray-400 transition-colors hover:opacity-90" style={{ color: '#9ca3af' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#6eb7c7')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#9ca3af')}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4" style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}>Get Involved</h4>
              <ul className="space-y-2.5 text-sm">
                {navLinks.slice(5).map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="transition-colors" style={{ color: '#9ca3af' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#6eb7c7')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#9ca3af')}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/donate" className="font-semibold transition-colors" style={{ color: '#6eb7c7' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#b0e3ed')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#6eb7c7')}
                  >
                    Donate Now
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4" style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}>Contact Info</h4>
              <ul className="space-y-2.5 text-sm text-gray-400">
                <li>No. 8 Abdullahi Ibrahim Street, Utako, Abuja</li>
                <li>info@mycarelifedevelopment.org</li>
                <li>+234 815 736 4751</li>
              </ul>
              <div className="mt-6">
                <h5 className="font-medium text-white text-sm mb-2">Newsletter</h5>
                <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    placeholder="Your email"
                    aria-label="Newsletter email address"
                    className="flex-1 px-3 py-2 border border-gray-700 rounded-lg text-sm text-gray-300 placeholder-gray-500 focus:outline-none"
                    style={{ backgroundColor: '#1e2d45' }}
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 text-white text-sm font-medium rounded-lg transition-colors hover:opacity-90"
                    style={{ backgroundColor: '#6eb7c7', fontFamily: 'Poppins, system-ui, sans-serif' }}
                  >
                    Join
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} MyCare Life Development Organization. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

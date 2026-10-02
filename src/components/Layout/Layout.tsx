import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ThirdParty/ShadCn/Button';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import { capturePageview } from '@/lib/posthog';
import { cn } from '@/lib/utils';
import MoonMark from './MoonMark';

interface LayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  href: string;
  label: string;
}

const publicNav: NavItem[] = [
  { href: '/signs', label: 'Signs' },
  { href: '/houses', label: 'Houses' },
  { href: '/reading', label: 'Reading' },
];

const isActivePath = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

const navLinkClass = (active: boolean) =>
  cn(
    'inline-flex h-10 items-center rounded-full px-4 text-sm font-bold transition-colors',
    active
      ? 'bg-primary text-primary-foreground shadow-moon'
      : 'text-gray-700 hover:bg-accent hover:text-accent-foreground'
  );

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();

  const navItems = user ? [...publicNav, { href: '/readings', label: 'Readings' }] : publicNav;

  useEffect(() => {
    capturePageview(location.pathname);
  }, [location.pathname]);

  // Update page title based on current path
  useEffect(() => {
    const path = location.pathname;
    let title = 'Shimmering Stars';
    
    if (path.startsWith('/signs/')) {
      const sign = path.split('/')[2];
      title = `${sign.charAt(0).toUpperCase() + sign.slice(1)} - Zodiac Signs | Astrology Calculator`;
    } else if (path === '/signs') {
      title = 'Zodiac Signs | Shimmering Stars';
    } else if (path === '/houses') {
      title = 'Astrological Houses | Shimmering Stars';
    } else if (path === '/reading') {
      title = 'Birth Chart Reading | Shimmering Stars';
    } else if (path === '/readings') {
      title = 'Saved Readings | Shimmering Stars';
    } else if (path === '/signin' || path === '/signin/callback') {
      title = 'Sign in | Shimmering Stars';
    } else if (path === '/') {
      title = 'Shimmering Stars - Birth Chart Analysis';
    }
    
    document.title = title;
  }, [location.pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMobileMenuOpen]);

  return (
    <div className="relative min-h-screen flex flex-col" style={{ width: '100vw' }}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:font-bold focus:text-primary focus:shadow-moon"
      >
        Skip to content
      </a>

      <div aria-hidden="true" className="moon-stars" />
      <div aria-hidden="true" className="moon-stars moon-stars--offset" />

      <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6">
        <div className="mx-auto max-w-6xl rounded-full border border-white/60 bg-white/95 px-3 shadow-moon-lg backdrop-blur-xl sm:px-4">
          <div className="flex h-16 items-center justify-between gap-4">
            <a href="/" className="group flex items-center gap-2.5 rounded-full pr-2">
              <MoonMark className="h-10 w-10 shrink-0 transition-transform duration-500 group-hover:-rotate-12" />
              <span className="flex flex-col">
                <span className="font-display text-xl font-bold leading-none text-gray-900 sm:text-2xl">
                  Shimmering Stars
                </span>
                <span className="text-xs font-semibold leading-tight text-gray-500">
                  What's your sign?
                </span>
              </span>
            </a>

            <nav aria-label="Main" className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const active = isActivePath(location.pathname, item.href);
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={navLinkClass(active)}
                  >
                    {item.label}
                  </a>
                );
              })}
              <span aria-hidden="true" className="mx-2 h-6 w-px bg-gray-200" />
              {user ? (
                <>
                  <span className="max-w-[10rem] truncate px-2 text-sm font-semibold text-gray-600">
                    {user.name || user.email}
                  </span>
                  <Button variant="outline" size="sm" onClick={signOut}>
                    Sign out
                  </Button>
                </>
              ) : (
                <Button variant="moon" size="sm" asChild>
                  <a href="/signin">Sign in</a>
                </Button>
              )}
            </nav>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-700"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <nav
            id="mobile-nav"
            aria-label="Mobile"
            className="moon-panel mx-auto mt-2 max-w-6xl animate-rise-in p-3 md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => {
                const active = isActivePath(location.pathname, item.href);
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(navLinkClass(active), 'h-12 w-full text-base')}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
              <li className="mt-2 border-t border-gray-200 pt-3">
                {user ? (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      signOut();
                    }}
                  >
                    Sign out {user.name || user.email ? `(${user.name || user.email})` : ''}
                  </Button>
                ) : (
                  <Button variant="moon" className="w-full" asChild>
                    <a href="/signin" onClick={() => setIsMobileMenuOpen(false)}>Sign in</a>
                  </Button>
                )}
              </li>
            </ul>
          </nav>
        )}
      </header>

      <main id="main" tabIndex={-1} className="relative z-10 flex-1 focus:outline-none">
        {children}
      </main>

      <footer className="relative z-10 px-3 pb-6 pt-10 sm:px-6">
        <div className="moon-panel mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-4 text-sm text-gray-600 sm:flex-row">
          <p className="flex items-center gap-2">
            <MoonMark className="h-5 w-5" />
            <span>
              <span className="font-display text-base font-bold text-gray-800">Shimmering Stars</span>
              {' '}· charted by moonlight
            </span>
          </p>
          <nav aria-label="Footer" className="flex gap-4 font-semibold">
            <a className="hover:text-primary" href="/signs">Signs</a>
            <a className="hover:text-primary" href="/houses">Houses</a>
            <a className="hover:text-primary" href="/reading">Get your chart</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

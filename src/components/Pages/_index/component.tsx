import { PageComponentType } from '@/lib/types'
import { Button } from "@/components/ThirdParty/ShadCn/Button";
import { MoonMark } from '@/components/Layout';
import { usePageBackground, pageBackgrounds } from '@/lib/hooks/usePageBackground';
import { ArrowRight, Heart, Home, QrCode, Sparkle, Sparkles } from 'lucide-react';

// U+FE0E keeps zodiac glyphs as text instead of emoji on Apple platforms.
const zodiacGlyphs = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'].map(
  (glyph) => `${glyph}\uFE0E`
);

const trustNotes = [
  'Real ephemeris math, shown step by step',
  'No account needed',
  'Saved only if you sign in',
];

const steps = [
  {
    title: 'Share your birth moment',
    body: 'Date, time, and place. No exact time? We will tell you what that changes.',
  },
  {
    title: 'We calculate the sky',
    body: 'Planets, asteroids, houses, angles, and aspects for that exact instant.',
  },
  {
    title: 'Explore, save, and share',
    body: 'Read each placement, keep it in your account, or pass it on with a QR code.',
  },
];

const tileClass =
  'moon-panel group flex flex-col p-6 transition-transform duration-300 hover:-translate-y-1';

export const Content = () => (
  <section aria-labelledby="hero-title" className="relative mx-auto max-w-5xl px-4 pb-16 pt-16 text-center sm:pt-24">
    <div className="relative mx-auto mb-8 h-28 w-28 sm:h-36 sm:w-36">
      <span aria-hidden="true" className="absolute inset-0 rounded-full bg-moon-pink/30 blur-2xl" />
      <MoonMark className="relative h-full w-full animate-float drop-shadow-xl" />
      <Sparkle aria-hidden="true" className="absolute -left-6 top-4 h-5 w-5 animate-twinkle text-moon-gold" />
      <Sparkle aria-hidden="true" className="absolute -right-4 bottom-2 h-4 w-4 animate-twinkle text-moon-pink [animation-delay:1.2s]" />
      <Sparkle aria-hidden="true" className="absolute right-2 -top-4 h-3 w-3 animate-twinkle text-white [animation-delay:2s]" />
    </div>

    <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white backdrop-blur">
      <Sparkles aria-hidden="true" className="h-3.5 w-3.5 text-moon-gold" />
      In the name of the moon
    </p>

    <h1
      id="hero-title"
      className="moon-shimmer-text moon-shimmer-text--light mt-6 font-display text-6xl font-bold leading-[0.95] sm:text-8xl"
    >
      Shimmering Stars
    </h1>

    <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl">
      Discover the celestial influences that make you, you. Calculate your birth chart
      with real astronomy, then explore what every planet has to say.
    </p>

    <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
      <Button variant="moon" size="lg" asChild>
        <a href="/reading">
          Get your birth chart
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </a>
      </Button>
      <Button
        size="lg"
        variant="outline"
        asChild
        className="border-white/40 bg-white/10 text-white backdrop-blur hover:border-white/70 hover:bg-white/20 hover:text-white"
      >
        <a href="/signs">Explore the signs</a>
      </Button>
    </div>

    <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold text-white/80">
      {trustNotes.map((note) => (
        <li key={note} className="flex items-center gap-2">
          <Sparkle aria-hidden="true" className="h-3 w-3 text-moon-gold" />
          {note}
        </li>
      ))}
    </ul>
  </section>
);

const Features = () => (
  <section aria-labelledby="features-title" className="mx-auto max-w-6xl px-4">
    <h2 id="features-title" className="sr-only">What you can explore</h2>
    <div className="grid auto-rows-[minmax(11rem,auto)] gap-4 md:grid-cols-3">
      <a href="/reading" className={`${tileClass} relative overflow-hidden md:col-span-2 md:row-span-2`}>
        <span aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-2 border-dashed border-moon-lavender/60" />
        <span aria-hidden="true" className="absolute -right-10 -top-10 h-44 w-44 rounded-full border border-moon-pink/50" />
        <span aria-hidden="true" className="absolute right-16 top-16 h-4 w-4 rounded-full bg-moon-gold shadow-glow" />
        <span className="moon-eyebrow w-fit">Start here</span>
        <h3 className="moon-heading mt-4 max-w-sm text-4xl sm:text-5xl">Your birth chart, beautifully explained</h3>
        <p className="mt-4 max-w-md text-gray-600">
          Planetary positions, house placements, angles, and aspect patterns, each with the
          math behind it so you can see exactly where the stars were.
        </p>
        <span className="mt-auto inline-flex items-center gap-2 pt-8 font-bold text-primary">
          Generate my chart
          <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </a>

      <a href="/signs" className={tileClass}>
        <h3 className="moon-heading text-2xl">12 Zodiac Signs</h3>
        <p className="mt-1 text-sm text-gray-600">Traits, elements, and rulers for every sign.</p>
        <p aria-hidden="true" className="mt-auto grid grid-cols-6 gap-1 pt-4 text-center text-xl text-primary">
          {zodiacGlyphs.map((glyph) => (
            <span key={glyph}>{glyph}</span>
          ))}
        </p>
      </a>

      <a href="/houses" className={tileClass}>
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
          <Home aria-hidden="true" className="h-5 w-5" />
        </span>
        <h3 className="moon-heading mt-4 text-2xl">The 12 Houses</h3>
        <p className="mt-1 text-sm text-gray-600">Where each planet's energy shows up in your life.</p>
      </a>

      <a href="/readings" className={tileClass}>
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
          <Heart aria-hidden="true" className="h-5 w-5" />
        </span>
        <h3 className="moon-heading mt-4 text-2xl">Saved readings</h3>
        <p className="mt-1 text-sm text-gray-600">Sign in to keep charts for you and your friends.</p>
      </a>

      <div className="moon-panel flex flex-col p-6 md:col-span-2">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
          <QrCode aria-hidden="true" className="h-5 w-5" />
        </span>
        <h3 className="moon-heading mt-4 text-2xl">Share in a scan</h3>
        <p className="mt-1 text-sm text-gray-600">
          Every chart page has its own QR code, so you can hand your reading to a friend in seconds.
        </p>
      </div>
    </div>
  </section>
);

const HowItWorks = () => (
  <section aria-labelledby="how-title" className="mx-auto mt-16 max-w-6xl px-4">
    <div className="moon-panel p-6 sm:p-10">
      <div className="mx-auto max-w-2xl text-center">
        <span className="moon-eyebrow">How it works</span>
        <h2 id="how-title" className="moon-heading mt-4 text-4xl sm:text-5xl">Three steps to your stars</h2>
      </div>
      <div className="moon-ribbon mx-auto mt-6 w-24" aria-hidden="true" />
      <ol className="mt-10 grid gap-8 md:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.title} className="text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#ff8fc4] to-[#b9a3ff] font-display text-2xl font-bold text-gray-900 shadow-moon">
              {index + 1}
            </span>
            <h3 className="mt-4 text-lg font-extrabold text-gray-900">{step.title}</h3>
            <p className="mt-2 text-gray-600">{step.body}</p>
          </li>
        ))}
      </ol>
      <div className="mt-10 flex justify-center">
        <Button variant="moon" size="lg" asChild>
          <a href="/reading">
            Begin my reading
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  </section>
);

export const IndexPage: PageComponentType = () => {
  usePageBackground(pageBackgrounds.cosmic);

  return (
    <div className="pb-8">
      <Content />
      <Features />
      <HowItWorks />
    </div>
  );
}

IndexPage.path = "/"

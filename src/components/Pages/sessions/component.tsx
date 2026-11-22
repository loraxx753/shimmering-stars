import { Button } from '@/components/ThirdParty/ShadCn/Button';
import { usePageBackground, pageBackgrounds } from '@/lib/hooks/usePageBackground';
import { sessionOfferings, type SessionOffering } from '@/lib/config/sessions';
import { PageComponentType } from '@/lib/types';
import { ArrowRight, Sparkle } from 'lucide-react';

const OfferingRow = ({ offering }: { offering: SessionOffering }) => {
  const hasLink = Boolean(offering.bookingUrl);

  return (
    <article className="moon-panel flex flex-col gap-4 p-6 sm:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xl">
          <h3 className="moon-heading text-2xl sm:text-3xl">{offering.name}</h3>
          <p className="mt-2 text-gray-600">{offering.summary}</p>
        </div>
        <div className="shrink-0 text-left sm:text-right">
          <p className="font-display text-4xl font-bold text-gray-900">{offering.price}</p>
          <p className="mt-1 text-sm font-semibold text-gray-500">{offering.duration}</p>
        </div>
      </div>

      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
          You will be asked for
        </p>
        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold text-gray-700">
          {offering.intake.map((item) => (
            <li key={item} className="flex items-center gap-1.5">
              <Sparkle aria-hidden="true" className="h-3 w-3 text-primary" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-1">
        {hasLink ? (
          <Button variant="moon" asChild>
            <a href={offering.bookingUrl} target="_blank" rel="noopener noreferrer">
              {offering.ctaLabel}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </Button>
        ) : (
          <p className="text-sm font-semibold text-gray-500">
            Scheduling link coming soon — check back shortly.
          </p>
        )}
      </div>
    </article>
  );
};

const SessionsPage: PageComponentType = () => {
  usePageBackground(pageBackgrounds.cosmic);

  return (
    <div className="pb-12">
      <section
        aria-labelledby="sessions-title"
        className="relative mx-auto max-w-5xl px-4 pb-10 pt-14 text-center sm:pt-20"
      >
        <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white backdrop-blur">
          <Sparkle aria-hidden="true" className="h-3.5 w-3.5 text-moon-gold" />
          With Simran
        </p>
        <h1
          id="sessions-title"
          className="moon-shimmer-text moon-shimmer-text--light mt-6 font-display text-5xl font-bold leading-[0.95] sm:text-7xl"
        >
          Sessions
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl">
          Book a birth chart reading or astrology counseling. Pick an offering,
          then schedule — you will share birth details (and, for counseling, what
          you want to talk about) when you book.
        </p>
      </section>

      <section aria-labelledby="offerings-title" className="mx-auto max-w-4xl px-4">
        <h2 id="offerings-title" className="sr-only">
          Session offerings
        </h2>
        <div className="flex flex-col gap-4">
          {sessionOfferings.map((offering) => (
            <OfferingRow key={offering.id} offering={offering} />
          ))}
        </div>
      </section>

      <section
        aria-labelledby="sessions-note-title"
        className="mx-auto mt-10 max-w-4xl px-4"
      >
        <div className="moon-panel p-6 sm:p-8">
          <h2 id="sessions-note-title" className="moon-heading text-2xl">
            A note on counseling
          </h2>
          <p className="mt-3 text-gray-600">
            Astrology counseling is consultation framed around your chart and your
            questions. It is not ABA therapy, clinical psychology, or
            insurance-billable care.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button variant="outline" asChild>
              <a href="/reading">
                Prefer the free chart first?
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

SessionsPage.path = '/sessions';

export default SessionsPage;

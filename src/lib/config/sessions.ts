export type SessionOfferingId =
  | 'recorded'
  | 'live-reading'
  | 'counseling'
  | 'follow-up'
  | 'check-in';

export type SessionOffering = {
  id: SessionOfferingId;
  name: string;
  price: string;
  duration: string;
  summary: string;
  bookingUrl: string | undefined;
  /** Shown near the CTA so clients know what the scheduler will ask. */
  intake: string[];
  ctaLabel: string;
};

/**
 * Paid session menu for /sessions.
 * Booking URLs are public Calendly (or form) links — ship them in code, not env.
 */
export const sessionOfferings: SessionOffering[] = [
  {
    id: 'recorded',
    name: 'Birth chart reading (recorded)',
    price: '$80',
    duration: 'Unlisted YouTube walkthrough',
    summary:
      'Simran records herself going over your chart and shares a private link you can rewatch. No live call.',
    bookingUrl: undefined,
    intake: ['Birth date', 'Birth time', 'Birth place (city / region)'],
    ctaLabel: 'Request recorded reading',
  },
  {
    id: 'live-reading',
    name: 'Birth chart reading (live)',
    price: '$100',
    duration: '60 min live',
    summary:
      'A live walkthrough of your natal chart — placements and themes, with room for questions. No recording delivered.',
    bookingUrl: 'https://calendly.com/simran-psy/birth-chart-reading',
    intake: ['Birth date', 'Birth time', 'Birth place (city / region)'],
    ctaLabel: 'Schedule live reading',
  },
  {
    id: 'counseling',
    name: 'Astrology counseling (first meeting)',
    price: '$150',
    duration: '75 min',
    summary:
      'A counseling-style conversation that uses your chart to work through what is on your mind — not a one-way lecture, and not therapy.',
    bookingUrl: 'https://calendly.com/simran-psy/astrology-counseling',
    intake: [
      'Birth date',
      'Birth time',
      'Birth place (city / region)',
      'What issue or question you want to talk about',
    ],
    ctaLabel: 'Schedule counseling',
  },
  {
    id: 'follow-up',
    name: 'Follow-up / returning client',
    price: '$110',
    duration: '60 min',
    summary:
      'For clients who already had a first counseling meeting. Dig into what is current with your chart already known.',
    bookingUrl: 'https://calendly.com/simran-psy/follow-up-returning-client',
    intake: [
      'Birth date',
      'Birth time',
      'What you want to focus on this time',
    ],
    ctaLabel: 'Schedule follow-up',
  },
  {
    id: 'check-in',
    name: 'Short check-in',
    price: '$60',
    duration: '30 min',
    summary: 'One topic, quick. Best when you already know your chart basics.',
    bookingUrl: 'https://calendly.com/simran-psy/short-check-in',
    intake: ['Birth date', 'Birth time', 'The one topic you want to cover'],
    ctaLabel: 'Schedule check-in',
  },
];

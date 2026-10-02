import React from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ThirdParty/ShadCn/Button';
import MoonMark from '@/components/Layout/MoonMark';

export const NotFoundBoundary: React.FC = () => {
  const location = useLocation();
  const match = location.pathname.match(/\/([\w-]+)$/);
  const urlChunk = match ? match[1] : 'Unknown';
  const fileLink = 'src/components/Pages/index.ts';

  return (
    <main className="flex min-h-screen w-full items-center justify-center p-6">
      <div className="moon-panel w-full max-w-lg p-8 text-center">
        <MoonMark className="mx-auto h-20 w-20 animate-float" />
        <p className="mt-4 text-sm font-bold uppercase tracking-widest text-primary">404</p>
        <h1 className="moon-heading mt-2 text-5xl">Lost among the stars</h1>
        <p className="mt-4 text-gray-600">
          We couldn't find <code className="rounded bg-muted px-1.5 py-0.5 text-sm">{location.pathname}</code>.
        </p>
        <Button variant="moon" size="lg" asChild className="mt-6">
          <a href="/">Back to home</a>
        </Button>
        {import.meta.env.DEV ? (
          <p className="mt-8 border-t border-gray-200 pt-4 text-left text-xs text-gray-500">
            <strong>Development tip:</strong> make sure{' '}
            <code>{urlChunk.charAt(0).toUpperCase() + urlChunk.slice(1)}Page</code> is exported in{' '}
            <a className="underline" href={`vscode://file/${fileLink}`}>{fileLink}</a>.
          </p>
        ) : null}
      </div>
    </main>
  );
};

import { DateTime } from 'luxon';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ThirdParty/ShadCn/Button';
import { getSignInHref } from '@/lib/auth/token';
import { useAuth } from '@/lib/hooks/useAuth';
import { usePageBackground, pageBackgrounds } from '@/lib/hooks/usePageBackground';
import {
  savedReadingToChartSearch,
  useSavedReadings,
  type SavedReading,
} from '@/lib/hooks/useSavedReadings';
import { PageComponentType } from '@/lib/types';

function locationLabel(reading: SavedReading): string {
  const parts = [
    reading.location.city,
    reading.location.state,
    reading.location.country,
  ].filter(Boolean);
  return parts.length ? parts.join(', ') : 'Unknown location';
}

function createdLabel(createdAt: string): string {
  const dt = DateTime.fromISO(createdAt);
  return dt.isValid ? dt.toLocaleString(DateTime.DATETIME_MED) : createdAt;
}

const ReadingsPage: PageComponentType = () => {
  usePageBackground(pageBackgrounds.cosmic);
  const { user, loading: authLoading } = useAuth();
  const { readings, loading, error, deleteReading, deleting } = useSavedReadings();
  const navigate = useNavigate();

  const handleOpen = (reading: SavedReading) => {
    navigate(`/chart?${savedReadingToChartSearch(reading)}`);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this saved reading?')) {
      return;
    }
    await deleteReading(id);
  };

  return (
    <div className="min-h-screen" style={{ width: '100vw' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6" style={{ margin: '0 auto' }}>
        <div className="bg-white/90 backdrop-blur-md rounded-lg p-4 sm:p-6 lg:p-8 mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
              Saved Readings
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Charts you have saved to your account. Open one to view it again, or delete it anytime.
            </p>
          </div>

          {authLoading || loading ? (
            <p className="text-center text-gray-600">Loading saved readings…</p>
          ) : !user ? (
            <div className="text-center space-y-4">
              <p className="text-gray-600">Sign in to see readings saved to your account.</p>
              <Button asChild>
                <Link to={getSignInHref('/readings')}>Sign in</Link>
              </Button>
            </div>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : readings.length === 0 ? (
            <div className="text-center space-y-4">
              <p className="text-gray-600">No saved readings yet. Generate a chart and save it from the results page.</p>
              <Button asChild>
                <Link to="/reading">Get a reading</Link>
              </Button>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {readings.map((reading) => (
                <li key={reading.id} className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="text-left">
                    <p className="text-lg font-semibold text-gray-800">{reading.name}</p>
                    <p className="text-sm text-gray-600">
                      {DateTime.fromISO(reading.birthDate).toLocaleString(DateTime.DATE_FULL)}
                      {' '}
                      {DateTime.fromFormat(reading.birthTime, 'HH:mm').toLocaleString(DateTime.TIME_SIMPLE)}
                    </p>
                    <p className="text-sm text-gray-500">{locationLabel(reading)}</p>
                    <p className="text-xs text-gray-400">Saved {createdLabel(reading.createdAt)}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleOpen(reading)}>
                      Open
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={deleting}
                      onClick={() => handleDelete(reading.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

ReadingsPage.path = '/readings';

export default ReadingsPage;

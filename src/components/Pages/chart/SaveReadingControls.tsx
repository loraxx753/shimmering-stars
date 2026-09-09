import { useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ThirdParty/ShadCn/Button";
import { getSignInHref } from "@/lib/auth/token";
import { useAuth } from "@/lib/hooks/useAuth";
import {
  findSavedReading,
  useSavedReadings,
  type SaveReadingInput,
} from "@/lib/hooks/useSavedReadings";

type SaveReadingControlsProps = {
  canSave: boolean;
  input: SaveReadingInput | null;
  returnPath: string;
};

export default function SaveReadingControls({
  canSave,
  input,
  returnPath,
}: SaveReadingControlsProps) {
  const { user, loading: authLoading } = useAuth();
  const { readings, loading, saveReading, deleteReading, saving, deleting } =
    useSavedReadings();
  const [actionError, setActionError] = useState<string | null>(null);

  const matched = input ? findSavedReading(readings, input) : undefined;

  const handleSave = async () => {
    if (!input || matched) {
      return;
    }
    setActionError(null);
    try {
      const saved = await saveReading(input);
      if (!saved?.id) {
        throw new Error("The API did not return a saved reading.");
      }
    } catch (error) {
      setActionError(
        error instanceof Error ? error.message : "Could not save this reading."
      );
    }
  };

  const handleRemove = async () => {
    if (!matched) {
      return;
    }
    setActionError(null);
    try {
      await deleteReading(matched.id);
    } catch (error) {
      setActionError(
        error instanceof Error
          ? error.message
          : "Could not remove this reading."
      );
    }
  };

  return (
    <div className="block text-center mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {matched ? "Saved reading" : "Save this reading"}
      </h2>
      {authLoading || (user && loading) ? (
        <p className="text-sm text-gray-500">Checking saved readings…</p>
      ) : user ? (
        <div className="flex flex-col items-center gap-3">
          {matched ? (
            <>
              <p className="text-sm text-green-700">This reading has already been saved.</p>
              <div className="flex flex-wrap justify-center gap-2">
                <Button
                  variant="outline"
                  onClick={handleRemove}
                  disabled={deleting}
                >
                  {deleting ? "Removing…" : "Remove from saved readings"}
                </Button>
                <Button asChild>
                  <Link to="/readings">View saved readings</Link>
                </Button>
              </div>
            </>
          ) : (
            <Button onClick={handleSave} disabled={!canSave || !input || saving}>
              {saving ? "Saving…" : "Save reading"}
            </Button>
          )}
          {!canSave && !matched && (
            <p className="text-sm text-gray-500">Wait for the chart to finish loading before saving.</p>
          )}
          {actionError && <p className="text-sm text-red-600">{actionError}</p>}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm text-gray-600">Sign in to save this reading to your account.</p>
          <Button asChild>
            <Link to={getSignInHref(returnPath)}>Sign in to save</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

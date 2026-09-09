import { useCallback } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { useAuth } from "@/lib/hooks/useAuth";
import {
  BIRTH_CHARTS_QUERY,
  CREATE_CLIENT_CHART_MUTATION,
  DELETE_CLIENT_CHART_MUTATION,
} from "@/lib/queries/charts";

export type SavedReadingLocation = {
  city?: string | null;
  country?: string | null;
  state?: string | null;
  latitude: number;
  longitude: number;
  timezone?: string | null;
};

export type SavedReading = {
  id: string;
  name: string;
  birthDate: string;
  birthTime: string;
  location: SavedReadingLocation;
  houseSystem?: string | null;
  gender?: string | null;
  notes?: string | null;
  createdAt: string;
};

export type SaveReadingInput = {
  name: string;
  birthDate: string;
  birthTime: string;
  location: SavedReadingLocation;
  houseSystem?: string | null;
  gender?: string | null;
  notes?: string | null;
};

function normalizeTime(time: string): string {
  const [hours, minutes] = time.split(":");
  const hour = Number(hours);
  const minute = Number(minutes);
  if (Number.isNaN(hour) || Number.isNaN(minute)) {
    return time;
  }
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function sameCoord(a: number, b: number): boolean {
  return Math.abs(a - b) < 0.00015;
}

export function findSavedReading(
  readings: SavedReading[],
  input: SaveReadingInput
): SavedReading | undefined {
  const name = input.name.trim().toLowerCase();
  const time = normalizeTime(input.birthTime);
  const houseSystem = input.houseSystem || "placidus";
  return readings.find((reading) => {
    return (
      reading.name.trim().toLowerCase() === name &&
      reading.birthDate === input.birthDate &&
      normalizeTime(reading.birthTime) === time &&
      (reading.houseSystem || "placidus") === houseSystem &&
      sameCoord(reading.location.latitude, input.location.latitude) &&
      sameCoord(reading.location.longitude, input.location.longitude)
    );
  });
}

export function savedReadingToChartSearch(reading: SavedReading): string {
  const params = new URLSearchParams();
  params.set("name", reading.name);
  params.set("date", reading.birthDate);
  params.set("time", reading.birthTime);
  if (reading.location.city) params.set("city", reading.location.city);
  if (reading.location.country) params.set("country", reading.location.country);
  if (reading.location.state) params.set("region", reading.location.state);
  params.set("lat", String(reading.location.latitude));
  params.set("long", String(reading.location.longitude));
  if (reading.location.timezone) params.set("timezone", reading.location.timezone);
  if (reading.houseSystem) params.set("houseSystem", reading.houseSystem);
  if (reading.gender) params.set("gender", reading.gender);
  if (reading.notes) params.set("notes", reading.notes);
  return params.toString();
}

export function useSavedReadings() {
  const { user } = useAuth();
  const { data, loading, error, refetch } = useQuery(BIRTH_CHARTS_QUERY, {
    skip: !user,
    fetchPolicy: "network-only",
  });
  const [createChart, { loading: saving }] = useMutation(
    CREATE_CLIENT_CHART_MUTATION,
    {
      refetchQueries: user ? [{ query: BIRTH_CHARTS_QUERY }] : [],
    }
  );
  const [removeChart, { loading: deleting }] = useMutation(
    DELETE_CLIENT_CHART_MUTATION,
    {
      refetchQueries: user ? [{ query: BIRTH_CHARTS_QUERY }] : [],
    }
  );

  const saveReading = useCallback(
    async (input: SaveReadingInput) => {
      const result = await createChart({
        variables: {
          name: input.name,
          birthDate: input.birthDate,
          birthTime: input.birthTime,
          location: {
            city: input.location.city || undefined,
            country: input.location.country || undefined,
            state: input.location.state || undefined,
            latitude: input.location.latitude,
            longitude: input.location.longitude,
            timezone: input.location.timezone || undefined,
          },
          houseSystem: input.houseSystem || undefined,
          gender: input.gender || undefined,
          notes: input.notes || undefined,
        },
      });
      return result.data?.createClientChart as SavedReading | undefined;
    },
    [createChart]
  );

  const deleteReading = useCallback(
    async (id: string) => {
      await removeChart({ variables: { id } });
    },
    [removeChart]
  );

  return {
    readings: (data?.birthCharts ?? []) as SavedReading[],
    loading: Boolean(user) && loading,
    error: error?.message ?? null,
    saving,
    deleting,
    saveReading,
    deleteReading,
    reload: refetch,
  };
}

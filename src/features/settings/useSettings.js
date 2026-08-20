"use client";
import { getSettings } from "@/services/apiSettings";
import { useQuery } from "@tanstack/react-query";

export function useSettings() {
  const {
    isLoading: loadSetting,
    error,
    data: settings,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
  return { loadSetting, settings, error };
}

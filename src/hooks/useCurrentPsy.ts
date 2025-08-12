"use client";

import { useEffect, useRef, useState } from "react";
import api from "@/utils/api";

export type Option = { id: number; title: string };

export type ClientBrief = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  name4telegram: string;
  phone2call: string;
  phone2whatsapp: string;
  city: string;
  cohort_id: number;
  role: string;
};

export type Psychologist = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  name4telegram: string;
  phone2call: string;
  phone2whatsapp: string;

  country: string;
  city: string;
  gender: string;

  description: string;
  education: string;
  education_status: string;

  plan: string;
  readiness_status: string;
  remark: string;

  start_at: string; 

  cohort_id: number;
  international_account: boolean;

  number_clients_able2serve: number;
  number_current_clients: number;
  amount_of_replacements: number;

  clients: ClientBrief[];
  therapy_methods: Option[];
  topics: Option[];
};

let cached: Psychologist | null | undefined = undefined;

export function useCurrentPsychologist() {
  const [data, setData] = useState<Psychologist | null | undefined>(cached);
  const [loading, setLoading] = useState(cached === undefined);
  const [error, setError] = useState<string | null>(null);
  const inflight = useRef<Promise<void> | null>(null);

  useEffect(() => {
    if (cached !== undefined || inflight.current) return;

    inflight.current = (async () => {
      try {
        setLoading(true);
        const res = await api.get("/v1/clients/psychologists/current", {
          validateStatus: () => true,
        });

        if (res.status === 204) {
          cached = null;
        } else if (res.status >= 200 && res.status < 300) {
          cached = res.data as Psychologist;
        } else {
          cached = null;
          setError(`Ошибка ${res.status}`);
        }
        setData(cached);
      } catch (e) {
        console.error("useCurrentPsychologist error:", e);
        cached = null;
        setData(null);
        setError("Не удалось загрузить данные");
      } finally {
        setLoading(false);
        inflight.current = null;
      }
    })();
  }, []);

  return { data, loading, error };
}

"use client";

import { useEffect, useState } from "react";
import api from "@/utils/api";
import "./FullApplication.css";

type Topic = { ID: number; Title: string };

type PreferencesResponse = {
  common: {
    country: string | null;
    time_zone: string | null;
    description: string | null;
  };
  personal: {
    created_at: string;
    updated_at: string;
    therapy_experience: boolean;
    psychologist_type: string | null;
    schedule: string | null; 
    has_foreign_card: boolean;
    topics: Topic[] | null;
    therapy_methods: string[] | null;
  };
};

export default function FullApplication() {
  const [data, setData] = useState<PreferencesResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get<PreferencesResponse>("/v1/profile/preferences");
        setData(res.data);
      } catch (e) {
        console.error("Не удалось загрузить предпочтения", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const country = data?.common?.country || "—";
  const timezone = data?.common?.time_zone || "—";
  const specificRequests =
    (data?.personal?.topics && data.personal.topics.length
      ? data.personal.topics.map(t => t.Title).join(", ")
      : "—");
  const internationalAcc = data?.personal?.has_foreign_card ? "Есть" : "Нет";
  const schedule = data?.personal?.schedule || "—";
  const gender = data?.personal?.psychologist_type || "—";

  if (loading) {
    return (
      <div className="full-application application">
        <h1>Анкета</h1>
        <div className="form-blocks">Загружаем…</div>
      </div>
    );
  }

  return (
    <div className="full-application application">
      <h1>Анкета</h1>
      <div className="form-blocks">
        <div className="two-flex-form-block">
          <div className="data-application">
            <h6>Страна проживания</h6>
            <h3>{country}</h3>
          </div>
          <div className="data-application">
            <h6>Часовой пояс</h6>
            <h3>{timezone}</h3>
          </div>
        </div>

        <div className="two-flex-form-block">
          <div className="column-two-flex">
            <div className="data-application" style={{ marginBottom: "16px" }}>
              <h6>Специфические запросы</h6>
              <h3>{specificRequests}</h3>
            </div>
            <div className="data-application">
              <h6>Наличие зарубежных карт</h6>
              <h3>{internationalAcc}</h3>
            </div>
          </div>
          <div className="column-two-flex">
            <div className="data-application" style={{ marginBottom: "16px" }}>
              <h6>Пожелания по графику</h6>
              <h3>{schedule}</h3>
            </div>
            <div className="data-application">
              <h6>Комфортно работать с</h6>
              <h3>{gender}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

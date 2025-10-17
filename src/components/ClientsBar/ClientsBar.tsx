"use client";

import { useEffect, useMemo, useState } from "react";
import Switcher from "../Switcher/Switcher";
import "./ClientsBar.css";
import ActiveClientCard from "./ActiveClientCard/ActiveClientCard";
import ChangeClient from "../ChangeClient/ChangeClient";
import api from "@/utils/api";

type ClientDTO = {
  id: number;
  firstName: string;
  lastName: string;
  phone2call: string;
  phone2whatsapp: string;
  name4telegram: string;
  email: string;
  comment: string;
  distributionStatus: string;
};


const norm = (s: string) =>
  (s ?? "").toLowerCase().replace(/\s+/g, " ").trim().replace(/ё/g, "е");

const isActive = (status: string) => norm(status) === "распределен";

export default function ClientsBar() {
  const [activeTab, setActiveTab] = useState(0);
  const [data, setData] = useState<ClientDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const abort = new AbortController();

    (async () => {
      try {
        setIsLoading(true);
        setErr(null);

        const res = await api.get<ClientDTO[]>(`/v1/psychologists/clients`, {
          signal: abort.signal,
        });

        setData(Array.isArray(res.data) ? res.data : []);
      } catch (e) {
        console.error("Ошибка загрузки клиентов:", e);
        setErr("Не удалось загрузить клиентов");
        setData([]);
      } finally {
        setIsLoading(false);
      }
    })();

    return () => abort.abort();
  }, []);

  const activeClients = useMemo(
    () => data.filter((c) => isActive(c.distributionStatus)),
    [data]
  );

  return (
    <div className="clients-bar application">
      <h1>Мои клиенты</h1>

      <Switcher
        tabs={[`АКТИВНЫЙ (${activeClients.length})`, `ЗАМЕНА КЛИЕНТА`]}
        activeIndex={activeTab}
        onChange={setActiveTab}
      />

      <div className="active-block">
        {activeTab === 0 ? (
          <div className="active-cleints">
            {isLoading && <div className="loader">Загрузка…</div>}
            {!isLoading && err && (
              <div className="error">{err}</div>
            )}
            {!isLoading && !err && activeClients.length === 0 && (
              <div className="empty">Активных клиентов нет</div>
            )}
            {!isLoading &&
              !err &&
              activeClients.map((c) => (
                <ActiveClientCard
                  key={c.id}
                  name={`${c.firstName} ${c.lastName}`}
                  callPhone={c.phone2call}
                  whatsappPhone={c.phone2whatsapp}
                  telegram={c.name4telegram?.startsWith("@") ? c.name4telegram : (c.name4telegram ? `@${c.name4telegram}` : "")}
                />
              ))}
          </div>
        ) : (
          <ChangeClient />
        )}
      </div>
    </div>
  );
}

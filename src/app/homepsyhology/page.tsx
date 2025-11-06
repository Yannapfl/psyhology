'use client';

import { useEffect, useMemo, useRef, useState } from "react";
import Application from "@/components/Application/Application";
import Layout from "@/components/Layout/Layout";
import Navigation from "@/components/Navigation/Navigation";
import ClientsBar from "@/components/ClientsBar/ClientsBar";
import { useRouter } from "next/navigation";
import { AppRoutes } from "@/constants/AppRoutes";
import Support from "@/components/Support/Support";
import api from "@/utils/api";
import FullApplication from "@/components/FullApplication/FullApplication";
import styles from "./HomePsyhology.module.css";

type Section = "application" | "relationship" | "settings" | "support";

export default function HomePsyhology() {
  const [section, setSection] = useState<Section>("application");
  const [canShowFull, setCanShowFull] = useState(false);
  const router = useRouter();
  const abortRef = useRef<AbortController | null>(null);

  // ловим выбор из мобильного хедера (nav:select)
  useEffect(() => {
    const onSelect = (e: Event) => {
      const s = (e as CustomEvent).detail as Section;
      if (s) setSection(s);
    };
    window.addEventListener("nav:select", onSelect as EventListener);
    return () => window.removeEventListener("nav:select", onSelect as EventListener);
  }, []);

  // проверка статуса анкеты при открытии settings
  useEffect(() => {
    if (section !== "settings") return;

    setCanShowFull(false);
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    (async () => {
      try {
        const res = await api.get("/v1/profile/preferences/status", {
          signal: ctrl.signal,
          validateStatus: (s) => [200, 204, 304].includes(s),
        });

        if (res.status === 204) {
          setCanShowFull(false);
          return;
        }
        setCanShowFull(true);
      } catch (e) {
        console.error("Failed to check preferences status", e);
        router.push(AppRoutes.application_psy);
      }
    })();

    return () => ctrl.abort();
  }, [section, router]);

  const content = useMemo(() => {
    switch (section) {
      case "application":
        return <Application />;
      case "relationship":
        return <ClientsBar />;
      case "support":
        return <Support />;
      case "settings":
        return canShowFull ? <FullApplication /> : null;
      default:
        return null;
    }
  }, [section, canShowFull]);

  return (
    <Layout>
      <div className={styles.contentWrap}>
        <Navigation setSection={setSection} currentSection={section} />
        {content}
      </div>
    </Layout>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Application from "@/components/Application/Application";
import Layout from "@/components/Layout/Layout";
import Navigation from "@/components/Navigation/Navigation";
import ClientsBar from "@/components/ClientsBar/ClientsBar";
import { useRouter } from "next/navigation";
import { AppRoutes } from "@/constants/AppRoutes";
import Support from "@/components/Support/Support";
import api from "@/utils/api";
import FullApplication from "@/components/FullApplication/FullApplication";

export default function HomePsyhology() {
  const [section, setSection] = useState<"application" | "relationship" | "settings" | "support">("application");
  const router = useRouter();
  const [canShowFull, setCanShowFull] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {

    if (section !== 'settings') return;
    setCanShowFull(false);

    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    (async () => {
      try {
        const res = await api.get('/v1/profile/preferences/status', {
          signal: ctrl.signal,
          validateStatus: (s) => [200, 204, 304].includes(s),
        });

        if (res.status === 204) {
          setCanShowFull(false)
          return;
        }

    
        setCanShowFull(true);
      } catch (e) {
       
        console.error('Failed to check preferences status', e);
       
        router.push(AppRoutes.application_psy);
      } 
    })();
    return () => ctrl.abort();
  }, [section, router]);

  const renderContent = () => {
    switch (section) {
      case "application":
        return <Application />;
      case "relationship":
        return <ClientsBar />;
      case 'support':
        return <Support />
      case "settings":
        if (canShowFull) return <FullApplication />;
        return null; 
    }
  };

  return (
    <Layout>
      <div className="content">
        <Navigation setSection={setSection} currentSection={section} />
        {renderContent()}
      </div>
    </Layout>
  );
}

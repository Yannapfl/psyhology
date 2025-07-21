"use client";

import { useEffect, useState } from "react";
import Application from "@/components/Application/Application";
import Layout from "@/components/Layout/Layout";
import Navigation from "@/components/Navigation/Navigation";
import ClientsBar from "@/components/ClientsBar/ClientsBar";
import { useRouter } from "next/navigation";
import { AppRoutes } from "@/constants/AppRoutes";

export default function HomePsyhology() {
  const [section, setSection] = useState<"application" | "relationship" | "settings">("application");
  const router = useRouter();

  useEffect(() => {
    if (section === "settings") {
      router.push(AppRoutes.application_psy);
    }
  }, [section, router]);

  const renderContent = () => {
    switch (section) {
      case "application":
        return <Application />;
      case "relationship":
        return <ClientsBar />;
      case "settings":
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

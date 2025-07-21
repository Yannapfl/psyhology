'use client'

import Application from "@/components/Application/Application";
import Layout from "@/components/Layout/Layout";
import Navigation from "@/components/Navigation/Navigation";
import PsyhologyBar from "@/components/PshologyBar/PshologyBar";
import { AppRoutes } from "@/constants/AppRoutes";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

export default function HomeClient() {
const [section, setSection] = useState<'application' | 'relationship' | 'settings'>('application');
const router = useRouter();

useEffect(() => {
    if (section === 'settings') {
        router.push(AppRoutes.application_client);
    }
}, [section, router])

const renderContent = () => {
    switch (section) {
        case 'application':
            return <Application />
        case 'relationship':
            return <PsyhologyBar />
        case 'settings':
            return null;
    }
}

    return (
        <Layout>
            <div className="content">
                <Navigation setSection={setSection} currentSection={section} />
                {renderContent()}
            </div>
        </Layout>
    )
}
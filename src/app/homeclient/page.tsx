'use client'

import Application from "@/components/Application/Application";
import FullApplication from "@/components/FullApplication/FullApplication";
import Layout from "@/components/Layout/Layout";
import Navigation from "@/components/Navigation/Navigation";
import PsyhologyBar from "@/components/PshologyBar/PshologyBar";

import {  useState } from "react";

export default function HomeClient() {
const [section, setSection] = useState<'application' | 'relationship' | 'settings'>('application');

const renderContent = () => {
    switch (section) {
        case 'application':
            return <Application />
        case 'relationship':
            return <PsyhologyBar />
        case 'settings':
            return <FullApplication />;
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
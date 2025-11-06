'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout/Layout';
import Navigation from '@/components/Navigation/Navigation';
import Application from '@/components/Application/Application';
import FullApplication from '@/components/FullApplication/FullApplication';
import PsyhologyBar from '@/components/PshologyBar/PshologyBar';
import api from '@/utils/api';
import { AppRoutes } from '@/constants/AppRoutes';
import Support from '@/components/Support/Support';
import EmptyApplication from '@/components/EmptyApplication/EmptyApplication';
import styles from './HomeClient.module.css'

type Section = 'application' | 'relationship' | 'settings' | 'support';

export default function HomeClient() {
  const [section, setSection] = useState<Section>('application');
  const [canShowFull, setCanShowFull] = useState(false);
  const router = useRouter();
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
        if (res.status === 204) { setCanShowFull(false); return; }
        setCanShowFull(true);
      } catch (e) {
        console.error('Failed to check preferences status', e);
        router.push(AppRoutes.application_client);
      }
    })();

    return () => ctrl.abort();
  }, [section, router]);

  const content = useMemo(() => {
    switch (section) {
      case 'application':   return <Application />;
      case 'relationship':  return <PsyhologyBar />;
      case 'support':       return <Support />;
      case 'settings':      return canShowFull ? <FullApplication /> : <EmptyApplication />;
      default:              return null;
    }
  }, [section, canShowFull]);

  useEffect(() => {
  const onSelect = (e: Event) => {
    const s = (e as CustomEvent).detail as Section;
    if (s) setSection(s);
  };
  window.addEventListener('nav:select', onSelect as EventListener);
  return () => window.removeEventListener('nav:select', onSelect as EventListener);
}, []);


  return (
    <Layout>
      <div className={`${styles.contentWrap}`}>
        <Navigation setSection={setSection} currentSection={section} />
        {content}
      </div>
    </Layout>
  );
}

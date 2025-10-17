'use client';

import './Header.css';
import '../../NotificationCenter/NotificationCenter.css'
import Image from 'next/image';
import logo from '../../../../public/icons/Logo.svg';
import bell from '../../../../public/icons/bell.svg';
import exit from '../../../../public/icons/exit.svg';
import { useRouter } from 'next/navigation';
import { AppRoutes } from '@/constants/AppRoutes';
import { useRole } from '@/contexts/RoleContext';
import { useEffect, useRef, useState } from 'react';
import ModalExit from '@/components/Modals/ModalExit';
import NotificationCenter from '@/components/NotificationCenter/NotificationCenter';

export default function Header() {
  const router = useRouter();
  const { role } = useRole();

  const [openExitModal, setOpenExitModal] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);

  const bellRef = useRef<HTMLDivElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  const homerouter = role === 'client' ? 'homeclient' : 'homepsyhology';

  useEffect(() => {
    if (!openNotif) return;

    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        popoverRef.current &&
        !popoverRef.current.contains(target) &&
        bellRef.current &&
        !bellRef.current.contains(target)
      ) {
        setOpenNotif(false);
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenNotif(false);
    };

    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [openNotif]);

  return (
    <header>
      <div className="navigation-header-left">
        <Image
          src={logo}
          alt="logo"
          height={24}
          onClick={() => router.push(AppRoutes[homerouter])}
          style={{ cursor: 'pointer' }}
        />
        <div className="navigation-header">
          <a onClick={() => router.push(AppRoutes.application_psy)}>Вопросы-ответы</a>
          <a href="###">Правила участия</a>
        </div>
      </div>

      <div className="navigation-header-right">
        <div ref={bellRef} className="notif-anchor">
          <Image
            src={bell}
            alt="bell"
            onClick={() => setOpenNotif((v) => !v)}
            style={{ cursor: 'pointer' }}
            className="grey-icon"
          />

          {openNotif && (
            <div
              ref={popoverRef}
              className="notif-popover"
              role="dialog"
              aria-label="Уведомления"
            >
              <NotificationCenter
                onClose={() => setOpenNotif(false)}
              />
            </div>
          )}
        </div>

        <Image
          src={exit}
          alt="exit"
          onClick={() => setOpenExitModal(true)}
          style={{ cursor: 'pointer' }}
          className="grey-icon"
        />
      </div>

      {openExitModal && <ModalExit onClose={() => setOpenExitModal(false)} />}
    </header>
  );
}

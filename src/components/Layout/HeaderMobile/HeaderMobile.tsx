"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./HeaderMobile.module.css";
import logo from "../../../../public/icons/Logo.svg";
import menuIcon from "../../../../public/icons/menu.svg";
import exit from "../../../../public/icons/exit.svg";
import ModalExit from "@/components/Modals/ModalExit";

type Section = "application" | "relationship" | "settings" | "support";

const items: { key: Section; label: string }[] = [
  { key: "application", label: "Анкета" },
  { key: "relationship", label: "Отношения" },
  { key: "settings", label: "Настройки" },
  { key: "support", label: "Поддержка" },
];

export default function HeaderMobile() {
  const [open, setOpen] = useState(false);
  const [openExitModal, setOpenExitModal] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const select = (s: Section) => {
    window.dispatchEvent(new CustomEvent("nav:select", { detail: s }));
    setOpen(false);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        <button
          className="btn-text"
          aria-label="Открыть меню"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          style={{ width: '26px'}}
        >
          <Image src={menuIcon} alt="menu" />
        </button>

        <Image src={logo} alt="logo" height={18} />

        <Image
          src={exit}
          alt="exit"
          onClick={() => setOpenExitModal(true)}
          style={{ cursor: "pointer" }}
          className="grey-icon"
        />

        
      </div>
      <div className={styles.leftStub} />

      <aside
        className={`${styles.drawer} ${open ? styles.open : ""}`}
        role="dialog"
        aria-modal="true"
      >
        <div className={styles.drawerHeader}>
          <span>Навигация</span>
          <button
            className={styles.close}
            aria-label="Закрыть меню"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </div>
        <nav className={styles.nav}>
          {items.map((i) => (
            <button
              key={i.key}
              className={styles.navItem}
              onClick={() => select(i.key)}
            >
              {i.label}
            </button>
          ))}
        </nav>
      </aside>

      {open && (
        <button
          className={styles.scrim}
          aria-label="Закрыть меню"
          onClick={() => setOpen(false)}
        />
      )}
      {openExitModal && <ModalExit onClose={() => setOpenExitModal(false)} />}
    </div>
  );
}
